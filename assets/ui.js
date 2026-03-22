(() => {
  const showToast = () => {};
  const formatDateTime = (date = new Date()) => {
    const pad = (value) => String(value).padStart(2, '0');
    return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())} ${pad(date.getHours())}:${pad(date.getMinutes())}`;
  };
  const OPERATIONAL_DATA_CLEAR_ONCE_KEY = 'mobile-clear-operational-data-once-v3';
  const DISPATCH_PREVIEW_ONE_TIME_SEED_KEY = 'mobile-dispatch-preview-seed-v1';
  const DISPATCH_FAILURE_HISTORY_ONE_TIME_SEED_KEY = 'mobile-dispatch-failure-history-preview-v1';
  const setupPaginatedTables = () => {
    const containers = document.querySelectorAll('[data-paginated]');
    containers.forEach((container) => {
      const table = container.querySelector('table');
      const getRows = () => (table ? Array.from(table.querySelectorAll('tbody tr')) : []);
      const getVisibleRows = () => getRows().filter((row) => row.dataset.filterHidden !== 'true');
      const pager = container.querySelector('[data-pager]');
      const tbody = table ? table.querySelector('tbody') : null;
      if (!table || !pager || !tbody) return;

      const pageSizeSelect = pager.querySelector('[data-page-size]');
      const pagesWrap = pager.querySelector('[data-pages]');
      let pageSize = parseInt(container.dataset.pageSize || '', 10);
      if (!pageSize || Number.isNaN(pageSize)) {
        pageSize = parseInt(pageSizeSelect ? pageSizeSelect.value : '', 10) || 5;
      }
      let currentPage = 1;

      const renderRows = () => {
        const rows = getRows();
        const visibleRows = getVisibleRows();
        const totalPages = Math.max(1, Math.ceil(visibleRows.length / pageSize));
        if (currentPage > totalPages) currentPage = totalPages;
        const start = (currentPage - 1) * pageSize;
        const end = start + pageSize;
        let visibleIndex = 0;
        rows.forEach((row) => {
          if (row.dataset.filterHidden === 'true') {
            row.style.display = 'none';
            return;
          }
          row.style.display = visibleIndex >= start && visibleIndex < end ? '' : 'none';
          visibleIndex += 1;
        });
        renderPages(totalPages);
      };

      const createPageButton = (label, page, disabled, skip, active) => {
        const btn = document.createElement('button');
        btn.className = 'page-btn' + (skip ? ' page-btn-skip' : '') + (active ? ' active' : '');
        btn.type = 'button';
        btn.textContent = label;
        btn.dataset.page = page;
        if (disabled) btn.disabled = true;
        return btn;
      };

      const renderPages = (totalPages) => {
        if (!pagesWrap) return;
        pagesWrap.innerHTML = '';
        pagesWrap.appendChild(createPageButton('‹', 'prev', currentPage === 1, true, false));
        for (let i = 1; i <= totalPages; i += 1) {
          pagesWrap.appendChild(createPageButton(String(i), String(i), false, false, i === currentPage));
        }
        pagesWrap.appendChild(createPageButton('›', 'next', currentPage === totalPages, true, false));
      };

      if (pageSizeSelect) {
        pageSizeSelect.value = String(pageSize);
        pageSizeSelect.addEventListener('change', () => {
          const next = parseInt(pageSizeSelect.value, 10);
          pageSize = Number.isNaN(next) ? pageSize : next;
          currentPage = 1;
          renderRows();
        });
      }

      if (pagesWrap) {
        pagesWrap.addEventListener('click', (event) => {
          const btn = event.target.closest('[data-page]');
          if (!btn) return;
          const target = btn.dataset.page;
          const totalPages = Math.max(1, Math.ceil(getVisibleRows().length / pageSize));
          if (target === 'prev') {
            currentPage = Math.max(1, currentPage - 1);
          } else if (target === 'next') {
            currentPage = Math.min(totalPages, currentPage + 1);
          } else {
            const numeric = parseInt(target, 10);
            if (!Number.isNaN(numeric)) currentPage = numeric;
          }
          renderRows();
        });
      }

      container.refreshPagination = (page = 1) => {
        currentPage = page;
        renderRows();
      };

      renderRows();

      const observer = new MutationObserver(() => {
        renderRows();
      });
      observer.observe(tbody, { childList: true });
    });
  };

  const PROJECT_STORAGE_KEY = 'mobile-project-catalog';
  const LEGACY_PROJECT_SEED_NAMES = new Set(['南方电网A', '南方电网B']);
  const PROJECT_COMPANY_TYPES = new Set(['需求方', '供应方']);
  const normalizeProjectCompanyType = (companyType) => {
    const value = (companyType || '').trim();
    if (value === '运营方') return '供应方';
    return PROJECT_COMPANY_TYPES.has(value) ? value : '需求方';
  };
  const normalizeProjectRecord = (record) => ({
    companyName: (record.companyName || '').trim(),
    creditCode: (record.creditCode || record.companyId || '').trim(),
    contactName: (record.contactName || '').trim(),
    contactPhone: (record.contactPhone || '').trim(),
    companyType: normalizeProjectCompanyType(record.companyType),
    address: (record.address || '').trim(),
    region: (record.region || '').trim(),
    contractNo: (record.contractNo || '').trim(),
    remark: (record.remark || record.note || '').trim(),
    createdAt: record.createdAt || ''
  });
  const isLegacyProjectSeed = (projects) => {
    if (!Array.isArray(projects) || projects.length !== 2) return false;
    return projects.every((project) => LEGACY_PROJECT_SEED_NAMES.has((project.companyName || '').trim()));
  };
  const DEFAULT_PROJECT_CATALOG = [
    {
      companyName: '南方电网综合能源（广州）有限公司',
      creditCode: '91440101MA59A1B23C',
      contactName: '李俊',
      contactPhone: '13800138001',
      companyType: '需求方',
      address: '广州市天河区珠江新城华夏路 16 号富力中心 A 座 18 层',
      region: '广州',
      contractNo: 'NWGZ-HT-2026-001',
      remark: '',
      createdAt: '2026-03-20 09:18:00'
    },
    {
      companyName: '南网能源科技（广州黄埔）有限公司',
      creditCode: '91440101MA5C2D8E1F',
      contactName: '陈珊',
      contactPhone: '13900139002',
      companyType: '供应方',
      address: '广州市黄埔区科学大道 111 号信息大厦 9 层',
      region: '广州',
      contractNo: 'NWGZ-HT-2026-002',
      remark: '',
      createdAt: '2026-03-17 15:42:00'
    },
    {
      companyName: '南方电网数字电力（广州）有限公司',
      creditCode: '91440101MA5D7F4G9H',
      contactName: '黄文',
      contactPhone: '13700137003',
      companyType: '需求方',
      address: '广州市海珠区琶洲大道东 8 号保利国际广场 3 层',
      region: '广州',
      contractNo: 'NWGZ-HT-2026-003',
      remark: '',
      createdAt: '2026-03-12 10:06:00'
    },
    {
      companyName: '南网充电运营（广州番禺）有限公司',
      creditCode: '91440101MA5E3J6K2L',
      contactName: '赵琳',
      contactPhone: '13600136004',
      companyType: '供应方',
      address: '广州市番禺区汉溪大道东 290 号保利大都汇 T2 栋 12 层',
      region: '广州',
      contractNo: 'NWGZ-HT-2026-004',
      remark: '',
      createdAt: '2026-03-06 13:25:00'
    },
    {
      companyName: '南方电网电动出行服务（广州）有限公司',
      creditCode: '91440101MA5F8M3N7P',
      contactName: '周岚',
      contactPhone: '13500135005',
      companyType: '供应方',
      address: '广州市白云区云城西路 888 号绿地中心 22 层',
      region: '广州',
      contractNo: 'NWGZ-HT-2026-005',
      remark: '',
      createdAt: '2026-02-28 11:34:00'
    },
    {
      companyName: '南网储能运维（广州南沙）有限公司',
      creditCode: '91440101MA5H4Q2R6T',
      contactName: '何涛',
      contactPhone: '13400134006',
      companyType: '需求方',
      address: '广州市南沙区进港大道 577 号创享湾 6 栋 5 层',
      region: '广州',
      contractNo: 'NWGZ-HT-2026-006',
      remark: '',
      createdAt: '2026-02-23 16:50:00'
    }
  ];

  const loadProjectCatalogFromStorage = () => {
    try {
      const raw = localStorage.getItem(PROJECT_STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) {
          const normalized = parsed
            .map(normalizeProjectRecord)
            .filter((project) => project.companyName);
          if (isLegacyProjectSeed(normalized)) {
            localStorage.removeItem(PROJECT_STORAGE_KEY);
          } else {
            return normalized;
          }
        }
      }
    } catch (error) {
      console.warn('project catalog load failed', error);
    }
    if (Array.isArray(window.defaultProjectCatalog) && window.defaultProjectCatalog.length) {
      return window.defaultProjectCatalog.map(normalizeProjectRecord);
    }
    return DEFAULT_PROJECT_CATALOG.map(normalizeProjectRecord);
  };

  let projectCatalogCache = null;
  const persistProjectCatalog = (items) => {
    const normalized = items
      .map(normalizeProjectRecord)
      .filter((project) => project.companyName);
    projectCatalogCache = normalized;
    try {
      localStorage.setItem(PROJECT_STORAGE_KEY, JSON.stringify(normalized));
    } catch (error) {
      console.warn('project catalog save failed', error);
    }
    return normalized;
  };

  const getProjectCatalog = () => {
    if (!projectCatalogCache) {
      projectCatalogCache = loadProjectCatalogFromStorage();
    }
    return projectCatalogCache;
  };

  const projectCatalogAPI = {
    getAll: () => getProjectCatalog(),
    findByName: (companyName) => {
      if (!companyName) return null;
      return getProjectCatalog().find((project) => project.companyName === companyName);
    },
    replaceAll: (projects) => persistProjectCatalog(projects),
    reloadFromStorage: () => {
      projectCatalogCache = loadProjectCatalogFromStorage();
      return projectCatalogCache;
    }
  };

  const WORKORDER_STORAGE_KEY = 'mobile-workorder-catalog';
  const WORKORDER_STORAGE_VERSION_KEY = 'mobile-workorder-catalog-version';
  const WORKORDER_STORAGE_VERSION = '2026-03-21-v1';
  const WORKORDER_TYPES = new Set(['供电', '充电']);
  const normalizeWorkorderType = (orderType) => {
    const value = (orderType || '').toString().trim();
    if (value === '保供电') return '供电';
    return WORKORDER_TYPES.has(value) ? value : '供电';
  };
  const normalizeWorkorderRecord = (record) => ({
    workorderId: (record.workorderId || '').toString().trim(),
    companyName: (record.companyName || '').toString().trim(),
    contactName: (record.contactName || '').toString().trim(),
    contactPhone: (record.contactPhone || '').toString().trim(),
    orderType: normalizeWorkorderType(record.orderType),
    address: (record.address || '').toString().trim(),
    createdAt: (record.createdAt || '').toString().trim(),
    status: (record.status || '').toString().trim(),
    companyId: (record.companyId || '').toString().trim(),
    companyType: (record.companyType || '').toString().trim(),
    energyDemand: (record.energyDemand || '').toString().trim(),
    requiredPower: (record.requiredPower || '').toString().trim(),
    startTime: (record.startTime || '').toString().trim(),
    note: (record.note || '').toString().trim(),
    cancelReason: (record.cancelReason || '').toString().trim()
  });
  const DEFAULT_WORKORDER_CATALOG = [];

  const resolveDefaultWorkorderCatalog = () => {
    if (Array.isArray(window.defaultWorkorderCatalog)) {
      return window.defaultWorkorderCatalog.map(normalizeWorkorderRecord);
    }
    return DEFAULT_WORKORDER_CATALOG.map(normalizeWorkorderRecord);
  };

  const loadWorkorderCatalogFromStorage = () => {
    try {
      const version = localStorage.getItem(WORKORDER_STORAGE_VERSION_KEY);
      if (version !== WORKORDER_STORAGE_VERSION) {
        return resolveDefaultWorkorderCatalog();
      }
      const raw = localStorage.getItem(WORKORDER_STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) {
          return parsed
            .map(normalizeWorkorderRecord)
            .filter((item) => item.workorderId);
        }
      }
    } catch (error) {
      console.warn('workorder catalog load failed', error);
    }
    return resolveDefaultWorkorderCatalog();
  };

  let workorderCatalogCache = null;
  const persistWorkorderCatalog = (items) => {
    const normalized = items
      .map(normalizeWorkorderRecord)
      .filter((item) => item.workorderId);
    workorderCatalogCache = normalized;
    try {
      localStorage.setItem(WORKORDER_STORAGE_KEY, JSON.stringify(normalized));
      localStorage.setItem(WORKORDER_STORAGE_VERSION_KEY, WORKORDER_STORAGE_VERSION);
    } catch (error) {
      console.warn('workorder catalog save failed', error);
    }
    return normalized;
  };

  const getWorkorderCatalog = () => {
    if (!workorderCatalogCache) {
      workorderCatalogCache = loadWorkorderCatalogFromStorage();
    }
    return workorderCatalogCache;
  };

  const workorderCatalogAPI = {
    getAll: () => getWorkorderCatalog(),
    replaceAll: (workorders) => persistWorkorderCatalog(workorders),
    reloadFromStorage: () => {
      workorderCatalogCache = loadWorkorderCatalogFromStorage();
      return workorderCatalogCache;
    },
    countPending: () => syncWorkorderStatusFromDispatch().filter((item) => item.status === WORKORDER_STATUS.PENDING).length
  };

  const DISPATCH_STORAGE_KEY = 'mobile-dispatch-catalog';
  const DISPATCH_APP_ACK_STATUS = Object.freeze({
    PENDING: 'pending',
    CONFIRMED: 'confirmed',
    REJECTED: 'rejected'
  });
  const ORDER_LIFECYCLE_STATUS = Object.freeze({
    IN_TRANSIT: '在途',
    IN_PROGRESS: '进行中',
    COMPLETED: '完成',
    CANCELED: '已取消'
  });
  const ORDER_LIFECYCLE_STATUS_SET = new Set(Object.values(ORDER_LIFECYCLE_STATUS));
  const trimDispatchValue = (value) => (value ?? '').toString().trim();
  const normalizeOrderLifecycleStatus = (value, fallback = '') => {
    const text = trimDispatchValue(value);
    if (ORDER_LIFECYCLE_STATUS_SET.has(text)) return text;
    return fallback;
  };
  const normalizeDispatchAppAckStatus = (value, fallback = DISPATCH_APP_ACK_STATUS.PENDING) => {
    const text = trimDispatchValue(value).toLowerCase();
    if (!text) return fallback;
    if (text === DISPATCH_APP_ACK_STATUS.CONFIRMED || text === 'acknowledged' || text === 'success') {
      return DISPATCH_APP_ACK_STATUS.CONFIRMED;
    }
    if (text === DISPATCH_APP_ACK_STATUS.REJECTED || text === 'failed' || text === 'error') {
      return DISPATCH_APP_ACK_STATUS.REJECTED;
    }
    if (text === DISPATCH_APP_ACK_STATUS.PENDING || text === 'sent' || text === 'waiting') {
      return DISPATCH_APP_ACK_STATUS.PENDING;
    }
    return fallback;
  };
  const normalizeDispatchAppAckPayload = (payload) => {
    if (payload && typeof payload === 'object') {
      return { ...payload };
    }
    const text = trimDispatchValue(payload);
    if (!text) return null;
    try {
      const parsed = JSON.parse(text);
      if (parsed && typeof parsed === 'object') return { ...parsed };
    } catch (error) {}
    return { raw: text };
  };
  const isDispatchAppConfirmed = (record) => normalizeDispatchAppAckStatus(record?.appAckStatus) === DISPATCH_APP_ACK_STATUS.CONFIRMED;
  const normalizeDispatchFailureRecordItem = (record) => {
    const at = trimDispatchValue(record?.at || record?.time || record?.failureAt || record?.failedAt);
    const reason = trimDispatchValue(record?.reason || record?.failureReason || record?.message);
    if (!reason) return null;
    return { at, reason };
  };
  const normalizeDispatchFailureRecords = (records, fallbackReason = '', fallbackAt = '') => {
    const normalized = [];
    if (Array.isArray(records)) {
      records.forEach((item) => {
        const normalizedItem = normalizeDispatchFailureRecordItem(item);
        if (normalizedItem) normalized.push(normalizedItem);
      });
    } else if (typeof records === 'string' && trimDispatchValue(records)) {
      try {
        const parsed = JSON.parse(records);
        if (Array.isArray(parsed)) {
          parsed.forEach((item) => {
            const normalizedItem = normalizeDispatchFailureRecordItem(item);
            if (normalizedItem) normalized.push(normalizedItem);
          });
        }
      } catch (error) {}
    }
    if (!normalized.length) {
      const reason = trimDispatchValue(fallbackReason);
      if (reason) {
        normalized.push({
          at: trimDispatchValue(fallbackAt),
          reason
        });
      }
    }
    return normalized;
  };
  const normalizeDispatchCatalogRecord = (record) => {
    const failureRecords = normalizeDispatchFailureRecords(record.failureRecords, record.failureReason, record.failureAt);
    const latestFailure = failureRecords.length ? failureRecords[failureRecords.length - 1] : null;
    const appAckStatus = normalizeDispatchAppAckStatus(record.appAckStatus);
    const appAckAt = trimDispatchValue(record.appAckAt);
    const appAckPayload = normalizeDispatchAppAckPayload(
      record.appAckPayload || record.appAckResponse || record.appResponsePayload
    );
    return {
      dispatchId: trimDispatchValue(record.dispatchId),
      workorderId: trimDispatchValue(record.workorderId),
      companyName: trimDispatchValue(record.companyName),
      orderType: normalizeWorkorderType(record.orderType),
      address: trimDispatchValue(record.address),
      createdAt: trimDispatchValue(record.createdAt),
      vehicleId: trimDispatchValue(record.vehicleId),
      status: trimDispatchValue(record.status),
      companyId: trimDispatchValue(record.companyId),
      contactName: trimDispatchValue(record.contactName),
      contactPhone: trimDispatchValue(record.contactPhone),
      energyDemand: trimDispatchValue(record.energyDemand),
      requiredPower: trimDispatchValue(record.requiredPower),
      startTime: trimDispatchValue(record.startTime),
      endTime: trimDispatchValue(record.endTime || record.endAt),
      note: trimDispatchValue(record.note),
      cancelReason: trimDispatchValue(record.cancelReason),
      cancelImageUrl: trimDispatchValue(record.cancelImageUrl || record.cancelImage || record.cancelImagePath),
      driverName: trimDispatchValue(record.driverName),
      driverPhone: trimDispatchValue(record.driverPhone),
      actualEnergy: trimDispatchValue(record.actualEnergy || record.usedEnergy),
      averagePower: trimDispatchValue(record.averagePower),
      peakPower: trimDispatchValue(record.peakPower),
      utilizationRate: trimDispatchValue(record.utilizationRate),
      energyDeviation: trimDispatchValue(record.energyDeviation),
      orderStatus: normalizeOrderLifecycleStatus(record.orderStatus),
      orderStartedAt: trimDispatchValue(record.orderStartedAt),
      orderCompletedAt: trimDispatchValue(record.orderCompletedAt),
      orderCanceledAt: trimDispatchValue(record.orderCanceledAt),
      orderCancelReason: trimDispatchValue(record.orderCancelReason),
      powerCalc: record && typeof record.powerCalc === 'object' && record.powerCalc
        ? { ...record.powerCalc }
        : null,
      appAckStatus,
      appAckAt,
      appAckPayload,
      failureRecords,
      failureReason: latestFailure ? latestFailure.reason : '',
      failureAt: latestFailure ? latestFailure.at : ''
    };
  };
  const resolveDefaultDispatchCatalog = () => {
    if (Array.isArray(window.defaultDispatchCatalog)) {
      return window.defaultDispatchCatalog
        .map(normalizeDispatchCatalogRecord)
        .filter((item) => item.dispatchId);
    }
    return [];
  };
  const loadDispatchCatalogFromStorage = () => {
    try {
      const raw = localStorage.getItem(DISPATCH_STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) {
          return parsed
            .map(normalizeDispatchCatalogRecord)
            .filter((item) => item.dispatchId);
        }
      }
    } catch (error) {
      console.warn('dispatch catalog load failed', error);
    }
    return resolveDefaultDispatchCatalog();
  };
  let dispatchCatalogCache = null;
  const persistDispatchCatalog = (items) => {
    const normalized = items
      .map(normalizeDispatchCatalogRecord)
      .filter((item) => item.dispatchId);
    dispatchCatalogCache = normalized;
    try {
      localStorage.setItem(DISPATCH_STORAGE_KEY, JSON.stringify(normalized));
    } catch (error) {
      console.warn('dispatch catalog save failed', error);
    }
    return normalized;
  };
  const getDispatchCatalog = () => {
    if (!dispatchCatalogCache) {
      dispatchCatalogCache = loadDispatchCatalogFromStorage();
    }
    return dispatchCatalogCache;
  };
  const dispatchCatalogAPI = {
    getAll: () => getDispatchCatalog(),
    replaceAll: (dispatches) => persistDispatchCatalog(dispatches),
    reloadFromStorage: () => {
      dispatchCatalogCache = loadDispatchCatalogFromStorage();
      return dispatchCatalogCache;
    },
    updateAppAckStatus: (dispatchId, status, options = {}) => {
      const targetDispatchId = trimDispatchValue(dispatchId);
      if (!targetDispatchId) return null;
      const nextStatus = normalizeDispatchAppAckStatus(status);
      const records = getDispatchCatalog().map((item) => normalizeDispatchCatalogRecord(item));
      let updatedRecord = null;
      const nextRecords = records.map((item) => {
        if (item.dispatchId !== targetDispatchId) return item;
        const shouldUpdatePayload = Object.prototype.hasOwnProperty.call(options, 'payload');
        const shouldUpdateAckAt = Object.prototype.hasOwnProperty.call(options, 'ackAt');
        const nextPayload = shouldUpdatePayload
          ? normalizeDispatchAppAckPayload(options.payload)
          : item.appAckPayload;
        const nextAckAt = nextStatus === DISPATCH_APP_ACK_STATUS.CONFIRMED
          ? (
            shouldUpdateAckAt
              ? (trimDispatchValue(options.ackAt) || formatDateTime())
              : (item.appAckAt || formatDateTime())
          )
          : (
            shouldUpdateAckAt
              ? trimDispatchValue(options.ackAt)
              : trimDispatchValue(item.appAckAt)
          );
        const nextDispatchStatus = nextStatus === DISPATCH_APP_ACK_STATUS.CONFIRMED
          ? '调度完成'
          : trimDispatchValue(item.status);
        const shouldResetOrderLifecycle = nextStatus === DISPATCH_APP_ACK_STATUS.PENDING;
        const nextOrderStatus = nextStatus === DISPATCH_APP_ACK_STATUS.CONFIRMED
          ? (
            normalizeOrderLifecycleStatus(item.orderStatus)
            || ORDER_LIFECYCLE_STATUS.IN_TRANSIT
          )
          : (
            shouldResetOrderLifecycle
              ? ''
              : normalizeOrderLifecycleStatus(item.orderStatus)
          );
        updatedRecord = normalizeDispatchCatalogRecord({
          ...item,
          status: nextDispatchStatus,
          appAckStatus: nextStatus,
          appAckAt: nextAckAt,
          appAckPayload: nextPayload,
          orderStatus: nextOrderStatus,
          orderStartedAt: shouldResetOrderLifecycle ? '' : trimDispatchValue(item.orderStartedAt),
          orderCompletedAt: shouldResetOrderLifecycle ? '' : trimDispatchValue(item.orderCompletedAt),
          orderCanceledAt: shouldResetOrderLifecycle ? '' : trimDispatchValue(item.orderCanceledAt),
          orderCancelReason: shouldResetOrderLifecycle ? '' : trimDispatchValue(item.orderCancelReason)
        });
        return updatedRecord;
      });
      if (!updatedRecord) return null;
      persistDispatchCatalog(nextRecords);
      try {
        window.dispatchEvent(new CustomEvent('dispatch-app-ack-updated', {
          detail: {
            dispatchId: targetDispatchId,
            appAckStatus: nextStatus,
            dispatchStatus: updatedRecord.status
          }
        }));
      } catch (error) {}
      return updatedRecord;
    },
    confirmByApp: (dispatchId, payload = null, ackAt = '') => dispatchCatalogAPI.updateAppAckStatus(
      dispatchId,
      DISPATCH_APP_ACK_STATUS.CONFIRMED,
      { payload, ackAt }
    ),
    rejectByApp: (dispatchId, payload = null, ackAt = '') => dispatchCatalogAPI.updateAppAckStatus(
      dispatchId,
      DISPATCH_APP_ACK_STATUS.REJECTED,
      { payload, ackAt }
    ),
    resetToPendingByApp: (dispatchId) => dispatchCatalogAPI.updateAppAckStatus(
      dispatchId,
      DISPATCH_APP_ACK_STATUS.PENDING,
      { payload: null, ackAt: '' }
    ),
    getLinkedWorkorderIds: () => {
      const ids = new Set();
      getDispatchCatalog().forEach((record) => {
        const workorderId = (record.workorderId || '').toString().trim();
        if (workorderId) {
          ids.add(workorderId);
        }
      });
      return ids;
    }
  };
  if (typeof window !== 'undefined') {
    window.dispatchOrderAckAPI = Object.assign({}, window.dispatchOrderAckAPI || {}, {
      confirmDispatch: (dispatchId, payload = null, ackAt = '') => dispatchCatalogAPI.confirmByApp(dispatchId, payload, ackAt),
      rejectDispatch: (dispatchId, payload = null, ackAt = '') => dispatchCatalogAPI.rejectByApp(dispatchId, payload, ackAt),
      setPending: (dispatchId) => dispatchCatalogAPI.resetToPendingByApp(dispatchId),
      getDispatches: () => dispatchCatalogAPI.getAll().map((item) => ({ ...item }))
    });
  }

  const WORKORDER_STATUS = Object.freeze({
    PENDING: '等待调度',
    DISPATCHED: '调度已处理',
    CANCELED: '已取消'
  });
  const LEGACY_WORKORDER_DISPATCHED_STATUS = '已调度';
  const resolveWorkorderStatusFromDispatch = (record, dispatchedWorkorderIds = null) => {
    const normalized = normalizeWorkorderRecord(record || {});
    const currentStatus = (normalized.status || '').toString().trim();
    if (currentStatus === WORKORDER_STATUS.CANCELED) {
      return WORKORDER_STATUS.CANCELED;
    }
    if (currentStatus === WORKORDER_STATUS.DISPATCHED || currentStatus === LEGACY_WORKORDER_DISPATCHED_STATUS) {
      return WORKORDER_STATUS.DISPATCHED;
    }
    if (!normalized.workorderId) {
      return WORKORDER_STATUS.PENDING;
    }
    const linkedIds = dispatchedWorkorderIds || dispatchCatalogAPI.getLinkedWorkorderIds();
    return linkedIds.has(normalized.workorderId) ? WORKORDER_STATUS.DISPATCHED : WORKORDER_STATUS.PENDING;
  };
  const syncWorkorderStatusFromDispatch = () => {
    dispatchCatalogAPI.reloadFromStorage();
    const dispatchedWorkorderIds = dispatchCatalogAPI.getLinkedWorkorderIds();
    const records = workorderCatalogAPI.reloadFromStorage()
      .map(normalizeWorkorderRecord)
      .filter((item) => item.workorderId);
    const synced = records.map((item) => ({
      ...item,
      status: resolveWorkorderStatusFromDispatch(item, dispatchedWorkorderIds)
    }));
    workorderCatalogAPI.replaceAll(synced);
    return synced;
  };

  const VEHICLE_STORAGE_KEY = 'mobile-vehicle-catalog';
  const VEHICLE_STORAGE_VERSION_KEY = 'mobile-vehicle-catalog-version';
  const VEHICLE_STORAGE_VERSION = '2026-03-21-v4';
  const normalizeVehicleRecord = (record) => ({
    vehicleId: (record.vehicleId || '').toString().trim(),
    driverName: (record.driverName || '').toString().trim(),
    contact: (record.contact || record.driverPhone || '').toString().trim(),
    energyLeft: (record.energyLeft || '').toString().trim(),
    chargeStatus: (record.chargeStatus || '').toString().trim(),
    dataStatus: (record.dataStatus || '').toString().trim(),
    address: (record.address || '').toString().trim(),
    lng: (record.lng || '').toString().trim(),
    lat: (record.lat || '').toString().trim(),
    serialNo: (record.serialNo || '').toString().trim(),
    batteryType: (record.batteryType || '').toString().trim(),
    capacity: (record.capacity || '').toString().trim(),
    voltageRange: (record.voltageRange || '').toString().trim(),
    nominalEnergy: (record.nominalEnergy || '').toString().trim(),
    maxCurrent: (record.maxCurrent || '').toString().trim(),
    pcsPower: (record.pcsPower || '').toString().trim(),
    ratedPower: (record.ratedPower || '').toString().trim(),
    cooling: (record.cooling || '').toString().trim(),
    protection: (record.protection || '').toString().trim(),
    size: (record.size || '').toString().trim(),
    weight: (record.weight || '').toString().trim(),
    productionDate: (record.productionDate || '').toString().trim(),
    manufacturer: (record.manufacturer || '').toString().trim(),
    company: (record.company || '').toString().trim(),
    totalCharge: (record.totalCharge || '').toString().trim(),
    totalDischarge: (record.totalDischarge || '').toString().trim(),
    totalChargeCount: (record.totalChargeCount || '').toString().trim(),
    totalDischargeCount: (record.totalDischargeCount || '').toString().trim(),
    totalPower: (record.totalPower || '').toString().trim()
  });
  const DEFAULT_VEHICLE_CATALOG = [
    {
      vehicleId: '储能车ES-GZ-001',
      driverName: '陈浩',
      contact: '13800010001',
      energyLeft: '536.20',
      chargeStatus: '放电',
      dataStatus: '正常',
      address: '广州市天河区珠江新城冼村路',
      lng: '113.324520',
      lat: '23.119620',
      nominalEnergy: '628.00'
    },
    {
      vehicleId: '储能车ES-GZ-002',
      driverName: '李敏',
      contact: '13800010002',
      energyLeft: '412.50',
      chargeStatus: '充电',
      dataStatus: '正常',
      address: '广州市番禺区大学城中环西路',
      lng: '113.390600',
      lat: '23.060500',
      nominalEnergy: '628.00'
    },
    {
      vehicleId: '储能车ES-GZ-003',
      driverName: '张磊',
      contact: '13800010003',
      energyLeft: '275.80',
      chargeStatus: '待机',
      dataStatus: '正常',
      address: '广州市白云区机场路',
      lng: '113.269700',
      lat: '23.157300',
      nominalEnergy: '628.00'
    },
    {
      vehicleId: '储能车ES-GZ-004',
      driverName: '王倩',
      contact: '13800010004',
      energyLeft: '188.30',
      chargeStatus: '放电',
      dataStatus: '正常',
      address: '广州市黄埔区科学大道',
      lng: '113.509000',
      lat: '23.123000',
      nominalEnergy: '628.00'
    },
    {
      vehicleId: '储能车ES-GZ-005',
      driverName: '赵强',
      contact: '13800010005',
      energyLeft: '96.40',
      chargeStatus: '充电',
      dataStatus: '正常',
      address: '广州市南沙区进港大道',
      lng: '113.543300',
      lat: '22.802800',
      nominalEnergy: '628.00'
    },
    {
      vehicleId: '储能车ES-GZ-006',
      driverName: '刘洋',
      contact: '13800010006',
      energyLeft: '502.00',
      chargeStatus: '待机',
      dataStatus: '正常',
      address: '广州市越秀区中山一路',
      lng: '113.288200',
      lat: '23.126400',
      nominalEnergy: '628.00'
    },
    {
      vehicleId: '储能车ES-GZ-007',
      driverName: '周悦',
      contact: '13800010007',
      energyLeft: '351.70',
      chargeStatus: '放电',
      dataStatus: '正常',
      address: '广州市荔湾区芳村大道',
      lng: '113.234800',
      lat: '23.095200',
      nominalEnergy: '628.00'
    },
    {
      vehicleId: '储能车ES-GZ-008',
      driverName: '郭晨',
      contact: '13800010008',
      energyLeft: '224.90',
      chargeStatus: '待机',
      dataStatus: '异常',
      address: '广州市花都区新华街',
      lng: '113.220400',
      lat: '23.392100',
      nominalEnergy: '628.00'
    },
    {
      vehicleId: '储能车ES-GZ-009',
      driverName: '黄欣',
      contact: '13800010009',
      energyLeft: '145.60',
      chargeStatus: '放电',
      dataStatus: '正常',
      address: '广州市从化区街口街',
      lng: '113.586700',
      lat: '23.548300',
      nominalEnergy: '628.00'
    },
    {
      vehicleId: '储能车ES-GZ-010',
      driverName: '孙航',
      contact: '13800010010',
      energyLeft: '468.80',
      chargeStatus: '待机',
      dataStatus: '正常',
      address: '广州市增城区荔新大道',
      lng: '113.829600',
      lat: '23.290500',
      nominalEnergy: '628.00'
    }
  ];

  const resolveDefaultVehicleCatalog = () => {
    if (Array.isArray(window.defaultVehicleCatalog)) {
      return window.defaultVehicleCatalog.map(normalizeVehicleRecord);
    }
    return DEFAULT_VEHICLE_CATALOG.map(normalizeVehicleRecord);
  };

  const loadVehicleCatalogFromStorage = () => {
    try {
      const version = localStorage.getItem(VEHICLE_STORAGE_VERSION_KEY);
      if (version !== VEHICLE_STORAGE_VERSION) {
        return resolveDefaultVehicleCatalog();
      }
      const raw = localStorage.getItem(VEHICLE_STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) {
          return parsed
            .map(normalizeVehicleRecord)
            .filter((item) => item.vehicleId);
        }
      }
    } catch (error) {
      console.warn('vehicle catalog load failed', error);
    }
    return resolveDefaultVehicleCatalog();
  };

  let vehicleCatalogCache = null;
  const persistVehicleCatalog = (items) => {
    const normalized = items
      .map(normalizeVehicleRecord)
      .filter((item) => item.vehicleId);
    vehicleCatalogCache = normalized;
    try {
      localStorage.setItem(VEHICLE_STORAGE_KEY, JSON.stringify(normalized));
      localStorage.setItem(VEHICLE_STORAGE_VERSION_KEY, VEHICLE_STORAGE_VERSION);
    } catch (error) {
      console.warn('vehicle catalog save failed', error);
    }
    return normalized;
  };

  const getVehicleCatalog = () => {
    if (!vehicleCatalogCache) {
      vehicleCatalogCache = loadVehicleCatalogFromStorage();
    }
    return vehicleCatalogCache;
  };

  const vehicleCatalogAPI = {
    getAll: () => getVehicleCatalog(),
    findById: (vehicleId) => {
      if (!vehicleId) return null;
      return getVehicleCatalog().find((vehicle) => vehicle.vehicleId === vehicleId) || null;
    },
    replaceAll: (vehicles) => persistVehicleCatalog(vehicles),
    reloadFromStorage: () => {
      vehicleCatalogCache = loadVehicleCatalogFromStorage();
      return vehicleCatalogCache;
    }
  };


  const parseTrim = (value) => (value ?? '').toString().trim();
  const parseLower = (value) => parseTrim(value).toLowerCase();
  const DEFAULT_AMAP_WEB_KEY = 'ffb61cec05677b73cc13b34bd47cd9c6';
  const resolveAmapWebKey = () => parseTrim(window.AMAP_WEB_KEY) || DEFAULT_AMAP_WEB_KEY;
  const buildTableFilterController = ({ tableSelector, filters, matchRow, searchAction, resetAction }) => {
    const table = document.querySelector(tableSelector);
    if (!table) return null;
    const container = table.closest('[data-paginated]');
    const defaultValues = filters.reduce((acc, filter) => ({ ...acc, [filter.name]: '' }), {});
    const filterNodes = filters
      .map((filter) => {
        const node = document.querySelector(filter.selector);
        if (!node) return null;
        return {
          ...filter,
          node,
          parser: filter.parser || parseTrim
        };
      })
      .filter(Boolean);

    const getFilterValues = () => {
      const values = { ...defaultValues };
      filterNodes.forEach((field) => {
        values[field.name] = field.parser(field.node.value);
      });
      return values;
    };

    const clearFilters = () => {
      filterNodes.forEach(({ node }) => {
        if (!node) return;
        if (node.tagName === 'SELECT') {
          node.selectedIndex = 0;
        } else {
          node.value = '';
        }
      });
    };

    const applyFilters = () => {
      const values = getFilterValues();
      const rows = Array.from(table.querySelectorAll('tbody tr'));
      rows.forEach((row) => {
        const visible = matchRow(row, values);
        row.dataset.filterHidden = visible ? 'false' : 'true';
      });
      if (container && typeof container.refreshPagination === 'function') {
        container.refreshPagination(1);
      }
    };

    if (searchAction) {
      const searchBtn = document.querySelector(`[data-action="${searchAction}"]`);
      if (searchBtn) {
        searchBtn.addEventListener('click', () => {
          applyFilters();
          showToast('已搜索');
        });
      }
    }

    if (resetAction) {
      const resetBtn = document.querySelector(`[data-action="${resetAction}"]`);
      if (resetBtn) {
        resetBtn.addEventListener('click', () => {
          clearFilters();
          applyFilters();
          showToast('已重置');
        });
      }
    }

    applyFilters();
    return {
      applyFilters,
      resetFilters: () => {
        clearFilters();
        applyFilters();
      }
    };
  };

  const escapeCellText = (value) => `${value ?? ''}`
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
  const ALERT_DEMO_ROW_COUNT = 6;
  const ALERT_DEVICE_SEQUENCE = ['PCS2', 'BMS'];
  const ALERT_TYPE_SEQUENCE = ['故障', '报警'];
  const formatAlertDateTime = (date) => `${formatDateTime(date)}:00`;
  const resolveAlertDeviceType = (index) => ALERT_DEVICE_SEQUENCE[index % ALERT_DEVICE_SEQUENCE.length];
  const resolveAlertType = (index) => ALERT_TYPE_SEQUENCE[index % ALERT_TYPE_SEQUENCE.length];
  const resolveAlertTypeColor = (alertType) => (alertType === '故障' ? '#e25c5c' : '#f08a24');
  const formatAlertDurationText = (totalMinutes = 0) => {
    const totalSeconds = Math.max(0, Math.floor(totalMinutes * 60));
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    return `${hours}小时${minutes}分${seconds}秒`;
  };
  const buildAlertSourcePayloadFromVehicleCatalog = () => {
    const vehicles = vehicleCatalogAPI.reloadFromStorage()
      .map(normalizeVehicleRecord)
      .filter((item) => item.vehicleId);
    if (!vehicles.length) {
      return { current: [], history: [] };
    }
    const selectedVehicles = vehicles.slice(0, ALERT_DEMO_ROW_COUNT);
    const now = Date.now();
    const current = selectedVehicles.map((vehicle, index) => {
      const deviceType = resolveAlertDeviceType(index);
      const startedAt = new Date(now - (index + 1) * 17 * 60 * 1000);
      return {
        carNo: vehicle.vehicleId,
        devType: deviceType,
        devNo: `${deviceType}${String(410000 + index)}`,
        alarmType: resolveAlertType(index),
        alarmContent: `${deviceType}接口告警演示数据${index + 1}`,
        beginTime: formatAlertDateTime(startedAt),
        durationText: formatAlertDurationText((index % 6 + 1) * 9),
        transportState: index % 2 === 0 ? '数据中断' : '待接入',
        processState: index % 2 === 0 ? '待处理' : '处理中'
      };
    });
    const history = selectedVehicles.map((vehicle, index) => {
      const deviceType = resolveAlertDeviceType(index);
      const startedAt = new Date(now - (index + 2) * 55 * 60 * 1000);
      const durationMinutes = (index % 6 + 2) * 12;
      const endedAt = new Date(startedAt.getTime() + durationMinutes * 60 * 1000);
      return {
        carNo: vehicle.vehicleId,
        devType: deviceType,
        devNo: `${deviceType}${String(520000 + index)}`,
        alarmType: resolveAlertType(index),
        alarmContent: `${deviceType}接口历史告警演示数据${index + 1}`,
        beginTime: formatAlertDateTime(startedAt),
        endTime: formatAlertDateTime(endedAt),
        durationText: formatAlertDurationText(durationMinutes),
        alarmState: index % 2 === 0 ? '已处理' : '等待处理'
      };
    });
    return { current, history };
  };
  const normalizeAlertApiRecord = (record = {}) => ({
    vehicleId: parseTrim(record.carNo || record.vehicleId),
    deviceType: parseTrim(record.devType || record.deviceType),
    deviceId: parseTrim(record.devNo || record.deviceId),
    alertType: parseTrim(record.alarmType || record.alertType),
    alertContent: parseTrim(record.alarmContent || record.alertContent),
    startTime: parseTrim(record.beginTime || record.startTime),
    endTime: parseTrim(record.endTime),
    durationText: parseTrim(record.durationText || record.duration),
    transferStatus: parseTrim(record.transportState || record.transferStatus),
    currentAction: parseTrim(record.processState || record.currentAction),
    alertStatus: parseTrim(record.alarmState || record.alertStatus)
  });
  const transformAlertCurrentRecord = (sourceRecord = {}) => {
    const normalized = normalizeAlertApiRecord(sourceRecord);
    return {
      vehicleId: normalized.vehicleId,
      deviceType: normalized.deviceType || '待接入',
      deviceId: normalized.deviceId || '待接入',
      alertType: normalized.alertType || '报警',
      alertContent: normalized.alertContent || '告警内容待接入',
      startTime: normalized.startTime || '待接入',
      durationText: normalized.durationText || '待接入',
      transferStatus: normalized.transferStatus || '待接入',
      currentAction: normalized.currentAction || '待处理'
    };
  };
  const transformAlertHistoryRecord = (sourceRecord = {}) => {
    const normalized = normalizeAlertApiRecord(sourceRecord);
    return {
      vehicleId: normalized.vehicleId,
      deviceType: normalized.deviceType || '待接入',
      deviceId: normalized.deviceId || '待接入',
      alertType: normalized.alertType || '报警',
      alertContent: normalized.alertContent || '告警内容待接入',
      startTime: normalized.startTime || '待接入',
      endTime: normalized.endTime || '待接入',
      durationText: normalized.durationText || '待接入',
      alertStatus: normalized.alertStatus || '待接入'
    };
  };
  const buildAlertCurrentRowMarkup = (record) => {
    const alertType = parseTrim(record.alertType) || '报警';
    return `
      <tr>
        <td>${escapeCellText(record.vehicleId)}</td>
        <td>${escapeCellText(record.deviceType)}</td>
        <td>${escapeCellText(record.deviceId)}</td>
        <td><span style="color:${resolveAlertTypeColor(alertType)};">${alertType}</span></td>
        <td>${escapeCellText(record.alertContent)}</td>
        <td>${escapeCellText(record.startTime)}</td>
        <td>${escapeCellText(record.durationText)}</td>
        <td>${escapeCellText(record.transferStatus)}</td>
        <td><span style="color:#2f6cf6;">${escapeCellText(record.currentAction)}</span></td>
      </tr>
    `;
  };
  const buildAlertHistoryRowMarkup = (record) => {
    const alertType = parseTrim(record.alertType) || '报警';
    return `
      <tr>
        <td>${escapeCellText(record.vehicleId)}</td>
        <td>${escapeCellText(record.deviceType)}</td>
        <td>${escapeCellText(record.deviceId)}</td>
        <td><span style="color:${resolveAlertTypeColor(alertType)};">${alertType}</span></td>
        <td>${escapeCellText(record.alertContent)}</td>
        <td>${escapeCellText(record.startTime)}</td>
        <td>${escapeCellText(record.endTime)}</td>
        <td>${escapeCellText(record.durationText)}</td>
        <td>${escapeCellText(record.alertStatus)}</td>
      </tr>
    `;
  };
  const syncAlertRowsFromSourcePayload = (tableSelector, mode = 'current') => {
    const table = document.querySelector(tableSelector);
    const tbody = table ? table.querySelector('tbody') : null;
    if (!table || !tbody) return;
    const sourcePayload = buildAlertSourcePayloadFromVehicleCatalog();
    const sourceRecords = mode === 'history' ? sourcePayload.history : sourcePayload.current;
    const records = sourceRecords
      .map((record) => (mode === 'history' ? transformAlertHistoryRecord(record) : transformAlertCurrentRecord(record)))
      .filter((item) => item.vehicleId);
    if (!records.length) {
      tbody.innerHTML = '<tr><td colspan="9">暂无车辆信息，请先在车辆信息页面维护车辆编号</td></tr>';
    } else {
      const rowBuilder = mode === 'history' ? buildAlertHistoryRowMarkup : buildAlertCurrentRowMarkup;
      tbody.innerHTML = records.map((record) => rowBuilder(record)).join('');
    }
    const container = table.closest('[data-paginated]');
    if (container && typeof container.refreshPagination === 'function') {
      container.refreshPagination(1);
    }
  };

  const setupOrderListFilters = () => {
    if (document.body.dataset.page !== 'mobile-order-list') return;
    const table = document.querySelector('[data-order-table]');
    const tbody = table ? table.querySelector('tbody') : null;
    if (!table || !tbody) return;
    const orderDetailModal = document.getElementById('modal-order-detail');
    const orderDetailShell = orderDetailModal ? orderDetailModal.querySelector('[data-order-detail-shell]') : null;
    const orderDetailForm = orderDetailModal ? orderDetailModal.querySelector('[data-order-detail-form]') : null;
    const orderFailureRecordRow = orderDetailForm ? orderDetailForm.querySelector('[data-order-failure-record-row]') : null;
    const orderFailureList = orderDetailForm ? orderDetailForm.querySelector('[data-order-failure-list]') : null;
    const orderCancelReasonRow = orderDetailForm ? orderDetailForm.querySelector('[data-order-cancel-reason-row]') : null;
    const orderCancelImageRow = orderDetailForm ? orderDetailForm.querySelector('[data-order-cancel-image-row]') : null;
    const orderCancelImage = orderDetailForm ? orderDetailForm.querySelector('[data-order-cancel-image]') : null;
    const orderCancelImageEmpty = orderDetailForm ? orderDetailForm.querySelector('[data-order-cancel-image-empty]') : null;
    const orderPowerModule = orderDetailForm ? orderDetailForm.querySelector('[data-order-power-module]') : null;
    const orderBatteryVisualActionBtn = orderDetailForm
      ? orderDetailForm.querySelector('[data-action="visualize-order-battery"]')
      : null;
    const orderStartPowerBtn = orderDetailForm
      ? orderDetailForm.querySelector('[data-action="start-order-power"]')
      : null;
    const orderVehicleLocationModal = document.getElementById('modal-order-vehicle-location');
    const orderVehicleDetailModal = document.getElementById('modal-order-vehicle-detail');
    const orderBatteryVisualModal = document.getElementById('modal-order-battery-visual');
    const orderLocationVehicleId = orderVehicleLocationModal
      ? orderVehicleLocationModal.querySelector('[data-order-location-vehicle-id]')
      : null;
    const orderLocationAddress = orderVehicleLocationModal
      ? orderVehicleLocationModal.querySelector('[data-order-location-address]')
      : null;
    const orderLocationCoords = orderVehicleLocationModal
      ? orderVehicleLocationModal.querySelector('[data-order-location-coords]')
      : null;
    const orderVehicleDetailDriverNameInput = orderVehicleDetailModal
      ? orderVehicleDetailModal.querySelector('[data-order-vehicle-detail-driver-name]')
      : null;
    const orderVehicleDetailContactInput = orderVehicleDetailModal
      ? orderVehicleDetailModal.querySelector('[data-order-vehicle-detail-contact]')
      : null;
    let orderVehicleMap = null;
    let orderVehicleMarker = null;
    let orderVehicleInfoWindow = null;
    let orderAmapScriptPromise = null;

    const ORDER_STATUS = ORDER_LIFECYCLE_STATUS;
    const resolveOrderStatusFromRecord = (record = {}) => {
      const explicitStatus = normalizeOrderLifecycleStatus(record.orderStatus);
      if (explicitStatus) return explicitStatus;
      const dispatchStatus = parseTrim(record.status);
      if (dispatchStatus === '已取消') return ORDER_STATUS.CANCELED;
      if (dispatchStatus === '调度失败') return ORDER_STATUS.IN_PROGRESS;
      if (dispatchStatus === '调度中') return ORDER_STATUS.IN_TRANSIT;
      if (dispatchStatus === '调度完成') return ORDER_STATUS.IN_TRANSIT;
      return ORDER_STATUS.IN_TRANSIT;
    };
    const createOrderIdFromDispatch = (dispatchId, index = 0) => {
      const digits = parseTrim(dispatchId).replace(/\D/g, '');
      if (digits) {
        return `#OD${digits.slice(-7).padStart(7, '0')}`;
      }
      const seed = `${Date.now()}${index}`;
      return `#OD${seed.slice(-7)}`;
    };

    const getProjectCatalogSnapshot = () => {
      projectCatalogAPI.reloadFromStorage();
      return projectCatalogAPI.getAll();
    };

    const resolveCompanyNameFromProjectCatalog = (record = {}, projectCatalog = null) => {
      const catalog = Array.isArray(projectCatalog) ? projectCatalog : getProjectCatalogSnapshot();
      const companyId = parseTrim(record.companyId || record.creditCode);
      const rawCompanyName = parseTrim(record.companyName);
      let project = null;
      if (companyId) {
        project = catalog.find((item) => parseTrim(item.creditCode) === companyId) || null;
      }
      if (!project && rawCompanyName) {
        project = catalog.find((item) => parseTrim(item.companyName) === rawCompanyName) || null;
      }
      return project ? parseTrim(project.companyName) : rawCompanyName;
    };

    const buildOrderManualFallbackRecord = (projectCatalog = []) => {
      const project = Array.isArray(projectCatalog) && projectCatalog.length ? projectCatalog[0] : null;
      const vehicles = vehicleCatalogAPI.reloadFromStorage()
        .map(normalizeVehicleRecord)
        .filter((item) => item.vehicleId);
      const vehicle = vehicles.length ? vehicles[0] : null;
      return normalizeDispatchCatalogRecord({
        dispatchId: '#DP-ORDER-MOCK-001',
        workorderId: '#WO-ORDER-MOCK-001',
        companyName: project ? parseTrim(project.companyName) : '南方电网综合能源（广州）有限公司',
        orderType: '供电',
        address: project ? parseTrim(project.address) : '广州市天河区珠江新城华夏路 16 号',
        createdAt: formatDateTime(),
        vehicleId: vehicle ? parseTrim(vehicle.vehicleId) : '储能车ES-GZ-001',
        status: '调度中',
        companyId: project ? parseTrim(project.creditCode) : '91440101MOCK0001',
        contactName: project ? parseTrim(project.contactName) : '李俊',
        contactPhone: project ? parseTrim(project.contactPhone) : '13800138001',
        energyDemand: '620',
        requiredPower: '300',
        startTime: formatDateTime(),
        endTime: formatDateTime(),
        driverName: vehicle ? parseTrim(vehicle.driverName) : '陈浩',
        driverPhone: vehicle ? parseTrim(vehicle.contact) : '13800010001'
      });
    };

    const buildOrderStatusPreviewRecords = (projectCatalog = []) => {
      const project = Array.isArray(projectCatalog) && projectCatalog.length ? projectCatalog[0] : null;
      const vehicles = vehicleCatalogAPI.reloadFromStorage()
        .map(normalizeVehicleRecord)
        .filter((item) => item.vehicleId);
      const now = Date.now();
      const transitVehicle = vehicles[0] || null;
      const progressVehicle = vehicles[1] || transitVehicle || null;
      const previewRecords = [
        {
          dispatchId: '#DP-ORDER-PREVIEW-TRANSIT',
          workorderId: '#WO-ORDER-PREVIEW-TRANSIT',
          companyName: project ? parseTrim(project.companyName) : '广州示例保供企业（演示）',
          orderType: '供电',
          address: project ? parseTrim(project.address) : '广州市天河区体育西路 189 号',
          createdAt: formatDateTime(new Date(now - 26 * 60 * 1000)),
          vehicleId: transitVehicle ? parseTrim(transitVehicle.vehicleId) : '储能车ES-GZ-011',
          status: '调度中',
          companyId: project ? parseTrim(project.creditCode) : '91440101PREVIEW01',
          contactName: project ? parseTrim(project.contactName) : '演示联系人A',
          contactPhone: project ? parseTrim(project.contactPhone) : '13900030001',
          energyDemand: '560',
          requiredPower: '280',
          startTime: formatDateTime(new Date(now - 20 * 60 * 1000)),
          endTime: formatDateTime(new Date(now + 100 * 60 * 1000)),
          driverName: transitVehicle ? parseTrim(transitVehicle.driverName) : '演示司机A',
          driverPhone: transitVehicle ? parseTrim(transitVehicle.contact) : '13900039991'
        },
        {
          dispatchId: '#DP-ORDER-PREVIEW-PROGRESS',
          workorderId: '#WO-ORDER-PREVIEW-PROGRESS',
          companyName: project ? parseTrim(project.companyName) : '广州示例负荷中心（演示）',
          orderType: '充电',
          address: project ? parseTrim(project.address) : '广州市黄埔区开创大道 66 号',
          createdAt: formatDateTime(new Date(now - 58 * 60 * 1000)),
          vehicleId: progressVehicle ? parseTrim(progressVehicle.vehicleId) : '储能车ES-GZ-012',
          status: '调度失败',
          companyId: project ? parseTrim(project.creditCode) : '91440101PREVIEW02',
          contactName: project ? parseTrim(project.contactName) : '演示联系人B',
          contactPhone: project ? parseTrim(project.contactPhone) : '13900030002',
          energyDemand: '480',
          requiredPower: '240',
          startTime: formatDateTime(new Date(now - 50 * 60 * 1000)),
          endTime: formatDateTime(new Date(now + 80 * 60 * 1000)),
          driverName: progressVehicle ? parseTrim(progressVehicle.driverName) : '演示司机B',
          driverPhone: progressVehicle ? parseTrim(progressVehicle.contact) : '13900039992',
          failureRecords: [
            {
              at: formatDateTime(new Date(now - 18 * 60 * 1000)),
              reason: '演示数据：现场接入条件暂未满足，订单显示为进行中'
            }
          ]
        }
      ];
      return previewRecords.map((item) => normalizeDispatchCatalogRecord(item));
    };

    const escapeHtml = (value) => `${value ?? ''}`
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');

    const setOrderPowerField = (name, value) => {
      if (!orderPowerModule) return;
      const input = orderPowerModule.querySelector(`[data-order-power-field="${name}"]`);
      if (!input) return;
      input.value = value || '—';
    };

    const setOrderPowerModuleVisibility = (visible) => {
      if (orderPowerModule) {
        orderPowerModule.style.display = visible ? '' : 'none';
      }
      if (orderDetailShell) {
        orderDetailShell.classList.toggle('has-power-metrics', !!visible);
      }
    };

    const setOrderCancelImage = (imageUrl) => {
      const image = parseTrim(imageUrl);
      if (orderCancelImage) {
        if (image) {
          orderCancelImage.src = image;
          orderCancelImage.style.display = '';
        } else {
          orderCancelImage.removeAttribute('src');
          orderCancelImage.style.display = 'none';
        }
      }
      if (orderCancelImageEmpty) {
        orderCancelImageEmpty.style.display = image ? 'none' : '';
      }
    };

    if (orderCancelImage) {
      orderCancelImage.addEventListener('error', () => {
        orderCancelImage.removeAttribute('src');
        orderCancelImage.style.display = 'none';
        if (orderCancelImageEmpty) {
          orderCancelImageEmpty.style.display = '';
        }
      });
    }

    const parseOrderNumber = (value) => {
      if (value == null || value === '') return null;
      const numeric = Number.parseFloat(String(value).replace(/,/g, '').trim());
      return Number.isFinite(numeric) ? numeric : null;
    };

    const parseOrderDateTime = (value) => {
      const text = parseTrim(value);
      if (!text) return null;
      const normalized = text
        .replace(/\./g, '-')
        .replace('T', ' ')
        .replace(/\//g, '-')
        .replace(/-/g, '/');
      const date = new Date(normalized);
      if (Number.isNaN(date.getTime())) return null;
      return date;
    };

    const formatOrderMetric = (value, digits = 1, suffix = '') => {
      if (value == null || !Number.isFinite(value)) return '—';
      return `${value.toFixed(digits)}${suffix}`;
    };

    const buildOrderPowerMetrics = (sourceRecord = null) => {
      const dispatchId = sourceRecord ? parseTrim(sourceRecord.dispatchId) : '';
      const startTime = sourceRecord ? sourceRecord.startTime : '';
      const endTime = sourceRecord ? (sourceRecord.endTime || sourceRecord.endAt || '') : '';
      const energyDemand = parseOrderNumber(sourceRecord ? sourceRecord.energyDemand : '');
      const requiredPower = parseOrderNumber(sourceRecord ? sourceRecord.requiredPower : '');
      const powerCalc = sourceRecord && sourceRecord.powerCalc && typeof sourceRecord.powerCalc === 'object'
        ? sourceRecord.powerCalc
        : {};
      const start = parseOrderDateTime(startTime);
      const end = parseOrderDateTime(endTime);
      const durationFromTime = start && end && end.getTime() > start.getTime()
        ? (end.getTime() - start.getTime()) / 3600000
        : null;
      const seed = dispatchId
        .split('')
        .reduce((total, char) => total + char.charCodeAt(0), 0);
      const fallbackFactor = 0.92 + ((seed % 7) / 100);
      const durationHours = parseOrderNumber(powerCalc?.durationHours) ?? durationFromTime;
      const plannedEnergy = parseOrderNumber(powerCalc?.plannedEnergy) ?? energyDemand;
      const actualEnergy = parseOrderNumber(powerCalc?.actualEnergy)
        ?? parseOrderNumber(sourceRecord ? sourceRecord.actualEnergy : '')
        ?? (plannedEnergy != null ? plannedEnergy * fallbackFactor : null);
      const averagePower = parseOrderNumber(powerCalc?.averagePower)
        ?? parseOrderNumber(sourceRecord ? sourceRecord.averagePower : '')
        ?? (durationHours && actualEnergy != null ? (actualEnergy / durationHours) : requiredPower);
      const peakPower = parseOrderNumber(powerCalc?.peakPower)
        ?? parseOrderNumber(sourceRecord ? sourceRecord.peakPower : '')
        ?? (requiredPower != null ? requiredPower * (1.06 + ((seed % 4) / 100)) : null);
      const utilizationRate = parseOrderNumber(powerCalc?.utilizationRate)
        ?? parseOrderNumber(sourceRecord ? sourceRecord.utilizationRate : '')
        ?? (plannedEnergy ? ((actualEnergy || 0) / plannedEnergy) * 100 : null);
      const energyDeviation = parseOrderNumber(powerCalc?.energyDeviation)
        ?? parseOrderNumber(sourceRecord ? sourceRecord.energyDeviation : '')
        ?? (plannedEnergy != null && actualEnergy != null ? (actualEnergy - plannedEnergy) : null);

      return {
        durationHours: formatOrderMetric(durationHours, 2),
        plannedEnergy: formatOrderMetric(plannedEnergy, 1),
        actualEnergy: formatOrderMetric(actualEnergy, 1),
        averagePower: formatOrderMetric(averagePower, 1),
        peakPower: formatOrderMetric(peakPower, 1),
        utilizationRate: formatOrderMetric(utilizationRate, 1),
        energyDeviation: formatOrderMetric(energyDeviation, 1)
      };
    };

    const applyOrderStatusLayout = (statusText, sourceRecord) => {
      const status = parseTrim(statusText);
      const isInTransit = status === ORDER_STATUS.IN_TRANSIT;
      const isCanceled = status === ORDER_STATUS.CANCELED;
      const isInProgress = status === ORDER_STATUS.IN_PROGRESS;
      const isCompleted = status === ORDER_STATUS.COMPLETED;

      if (orderCancelReasonRow) {
        orderCancelReasonRow.style.display = isCanceled ? '' : 'none';
      }
      if (orderCancelImageRow) {
        orderCancelImageRow.style.display = isCanceled ? '' : 'none';
      }
      if (orderBatteryVisualActionBtn) {
        orderBatteryVisualActionBtn.style.display = isInProgress ? '' : 'none';
      }
      if (orderStartPowerBtn) {
        orderStartPowerBtn.style.display = isInTransit ? '' : 'none';
      }

      if (!isCanceled) {
        setOrderDetailField('cancelReason', '');
        setOrderCancelImage('');
      } else {
        const cancelReason = sourceRecord
          ? (parseTrim(sourceRecord.orderCancelReason) || parseTrim(sourceRecord.cancelReason))
          : '';
        const cancelImageUrl = sourceRecord ? parseTrim(sourceRecord.cancelImageUrl) : '';
        setOrderDetailField('cancelReason', cancelReason || '—');
        setOrderCancelImage(cancelImageUrl);
      }

      setOrderPowerModuleVisibility(isCompleted);
      if (isCompleted) {
        const metrics = buildOrderPowerMetrics(sourceRecord);
        Object.entries(metrics).forEach(([key, value]) => setOrderPowerField(key, value));
      } else {
        ['durationHours', 'plannedEnergy', 'actualEnergy', 'averagePower', 'peakPower', 'utilizationRate', 'energyDeviation']
          .forEach((field) => setOrderPowerField(field, '—'));
      }
    };

    const setOrderFailureRecordVisibility = (records = [], fallbackReason = '', fallbackAt = '') => {
      if (!orderFailureRecordRow || !orderFailureList) return;
      const normalizedRecords = normalizeDispatchFailureRecords(records, fallbackReason, fallbackAt);
      if (!normalizedRecords.length) {
        orderFailureList.innerHTML = '<div class="dispatch-failure-empty">暂无失败记录</div>';
        orderFailureRecordRow.style.display = 'none';
        return;
      }
      orderFailureList.innerHTML = normalizedRecords
        .map((item, index) => `
          <div class="dispatch-failure-item">
            <span class="dispatch-failure-time">${escapeHtml(item.at || '时间未记录')}</span>
            <span class="dispatch-failure-text">${index + 1}. ${escapeHtml(item.reason)}</span>
          </div>
        `)
        .join('');
      orderFailureRecordRow.style.display = '';
    };

    const setOrderDetailField = (name, value) => {
      if (!orderDetailForm) return;
      const input = orderDetailForm.querySelector(`[data-order-field="${name}"]`);
      if (!input) return;
      input.value = value || '';
    };

    const orderVehicleDetailBindings = {
      vehicleId: '[data-order-vehicle-detail-vehicle-id]',
      serialNo: '[data-order-vehicle-detail-serial-no]',
      batteryType: '[data-order-vehicle-detail-battery-type]',
      lng: '[data-order-vehicle-detail-lng]',
      capacity: '[data-order-vehicle-detail-capacity]',
      voltageRange: '[data-order-vehicle-detail-voltage-range]',
      nominalEnergy: '[data-order-vehicle-detail-nominal-energy]',
      lat: '[data-order-vehicle-detail-lat]',
      maxCurrent: '[data-order-vehicle-detail-max-current]',
      pcsPower: '[data-order-vehicle-detail-pcs-power]',
      ratedPower: '[data-order-vehicle-detail-rated-power]',
      cooling: '[data-order-vehicle-detail-cooling]',
      protection: '[data-order-vehicle-detail-protection]',
      size: '[data-order-vehicle-detail-size]',
      weight: '[data-order-vehicle-detail-weight]',
      productionDate: '[data-order-vehicle-detail-production-date]',
      manufacturer: '[data-order-vehicle-detail-manufacturer]',
      company: '[data-order-vehicle-detail-company]',
      status: '[data-order-vehicle-detail-status]',
      totalCharge: '[data-order-vehicle-detail-total-charge]',
      totalDischarge: '[data-order-vehicle-detail-total-discharge]',
      totalChargeCount: '[data-order-vehicle-detail-total-charge-count]',
      totalDischargeCount: '[data-order-vehicle-detail-total-discharge-count]',
      totalPower: '[data-order-vehicle-detail-total-power]'
    };

    const textOrFallback = (value, fallback = '—') => {
      const text = `${value ?? ''}`.trim();
      return text || fallback;
    };

    const createOrderVehicleDetailData = (data) => ({
      vehicleId: textOrFallback(data.vehicleId),
      serialNo: textOrFallback(data.serialNo || data.vehicleId),
      batteryType: textOrFallback(data.batteryType, 'LFP'),
      lng: textOrFallback(data.lng, '116.407394'),
      capacity: textOrFallback(data.capacity, '628'),
      voltageRange: textOrFallback(data.voltageRange, '728~923'),
      nominalEnergy: textOrFallback(data.nominalEnergy || data.energyLeft, '0.00'),
      lat: textOrFallback(data.lat, '39.904211'),
      maxCurrent: textOrFallback(data.maxCurrent, '314'),
      pcsPower: textOrFallback(data.pcsPower, '250'),
      ratedPower: textOrFallback(data.ratedPower || data.pcsPower, '250'),
      cooling: textOrFallback(data.cooling, '液冷'),
      protection: textOrFallback(data.protection, 'IPX5'),
      size: textOrFallback(data.size, '3029*2438*2896mm'),
      weight: textOrFallback(data.weight, '6.8'),
      productionDate: textOrFallback(data.productionDate, '2025年10月'),
      manufacturer: textOrFallback(data.manufacturer, '山东天欣达能源科技有限公司'),
      company: textOrFallback(data.company, '南方电网'),
      status: textOrFallback(data.chargeStatus || data.status, '待机'),
      totalCharge: textOrFallback(data.totalCharge, '0'),
      totalDischarge: textOrFallback(data.totalDischarge, '0'),
      totalChargeCount: textOrFallback(data.totalChargeCount, '0'),
      totalDischargeCount: textOrFallback(data.totalDischargeCount, '0'),
      totalPower: textOrFallback(data.totalPower, '0'),
      driverName: textOrFallback(data.driverName),
      contact: textOrFallback(data.contact),
      address: textOrFallback(data.address, '未设置位置')
    });

    const ORDER_BATTERY_VISUAL_TEMPLATES = [
      {
        summary: {
          activePower: '123.1 kW',
          reactivePower: '28.4 kVar',
          temperature: '29.3 °C',
          humidity: '47.8 RH/%'
        },
        battery: {
          soc: 84
        },
        panels: {
          topLeft: [
            ['并离网状态', '并网'],
            ['远程就地状态', '远程'],
            ['故障状态', '正常', 'status'],
            ['有功出力', '123.1 kW'],
            ['无功出力', '28.4 kVar'],
            ['交流电压', '398.2 V'],
            ['最大可充', '126.0 kW'],
            ['最大可放', '132.5 kW']
          ],
          bottomLeft: [
            ['PCS1有功设定', '123.1'],
            ['初始电压', '712.3 V'],
            ['电池电流', '168.5 A'],
            ['最低温度', '24.6 °C'],
            ['最大可放', '132.5 kW']
          ],
          topRight: [
            ['并离网状态', '并网'],
            ['远程就地状态', '远程'],
            ['故障状态', '正常', 'status'],
            ['有功出力', '121.6 kW'],
            ['无功出力', '26.9 kVar'],
            ['交流电压', '401.5 V'],
            ['最高电流', '173.2 A'],
            ['最大可放', '129.8 kW']
          ],
          bottomRight: [
            ['PCS2有功设定', '121.6'],
            ['电池温度', '30.2 °C'],
            ['电池电流', '166.8 A'],
            ['最低温充', '20.4 °C'],
            ['最大可放', '129.8 kW']
          ]
        }
      },
      {
        summary: {
          activePower: '96.8 kW',
          reactivePower: '18.7 kVar',
          temperature: '27.1 °C',
          humidity: '42.6 RH/%'
        },
        battery: {
          soc: 67
        },
        panels: {
          topLeft: [
            ['并离网状态', '离网'],
            ['远程就地状态', '远程'],
            ['故障状态', '正常', 'status'],
            ['有功出力', '96.8 kW'],
            ['无功出力', '18.7 kVar'],
            ['交流电压', '389.6 V'],
            ['最大可充', '112.0 kW'],
            ['最大可放', '118.4 kW']
          ],
          bottomLeft: [
            ['PCS1有功设定', '96.8'],
            ['初始电压', '698.5 V'],
            ['电池电流', '142.7 A'],
            ['最低温度', '22.8 °C'],
            ['最大可放', '118.4 kW']
          ],
          topRight: [
            ['并离网状态', '离网'],
            ['远程就地状态', '就地'],
            ['故障状态', '正常', 'status'],
            ['有功出力', '94.2 kW'],
            ['无功出力', '16.9 kVar'],
            ['交流电压', '392.1 V'],
            ['最高电流', '149.4 A'],
            ['最大可放', '116.1 kW']
          ],
          bottomRight: [
            ['PCS2有功设定', '94.2'],
            ['电池温度', '28.3 °C'],
            ['电池电流', '140.1 A'],
            ['最低温充', '19.7 °C'],
            ['最大可放', '116.1 kW']
          ]
        }
      }
    ];

    const buildOrderBatteryMetricRows = (items) => items.map(([label, value, type]) => `
      <div class="battery-metric-row">
        <span class="battery-metric-label">${label}</span>
        <span class="battery-metric-value${type === 'status' ? ' is-status' : ''}">
          ${type === 'status' ? '<i class="battery-status-dot"></i>' : ''}${value}
        </span>
      </div>
    `).join('');

    const setOrderBatteryText = (selector, value) => {
      const node = orderBatteryVisualModal ? orderBatteryVisualModal.querySelector(selector) : null;
      if (node) node.textContent = value;
    };

    const resolveOrderBatteryPayload = (vehicleId) => {
      const normalizedId = parseTrim(vehicleId);
      if (!normalizedId) return null;
      const seed = normalizedId.split('').reduce((total, char) => total + char.charCodeAt(0), 0);
      const template = ORDER_BATTERY_VISUAL_TEMPLATES[seed % ORDER_BATTERY_VISUAL_TEMPLATES.length];
      if (!template) return null;
      const socOffset = (seed % 7) - 3;
      const soc = Math.max(20, Math.min(96, template.battery.soc + socOffset));
      return {
        vehicleId: normalizedId,
        summary: { ...template.summary },
        battery: { soc },
        panels: {
          topLeft: [...template.panels.topLeft],
          bottomLeft: [...template.panels.bottomLeft],
          topRight: [...template.panels.topRight],
          bottomRight: [...template.panels.bottomRight]
        }
      };
    };

    const renderOrderBatteryVisual = (vehicleId) => {
      if (!orderBatteryVisualModal) return;
      const payload = resolveOrderBatteryPayload(vehicleId);
      if (!payload) return;
      const { summary, battery, panels } = payload;
      setOrderBatteryText('[data-order-battery-vehicle-id]', payload.vehicleId);
      setOrderBatteryText('[data-order-summary-active-power]', summary.activePower);
      setOrderBatteryText('[data-order-summary-reactive-power]', summary.reactivePower);
      setOrderBatteryText('[data-order-summary-temperature]', summary.temperature);
      setOrderBatteryText('[data-order-summary-humidity]', summary.humidity);
      setOrderBatteryText('[data-order-battery-soc]', `${battery.soc}%`);

      const panelMap = {
        '[data-order-panel-top-left]': panels.topLeft,
        '[data-order-panel-bottom-left]': panels.bottomLeft,
        '[data-order-panel-top-right]': panels.topRight,
        '[data-order-panel-bottom-right]': panels.bottomRight
      };
      Object.entries(panelMap).forEach(([selector, items]) => {
        const host = orderBatteryVisualModal.querySelector(selector);
        if (host) host.innerHTML = buildOrderBatteryMetricRows(items);
      });

      const segments = orderBatteryVisualModal.querySelectorAll('[data-order-battery-segment]');
      const activeSegments = Math.max(0, Math.min(segments.length, Math.round((battery.soc / 100) * segments.length)));
      segments.forEach((segment, index) => {
        segment.classList.toggle('is-active', index >= segments.length - activeSegments);
      });
    };

    const openOrderBatteryVisual = (vehicleId) => {
      if (!orderBatteryVisualModal) return;
      const payload = resolveOrderBatteryPayload(vehicleId);
      if (!payload) {
        showToast('未找到电池可视化数据');
        return;
      }
      renderOrderBatteryVisual(payload.vehicleId);
      openModal('modal-order-battery-visual');
    };

    const resolveOrderVehicleDetailData = (vehicleId) => {
      const targetId = parseTrim(vehicleId);
      if (!targetId) return null;
      vehicleCatalogAPI.reloadFromStorage();
      const vehicle = vehicleCatalogAPI.findById(targetId);
      if (vehicle) {
        return createOrderVehicleDetailData(normalizeVehicleRecord(vehicle));
      }
      return null;
    };

    const renderOrderVehicleDetail = (detailData) => {
      if (!orderVehicleDetailModal || !detailData) return;
      Object.entries(orderVehicleDetailBindings).forEach(([key, selector]) => {
        const node = orderVehicleDetailModal.querySelector(selector);
        if (node) node.textContent = textOrFallback(detailData[key]);
      });
      if (orderVehicleDetailDriverNameInput) orderVehicleDetailDriverNameInput.value = textOrFallback(detailData.driverName);
      if (orderVehicleDetailContactInput) orderVehicleDetailContactInput.value = textOrFallback(detailData.contact);
    };

    const renderOrderMapPlaceholder = (message) => {
      const mapHost = document.getElementById('order-vehicle-location-map');
      if (!mapHost) return;
      mapHost.innerHTML = `<div class="map-placeholder">${message}</div>`;
    };

    const loadOrderAmapScript = () => {
      if (window.AMap) return Promise.resolve(window.AMap);
      if (orderAmapScriptPromise) return orderAmapScriptPromise;

      const key = resolveAmapWebKey();
      if (!key) {
        renderOrderMapPlaceholder('未配置高德地图 API Key');
        return Promise.reject(new Error('AMAP_WEB_KEY is missing'));
      }

      orderAmapScriptPromise = new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = `https://webapi.amap.com/maps?v=2.0&key=${encodeURIComponent(key)}`;
        script.async = true;
        script.onload = () => {
          if (window.AMap) {
            resolve(window.AMap);
            return;
          }
          reject(new Error('AMap failed to initialize'));
        };
        script.onerror = () => reject(new Error('AMap script failed to load'));
        document.head.appendChild(script);
      }).catch((error) => {
        renderOrderMapPlaceholder('高德地图加载失败，请检查 API Key 或网络配置');
        throw error;
      });

      return orderAmapScriptPromise;
    };

    const openOrderVehicleDetail = (vehicleId) => {
      if (!orderVehicleDetailModal) return;
      const detailData = resolveOrderVehicleDetailData(vehicleId);
      if (!detailData) {
        showToast('未找到车辆详情');
        return;
      }
      renderOrderVehicleDetail(detailData);
      openModal('modal-order-vehicle-detail');
    };

    const openOrderVehicleLocation = (vehicleId) => {
      if (!orderVehicleLocationModal) return;
      const detailData = resolveOrderVehicleDetailData(vehicleId);
      if (!detailData) {
        showToast('未找到车辆位置');
        return;
      }

      const lng = Number.parseFloat(detailData.lng);
      const lat = Number.parseFloat(detailData.lat);
      const locationPayload = {
        vehicleId: detailData.vehicleId,
        address: detailData.address,
        lng: Number.isFinite(lng) ? lng : 116.407394,
        lat: Number.isFinite(lat) ? lat : 39.904211
      };

      if (orderLocationVehicleId) orderLocationVehicleId.textContent = locationPayload.vehicleId;
      if (orderLocationAddress) orderLocationAddress.textContent = locationPayload.address;
      if (orderLocationCoords) orderLocationCoords.textContent = `${locationPayload.lat}, ${locationPayload.lng}`;
      openModal('modal-order-vehicle-location');

      loadOrderAmapScript()
        .then((AMap) => {
          const center = [locationPayload.lng, locationPayload.lat];
          const mapHost = document.getElementById('order-vehicle-location-map');
          if (!mapHost) return;
          const markerHtml = `
            <div class="vehicle-amap-marker">
              <div class="vehicle-amap-marker-pulse"></div>
              <div class="vehicle-amap-marker-dot"></div>
            </div>
          `;
          const infoHtml = `
            <div class="vehicle-amap-card">
              <strong>${locationPayload.vehicleId}</strong>
              <span>${locationPayload.address}</span>
              <span>经纬度: ${locationPayload.lat}, ${locationPayload.lng}</span>
            </div>
          `;

          if (!orderVehicleMap) {
            orderVehicleMap = new AMap.Map(mapHost, {
              zoom: 14,
              center,
              resizeEnable: true,
              viewMode: '2D'
            });
            orderVehicleMarker = new AMap.Marker({
              position: center,
              anchor: 'center',
              content: markerHtml,
              bubble: true
            });
            orderVehicleInfoWindow = new AMap.InfoWindow({
              isCustom: true,
              offset: new AMap.Pixel(0, -30)
            });
            orderVehicleMarker.on('click', () => {
              if (!orderVehicleInfoWindow) return;
              const currentInfoHtml = orderVehicleMarker.getExtData()?.infoHtml || '';
              orderVehicleInfoWindow.setContent(currentInfoHtml);
              orderVehicleInfoWindow.open(orderVehicleMap, orderVehicleMarker.getPosition());
            });
            orderVehicleMap.add(orderVehicleMarker);
          } else {
            orderVehicleMap.setZoomAndCenter(14, center);
            orderVehicleMarker.setPosition(center);
          }

          orderVehicleMarker.setExtData({ infoHtml });
          if (orderVehicleInfoWindow) {
            orderVehicleInfoWindow.setContent(infoHtml);
            orderVehicleInfoWindow.open(orderVehicleMap, center);
          }

          window.requestAnimationFrame(() => {
            orderVehicleMap.resize();
            orderVehicleMap.setFitView([orderVehicleMarker], false, [80, 80, 80, 80]);
          });
        })
        .catch(() => {});
    };

    const setOrderDetailReadonlyState = () => {
      if (!orderDetailForm) return;
      orderDetailForm.querySelectorAll('input, textarea, select').forEach((input) => {
        input.disabled = true;
      });
    };

    const populateOrderDetailFromRow = (row) => {
      if (!row || !orderDetailForm) return;
      const cells = row.querySelectorAll('td');
      let sourceRecord = null;
      try {
        const raw = parseTrim(row.dataset.sourceRecord);
        sourceRecord = raw ? normalizeDispatchCatalogRecord(JSON.parse(raw)) : null;
      } catch (error) {
        sourceRecord = null;
      }
      const orderStatus = cells[7]?.textContent?.trim() || '';
      const detailSource = sourceRecord || {
        dispatchId: row.dataset.dispatchId || '',
        workorderId: row.dataset.workorderId || '',
        companyId: row.dataset.companyId || '',
        orderStatus: row.dataset.orderStatus || '',
        orderStartedAt: row.dataset.orderStartedAt || '',
        orderCompletedAt: row.dataset.orderCompletedAt || '',
        orderCanceledAt: row.dataset.orderCanceledAt || '',
        orderCancelReason: row.dataset.orderCancelReason || '',
        contactName: row.dataset.contactName || '',
        contactPhone: row.dataset.contactPhone || '',
        energyDemand: row.dataset.energyDemand || '',
        requiredPower: row.dataset.requiredPower || '',
        startTime: row.dataset.startTime || '',
        endTime: row.dataset.endTime || '',
        cancelReason: row.dataset.cancelReason || '',
        cancelImageUrl: row.dataset.cancelImage || '',
        driverName: row.dataset.driverName || '',
        driverPhone: row.dataset.driverPhone || '',
        failureRecords: row.dataset.failureRecords || '',
        failureReason: row.dataset.failureReason || '',
        failureAt: row.dataset.failureAt || '',
        actualEnergy: row.dataset.actualEnergy || '',
        averagePower: row.dataset.averagePower || '',
        peakPower: row.dataset.peakPower || '',
        utilizationRate: row.dataset.utilizationRate || '',
        energyDeviation: row.dataset.energyDeviation || ''
      };
      const projectCatalog = getProjectCatalogSnapshot();
      const resolvedCompanyName = resolveCompanyNameFromProjectCatalog(detailSource, projectCatalog);
      vehicleCatalogAPI.reloadFromStorage();
      setOrderDetailField('orderId', cells[0]?.textContent?.trim() || '');
      setOrderDetailField('companyName', resolvedCompanyName || cells[2]?.textContent?.trim() || '');
      setOrderDetailField('orderType', detailSource.orderType || cells[3]?.textContent?.trim() || '');
      setOrderDetailField('address', detailSource.address || cells[4]?.textContent?.trim() || '');
      setOrderDetailField('createdAt', detailSource.createdAt || cells[5]?.textContent?.trim() || '');
      const vehicleIdForDetail = detailSource.vehicleId || cells[6]?.textContent?.trim() || '';
      const linkedVehicle = vehicleCatalogAPI.findById(vehicleIdForDetail);
      setOrderDetailField('vehicleId', vehicleIdForDetail);
      setOrderDetailField('orderStatus', orderStatus);
      setOrderDetailField('dispatchId', detailSource.dispatchId || '');
      setOrderDetailField('workorderId', detailSource.workorderId || '');
      setOrderDetailField('companyId', detailSource.companyId || '');
      setOrderDetailField('contactName', detailSource.contactName || '');
      setOrderDetailField('contactPhone', detailSource.contactPhone || '');
      setOrderDetailField('energyDemand', detailSource.energyDemand || '');
      setOrderDetailField('requiredPower', detailSource.requiredPower || '');
      setOrderDetailField('startTime', detailSource.startTime || '');
      const resolvedEndTime = detailSource.orderCompletedAt || detailSource.endTime || detailSource.endAt || '—';
      setOrderDetailField('endTime', resolvedEndTime);
      setOrderDetailField('cancelReason', detailSource.orderCancelReason || detailSource.cancelReason || '');
      setOrderDetailField('driverName', linkedVehicle ? linkedVehicle.driverName : (detailSource.driverName || ''));
      setOrderDetailField('driverPhone', linkedVehicle ? linkedVehicle.contact : (detailSource.driverPhone || ''));
      setOrderFailureRecordVisibility(
        detailSource.failureRecords || '',
        detailSource.failureReason || '',
        detailSource.failureAt || ''
      );
      applyOrderStatusLayout(orderStatus, detailSource);
    };

    const buildOrderRowFromDispatch = (record, index = 0, projectCatalog = null) => {
      const dispatchId = parseTrim(record.dispatchId);
      const workorderId = parseTrim(record.workorderId);
      const orderId = createOrderIdFromDispatch(dispatchId, index);
      const resolvedCompanyName = resolveCompanyNameFromProjectCatalog(record, projectCatalog);
      const companyName = resolvedCompanyName || '未填写';
      const sourceRecord = {
        ...record,
        companyName
      };
      const orderType = normalizeWorkorderType(record.orderType);
      const address = parseTrim(record.address) || '—';
      const createdAt = parseTrim(record.createdAt) || formatDateTime();
      const vehicleId = parseTrim(record.vehicleId) || '未指定';
      const linkedVehicle = vehicleCatalogAPI.findById(vehicleId);
      const orderStatus = resolveOrderStatusFromRecord(record);
      sourceRecord.orderStatus = orderStatus;
      const failureRecords = normalizeDispatchFailureRecords(
        record.failureRecords,
        record.failureReason,
        record.failureAt
      );
      const powerCalc = record && typeof record.powerCalc === 'object' ? record.powerCalc : null;
      const latestFailure = failureRecords.length ? failureRecords[failureRecords.length - 1] : null;
      const tr = document.createElement('tr');
      tr.dataset.sourceRecord = JSON.stringify(sourceRecord);
      tr.dataset.workorderId = workorderId;
      tr.dataset.dispatchId = dispatchId;
      tr.dataset.companyId = parseTrim(record.companyId);
      tr.dataset.contactName = parseTrim(record.contactName);
      tr.dataset.contactPhone = parseTrim(record.contactPhone);
      tr.dataset.energyDemand = parseTrim(record.energyDemand);
      tr.dataset.requiredPower = parseTrim(record.requiredPower);
      tr.dataset.startTime = parseTrim(record.startTime);
      tr.dataset.endTime = parseTrim(record.endTime || record.endAt || '');
      tr.dataset.cancelReason = parseTrim(record.cancelReason);
      tr.dataset.cancelImage = parseTrim(record.cancelImageUrl || record.cancelImage || '');
      tr.dataset.driverName = linkedVehicle ? parseTrim(linkedVehicle.driverName) : parseTrim(record.driverName);
      tr.dataset.driverPhone = linkedVehicle ? parseTrim(linkedVehicle.contact) : parseTrim(record.driverPhone);
      tr.dataset.orderStatus = normalizeOrderLifecycleStatus(record.orderStatus, orderStatus);
      tr.dataset.orderStartedAt = parseTrim(record.orderStartedAt);
      tr.dataset.orderCompletedAt = parseTrim(record.orderCompletedAt);
      tr.dataset.orderCanceledAt = parseTrim(record.orderCanceledAt);
      tr.dataset.orderCancelReason = parseTrim(record.orderCancelReason);
      tr.dataset.actualEnergy = parseTrim(powerCalc?.actualEnergy || record.actualEnergy || '');
      tr.dataset.averagePower = parseTrim(powerCalc?.averagePower || record.averagePower || '');
      tr.dataset.peakPower = parseTrim(powerCalc?.peakPower || record.peakPower || '');
      tr.dataset.utilizationRate = parseTrim(powerCalc?.utilizationRate || record.utilizationRate || '');
      tr.dataset.energyDeviation = parseTrim(powerCalc?.energyDeviation || record.energyDeviation || '');
      tr.dataset.failureRecords = JSON.stringify(failureRecords);
      tr.dataset.failureReason = latestFailure ? latestFailure.reason : '';
      tr.dataset.failureAt = latestFailure ? latestFailure.at : '';
      tr.innerHTML = `
        <td>${orderId}</td>
        <td>${dispatchId || '—'}</td>
        <td>${companyName}</td>
        <td><span style="color:#2f6cf6;">${orderType}</span></td>
        <td>${address}</td>
        <td>${createdAt}</td>
        <td>${vehicleId}</td>
        <td>${orderStatus}</td>
        <td><button class="link-btn" data-action="view-order-detail">详情</button></td>
      `;
      return tr;
    };
    const findOrderRowByDispatchId = (dispatchId) => {
      const target = parseTrim(dispatchId);
      if (!target) return null;
      return Array.from(tbody.querySelectorAll('tr')).find((row) => parseTrim(row.dataset.dispatchId) === target) || null;
    };
    const updateOrderLifecycleByDispatchId = (dispatchId, updater) => {
      const target = parseTrim(dispatchId);
      if (!target || typeof updater !== 'function') return null;
      const records = dispatchCatalogAPI.reloadFromStorage()
        .map(normalizeDispatchCatalogRecord)
        .filter((item) => item.dispatchId);
      let updatedRecord = null;
      const nextRecords = records.map((record) => {
        if (record.dispatchId !== target) return record;
        updatedRecord = normalizeDispatchCatalogRecord(updater({ ...record }));
        return updatedRecord;
      });
      if (!updatedRecord) return null;
      dispatchCatalogAPI.replaceAll(nextRecords);
      return updatedRecord;
    };
    const syncOrderRowsFromDispatch = () => {
      const projectCatalog = getProjectCatalogSnapshot();
      const dispatchRecords = dispatchCatalogAPI.reloadFromStorage()
        .map(normalizeDispatchCatalogRecord)
        .filter((item) => item.dispatchId);
      const records = dispatchRecords.filter((item) => isDispatchAppConfirmed(item));
      tbody.innerHTML = '';
      if (!records.length) {
        tbody.innerHTML = '<tr><td colspan="9">暂无已确认订单，等待 APP 回传确认。</td></tr>';
        return records;
      }
      records.forEach((record, index) => {
        tbody.appendChild(buildOrderRowFromDispatch(record, index, projectCatalog));
      });
      return records;
    };

    let orderFilterController = null;
    const refreshOrderRows = () => {
      syncOrderRowsFromDispatch();
      orderFilterController?.applyFilters();
    };

    refreshOrderRows();
    setOrderDetailReadonlyState();
    orderFilterController = buildTableFilterController({
      tableSelector: '[data-order-table]',
      filters: [
        { name: 'company', selector: '[data-filter-order-company]', parser: parseLower },
        { name: 'workorderId', selector: '[data-filter-order-id]', parser: parseLower },
        { name: 'dispatchId', selector: '[data-filter-order-dispatch]', parser: parseLower },
        { name: 'status', selector: '[data-filter-order-status]', parser: parseTrim }
      ],
      matchRow: (row, values) => {
        const cells = row.querySelectorAll('td');
        const company = cells[2]?.textContent?.trim().toLowerCase() || '';
        const workorderId = parseTrim(row.dataset.workorderId).toLowerCase();
        const dispatchId = parseTrim(row.dataset.dispatchId).toLowerCase();
        const status = cells[7]?.textContent?.trim() || '';
        const matchesCompany = !values.company || company.includes(values.company);
        const matchesWorkorderId = !values.workorderId || workorderId.includes(values.workorderId);
        const matchesDispatchId = !values.dispatchId || dispatchId.includes(values.dispatchId);
        const matchesStatus = !values.status || status === values.status;
        return matchesCompany && matchesWorkorderId && matchesDispatchId && matchesStatus;
      },
      searchAction: 'search-order',
      resetAction: 'reset-order-filters'
    });

    const orderSyncTimer = window.setInterval(() => {
      refreshOrderRows();
    }, 5000);
    const handleDispatchAckUpdated = () => {
      refreshOrderRows();
    };
    window.addEventListener('dispatch-app-ack-updated', handleDispatchAckUpdated);
    window.addEventListener('beforeunload', () => {
      window.clearInterval(orderSyncTimer);
      window.removeEventListener('dispatch-app-ack-updated', handleDispatchAckUpdated);
    }, { once: true });

    if (orderDetailModal) {
      orderDetailModal.addEventListener('click', (event) => {
        if (event.target === orderDetailModal) {
          closeModal(orderDetailModal);
        }
      });
    }
    if (orderVehicleDetailModal) {
      orderVehicleDetailModal.addEventListener('click', (event) => {
        if (event.target === orderVehicleDetailModal) {
          closeModal(orderVehicleDetailModal);
        }
      });
    }
    if (orderVehicleLocationModal) {
      orderVehicleLocationModal.addEventListener('click', (event) => {
        if (event.target === orderVehicleLocationModal) {
          closeModal(orderVehicleLocationModal);
        }
      });
    }
    if (orderBatteryVisualModal) {
      orderBatteryVisualModal.addEventListener('click', (event) => {
        if (event.target === orderBatteryVisualModal) {
          closeModal(orderBatteryVisualModal);
        }
      });
    }

    document.addEventListener('click', (event) => {
      const detailBtn = event.target.closest('[data-action="view-order-detail"]');
      if (detailBtn && detailBtn.closest('[data-order-table]')) {
        if (!orderDetailModal) return;
        const row = detailBtn.closest('tr');
        if (!row) return;
        populateOrderDetailFromRow(row);
        openModal('modal-order-detail');
        return;
      }

      const startOrderPowerBtn = event.target.closest('[data-action="start-order-power"]');
      if (startOrderPowerBtn) {
        const dispatchIdInput = orderDetailForm ? orderDetailForm.querySelector('[data-order-field="dispatchId"]') : null;
        const orderStatusInput = orderDetailForm ? orderDetailForm.querySelector('[data-order-field="orderStatus"]') : null;
        const dispatchId = parseTrim(dispatchIdInput ? dispatchIdInput.value : '');
        const currentStatus = parseTrim(orderStatusInput ? orderStatusInput.value : '');
        if (!dispatchId) {
          showToast('订单缺少调度ID，无法更新');
          return;
        }
        if (currentStatus !== ORDER_STATUS.IN_TRANSIT) {
          showToast('仅在途订单可开始供电');
          return;
        }
        const updated = updateOrderLifecycleByDispatchId(dispatchId, (record) => ({
          ...record,
          orderStatus: ORDER_STATUS.IN_PROGRESS,
          orderStartedAt: trimDispatchValue(record.orderStartedAt) || formatDateTime(),
          orderCanceledAt: '',
          orderCancelReason: ''
        }));
        if (!updated) {
          showToast('开始供电失败，请刷新后重试');
          return;
        }
        refreshOrderRows();
        const refreshedRow = findOrderRowByDispatchId(dispatchId);
        if (refreshedRow) {
          populateOrderDetailFromRow(refreshedRow);
        }
        showToast('已开始供电，订单进入进行中');
        return;
      }

      const vehicleDetailBtn = event.target.closest('[data-action="view-order-vehicle"]');
      if (vehicleDetailBtn) {
        const vehicleIdInput = orderDetailForm ? orderDetailForm.querySelector('[data-order-field="vehicleId"]') : null;
        const vehicleId = parseTrim(vehicleIdInput ? vehicleIdInput.value : '');
        if (!vehicleId) {
          showToast('请先选择车辆');
          return;
        }
        openOrderVehicleDetail(vehicleId);
        return;
      }

      const vehicleLocationBtn = event.target.closest('[data-action="locate-order-vehicle"]');
      if (vehicleLocationBtn) {
        const vehicleIdInput = orderDetailForm ? orderDetailForm.querySelector('[data-order-field="vehicleId"]') : null;
        const vehicleId = parseTrim(vehicleIdInput ? vehicleIdInput.value : '');
        if (!vehicleId) {
          showToast('请先选择车辆');
          return;
        }
        openOrderVehicleLocation(vehicleId);
        return;
      }

      const batteryVisualBtn = event.target.closest('[data-action="visualize-order-battery"]');
      if (batteryVisualBtn) {
        const orderStatusInput = orderDetailForm ? orderDetailForm.querySelector('[data-order-field="orderStatus"]') : null;
        const currentStatus = parseTrim(orderStatusInput ? orderStatusInput.value : '');
        if (currentStatus !== ORDER_STATUS.IN_PROGRESS) {
          showToast('仅进行中订单可查看电池可视化');
          return;
        }
        const vehicleIdInput = orderDetailForm ? orderDetailForm.querySelector('[data-order-field="vehicleId"]') : null;
        const vehicleId = parseTrim(vehicleIdInput ? vehicleIdInput.value : '');
        if (!vehicleId) {
          showToast('请先选择车辆');
          return;
        }
        openOrderBatteryVisual(vehicleId);
      }
    });
  };

  const setupAlertCurrentFilters = () => {
    if (document.body.dataset.page !== 'mobile-alert-current') return;
    syncAlertRowsFromSourcePayload('[data-alert-current-table]', 'current');
    buildTableFilterController({
      tableSelector: '[data-alert-current-table]',
      filters: [
        { name: 'vehicle', selector: '[data-filter-alert-current-vehicle]', parser: parseLower },
        { name: 'type', selector: '[data-filter-alert-current-type]', parser: parseTrim },
        { name: 'device', selector: '[data-filter-alert-current-device]', parser: parseTrim }
      ],
      matchRow: (row, values) => {
        const cells = row.querySelectorAll('td');
        const vehicle = cells[0]?.textContent?.trim().toLowerCase() || '';
        const type = cells[3]?.textContent?.trim() || '';
        const device = cells[1]?.textContent?.trim() || '';
        const matchesVehicle = !values.vehicle || vehicle.includes(values.vehicle);
        const matchesType = !values.type || type === values.type;
        const matchesDevice = !values.device || device === values.device;
        return matchesVehicle && matchesType && matchesDevice;
      },
      searchAction: 'search-alert-current',
      resetAction: 'reset-alert-current-filters'
    });
  };

  const setupAlertHistoryFilters = () => {
    if (document.body.dataset.page !== 'mobile-alert-history') return;
    syncAlertRowsFromSourcePayload('[data-alert-history-table]', 'history');
    buildTableFilterController({
      tableSelector: '[data-alert-history-table]',
      filters: [
        { name: 'vehicle', selector: '[data-filter-alert-history-vehicle]', parser: parseLower },
        { name: 'type', selector: '[data-filter-alert-history-type]', parser: parseTrim },
        { name: 'device', selector: '[data-filter-alert-history-device]', parser: parseTrim }
      ],
      matchRow: (row, values) => {
        const cells = row.querySelectorAll('td');
        const vehicle = cells[0]?.textContent?.trim().toLowerCase() || '';
        const type = cells[3]?.textContent?.trim() || '';
        const device = cells[1]?.textContent?.trim() || '';
        const matchesVehicle = !values.vehicle || vehicle.includes(values.vehicle);
        const matchesType = !values.type || type === values.type;
        const matchesDevice = !values.device || device === values.device;
        return matchesVehicle && matchesType && matchesDevice;
      },
      searchAction: 'search-alert-history',
      resetAction: 'reset-alert-history-filters'
    });
  };

  const setupVehicleList = () => {
    if (document.body.dataset.page !== 'mobile-vehicle-list') return;
    const modal = document.getElementById('modal-new-car');
    const table = document.querySelector('[data-vehicle-table]');
    const tbody = table ? table.querySelector('tbody') : null;
    const form = document.querySelector('[data-vehicle-form]');
    const confirmModal = document.getElementById('modal-confirm-delete');
    const locationModal = document.getElementById('modal-vehicle-location');
    const batteryVisualModal = document.getElementById('modal-battery-visual');
    const detailModal = document.getElementById('modal-vehicle-detail');
    const locationVehicleId = locationModal ? locationModal.querySelector('[data-location-vehicle-id]') : null;
    const locationAddress = locationModal ? locationModal.querySelector('[data-location-address]') : null;
    const locationCoords = locationModal ? locationModal.querySelector('[data-location-coords]') : null;
    const detailDriverNameInput = detailModal ? detailModal.querySelector('[data-detail-driver-name]') : null;
    const detailContactInput = detailModal ? detailModal.querySelector('[data-detail-contact]') : null;
    const filterVehicleIdInput = document.querySelector('[data-filter="vehicle-id"]');
    const filterChargeStatusSelect = document.querySelector('[data-filter="charge-status"]');
    const filterEnergyMinInput = document.querySelector('[data-filter="energy-min"]');
    const filterEnergyMaxInput = document.querySelector('[data-filter="energy-max"]');
    const filterDriverNameInput = document.querySelector('[data-filter="driver-name"]');
    if (!table || !tbody || !form) return;
    const vehicleTableContainer = table.closest('[data-paginated]');

    let pendingDeleteRow = null;
    let activeDetailRow = null;
    let vehicleMap = null;
    let vehicleMarker = null;
    let vehicleInfoWindow = null;
    let amapScriptPromise = null;
    const batteryVisualData = {
      '储能车ES-M100-500': {
        vehicleId: '储能车ES-M100-500',
        summary: {
          activePower: '123.1 kW',
          reactivePower: '28.4 kVar',
          temperature: '29.3 °C',
          humidity: '47.8 RH/%'
        },
        battery: {
          soc: 84,
          status: '放电中'
        },
        panels: {
          topLeft: [
            ['并离网状态', '并网'],
            ['远程就地状态', '远程'],
            ['故障状态', '正常', 'status'],
            ['有功出力', '123.1 kW'],
            ['无功出力', '28.4 kVar'],
            ['交流电压', '398.2 V'],
            ['最大可充', '126.0 kW'],
            ['最大可放', '132.5 kW']
          ],
          bottomLeft: [
            ['PCS1有功设定', '123.1'],
            ['初始电压', '712.3 V'],
            ['电池电流', '168.5 A'],
            ['最低温度', '24.6 °C'],
            ['最大可放', '132.5 kW']
          ],
          topRight: [
            ['并离网状态', '并网'],
            ['远程就地状态', '远程'],
            ['故障状态', '正常', 'status'],
            ['有功出力', '121.6 kW'],
            ['无功出力', '26.9 kVar'],
            ['交流电压', '401.5 V'],
            ['最高电流', '173.2 A'],
            ['最大可放', '129.8 kW']
          ],
          bottomRight: [
            ['PCS2有功设定', '121.6'],
            ['电池温度', '30.2 °C'],
            ['电池电流', '166.8 A'],
            ['最低温充', '20.4 °C'],
            ['最大可放', '129.8 kW']
          ]
        }
      },
      '储能车ES-M100-501': {
        vehicleId: '储能车ES-M100-501',
        summary: {
          activePower: '96.8 kW',
          reactivePower: '18.7 kVar',
          temperature: '27.1 °C',
          humidity: '42.6 RH/%'
        },
        battery: {
          soc: 67,
          status: '待机中'
        },
        panels: {
          topLeft: [
            ['并离网状态', '离网'],
            ['远程就地状态', '远程'],
            ['故障状态', '正常', 'status'],
            ['有功出力', '96.8 kW'],
            ['无功出力', '18.7 kVar'],
            ['交流电压', '389.6 V'],
            ['最大可充', '112.0 kW'],
            ['最大可放', '118.4 kW']
          ],
          bottomLeft: [
            ['PCS1有功设定', '96.8'],
            ['初始电压', '698.5 V'],
            ['电池电流', '142.7 A'],
            ['最低温度', '22.8 °C'],
            ['最大可放', '118.4 kW']
          ],
          topRight: [
            ['并离网状态', '离网'],
            ['远程就地状态', '就地'],
            ['故障状态', '正常', 'status'],
            ['有功出力', '94.2 kW'],
            ['无功出力', '16.9 kVar'],
            ['交流电压', '392.1 V'],
            ['最高电流', '149.4 A'],
            ['最大可放', '116.1 kW']
          ],
          bottomRight: [
            ['PCS2有功设定', '94.2'],
            ['电池温度', '28.3 °C'],
            ['电池电流', '140.1 A'],
            ['最低温充', '19.7 °C'],
            ['最大可放', '116.1 kW']
          ]
        }
      }
    };

    const renderMapPlaceholder = (message) => {
      const mapHost = document.getElementById('vehicle-location-map');
      if (!mapHost) return;
      mapHost.innerHTML = `<div class="map-placeholder">${message}</div>`;
    };

    const loadAmapScript = () => {
      if (window.AMap) return Promise.resolve(window.AMap);
      if (amapScriptPromise) return amapScriptPromise;

      const key = resolveAmapWebKey();
      if (!key) {
        renderMapPlaceholder('未配置高德地图 API Key');
        return Promise.reject(new Error('AMAP_WEB_KEY is missing'));
      }

      amapScriptPromise = new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = `https://webapi.amap.com/maps?v=2.0&key=${encodeURIComponent(key)}`;
        script.async = true;
        script.onload = () => {
          if (window.AMap) {
            resolve(window.AMap);
            return;
          }
          reject(new Error('AMap failed to initialize'));
        };
        script.onerror = () => reject(new Error('AMap script failed to load'));
        document.head.appendChild(script);
      }).catch((error) => {
        renderMapPlaceholder('高德地图加载失败，请检查 API Key 或网络配置');
        throw error;
      });

      return amapScriptPromise;
    };

    const updateVehicleLocationModal = (payload) => {
      if (locationVehicleId) locationVehicleId.textContent = payload.vehicleId;
      if (locationAddress) locationAddress.textContent = payload.address;
      if (locationCoords) locationCoords.textContent = `${payload.lat}, ${payload.lng}`;
    };

    const buildMetricRows = (items) => items.map(([label, value, type]) => `
      <div class="battery-metric-row">
        <span class="battery-metric-label">${label}</span>
        <span class="battery-metric-value${type === 'status' ? ' is-status' : ''}">
          ${type === 'status' ? '<i class="battery-status-dot"></i>' : ''}${value}
        </span>
      </div>
    `).join('');

    const setText = (selector, value) => {
      const node = batteryVisualModal ? batteryVisualModal.querySelector(selector) : null;
      if (node) node.textContent = value;
    };

    const renderBatteryVisual = (vehicleId) => {
      if (!batteryVisualModal) return;
      const fallbackVehicleId = Object.keys(batteryVisualData)[0];
      const basePayload = batteryVisualData[vehicleId] || batteryVisualData[fallbackVehicleId];
      if (!basePayload) return;
      const payload = batteryVisualData[vehicleId]
        ? basePayload
        : { ...basePayload, vehicleId: vehicleId || basePayload.vehicleId };
      const { summary, battery, panels } = payload;
      setText('[data-battery-vehicle-id]', payload.vehicleId);
      setText('[data-summary-active-power]', summary.activePower);
      setText('[data-summary-reactive-power]', summary.reactivePower);
      setText('[data-summary-temperature]', summary.temperature);
      setText('[data-summary-humidity]', summary.humidity);
      setText('[data-battery-soc]', `${battery.soc}%`);

      const panelMap = {
        '[data-panel-top-left]': panels.topLeft,
        '[data-panel-bottom-left]': panels.bottomLeft,
        '[data-panel-top-right]': panels.topRight,
        '[data-panel-bottom-right]': panels.bottomRight
      };
      Object.entries(panelMap).forEach(([selector, items]) => {
        const host = batteryVisualModal.querySelector(selector);
        if (host) host.innerHTML = buildMetricRows(items);
      });

      const segments = batteryVisualModal.querySelectorAll('[data-battery-segment]');
      const activeSegments = Math.max(0, Math.min(segments.length, Math.round((battery.soc / 100) * segments.length)));
      segments.forEach((segment, index) => {
        segment.classList.toggle('is-active', index >= segments.length - activeSegments);
      });
    };

    const detailBindings = {
      vehicleId: '[data-detail-vehicle-id]',
      serialNo: '[data-detail-serial-no]',
      batteryType: '[data-detail-battery-type]',
      lng: '[data-detail-lng]',
      capacity: '[data-detail-capacity]',
      voltageRange: '[data-detail-voltage-range]',
      nominalEnergy: '[data-detail-nominal-energy]',
      lat: '[data-detail-lat]',
      maxCurrent: '[data-detail-max-current]',
      pcsPower: '[data-detail-pcs-power]',
      ratedPower: '[data-detail-rated-power]',
      cooling: '[data-detail-cooling]',
      protection: '[data-detail-protection]',
      size: '[data-detail-size]',
      weight: '[data-detail-weight]',
      productionDate: '[data-detail-production-date]',
      manufacturer: '[data-detail-manufacturer]',
      company: '[data-detail-company]',
      status: '[data-detail-status]',
      totalCharge: '[data-detail-total-charge]',
      totalDischarge: '[data-detail-total-discharge]',
      totalChargeCount: '[data-detail-total-charge-count]',
      totalDischargeCount: '[data-detail-total-discharge-count]',
      totalPower: '[data-detail-total-power]'
    };

    const getTextOrFallback = (value, fallback = '—') => {
      const text = `${value ?? ''}`.trim();
      return text || fallback;
    };

    const getRowDetailData = (row) => row?._vehicleDetailData || null;

    const setRowDetailData = (row, data) => {
      if (row) row._vehicleDetailData = data;
    };

    const createVehicleDetailData = (data) => ({
      vehicleId: getTextOrFallback(data.vehicleId),
      serialNo: getTextOrFallback(data.serialNo),
      batteryType: getTextOrFallback(data.batteryType),
      lng: getTextOrFallback(data.lng),
      capacity: getTextOrFallback(data.capacity),
      voltageRange: getTextOrFallback(data.voltageRange),
      nominalEnergy: getTextOrFallback(data.nominalEnergy),
      lat: getTextOrFallback(data.lat),
      maxCurrent: getTextOrFallback(data.maxCurrent),
      pcsPower: getTextOrFallback(data.pcsPower),
      ratedPower: getTextOrFallback(data.ratedPower ?? data.pcsPower),
      cooling: getTextOrFallback(data.cooling),
      protection: getTextOrFallback(data.protection),
      size: getTextOrFallback(data.size),
      weight: getTextOrFallback(data.weight),
      productionDate: getTextOrFallback(data.productionDate),
      manufacturer: getTextOrFallback(data.manufacturer),
      company: getTextOrFallback(data.company),
      driverName: getTextOrFallback(data.driverName),
      contact: getTextOrFallback(data.contact),
      status: getTextOrFallback(data.status ?? data.chargeStatus),
      totalCharge: getTextOrFallback(data.totalCharge, '0'),
      totalDischarge: getTextOrFallback(data.totalDischarge, '0'),
      totalChargeCount: getTextOrFallback(data.totalChargeCount, '0'),
      totalDischargeCount: getTextOrFallback(data.totalDischargeCount, '0'),
      totalPower: getTextOrFallback(data.totalPower, '0'),
      address: getTextOrFallback(data.address, '未设置位置')
    });

    const renderVehicleDetail = (detailData) => {
      if (!detailModal) return;
      Object.entries(detailBindings).forEach(([key, selector]) => {
        const node = detailModal.querySelector(selector);
        if (node) node.textContent = getTextOrFallback(detailData[key]);
      });
      if (detailDriverNameInput) detailDriverNameInput.value = getTextOrFallback(detailData.driverName);
      if (detailContactInput) detailContactInput.value = getTextOrFallback(detailData.contact);
    };

    const syntheticManufacturers = [
      '山东天欣达能源科技有限公司',
      '南网储能装备制造有限公司',
      '广州智储新能源科技有限公司',
      '珠海海蓝能源设备有限公司',
      '深圳云能动力科技股份有限公司'
    ];

    const syntheticCompanies = [
      '南方电网',
      '南方电网广州供电局',
      '南方电网综合能源有限公司'
    ];

    const syntheticBatteryTypes = ['LFP', 'NCM', 'LTO'];
    const syntheticCooling = ['液冷', '风冷'];
    const syntheticProtection = ['IP54', 'IP55', 'IP65'];

    const formatSyntheticNumber = (value) => Number(value).toFixed(1);

    const pickFilled = (primary, fallback) => {
      const text = `${primary ?? ''}`.trim();
      return text || fallback;
    };

    const buildSyntheticVehicleDetail = (normalized, index) => {
      const seq = index + 1;
      const capacityNum = 620 + seq * 8;
      const pcsPowerNum = 240 + seq * 6;
      const weightNum = 6.4 + seq * 0.13;
      const nominalEnergyNum = parseEnergyValue(normalized.nominalEnergy || normalized.energyLeft) || capacityNum;
      return {
        serialNo: `SN-GZ-2026-${String(seq).padStart(4, '0')}`,
        batteryType: syntheticBatteryTypes[index % syntheticBatteryTypes.length],
        capacity: `${capacityNum}`,
        voltageRange: `${720 + seq * 3}~${900 + seq * 2}`,
        nominalEnergy: nominalEnergyNum.toFixed(2),
        maxCurrent: `${300 + seq * 7}`,
        pcsPower: `${pcsPowerNum}`,
        ratedPower: `${pcsPowerNum + 6}`,
        cooling: syntheticCooling[index % syntheticCooling.length],
        protection: syntheticProtection[index % syntheticProtection.length],
        size: `${3000 + seq * 11}*${2400 + seq * 5}*${2850 + seq * 3}mm`,
        weight: formatSyntheticNumber(weightNum),
        productionDate: `${2024 + (index % 3)}年${(index % 12) + 1}月`,
        manufacturer: syntheticManufacturers[index % syntheticManufacturers.length],
        company: syntheticCompanies[index % syntheticCompanies.length],
        totalCharge: formatSyntheticNumber(2800 + seq * 235),
        totalDischarge: formatSyntheticNumber(1700 + seq * 188),
        totalChargeCount: `${16 + seq}`,
        totalDischargeCount: `${14 + seq}`,
        totalPower: formatSyntheticNumber(32000 + seq * 1650),
        status: normalized.chargeStatus || '待机',
        address: normalized.address || '未设置位置',
        lng: normalized.lng || '116.407394',
        lat: normalized.lat || '39.904211'
      };
    };

    const hydrateExistingVehicleRows = () => {
      tbody.querySelectorAll('tr').forEach((row, index) => {
        if (getRowDetailData(row)) return;
        const cells = row.querySelectorAll('td');
        const locationBtn = row.querySelector('[data-action="view-vehicle-location"]');
        if (!cells.length || !locationBtn) return;
        const normalized = normalizeVehicleRecord({
          vehicleId: cells[0]?.textContent?.trim() || '',
          driverName: cells[1]?.textContent?.trim() || '',
          contact: cells[2]?.textContent?.trim() || '',
          energyLeft: cells[3]?.textContent?.trim() || '',
          nominalEnergy: cells[3]?.textContent?.trim() || '',
          chargeStatus: cells[4]?.textContent?.trim() || '',
          dataStatus: cells[5]?.textContent?.trim() || '',
          address: locationBtn.dataset.address || '',
          lng: locationBtn.dataset.lng || '',
          lat: locationBtn.dataset.lat || ''
        });
        const synthetic = buildSyntheticVehicleDetail(normalized, index);
        setRowDetailData(row, createVehicleDetailData({
          vehicleId: pickFilled(normalized.vehicleId, synthetic.vehicleId),
          driverName: pickFilled(normalized.driverName, synthetic.driverName),
          contact: pickFilled(normalized.contact, synthetic.contact),
          nominalEnergy: pickFilled(normalized.nominalEnergy, synthetic.nominalEnergy),
          chargeStatus: pickFilled(normalized.chargeStatus, synthetic.status),
          status: pickFilled(normalized.chargeStatus, synthetic.status),
          dataStatus: pickFilled(normalized.dataStatus, '正常'),
          serialNo: pickFilled(normalized.serialNo, synthetic.serialNo),
          batteryType: pickFilled(normalized.batteryType, synthetic.batteryType),
          lng: pickFilled(normalized.lng, synthetic.lng),
          lat: pickFilled(normalized.lat, synthetic.lat),
          capacity: pickFilled(normalized.capacity, synthetic.capacity),
          voltageRange: pickFilled(normalized.voltageRange, synthetic.voltageRange),
          maxCurrent: pickFilled(normalized.maxCurrent, synthetic.maxCurrent),
          pcsPower: pickFilled(normalized.pcsPower, synthetic.pcsPower),
          ratedPower: pickFilled(normalized.ratedPower, synthetic.ratedPower),
          cooling: pickFilled(normalized.cooling, synthetic.cooling),
          protection: pickFilled(normalized.protection, synthetic.protection),
          size: pickFilled(normalized.size, synthetic.size),
          weight: pickFilled(normalized.weight, synthetic.weight),
          productionDate: pickFilled(normalized.productionDate, synthetic.productionDate),
          manufacturer: pickFilled(normalized.manufacturer, synthetic.manufacturer),
          company: pickFilled(normalized.company, synthetic.company),
          totalCharge: pickFilled(normalized.totalCharge, synthetic.totalCharge),
          totalDischarge: pickFilled(normalized.totalDischarge, synthetic.totalDischarge),
          totalChargeCount: pickFilled(normalized.totalChargeCount, synthetic.totalChargeCount),
          totalDischargeCount: pickFilled(normalized.totalDischargeCount, synthetic.totalDischargeCount),
          totalPower: pickFilled(normalized.totalPower, synthetic.totalPower),
          address: pickFilled(normalized.address, synthetic.address)
        }));
      });
    };

    const parseEnergyValue = (value) => {
      const numeric = Number.parseFloat(`${value ?? ''}`.replace(/[^\d.-]/g, ''));
      return Number.isFinite(numeric) ? numeric : null;
    };

    const applyVehicleFilters = () => {
      const vehicleIdKeyword = filterVehicleIdInput ? filterVehicleIdInput.value.trim().toLowerCase() : '';
      const chargeStatus = filterChargeStatusSelect ? filterChargeStatusSelect.value.trim() : '';
      const driverNameKeyword = filterDriverNameInput ? filterDriverNameInput.value.trim().toLowerCase() : '';
      const energyMin = parseEnergyValue(filterEnergyMinInput ? filterEnergyMinInput.value : '');
      const energyMax = parseEnergyValue(filterEnergyMaxInput ? filterEnergyMaxInput.value : '');

      tbody.querySelectorAll('tr').forEach((row) => {
        const cells = row.querySelectorAll('td');
        const vehicleId = cells[0] ? cells[0].textContent.trim().toLowerCase() : '';
        const driverName = cells[1] ? cells[1].textContent.trim().toLowerCase() : '';
        const energy = parseEnergyValue(cells[3] ? cells[3].textContent : '');
        const rowChargeStatus = cells[4] ? cells[4].textContent.trim() : '';

        const matchesVehicleId = !vehicleIdKeyword || vehicleId.includes(vehicleIdKeyword);
        const matchesChargeStatus = !chargeStatus || rowChargeStatus === chargeStatus;
        const matchesDriverName = !driverNameKeyword || driverName.includes(driverNameKeyword);
        const matchesEnergyMin = energyMin === null || (energy !== null && energy >= energyMin);
        const matchesEnergyMax = energyMax === null || (energy !== null && energy <= energyMax);
        const isVisible = matchesVehicleId && matchesChargeStatus && matchesDriverName && matchesEnergyMin && matchesEnergyMax;

        row.dataset.filterHidden = isVisible ? 'false' : 'true';
      });

      if (vehicleTableContainer && typeof vehicleTableContainer.refreshPagination === 'function') {
        vehicleTableContainer.refreshPagination(1);
      }
    };

    const resetVehicleFilters = () => {
      if (filterVehicleIdInput) filterVehicleIdInput.value = '';
      if (filterChargeStatusSelect) filterChargeStatusSelect.value = '';
      if (filterEnergyMinInput) filterEnergyMinInput.value = '';
      if (filterEnergyMaxInput) filterEnergyMaxInput.value = '';
      if (filterDriverNameInput) filterDriverNameInput.value = '';
      applyVehicleFilters();
    };

    const openVehicleDetail = (row) => {
      if (!row || !detailModal) return;
      activeDetailRow = row;
      const cells = row.querySelectorAll('td');
      const locationBtn = row.querySelector('[data-action="view-vehicle-location"]');
      const rowDetailSnapshot = {
        vehicleId: cells[0]?.textContent?.trim() || '',
        driverName: cells[1]?.textContent?.trim() || '',
        contact: cells[2]?.textContent?.trim() || '',
        nominalEnergy: cells[3]?.textContent?.trim() || '',
        chargeStatus: cells[4]?.textContent?.trim() || '',
        status: cells[4]?.textContent?.trim() || '',
        dataStatus: cells[5]?.textContent?.trim() || '',
        address: locationBtn?.dataset.address || '',
        lng: locationBtn?.dataset.lng || '',
        lat: locationBtn?.dataset.lat || ''
      };
      const existingDetailData = getRowDetailData(row) || {};
      const detailData = createVehicleDetailData({
        ...rowDetailSnapshot,
        ...existingDetailData,
        driverName: rowDetailSnapshot.driverName || existingDetailData.driverName,
        contact: rowDetailSnapshot.contact || existingDetailData.contact,
        status: rowDetailSnapshot.status || existingDetailData.status
      });
      setRowDetailData(row, detailData);
      renderVehicleDetail(detailData);
      openModal('modal-vehicle-detail');
    };

    const openVehicleLocation = (payload) => {
      updateVehicleLocationModal(payload);
      openModal('modal-vehicle-location');

      loadAmapScript()
        .then((AMap) => {
          const center = [payload.lng, payload.lat];
          const mapHost = document.getElementById('vehicle-location-map');
          if (!mapHost) return;
          const markerHtml = `
            <div class="vehicle-amap-marker">
              <div class="vehicle-amap-marker-pulse"></div>
              <div class="vehicle-amap-marker-dot"></div>
            </div>
          `;
          const infoHtml = `
            <div class="vehicle-amap-card">
              <strong>${payload.vehicleId}</strong>
              <span>${payload.address}</span>
              <span>经纬度: ${payload.lat}, ${payload.lng}</span>
            </div>
          `;

          if (!vehicleMap) {
            vehicleMap = new AMap.Map(mapHost, {
              zoom: 14,
              center,
              resizeEnable: true,
              viewMode: '2D'
            });
            vehicleMarker = new AMap.Marker({
              position: center,
              anchor: 'center',
              content: markerHtml,
              bubble: true
            });
            vehicleInfoWindow = new AMap.InfoWindow({
              isCustom: true,
              offset: new AMap.Pixel(0, -30)
            });
            vehicleMarker.on('click', () => {
              if (!vehicleInfoWindow) return;
              const currentInfoHtml = vehicleMarker.getExtData()?.infoHtml || '';
              vehicleInfoWindow.setContent(currentInfoHtml);
              vehicleInfoWindow.open(vehicleMap, vehicleMarker.getPosition());
            });
            vehicleMap.add(vehicleMarker);
          } else {
            vehicleMap.setZoomAndCenter(14, center);
            vehicleMarker.setPosition(center);
          }

          vehicleMarker.setExtData({ infoHtml });
          if (vehicleInfoWindow) {
            vehicleInfoWindow.setContent(infoHtml);
            vehicleInfoWindow.open(vehicleMap, center);
          }

          window.requestAnimationFrame(() => {
            vehicleMap.resize();
            vehicleMap.setFitView([vehicleMarker], false, [80, 80, 80, 80]);
          });
        })
        .catch(() => {});
    };

    const fieldValue = (name) => {
      const input = form.querySelector(`[data-field="${name}"]`);
      return input ? input.value.trim() : '';
    };

    const clearForm = () => {
      form.querySelectorAll('input').forEach((input) => {
        input.value = '';
      });
    };

    const resetForCreate = () => {
      clearForm();
    };

    const buildRow = (data) => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td>${data.vehicleId}</td>
        <td>${data.driverName}</td>
        <td>${data.contact}</td>
        <td>${data.energyLeft}</td>
        <td>${data.chargeStatus}</td>
        <td>${data.dataStatus}</td>
        <td><button class="link-btn" data-action="view-vehicle-location" data-vehicle-id="${data.vehicleId}" data-address="${data.address}" data-lng="${data.lng}" data-lat="${data.lat}">查看</button></td>
        <td>
          <span class="action-space">
            <button class="link-btn" data-action="view-vehicle-detail" data-vehicle-id="${data.vehicleId}">详情</button>
            <button class="link-btn" data-action="view-battery-visual" data-vehicle-id="${data.vehicleId}">电池可视化</button>
            <button class="link-btn" data-action="delete-vehicle">删除</button>
          </span>
        </td>
      `;
      setRowDetailData(tr, createVehicleDetailData(data));
      return tr;
    };

    const serializeVehicleRow = (row) => {
      const cells = row.querySelectorAll('td');
      const locationBtn = row.querySelector('[data-action="view-vehicle-location"]');
      const detailData = getRowDetailData(row) || createVehicleDetailData({});
      return normalizeVehicleRecord({
        vehicleId: cells[0]?.textContent?.trim() || '',
        driverName: cells[1]?.textContent?.trim() || '',
        contact: cells[2]?.textContent?.trim() || '',
        energyLeft: cells[3]?.textContent?.trim() || '',
        chargeStatus: cells[4]?.textContent?.trim() || '',
        dataStatus: cells[5]?.textContent?.trim() || '',
        address: locationBtn?.dataset.address || detailData.address || '',
        lng: locationBtn?.dataset.lng || detailData.lng || '',
        lat: locationBtn?.dataset.lat || detailData.lat || '',
        serialNo: detailData.serialNo,
        batteryType: detailData.batteryType,
        capacity: detailData.capacity,
        voltageRange: detailData.voltageRange,
        nominalEnergy: detailData.nominalEnergy,
        maxCurrent: detailData.maxCurrent,
        pcsPower: detailData.pcsPower,
        ratedPower: detailData.ratedPower,
        cooling: detailData.cooling,
        protection: detailData.protection,
        size: detailData.size,
        weight: detailData.weight,
        productionDate: detailData.productionDate,
        manufacturer: detailData.manufacturer,
        company: detailData.company,
        totalCharge: detailData.totalCharge,
        totalDischarge: detailData.totalDischarge,
        totalChargeCount: detailData.totalChargeCount,
        totalDischargeCount: detailData.totalDischargeCount,
        totalPower: detailData.totalPower
      });
    };

    const syncVehicleCatalogFromTable = () => {
      const records = Array.from(tbody.querySelectorAll('tr')).map(serializeVehicleRow);
      vehicleCatalogAPI.replaceAll(records);
    };

    const seedVehicleRowsFromCatalog = () => {
      const catalog = vehicleCatalogAPI.reloadFromStorage();
      if (!Array.isArray(catalog)) return;
      tbody.innerHTML = '';
      catalog.forEach((record, index) => {
        const normalized = normalizeVehicleRecord(record);
        const synthetic = buildSyntheticVehicleDetail(normalized, index);
        const mergedVehicleData = {
          vehicleId: pickFilled(normalized.vehicleId, `未命名-${index + 1}`),
          driverName: pickFilled(normalized.driverName, '—'),
          contact: pickFilled(normalized.contact, '—'),
          energyLeft: pickFilled(normalized.energyLeft, pickFilled(normalized.nominalEnergy, synthetic.nominalEnergy)),
          chargeStatus: pickFilled(normalized.chargeStatus, synthetic.status),
          status: pickFilled(normalized.chargeStatus, synthetic.status),
          dataStatus: pickFilled(normalized.dataStatus, '正常'),
          serialNo: pickFilled(normalized.serialNo, synthetic.serialNo),
          batteryType: pickFilled(normalized.batteryType, synthetic.batteryType),
          lng: pickFilled(normalized.lng, synthetic.lng),
          lat: pickFilled(normalized.lat, synthetic.lat),
          capacity: pickFilled(normalized.capacity, synthetic.capacity),
          voltageRange: pickFilled(normalized.voltageRange, synthetic.voltageRange),
          nominalEnergy: pickFilled(normalized.nominalEnergy, synthetic.nominalEnergy),
          maxCurrent: pickFilled(normalized.maxCurrent, synthetic.maxCurrent),
          pcsPower: pickFilled(normalized.pcsPower, synthetic.pcsPower),
          ratedPower: pickFilled(normalized.ratedPower, synthetic.ratedPower),
          cooling: pickFilled(normalized.cooling, synthetic.cooling),
          protection: pickFilled(normalized.protection, synthetic.protection),
          size: pickFilled(normalized.size, synthetic.size),
          weight: pickFilled(normalized.weight, synthetic.weight),
          productionDate: pickFilled(normalized.productionDate, synthetic.productionDate),
          manufacturer: pickFilled(normalized.manufacturer, synthetic.manufacturer),
          company: pickFilled(normalized.company, synthetic.company),
          totalCharge: pickFilled(normalized.totalCharge, synthetic.totalCharge),
          totalDischarge: pickFilled(normalized.totalDischarge, synthetic.totalDischarge),
          totalChargeCount: pickFilled(normalized.totalChargeCount, synthetic.totalChargeCount),
          totalDischargeCount: pickFilled(normalized.totalDischargeCount, synthetic.totalDischargeCount),
          totalPower: pickFilled(normalized.totalPower, synthetic.totalPower),
          address: pickFilled(normalized.address, synthetic.address)
        };
        const vehicleData = {
          ...mergedVehicleData
        };
        tbody.appendChild(buildRow(vehicleData));
      });
    };

    document.addEventListener('click', (event) => {
      const addBtn = event.target.closest('[data-action="add-vehicle"]');
      if (addBtn) {
        const vehicleId = fieldValue('vehicleId') || '未命名';
        const driverName = fieldValue('driverName') || '—';
        const contact = fieldValue('contact') || '—';
        const nominalEnergy = fieldValue('nominalEnergy');
        const energyLeft = nominalEnergy ? nominalEnergy : '0.00';
        const newVehicle = {
          vehicleId,
          driverName,
          contact,
          energyLeft,
          serialNo: fieldValue('serialNo'),
          batteryType: fieldValue('batteryType'),
          capacity: fieldValue('capacity'),
          voltageRange: fieldValue('voltageRange'),
          nominalEnergy,
          maxCurrent: fieldValue('maxCurrent'),
          pcsPower: fieldValue('pcsPower'),
          ratedPower: fieldValue('pcsPower'),
          cooling: fieldValue('cooling'),
          protection: fieldValue('protection'),
          size: fieldValue('size'),
          weight: fieldValue('weight'),
          productionDate: fieldValue('productionDate'),
          manufacturer: fieldValue('manufacturer'),
          company: fieldValue('company'),
          address: '未设置位置',
          lng: '116.407394',
          lat: '39.904211',
          chargeStatus: '待机',
          status: '待机',
          dataStatus: '正常',
          totalCharge: '0',
          totalDischarge: '0',
          totalChargeCount: '0',
          totalDischargeCount: '0',
          totalPower: '0'
        };
        const newRow = buildRow(newVehicle);
        tbody.appendChild(newRow);
        clearForm();
        applyVehicleFilters();
        syncVehicleCatalogFromTable();
        showToast('已新增');
        const modal = addBtn.closest('.modal-backdrop');
        closeModal(modal);
        return;
      }

      const searchVehicleBtn = event.target.closest('[data-action="search-vehicle"]');
      if (searchVehicleBtn) {
        applyVehicleFilters();
        showToast('已搜索');
        return;
      }

      const resetVehicleFilterBtn = event.target.closest('[data-action="reset-vehicle-filter"]');
      if (resetVehicleFilterBtn) {
        resetVehicleFilters();
        showToast('已重置');
        return;
      }

      const viewLocationBtn = event.target.closest('[data-action="view-vehicle-location"]');
      if (viewLocationBtn) {
        const lng = Number(viewLocationBtn.dataset.lng);
        const lat = Number(viewLocationBtn.dataset.lat);
        openVehicleLocation({
          vehicleId: viewLocationBtn.dataset.vehicleId || '未命名车辆',
          address: viewLocationBtn.dataset.address || '未设置位置',
          lng: Number.isFinite(lng) ? lng : 116.407394,
          lat: Number.isFinite(lat) ? lat : 39.904211
        });
        return;
      }

      const viewBatteryVisualBtn = event.target.closest('[data-action="view-battery-visual"]');
      if (viewBatteryVisualBtn) {
        renderBatteryVisual(viewBatteryVisualBtn.dataset.vehicleId || '');
        openModal('modal-battery-visual');
        return;
      }

      const viewVehicleDetailBtn = event.target.closest('[data-action="view-vehicle-detail"]');
      if (viewVehicleDetailBtn) {
        openVehicleDetail(viewVehicleDetailBtn.closest('tr'));
        return;
      }

      const saveVehicleDetailBtn = event.target.closest('[data-action="save-vehicle-detail"]');
      if (saveVehicleDetailBtn) {
        if (activeDetailRow) {
          const cells = activeDetailRow.querySelectorAll('td');
          const detailData = getRowDetailData(activeDetailRow) || createVehicleDetailData({});
          if (cells[1] && detailDriverNameInput) {
            detailData.driverName = detailDriverNameInput.value.trim() || '—';
            cells[1].textContent = detailData.driverName;
          }
          if (cells[2] && detailContactInput) {
            detailData.contact = detailContactInput.value.trim() || '—';
            cells[2].textContent = detailData.contact;
          }
          setRowDetailData(activeDetailRow, detailData);
          syncVehicleCatalogFromTable();
        }
        showToast('已更新');
        closeModal(saveVehicleDetailBtn.closest('.modal-backdrop'));
        return;
      }

      const deleteBtn = event.target.closest('[data-action="delete-vehicle"]');
      if (deleteBtn) {
        pendingDeleteRow = deleteBtn.closest('tr');
        openModal('modal-confirm-delete');
        return;
      }

      const confirmBtn = event.target.closest('[data-action="confirm-delete"]');
      if (confirmBtn && pendingDeleteRow) {
        pendingDeleteRow.remove();
        pendingDeleteRow = null;
        applyVehicleFilters();
        syncVehicleCatalogFromTable();
        showToast('已删除');
        const modal = confirmBtn.closest('.modal-backdrop');
        closeModal(modal);
      }
    });

    if (confirmModal) {
      confirmModal.addEventListener('click', (event) => {
        if (event.target === confirmModal) {
          pendingDeleteRow = null;
        }
      });
    }

    if (modal) {
      modal.addEventListener('click', (event) => {
        const closeBtn = event.target.closest('[data-close]');
        if (closeBtn) {
          resetForCreate();
          return;
        }
        if (event.target === modal) {
          resetForCreate();
        }
      });
    }

    if (detailModal) {
      detailModal.addEventListener('click', (event) => {
        if (event.target === detailModal) {
          activeDetailRow = null;
        }
      });
    }

    seedVehicleRowsFromCatalog();
    hydrateExistingVehicleRows();
    applyVehicleFilters();
    syncVehicleCatalogFromTable();
    const firstVehicle = vehicleCatalogAPI.getAll()[0];
    renderBatteryVisual(firstVehicle ? firstVehicle.vehicleId : '');
  };

  const setupWorkorderList = () => {
    if (document.body.dataset.page !== 'mobile-workorder-list') return;
    const table = document.querySelector('[data-workorder-table]');
    const tbody = table ? table.querySelector('tbody') : null;
    const modal = document.getElementById('modal-new-work');
    const form = document.querySelector('[data-workorder-form]');
    const modalTitle = modal ? modal.querySelector('[data-workorder-modal-title]') : null;
    const submitLabel = modal ? modal.querySelector('[data-workorder-submit-label]') : null;
    const confirmModal = document.getElementById('modal-confirm-cancel-workorder');
    if (!table || !tbody || !modal || !form || !modalTitle || !submitLabel) return;

    let editingRow = null;
    let pendingCancelRow = null;
    let isReadonlyMode = false;
    const workorderFilterController = buildTableFilterController({
      tableSelector: '[data-workorder-table]',
      filters: [
        { name: 'company', selector: '[data-filter-workorder-company]', parser: parseLower },
        { name: 'workorderId', selector: '[data-filter-workorder-id]', parser: parseLower },
        { name: 'status', selector: '[data-filter-workorder-status]', parser: parseTrim }
      ],
      matchRow: (row, values) => {
        const cells = row.querySelectorAll('td');
        const company = cells[1]?.textContent?.trim().toLowerCase() || '';
        const workorderId = cells[0]?.textContent?.trim().toLowerCase() || '';
        const status = cells[7]?.textContent?.trim() || '';
        const matchesCompany = !values.company || company.includes(values.company);
        const matchesWorkorderId = !values.workorderId || workorderId.includes(values.workorderId);
        const matchesStatus = !values.status || status === values.status;
        return matchesCompany && matchesWorkorderId && matchesStatus;
      },
      searchAction: 'search-workorder',
      resetAction: 'reset-workorder-filters'
    });

    const workorderIdInput = form.querySelector('[data-field="workorderId"]');
    const companyNameSelect = form.querySelector('[data-field="companyName"]');
    const companyTypeInput = form.querySelector('[data-field="companyType"]');
    const companyIdInput = form.querySelector('[data-field="companyId"]');
    const contactNameInput = form.querySelector('[data-field="contactName"]');
    const contactPhoneInput = form.querySelector('[data-field="contactPhone"]');
    const startTimeInput = form.querySelector('[data-field="startTime"]');
    const addressInput = form.querySelector('[data-field="address"]');
    const cancelReasonRow = form.querySelector('[data-workorder-cancel-reason-row]');
    const cancelReasonModalInput = confirmModal ? confirmModal.querySelector('[data-cancel-reason-input]') : null;
    const cancelReasonErrorNode = confirmModal ? confirmModal.querySelector('[data-cancel-reason-error]') : null;

    const fieldValue = (name) => {
      const input = form.querySelector(`[data-field="${name}"]`);
      return input ? input.value.trim() : '';
    };

    const setFieldValue = (name, value) => {
      const input = form.querySelector(`[data-field="${name}"]`);
      if (!input) return;
      input.value = value || '';
    };

    const setFormDisabled = (disabled) => {
      form.querySelectorAll('input, select, textarea').forEach((input) => {
        input.disabled = !!disabled;
      });
    };

    const clearCancelReasonValidation = () => {
      if (cancelReasonModalInput) {
        cancelReasonModalInput.classList.remove('is-invalid');
      }
      if (cancelReasonErrorNode) {
        cancelReasonErrorNode.style.display = 'none';
      }
    };

    const setCancelReasonInvalid = () => {
      if (cancelReasonModalInput) {
        cancelReasonModalInput.classList.add('is-invalid');
        cancelReasonModalInput.focus();
      }
      if (cancelReasonErrorNode) {
        cancelReasonErrorNode.style.display = '';
      }
    };

    const setCancelReasonVisibility = (statusText = '') => {
      if (!cancelReasonRow) return;
      const status = parseTrim(statusText);
      if (status === WORKORDER_STATUS.CANCELED) {
        cancelReasonRow.style.display = '';
        return;
      }
      cancelReasonRow.style.display = 'none';
      setFieldValue('cancelReason', '');
    };

    const setFormMode = (mode) => {
      submitLabel.disabled = false;
      if (mode === 'edit') {
        modalTitle.textContent = '修改工单';
        submitLabel.textContent = '保存';
        return;
      }
      modalTitle.textContent = '添加工单';
      submitLabel.textContent = '添加';
    };

    const setReadonlyDetailMode = (statusText = '') => {
      isReadonlyMode = true;
      setFormDisabled(true);
      modalTitle.textContent = '工单详情';
      submitLabel.textContent = '不可修改';
      submitLabel.disabled = true;
      setCancelReasonVisibility(statusText);
    };

    const setEditableMode = (mode) => {
      isReadonlyMode = false;
      setFormDisabled(false);
      setFormMode(mode);
      setCancelReasonVisibility('');
    };

    const getCompanyCatalogOptions = () => {
      const options = [];
      const companyMap = new Map();
      DEFAULT_PROJECT_CATALOG.forEach((project) => {
        const normalized = normalizeProjectRecord(project);
        if (!normalized.companyName || companyMap.has(normalized.companyName)) return;
        companyMap.set(normalized.companyName, normalized);
      });
      projectCatalogAPI.getAll().forEach((project) => {
        const normalized = normalizeProjectRecord(project);
        if (!normalized.companyName) return;
        companyMap.set(normalized.companyName, normalized);
      });
      companyMap.forEach((project) => options.push(project));
      return options;
    };

    const applyCompanyPreset = (companyName, fallbackValues = null) => {
      const normalizedName = parseTrim(companyName);
      if (!normalizedName) {
        if (companyTypeInput) companyTypeInput.value = '';
        if (companyIdInput) companyIdInput.value = '';
        if (contactNameInput) contactNameInput.value = '';
        if (contactPhoneInput) contactPhoneInput.value = '';
        if (addressInput) addressInput.value = '';
        return;
      }
      const fallbackProject = DEFAULT_PROJECT_CATALOG.find((item) => item.companyName === normalizedName) || null;
      const project = projectCatalogAPI.findByName(normalizedName) || fallbackProject;
      const companyType = project ? parseTrim(project.companyType) : parseTrim(fallbackValues?.companyType);
      const creditCode = project ? parseTrim(project.creditCode) : parseTrim(fallbackValues?.companyId);
      const contactName = project ? parseTrim(project.contactName) : parseTrim(fallbackValues?.contactName);
      const contactPhone = project ? parseTrim(project.contactPhone) : parseTrim(fallbackValues?.contactPhone);
      const address = project ? parseTrim(project.address) : parseTrim(fallbackValues?.address);
      if (companyTypeInput) companyTypeInput.value = companyType || '';
      if (companyIdInput) companyIdInput.value = creditCode || '';
      if (contactNameInput) contactNameInput.value = contactName || '';
      if (contactPhoneInput) contactPhoneInput.value = contactPhone || '';
      if (addressInput) addressInput.value = address || '';
    };

    const ensureCompanySelected = (companyName) => {
      if (!companyNameSelect) return;
      const normalizedName = parseTrim(companyName);
      if (!normalizedName) return;
      const option = Array.from(companyNameSelect.options).find((item) => parseTrim(item.value) === normalizedName);
      if (option) {
        companyNameSelect.value = option.value;
      }
    };

    const renderCompanySelectOptions = () => {
      if (!companyNameSelect) return;
      const options = getCompanyCatalogOptions();
      const currentValue = parseTrim(companyNameSelect.value);
      if (!options.length) return;
      companyNameSelect.innerHTML = options
        .map((project) => `<option value="${project.companyName}">${project.companyName}</option>`)
        .join('');
      const hasCurrent = options.some((project) => project.companyName === currentValue);
      companyNameSelect.value = hasCurrent ? currentValue : options[0].companyName;
      ensureCompanySelected(companyNameSelect.value);
      applyCompanyPreset(companyNameSelect.value);
    };

    const ensureCompanyOption = (companyName) => {
      if (!companyNameSelect) return;
      const normalizedName = parseTrim(companyName);
      if (!normalizedName) return;
      const hasOption = Array.from(companyNameSelect.options)
        .some((option) => parseTrim(option.value) === normalizedName);
      if (hasOption) return;
      const option = document.createElement('option');
      option.value = normalizedName;
      option.textContent = normalizedName;
      companyNameSelect.appendChild(option);
    };

    const populateFormFromRow = (row) => {
      if (!row) return;
      const cells = row.querySelectorAll('td');
      const companyName = cells[1]?.textContent?.trim() || '';
      const orderType = normalizeWorkorderType(cells[4]?.textContent?.trim() || '');
      ensureCompanyOption(companyName);
      setFieldValue('workorderId', cells[0]?.textContent?.trim() || defaultWorkorderId());
      setFieldValue('orderType', orderType);
      setFieldValue('companyName', companyName);
      ensureCompanySelected(companyName);
      applyCompanyPreset(companyName, {
        companyType: row.dataset.companyType || '',
        companyId: row.dataset.companyId || '',
        contactName: cells[2]?.textContent?.trim() || '',
        contactPhone: cells[3]?.textContent?.trim() || '',
        address: cells[5]?.textContent?.trim() || ''
      });
      setFieldValue('energyDemand', row.dataset.energyDemand || '');
      setFieldValue('requiredPower', row.dataset.requiredPower || '');
      setFieldValue('startTime', row.dataset.startTime || '');
      setFieldValue('note', row.dataset.note || '');
      setFieldValue('cancelReason', row.dataset.cancelReason || '');
    };

    const defaultWorkorderId = () => `#${Date.now().toString().slice(-7)}`;
    const resetWorkorderFields = () => {
      if (workorderIdInput) workorderIdInput.value = defaultWorkorderId();
      if (companyNameSelect && companyNameSelect.options.length > 0) {
        companyNameSelect.selectedIndex = 0;
      }
      ensureCompanySelected(fieldValue('companyName'));
      applyCompanyPreset(fieldValue('companyName'));
    };

    const clearForm = () => {
      form.querySelectorAll('input, select, textarea').forEach((input) => {
        if (input.tagName === 'SELECT') {
          input.selectedIndex = 0;
        } else {
          input.value = '';
        }
      });
      resetWorkorderFields();
    };

    const resetForCreate = () => {
      editingRow = null;
      clearForm();
      setEditableMode('create');
    };

    const getWorkorderActionMarkup = (statusText = '') => {
      const status = parseTrim(statusText) || WORKORDER_STATUS.PENDING;
      if (status === WORKORDER_STATUS.PENDING) {
        return `
          <span class="action-space">
            <button class="link-btn" data-action="view-workorder-detail">修改</button>
            <button class="link-btn" data-action="cancel-workorder">取消</button>
          </span>
        `;
      }
      return '<button class="link-btn" data-action="view-workorder-detail">详情</button>';
    };

    const getWorkorderStatusMarkup = (statusText = '') => {
      const status = parseTrim(statusText) || WORKORDER_STATUS.PENDING;
      if (status === WORKORDER_STATUS.CANCELED) {
        return '<span class="workorder-status-canceled">已取消</span>';
      }
      return status;
    };

    const renderWorkorderStatusCell = (row, statusText = '') => {
      if (!row) return;
      const cells = row.querySelectorAll('td');
      const statusCell = cells[7];
      if (!statusCell) return;
      statusCell.innerHTML = getWorkorderStatusMarkup(statusText || statusCell.textContent || '');
    };

    const renderWorkorderActionCell = (row, statusText = '') => {
      if (!row) return;
      const cells = row.querySelectorAll('td');
      const actionCell = cells[8];
      if (!actionCell) return;
      actionCell.innerHTML = getWorkorderActionMarkup(statusText || cells[7]?.textContent?.trim() || '');
    };

    const buildRow = (data) => {
      const orderTypeText = normalizeWorkorderType(`${data.orderType || ''}`.replace(/<[^>]+>/g, '').trim());
      const orderTypeMarkup = `<span style="color:#2f6cf6;">${orderTypeText}</span>`;
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td>${data.workorderId}</td>
        <td>${data.companyName}</td>
        <td>${data.contactName}</td>
        <td>${data.contactPhone}</td>
        <td>${orderTypeMarkup}</td>
        <td>${data.address}</td>
        <td>${data.createdAt}</td>
        <td>${getWorkorderStatusMarkup(data.status)}</td>
        <td>${getWorkorderActionMarkup(data.status)}</td>
      `;
      tr.dataset.companyId = data.companyId || '';
      tr.dataset.companyType = data.companyType || '';
      tr.dataset.energyDemand = data.energyDemand || '';
      tr.dataset.requiredPower = data.requiredPower || '';
      tr.dataset.startTime = data.startTime || '';
      tr.dataset.note = data.note || '';
      tr.dataset.cancelReason = data.cancelReason || '';
      return tr;
    };

    const updateRow = (row, data) => {
      const cells = row.querySelectorAll('td');
      const orderTypeText = normalizeWorkorderType(data.orderType);
      if (cells[0]) cells[0].textContent = data.workorderId;
      if (cells[1]) cells[1].textContent = data.companyName;
      if (cells[2]) cells[2].textContent = data.contactName;
      if (cells[3]) cells[3].textContent = data.contactPhone;
      if (cells[4]) cells[4].innerHTML = `<span style="color:#2f6cf6;">${orderTypeText}</span>`;
      if (cells[5]) cells[5].textContent = data.address;
      if (cells[6]) cells[6].textContent = data.createdAt;
      renderWorkorderStatusCell(row, data.status);
      renderWorkorderActionCell(row, data.status);
      row.dataset.companyId = data.companyId || '';
      row.dataset.companyType = data.companyType || '';
      row.dataset.energyDemand = data.energyDemand || '';
      row.dataset.requiredPower = data.requiredPower || '';
      row.dataset.startTime = data.startTime || '';
      row.dataset.endTime = data.endTime || '';
      row.dataset.note = data.note || '';
      row.dataset.cancelReason = data.cancelReason || '';
    };

    const hydrateExistingRows = () => {
      tbody.querySelectorAll('tr').forEach((row) => {
        const actionCell = row.querySelector('td:last-child');
        if (actionCell) {
          const buttons = Array.from(actionCell.querySelectorAll('button.link-btn'));
          buttons.forEach((button) => {
            const label = button.textContent.trim();
            if (button.dataset.action === 'delete-workorder') {
              button.dataset.action = 'cancel-workorder';
              return;
            }
            if (button.dataset.action) return;
            if (label === '详情' || label === '修改') {
              button.dataset.action = 'view-workorder-detail';
              return;
            }
            if (label === '取消' || label === '删除') {
              button.dataset.action = 'cancel-workorder';
            }
          });
        }

        const cells = row.querySelectorAll('td');
        const companyName = cells[1]?.textContent?.trim() || '';
        const project = projectCatalogAPI.findByName(companyName);
        if (project && !row.dataset.companyId) {
          row.dataset.companyId = project.creditCode || '';
        }
        if (project && !row.dataset.companyType) {
          row.dataset.companyType = project.companyType || '';
        }
        const resolvedStatus = resolveWorkorderStatusFromDispatch({
          workorderId: cells[0]?.textContent?.trim() || '',
          status: cells[7]?.textContent?.trim() || ''
        });
        renderWorkorderStatusCell(row, resolvedStatus);
        renderWorkorderActionCell(row, resolvedStatus);
      });
    };

    const serializeWorkorderRow = (row) => {
      const cells = row.querySelectorAll('td');
      return {
        workorderId: cells[0]?.textContent?.trim() || '',
        companyName: cells[1]?.textContent?.trim() || '',
        contactName: cells[2]?.textContent?.trim() || '',
        contactPhone: cells[3]?.textContent?.trim() || '',
        orderType: cells[4]?.textContent?.trim() || '',
        address: cells[5]?.textContent?.trim() || '',
        createdAt: cells[6]?.textContent?.trim() || '',
        status: cells[7]?.textContent?.trim() || '',
        companyId: row.dataset.companyId || '',
        companyType: row.dataset.companyType || '',
        energyDemand: row.dataset.energyDemand || '',
        requiredPower: row.dataset.requiredPower || '',
        startTime: row.dataset.startTime || '',
        note: row.dataset.note || '',
        cancelReason: row.dataset.cancelReason || ''
      };
    };

    const syncWorkorderCatalogFromTable = () => {
      const records = Array.from(tbody.querySelectorAll('tr'))
        .map(serializeWorkorderRow)
        .map((record) => ({
          ...record,
          status: resolveWorkorderStatusFromDispatch(record)
        }));
      workorderCatalogAPI.replaceAll(records);
    };

    const seedWorkorderRowsFromCatalog = () => {
      const catalog = syncWorkorderStatusFromDispatch();
      if (!Array.isArray(catalog)) return;
      tbody.innerHTML = '';
      catalog.forEach((record) => {
        const normalized = normalizeWorkorderRecord(record);
        const rowData = {
          workorderId: normalized.workorderId || defaultWorkorderId(),
          companyName: normalized.companyName || '未填写',
          contactName: normalized.contactName || '—',
          contactPhone: normalized.contactPhone || '—',
          orderType: normalized.orderType || '供电',
          address: normalized.address || '—',
          createdAt: normalized.createdAt || formatDateTime(),
          status: resolveWorkorderStatusFromDispatch(normalized),
          companyId: normalized.companyId || '',
          companyType: normalized.companyType || '',
          energyDemand: normalized.energyDemand || '',
          requiredPower: normalized.requiredPower || '',
          startTime: normalized.startTime || '',
          note: normalized.note || '',
          cancelReason: normalized.cancelReason || ''
        };
        tbody.appendChild(buildRow(rowData));
      });
    };

    document.addEventListener('click', (event) => {
      const newBtn = event.target.closest('[data-action="new-workorder"]');
      if (newBtn) {
        resetForCreate();
        openModal('modal-new-work');
        return;
      }

      const addBtn = event.target.closest('[data-action="add-workorder"]');
      if (addBtn) {
        if (isReadonlyMode) {
          return;
        }
        const existingCells = editingRow ? editingRow.querySelectorAll('td') : null;
        const existingCreatedAt = existingCells && existingCells[6] ? existingCells[6].textContent.trim() : '';
        const existingStatus = existingCells && existingCells[7] ? existingCells[7].textContent.trim() : '';
        const workorderId = editingRow
          ? (existingCells && existingCells[0] ? existingCells[0].textContent.trim() : fieldValue('workorderId'))
          : defaultWorkorderId();
        const companyName = fieldValue('companyName') || '未填写';
        const contactName = fieldValue('contactName') || '—';
        const contactPhone = fieldValue('contactPhone') || '—';
        const orderType = normalizeWorkorderType(fieldValue('orderType'));
        const address = fieldValue('address') || '—';
        const resolvedStatus = resolveWorkorderStatusFromDispatch({
          workorderId,
          status: existingStatus
        });
        const rowData = {
          workorderId,
          companyName,
          contactName,
          contactPhone,
          orderType,
          address,
          createdAt: existingCreatedAt || formatDateTime(),
          status: resolvedStatus,
          companyId: fieldValue('companyId'),
          companyType: fieldValue('companyType'),
          energyDemand: fieldValue('energyDemand'),
          requiredPower: fieldValue('requiredPower'),
          startTime: fieldValue('startTime'),
          note: fieldValue('note'),
          cancelReason: editingRow ? (editingRow.dataset.cancelReason || '') : ''
        };
        if (editingRow) {
          updateRow(editingRow, rowData);
          showToast('已保存');
        } else {
          const newRow = buildRow(rowData);
          tbody.appendChild(newRow);
          showToast('已新增');
        }
        workorderFilterController?.applyFilters();
        syncWorkorderCatalogFromTable();
        resetForCreate();
        const modal = addBtn.closest('.modal-backdrop');
        closeModal(modal);
        return;
      }

      const detailBtn = event.target.closest('[data-action="view-workorder-detail"]');
      if (detailBtn && detailBtn.closest('[data-workorder-table]')) {
        const row = detailBtn.closest('tr');
        if (!row) return;
        const statusText = row.querySelectorAll('td')[7]?.textContent?.trim() || '';
        editingRow = row;
        populateFormFromRow(row);
        if (statusText === WORKORDER_STATUS.DISPATCHED || statusText === WORKORDER_STATUS.CANCELED) {
          if (statusText === WORKORDER_STATUS.CANCELED && !fieldValue('cancelReason')) {
            setFieldValue('cancelReason', '—');
          }
          setReadonlyDetailMode(statusText);
        } else {
          setEditableMode('edit');
        }
        openModal('modal-new-work');
        return;
      }

      const cancelBtn = event.target.closest('[data-action="cancel-workorder"]');
      if (cancelBtn && cancelBtn.closest('[data-workorder-table]')) {
        pendingCancelRow = cancelBtn.closest('tr');
        if (cancelReasonModalInput) {
          cancelReasonModalInput.value = '';
        }
        clearCancelReasonValidation();
        openModal('modal-confirm-cancel-workorder');
        return;
      }

      const confirmBtn = event.target.closest('[data-action="confirm-cancel-workorder"]');
      if (confirmBtn && pendingCancelRow) {
        const cancelReason = parseTrim(cancelReasonModalInput ? cancelReasonModalInput.value : '');
        if (!cancelReason) {
          showToast('请输入取消原因');
          setCancelReasonInvalid();
          return;
        }
        clearCancelReasonValidation();
        pendingCancelRow.dataset.cancelReason = cancelReason;
        renderWorkorderStatusCell(pendingCancelRow, '已取消');
        renderWorkorderActionCell(pendingCancelRow, '已取消');
        pendingCancelRow = null;
        if (cancelReasonModalInput) {
          cancelReasonModalInput.value = '';
        }
        workorderFilterController?.applyFilters();
        syncWorkorderCatalogFromTable();
        showToast('已取消');
        const modal = confirmBtn.closest('.modal-backdrop');
        closeModal(modal);
      }
    });

    if (confirmModal) {
      confirmModal.addEventListener('click', (event) => {
        if (event.target === confirmModal || event.target.closest('[data-close]')) {
          pendingCancelRow = null;
          if (cancelReasonModalInput) {
            cancelReasonModalInput.value = '';
          }
          clearCancelReasonValidation();
          closeModal(confirmModal);
        }
      });
    }

    if (cancelReasonModalInput) {
      cancelReasonModalInput.addEventListener('input', () => {
        if (parseTrim(cancelReasonModalInput.value)) {
          clearCancelReasonValidation();
        }
      });
    }

    if (companyNameSelect) {
      companyNameSelect.addEventListener('change', () => {
        ensureCompanySelected(companyNameSelect.value);
        applyCompanyPreset(companyNameSelect.value);
      });
    }

    if (startTimeInput && typeof startTimeInput.showPicker === 'function') {
      const openStartDatePicker = () => {
        try {
          startTimeInput.showPicker();
        } catch (error) {}
      };
      startTimeInput.addEventListener('pointerdown', openStartDatePicker);
      startTimeInput.addEventListener('focus', openStartDatePicker);
      startTimeInput.addEventListener('click', openStartDatePicker);
    }

    renderCompanySelectOptions();
    seedWorkorderRowsFromCatalog();
    hydrateExistingRows();
    syncWorkorderCatalogFromTable();
    resetForCreate();
  };

  const setupDispatchList = () => {
    if (document.body.dataset.page !== 'mobile-dispatch-list') return;
    const table = document.querySelector('[data-dispatch-table]');
    const tbody = table ? table.querySelector('tbody') : null;
    const pendingCountNode = document.querySelector('[data-dispatch-pending-count]');
    const modal = document.getElementById('modal-dispatch-task');
    const form = modal ? modal.querySelector('[data-dispatch-form]') : null;
    const modalTitle = modal ? modal.querySelector('[data-dispatch-modal-title]') : null;
    const submitLabel = modal ? modal.querySelector('[data-dispatch-submit-label]') : null;
    const noPendingModalId = 'modal-dispatch-no-pending';
    const cancelConfirmModal = document.getElementById('modal-confirm-cancel-dispatch');
    if (!table || !tbody || !modal || !form || !modalTitle || !submitLabel) return;
    const cancelDispatchReasonInput = cancelConfirmModal
      ? cancelConfirmModal.querySelector('[data-cancel-dispatch-reason-input]')
      : null;
    const cancelDispatchReasonErrorNode = cancelConfirmModal
      ? cancelConfirmModal.querySelector('[data-cancel-dispatch-reason-error]')
      : null;
    const dispatchLocationModal = document.getElementById('modal-dispatch-vehicle-location');
    const dispatchDetailModal = document.getElementById('modal-dispatch-vehicle-detail');
    const dispatchLocationVehicleId = dispatchLocationModal ? dispatchLocationModal.querySelector('[data-dispatch-location-vehicle-id]') : null;
    const dispatchLocationAddress = dispatchLocationModal ? dispatchLocationModal.querySelector('[data-dispatch-location-address]') : null;
    const dispatchLocationCoords = dispatchLocationModal ? dispatchLocationModal.querySelector('[data-dispatch-location-coords]') : null;
    const dispatchDetailDriverNameInput = dispatchDetailModal ? dispatchDetailModal.querySelector('[data-dispatch-detail-driver-name]') : null;
    const dispatchDetailContactInput = dispatchDetailModal ? dispatchDetailModal.querySelector('[data-dispatch-detail-contact]') : null;

    const DISPATCH_STATUS = Object.freeze({
      IN_PROGRESS: '调度中',
      COMPLETED: '调度完成',
      FAILED: '调度失败',
      CANCELED: '已取消'
    });
    const DISPATCH_STATUS_SET = new Set(Object.values(DISPATCH_STATUS));
    const isDispatchStatus = (status) => DISPATCH_STATUS_SET.has(parseTrim(status));
    const normalizeDispatchStatus = (status, fallback = DISPATCH_STATUS.IN_PROGRESS) => {
      const value = parseTrim(status);
      if (DISPATCH_STATUS_SET.has(value)) return value;
      return fallback;
    };
    const isDispatchDetailOnlyStatus = (statusText = '') => {
      const status = normalizeDispatchStatus(statusText);
      return status === DISPATCH_STATUS.COMPLETED || status === DISPATCH_STATUS.CANCELED;
    };
    const getDispatchActionMarkup = (statusText = '') => {
      if (isDispatchDetailOnlyStatus(statusText)) {
        return '<button class="link-btn" data-action="view-dispatch-detail">详情</button>';
      }
      return '<span class="action-space"><button class="link-btn" data-action="edit-dispatch">修改</button><button class="link-btn" data-action="cancel-dispatch">取消</button></span>';
    };

    const getPendingWorkorderCount = () => workorderCatalogAPI.countPending();

    const renderPendingWorkorderCount = () => {
      if (!pendingCountNode) return;
      pendingCountNode.textContent = String(getPendingWorkorderCount());
    };

    const refreshPendingWorkorderCount = () => {
      syncWorkorderStatusFromDispatch();
      renderPendingWorkorderCount();
    };
    refreshPendingWorkorderCount();
    const pendingCountTimer = window.setInterval(() => {
      refreshPendingWorkorderCount();
      void applyExternalDispatchStatuses();
    }, 5000);
    window.addEventListener('beforeunload', () => {
      window.clearInterval(pendingCountTimer);
    }, { once: true });

    const workorderSelect = form.querySelector('[data-field="workorderId"]');
    const vehicleSelect = form.querySelector('[data-field="vehicleId"]');
    const failureRecordRow = form.querySelector('[data-dispatch-failure-record-row]');
    const failureRecordList = form.querySelector('[data-dispatch-failure-list]');
    let workorderOptions = [];
    let vehicleOptions = [];
    let editingRow = null;
    let pendingCancelRow = null;
    let isReadonlyMode = false;
    let dispatchStatusSyncing = false;
    let dispatchVehicleMap = null;
    let dispatchVehicleMarker = null;
    let dispatchVehicleInfoWindow = null;
    let dispatchAmapScriptPromise = null;

    const escapeHtml = (value) => `${value ?? ''}`
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');

    const normalizeFailureRecordsForView = (records, fallbackReason = '', fallbackAt = '') => (
      normalizeDispatchFailureRecords(records, fallbackReason, fallbackAt)
    );

    const setFailureRecordVisibility = (records = [], fallbackReason = '', fallbackAt = '') => {
      if (!failureRecordRow || !failureRecordList) return;
      const normalizedRecords = normalizeFailureRecordsForView(records, fallbackReason, fallbackAt);
      if (!normalizedRecords.length) {
        failureRecordList.innerHTML = '<div class="dispatch-failure-empty">暂无失败记录</div>';
        failureRecordRow.style.display = 'none';
        return;
      }
      failureRecordList.innerHTML = normalizedRecords
        .map((item, index) => `
          <div class="dispatch-failure-item">
            <span class="dispatch-failure-time">${escapeHtml(item.at || '时间未记录')}</span>
            <span class="dispatch-failure-text">${index + 1}. ${escapeHtml(item.reason)}</span>
          </div>
        `)
        .join('');
      failureRecordRow.style.display = '';
    };

    const dedupeBy = (items, keyOf) => {
      const map = new Map();
      items.forEach((item) => {
        const key = keyOf(item);
        if (!key || map.has(key)) return;
        map.set(key, item);
      });
      return Array.from(map.values());
    };

    const loadWorkorderOptions = (pendingOnly = false) => {
      syncWorkorderStatusFromDispatch();
      const linkedWorkorderIds = dispatchCatalogAPI.getLinkedWorkorderIds();
      const records = workorderCatalogAPI.getAll()
        .map(normalizeWorkorderRecord)
        .filter((item) => item.workorderId)
        .filter((item) => !pendingOnly || (item.status === WORKORDER_STATUS.PENDING && !linkedWorkorderIds.has(item.workorderId)));
      workorderOptions = dedupeBy(records, (item) => item.workorderId);
      return workorderOptions;
    };

    const loadVehicleOptions = () => {
      vehicleCatalogAPI.reloadFromStorage();
      const records = vehicleCatalogAPI.getAll()
        .map(normalizeVehicleRecord)
        .filter((item) => item.vehicleId);
      vehicleOptions = dedupeBy(records, (item) => item.vehicleId);
      return vehicleOptions;
    };

    const renderWorkorderOptions = (preferredWorkorderId = '', pendingOnly = false) => {
      const records = loadWorkorderOptions(pendingOnly);
      if (!workorderSelect) return '';
      if (!records.length) {
        if (preferredWorkorderId) {
          workorderSelect.innerHTML = `<option value="${preferredWorkorderId}">${preferredWorkorderId}</option>`;
          workorderSelect.value = preferredWorkorderId;
          return preferredWorkorderId;
        }
        workorderSelect.innerHTML = pendingOnly
          ? '<option value="">暂无待调度工单</option>'
          : '<option value="">暂无工单</option>';
        return '';
      }
      const optionsMarkup = records
        .map((item) => `<option value="${item.workorderId}">${item.workorderId}</option>`)
        .join('');
      const canUsePreferred = preferredWorkorderId && records.some((item) => item.workorderId === preferredWorkorderId);
      workorderSelect.innerHTML = canUsePreferred || !preferredWorkorderId
        ? optionsMarkup
        : `${optionsMarkup}<option value="${preferredWorkorderId}">${preferredWorkorderId}</option>`;
      const selected = preferredWorkorderId || records[0].workorderId;
      workorderSelect.value = selected;
      return selected;
    };

    const renderVehicleOptions = (preferredVehicleId = '') => {
      const records = loadVehicleOptions();
      if (!vehicleSelect) return '';
      if (!records.length) {
        if (preferredVehicleId) {
          vehicleSelect.innerHTML = `<option value="${preferredVehicleId}">${preferredVehicleId}</option>`;
          vehicleSelect.value = preferredVehicleId;
          return preferredVehicleId;
        }
        vehicleSelect.innerHTML = '<option value="">暂无车辆</option>';
        return '';
      }
      const optionsMarkup = records
        .map((item) => `<option value="${item.vehicleId}">${item.vehicleId}</option>`)
        .join('');
      const canUsePreferred = preferredVehicleId && records.some((item) => item.vehicleId === preferredVehicleId);
      vehicleSelect.innerHTML = canUsePreferred || !preferredVehicleId
        ? optionsMarkup
        : `${optionsMarkup}<option value="${preferredVehicleId}">${preferredVehicleId}</option>`;
      const selected = preferredVehicleId || records[0].vehicleId;
      vehicleSelect.value = selected;
      return selected;
    };

    const findWorkorder = (workorderId) => {
      if (!workorderId) return null;
      return workorderOptions.find((item) => item.workorderId === workorderId) || null;
    };

    const findVehicle = (vehicleId) => {
      if (!vehicleId) return null;
      return vehicleOptions.find((item) => item.vehicleId === vehicleId) || null;
    };

    const dispatchDetailBindings = {
      vehicleId: '[data-dispatch-detail-vehicle-id]',
      serialNo: '[data-dispatch-detail-serial-no]',
      batteryType: '[data-dispatch-detail-battery-type]',
      lng: '[data-dispatch-detail-lng]',
      capacity: '[data-dispatch-detail-capacity]',
      voltageRange: '[data-dispatch-detail-voltage-range]',
      nominalEnergy: '[data-dispatch-detail-nominal-energy]',
      lat: '[data-dispatch-detail-lat]',
      maxCurrent: '[data-dispatch-detail-max-current]',
      pcsPower: '[data-dispatch-detail-pcs-power]',
      ratedPower: '[data-dispatch-detail-rated-power]',
      cooling: '[data-dispatch-detail-cooling]',
      protection: '[data-dispatch-detail-protection]',
      size: '[data-dispatch-detail-size]',
      weight: '[data-dispatch-detail-weight]',
      productionDate: '[data-dispatch-detail-production-date]',
      manufacturer: '[data-dispatch-detail-manufacturer]',
      company: '[data-dispatch-detail-company]',
      status: '[data-dispatch-detail-status]',
      totalCharge: '[data-dispatch-detail-total-charge]',
      totalDischarge: '[data-dispatch-detail-total-discharge]',
      totalChargeCount: '[data-dispatch-detail-total-charge-count]',
      totalDischargeCount: '[data-dispatch-detail-total-discharge-count]',
      totalPower: '[data-dispatch-detail-total-power]'
    };

    const textOrFallback = (value, fallback = '—') => {
      const text = `${value ?? ''}`.trim();
      return text || fallback;
    };

    const createDispatchVehicleDetailData = (data) => ({
      vehicleId: textOrFallback(data.vehicleId),
      serialNo: textOrFallback(data.serialNo || data.vehicleId),
      batteryType: textOrFallback(data.batteryType, 'LFP'),
      lng: textOrFallback(data.lng, '116.407394'),
      capacity: textOrFallback(data.capacity, '628'),
      voltageRange: textOrFallback(data.voltageRange, '728~923'),
      nominalEnergy: textOrFallback(data.nominalEnergy || data.energyLeft, '0.00'),
      lat: textOrFallback(data.lat, '39.904211'),
      maxCurrent: textOrFallback(data.maxCurrent, '314'),
      pcsPower: textOrFallback(data.pcsPower, '250'),
      ratedPower: textOrFallback(data.ratedPower || data.pcsPower, '250'),
      cooling: textOrFallback(data.cooling, '液冷'),
      protection: textOrFallback(data.protection, 'IPX5'),
      size: textOrFallback(data.size, '3029*2438*2896mm'),
      weight: textOrFallback(data.weight, '6.8'),
      productionDate: textOrFallback(data.productionDate, '2025年10月'),
      manufacturer: textOrFallback(data.manufacturer, '山东天欣达能源科技有限公司'),
      company: textOrFallback(data.company, '南方电网'),
      status: textOrFallback(data.chargeStatus || data.status, '待机'),
      totalCharge: textOrFallback(data.totalCharge, '0'),
      totalDischarge: textOrFallback(data.totalDischarge, '0'),
      totalChargeCount: textOrFallback(data.totalChargeCount, '0'),
      totalDischargeCount: textOrFallback(data.totalDischargeCount, '0'),
      totalPower: textOrFallback(data.totalPower, '0'),
      driverName: textOrFallback(data.driverName),
      contact: textOrFallback(data.contact),
      address: textOrFallback(data.address, '未设置位置')
    });

    const resolveDispatchVehicleDetailData = (vehicleId) => {
      const targetId = parseTrim(vehicleId);
      if (!targetId) return null;
      loadVehicleOptions();
      const vehicle = findVehicle(targetId) || vehicleCatalogAPI.findById(targetId);
      if (!vehicle) return null;
      return createDispatchVehicleDetailData(normalizeVehicleRecord(vehicle));
    };

    const renderDispatchVehicleDetail = (detailData) => {
      if (!dispatchDetailModal || !detailData) return;
      Object.entries(dispatchDetailBindings).forEach(([key, selector]) => {
        const node = dispatchDetailModal.querySelector(selector);
        if (node) node.textContent = textOrFallback(detailData[key]);
      });
      if (dispatchDetailDriverNameInput) dispatchDetailDriverNameInput.value = textOrFallback(detailData.driverName);
      if (dispatchDetailContactInput) dispatchDetailContactInput.value = textOrFallback(detailData.contact);
    };

    const renderDispatchMapPlaceholder = (message) => {
      const mapHost = document.getElementById('dispatch-vehicle-location-map');
      if (!mapHost) return;
      mapHost.innerHTML = `<div class="map-placeholder">${message}</div>`;
    };

    const loadDispatchAmapScript = () => {
      if (window.AMap) return Promise.resolve(window.AMap);
      if (dispatchAmapScriptPromise) return dispatchAmapScriptPromise;

      const key = resolveAmapWebKey();
      if (!key) {
        renderDispatchMapPlaceholder('未配置高德地图 API Key');
        return Promise.reject(new Error('AMAP_WEB_KEY is missing'));
      }

      dispatchAmapScriptPromise = new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = `https://webapi.amap.com/maps?v=2.0&key=${encodeURIComponent(key)}`;
        script.async = true;
        script.onload = () => {
          if (window.AMap) {
            resolve(window.AMap);
            return;
          }
          reject(new Error('AMap failed to initialize'));
        };
        script.onerror = () => reject(new Error('AMap script failed to load'));
        document.head.appendChild(script);
      }).catch((error) => {
        renderDispatchMapPlaceholder('高德地图加载失败，请检查 API Key 或网络配置');
        throw error;
      });

      return dispatchAmapScriptPromise;
    };

    const openDispatchVehicleDetail = (vehicleId) => {
      if (!dispatchDetailModal) return;
      const detailData = resolveDispatchVehicleDetailData(vehicleId);
      if (!detailData) {
        showToast('未找到车辆详情');
        return;
      }
      renderDispatchVehicleDetail(detailData);
      openModal('modal-dispatch-vehicle-detail');
    };

    const openDispatchVehicleLocation = (vehicleId) => {
      if (!dispatchLocationModal) return;
      const detailData = resolveDispatchVehicleDetailData(vehicleId);
      if (!detailData) {
        showToast('未找到车辆位置');
        return;
      }

      const lng = Number.parseFloat(detailData.lng);
      const lat = Number.parseFloat(detailData.lat);
      const locationPayload = {
        vehicleId: detailData.vehicleId,
        address: detailData.address,
        lng: Number.isFinite(lng) ? lng : 116.407394,
        lat: Number.isFinite(lat) ? lat : 39.904211
      };

      if (dispatchLocationVehicleId) dispatchLocationVehicleId.textContent = locationPayload.vehicleId;
      if (dispatchLocationAddress) dispatchLocationAddress.textContent = locationPayload.address;
      if (dispatchLocationCoords) dispatchLocationCoords.textContent = `${locationPayload.lat}, ${locationPayload.lng}`;
      openModal('modal-dispatch-vehicle-location');

      loadDispatchAmapScript()
        .then((AMap) => {
          const center = [locationPayload.lng, locationPayload.lat];
          const mapHost = document.getElementById('dispatch-vehicle-location-map');
          if (!mapHost) return;
          const markerHtml = `
            <div class="vehicle-amap-marker">
              <div class="vehicle-amap-marker-pulse"></div>
              <div class="vehicle-amap-marker-dot"></div>
            </div>
          `;
          const infoHtml = `
            <div class="vehicle-amap-card">
              <strong>${locationPayload.vehicleId}</strong>
              <span>${locationPayload.address}</span>
              <span>经纬度: ${locationPayload.lat}, ${locationPayload.lng}</span>
            </div>
          `;

          if (!dispatchVehicleMap) {
            dispatchVehicleMap = new AMap.Map(mapHost, {
              zoom: 14,
              center,
              resizeEnable: true,
              viewMode: '2D'
            });
            dispatchVehicleMarker = new AMap.Marker({
              position: center,
              anchor: 'center',
              content: markerHtml,
              bubble: true
            });
            dispatchVehicleInfoWindow = new AMap.InfoWindow({
              isCustom: true,
              offset: new AMap.Pixel(0, -30)
            });
            dispatchVehicleMarker.on('click', () => {
              if (!dispatchVehicleInfoWindow) return;
              const currentInfoHtml = dispatchVehicleMarker.getExtData()?.infoHtml || '';
              dispatchVehicleInfoWindow.setContent(currentInfoHtml);
              dispatchVehicleInfoWindow.open(dispatchVehicleMap, dispatchVehicleMarker.getPosition());
            });
            dispatchVehicleMap.add(dispatchVehicleMarker);
          } else {
            dispatchVehicleMap.setZoomAndCenter(14, center);
            dispatchVehicleMarker.setPosition(center);
          }

          dispatchVehicleMarker.setExtData({ infoHtml });
          if (dispatchVehicleInfoWindow) {
            dispatchVehicleInfoWindow.setContent(infoHtml);
            dispatchVehicleInfoWindow.open(dispatchVehicleMap, center);
          }

          window.requestAnimationFrame(() => {
            dispatchVehicleMap.resize();
            dispatchVehicleMap.setFitView([dispatchVehicleMarker], false, [80, 80, 80, 80]);
          });
        })
        .catch(() => {});
    };

    const dispatchFilterController = buildTableFilterController({
      tableSelector: '[data-dispatch-table]',
      filters: [
        { name: 'company', selector: '[data-filter-dispatch-company]', parser: parseLower },
        { name: 'workorderId', selector: '[data-filter-dispatch-workorder]', parser: parseLower },
        { name: 'dispatchId', selector: '[data-filter-dispatch-id]', parser: parseLower },
        { name: 'status', selector: '[data-filter-dispatch-status]', parser: parseTrim }
      ],
      matchRow: (row, values) => {
        const cells = row.querySelectorAll('td');
        const company = cells[2]?.textContent?.trim().toLowerCase() || '';
        const dispatchId = cells[0]?.textContent?.trim().toLowerCase() || '';
        const workorderId = (row.dataset.workorderId || '').trim().toLowerCase();
        const status = cells[7]?.textContent?.trim() || '';
        const matchesCompany = !values.company || company.includes(values.company);
        const matchesWorkorderId = !values.workorderId || workorderId.includes(values.workorderId);
        const matchesDispatchId = !values.dispatchId || dispatchId.includes(values.dispatchId);
        const matchesStatus = !values.status || status === values.status;
        return matchesCompany && matchesWorkorderId && matchesDispatchId && matchesStatus;
      },
      searchAction: 'search-dispatch',
      resetAction: 'reset-dispatch-filters'
    });

    const fieldValue = (name) => {
      const input = form.querySelector(`[data-field="${name}"]`);
      return input ? input.value.trim() : '';
    };

    const setFieldValue = (name, value) => {
      const input = form.querySelector(`[data-field="${name}"]`);
      if (!input) return;
      input.value = value || '';
    };

    const getDispatchStatusResolver = () => {
      if (window.dispatchStatusHooks && typeof window.dispatchStatusHooks === 'object') {
        return window.dispatchStatusHooks;
      }
      const resolveStatuses = typeof window.resolveDispatchStatuses === 'function'
        ? window.resolveDispatchStatuses
        : null;
      const resolveStatus = typeof window.resolveDispatchStatus === 'function'
        ? window.resolveDispatchStatus
        : null;
      if (!resolveStatuses && !resolveStatus) return null;
      return { resolveStatuses, resolveStatus };
    };

    const createDispatchId = () => `#${Date.now().toString().slice(-8)}`;
    const orderTypeMarkup = (type) => `<span style="color:#2f6cf6;">${type || '供电'}</span>`;

    const seedDispatchPreviewRecordsOnce = () => {
      try {
        if (localStorage.getItem(DISPATCH_PREVIEW_ONE_TIME_SEED_KEY) === '1') {
          return false;
        }
      } catch (error) {
        console.warn('dispatch preview seed flag read failed', error);
      }

      const existingDispatches = dispatchCatalogAPI.reloadFromStorage()
        .map(normalizeDispatchCatalogRecord)
        .filter((item) => item.dispatchId);

      const workorders = workorderCatalogAPI.reloadFromStorage()
        .map(normalizeWorkorderRecord)
        .filter((item) => item.workorderId);
      const vehicles = vehicleCatalogAPI.reloadFromStorage()
        .map(normalizeVehicleRecord)
        .filter((item) => item.vehicleId);
      const linkedWorkorderIds = new Set(existingDispatches.map((item) => parseTrim(item.workorderId)).filter(Boolean));
      const availableWorkorders = workorders.filter((item) => !linkedWorkorderIds.has(item.workorderId));
      const fallbackWorkorders = [
        {
          workorderId: '#WO-DEMO-001',
          companyName: '广州城配电力服务有限公司',
          orderType: '供电',
          address: '广州市天河区科韵路 18 号',
          companyId: '91440101DEMO0001',
          contactName: '林峰',
          contactPhone: '13900020001',
          energyDemand: '680',
          requiredPower: '320',
          startTime: '2026-03-21',
          note: '夜间应急保供'
        },
        {
          workorderId: '#WO-DEMO-002',
          companyName: '珠江智造园区运营中心',
          orderType: '充电',
          address: '广州市黄埔区科学城开创大道 88 号',
          companyId: '91440101DEMO0002',
          contactName: '陈思',
          contactPhone: '13900020002',
          energyDemand: '520',
          requiredPower: '260',
          startTime: '2026-03-22',
          note: '园区设备保障'
        },
        {
          workorderId: '#WO-DEMO-003',
          companyName: '南沙港应急能源保障部',
          orderType: '供电',
          address: '广州市南沙区港前大道 6 号',
          companyId: '91440101DEMO0003',
          contactName: '高阳',
          contactPhone: '13900020003',
          energyDemand: '740',
          requiredPower: '350',
          startTime: '2026-03-23',
          note: '港区临时作业保障'
        },
        {
          workorderId: '#WO-DEMO-005',
          companyName: '番禺智能制造园运维中心',
          orderType: '供电',
          address: '广州市番禺区化龙镇金山大道 18 号',
          companyId: '91440101DEMO0005',
          contactName: '吴晨',
          contactPhone: '13900020005',
          energyDemand: '610',
          requiredPower: '300',
          startTime: '2026-03-24',
          note: '园区夜间保供'
        }
      ].map(normalizeWorkorderRecord);

      const resolveWorkorderByIndex = (index) => {
        if (availableWorkorders[index]) return availableWorkorders[index];
        if (workorders[index]) return workorders[index];
        return fallbackWorkorders[index] || fallbackWorkorders[fallbackWorkorders.length - 1];
      };
      const resolveVehicleByIndex = (index) => {
        if (!vehicles.length) return null;
        return vehicles[index % vehicles.length];
      };
      const statuses = [
        DISPATCH_STATUS.IN_PROGRESS,
        DISPATCH_STATUS.COMPLETED,
        DISPATCH_STATUS.FAILED,
        DISPATCH_STATUS.CANCELED
      ];
      const seedBaseTime = Date.now();
      const previewRecords = statuses.map((status, index) => {
        const selectedWorkorder = resolveWorkorderByIndex(index);
        const selectedVehicle = resolveVehicleByIndex(index);
        const dispatchId = `#${(seedBaseTime + index + 1).toString().slice(-8)}`;
        const failureRecords = status === DISPATCH_STATUS.FAILED
          ? [
              {
                at: formatDateTime(new Date(seedBaseTime - index * 3600 * 1000 - 25 * 60 * 1000)),
                reason: '现场接入点电压波动超限，首次派遣失败'
              },
              {
                at: formatDateTime(new Date(seedBaseTime - index * 3600 * 1000 - 12 * 60 * 1000)),
                reason: '二次尝试时客户侧开关状态异常，未满足并网条件'
              },
              {
                at: formatDateTime(new Date(seedBaseTime - index * 3600 * 1000)),
                reason: '已通知现场整改，等待重新调度'
              }
            ]
          : [];
        const cancelReason = status === DISPATCH_STATUS.CANCELED ? '客户临时取消用电计划，任务关闭' : '';
        return normalizeDispatchCatalogRecord({
          dispatchId,
          workorderId: selectedWorkorder.workorderId,
          companyName: selectedWorkorder.companyName || '未填写',
          orderType: normalizeWorkorderType(selectedWorkorder.orderType),
          address: selectedWorkorder.address || '—',
          createdAt: formatDateTime(new Date(seedBaseTime - index * 3600 * 1000)),
          vehicleId: selectedVehicle ? selectedVehicle.vehicleId : `储能车DEMO-${String(index + 1).padStart(3, '0')}`,
          status,
          companyId: selectedWorkorder.companyId || '',
          contactName: selectedWorkorder.contactName || '',
          contactPhone: selectedWorkorder.contactPhone || '',
          energyDemand: selectedWorkorder.energyDemand || '',
          requiredPower: selectedWorkorder.requiredPower || '',
          startTime: selectedWorkorder.startTime || '',
          note: selectedWorkorder.note || '',
          cancelReason,
          driverName: selectedVehicle ? selectedVehicle.driverName : `演示司机${index + 1}`,
          driverPhone: selectedVehicle ? selectedVehicle.contact : `1390002999${index + 1}`,
          failureRecords
        });
      });

      dispatchCatalogAPI.replaceAll([...existingDispatches, ...previewRecords]);
      try {
        localStorage.setItem(DISPATCH_PREVIEW_ONE_TIME_SEED_KEY, '1');
      } catch (error) {
        console.warn('dispatch preview seed flag save failed', error);
      }
      return true;
    };

    const seedFailureHistoryPreviewOnce = () => {
      try {
        if (localStorage.getItem(DISPATCH_FAILURE_HISTORY_ONE_TIME_SEED_KEY) === '1') {
          return false;
        }
      } catch (error) {
        console.warn('dispatch failure history seed flag read failed', error);
      }

      const records = dispatchCatalogAPI.reloadFromStorage()
        .map(normalizeDispatchCatalogRecord)
        .filter((item) => item.dispatchId);
      const failedIndex = records.findIndex((item) => normalizeDispatchStatus(item.status) === DISPATCH_STATUS.FAILED);
      if (failedIndex < 0) {
        try {
          localStorage.setItem(DISPATCH_FAILURE_HISTORY_ONE_TIME_SEED_KEY, '1');
        } catch (error) {
          console.warn('dispatch failure history seed flag save failed', error);
        }
        return false;
      }

      const failedRecord = records[failedIndex];
      const existingFailureRecords = normalizeDispatchFailureRecords(
        failedRecord.failureRecords,
        failedRecord.failureReason,
        failedRecord.failureAt
      );
      if (existingFailureRecords.length >= 3) {
        try {
          localStorage.setItem(DISPATCH_FAILURE_HISTORY_ONE_TIME_SEED_KEY, '1');
        } catch (error) {
          console.warn('dispatch failure history seed flag save failed', error);
        }
        return false;
      }

      const base = Date.now();
      const previewFailureRecords = [
        {
          at: formatDateTime(new Date(base - 42 * 60 * 1000)),
          reason: '第一次派遣到场后，现场低压柜未完成验电，接入失败'
        },
        {
          at: formatDateTime(new Date(base - 27 * 60 * 1000)),
          reason: '第二次尝试并网时检测到负载侧开关状态异常'
        },
        {
          at: formatDateTime(new Date(base - 9 * 60 * 1000)),
          reason: '已通知客户现场整改，等待重新派遣'
        }
      ];
      const mergedFailureRecords = normalizeDispatchFailureRecords([
        ...existingFailureRecords,
        ...previewFailureRecords
      ]);
      records[failedIndex] = normalizeDispatchCatalogRecord({
        ...failedRecord,
        failureRecords: mergedFailureRecords
      });
      dispatchCatalogAPI.replaceAll(records);

      try {
        localStorage.setItem(DISPATCH_FAILURE_HISTORY_ONE_TIME_SEED_KEY, '1');
      } catch (error) {
        console.warn('dispatch failure history seed flag save failed', error);
      }
      return true;
    };

    const purgeDeprecatedDispatchPreviewRows = () => {
      const deprecatedWorkorderIds = new Set(['#WO-DEMO-004']);
      const deprecatedCompanyNames = new Set(['白云机场地勤保障中心']);
      const records = dispatchCatalogAPI.reloadFromStorage()
        .map(normalizeDispatchCatalogRecord)
        .filter((item) => item.dispatchId);
      if (!records.length) return false;
      const filteredRecords = records.filter((item) => {
        const workorderId = parseTrim(item.workorderId);
        const companyName = parseTrim(item.companyName);
        if (deprecatedWorkorderIds.has(workorderId)) return false;
        if (deprecatedCompanyNames.has(companyName)) return false;
        return true;
      });
      if (filteredRecords.length === records.length) return false;
      dispatchCatalogAPI.replaceAll(filteredRecords);
      return true;
    };

    const clearForm = () => {
      form.querySelectorAll('input, select, textarea').forEach((input) => {
        if (input.tagName === 'SELECT') {
          input.selectedIndex = 0;
        } else {
          input.value = '';
        }
      });
    };

    const setFormDisabled = (disabled) => {
      form.querySelectorAll('input, select, textarea').forEach((input) => {
        input.disabled = !!disabled;
      });
    };

    const clearCancelDispatchReasonValidation = () => {
      if (cancelDispatchReasonInput) {
        cancelDispatchReasonInput.classList.remove('is-invalid');
      }
      if (cancelDispatchReasonErrorNode) {
        cancelDispatchReasonErrorNode.style.display = 'none';
      }
    };

    const setCancelDispatchReasonInvalid = () => {
      if (cancelDispatchReasonInput) {
        cancelDispatchReasonInput.classList.add('is-invalid');
        cancelDispatchReasonInput.focus();
      }
      if (cancelDispatchReasonErrorNode) {
        cancelDispatchReasonErrorNode.style.display = '';
      }
    };

    const setWorkorderSelectionLocked = (locked) => {
      if (!workorderSelect) return;
      workorderSelect.disabled = !!locked;
    };

    const setFormMode = (mode, statusText = '') => {
      submitLabel.disabled = false;
      if (mode === 'edit') {
        modalTitle.textContent = '修改调度任务';
        submitLabel.textContent = normalizeDispatchStatus(statusText) === DISPATCH_STATUS.FAILED
          ? '重新派遣'
          : '保存';
        return;
      }
      modalTitle.textContent = '添加调度任务';
      submitLabel.textContent = '派遣车辆';
    };

    const setReadonlyDetailMode = () => {
      isReadonlyMode = true;
      setFormDisabled(true);
      modalTitle.textContent = '调度详情';
      submitLabel.textContent = '不可修改';
      submitLabel.disabled = true;
    };

    const setEditableMode = (mode, statusText = '') => {
      isReadonlyMode = false;
      setFormDisabled(false);
      setFormMode(mode, statusText);
      setWorkorderSelectionLocked(mode === 'edit');
    };

    const applyWorkorderPreset = (workorderId) => {
      const preset = findWorkorder(workorderId);
      if (!preset) return;
      setFieldValue('companyName', preset.companyName);
      setFieldValue('orderType', normalizeWorkorderType(preset.orderType));
      setFieldValue('contactName', preset.contactName);
      setFieldValue('companyId', preset.companyId);
      setFieldValue('energyDemand', preset.energyDemand);
      setFieldValue('contactPhone', preset.contactPhone);
      setFieldValue('startTime', preset.startTime);
      setFieldValue('requiredPower', preset.requiredPower);
      setFieldValue('address', preset.address);
      setFieldValue('cancelReason', '');
    };

    const applyVehiclePreset = (vehicleId, fallback = {}) => {
      const targetVehicleId = parseTrim(vehicleId);
      const preset = findVehicle(targetVehicleId) || vehicleCatalogAPI.findById(targetVehicleId);
      const fallbackDriverName = parseTrim(fallback.driverName);
      const fallbackDriverPhone = parseTrim(fallback.driverPhone);
      const nextDriverName = preset ? parseTrim(preset.driverName) : fallbackDriverName;
      const nextDriverPhone = preset ? parseTrim(preset.contact || preset.driverPhone) : fallbackDriverPhone;
      setFieldValue('driverName', nextDriverName);
      setFieldValue('driverPhone', nextDriverPhone);
    };

    const inferWorkorderForRow = (row) => {
      if (!row) return null;
      const cells = row.querySelectorAll('td');
      const companyName = cells[2]?.textContent?.trim() || '';
      const orderType = normalizeWorkorderType(cells[3]?.textContent?.trim() || '');
      const exact = workorderOptions.find((item) => item.companyName === companyName && normalizeWorkorderType(item.orderType) === orderType);
      if (exact) return exact;
      return workorderOptions.find((item) => item.companyName === companyName) || null;
    };

    const inferVehicleForRow = (row) => {
      if (!row) return null;
      const cells = row.querySelectorAll('td');
      const vehicleId = cells[6]?.textContent?.trim() || '';
      if (!vehicleId) return null;
      return findVehicle(vehicleId);
    };

    const resetForCreate = () => {
      editingRow = null;
      clearForm();
      const selectedWorkorderId = renderWorkorderOptions('', true);
      if (selectedWorkorderId) {
        applyWorkorderPreset(selectedWorkorderId);
      }
      setFieldValue('dispatchId', createDispatchId());
      const selectedVehicleId = renderVehicleOptions();
      if (selectedVehicleId) {
        applyVehiclePreset(selectedVehicleId);
      } else {
        setFieldValue('driverName', '');
        setFieldValue('driverPhone', '');
      }
      setFailureRecordVisibility([]);
      setEditableMode('create');
    };

    const getRowStatus = (row) => normalizeDispatchStatus(
      row.dataset.status || row.querySelectorAll('td')[7]?.textContent?.trim() || DISPATCH_STATUS.IN_PROGRESS
    );

    const syncActionCell = (row) => {
      const actionCell = row.querySelector('td:last-child');
      if (!actionCell) return;
      actionCell.innerHTML = getDispatchActionMarkup(getRowStatus(row));
    };

    const setRowStatus = (row, statusText) => {
      const cells = row.querySelectorAll('td');
      const nextStatus = normalizeDispatchStatus(statusText);
      if (cells[7]) cells[7].textContent = nextStatus;
      row.dataset.status = nextStatus;
      if (nextStatus === DISPATCH_STATUS.FAILED) {
        const existingFailureRecords = normalizeDispatchFailureRecords(
          row.dataset.failureRecords || '',
          row.dataset.failureReason || '',
          row.dataset.failureAt || ''
        );
        if (!existingFailureRecords.length) {
          existingFailureRecords.push({
            at: formatDateTime(),
            reason: '调度执行失败，等待重新派遣'
          });
        }
        row.dataset.failureRecords = JSON.stringify(existingFailureRecords);
        const latestFailure = existingFailureRecords[existingFailureRecords.length - 1];
        row.dataset.failureReason = latestFailure.reason;
        row.dataset.failureAt = latestFailure.at;
      }
      syncActionCell(row);
      return nextStatus;
    };

    const applyRowAppAckDataset = (row, data) => {
      const normalizedPayload = normalizeDispatchAppAckPayload(data.appAckPayload);
      row.dataset.appAckStatus = normalizeDispatchAppAckStatus(data.appAckStatus, DISPATCH_APP_ACK_STATUS.PENDING);
      row.dataset.appAckAt = trimDispatchValue(data.appAckAt);
      row.dataset.appAckPayload = normalizedPayload ? JSON.stringify(normalizedPayload) : '';
    };

    const applyRowDataset = (row, data) => {
      const normalizedFailureRecords = normalizeDispatchFailureRecords(
        data.failureRecords,
        data.failureReason,
        data.failureAt
      );
      const latestFailure = normalizedFailureRecords.length
        ? normalizedFailureRecords[normalizedFailureRecords.length - 1]
        : null;
      row.dataset.workorderId = data.workorderId || '';
      row.dataset.companyId = data.companyId || '';
      row.dataset.contactName = data.contactName || '';
      row.dataset.contactPhone = data.contactPhone || '';
      row.dataset.energyDemand = data.energyDemand || '';
      row.dataset.requiredPower = data.requiredPower || '';
      row.dataset.startTime = data.startTime || '';
      row.dataset.endTime = data.endTime || '';
      row.dataset.note = data.note || '';
      row.dataset.cancelReason = data.cancelReason || '';
      row.dataset.driverName = data.driverName || '';
      row.dataset.driverPhone = data.driverPhone || '';
      row.dataset.orderStatus = normalizeOrderLifecycleStatus(data.orderStatus);
      row.dataset.orderStartedAt = trimDispatchValue(data.orderStartedAt);
      row.dataset.orderCompletedAt = trimDispatchValue(data.orderCompletedAt);
      row.dataset.orderCanceledAt = trimDispatchValue(data.orderCanceledAt);
      row.dataset.orderCancelReason = trimDispatchValue(data.orderCancelReason);
      row.dataset.failureRecords = JSON.stringify(normalizedFailureRecords);
      row.dataset.failureReason = latestFailure ? latestFailure.reason : '';
      row.dataset.failureAt = latestFailure ? latestFailure.at : '';
      row.dataset.status = normalizeDispatchStatus(data.status);
      applyRowAppAckDataset(row, data);
    };

    const serializeDispatchRow = (row) => {
      const cells = row.querySelectorAll('td');
      const failureRecords = normalizeDispatchFailureRecords(
        row.dataset.failureRecords || '',
        row.dataset.failureReason || '',
        row.dataset.failureAt || ''
      );
      const latestFailure = failureRecords.length ? failureRecords[failureRecords.length - 1] : null;
      return {
        dispatchId: cells[0]?.textContent?.trim() || '',
        companyName: cells[2]?.textContent?.trim() || '',
        orderType: normalizeWorkorderType(cells[3]?.textContent?.trim() || ''),
        address: cells[4]?.textContent?.trim() || '',
        createdAt: cells[5]?.textContent?.trim() || '',
        vehicleId: cells[6]?.textContent?.trim() || '',
        status: normalizeDispatchStatus(cells[7]?.textContent?.trim() || ''),
        workorderId: row.dataset.workorderId || '',
        companyId: row.dataset.companyId || '',
        contactName: row.dataset.contactName || '',
        contactPhone: row.dataset.contactPhone || '',
        energyDemand: row.dataset.energyDemand || '',
        requiredPower: row.dataset.requiredPower || '',
        startTime: row.dataset.startTime || '',
        endTime: row.dataset.endTime || '',
        note: row.dataset.note || '',
        cancelReason: row.dataset.cancelReason || '',
        driverName: row.dataset.driverName || '',
        driverPhone: row.dataset.driverPhone || '',
        orderStatus: normalizeOrderLifecycleStatus(row.dataset.orderStatus),
        orderStartedAt: row.dataset.orderStartedAt || '',
        orderCompletedAt: row.dataset.orderCompletedAt || '',
        orderCanceledAt: row.dataset.orderCanceledAt || '',
        orderCancelReason: row.dataset.orderCancelReason || '',
        appAckStatus: normalizeDispatchAppAckStatus(row.dataset.appAckStatus, DISPATCH_APP_ACK_STATUS.PENDING),
        appAckAt: row.dataset.appAckAt || '',
        appAckPayload: row.dataset.appAckPayload || '',
        failureRecords,
        failureReason: latestFailure ? latestFailure.reason : '',
        failureAt: latestFailure ? latestFailure.at : ''
      };
    };

    // Optional integration hook for external status evaluation.
    // Support either:
    // 1) window.dispatchStatusHooks.resolveStatuses(records) -> { [dispatchId]: status }
    // 2) window.dispatchStatusHooks.resolveStatus(record) / window.resolveDispatchStatus(record) -> status
    // 3) window.resolveDispatchStatuses(records) -> { [dispatchId]: status }
    const applyExternalDispatchStatuses = async () => {
      const resolver = getDispatchStatusResolver();
      if (!resolver || dispatchStatusSyncing) return;
      const rows = Array.from(tbody.querySelectorAll('tr'));
      if (!rows.length) return;

      dispatchStatusSyncing = true;
      try {
        const records = rows.map(serializeDispatchRow);
        let nextStatusMap = null;

        if (typeof resolver.resolveStatuses === 'function') {
          nextStatusMap = await resolver.resolveStatuses(records);
        } else if (typeof resolver.resolveStatus === 'function') {
          const result = await Promise.all(records.map(async (record) => [
            record.dispatchId,
            await resolver.resolveStatus(record)
          ]));
          nextStatusMap = Object.fromEntries(result);
        }

        if (nextStatusMap instanceof Map) {
          nextStatusMap = Object.fromEntries(nextStatusMap.entries());
        }
        if (!nextStatusMap || typeof nextStatusMap !== 'object') return;
        let hasChange = false;
        rows.forEach((row) => {
          const current = normalizeDispatchStatus(row.dataset.status || row.querySelectorAll('td')[7]?.textContent?.trim() || '');
          const dispatchId = row.querySelectorAll('td')[0]?.textContent?.trim() || '';
          if (!dispatchId) return;
          const nextRaw = nextStatusMap[dispatchId];
          if (!isDispatchStatus(nextRaw)) return;
          const next = parseTrim(nextRaw);
          if (current === DISPATCH_STATUS.CANCELED && next !== DISPATCH_STATUS.CANCELED) return;
          if (current === next) return;
          setRowStatus(row, next);
          hasChange = true;
        });
        if (hasChange) {
          dispatchFilterController?.applyFilters();
          syncDispatchCatalogFromTable();
          refreshPendingWorkorderCount();
        }
      } catch (error) {
        console.warn('dispatch status resolve failed', error);
      } finally {
        dispatchStatusSyncing = false;
      }
    };

    const hydrateExistingRows = () => {
      loadWorkorderOptions();
      loadVehicleOptions();
      Array.from(tbody.querySelectorAll('tr')).forEach((row) => {
        setRowStatus(row, row.dataset.status || row.querySelectorAll('td')[7]?.textContent?.trim() || DISPATCH_STATUS.IN_PROGRESS);
        const linkedWorkorder = row.dataset.workorderId
          ? findWorkorder(row.dataset.workorderId)
          : inferWorkorderForRow(row);
        if (!row.dataset.workorderId && linkedWorkorder) {
          row.dataset.workorderId = linkedWorkorder.workorderId;
        }
        if (linkedWorkorder) {
          if (!row.dataset.companyId) row.dataset.companyId = linkedWorkorder.companyId;
          if (!row.dataset.contactName) row.dataset.contactName = linkedWorkorder.contactName;
          if (!row.dataset.contactPhone) row.dataset.contactPhone = linkedWorkorder.contactPhone;
          if (!row.dataset.energyDemand) row.dataset.energyDemand = linkedWorkorder.energyDemand;
          if (!row.dataset.requiredPower) row.dataset.requiredPower = linkedWorkorder.requiredPower;
          if (!row.dataset.startTime) row.dataset.startTime = linkedWorkorder.startTime;
          if (!row.dataset.note) row.dataset.note = linkedWorkorder.note;
        }

        const linkedVehicle = inferVehicleForRow(row);
        if (linkedVehicle) {
          if (!row.dataset.driverName) row.dataset.driverName = linkedVehicle.driverName;
          if (!row.dataset.driverPhone) row.dataset.driverPhone = linkedVehicle.contact;
        }

        applyRowAppAckDataset(row, {
          appAckStatus: row.dataset.appAckStatus,
          appAckAt: row.dataset.appAckAt,
          appAckPayload: row.dataset.appAckPayload
        });
      });
    };

    const buildRow = (data) => {
      const tr = document.createElement('tr');
      const statusText = normalizeDispatchStatus(data.status);
      tr.innerHTML = `
        <td>${data.dispatchId}</td>
        <td>${data.workorderId || '—'}</td>
        <td>${data.companyName}</td>
        <td>${orderTypeMarkup(data.orderType)}</td>
        <td>${data.address}</td>
        <td>${data.createdAt}</td>
        <td>${data.vehicleId}</td>
        <td>${statusText}</td>
        <td>${getDispatchActionMarkup(statusText)}</td>
      `;
      applyRowDataset(tr, data);
      return tr;
    };

    const updateRow = (row, data) => {
      const cells = row.querySelectorAll('td');
      if (cells[0]) cells[0].textContent = data.dispatchId;
      if (cells[1]) cells[1].textContent = data.workorderId || '—';
      if (cells[2]) cells[2].textContent = data.companyName;
      if (cells[3]) cells[3].innerHTML = orderTypeMarkup(data.orderType);
      if (cells[4]) {
        cells[4].textContent = data.address;
        cells[4].classList.remove('align-left');
      }
      if (cells[6]) cells[6].textContent = data.vehicleId;
      setRowStatus(row, data.status);
      applyRowDataset(row, data);
    };

    const syncDispatchCatalogFromTable = () => {
      const records = Array.from(tbody.querySelectorAll('tr'))
        .map(serializeDispatchRow)
        .filter((item) => item.dispatchId);
      dispatchCatalogAPI.replaceAll(records);
      return records;
    };

    const findDispatchRowById = (dispatchId) => {
      const targetId = parseTrim(dispatchId);
      if (!targetId) return null;
      return Array.from(tbody.querySelectorAll('tr')).find((row) => {
        const rowDispatchId = parseTrim(row.querySelectorAll('td')[0]?.textContent || '');
        return rowDispatchId === targetId;
      }) || null;
    };

    const syncDispatchRowAckFromCatalog = (dispatchId) => {
      const targetId = parseTrim(dispatchId);
      if (!targetId) return null;
      const record = dispatchCatalogAPI.getAll()
        .map(normalizeDispatchCatalogRecord)
        .find((item) => item.dispatchId === targetId);
      if (!record) return null;
      const row = findDispatchRowById(targetId);
      if (!row) return null;
      if (parseTrim(record.status)) {
        setRowStatus(row, record.status);
      }
      applyRowAppAckDataset(row, record);
      return row;
    };

    const seedDispatchRowsFromCatalog = () => {
      const catalog = dispatchCatalogAPI.reloadFromStorage();
      if (!Array.isArray(catalog) || !catalog.length) return false;
      tbody.innerHTML = '';
      catalog.forEach((record) => {
        const normalized = normalizeDispatchCatalogRecord(record);
        const rowData = {
          dispatchId: normalized.dispatchId || createDispatchId(),
          companyName: normalized.companyName || '未填写',
          orderType: normalized.orderType || '供电',
          address: normalized.address || '—',
          createdAt: normalized.createdAt || formatDateTime(),
          vehicleId: normalized.vehicleId || '未指定',
          status: normalizeDispatchStatus(normalized.status),
          workorderId: normalized.workorderId || '',
          companyId: normalized.companyId || '',
          contactName: normalized.contactName || '',
          contactPhone: normalized.contactPhone || '',
          energyDemand: normalized.energyDemand || '',
          requiredPower: normalized.requiredPower || '',
          startTime: normalized.startTime || '',
          endTime: normalized.endTime || '',
          note: normalized.note || '',
          cancelReason: normalized.cancelReason || '',
          driverName: normalized.driverName || '',
          driverPhone: normalized.driverPhone || '',
          orderStatus: normalizeOrderLifecycleStatus(normalized.orderStatus),
          orderStartedAt: normalized.orderStartedAt || '',
          orderCompletedAt: normalized.orderCompletedAt || '',
          orderCanceledAt: normalized.orderCanceledAt || '',
          orderCancelReason: normalized.orderCancelReason || '',
          appAckStatus: normalized.appAckStatus || DISPATCH_APP_ACK_STATUS.PENDING,
          appAckAt: normalized.appAckAt || '',
          appAckPayload: normalized.appAckPayload || null,
          failureRecords: normalized.failureRecords || [],
          failureReason: normalized.failureReason || '',
          failureAt: normalized.failureAt || ''
        };
        tbody.appendChild(buildRow(rowData));
      });
      return true;
    };

    const populateFormFromRow = (row) => {
      const cells = row.querySelectorAll('td');
      const workorderId = row.dataset.workorderId || '';
      const vehicleId = cells[6] ? cells[6].textContent.trim() : '';
      const rowDriverName = parseTrim(row.dataset.driverName);
      const rowDriverPhone = parseTrim(row.dataset.driverPhone);
      renderWorkorderOptions(workorderId);
      renderVehicleOptions(vehicleId);
      if (workorderId) applyWorkorderPreset(workorderId);
      if (vehicleId) {
        applyVehiclePreset(vehicleId, {
          driverName: rowDriverName,
          driverPhone: rowDriverPhone
        });
      } else {
        setFieldValue('driverName', rowDriverName);
        setFieldValue('driverPhone', rowDriverPhone);
      }
      setFieldValue('dispatchId', cells[0] ? cells[0].textContent.trim() : '');
      setFieldValue('companyName', cells[2] ? cells[2].textContent.trim() : '');
      setFieldValue('orderType', cells[3] ? cells[3].textContent.trim() : '');
      setFieldValue('address', cells[4] ? cells[4].textContent.trim() : '');
      setFieldValue('vehicleId', vehicleId);
      setFieldValue('companyId', row.dataset.companyId || '');
      setFieldValue('contactName', row.dataset.contactName || '');
      setFieldValue('contactPhone', row.dataset.contactPhone || '');
      setFieldValue('energyDemand', row.dataset.energyDemand || '');
      setFieldValue('requiredPower', row.dataset.requiredPower || '');
      setFieldValue('startTime', row.dataset.startTime || '');
      setFieldValue('cancelReason', row.dataset.cancelReason || '');
      setFailureRecordVisibility(
        row.dataset.failureRecords || '',
        row.dataset.failureReason || '',
        row.dataset.failureAt || ''
      );
    };

    const collectFormData = () => {
      const currentCells = editingRow ? editingRow.querySelectorAll('td') : [];
      const existingDispatchId = currentCells[0] ? currentCells[0].textContent.trim() : '';
      const statusText = currentCells[7] ? currentCells[7].textContent.trim() : '';
      const createdAtText = currentCells[5] ? currentCells[5].textContent.trim() : '';
      const existingWorkorderId = editingRow ? parseTrim(editingRow.dataset.workorderId) : '';
      const existingFailureRecords = editingRow
        ? normalizeDispatchFailureRecords(
          editingRow.dataset.failureRecords || '',
          editingRow.dataset.failureReason || '',
          editingRow.dataset.failureAt || ''
        )
        : [];
      const selectedWorkorderId = fieldValue('workorderId');
      const existingRowStatus = editingRow
        ? normalizeDispatchStatus(editingRow.dataset.status || statusText || DISPATCH_STATUS.IN_PROGRESS)
        : DISPATCH_STATUS.IN_PROGRESS;
      const shouldRetryFromFailed = editingRow && existingRowStatus === DISPATCH_STATUS.FAILED;
      const nextStatus = shouldRetryFromFailed ? DISPATCH_STATUS.IN_PROGRESS : existingRowStatus;
      const nextFailureRecords = normalizeDispatchFailureRecords(existingFailureRecords);
      const existingAppAckStatus = editingRow
        ? normalizeDispatchAppAckStatus(editingRow.dataset.appAckStatus, DISPATCH_APP_ACK_STATUS.PENDING)
        : DISPATCH_APP_ACK_STATUS.PENDING;
      const existingAppAckAt = editingRow ? trimDispatchValue(editingRow.dataset.appAckAt) : '';
      const existingAppAckPayload = editingRow ? normalizeDispatchAppAckPayload(editingRow.dataset.appAckPayload || '') : null;
      const existingOrderStatus = editingRow ? normalizeOrderLifecycleStatus(editingRow.dataset.orderStatus) : '';
      const existingOrderStartedAt = editingRow ? trimDispatchValue(editingRow.dataset.orderStartedAt) : '';
      const existingOrderCompletedAt = editingRow ? trimDispatchValue(editingRow.dataset.orderCompletedAt) : '';
      const existingOrderCanceledAt = editingRow ? trimDispatchValue(editingRow.dataset.orderCanceledAt) : '';
      const existingOrderCancelReason = editingRow ? trimDispatchValue(editingRow.dataset.orderCancelReason) : '';
      const shouldResetAppAck = !editingRow || shouldRetryFromFailed;
      const nextAppAckStatus = shouldResetAppAck ? DISPATCH_APP_ACK_STATUS.PENDING : existingAppAckStatus;
      const nextAppAckAt = shouldResetAppAck ? '' : existingAppAckAt;
      const nextAppAckPayload = shouldResetAppAck ? null : existingAppAckPayload;
      const nextOrderStatus = shouldResetAppAck ? '' : existingOrderStatus;
      const nextOrderStartedAt = shouldResetAppAck ? '' : existingOrderStartedAt;
      const nextOrderCompletedAt = shouldResetAppAck ? '' : existingOrderCompletedAt;
      const nextOrderCanceledAt = shouldResetAppAck ? '' : existingOrderCanceledAt;
      const nextOrderCancelReason = shouldResetAppAck ? '' : existingOrderCancelReason;
      if (shouldRetryFromFailed && !nextFailureRecords.length) {
        nextFailureRecords.push({
          at: formatDateTime(),
          reason: '调度失败后重新派遣'
        });
      }
      const latestFailure = nextFailureRecords.length ? nextFailureRecords[nextFailureRecords.length - 1] : null;
      return {
        workorderId: editingRow
          ? (selectedWorkorderId || existingWorkorderId || '')
          : (selectedWorkorderId || ''),
        dispatchId: editingRow
          ? (existingDispatchId || fieldValue('dispatchId') || createDispatchId())
          : createDispatchId(),
        companyName: fieldValue('companyName') || '未填写',
        orderType: fieldValue('orderType') || '供电',
        address: fieldValue('address') || '—',
        createdAt: createdAtText || formatDateTime(),
        vehicleId: fieldValue('vehicleId') || '未指定',
        status: nextStatus,
        companyId: fieldValue('companyId'),
        contactName: fieldValue('contactName'),
        contactPhone: fieldValue('contactPhone'),
        energyDemand: fieldValue('energyDemand'),
        requiredPower: fieldValue('requiredPower'),
        startTime: fieldValue('startTime'),
        endTime: editingRow ? (editingRow.dataset.endTime || '') : '',
        note: editingRow ? (editingRow.dataset.note || '') : '',
        cancelReason: editingRow ? (editingRow.dataset.cancelReason || '') : fieldValue('cancelReason'),
        driverName: fieldValue('driverName'),
        driverPhone: fieldValue('driverPhone'),
        orderStatus: nextOrderStatus,
        orderStartedAt: nextOrderStartedAt,
        orderCompletedAt: nextOrderCompletedAt,
        orderCanceledAt: nextOrderCanceledAt,
        orderCancelReason: nextOrderCancelReason,
        appAckStatus: nextAppAckStatus,
        appAckAt: nextAppAckAt,
        appAckPayload: nextAppAckPayload,
        failureRecords: nextFailureRecords,
        failureReason: latestFailure ? latestFailure.reason : '',
        failureAt: latestFailure ? latestFailure.at : ''
      };
    };

    const getLinkedWorkorderIdSetFromRows = (excludeRow = null) => {
      const ids = new Set();
      Array.from(tbody.querySelectorAll('tr')).forEach((row) => {
        if (excludeRow && row === excludeRow) return;
        const workorderId = parseTrim(row.dataset.workorderId);
        if (workorderId) {
          ids.add(workorderId);
        }
      });
      return ids;
    };

    const isWorkorderLinkedToOtherDispatch = (workorderId, excludeRow = null) => {
      const targetId = parseTrim(workorderId);
      if (!targetId) return false;
      return getLinkedWorkorderIdSetFromRows(excludeRow).has(targetId);
    };

    // APP 指令下发占位接口:
    // window.dispatchOrderHooks.sendDispatchCommand(record, context)
    // 说明: 当前仅预留对接能力，不会阻塞前端保存流程。
    const notifyAppDispatchCommand = (dispatchRecord, context = 'create') => {
      const hooks = window.dispatchOrderHooks;
      if (!hooks || typeof hooks.sendDispatchCommand !== 'function') return;
      Promise.resolve()
        .then(() => hooks.sendDispatchCommand({ ...dispatchRecord }, context))
        .catch((error) => {
          console.warn('dispatch command send failed', error);
        });
    };

    form.addEventListener('change', (event) => {
      const workorderSelect = event.target.closest('[data-field="workorderId"]');
      if (workorderSelect) {
        applyWorkorderPreset(workorderSelect.value.trim());
      }
      const vehicleSelect = event.target.closest('[data-field="vehicleId"]');
      if (vehicleSelect) {
        applyVehiclePreset(vehicleSelect.value.trim());
      }
    });

    document.addEventListener('click', (event) => {
      const newBtn = event.target.closest('[data-action="new-dispatch"]');
      if (newBtn) {
        refreshPendingWorkorderCount();
        if (getPendingWorkorderCount() <= 0) {
          closeModal(modal);
          resetForCreate();
          openModal(noPendingModalId);
          return;
        }
        resetForCreate();
        openModal('modal-dispatch-task');
        return;
      }

      const saveBtn = event.target.closest('[data-action="save-dispatch"]');
      if (saveBtn) {
        if (isReadonlyMode) {
          showToast('详情模式不可修改');
          return;
        }
        if (!editingRow) {
          refreshPendingWorkorderCount();
          if (getPendingWorkorderCount() <= 0) {
            closeModal(modal);
            openModal(noPendingModalId);
            return;
          }
        }
        const existingEditingWorkorderId = editingRow ? parseTrim(editingRow.dataset.workorderId) : '';
        const selectedWorkorderId = fieldValue('workorderId') || existingEditingWorkorderId;
        const workorderChangedInEdit = editingRow
          ? parseTrim(selectedWorkorderId) !== existingEditingWorkorderId
          : true;
        if (workorderChangedInEdit && isWorkorderLinkedToOtherDispatch(selectedWorkorderId, editingRow)) {
          showToast('该工单已派遣过车辆，不能重复派遣');
          if (!editingRow) {
            resetForCreate();
          }
          return;
        }
        const isCreateMode = !editingRow;
        const isRetryFromFailed = !!(editingRow && getRowStatus(editingRow) === DISPATCH_STATUS.FAILED);
        const previousStatus = editingRow ? getRowStatus(editingRow) : '';
        const rowData = collectFormData();
        if (editingRow) {
          updateRow(editingRow, rowData);
          if (previousStatus === DISPATCH_STATUS.FAILED && rowData.status === DISPATCH_STATUS.IN_PROGRESS) {
            showToast('已保存，状态已回到调度中');
          } else {
            showToast('已保存');
          }
        } else {
          const newRow = buildRow(rowData);
          tbody.appendChild(newRow);
          showToast('已新增');
        }
        dispatchFilterController?.applyFilters();
        syncDispatchCatalogFromTable();
        refreshPendingWorkorderCount();
        if (
          rowData.status === DISPATCH_STATUS.IN_PROGRESS &&
          rowData.appAckStatus === DISPATCH_APP_ACK_STATUS.PENDING &&
          (isCreateMode || isRetryFromFailed)
        ) {
          notifyAppDispatchCommand(rowData, isCreateMode ? 'create' : 'retry');
        }
        editingRow = null;
        resetForCreate();
        closeModal(saveBtn.closest('.modal-backdrop'));
        return;
      }

      const detailBtn = event.target.closest('[data-action="view-dispatch-detail"]');
      if (detailBtn && detailBtn.closest('[data-dispatch-table]')) {
        const row = detailBtn.closest('tr');
        if (!row) return;
        editingRow = row;
        populateFormFromRow(row);
        setReadonlyDetailMode();
        openModal('modal-dispatch-task');
        return;
      }

      const editBtn = event.target.closest('[data-action="edit-dispatch"]');
      if (editBtn && editBtn.closest('[data-dispatch-table]')) {
        const row = editBtn.closest('tr');
        if (!row) return;
        editingRow = row;
        populateFormFromRow(row);
        if (isDispatchDetailOnlyStatus(getRowStatus(row))) {
          setReadonlyDetailMode();
        } else {
          setEditableMode('edit', getRowStatus(row));
        }
        openModal('modal-dispatch-task');
        return;
      }

      const cancelBtn = event.target.closest('[data-action="cancel-dispatch"], [data-action="delete-dispatch"]');
      if (cancelBtn && cancelBtn.closest('[data-dispatch-table]')) {
        pendingCancelRow = cancelBtn.closest('tr');
        if (!pendingCancelRow) return;
        if (cancelDispatchReasonInput) {
          cancelDispatchReasonInput.value = '';
        }
        clearCancelDispatchReasonValidation();
        openModal('modal-confirm-cancel-dispatch');
        return;
      }

      const confirmCancelBtn = event.target.closest('[data-action="confirm-cancel-dispatch"]');
      if (confirmCancelBtn && pendingCancelRow) {
        const cancelReason = parseTrim(cancelDispatchReasonInput ? cancelDispatchReasonInput.value : '');
        if (!cancelReason) {
          showToast('请输入取消原因');
          setCancelDispatchReasonInvalid();
          return;
        }
        clearCancelDispatchReasonValidation();
        pendingCancelRow.dataset.cancelReason = cancelReason;
        const currentStatus = pendingCancelRow.querySelectorAll('td')[7]?.textContent?.trim() || '';
        if (normalizeDispatchStatus(currentStatus) !== DISPATCH_STATUS.CANCELED) {
          setRowStatus(pendingCancelRow, DISPATCH_STATUS.CANCELED);
        }
        if (editingRow === pendingCancelRow) {
          editingRow = null;
          resetForCreate();
        }
        pendingCancelRow = null;
        if (cancelDispatchReasonInput) {
          cancelDispatchReasonInput.value = '';
        }
        dispatchFilterController?.applyFilters();
        syncDispatchCatalogFromTable();
        refreshPendingWorkorderCount();
        showToast('已取消');
        closeModal(confirmCancelBtn.closest('.modal-backdrop'));
        return;
      }

      const vehicleDetailBtn = event.target.closest('[data-action="view-dispatch-vehicle"]');
      if (vehicleDetailBtn) {
        const vehicleId = fieldValue('vehicleId');
        if (!vehicleId) {
          showToast('请先选择车辆');
          return;
        }
        openDispatchVehicleDetail(vehicleId);
        return;
      }

      const vehicleLocationBtn = event.target.closest('[data-action="locate-dispatch-vehicle"]');
      if (vehicleLocationBtn) {
        const vehicleId = fieldValue('vehicleId');
        if (!vehicleId) {
          showToast('请先选择车辆');
          return;
        }
        openDispatchVehicleLocation(vehicleId);
      }
    });

    modal.addEventListener('click', (event) => {
      const closeBtn = event.target.closest('[data-close]');
      if (closeBtn) {
        editingRow = null;
        resetForCreate();
        return;
      }
      if (event.target === modal) {
        closeModal(modal);
        editingRow = null;
        resetForCreate();
        return;
      }
    });

    if (cancelConfirmModal) {
      cancelConfirmModal.addEventListener('click', (event) => {
        if (event.target === cancelConfirmModal || event.target.closest('[data-close]')) {
          pendingCancelRow = null;
          if (cancelDispatchReasonInput) {
            cancelDispatchReasonInput.value = '';
          }
          clearCancelDispatchReasonValidation();
          closeModal(cancelConfirmModal);
        }
      });
    }

    if (cancelDispatchReasonInput) {
      cancelDispatchReasonInput.addEventListener('input', () => {
        if (parseTrim(cancelDispatchReasonInput.value)) {
          clearCancelDispatchReasonValidation();
        }
      });
    }

    const handleDispatchAppAckUpdated = (event) => {
      const dispatchId = parseTrim(event?.detail?.dispatchId);
      if (!dispatchId) return;
      syncDispatchRowAckFromCatalog(dispatchId);
    };
    window.addEventListener('dispatch-app-ack-updated', handleDispatchAppAckUpdated);
    window.addEventListener('beforeunload', () => {
      window.removeEventListener('dispatch-app-ack-updated', handleDispatchAppAckUpdated);
    }, { once: true });

    purgeDeprecatedDispatchPreviewRows();
    seedDispatchPreviewRecordsOnce();
    seedFailureHistoryPreviewOnce();
    seedDispatchRowsFromCatalog();
    hydrateExistingRows();
    syncDispatchCatalogFromTable();
    refreshPendingWorkorderCount();
    resetForCreate();
    void applyExternalDispatchStatuses();
  };

  const setupProjectList = () => {
    if (document.body.dataset.page !== 'mobile-project-list') return;
    const table = document.querySelector('[data-project-table]');
    const tbody = table ? table.querySelector('tbody') : null;
    const form = document.querySelector('[data-project-form]');
    const modal = document.getElementById('modal-new-company');
    const modalTitle = modal ? modal.querySelector('[data-project-modal-title]') : null;
    const submitLabel = modal ? modal.querySelector('[data-project-submit-label]') : null;
    if (!table || !tbody || !form || !modal || !modalTitle || !submitLabel) return;

    let editingRow = null;
    const projectFilterController = buildTableFilterController({
      tableSelector: '[data-project-table]',
      filters: [
        { name: 'company', selector: '[data-filter-project-company]', parser: parseLower },
        { name: 'credit', selector: '[data-filter-project-credit]', parser: parseLower }
      ],
      matchRow: (row, values) => {
        const cells = row.querySelectorAll('td');
        const company = cells[0]?.textContent?.trim().toLowerCase() || '';
        const credit = cells[1]?.textContent?.trim().toLowerCase() || '';
        const matchesCompany = !values.company || company.includes(values.company);
        const matchesCredit = !values.credit || credit.includes(values.credit);
        return matchesCompany && matchesCredit;
      },
      searchAction: 'search-project',
      resetAction: 'reset-project-filters'
    });

    const fieldValue = (name) => {
      const input = form.querySelector(`[data-field="${name}"]`);
      return input ? input.value.trim() : '';
    };

    const setFieldValue = (name, value) => {
      const input = form.querySelector(`[data-field="${name}"]`);
      if (!input) return;
      input.value = value || '';
    };

    const clearForm = () => {
      form.querySelectorAll('input, select, textarea').forEach((input) => {
        if (input.tagName === 'SELECT') {
          input.selectedIndex = 0;
        } else {
          input.value = '';
        }
      });
    };

    const setFormMode = (mode) => {
      if (mode === 'edit') {
        modalTitle.textContent = '修改项目配置';
        submitLabel.textContent = '保存';
        return;
      }
      modalTitle.textContent = '添加项目配置';
      submitLabel.textContent = '增加';
    };

    const startCreate = () => {
      editingRow = null;
      clearForm();
      setFormMode('create');
    };

    const populateFormFromRow = (row) => {
      const cells = row.querySelectorAll('td');
      setFieldValue('companyName', cells[0] ? cells[0].textContent.trim() : '');
      setFieldValue('creditCode', cells[1] ? cells[1].textContent.trim() : '');
      setFieldValue('contactName', cells[2] ? cells[2].textContent.trim() : '');
      setFieldValue('contactPhone', cells[3] ? cells[3].textContent.trim() : '');
      setFieldValue('companyType', cells[4] ? cells[4].textContent.trim() : '需求方');
      setFieldValue('address', cells[5] ? cells[5].textContent.trim() : '');
      setFieldValue('region', cells[7] ? cells[7].textContent.trim() : '');
      setFieldValue('contractNo', row.dataset.contractNo || '');
      setFieldValue('remark', row.dataset.remark || '');
    };

    const createCell = (content) => {
      const td = document.createElement('td');
      td.innerHTML = content;
      return td;
    };

    const buildActionCell = () => {
      const td = document.createElement('td');
      const editBtn = document.createElement('button');
      editBtn.type = 'button';
      editBtn.className = 'link-btn';
      editBtn.dataset.action = 'edit-project';
      editBtn.textContent = '修改';

      const deleteBtn = document.createElement('button');
      deleteBtn.type = 'button';
      deleteBtn.className = 'link-btn';
      deleteBtn.dataset.action = 'delete-project';
      deleteBtn.textContent = '删除';

      td.append(editBtn, document.createTextNode(' '), deleteBtn);
      return td;
    };

    const findDefaultProjectForRow = (row) => {
      const cells = row.querySelectorAll('td');
      const companyName = cells[0] ? cells[0].textContent.trim() : '';
      const creditCode = cells[1] ? cells[1].textContent.trim() : '';
      if (!companyName) return null;
      return DEFAULT_PROJECT_CATALOG.find((project) => {
        const sameName = (project.companyName || '').trim() === companyName;
        if (!sameName) return false;
        if (!creditCode) return true;
        return (project.creditCode || '').trim() === creditCode;
      }) || null;
    };

    const syncRowActions = (row) => {
      const cells = row.querySelectorAll('td');
      const actionCell = cells[cells.length - 1];
      if (!actionCell) return;
      actionCell.innerHTML = '';
      const actionContent = buildActionCell();
      actionCell.append(...Array.from(actionContent.childNodes));
      const defaultProject = findDefaultProjectForRow(row);
      if (!row.dataset.contractNo) row.dataset.contractNo = (defaultProject && defaultProject.contractNo) || '';
      if (!row.dataset.remark) row.dataset.remark = (defaultProject && defaultProject.remark) || '';
    };

    const buildRow = (data) => {
      const tr = document.createElement('tr');
      tr.dataset.contractNo = data.contractNo || '';
      tr.dataset.remark = data.remark || '';
      tr.append(
        createCell(data.companyName),
        createCell(data.creditCode),
        createCell(data.contactName),
        createCell(data.contactPhone),
        createCell(data.companyType),
        createCell(data.address),
        createCell(data.createdAt),
        createCell(data.region),
        buildActionCell()
      );
      return tr;
    };

    const updateRow = (row, data) => {
      const cells = row.querySelectorAll('td');
      if (cells[0]) cells[0].textContent = data.companyName;
      if (cells[1]) cells[1].textContent = data.creditCode;
      if (cells[2]) cells[2].textContent = data.contactName;
      if (cells[3]) cells[3].textContent = data.contactPhone;
      if (cells[4]) cells[4].innerHTML = data.companyType;
      if (cells[5]) cells[5].textContent = data.address;
      if (cells[7]) cells[7].textContent = data.region;
      row.dataset.contractNo = data.contractNo || '';
      row.dataset.remark = data.remark || '';
    };

    const serializeRowToProject = (row) => {
      const cells = row.querySelectorAll('td');
      return normalizeProjectRecord({
        companyName: cells[0] ? cells[0].textContent.trim() : '',
        creditCode: cells[1] ? cells[1].textContent.trim() : '',
        contactName: cells[2] ? cells[2].textContent.trim() : '',
        contactPhone: cells[3] ? cells[3].textContent.trim() : '',
        companyType: cells[4] ? cells[4].textContent.trim() : '',
        address: cells[5] ? cells[5].textContent.trim() : '',
        createdAt: cells[6] ? cells[6].textContent.trim() : '',
        region: cells[7] ? cells[7].textContent.trim() : '',
        contractNo: row.dataset.contractNo || '',
        remark: row.dataset.remark || ''
      });
    };

    const syncCatalogFromTable = () => {
      const projects = Array.from(tbody.querySelectorAll('tr'))
        .map(serializeRowToProject)
        .filter((project) => project.companyName);
      projectCatalogAPI.replaceAll(projects);
    };

    const loadStoredProjects = () => {
      try {
        const raw = localStorage.getItem(PROJECT_STORAGE_KEY);
        if (!raw) return [];
        const parsed = JSON.parse(raw);
        if (!Array.isArray(parsed)) return [];
        const normalized = parsed
          .map(normalizeProjectRecord)
          .filter((project) => project.companyName);
        if (isLegacyProjectSeed(normalized)) {
          localStorage.removeItem(PROJECT_STORAGE_KEY);
          return [];
        }
        return normalized;
      } catch (error) {
        return [];
      }
    };

    const toProjectRowData = (project) => ({
      companyName: project.companyName,
      creditCode: project.creditCode || '',
      contactName: project.contactName || '—',
      contactPhone: project.contactPhone || '—',
      companyType: `<span style="color:#2f6cf6;">${project.companyType || '需求方'}</span>`,
      address: project.address || '—',
      createdAt: project.createdAt || formatDateTime(),
      region: project.region || '—',
      contractNo: project.contractNo || '',
      remark: project.remark || ''
    });

    const storedProjects = loadStoredProjects();
    if (storedProjects.length) {
      tbody.innerHTML = '';
      storedProjects.forEach((project) => {
        tbody.appendChild(buildRow(toProjectRowData(project)));
      });
    }

    Array.from(tbody.querySelectorAll('tr')).forEach((row) => {
      syncRowActions(row);
    });
    syncCatalogFromTable();

    document.addEventListener('click', (event) => {
      const newBtn = event.target.closest('[data-action="new-project"]');
      if (newBtn) {
        startCreate();
      }

      const saveBtn = event.target.closest('[data-action="save-project"]');
      if (saveBtn) {
        const companyName = fieldValue('companyName') || '未命名企业';
        const creditCode = fieldValue('creditCode') || `AUTO${Date.now().toString().slice(-8)}`;
        const contactName = fieldValue('contactName') || '—';
        const contactPhone = fieldValue('contactPhone') || '—';
        const companyType = fieldValue('companyType') || '需求方';
        const region = fieldValue('region') || '—';
        const address = fieldValue('address') || '—';
        const rowData = {
          companyName,
          creditCode,
          contactName,
          contactPhone,
          companyType: `<span style="color:#2f6cf6;">${companyType}</span>`,
          address,
          createdAt: formatDateTime(),
          region,
          contractNo: fieldValue('contractNo'),
          remark: fieldValue('remark')
        };
        if (editingRow) {
          updateRow(editingRow, rowData);
          showToast('已保存');
        } else {
          const newRow = buildRow(rowData);
          tbody.appendChild(newRow);
          showToast('已新增');
        }
        projectFilterController?.applyFilters();
        syncCatalogFromTable();
        editingRow = null;
        clearForm();
        setFormMode('create');
        const modal = saveBtn.closest('.modal-backdrop');
        closeModal(modal);
        return;
      }

      const editBtn = event.target.closest('[data-action="edit-project"]');
      if (editBtn) {
        const row = editBtn.closest('tr');
        if (!row) return;
        editingRow = row;
        populateFormFromRow(row);
        setFormMode('edit');
        openModal('modal-new-company');
        return;
      }

      const deleteBtn = event.target.closest('[data-action="delete-project"]');
      if (deleteBtn) {
        const row = deleteBtn.closest('tr');
        if (row) {
          if (editingRow === row) {
            editingRow = null;
            clearForm();
            setFormMode('create');
          }
          row.remove();
          projectFilterController?.applyFilters();
          syncCatalogFromTable();
          showToast('已删除');
        }
      }
    });

    modal.addEventListener('click', (event) => {
      const closeBtn = event.target.closest('[data-close]');
      if (closeBtn) {
        editingRow = null;
        clearForm();
        setFormMode('create');
        return;
      }
      if (event.target === modal) {
        return;
      }
    });
  };

  document.addEventListener('DOMContentLoaded', () => {
    try {
      if (localStorage.getItem(OPERATIONAL_DATA_CLEAR_ONCE_KEY) !== '1') {
        localStorage.removeItem(PROJECT_STORAGE_KEY);
        localStorage.removeItem(VEHICLE_STORAGE_KEY);
        localStorage.removeItem(VEHICLE_STORAGE_VERSION_KEY);
        localStorage.setItem(WORKORDER_STORAGE_KEY, JSON.stringify([]));
        localStorage.setItem(WORKORDER_STORAGE_VERSION_KEY, WORKORDER_STORAGE_VERSION);
        localStorage.setItem(DISPATCH_STORAGE_KEY, JSON.stringify([]));
        localStorage.setItem(DISPATCH_PREVIEW_ONE_TIME_SEED_KEY, '1');
        localStorage.setItem(DISPATCH_FAILURE_HISTORY_ONE_TIME_SEED_KEY, '1');
        localStorage.setItem(OPERATIONAL_DATA_CLEAR_ONCE_KEY, '1');
      }
    } catch (error) {
      console.warn('operational data clear failed', error);
    }

    setupPaginatedTables();
    setupVehicleList();
    setupWorkorderList();
    setupDispatchList();
    setupProjectList();
    setupOrderListFilters();
    setupAlertCurrentFilters();
    setupAlertHistoryFilters();
  });

  const openModal = (id) => {
    const modal = document.getElementById(id);
    if (modal) {
      modal.classList.add('is-open');
    }
  };

  const closeModal = (modal) => {
    if (modal) {
      modal.classList.remove('is-open');
    }
  };

  document.addEventListener('click', (event) => {
    const openTarget = event.target.closest('[data-open]');
    if (openTarget) {
      openModal(openTarget.getAttribute('data-open'));
    }

    const closeTarget = event.target.closest('[data-close]');
    if (closeTarget) {
      closeModal(closeTarget.closest('.modal-backdrop'));
    }

    const tabTarget = event.target.closest('[data-tab]');
    if (tabTarget) {
      const tabs = tabTarget.closest('.tabs');
      if (!tabs) return;
      tabs.querySelectorAll('[data-tab]').forEach((tab) => tab.classList.remove('active'));
      tabTarget.classList.add('active');
      const panelId = tabTarget.getAttribute('data-tab');
      const panels = tabs.parentElement.querySelectorAll('.tab-panel');
      panels.forEach((panel) => panel.classList.remove('is-active'));
      const activePanel = tabs.parentElement.querySelector(`#${panelId}`);
      if (activePanel) {
        activePanel.classList.add('is-active');
      }
    }

    const pageBtn = event.target.closest('.page-btn');
    if (pageBtn && pageBtn.closest('[data-paginated]')) {
      return;
    }
    if (pageBtn && pageBtn.parentElement) {
      const group = pageBtn.parentElement;
      group.querySelectorAll('.page-btn').forEach((btn) => btn.classList.remove('active'));
      if (!pageBtn.classList.contains('page-btn-skip')) {
        pageBtn.classList.add('active');
      }
    }
  });

  document.addEventListener('click', (event) => {
    const toggle = event.target.closest('[data-toggle-password]');
    if (!toggle) return;
    const inputId = toggle.getAttribute('data-toggle-password');
    const input = document.getElementById(inputId);
    if (!input) return;
    input.type = input.type === 'password' ? 'text' : 'password';
    toggle.textContent = input.type === 'password' ? '显示' : '隐藏';
  });
})();
