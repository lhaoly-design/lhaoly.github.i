#!/usr/bin/env python3
"""
Generate topology-data.js from 台区模板数据.

Input sources:
- 1.计量数据/4.台区低压用户表--电流电压.xlsx
- 1.计量数据/5.台区低压用户表-分时电量表码.xlsx
- 2.台区图模数据/*.xml
- 2.台区图模数据/*.svg

Output:
- topology-data.js (window.TOPOLOGY_DATA = {...})
"""

from __future__ import annotations

import argparse
import json
import math
import re
import sys
from collections import defaultdict
from datetime import datetime
from decimal import Decimal, InvalidOperation
from pathlib import Path
from typing import Dict, Iterable, List, Optional, Tuple
import xml.etree.ElementTree as ET
import zipfile


R_NS = "http://schemas.openxmlformats.org/officeDocument/2006/relationships"
REL_NS = "http://schemas.openxmlformats.org/package/2006/relationships"
XLS_NS = {"m": "http://schemas.openxmlformats.org/spreadsheetml/2006/main"}
RDF_RES_ATTR = "{http://www.w3.org/1999/02/22-rdf-syntax-ns#}resource"


def local_name(tag: str) -> str:
    return tag.split("}", 1)[1] if "}" in tag else tag


def normalize_scalar(value: str) -> str:
    s = str(value or "").strip()
    if not s:
        return ""
    # Integer-like float
    if re.fullmatch(r"\d+\.0+", s):
        return s.split(".", 1)[0]
    # Scientific notation, keep integer text when possible
    if re.fullmatch(r"[+-]?\d+(\.\d+)?[eE][+-]?\d+", s):
        try:
            dec = Decimal(s)
            if dec == dec.to_integral_value():
                return str(dec.to_integral_value())
            return format(dec, "f").rstrip("0").rstrip(".")
        except InvalidOperation:
            return s
    return s


def normalize_id(value: str) -> str:
    return normalize_scalar(value)


def col_ref_to_idx(ref: str) -> int:
    letters = ""
    for ch in ref:
        if ch.isalpha():
            letters += ch
        else:
            break
    n = 0
    for ch in letters:
        n = n * 26 + (ord(ch.upper()) - 64)
    return n


def read_xlsx_rows(path: Path) -> List[Dict[str, str]]:
    with zipfile.ZipFile(path, "r") as zf:
        names = set(zf.namelist())

        # shared strings
        shared: List[str] = []
        if "xl/sharedStrings.xml" in names:
            root = ET.fromstring(zf.read("xl/sharedStrings.xml"))
            for si in root.findall("m:si", XLS_NS):
                txt = "".join((t.text or "") for t in si.findall(".//m:t", XLS_NS)).strip()
                shared.append(txt)

        # workbook + rel map
        wb = ET.fromstring(zf.read("xl/workbook.xml"))
        rel = ET.fromstring(zf.read("xl/_rels/workbook.xml.rels"))
        rel_map: Dict[str, str] = {}
        for r in rel.findall(f"{{{REL_NS}}}Relationship"):
            rel_map[r.attrib["Id"]] = r.attrib["Target"]

        # first sheet only
        sheet = wb.find("m:sheets/m:sheet", XLS_NS)
        if sheet is None:
            return []
        rid = sheet.attrib.get(f"{{{R_NS}}}id", "")
        target = rel_map.get(rid, "")
        if not target:
            return []
        if not target.startswith("xl/"):
            target = "xl/" + target
        target = target.replace("\\", "/")
        if target not in names:
            return []

        root = ET.fromstring(zf.read(target))
        rows = root.findall(".//m:sheetData/m:row", XLS_NS)
        if not rows:
            return []

        def cell_value(cell: ET.Element) -> str:
            t = cell.attrib.get("t")
            if t == "inlineStr":
                return "".join((x.text or "") for x in cell.findall(".//m:t", XLS_NS)).strip()
            v = cell.find("m:v", XLS_NS)
            if v is None or v.text is None:
                return ""
            txt = v.text.strip()
            if t == "s":
                try:
                    return shared[int(txt)]
                except Exception:
                    return txt
            return normalize_scalar(txt)

        # header from first row
        header_row = rows[0]
        col_header: Dict[int, str] = {}
        for c in header_row.findall("m:c", XLS_NS):
            idx = col_ref_to_idx(c.attrib.get("r", "A1"))
            h = cell_value(c).strip()
            if h:
                col_header[idx] = h

        out: List[Dict[str, str]] = []
        for row in rows[1:]:
            row_map: Dict[int, str] = {}
            for c in row.findall("m:c", XLS_NS):
                idx = col_ref_to_idx(c.attrib.get("r", "A1"))
                row_map[idx] = cell_value(c)
            if not row_map:
                continue
            obj: Dict[str, str] = {}
            for idx, h in col_header.items():
                v = normalize_scalar(row_map.get(idx, ""))
                if v:
                    obj[h] = v
            if obj:
                out.append(obj)
        return out


def collapse_user_rows(rows: Iterable[Dict[str, str]], user_key: str = "用户编号") -> Dict[str, Dict[str, str]]:
    result: Dict[str, Dict[str, str]] = {}
    for row in rows:
        uid = normalize_id(row.get(user_key, ""))
        if not uid or not uid.isdigit():
            continue
        ts = row.get("数据时间", "")
        # Skip likely repeated header rows
        if uid == user_key:
            continue
        current = result.get(uid)
        if current is None or ts > current.get("数据时间", ""):
            r = {k: normalize_scalar(v) for k, v in row.items()}
            r[user_key] = uid
            result[uid] = r
    return result


def find_input_root(arg_path: Optional[str]) -> Path:
    if arg_path:
        p = Path(arg_path).expanduser().resolve()
        if not p.exists():
            raise FileNotFoundError(f"input root not found: {p}")
        return p

    desktop = Path.home() / "Desktop"
    candidates = sorted(desktop.glob("数据格式模版*"))
    for c in candidates:
        p = c / "输入数据-模版"
        if p.exists():
            return p
    raise FileNotFoundError("cannot locate 输入数据-模版 under Desktop/数据格式模版*")


def parse_xml_graph(path: Path):
    root = ET.parse(path).getroot()

    transformer = {
        "rdf_id": "",
        "mRID": "",
        "name": "",
        "mK_ID": "",
    }

    lvbuildings: Dict[str, Dict[str, str]] = {}
    meters: List[Dict[str, str]] = []

    for elem in root:
        t = local_name(elem.tag)
        if t == "PowerTransformer":
            for k, v in elem.attrib.items():
                if k.endswith("}ID") or k == "ID":
                    transformer["rdf_id"] = v
            for ch in elem:
                ct = local_name(ch.tag)
                txt = normalize_scalar(ch.text or "")
                if ct == "Naming.mRID":
                    transformer["mRID"] = txt
                elif ct == "Naming.name":
                    transformer["name"] = txt
                elif ct == "PowerTransformer.mK_ID":
                    transformer["mK_ID"] = txt

        elif t == "LVBuilding":
            rid = ""
            for k, v in elem.attrib.items():
                if k.endswith("}ID") or k == "ID":
                    rid = v
                    break
            info = {"rdf_id": rid, "name": ""}
            for ch in elem:
                ct = local_name(ch.tag)
                txt = normalize_scalar(ch.text or "")
                if ct == "Naming.name":
                    info["name"] = txt
            if rid:
                lvbuildings[rid] = info

        elif t == "Meter":
            rec = {
                "rdf_id": "",
                "mRID": "",
                "userCode": "",
                "assetNumber": "",
                "commAddr": "",
                "YXDNBBS": "",
                "lvbuilding": "",
            }
            for k, v in elem.attrib.items():
                if k.endswith("}ID") or k == "ID":
                    rec["rdf_id"] = v
                    break
            for ch in elem:
                ct = local_name(ch.tag)
                txt = normalize_scalar(ch.text or "")
                if ct == "Naming.mRID":
                    rec["mRID"] = txt
                elif ct == "Meter.userCode":
                    rec["userCode"] = normalize_id(txt)
                elif ct == "Meter.assetNumber":
                    rec["assetNumber"] = txt
                elif ct == "Meter.commAddr":
                    rec["commAddr"] = txt
                elif ct == "Meter.YXDNBBS":
                    rec["YXDNBBS"] = normalize_id(txt)
                elif ct == "Meter.MemberOf_LVBuilding":
                    rec["lvbuilding"] = ch.attrib.get(RDF_RES_ATTR, "").replace("#", "")
            meters.append(rec)

    return transformer, lvbuildings, meters


def parse_svg_lv_names(path: Path) -> Dict[str, str]:
    text = path.read_text(encoding="utf-8", errors="ignore")
    out: Dict[str, str] = {}

    p1 = re.compile(r'<cge:PSR_Ref[^>]*ObjectName="([^"]*)"[^>]*ObjectID="(LVBUILDING_[^"]+)"')
    p2 = re.compile(r'<cge:PSR_Ref[^>]*ObjectID="(LVBUILDING_[^"]+)"[^>]*ObjectName="([^"]*)"')

    for name, lid in p1.findall(text):
        out[lid] = normalize_scalar(name)
    for lid, name in p2.findall(text):
        out[lid] = normalize_scalar(name)
    return out


def pick_first_nonempty(rows: Iterable[Dict[str, str]], key: str) -> str:
    for row in rows:
        v = normalize_scalar(row.get(key, ""))
        if v:
            return v
    return ""


def edge_status_from_ratio(ratio: float) -> str:
    if ratio >= 1.45:
        return "overload"
    if ratio >= 1.15:
        return "warning"
    return "normal"


def build_topology(input_root: Path) -> Dict:
    meter_dir = input_root / "1.计量数据"
    graph_dir = input_root / "2.台区图模数据"

    xlsx4 = sorted(meter_dir.glob("4*.xlsx"))
    xlsx5 = sorted(meter_dir.glob("5*.xlsx"))
    xml_files = sorted(graph_dir.glob("*.xml"))
    svg_files = sorted(graph_dir.glob("*.svg"))

    if not xlsx4 or not xlsx5 or not xml_files or not svg_files:
        raise FileNotFoundError("missing required files: 4*.xlsx, 5*.xlsx, *.xml, *.svg")

    rows4 = read_xlsx_rows(xlsx4[0])
    rows5 = read_xlsx_rows(xlsx5[0])

    user4 = collapse_user_rows(rows4, "用户编号")
    user5 = collapse_user_rows(rows5, "用户编号")

    # Merge per-user records: 4 provides status/current metrics, 5 provides address and time-of-use info.
    user_map: Dict[str, Dict[str, str]] = {}
    all_users = set(user4.keys()) | set(user5.keys())
    for uid in all_users:
        rec: Dict[str, str] = {}
        if uid in user4:
            rec.update(user4[uid])
        if uid in user5:
            rec.update(user5[uid])
        rec["用户编号"] = uid
        user_map[uid] = rec

    asset_to_user: Dict[str, str] = {}
    for uid, rec in user_map.items():
        asset = rec.get("表计资产编号", "")
        if asset:
            # Keep first seen mapping
            asset_to_user.setdefault(asset, uid)

    transformer, lvbuildings, meters = parse_xml_graph(xml_files[0])
    svg_lv_names = parse_svg_lv_names(svg_files[0])

    tq_id = pick_first_nonempty(user_map.values(), "台区编号")
    tq_name = pick_first_nonempty(user_map.values(), "台区名称") or transformer.get("name", "")
    if not tq_id and transformer.get("mK_ID"):
        tq_id = "02" + transformer["mK_ID"]
    if not tq_name:
        tq_name = "台区拓扑"

    # Assign display user info for each graph meter
    lv_meter_map: Dict[str, List[Dict[str, str]]] = defaultdict(list)
    resolved_user_ids: set[str] = set()
    graph_user_ids: set[str] = set()
    asset_match_fix_count = 0
    graph_only_count = 0

    for m in meters:
        uid_graph = normalize_id(m.get("userCode", ""))
        if uid_graph:
            graph_user_ids.add(uid_graph)
        asset = m.get("assetNumber", "")

        rec = user_map.get(uid_graph)
        match_mode = "图模+计量(用户号匹配)"
        resolved_uid = uid_graph

        if rec is None and asset and asset in asset_to_user:
            resolved_uid = asset_to_user[asset]
            rec = user_map.get(resolved_uid)
            match_mode = "资产号匹配(用户号不一致)"
            asset_match_fix_count += 1

        if rec is None:
            rec = {}
            match_mode = "仅图模"
            graph_only_count += 1

        if resolved_uid:
            resolved_user_ids.add(resolved_uid)

        detail = {
            "图模用户编号": uid_graph or "-",
            "用户编号": resolved_uid or uid_graph or "-",
            "用户名称": rec.get("用户名称", "-"),
            "用户类别": rec.get("用户类别", "-"),
            "用户地址": rec.get("用户地址", "-"),
            "表计资产编号": rec.get("表计资产编号", asset or "-"),
            "计量点编号": rec.get("计量点编号", "-"),
            "终端资产编号": rec.get("终端资产编号", "-"),
            "终端逻辑地址": rec.get("终端逻辑地址", "-"),
            "数据时间": rec.get("数据时间", "-"),
            "用户状态": rec.get("用户状态", "未知"),
            "图模电表ID": m.get("rdf_id", "-"),
            "图模mRID": m.get("mRID", "-"),
            "图模通信地址": m.get("commAddr", "-"),
            "图模业务编号(YXDNBBS)": m.get("YXDNBBS", "-"),
            "匹配方式": match_mode,
            "所属接入点ID": m.get("lvbuilding", "-"),
        }
        meter_rec = {
            "meter": m,
            "user": rec,
            "resolved_uid": resolved_uid or uid_graph,
            "match_mode": match_mode,
            "details": detail,
        }
        lv_meter_map[m.get("lvbuilding", "")].append(meter_rec)

    unmatched_users = sorted(set(user_map.keys()) - resolved_user_ids)
    # User requested to hide/remove virtual "unmatched user pool" from topology graph.
    include_unmatched_pool = False

    # Build node/edge graph
    nodes: List[Dict] = []
    edges: List[Dict] = []

    # Layout config
    lv_ids = sorted(lvbuildings.keys())
    lv_cols = 12
    x_gap = 280
    x_start = 220
    branch_y = 330
    lv_y_start = 650
    lv_y_gap = 280
    meter_y_offset = 120
    meter_row_gap = 95

    width = int(x_start * 2 + (lv_cols - 1) * x_gap)
    lv_rows = max(1, math.ceil(max(len(lv_ids), 1) / lv_cols))
    transformer_x = width // 2
    transformer_y = 120

    # Transformer node
    t_id = transformer.get("rdf_id") or "TRANS_MAIN"
    nodes.append(
        {
            "id": t_id,
            "type": "transformer",
            "name": tq_name,
            "code": tq_id or transformer.get("mK_ID") or "未知",
            "x": transformer_x,
            "y": transformer_y,
            "color": "#2e6b3c",
            "shape": "rect",
            "scale": 1.35,
            "details": {
                "设备类型": "配电变压器",
                "台区名称": tq_name,
                "台区编号": tq_id or "-",
                "图模mK_ID": transformer.get("mK_ID", "-"),
                "图模变压器ID": transformer.get("rdf_id", "-"),
                "图模mRID": transformer.get("mRID", "-"),
                "计量用户总数": str(len(user_map)),
                "图模电表总数": str(len(meters)),
                "用户匹配数": str(len(resolved_user_ids & set(user_map.keys()))),
                "仅图模用户数": str(graph_only_count),
                "资产号修复数": str(asset_match_fix_count),
                "计量未入图用户数": str(len(unmatched_users)),
            },
            "summary": {
                "接入点数量": str(len(lv_ids)),
                "拓扑节点数": "0",
                "拓扑边数": "0",
                "数据生成时间": datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
            },
            "logs": [
                f"{datetime.now().strftime('%Y-%m-%d %H:%M:%S')} 由模板数据自动生成拓扑",
                "说明: 用户优先按用户编号匹配图模, 失败则按表计资产编号兜底",
            ],
        }
    )

    # Branch nodes by column
    branch_stats: Dict[str, Dict[str, int]] = {}
    for i in range(lv_cols):
        bid = f"BR_{i+1:02d}"
        bx = x_start + i * x_gap
        nodes.append(
            {
                "id": bid,
                "type": "branch",
                "name": f"分支{i+1}",
                "code": bid,
                "x": bx,
                "y": branch_y,
                "color": "#7c3aed",
                "shape": "circle",
                "details": {
                    "设备类型": "低压分支",
                    "分支编号": bid,
                    "所属台区编号": tq_id or "-",
                    "运行状态": "正常",
                },
                "summary": {"下挂接入点": "0", "下挂电表": "0", "下挂用户": "0"},
                "logs": ["自动生成分支节点"],
            }
        )
        edges.append(
            {
                "from": t_id,
                "to": bid,
                "status": "normal",
                "load": "正常",
                "name": f"主干线{i+1}",
                "note": "自动分组连线",
            }
        )
        branch_stats[bid] = {"lv": 0, "meter": 0, "user": 0}

    lv_pos: Dict[str, Tuple[int, int]] = {}

    # LVBuilding nodes
    for idx, lv_id in enumerate(lv_ids):
        col = idx % lv_cols
        row = idx // lv_cols
        x = x_start + col * x_gap
        y = lv_y_start + row * lv_y_gap
        lv_pos[lv_id] = (x, y)
        bid = f"BR_{col+1:02d}"

        meters_here = lv_meter_map.get(lv_id, [])
        users_here = {m["resolved_uid"] for m in meters_here if m["resolved_uid"]}
        lv_name = svg_lv_names.get(lv_id) or lvbuildings.get(lv_id, {}).get("name") or lv_id

        nodes.append(
            {
                "id": lv_id,
                "type": "box",
                "name": lv_name,
                "code": lv_id.replace("LVBUILDING_", ""),
                "x": x,
                "y": y,
                "color": "#ea580c",
                "shape": "rect",
                "details": {
                    "设备类型": "低压接入点(LVBuilding)",
                    "接入点ID": lv_id,
                    "接入点名称": lv_name,
                    "所属台区编号": tq_id or "-",
                    "下挂电表数": str(len(meters_here)),
                    "下挂用户数": str(len(users_here)),
                    "数据来源": "图模XML + 图模SVG",
                },
                "summary": {
                    "挂接状态": "正常" if meters_here else "未挂接电表",
                    "匹配用户数": str(len(users_here)),
                },
                "logs": ["自动生成接入点节点"],
            }
        )

        edges.append(
            {
                "from": bid,
                "to": lv_id,
                "status": "normal" if meters_here else "warning",
                "load": "正常" if meters_here else "缺失",
                "name": f"{bid}->{lv_name}",
                "note": "分支至接入点",
            }
        )

        branch_stats[bid]["lv"] += 1
        branch_stats[bid]["meter"] += len(meters_here)
        branch_stats[bid]["user"] += len(users_here)

    # Meter nodes under each LVBuilding
    for lv_id in lv_ids:
        x_lv, y_lv = lv_pos[lv_id]
        meters_here = sorted(
            lv_meter_map.get(lv_id, []),
            key=lambda it: (it["resolved_uid"] or "", it["meter"].get("assetNumber", "")),
        )
        for j, item in enumerate(meters_here):
            meter = item["meter"]
            details = item["details"]
            resolved_uid = item["resolved_uid"] or meter.get("userCode") or meter.get("mRID") or meter.get("rdf_id")
            name = details.get("用户名称", "")
            if not name or name == "-":
                name = f"用户{(resolved_uid or '未知')[-4:]}"

            local_row = j // 3
            local_col = j % 3
            offsets = [-80, 0, 80]
            x = x_lv + offsets[local_col]
            y = y_lv + meter_y_offset + local_row * meter_row_gap

            node_id = meter.get("rdf_id") or f"METER_{resolved_uid}_{j}"
            mode = item["match_mode"]
            color = "#2563eb" if mode.startswith("图模+计量") else "#f59e0b"
            status = "normal" if mode.startswith("图模+计量") else "warning"

            nodes.append(
                {
                    "id": node_id,
                    "type": "meter",
                    "name": name,
                    "code": resolved_uid or meter.get("userCode") or "-",
                    "x": x,
                    "y": y,
                    "color": color,
                    "shape": "circle",
                    "details": details,
                    "summary": {
                        "匹配方式": mode,
                        "最近数据时间": details.get("数据时间", "-"),
                        "用户状态": details.get("用户状态", "未知"),
                    },
                    "logs": ["自动生成电表节点"],
                }
            )

            edges.append(
                {
                    "from": lv_id,
                    "to": node_id,
                    "status": status,
                    "load": "正常" if status == "normal" else "待核对",
                    "name": f"{lv_id}->{resolved_uid}",
                    "note": mode,
                }
            )

    # Unmatched users pool (meter-side users not connected in graph)
    if include_unmatched_pool and unmatched_users:
        extra_branch_id = "BR_UNMATCHED"
        extra_box_id = "LV_UNMATCHED_POOL"
        extra_branch_y = lv_y_start + lv_rows * lv_y_gap + 120
        extra_box_y = extra_branch_y + 210

        nodes.append(
            {
                "id": extra_branch_id,
                "type": "branch",
                "name": "未入图用户分支",
                "code": extra_branch_id,
                "x": transformer_x,
                "y": extra_branch_y,
                "color": "#b45309",
                "shape": "circle",
                "details": {
                    "设备类型": "虚拟分支",
                    "说明": "计量侧存在但图模未关联的用户集合",
                    "用户数量": str(len(unmatched_users)),
                },
                "summary": {"状态": "需治理", "说明": "建议补充图模关联"},
                "logs": ["自动创建未关联用户分支"],
            }
        )
        edges.append(
            {
                "from": t_id,
                "to": extra_branch_id,
                "status": "warning",
                "load": "预警",
                "name": "主干->未入图用户分支",
                "note": "计量侧存在但图模未关联",
            }
        )

        nodes.append(
            {
                "id": extra_box_id,
                "type": "box",
                "name": "未入图用户池",
                "code": "UNMATCHED",
                "x": transformer_x,
                "y": extra_box_y,
                "color": "#c2410c",
                "shape": "rect",
                "details": {
                    "设备类型": "虚拟接入点",
                    "说明": "用于承接未在图模中出现的计量用户",
                    "用户数": str(len(unmatched_users)),
                },
                "summary": {"状态": "需治理"},
                "logs": ["自动创建未关联用户池"],
            }
        )
        edges.append(
            {
                "from": extra_branch_id,
                "to": extra_box_id,
                "status": "warning",
                "load": "预警",
                "name": "未入图用户分支->用户池",
                "note": "虚拟连接",
            }
        )

        u_cols = 10
        ux_gap = 240
        u_start_x = int(transformer_x - ((u_cols - 1) * ux_gap) / 2)
        u_start_y = extra_box_y + 170
        for i, uid in enumerate(unmatched_users):
            row = i // u_cols
            col = i % u_cols
            x = u_start_x + col * ux_gap
            y = u_start_y + row * 140
            rec = user_map[uid]
            node_id = f"UNM_{uid}"
            name = rec.get("用户名称") or f"用户{uid[-4:]}"
            details = {
                "用户编号": uid,
                "用户名称": rec.get("用户名称", "-"),
                "用户类别": rec.get("用户类别", "-"),
                "用户地址": rec.get("用户地址", "-"),
                "表计资产编号": rec.get("表计资产编号", "-"),
                "计量点编号": rec.get("计量点编号", "-"),
                "终端资产编号": rec.get("终端资产编号", "-"),
                "终端逻辑地址": rec.get("终端逻辑地址", "-"),
                "数据时间": rec.get("数据时间", "-"),
                "用户状态": rec.get("用户状态", "未知"),
                "匹配方式": "仅计量(未入图模)",
            }
            nodes.append(
                {
                    "id": node_id,
                    "type": "meter",
                    "name": name,
                    "code": uid,
                    "x": x,
                    "y": y,
                    "color": "#f97316",
                    "shape": "circle",
                    "details": details,
                    "summary": {"匹配方式": "仅计量(未入图模)"},
                    "logs": ["自动生成未入图用户节点"],
                }
            )
            edges.append(
                {
                    "from": extra_box_id,
                    "to": node_id,
                    "status": "warning",
                    "load": "预警",
                    "name": f"未入图用户->{uid}",
                    "note": "计量侧存在, 图模缺失",
                }
            )

    # Update branch summaries + edge status from load ratio
    branch_meter_counts = [branch_stats[k]["meter"] for k in sorted(branch_stats.keys())]
    avg_meter = (sum(branch_meter_counts) / len(branch_meter_counts)) if branch_meter_counts else 0

    node_by_id = {n["id"]: n for n in nodes}
    for bid, st in branch_stats.items():
        bn = node_by_id.get(bid)
        if bn:
            bn["summary"] = {
                "下挂接入点": str(st["lv"]),
                "下挂电表": str(st["meter"]),
                "下挂用户": str(st["user"]),
            }
            ratio = (st["meter"] / avg_meter) if avg_meter else 1.0
            status = edge_status_from_ratio(ratio)
            bn["details"]["运行状态"] = {"normal": "正常", "warning": "预警", "overload": "过载"}[status]

    for e in edges:
        if e["from"] == t_id and e["to"].startswith("BR_") and e["to"] in branch_stats:
            st = branch_stats[e["to"]]
            ratio = (st["meter"] / avg_meter) if avg_meter else 1.0
            status = edge_status_from_ratio(ratio)
            e["status"] = status
            e["load"] = {"normal": "正常", "warning": "预警", "overload": "过载"}[status]
            e["note"] = f"下挂电表 {st['meter']}，接入点 {st['lv']}"

    # Update transformer summary
    max_y = max(n["y"] for n in nodes) if nodes else 920
    height = int(max_y + 260)

    t_node = node_by_id[t_id]
    t_node["summary"] = {
        "接入点数量": str(len(lv_ids)),
        "图模电表数": str(len(meters)),
        "计量用户数": str(len(user_map)),
        "匹配用户数": str(len(resolved_user_ids & set(user_map.keys()))),
        "未入图用户数": str(len(unmatched_users)),
        "数据生成时间": datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
    }

    meta = {
        "title": f"{tq_name} 台区拓扑",
        "description": "基于图模XML/SVG与计量数据自动生成。点击任意节点可查看用户编号、资产编号与上下游关系。",
        "台区编号": tq_id or "-",
        "台区名称": tq_name,
        "图模mK_ID": transformer.get("mK_ID", "-"),
        "graph_file": str(xml_files[0].name),
        "svg_file": str(svg_files[0].name),
        "generated_at": datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
        "counts": {
            "nodes": len(nodes),
            "edges": len(edges),
            "transformer": sum(1 for n in nodes if n["type"] == "transformer"),
            "branch": sum(1 for n in nodes if n["type"] == "branch"),
            "box": sum(1 for n in nodes if n["type"] == "box"),
            "meter": sum(1 for n in nodes if n["type"] == "meter"),
            "graph_meter": len(meters),
            "meter_users": len(user_map),
            "matched_users": len(resolved_user_ids & set(user_map.keys())),
            "unmatched_meter_side_users": len(unmatched_users),
            "graph_only_users": graph_only_count,
            "asset_match_fix_count": asset_match_fix_count,
        },
        "layout": {
            "viewBoxWidth": width,
            "viewBoxHeight": height,
        },
    }

    return {"meta": meta, "nodes": nodes, "edges": edges}


def main() -> int:
    parser = argparse.ArgumentParser(description="Build topology-data.js from 台区模板数据")
    parser.add_argument("--input-root", help="Path to 输入数据-模版 directory")
    parser.add_argument(
        "--output-js",
        required=True,
        help="Output path for topology-data.js",
    )
    args = parser.parse_args()

    input_root = find_input_root(args.input_root)
    output_js = Path(args.output_js).expanduser().resolve()
    output_js.parent.mkdir(parents=True, exist_ok=True)

    topology = build_topology(input_root)
    with output_js.open("w", encoding="utf-8") as f:
        f.write("window.TOPOLOGY_DATA = ")
        json.dump(topology, f, ensure_ascii=False, indent=2)
        f.write(";\n")

    counts = topology["meta"]["counts"]
    print(f"input_root: {input_root}")
    print(f"output_js:  {output_js}")
    print(
        "counts:",
        f"nodes={counts['nodes']}",
        f"edges={counts['edges']}",
        f"meter={counts['meter']}",
        f"matched={counts['matched_users']}",
        f"unmatched_meter_side={counts['unmatched_meter_side_users']}",
    )
    return 0


if __name__ == "__main__":
    try:
        raise SystemExit(main())
    except Exception as exc:
        print(f"[ERROR] {exc}", file=sys.stderr)
        raise
