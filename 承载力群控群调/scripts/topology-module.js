window.initEmbeddedTopologyModule = (() => {
  let initialized = false;
  return function initEmbeddedTopologyModule() {
    if (initialized) return;
    const required = [
      "topologySvg", "svgWrap", "boardMeta", "tooltip", "errorBox",
      "breadcrumbs", "backLevelBtn", "infoName", "infoCode", "infoBadge",
      "detailList", "summaryList", "relationList", "logList"
    ];
    if (!required.every(id => document.getElementById(id))) return;
    initialized = true;

const META_AREA_ID = "\u53f0\u533a\u7f16\u53f7";
    const KEY_USER_ID = "\u7528\u6237\u7f16\u53f7";
    const KEY_GRAPH_USER_ID = "\u56fe\u6a21\u7528\u6237\u7f16\u53f7";
    const KEY_ASSET_ID = "\u8868\u8ba1\u8d44\u4ea7\u7f16\u53f7";
    const KEY_ACCESS_ID = "\u63a5\u5165\u70b9ID";
    const KEY_STATUS = "\u8fd0\u884c\u72b6\u6001";
    const KEY_USER_STATUS = "\u7528\u6237\u72b6\u6001";

    const dataset = window.TOPOLOGY_DATA || { meta: {}, nodes: [], edges: [] };
    const allNodes = Array.isArray(dataset.nodes) ? dataset.nodes : [];
    const allEdges = Array.isArray(dataset.edges) ? dataset.edges : [];
    const meta = dataset.meta || {};

    const svg = document.getElementById("topologySvg");
    const svgWrap = document.getElementById("svgWrap");
    const boardMeta = document.getElementById("boardMeta");
    const tooltip = document.getElementById("tooltip");
    const errorBox = document.getElementById("errorBox");
    const breadcrumbs = document.getElementById("breadcrumbs");
    const backLevelBtn = document.getElementById("backLevelBtn");

    const infoName = document.getElementById("infoName");
    const infoCode = document.getElementById("infoCode");
    const infoBadge = document.getElementById("infoBadge");
    const detailList = document.getElementById("detailList");
    const summaryList = document.getElementById("summaryList");
    const relationList = document.getElementById("relationList");
    const logList = document.getElementById("logList");

    const typeLabel = {
      transformer: "配电变压器",
      branch: "分支",
      box: "接入点",
      meter: "电表/用户"
    };

    const badgeColor = {
      transformer: "#2e6b3c",
      branch: "#7c3aed",
      box: "#ea580c",
      meter: "#2563eb"
    };

    const edgeStatusMap = {
      normal: { label: "正常", className: "edge-normal" },
      warning: { label: "预警", className: "edge-warning" },
      overload: { label: "过载", className: "edge-overload" }
    };

    const nodeMap = new Map(allNodes.map(node => [node.id, node]));
    const incomingMap = new Map();
    const outgoingMap = new Map();
    allEdges.forEach(edge => {
      if (!incomingMap.has(edge.to)) incomingMap.set(edge.to, []);
      if (!outgoingMap.has(edge.from)) outgoingMap.set(edge.from, []);
      incomingMap.get(edge.to).push(edge);
      outgoingMap.get(edge.from).push(edge);
    });

    const transformerNode = allNodes.find(n => n.type === "transformer") || allNodes[0] || null;

    const defaultNodeSize = {
      rectWidth: 110,
      rectHeight: 52,
      rectOffsetX: 55,
      rectOffsetY: 26,
      circleRadius: 23,
      meterRadius: 17
    };

    const viewState = {
      level: "overview",
      branchId: null,
      boxId: null
    };

    let visibleNodes = [];
    let visibleEdges = [];
    const nodeElements = new Map();
    const edgeElements = [];
    let zoomLevel = 1;
    let isDragging = false;
    let dragStartX = 0;
    let dragStartY = 0;
    let dragScrollLeft = 0;
    let dragScrollTop = 0;
    let dragMoved = false;
    let suppressClickUntil = 0;
    let selectedNodeId = null;
    const DRAG_THRESHOLD = 5;
    const renderNodePos = new Map();

    function setPageStats() {
      document.getElementById("pageTitle").textContent = meta.title || "台区拓扑图";
      document.getElementById("pageDesc").textContent = meta.description || "点击节点查看详情";
      document.getElementById("statArea").textContent = meta[META_AREA_ID] || "-";
      document.getElementById("statNode").textContent = String(allNodes.length);
      document.getElementById("statMeter").textContent = String(allNodes.filter(n => n.type === "meter").length);
      const unmatched = meta.counts?.unmatched_meter_side_users ?? 0;
      document.getElementById("statUnmatched").textContent = String(unmatched);
    }

    function setViewBox() {
      const w = 1400;
      const h = 980;
      svg.setAttribute("viewBox", `0 0 ${w} ${h}`);
      svg.style.minWidth = `${Math.max(980, Math.floor(w * 0.72))}px`;
    }

    function createSvgElement(tag, attrs) {
      const el = document.createElementNS("http://www.w3.org/2000/svg", tag);
      Object.entries(attrs).forEach(([key, value]) => el.setAttribute(key, value));
      return el;
    }

    function getNodeMetrics(node) {
      const scale = node.scale || 1;
      const isMeter = node.type === "meter";
      return {
        rectWidth: defaultNodeSize.rectWidth * scale,
        rectHeight: defaultNodeSize.rectHeight * scale,
        rectOffsetX: defaultNodeSize.rectOffsetX * scale,
        rectOffsetY: defaultNodeSize.rectOffsetY * scale,
        circleRadius: (isMeter ? defaultNodeSize.meterRadius : defaultNodeSize.circleRadius) * scale
      };
    }

    function setZoom(nextZoom, anchorClient = null) {
      const oldZoom = zoomLevel;
      const snapped = Math.round(nextZoom * 20) / 20;
      const newZoom = Math.min(2.2, Math.max(0.65, Number(snapped.toFixed(2))));
      if (Math.abs(newZoom - oldZoom) < 0.001) return;

      const rect = svgWrap.getBoundingClientRect();
      let anchorX = svgWrap.clientWidth / 2;
      let anchorY = svgWrap.clientHeight / 2;
      if (anchorClient && Number.isFinite(anchorClient.clientX) && Number.isFinite(anchorClient.clientY)) {
        anchorX = Math.min(Math.max(anchorClient.clientX - rect.left, 0), svgWrap.clientWidth);
        anchorY = Math.min(Math.max(anchorClient.clientY - rect.top, 0), svgWrap.clientHeight);
      }

      const contentX = (svgWrap.scrollLeft + anchorX) / oldZoom;
      const contentY = (svgWrap.scrollTop + anchorY) / oldZoom;

      zoomLevel = newZoom;
      svg.style.transform = `scale(${zoomLevel})`;
      document.getElementById("zoomLabel").textContent = `${Math.round(zoomLevel * 100)}%`;

      svgWrap.scrollLeft = contentX * zoomLevel - anchorX;
      svgWrap.scrollTop = contentY * zoomLevel - anchorY;
    }

    function sortNodes(nodes) {
      return [...nodes].sort((a, b) => String(a.name || a.id).localeCompare(String(b.name || b.id), "zh-CN"));
    }

    function getRenderedPos(node) {
      return renderNodePos.get(node.id) || { x: node.x, y: node.y };
    }

    function applyLevelLayout() {
      renderNodePos.clear();
      const byType = {
        transformer: visibleNodes.filter(n => n.type === "transformer"),
        branch: visibleNodes.filter(n => n.type === "branch"),
        box: visibleNodes.filter(n => n.type === "box"),
        meter: visibleNodes.filter(n => n.type === "meter")
      };

      const centerX = 760;
      const put = (id, x, y) => renderNodePos.set(id, { x, y });

      if (viewState.level === "overview") {
        const t = byType.transformer[0];
        if (t) put(t.id, centerX, 130);
        const branches = sortNodes(byType.branch);
        const cols = Math.max(3, Math.min(5, Math.ceil(Math.sqrt(Math.max(branches.length, 1) * 1.2))));
        const xGap = 250;
        const yGap = 180;
        const startX = centerX - ((cols - 1) * xGap) / 2;
        const startY = 350;
        branches.forEach((n, i) => {
          const col = i % cols;
          const row = Math.floor(i / cols);
          put(n.id, startX + col * xGap, startY + row * yGap);
        });
        return;
      }

      if (viewState.level === "branch") {
        const t = byType.transformer[0];
        const b = byType.branch[0];
        if (t) put(t.id, centerX, 120);
        if (b) put(b.id, centerX, 280);
        const boxes = sortNodes(byType.box);
        const cols = Math.max(3, Math.min(5, Math.ceil(Math.sqrt(Math.max(boxes.length, 1)))));
        const xGap = 220;
        const yGap = 170;
        const startX = centerX - ((cols - 1) * xGap) / 2;
        const startY = 500;
        boxes.forEach((n, i) => {
          const col = i % cols;
          const row = Math.floor(i / cols);
          put(n.id, startX + col * xGap, startY + row * yGap);
        });
        return;
      }

      if (viewState.level === "box") {
        const t = byType.transformer[0];
        const b = byType.branch[0];
        const box = byType.box[0];
        if (t) put(t.id, centerX, 110);
        if (b) put(b.id, centerX, 250);
        if (box) put(box.id, centerX, 410);

        const meters = sortNodes(byType.meter);
        const cols = Math.max(4, Math.min(7, Math.ceil(Math.sqrt(Math.max(meters.length, 1)))));
        const xGap = 160;
        const yGap = 122;
        const startX = centerX - ((cols - 1) * xGap) / 2;
        const startY = 610;
        meters.forEach((n, i) => {
          const col = i % cols;
          const row = Math.floor(i / cols);
          put(n.id, startX + col * xGap, startY + row * yGap);
        });
      }
    }

    function updateViewBoxByVisible() {
      if (!visibleNodes.length) return;
      let minX = Infinity;
      let minY = Infinity;
      let maxX = -Infinity;
      let maxY = -Infinity;

      visibleNodes.forEach(node => {
        const p = getRenderedPos(node);
        const m = getNodeMetrics(node);
        const halfW = node.shape === "rect" ? m.rectOffsetX : m.circleRadius;
        const halfH = node.shape === "rect" ? m.rectOffsetY : m.circleRadius;
        minX = Math.min(minX, p.x - halfW);
        maxX = Math.max(maxX, p.x + halfW);
        minY = Math.min(minY, p.y - halfH);
        maxY = Math.max(maxY, p.y + halfH);
      });

      const padX = 170;
      const padY = 130;
      const x = Math.floor(minX - padX);
      const y = Math.floor(minY - padY);
      const w = Math.max(980, Math.ceil(maxX - minX + padX * 2));
      const h = Math.max(720, Math.ceil(maxY - minY + padY * 2));
      svg.setAttribute("viewBox", `${x} ${y} ${w} ${h}`);
      svg.style.minWidth = `${Math.max(920, Math.floor(w * 0.78))}px`;
    }

    function canPan() {
      return svgWrap.scrollWidth > svgWrap.clientWidth || svgWrap.scrollHeight > svgWrap.clientHeight;
    }

    function startDrag(event) {
      if (event.button !== 0 || !canPan()) return;
      isDragging = true;
      dragMoved = false;
      dragStartX = event.clientX;
      dragStartY = event.clientY;
      dragScrollLeft = svgWrap.scrollLeft;
      dragScrollTop = svgWrap.scrollTop;
      svgWrap.classList.add("dragging");
      hideTooltip();
      event.preventDefault();
    }

    function handleDrag(event) {
      if (!isDragging) return;
      const deltaX = event.clientX - dragStartX;
      const deltaY = event.clientY - dragStartY;
      if (!dragMoved && (Math.abs(deltaX) > DRAG_THRESHOLD || Math.abs(deltaY) > DRAG_THRESHOLD)) {
        dragMoved = true;
      }
      svgWrap.scrollLeft = dragScrollLeft - deltaX;
      svgWrap.scrollTop = dragScrollTop - deltaY;
      if (dragMoved) hideTooltip();
    }

    function stopDrag() {
      if (!isDragging) return;
      isDragging = false;
      svgWrap.classList.remove("dragging");
      if (dragMoved) suppressClickUntil = Date.now() + 220;
    }

    function collectNodeIds(edges) {
      const ids = new Set();
      edges.forEach(e => {
        ids.add(e.from);
        ids.add(e.to);
      });
      return ids;
    }

    function getParentOfType(nodeId, type) {
      let currentId = nodeId;
      const visited = new Set();
      while (currentId && !visited.has(currentId)) {
        visited.add(currentId);
        const inEdges = incomingMap.get(currentId) || [];
        for (const edge of inEdges) {
          const parent = nodeMap.get(edge.from);
          if (parent && parent.type === type) return parent.id;
        }
        currentId = inEdges.length ? inEdges[0].from : null;
      }
      return null;
    }

    function getOverviewData() {
      const edges = allEdges.filter(e => {
        const from = nodeMap.get(e.from);
        const to = nodeMap.get(e.to);
        return from && to && from.type === "transformer" && to.type === "branch";
      });
      const ids = collectNodeIds(edges);
      if (transformerNode) ids.add(transformerNode.id);
      return {
        nodes: [...ids].map(id => nodeMap.get(id)).filter(Boolean),
        edges,
        label: "台区总览"
      };
    }

    function getBranchData(branchId) {
      const branch = nodeMap.get(branchId);
      if (!branch || branch.type !== "branch") return getOverviewData();
      const parentEdge = (incomingMap.get(branchId) || []).find(e => nodeMap.get(e.from)?.type === "transformer");
      const childEdges = (outgoingMap.get(branchId) || []).filter(e => nodeMap.get(e.to)?.type === "box");
      const edges = [];
      if (parentEdge) edges.push(parentEdge);
      edges.push(...childEdges);
      const ids = collectNodeIds(edges);
      ids.add(branchId);
      return {
        nodes: [...ids].map(id => nodeMap.get(id)).filter(Boolean),
        edges,
        label: `分支详情: ${branch.name || branchId}`
      };
    }

    function getBoxData(boxId) {
      const box = nodeMap.get(boxId);
      if (!box || box.type !== "box") {
        if (viewState.branchId) return getBranchData(viewState.branchId);
        return getOverviewData();
      }
      const parentBranchEdge = (incomingMap.get(boxId) || []).find(e => nodeMap.get(e.from)?.type === "branch");
      const branchId = parentBranchEdge?.from || viewState.branchId || getParentOfType(boxId, "branch");
      const rootEdge = branchId
        ? (incomingMap.get(branchId) || []).find(e => nodeMap.get(e.from)?.type === "transformer")
        : null;
      const meterEdges = (outgoingMap.get(boxId) || []).filter(e => nodeMap.get(e.to)?.type === "meter");
      const edges = [];
      if (rootEdge) edges.push(rootEdge);
      if (parentBranchEdge) edges.push(parentBranchEdge);
      edges.push(...meterEdges);
      const ids = collectNodeIds(edges);
      ids.add(boxId);
      if (branchId) ids.add(branchId);
      return {
        nodes: [...ids].map(id => nodeMap.get(id)).filter(Boolean),
        edges,
        label: `接入点详情: ${box.name || boxId}`
      };
    }

    function computeVisibleData() {
      if (viewState.level === "branch") return getBranchData(viewState.branchId);
      if (viewState.level === "box") return getBoxData(viewState.boxId);
      return getOverviewData();
    }

    function renderBreadcrumbs() {
      const crumbs = [{ label: "台区总览", level: "overview" }];
      if (viewState.level === "branch" || viewState.level === "box") {
        const branch = nodeMap.get(viewState.branchId);
        if (branch) crumbs.push({ label: branch.name || branch.id, level: "branch", branchId: branch.id });
      }
      if (viewState.level === "box") {
        const box = nodeMap.get(viewState.boxId);
        if (box) crumbs.push({ label: box.name || box.id, level: "box", branchId: viewState.branchId, boxId: box.id });
      }

      breadcrumbs.innerHTML = crumbs.map((c, idx) => {
        const active = idx === crumbs.length - 1;
        const sep = idx < crumbs.length - 1 ? `<span class="crumb-sep">/</span>` : "";
        return `
          <button class="crumb-btn ${active ? "active" : ""}"
                  data-level="${c.level}"
                  data-branch="${c.branchId || ""}"
                  data-box="${c.boxId || ""}"
                  ${active ? "disabled" : ""}>${c.label}</button>${sep}`;
      }).join("");

      breadcrumbs.querySelectorAll(".crumb-btn").forEach(btn => {
        btn.addEventListener("click", () => {
          const level = btn.dataset.level;
          const branchId = btn.dataset.branch || null;
          const boxId = btn.dataset.box || null;
          setView(level, { branchId, boxId, selectedId: level === "overview" ? transformerNode?.id : (boxId || branchId), center: false });
        });
      });
    }

    function updateBoardMeta(levelLabel) {
      boardMeta.textContent =
        `当前层级: ${levelLabel} | 显示节点 ${visibleNodes.length} / 连线 ${visibleEdges.length} | ` +
        `全量节点 ${allNodes.length} / 连线 ${allEdges.length}`;

      backLevelBtn.disabled = viewState.level === "overview";
      backLevelBtn.style.opacity = viewState.level === "overview" ? "0.6" : "1";
      renderBreadcrumbs();
    }

    function drawEdges() {
      visibleEdges.forEach(edge => {
        const from = nodeMap.get(edge.from);
        const to = nodeMap.get(edge.to);
        if (!from || !to) return;
        const fp = getRenderedPos(from);
        const tp = getRenderedPos(to);
        const fm = getNodeMetrics(from);
        const tm = getNodeMetrics(to);
        const statusClass = edgeStatusMap[edge.status]?.className || "edge-normal";
        const line = createSvgElement("line", {
          x1: fp.x,
          y1: fp.y + (from.shape === "rect" ? fm.rectOffsetY - 4 : fm.circleRadius),
          x2: tp.x,
          y2: tp.y - (to.shape === "rect" ? tm.rectOffsetY - 4 : tm.circleRadius),
          class: `edge ${statusClass}`,
          "data-from": edge.from,
          "data-to": edge.to
        });
        line.addEventListener("mouseenter", evt => {
          if (isDragging) return;
          updateEdgeTooltip(edge, from, to, evt);
        });
        line.addEventListener("mousemove", evt => {
          if (isDragging) return;
          updateEdgeTooltip(edge, from, to, evt);
        });
        line.addEventListener("mouseleave", hideTooltip);
        svg.appendChild(line);
        edgeElements.push({ el: line, edge });
      });
    }

    function shortText(text, maxLen) {
      const t = String(text || "");
      return t.length > maxLen ? `${t.slice(0, maxLen)}...` : t;
    }

    function drawTransformerGlyph(group, p, m, node) {
      const icon = createSvgElement("g", { "pointer-events": "none" });
      const bodyW = Math.min(48, Math.max(38, m.rectWidth * 0.46));
      const bodyH = 22;
      const bodyX = p.x - bodyW / 2;
      const bodyY = p.y - 12;

      icon.appendChild(createSvgElement("rect", {
        x: bodyX,
        y: bodyY,
        width: bodyW,
        height: bodyH,
        rx: 4,
        ry: 4,
        fill: node.color || "#2e6b3c",
        stroke: "#ffffff",
        "stroke-width": "1.6"
      }));

      icon.appendChild(createSvgElement("circle", {
        cx: p.x - 9,
        cy: p.y + 0.5,
        r: 4.6,
        fill: "none",
        stroke: "#ffffff",
        "stroke-width": "1.4"
      }));
      icon.appendChild(createSvgElement("circle", {
        cx: p.x + 9,
        cy: p.y + 0.5,
        r: 4.6,
        fill: "none",
        stroke: "#ffffff",
        "stroke-width": "1.4"
      }));
      icon.appendChild(createSvgElement("line", {
        x1: p.x - 4,
        y1: p.y + 0.5,
        x2: p.x + 4,
        y2: p.y + 0.5,
        stroke: "#ffffff",
        "stroke-width": "1.4"
      }));

      [-13, 0, 13].forEach(offset => {
        icon.appendChild(createSvgElement("line", {
          x1: p.x + offset,
          y1: bodyY - 2,
          x2: p.x + offset,
          y2: bodyY - 7,
          stroke: "#ffffff",
          "stroke-width": "1.1"
        }));
        icon.appendChild(createSvgElement("circle", {
          cx: p.x + offset,
          cy: bodyY - 8,
          r: 1.8,
          fill: "#ffffff"
        }));
      });

      group.appendChild(icon);
    }

    function drawPvGlyph(group, p, m, node) {
      const icon = createSvgElement("g", { "pointer-events": "none" });
      const panelW = Math.min(28, Math.max(22, m.circleRadius * 1.45));
      const panelH = Math.min(18, Math.max(13, m.circleRadius * 0.95));
      const x = p.x - panelW / 2;
      const y = p.y - panelH / 2 + 1;

      icon.appendChild(createSvgElement("rect", {
        x,
        y,
        width: panelW,
        height: panelH,
        rx: 2,
        ry: 2,
        fill: node.color || "#2563eb",
        stroke: "#ffffff",
        "stroke-width": "1.4"
      }));

      [1, 2].forEach(i => {
        const gx = x + (panelW * i) / 3;
        icon.appendChild(createSvgElement("line", {
          x1: gx,
          y1: y + 1,
          x2: gx,
          y2: y + panelH - 1,
          stroke: "rgba(255,255,255,0.88)",
          "stroke-width": "0.9"
        }));
      });

      icon.appendChild(createSvgElement("line", {
        x1: x + 1,
        y1: y + panelH / 2,
        x2: x + panelW - 1,
        y2: y + panelH / 2,
        stroke: "rgba(255,255,255,0.88)",
        "stroke-width": "0.9"
      }));

      icon.appendChild(createSvgElement("line", {
        x1: p.x - 3,
        y1: y + panelH,
        x2: p.x,
        y2: y + panelH + 5,
        stroke: "#ffffff",
        "stroke-width": "1"
      }));
      icon.appendChild(createSvgElement("line", {
        x1: p.x + 3,
        y1: y + panelH,
        x2: p.x,
        y2: y + panelH + 5,
        stroke: "#ffffff",
        "stroke-width": "1"
      }));

      icon.appendChild(createSvgElement("circle", {
        cx: x + panelW + 4,
        cy: y - 1,
        r: 2.1,
        fill: "#ffffff"
      }));

      group.appendChild(icon);
    }

    function onNodeClick(node) {
      if (Date.now() < suppressClickUntil) return;
      if (!node) return;
      if (node.type === "transformer") {
        setView("overview", { selectedId: node.id, center: true });
        return;
      }
      if (node.type === "branch") {
        setView("branch", { branchId: node.id, selectedId: node.id, center: true });
        return;
      }
      if (node.type === "box") {
        const branchId = getParentOfType(node.id, "branch");
        setView("box", { branchId, boxId: node.id, selectedId: node.id, center: true });
        return;
      }
      if (node.type === "meter") {
        const boxId = getParentOfType(node.id, "box");
        if (boxId) {
          const branchId = getParentOfType(boxId, "branch");
          setView("box", { branchId, boxId, selectedId: node.id, center: true });
          return;
        }
      }
      selectNode(node.id, true);
    }

    function drawNodes() {
      const showName = zoomLevel >= 0.68;
      const showSub = zoomLevel >= 0.88;

      visibleNodes.forEach(node => {
        const group = createSvgElement("g", { class: "node", tabindex: "0", "data-id": node.id });
        const p = getRenderedPos(node);
        const m = getNodeMetrics(node);
        if (node.type === "transformer") {
          group.appendChild(createSvgElement("circle", {
            cx: p.x,
            cy: p.y,
            r: Math.max(24, m.rectOffsetY + 6),
            fill: "rgba(0,0,0,0)",
            stroke: "rgba(0,0,0,0)"
          }));
          drawTransformerGlyph(group, p, m, node);
        } else if (node.type === "meter") {
          group.appendChild(createSvgElement("circle", {
            cx: p.x,
            cy: p.y + 1,
            r: Math.max(16, m.circleRadius + 2),
            fill: "rgba(0,0,0,0)",
            stroke: "rgba(0,0,0,0)"
          }));
          drawPvGlyph(group, p, m, node);
        } else if (node.shape === "rect") {
          group.appendChild(createSvgElement("rect", {
            x: p.x - m.rectOffsetX,
            y: p.y - m.rectOffsetY,
            rx: 14, ry: 14,
            width: m.rectWidth,
            height: m.rectHeight,
            fill: node.color
          }));
        } else {
          group.appendChild(createSvgElement("circle", {
            cx: p.x,
            cy: p.y,
            r: m.circleRadius,
            fill: node.color
          }));
        }

        const name = node.type === "meter" ? shortText(node.name, 6) : shortText(node.name, 12);
        const code = node.type === "meter" ? String(node.code || "").slice(-6) : shortText(node.code, 12);
        const nameY =
          node.type === "transformer" ? p.y + 27 :
          node.type === "meter" ? p.y + 24 :
          (node.shape === "rect" ? p.y + 3 : p.y + 2);
        const codeY =
          node.type === "transformer" ? p.y + 42 :
          node.type === "meter" ? p.y + 37 :
          (node.shape === "rect" ? p.y + m.rectOffsetY + 18 : p.y + m.circleRadius + 14);

        const nameText = createSvgElement("text", {
          x: p.x,
          y: nameY,
          class: "node-label"
        });
        nameText.textContent = node.type === "meter" ? "PV" : (name || "-");
        if (node.type === "transformer") {
          // Use inline style so it overrides class-based white text color.
          nameText.style.fill = "#111827";
          nameText.style.stroke = "rgba(255,255,255,0.95)";
          nameText.style.strokeWidth = "1px";
          nameText.style.paintOrder = "stroke";
          nameText.style.fontSize = "14px";
          nameText.style.fontWeight = "800";
        }
        nameText.style.display = (node.type === "transformer" || showName) ? "" : "none";
        group.appendChild(nameText);

        const codeText = createSvgElement("text", {
          x: p.x,
          y: codeY,
          class: "node-sub"
        });
        codeText.textContent = code || "-";
        if (node.type === "transformer") {
          codeText.style.fill = "#0f172a";
          codeText.style.stroke = "rgba(255,255,255,0.88)";
          codeText.style.strokeWidth = "0.65px";
          codeText.style.paintOrder = "stroke";
        }
        codeText.style.display = (node.type === "transformer" || showSub) ? "" : "none";
        group.appendChild(codeText);

        group.addEventListener("mouseenter", evt => {
          if (isDragging) return;
          updateInfo(node);
          updateTooltip(node, evt);
        });
        group.addEventListener("mousemove", evt => {
          if (isDragging) return;
          updateTooltip(node, evt);
        });
        group.addEventListener("mouseleave", hideTooltip);
        group.addEventListener("focus", () => updateInfo(node));
        group.addEventListener("click", () => onNodeClick(node));

        svg.appendChild(group);
        nodeElements.set(node.id, group);
      });
    }

    function renderKvList(container, data) {
      container.innerHTML = "";
      const entries = Object.entries(data || {});
      if (!entries.length) {
        container.innerHTML = `<div class="kv-row"><strong>提示</strong><div>暂无数据</div></div>`;
        return;
      }
      entries.forEach(([k, v]) => {
        const row = document.createElement("div");
        row.className = "kv-row";
        row.innerHTML = `<strong>${k}</strong><div>${v}</div>`;
        container.appendChild(row);
      });
    }

    function getParents(nodeId) {
      const inEdges = incomingMap.get(nodeId) || [];
      return inEdges.map(e => nodeMap.get(e.from)).filter(Boolean);
    }

    function getChildren(nodeId) {
      const outEdges = outgoingMap.get(nodeId) || [];
      return outEdges.map(e => nodeMap.get(e.to)).filter(Boolean);
    }

    function renderRelations(node) {
      relationList.innerHTML = "";
      const parents = getParents(node.id);
      const children = getChildren(node.id);
      if (!parents.length && !children.length) {
        relationList.innerHTML = `<div class="path-item">当前节点暂无关联<span>请检查节点边数据</span></div>`;
        return;
      }
      parents.forEach(p => {
        const div = document.createElement("div");
        div.className = "path-item";
        div.innerHTML = `上级：${p.name}<span>${typeLabel[p.type] || p.type} | ${p.code || "-"}</span>`;
        relationList.appendChild(div);
      });
      children.forEach(c => {
        const div = document.createElement("div");
        div.className = "path-item";
        div.innerHTML = `下级：${c.name}<span>${typeLabel[c.type] || c.type} | ${c.code || "-"}</span>`;
        relationList.appendChild(div);
      });
    }

    function renderLogs(node) {
      logList.innerHTML = "";
      const logs = (node.logs && node.logs.length) ? node.logs : ["暂无记录"];
      logs.forEach(line => {
        const item = document.createElement("div");
        item.className = "log-item";
        item.textContent = line;
        logList.appendChild(item);
      });
    }

    function updateInfo(node) {
      infoName.textContent = node.name || "-";
      infoCode.textContent = `编号: ${node.code || "-"}`;
      infoBadge.textContent = typeLabel[node.type] || node.type || "节点";
      infoBadge.style.background = badgeColor[node.type] || "#334155";
      renderKvList(detailList, node.details || {});
      renderKvList(summaryList, node.summary || {});
      renderRelations(node);
      renderLogs(node);
    }

    function updateTooltip(node, event) {
      const userId = node.details?.[KEY_USER_ID] || node.details?.[KEY_GRAPH_USER_ID] || "-";
      const status = node.details?.[KEY_STATUS] || node.details?.[KEY_USER_STATUS] || "-";
      tooltip.innerHTML = `
        <div class="tooltip-title">${node.name || "-"}</div>
        <div>类型：${typeLabel[node.type] || node.type}</div>
        <div>编号：${node.code || "-"}</div>
        <div>状态：${status}</div>
        <div>用户编号：${userId}</div>
      `;
      tooltip.style.left = `${event.clientX + 10}px`;
      tooltip.style.top = `${event.clientY + 12}px`;
      tooltip.classList.add("visible");
    }

    function updateEdgeTooltip(edge, from, to, event) {
      const status = edgeStatusMap[edge.status]?.label || edge.status || "-";
      tooltip.innerHTML = `
        <div class="tooltip-title">${edge.name || "链路"}</div>
        <div>起点：${from.name}</div>
        <div>终点：${to.name}</div>
        <div>状态：${status}</div>
        <div>说明：${edge.note || "-"}</div>
      `;
      tooltip.style.left = `${event.clientX + 10}px`;
      tooltip.style.top = `${event.clientY + 12}px`;
      tooltip.classList.add("visible");
    }

    function hideTooltip() {
      tooltip.classList.remove("visible");
    }

    function clearSelectionClass() {
      nodeElements.forEach(el => el.classList.remove("selected"));
      edgeElements.forEach(({ el }) => el.classList.remove("selected"));
    }

    function highlightAround(nodeId) {
      const related = new Set([nodeId]);
      const inEdges = incomingMap.get(nodeId) || [];
      const outEdges = outgoingMap.get(nodeId) || [];
      inEdges.forEach(e => related.add(e.from));
      outEdges.forEach(e => related.add(e.to));

      nodeElements.forEach((el, id) => {
        if (related.has(id)) el.classList.add("selected");
      });
      edgeElements.forEach(({ el, edge }) => {
        if (edge.from === nodeId || edge.to === nodeId) el.classList.add("selected");
      });
    }

    function centerNode(node) {
      const p = getRenderedPos(node);
      const x = p.x * zoomLevel;
      const y = p.y * zoomLevel;
      svgWrap.scrollLeft = Math.max(0, x - svgWrap.clientWidth / 2);
      svgWrap.scrollTop = Math.max(0, y - svgWrap.clientHeight / 2);
    }

    function selectNode(nodeId, center = false) {
      const node = nodeMap.get(nodeId);
      if (!node) return;
      if (!nodeElements.has(nodeId)) return;
      selectedNodeId = nodeId;
      clearSelectionClass();
      nodeElements.get(nodeId)?.classList.add("selected");
      highlightAround(nodeId);
      updateInfo(node);
      if (center) centerNode(node);
    }

    function renderCurrentView(preferredSelectId = null, centerSelect = false) {
      const view = computeVisibleData();
      visibleNodes = view.nodes;
      visibleEdges = view.edges;
      applyLevelLayout();
      updateViewBoxByVisible();

      svg.innerHTML = "";
      nodeElements.clear();
      edgeElements.length = 0;
      drawEdges();
      drawNodes();
      updateBoardMeta(view.label);

      const visibleIdSet = new Set(visibleNodes.map(n => n.id));
      let targetId = preferredSelectId || selectedNodeId;
      if (!targetId || !visibleIdSet.has(targetId)) {
        if (viewState.level === "box") targetId = viewState.boxId;
        else if (viewState.level === "branch") targetId = viewState.branchId;
        else targetId = transformerNode?.id || visibleNodes[0]?.id;
      }
      if (targetId && visibleIdSet.has(targetId)) {
        selectNode(targetId, centerSelect);
      }
    }

    function setView(level, opts = {}) {
      if (level === "overview") {
        viewState.level = "overview";
        viewState.branchId = null;
        viewState.boxId = null;
      } else if (level === "branch") {
        viewState.level = "branch";
        viewState.branchId = opts.branchId || viewState.branchId;
        viewState.boxId = null;
      } else if (level === "box") {
        viewState.level = "box";
        viewState.boxId = opts.boxId || viewState.boxId;
        viewState.branchId = opts.branchId || viewState.branchId || getParentOfType(viewState.boxId, "branch");
      }
      renderCurrentView(opts.selectedId || null, !!opts.center);
    }

    function findNode(keyword) {
      const key = String(keyword || "").trim().toLowerCase();
      if (!key) return null;
      return allNodes.find(node => {
        const cands = [
          node.id,
          node.name,
          node.code,
          node.details?.[KEY_USER_ID],
          node.details?.[KEY_GRAPH_USER_ID],
          node.details?.[KEY_ASSET_ID],
          node.details?.[KEY_ACCESS_ID]
        ];
        return cands.some(v => String(v || "").toLowerCase().includes(key));
      }) || null;
    }

    function jumpToNode(node) {
      if (!node) return;
      if (node.type === "transformer") {
        setView("overview", { selectedId: node.id, center: true });
        return;
      }
      if (node.type === "branch") {
        setView("branch", { branchId: node.id, selectedId: node.id, center: true });
        return;
      }
      if (node.type === "box") {
        const branchId = getParentOfType(node.id, "branch");
        setView("box", { branchId, boxId: node.id, selectedId: node.id, center: true });
        return;
      }
      if (node.type === "meter") {
        const boxId = getParentOfType(node.id, "box");
        if (boxId) {
          const branchId = getParentOfType(boxId, "branch");
          setView("box", { branchId, boxId, selectedId: node.id, center: true });
          return;
        }
      }
      renderCurrentView(node.id, true);
    }

    function goBackLevel() {
      if (viewState.level === "box") {
        setView("branch", { branchId: viewState.branchId, selectedId: viewState.branchId, center: false });
        return;
      }
      if (viewState.level === "branch") {
        setView("overview", { selectedId: transformerNode?.id, center: false });
      }
    }

    function bindEvents() {
      document.getElementById("zoomInBtn").addEventListener("click", () => setZoom(zoomLevel + 0.15));
      document.getElementById("zoomOutBtn").addEventListener("click", () => setZoom(zoomLevel - 0.15));
      document.getElementById("zoomResetBtn").addEventListener("click", () => setZoom(1));
      backLevelBtn.addEventListener("click", goBackLevel);

      document.getElementById("searchBtn").addEventListener("click", () => {
        const kw = document.getElementById("searchInput").value;
        const node = findNode(kw);
        if (!node) {
          errorBox.style.display = "block";
          errorBox.textContent = "未找到匹配节点，请输入用户编号/节点编号/节点名称重试。";
          return;
        }
        errorBox.style.display = "none";
        jumpToNode(node);
      });
      document.getElementById("searchInput").addEventListener("keydown", evt => {
        if (evt.key === "Enter") {
          evt.preventDefault();
          document.getElementById("searchBtn").click();
        }
      });

      svgWrap.addEventListener("mousedown", startDrag);
      window.addEventListener("mousemove", handleDrag);
      window.addEventListener("mouseup", stopDrag);
      window.addEventListener("blur", stopDrag);
      svg.addEventListener("wheel", event => {
        event.preventDefault();
        setZoom(zoomLevel + (event.deltaY < 0 ? 0.1 : -0.1), { clientX: event.clientX, clientY: event.clientY });
      }, { passive: false });
    }

    function init() {
      if (!allNodes.length) {
        errorBox.style.display = "block";
        errorBox.textContent = "未加载到 topology-data.js，请先生成数据文件。";
        boardMeta.textContent = "未加载到拓扑数据";
        return;
      }

      setPageStats();
      setViewBox();
      setZoom(1);
      bindEvents();
      setView("overview", { selectedId: transformerNode?.id || allNodes[0]?.id, center: true });
    }

    init();
  };
})();
