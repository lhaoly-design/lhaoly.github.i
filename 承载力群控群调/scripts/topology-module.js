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

    let dataset = { meta: {}, nodes: [], edges: [] };
    let allNodes = [];
    let allEdges = [];
    let meta = {};

    const svg = document.getElementById("topologySvg");
    const svgWrap = document.getElementById("svgWrap");
    if (svg) svg.classList.add("line-topology-svg");
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
      transformer: "#1d5eb8",
      branch: "#7c3aed",
      box: "#ea580c",
      meter: "#2563eb"
    };

    const edgeStatusMap = {
      normal: { label: "正常", className: "edge-normal" },
      warning: { label: "预警", className: "edge-warning" },
      overload: { label: "过载", className: "edge-overload" }
    };

    let nodeMap = new Map();
    let incomingMap = new Map();
    let outgoingMap = new Map();
    let edgeMap = new Map();
    let transformerNode = null;

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
    let visibleIdSet = new Set();
    let currentView = { parent: null, children: [] };
    const nodeElements = new Map();
    const edgeElements = [];
    let zoomLevel = 1;
    let panX = 0;
    let panY = 0;
    let isDragging = false;
    let activePointerId = null;
    let dragStartX = 0;
    let dragStartY = 0;
    let dragStartPanX = 0;
    let dragStartPanY = 0;
    let dragMoved = false;
    let suppressClickUntil = 0;
    let selectedNodeId = null;
    let currentLevelLabel = "";
    const DRAG_THRESHOLD = 8;
    const MIN_ZOOM = 0.1;
    const MAX_ZOOM = 2.2;
    const FIT_VIEW_MARGIN = 0.97;
    const LINE_LAYOUT = {
      width: 760,
      nodeW: 150,
      nodeH: 44,
      gap: 70,
      colLeft: 70,
      colRight: 390,
      minHeight: 260
    };
    let layoutViewBox = { width: LINE_LAYOUT.width, height: 320 };
    const renderNodePos = new Map();

    function rebuildDataset(nextDataset) {
      dataset = (nextDataset && typeof nextDataset === "object")
        ? nextDataset
        : { meta: {}, nodes: [], edges: [] };
      allNodes = Array.isArray(dataset.nodes) ? dataset.nodes : [];
      allEdges = Array.isArray(dataset.edges) ? dataset.edges : [];
      meta = (dataset.meta && typeof dataset.meta === "object") ? dataset.meta : {};

      nodeMap = new Map(allNodes.map(node => [node.id, node]));
      incomingMap = new Map();
      outgoingMap = new Map();
      edgeMap = new Map();
      allEdges.forEach(edge => {
        if (!edge || !edge.from || !edge.to) return;
        if (!incomingMap.has(edge.to)) incomingMap.set(edge.to, []);
        if (!outgoingMap.has(edge.from)) outgoingMap.set(edge.from, []);
        incomingMap.get(edge.to).push(edge);
        outgoingMap.get(edge.from).push(edge);
        edgeMap.set(`${edge.from}>>${edge.to}`, edge);
      });

      transformerNode = allNodes.find(n => n.type === "transformer") || allNodes[0] || null;
    }

    function setPageStats() {
      document.getElementById("pageTitle").textContent = meta.title || "台区拓扑图";
      document.getElementById("pageDesc").textContent = meta.description || "点击节点查看详情";
      document.getElementById("statArea").textContent = meta[META_AREA_ID] || "-";
      document.getElementById("statNode").textContent = String(allNodes.length);
      document.getElementById("statMeter").textContent = String(allNodes.filter(n => n.type === "meter").length);
      const unmatched = meta.counts?.unmatched_meter_side_users ?? 0;
      document.getElementById("statUnmatched").textContent = String(unmatched);
    }

    function setViewBox(width = layoutViewBox.width, height = layoutViewBox.height) {
      const w = Math.max(520, Math.floor(width));
      const h = Math.max(240, Math.floor(height));
      svg.setAttribute("viewBox", `0 0 ${w} ${h}`);
      svg.style.minWidth = `${Math.max(620, Math.floor(w * 0.82))}px`;
      svg.style.height = `${Math.max(320, h)}px`;
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

    function getContentSize(zoom = zoomLevel) {
      const z = Number(zoom) || 1;
      const baseWidth = svg.clientWidth || svgWrap.clientWidth || 0;
      const baseHeight = svg.clientHeight || svgWrap.clientHeight || 0;
      return {
        width: baseWidth * z,
        height: baseHeight * z
      };
    }

    function clampPan(nextX, nextY, zoom = zoomLevel) {
      const wrapW = svgWrap.clientWidth || 0;
      const wrapH = svgWrap.clientHeight || 0;
      const size = getContentSize(zoom);
      const contentW = size.width;
      const contentH = size.height;
      let x = Number.isFinite(nextX) ? nextX : 0;
      let y = Number.isFinite(nextY) ? nextY : 0;

      if (contentW <= wrapW) {
        x = (wrapW - contentW) / 2;
      } else {
        const minX = wrapW - contentW;
        x = Math.min(0, Math.max(minX, x));
      }

      if (contentH <= wrapH) {
        y = (wrapH - contentH) / 2;
      } else {
        const minY = wrapH - contentH;
        y = Math.min(0, Math.max(minY, y));
      }

      return { x, y };
    }

    function applyViewportTransform() {
      svg.style.transform = `translate(${panX}px, ${panY}px) scale(${zoomLevel})`;
      document.getElementById("zoomLabel").textContent = `${Math.round(zoomLevel * 100)}%`;
    }

    function setZoom(nextZoom, anchorClient = null, force = false) {
      const oldZoom = zoomLevel;
      const snapped = Math.round(nextZoom * 20) / 20;
      const newZoom = Math.min(MAX_ZOOM, Math.max(MIN_ZOOM, Number(snapped.toFixed(2))));
      if (!force && Math.abs(newZoom - oldZoom) < 0.001) return;

      const rect = svgWrap.getBoundingClientRect();
      let anchorX = svgWrap.clientWidth / 2;
      let anchorY = svgWrap.clientHeight / 2;
      if (anchorClient && Number.isFinite(anchorClient.clientX) && Number.isFinite(anchorClient.clientY)) {
        anchorX = Math.min(Math.max(anchorClient.clientX - rect.left, 0), svgWrap.clientWidth);
        anchorY = Math.min(Math.max(anchorClient.clientY - rect.top, 0), svgWrap.clientHeight);
      }

      const contentX = (anchorX - panX) / oldZoom;
      const contentY = (anchorY - panY) / oldZoom;

      zoomLevel = newZoom;
      const nextPanX = anchorX - contentX * zoomLevel;
      const nextPanY = anchorY - contentY * zoomLevel;
      const clamped = clampPan(nextPanX, nextPanY, zoomLevel);
      panX = clamped.x;
      panY = clamped.y;
      applyViewportTransform();
    }

    function sortNodes(nodes) {
      return [...nodes].sort((a, b) => String(a.name || a.id).localeCompare(String(b.name || b.id), "zh-CN"));
    }

    function getRenderedPos(node) {
      return renderNodePos.get(node.id) || { x: node.x, y: node.y };
    }

    function getLevelViewboxPolicy() {
      return { minW: LINE_LAYOUT.width, minH: LINE_LAYOUT.minHeight, padX: 0, padY: 0, minWidthScale: 0.82 };
    }

    function getVisibleBounds() {
      if (!visibleNodes.length) return null;
      let minX = Infinity;
      let minY = Infinity;
      let maxX = -Infinity;
      let maxY = -Infinity;

      const includePoint = (x, y, padX = 0, padY = padX) => {
        minX = Math.min(minX, x - padX);
        maxX = Math.max(maxX, x + padX);
        minY = Math.min(minY, y - padY);
        maxY = Math.max(maxY, y + padY);
      };

      visibleNodes.forEach(node => {
        const p = getRenderedPos(node);
        const m = getNodeMetrics(node);
        const halfW = node.shape === "rect" ? m.rectOffsetX : m.circleRadius;
        const halfH = node.shape === "rect" ? m.rectOffsetY : m.circleRadius;
        includePoint(p.x, p.y, halfW, halfH);
      });

      visibleEdges.forEach(edge => {
        const from = nodeMap.get(edge.from);
        const to = nodeMap.get(edge.to);
        if (!from || !to) return;
        const fp = getRenderedPos(from);
        const tp = getRenderedPos(to);
        const fm = getNodeMetrics(from);
        const tm = getNodeMetrics(to);
        const edgePad = 6;
        includePoint(fp.x, fp.y + (from.shape === "rect" ? fm.rectOffsetY - 4 : fm.circleRadius), edgePad, edgePad);
        includePoint(tp.x, tp.y - (to.shape === "rect" ? tm.rectOffsetY - 4 : tm.circleRadius), edgePad, edgePad);
      });

      if (!Number.isFinite(minX) || !Number.isFinite(maxX) || !Number.isFinite(minY) || !Number.isFinite(maxY)) {
        return null;
      }

      const width = Math.max(1, maxX - minX);
      const height = Math.max(1, maxY - minY);
      return {
        minX,
        minY,
        maxX,
        maxY,
        width,
        height,
        centerX: (minX + maxX) / 2,
        centerY: (minY + maxY) / 2
      };
    }

    function applyLevelLayout() {
      renderNodePos.clear();
      const parent = currentView.parent;
      const children = currentView.children || [];
      if (!parent) {
        layoutViewBox = { width: LINE_LAYOUT.width, height: LINE_LAYOUT.minHeight };
        return;
      }

      const count = Math.max(children.length, 1);
      const height = Math.max(LINE_LAYOUT.minHeight, count * LINE_LAYOUT.gap + 60);
      layoutViewBox = { width: LINE_LAYOUT.width, height };

      const parentX = LINE_LAYOUT.colLeft + LINE_LAYOUT.nodeW / 2;
      const childX = LINE_LAYOUT.colRight + LINE_LAYOUT.nodeW / 2;
      const parentY = height / 2;

      const listCenters = (len) => {
        if (!len) return [];
        const total = (len - 1) * LINE_LAYOUT.gap;
        const start = (height - total) / 2;
        return Array.from({ length: len }, (_, i) => start + i * LINE_LAYOUT.gap);
      };

      renderNodePos.set(parent.id, { x: parentX, y: parentY });
      const ys = listCenters(children.length);
      children.forEach((node, idx) => {
        renderNodePos.set(node.id, { x: childX, y: ys[idx] });
      });
    }

    function updateViewBoxByVisible() {
      const policy = getLevelViewboxPolicy();
      const w = Math.max(policy.minW, Math.ceil(layoutViewBox.width || LINE_LAYOUT.width));
      const h = Math.max(policy.minH, Math.ceil(layoutViewBox.height || LINE_LAYOUT.minHeight));
      setViewBox(w, h);
    }

    function canPan() {
      const size = getContentSize(zoomLevel);
      return size.width > (svgWrap.clientWidth + 0.5) || size.height > (svgWrap.clientHeight + 0.5);
    }

    function startDrag(event) {
      if (event.pointerType === "mouse" && event.button !== 0) return;
      if (!canPan()) return;
      isDragging = true;
      activePointerId = Number.isFinite(event.pointerId) ? event.pointerId : null;
      dragMoved = false;
      dragStartX = event.clientX;
      dragStartY = event.clientY;
      dragStartPanX = panX;
      dragStartPanY = panY;
    }

    function handleDrag(event) {
      if (!isDragging) return;
      if (activePointerId !== null && event.pointerId !== activePointerId) return;
      const deltaX = event.clientX - dragStartX;
      const deltaY = event.clientY - dragStartY;
      if (!dragMoved && (Math.abs(deltaX) > DRAG_THRESHOLD || Math.abs(deltaY) > DRAG_THRESHOLD)) {
        dragMoved = true;
        svgWrap.classList.add("dragging");
        if (svgWrap.setPointerCapture && Number.isFinite(event.pointerId)) {
          try { svgWrap.setPointerCapture(event.pointerId); } catch (_) {}
        }
        hideTooltip();
      }
      if (!dragMoved) {
        return;
      }
      const clamped = clampPan(dragStartPanX + deltaX, dragStartPanY + deltaY, zoomLevel);
      panX = clamped.x;
      panY = clamped.y;
      applyViewportTransform();
      event.preventDefault();
    }

    function stopDrag(event = null) {
      if (!isDragging) return;
      if (event && activePointerId !== null && event.pointerId !== activePointerId) return;
      isDragging = false;
      if (event && svgWrap.releasePointerCapture && Number.isFinite(event.pointerId)) {
        try { svgWrap.releasePointerCapture(event.pointerId); } catch (_) {}
      }
      activePointerId = null;
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

    function getChildrenOfType(parentId, type) {
      if (!parentId) return [];
      return sortNodes(
        (outgoingMap.get(parentId) || [])
          .map(edge => nodeMap.get(edge.to))
          .filter(node => node && node.type === type)
      );
    }

    function getBoxesUnderTransformer(transformerId) {
      const boxes = new Map();
      if (!transformerId) return [];
      const transformerEdges = outgoingMap.get(transformerId) || [];
      transformerEdges.forEach(edge => {
        const node = nodeMap.get(edge.to);
        if (!node) return;
        if (node.type === "box") {
          boxes.set(node.id, node);
          return;
        }
        if (node.type === "branch") {
          const branchEdges = outgoingMap.get(node.id) || [];
          branchEdges.forEach(nextEdge => {
            const nextNode = nodeMap.get(nextEdge.to);
            if (nextNode && nextNode.type === "box") boxes.set(nextNode.id, nextNode);
          });
        }
      });
      return sortNodes([...boxes.values()]);
    }

    function buildEdge(from, to) {
      const metaEdge = edgeMap.get(`${from}>>${to}`);
      return {
        from,
        to,
        status: metaEdge?.status || "normal",
        name: metaEdge?.name,
        note: metaEdge?.note
      };
    }

    function getOverviewData() {
      const transformer = transformerNode || allNodes.find(n => n.type === "transformer") || null;
      if (!transformer) {
        return { parent: null, children: [], nodes: [], edges: [], label: "变→线" };
      }
      let branches = getChildrenOfType(transformer.id, "branch");
      if (!branches.length) {
        // Fallback when branch layer is missing in dataset.
        branches = getBoxesUnderTransformer(transformer.id);
      }
      const edges = branches.map(node => buildEdge(transformer.id, node.id));
      return {
        parent: transformer,
        children: branches,
        nodes: [transformer, ...branches],
        edges,
        label: "变→线"
      };
    }

    function getBranchData(branchId) {
      const branch = nodeMap.get(branchId);
      if (!branch || branch.type !== "branch") {
        viewState.level = "overview";
        viewState.branchId = null;
        return getOverviewData();
      }
      const boxes = getChildrenOfType(branch.id, "box");
      const edges = boxes.map(box => buildEdge(branch.id, box.id));
      return {
        parent: branch,
        children: boxes,
        nodes: [branch, ...boxes],
        edges,
        label: `线→箱: ${branch.name || branchId}`
      };
    }

    function getBoxData(boxId) {
      const box = nodeMap.get(boxId);
      if (!box || box.type !== "box") {
        viewState.level = "overview";
        viewState.branchId = null;
        viewState.boxId = null;
        return getOverviewData();
      }
      const meters = getChildrenOfType(box.id, "meter");
      const edges = meters.map(meter => buildEdge(box.id, meter.id));
      return {
        parent: box,
        children: meters,
        nodes: [box, ...meters],
        edges,
        label: `箱→户: ${box.name || boxId}`
      };
    }

    function computeVisibleData() {
      if (viewState.level === "box") return getBoxData(viewState.boxId);
      if (viewState.level === "branch") return getBranchData(viewState.branchId);
      return getOverviewData();
    }

    function renderBreadcrumbs() {
      const crumbs = [{ label: "变→线", level: "overview" }];
      if (viewState.level === "branch" || viewState.level === "box") {
        const branch = nodeMap.get(viewState.branchId);
        const label = branch ? `线→箱: ${branch.name || branch.id}` : "线→箱";
        crumbs.push({ label, level: "branch", branchId: viewState.branchId });
      }
      if (viewState.level === "box") {
        const box = nodeMap.get(viewState.boxId);
        const label = box ? `箱→户: ${box.name || box.id}` : "箱→户";
        crumbs.push({ label, level: "box", boxId: viewState.boxId, branchId: viewState.branchId });
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
          setView(level, {
            branchId,
            boxId,
            selectedId: level === "overview" ? transformerNode?.id : (boxId || branchId),
            centerMode: "fit"
          });
        });
      });
    }

    function updateBoardMeta(levelLabel) {
      const extra = typeof window !== "undefined" ? String(window.__tqBoardMetaExtra || "").trim() : "";
      boardMeta.textContent =
        `当前层级: ${levelLabel} | 显示节点 ${visibleNodes.length} / 连线 ${visibleEdges.length} | ` +
        `全量节点 ${allNodes.length} / 连线 ${allEdges.length}` +
        (extra ? ` | ${extra}` : "");

      backLevelBtn.disabled = viewState.level === "overview";
      backLevelBtn.style.opacity = viewState.level === "overview" ? "0.6" : "1";
      renderBreadcrumbs();
    }

    function drawEdges() {
      if (!visibleEdges.length) return;
      const defs = createSvgElement("defs", {});
      const marker = createSvgElement("marker", {
        id: "tqLineArrow",
        viewBox: "0 0 10 10",
        refX: "9",
        refY: "5",
        markerWidth: "6",
        markerHeight: "6",
        orient: "auto"
      });
      marker.appendChild(createSvgElement("path", { d: "M 0 0 L 10 5 L 0 10 Z", fill: "#94b4e8" }));
      defs.appendChild(marker);
      svg.appendChild(defs);

      const halfW = LINE_LAYOUT.nodeW / 2;
      visibleEdges.forEach(edge => {
        const from = nodeMap.get(edge.from);
        const to = nodeMap.get(edge.to);
        if (!from || !to) return;
        const fp = getRenderedPos(from);
        const tp = getRenderedPos(to);
        const line = createSvgElement("path", {
          d: `M${fp.x + halfW} ${fp.y} L${tp.x - halfW} ${tp.y}`,
          class: "tq-line-link",
          "data-from": edge.from,
          "data-to": edge.to,
          "marker-end": "url(#tqLineArrow)"
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
        fill: node.color || "#1d5eb8",
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
        setView("overview", { selectedId: node.id, centerMode: "fit" });
        return;
      }
      if (node.type === "branch") {
        setView("branch", { branchId: node.id, selectedId: node.id, centerMode: "fit" });
        return;
      }
      if (node.type === "box") {
        setView("box", { boxId: node.id, selectedId: node.id, centerMode: "fit" });
        return;
      }
      if (node.type === "meter") {
        selectNode(node.id, "node");
        return;
      }
      selectNode(node.id, "node");
    }

    function drawNodes() {
      visibleNodes.forEach(node => {
        const group = createSvgElement("g", { class: `tq-line-node ${node.type}`, tabindex: "0", "data-id": node.id });
        const p = getRenderedPos(node);
        const rect = createSvgElement("rect", {
          x: p.x - LINE_LAYOUT.nodeW / 2,
          y: p.y - LINE_LAYOUT.nodeH / 2,
          width: LINE_LAYOUT.nodeW,
          height: LINE_LAYOUT.nodeH,
          rx: 10,
          ry: 10
        });
        group.appendChild(rect);

        const labelRaw = node.type === "meter"
          ? (node.details?.[KEY_USER_ID] || node.name || node.code || node.id)
          : (node.name || node.code || node.id);
        const label = shortText(labelRaw, 12);
        const nameText = createSvgElement("text", {
          x: p.x,
          y: p.y,
          class: "tq-line-text"
        });
        nameText.textContent = label || "-";
        group.appendChild(nameText);

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
        const row = document.createElement("div");
        row.className = "kv-row";
        const key = document.createElement("strong");
        key.textContent = "提示";
        const value = document.createElement("div");
        value.textContent = "暂无数据";
        row.appendChild(key);
        row.appendChild(value);
        container.appendChild(row);
        return;
      }
      entries.forEach(([k, v]) => {
        const row = document.createElement("div");
        row.className = "kv-row";
        const key = document.createElement("strong");
        key.textContent = String(k);
        const value = document.createElement("div");
        value.textContent = String(v ?? "");
        row.appendChild(key);
        row.appendChild(value);
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
        const empty = document.createElement("div");
        empty.className = "path-item";
        empty.textContent = "当前节点暂无关联";
        const span = document.createElement("span");
        span.textContent = "请检查节点边数据";
        empty.appendChild(span);
        relationList.appendChild(empty);
        return;
      }
      parents.forEach(p => {
        const div = document.createElement("div");
        div.className = "path-item";
        div.appendChild(document.createTextNode(`上级：${p.name || "-"}`));
        const span = document.createElement("span");
        span.textContent = `${typeLabel[p.type] || p.type} | ${p.code || "-"}`;
        div.appendChild(span);
        relationList.appendChild(div);
      });
      children.forEach(c => {
        const div = document.createElement("div");
        div.className = "path-item";
        div.appendChild(document.createTextNode(`下级：${c.name || "-"}`));
        const span = document.createElement("span");
        span.textContent = `${typeLabel[c.type] || c.type} | ${c.code || "-"}`;
        div.appendChild(span);
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

    function setTooltipContent(title, lines) {
      tooltip.innerHTML = "";
      const titleEl = document.createElement("div");
      titleEl.className = "tooltip-title";
      titleEl.textContent = title || "-";
      tooltip.appendChild(titleEl);
      (lines || []).forEach((line) => {
        const row = document.createElement("div");
        row.textContent = line;
        tooltip.appendChild(row);
      });
    }

    function updateTooltip(node, event) {
      const userId = node.details?.[KEY_USER_ID] || node.details?.[KEY_GRAPH_USER_ID] || "-";
      const status = node.details?.[KEY_STATUS] || node.details?.[KEY_USER_STATUS] || "-";
      setTooltipContent(node.name || "-", [
        `类型：${typeLabel[node.type] || node.type}`,
        `编号：${node.code || "-"}`,
        `状态：${status}`,
        `用户编号：${userId}`
      ]);
      tooltip.style.left = `${event.clientX + 10}px`;
      tooltip.style.top = `${event.clientY + 12}px`;
      tooltip.classList.add("visible");
    }

    function updateEdgeTooltip(edge, from, to, event) {
      const status = edgeStatusMap[edge.status]?.label || edge.status || "-";
      setTooltipContent(edge.name || "链路", [
        `起点：${from.name || "-"}`,
        `终点：${to.name || "-"}`,
        `状态：${status}`,
        `说明：${edge.note || "-"}`
      ]);
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
      visibleEdges.forEach(edge => {
        if (edge.from === nodeId) related.add(edge.to);
        if (edge.to === nodeId) related.add(edge.from);
      });

      nodeElements.forEach((el, id) => {
        if (related.has(id)) el.classList.add("selected");
      });
      edgeElements.forEach(({ el, edge }) => {
        if (edge.from === nodeId || edge.to === nodeId) el.classList.add("selected");
      });
    }

    function centerNode(node) {
      const p = getRenderedPos(node);
      const vb = svg.viewBox && svg.viewBox.baseVal ? svg.viewBox.baseVal : { x: 0, y: 0, width: 1400, height: 980 };
      const vbWidth = Math.max(1, vb.width || 1400);
      const vbHeight = Math.max(1, vb.height || 980);
      const pxPerUnitX = svg.clientWidth / vbWidth;
      const pxPerUnitY = svg.clientHeight / vbHeight;
      const baseX = (p.x - (vb.x || 0)) * pxPerUnitX;
      const baseY = (p.y - (vb.y || 0)) * pxPerUnitY;
      const targetX = svgWrap.clientWidth / 2 - baseX * zoomLevel;
      const targetY = svgWrap.clientHeight / 2 - baseY * zoomLevel;
      const clamped = clampPan(targetX, targetY, zoomLevel);
      panX = clamped.x;
      panY = clamped.y;
      applyViewportTransform();
    }

    function centerViewport() {
      const size = getContentSize(zoomLevel);
      const targetX = (svgWrap.clientWidth - size.width) / 2;
      const targetY = (svgWrap.clientHeight - size.height) / 2;
      const clamped = clampPan(targetX, targetY, zoomLevel);
      panX = clamped.x;
      panY = clamped.y;
      applyViewportTransform();
    }

    function fitCurrentView() {
      const wrapW = svgWrap.clientWidth || 0;
      const wrapH = svgWrap.clientHeight || 0;
      const baseSize = getContentSize(1);
      const baseW = baseSize.width;
      const baseH = baseSize.height;
      if (wrapW <= 0 || wrapH <= 0 || baseW <= 0 || baseH <= 0) return;

      const fitZoomRaw = Math.min(wrapW / baseW, wrapH / baseH);
      const fitZoom = Math.min(1, Math.max(MIN_ZOOM, Number((fitZoomRaw * FIT_VIEW_MARGIN).toFixed(2))));
      zoomLevel = fitZoom;
      centerViewport();
    }

    function selectNode(nodeId, centerMode = "none") {
      const node = nodeMap.get(nodeId);
      if (!node) return;
      if (!nodeElements.has(nodeId)) return;
      selectedNodeId = nodeId;
      clearSelectionClass();
      nodeElements.get(nodeId)?.classList.add("selected");
      highlightAround(nodeId);
      updateInfo(node);
      if (centerMode === "node") centerNode(node);
    }

    function renderCurrentView(preferredSelectId = null, centerMode = "none") {
      const view = computeVisibleData();
      visibleNodes = view.nodes;
      visibleEdges = view.edges;
      visibleIdSet = new Set(visibleNodes.map(n => n.id));
      currentView = { parent: view.parent || null, children: view.children || [] };
      currentLevelLabel = view.label || "";
      applyLevelLayout();
      updateViewBoxByVisible();

      svg.innerHTML = "";
      nodeElements.clear();
      edgeElements.length = 0;
      drawEdges();
      drawNodes();
      updateBoardMeta(view.label);
      if (typeof window !== "undefined" && typeof window.renderTopologyOverlays === "function") {
        window.renderTopologyOverlays();
      }
      const clamped = clampPan(panX, panY, zoomLevel);
      panX = clamped.x;
      panY = clamped.y;
      applyViewportTransform();

      const visibleIdSet = new Set(visibleNodes.map(n => n.id));
      let targetId = preferredSelectId || selectedNodeId;
      if (!targetId || !visibleIdSet.has(targetId)) {
        if (viewState.level === "box") targetId = viewState.boxId;
        else if (viewState.level === "branch") targetId = viewState.branchId;
        else targetId = transformerNode?.id || visibleNodes[0]?.id;
      }
      if (targetId && visibleIdSet.has(targetId)) {
        selectNode(targetId, centerMode);
      }
      if (centerMode === "fit") {
        fitCurrentView();
      } else if (centerMode === "view") {
        centerViewport();
      }
    }

    function setView(level, opts = {}) {
      const prevLevel = viewState.level;
      const prevBranchId = viewState.branchId;
      const prevBoxId = viewState.boxId;
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
      const viewChanged =
        prevLevel !== viewState.level ||
        prevBranchId !== viewState.branchId ||
        prevBoxId !== viewState.boxId;
      const centerMode = opts.centerMode || (opts.center ? "fit" : (viewChanged ? "fit" : "none"));
      renderCurrentView(opts.selectedId || null, centerMode);
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
        setView("overview", { selectedId: node.id, centerMode: "fit" });
        return;
      }
      if (node.type === "branch") {
        setView("branch", { branchId: node.id, selectedId: node.id, centerMode: "fit" });
        return;
      }
      if (node.type === "box") {
        const branchId = getParentOfType(node.id, "branch");
        setView("box", { branchId, boxId: node.id, selectedId: node.id, centerMode: "fit" });
        return;
      }
      if (node.type === "meter") {
        const boxId = getParentOfType(node.id, "box");
        if (boxId) {
          const branchId = getParentOfType(boxId, "branch");
          setView("box", { branchId, boxId, selectedId: node.id, centerMode: "fit" });
          return;
        }
      }
      renderCurrentView(node.id, "fit");
    }

    function goBackLevel() {
      if (viewState.level === "box") {
        setView("branch", { branchId: viewState.branchId, selectedId: viewState.branchId, centerMode: "fit" });
        return;
      }
      if (viewState.level === "branch") {
        setView("overview", { selectedId: transformerNode?.id, centerMode: "fit" });
        return;
      }
    }

    function bindEvents() {
      document.getElementById("zoomInBtn").addEventListener("click", () => setZoom(zoomLevel + 0.15));
      document.getElementById("zoomOutBtn").addEventListener("click", () => setZoom(zoomLevel - 0.15));
      document.getElementById("zoomResetBtn").addEventListener("click", () => {
        setZoom(1, null, true);
        centerViewport();
      });
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

      svgWrap.addEventListener("pointerdown", startDrag);
      window.addEventListener("pointermove", handleDrag);
      window.addEventListener("pointerup", stopDrag);
      window.addEventListener("pointercancel", stopDrag);
      window.addEventListener("blur", () => stopDrag());
      svgWrap.addEventListener("wheel", event => {
        event.preventDefault();
        setZoom(zoomLevel + (event.deltaY < 0 ? 0.1 : -0.1), { clientX: event.clientX, clientY: event.clientY });
      }, { passive: false });
      window.addEventListener("resize", () => {
        const clamped = clampPan(panX, panY, zoomLevel);
        panX = clamped.x;
        panY = clamped.y;
        applyViewportTransform();
      });
    }

    function applyDataset(nextDataset) {
      rebuildDataset(nextDataset || window.TOPOLOGY_DATA);
      selectedNodeId = null;
      viewState.level = "overview";
      viewState.branchId = null;
      viewState.boxId = null;
      visibleNodes = [];
      visibleEdges = [];
      visibleIdSet = new Set();
      renderNodePos.clear();
      tooltip.classList.remove("visible");
      errorBox.style.display = "none";

      if (!allNodes.length) {
        svg.innerHTML = "";
        errorBox.style.display = "block";
        errorBox.textContent = "未加载到 topology-data.js，请先生成数据文件。";
        boardMeta.textContent = "未加载到拓扑数据";
        return false;
      }

      setPageStats();
      setViewBox();
      setZoom(1, null, true);
      setView("overview", { selectedId: transformerNode?.id || allNodes[0]?.id, center: true });
      return true;
    }

    function init() {
      rebuildDataset(window.TOPOLOGY_DATA);
      bindEvents();
      applyDataset(dataset);
      window.setEmbeddedTopologyDataset = (nextDataset) => applyDataset(nextDataset);
      window.__tqUseModuleBoardMeta = true;
      window.__tqLineLayout = { nodeW: LINE_LAYOUT.nodeW, nodeH: LINE_LAYOUT.nodeH };
      window.__tqGetRenderedPos = (nodeId) => {
        if (!nodeId) return null;
        if (!visibleIdSet.has(nodeId)) return null;
        const pos = renderNodePos.get(nodeId);
        if (pos) return { x: pos.x, y: pos.y };
        const node = nodeMap.get(nodeId);
        return node ? { x: node.x, y: node.y } : null;
      };
      window.__tqRefreshBoardMeta = () => {
        if (currentLevelLabel) updateBoardMeta(currentLevelLabel);
      };
    }

    init();
  };
})();
