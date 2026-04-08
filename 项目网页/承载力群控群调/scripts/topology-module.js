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
    const DRAG_THRESHOLD = 8;
    const MIN_ZOOM = 0.1;
    const MAX_ZOOM = 2.2;
    const FIT_VIEW_MARGIN = 0.97;
    const LEVEL_VIEWBOX_POLICY = {
      overview: { padX: 210, padY: 165, minW: 1060, minH: 760, minWidthScale: 0.74 },
      branch: { padX: 190, padY: 150, minW: 980, minH: 720, minWidthScale: 0.74 },
      box: { padX: 190, padY: 170, minW: 980, minH: 760, minWidthScale: 0.76 }
    };
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
      allEdges.forEach(edge => {
        if (!edge || !edge.from || !edge.to) return;
        if (!incomingMap.has(edge.to)) incomingMap.set(edge.to, []);
        if (!outgoingMap.has(edge.from)) outgoingMap.set(edge.from, []);
        incomingMap.get(edge.to).push(edge);
        outgoingMap.get(edge.from).push(edge);
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

    function getLevelViewboxPolicy(level = viewState.level) {
      return LEVEL_VIEWBOX_POLICY[level] || LEVEL_VIEWBOX_POLICY.box;
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
      const byType = {
        transformer: visibleNodes.filter(n => n.type === "transformer"),
        branch: visibleNodes.filter(n => n.type === "branch"),
        box: visibleNodes.filter(n => n.type === "box"),
        meter: visibleNodes.filter(n => n.type === "meter")
      };

      const centerX = 760;
      const put = (id, x, y) => renderNodePos.set(id, { x, y });
      const placeGridRowsCentered = (items, cols, xGap, yGap, startY) => {
        if (!items.length) return;
        const safeCols = Math.max(1, cols);
        for (let row = 0; row * safeCols < items.length; row += 1) {
          const rowItems = items.slice(row * safeCols, row * safeCols + safeCols);
          const rowStartX = centerX - ((rowItems.length - 1) * xGap) / 2;
          rowItems.forEach((n, idx) => {
            put(n.id, rowStartX + idx * xGap, startY + row * yGap);
          });
        }
      };

      if (viewState.level === "overview") {
        const t = byType.transformer[0];
        if (t) put(t.id, centerX, 130);
        const branches = sortNodes(byType.branch);
        const cols = Math.max(3, Math.min(5, Math.ceil(Math.sqrt(Math.max(branches.length, 1) * 1.2))));
        const xGap = 250;
        const yGap = 180;
        placeGridRowsCentered(branches, cols, xGap, yGap, 350);
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
        placeGridRowsCentered(boxes, cols, xGap, yGap, 500);
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
        placeGridRowsCentered(meters, cols, xGap, yGap, 610);
      }
    }

    function updateViewBoxByVisible() {
      const bounds = getVisibleBounds();
      if (!bounds) return;

      const policy = getLevelViewboxPolicy();
      const rawW = bounds.width + policy.padX * 2;
      const rawH = bounds.height + policy.padY * 2;
      const w = Math.max(policy.minW, Math.ceil(rawW));
      const h = Math.max(policy.minH, Math.ceil(rawH));
      const x = Math.floor(bounds.centerX - w / 2);
      const y = Math.floor(bounds.centerY - h / 2);

      svg.setAttribute("viewBox", `${x} ${y} ${w} ${h}`);
      svg.style.minWidth = `${Math.max(880, Math.floor(w * policy.minWidthScale))}px`;
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
      selectNode(node.id, "node");
    }

    function drawNodes() {
      const showName = zoomLevel >= 0.52;
      const showSub = zoomLevel >= 0.68;

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
        } else {
          nameText.style.fill = "#ffffff";
          nameText.style.stroke = "rgba(8,25,44,0.52)";
          nameText.style.strokeWidth = "1.1px";
          nameText.style.paintOrder = "stroke";
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
        } else {
          codeText.style.fill = "#153955";
          codeText.style.stroke = "rgba(255,255,255,0.65)";
          codeText.style.strokeWidth = "0.6px";
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
      applyLevelLayout();
      updateViewBoxByVisible();

      svg.innerHTML = "";
      nodeElements.clear();
      edgeElements.length = 0;
      drawEdges();
      drawNodes();
      updateBoardMeta(view.label);
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
    }

    init();
  };
})();
