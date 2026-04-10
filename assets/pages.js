(() => {
  const icons = {
    home: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M3 10.5L12 3l9 7.5"></path><path d="M5 10v10h14V10"></path></svg>',
    homeFilled: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M11.32 3.28a1 1 0 0 1 1.36 0l9 7.88a1 1 0 1 1-1.32 1.5L19 11.54V19a2 2 0 0 1-2 2h-3.5a1 1 0 0 1-1-1v-4.25h-1V20a1 1 0 0 1-1 1H7a2 2 0 0 1-2-2v-7.46L3.64 12.66a1 1 0 1 1-1.32-1.5l9-7.88Z"/></svg>',
    search: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="7"></circle><path d="M20 20l-3.5-3.5"></path></svg>',
    bell: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M18 8a6 6 0 00-12 0c0 7-3 7-3 7h18s-3 0-3-7"></path><path d="M13.7 21a2 2 0 01-3.4 0"></path></svg>'
  };
  const AUTH_STORAGE_KEY = 'hzdz_login_user';
  const AUTH_SESSION_KEY = 'hzdz_login_user_session';
  const AUTH_LAST_USER_KEY = 'hzdz_login_last_user';
  const escapeHtml = (value) => `${value ?? ''}`
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');

  const resolveTopbarUser = () => {
    try {
      const sessionUser = (sessionStorage.getItem(AUTH_SESSION_KEY) || '').trim();
      if (sessionUser) return sessionUser;
    } catch (error) {}

    let rememberedUser = '';
    try {
      const raw = (localStorage.getItem(AUTH_STORAGE_KEY) || '').trim();
      if (raw) {
        if (!raw.startsWith('{')) {
          rememberedUser = raw;
        } else {
          const parsed = JSON.parse(raw);
          const account = parsed && typeof parsed.account === 'string' ? parsed.account.trim() : '';
          const expiresAt = parsed && typeof parsed.expiresAt === 'number' ? parsed.expiresAt : null;
          if (account) {
            if (expiresAt != null && expiresAt <= Date.now()) {
              localStorage.removeItem(AUTH_STORAGE_KEY);
            } else {
              rememberedUser = account;
            }
          }
        }
      }
    } catch (error) {}
    if (rememberedUser) return rememberedUser;

    try {
      const lastUser = (localStorage.getItem(AUTH_LAST_USER_KEY) || '').trim();
      if (lastUser) return lastUser;
    } catch (error) {}

    return 'admin';
  };

  const navItem = (label, active, href = 'javascript:void(0)') => {
    const isActive = label === active ? ' active' : '';
    return `<a class="nav-item${isActive}" href="${href}">${label}</a>`;
  };
  const APP_VERSION = '20260322j';
  const HOME_PAGE_HREF = `../../../index.html?v=${APP_VERSION}`;
  const withVersion = (path) => `${path}?v=${APP_VERSION}`;

  const topbar = (brand) => `
    <header class="topbar">
      <div class="brand">${brand}</div>
      <div class="topbar-actions">
        ${((pageId || '').startsWith('mobile-'))
          ? `
            <a class="topbar-home-link" href="${HOME_PAGE_HREF}" aria-label="返回首页" title="返回首页">${icons.homeFilled}</a>
            <div class="user user-account-chip"><span>账户：</span><strong>${escapeHtml(resolveTopbarUser())}</strong></div>
          `
          : `
            <button class="icon-btn" aria-label="首页">${icons.home}</button>
            <div class="search">
              <input type="text" placeholder="请输入">
              <button class="icon-btn" aria-label="搜索">${icons.search}</button>
            </div>
            <button class="icon-btn" aria-label="通知">${icons.bell}</button>
            <div class="user">用户名admin</div>
          `}
      </div>
    </header>
  `;

  const sidebarEco = (active) => `
    <aside class="sidebar">
      <div class="nav-group">
        <div class="nav-title">电站信息管理</div>
        ${navItem('电站管理', active)}
      </div>
      <div class="nav-group">
        <div class="nav-title">物模型总览</div>
        ${navItem('资源空间管理', active)}
        ${navItem('产品管理', active)}
        ${navItem('设备管理', active)}
      </div>
    </aside>
  `;

  const sidebarMobile = (active, options = {}) => {
    const showLocation = options.showLocation !== false;
    const mobileNavHrefMap = {
      车辆信息: withVersion('./vehicle-info.html'),
      车辆位置: withVersion('./mobile-green-energy-dashboard.html'),
      企业信息建档: withVersion('./project-info.html'),
      工单管理: withVersion('./work-order-list.html'),
      调度管理: withVersion('./dispatch-list.html'),
      订单管理: withVersion('./order-list.html'),
      当前告警: withVersion('./alarm-alerts.html'),
      全部告警: withVersion('./alarm-history.html')
    };
    const mobileHref = (label) => mobileNavHrefMap[label] || 'javascript:void(0)';
    return `
      <aside class="sidebar">
        <div class="nav-group">
          <div class="nav-title">车辆管理</div>
          ${navItem('车辆信息', active, mobileHref('车辆信息'))}
          ${showLocation ? navItem('车辆位置', active, mobileHref('车辆位置')) : ''}
        </div>
        <div class="nav-group">
          <div class="nav-title">信息配置</div>
          ${navItem('企业信息建档', active, mobileHref('企业信息建档'))}
        </div>
        <div class="nav-group">
          <div class="nav-title">调度管理</div>
          ${navItem('工单管理', active, mobileHref('工单管理'))}
          ${navItem('调度管理', active, mobileHref('调度管理'))}
          ${navItem('订单管理', active, mobileHref('订单管理'))}
        </div>
        <div class="nav-group">
          <div class="nav-title">告警管理</div>
          ${navItem('当前告警', active, mobileHref('当前告警'))}
          ${navItem('全部告警', active, mobileHref('全部告警'))}
        </div>
      </aside>
    `;
  };

  const sidebarHez = (active) => `
    <aside class="hz-sidebar">
      <div class="nav-group">
        ${navItem('监控', active)}
        ${navItem('数据看板', active)}
        ${navItem('数据大屏', active)}
        ${navItem('场站', active)}
        ${navItem('设备', active)}
        ${navItem('报警', active)}
        ${navItem('视频', active)}
        ${navItem('报表', active)}
        ${navItem('AI智能分析', active)}
        ${navItem('服务应用', active)}
      </div>
    </aside>
  `;

  const layout = (brand, sidebar, content) => `
    <div class="layout">
      ${topbar(brand)}
      ${sidebar}
      <main class="content">
        ${content}
      </main>
    </div>
  `;

  const table = (headers, rows) => {
    const head = headers.map((header) => `<th>${header}</th>`).join('');
    const body = rows
      .map((row) => `<tr>${row.map((cell) => `<td>${cell}</td>`).join('')}</tr>`)
      .join('');
    return `<table class="table"><thead><tr>${head}</tr></thead><tbody>${body}</tbody></table>`;
  };

  const pagination = () => `
    <div class="pager">
      <select class="select">
        <option>5</option>
        <option>10</option>
        <option>20</option>
      </select>
      <div class="pagination">
        <button class="page-btn page-btn-skip">&lsaquo;</button>
        <button class="page-btn">1</button>
        <button class="page-btn active">2</button>
        <button class="page-btn">3</button>
        <button class="page-btn">4</button>
        <button class="page-btn">5</button>
        <button class="page-btn page-btn-skip">&rsaquo;</button>
      </div>
    </div>
  `;

  const paginationNoSelect = () => `
    <div class="pager" data-pager>
      <div class="pagination" data-pages></div>
    </div>
  `;

  const linkBtn = (label, toast) => `<button class="link-btn" data-toast="${toast || '已点击'}">${label}</button>`;
  const checkbox = (checked) => `<input type="checkbox" ${checked ? 'checked' : ''}>`;
  const DEFAULT_WORKORDER_CATALOG = [];
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
  window.defaultWorkorderCatalog = DEFAULT_WORKORDER_CATALOG.map((item) => ({ ...item }));
  window.defaultVehicleCatalog = DEFAULT_VEHICLE_CATALOG.map((item) => ({ ...item }));

  const pages = {
    'api-list': () => {
      const headers = [' ', 'ID', 'API名称', '协议方法', '服务', '状态', '创建时间', '归属应用', '操作'];
      const rows = [
        [checkbox(true), '569089', '测试应用', 'POST', '电站监控服务', '正常', '2026/03/07 16:58:16 GMT+08:00', '应用1', `${linkBtn('详情')} ${linkBtn('删除', '已删除')}`],
        [checkbox(true), '569089', '测试应用', 'GET', '电站监控服务', '申请中', '2026/03/07 16:58:16 GMT+08:00', '应用2', `${linkBtn('详情')} ${linkBtn('删除', '已删除')}`]
      ];
      const content = `
        <div class="page-title">API列表</div>
        <div class="toolbar">
          <div class="field">
            <label>API名称</label>
            <input class="input" placeholder="请输入">
          </div>
          <div class="field">
            <label>归属应用</label>
            <select class="select">
              <option>应用1</option>
              <option>应用2</option>
            </select>
          </div>
          <button class="btn btn-icon" aria-label="搜索">${icons.search}</button>
          <div class="spacer"></div>
          <button class="btn btn-primary" data-open="modal-api-apply">申请API</button>
        </div>
        <div class="card table-card">${table(headers, rows)}</div>
        ${pagination()}
        <div class="modal-backdrop" id="modal-api-apply">
          <div class="modal">
            <h3>申请API</h3>
            <div class="field">
              <label>申请说明</label>
              <input class="input lg" placeholder="请输入说明">
            </div>
            <div class="modal-actions">
              <button class="btn btn-ghost" data-close>取消</button>
              <button class="btn btn-primary" data-toast="申请已提交" data-close>提交</button>
            </div>
          </div>
        </div>
      `;
      return layout('南网生态设备管理平台', sidebarEco('产品管理'), content);
    },

    'api-app-list': () => {
      const headers = [' ', '服务', 'API名称', '说明', '请求方式', '接口地址', '其他'];
      const rows = [
        [checkbox(true), '电站监控服务', '获取用户信息', '通过user_access_token获取登录用户的信息。', 'GET / POST', '/api/v1/device/realdata', linkBtn('详情')],
        [checkbox(true), '电站监控服务', '获取用户信息', '通过user_access_token获取登录用户的信息。', 'GET / POST', '/api/v1/device/realdata', linkBtn('详情')]
      ];
      const content = `
        <div class="page-title">单个应用内的API列表</div>
        <div class="toolbar">
          <div class="field">
            <label>服务</label>
            <select class="select">
              <option>电站</option>
              <option>储能</option>
            </select>
          </div>
          <div class="field">
            <label>API名称</label>
            <input class="input" placeholder="请输入">
          </div>
          <button class="btn btn-icon" aria-label="搜索">${icons.search}</button>
        </div>
        <div class="card table-card">${table(headers, rows)}</div>
        <div class="toolbar" style="justify-content:flex-end;">
          <button class="btn btn-primary" data-toast="提交成功">提交申请</button>
        </div>
      `;
      return layout('南网生态设备管理平台', sidebarEco('产品管理'), content);
    },

    'api-apply': () => {
      const headers = [' ', '服务', 'API名称', '说明', '请求方式', '接口地址', '其他'];
      const rows = [
        [checkbox(true), '电站监控服务', '获取用户信息', '通过user_access_token获取登录用户的信息。', 'GET / POST', '/open-apis/authen/v1/user_info', linkBtn('详情')],
        [checkbox(false), '电站监控服务', '获取用户信息', '通过user_access_token获取登录用户的信息。', 'GET / POST', '/open-apis/authen/v1/user_info', linkBtn('详情')]
      ];
      const content = `
        <div class="page-title">申请API</div>
        <div class="toolbar">
          <div class="field">
            <label>服务</label>
            <select class="select">
              <option>电站</option>
              <option>储能</option>
            </select>
          </div>
          <div class="field">
            <label>API名称</label>
            <input class="input" placeholder="请输入">
          </div>
          <button class="btn btn-icon" aria-label="搜索">${icons.search}</button>
        </div>
        <div class="card table-card">${table(headers, rows)}</div>
        <div class="toolbar" style="justify-content:flex-end;">
          <button class="btn btn-primary" data-toast="已提交">提交申请</button>
        </div>
      `;
      return layout('南网生态设备管理平台', sidebarEco('产品管理'), content);
    },

    'api-detail': () => {
      const requestHeaders = table(
        ['名称', '值'],
        [['Content-Type', 'application/x-www-form-urlencoded']]
      );
      const requestParams = table(
        ['名称', '必填', '类型', '说明'],
        [['Content-Type', '是', 'string', 'APP key']]
      );
      const responseParams = table(
        ['名称', '必填', '类型', '说明'],
        [['Content-Type', '是', 'string', 'APP key']]
      );
      const statusParams = table(
        ['名称', '值'],
        [['成功', '200'], ['未授权', '401']]
      );
      const content = `
        <div class="page-title">API详情页</div>
        <div class="tabs">
          <button class="tab active" data-tab="tab-doc">查看文档</button>
          <button class="tab" data-tab="tab-debug">调试界面</button>
        </div>
        <div class="tab-panel is-active" id="tab-doc">
          <div class="card table-card">
            <div class="toolbar">
              <div class="field"><label>API名称</label><span>测试API</span></div>
              <div class="field"><label>版本号</label><span>V1</span></div>
            </div>
            <div class="toolbar" style="align-items:flex-start;">
              <div style="flex:1; min-width:260px;">
                <div class="section-title">接口地址</div>
                <div class="field" style="align-items:flex-start;">
                  <span style="font-size:12px; color:#667085; line-height:1.6;">https://space-hkmwek.../open-apis/authen/v1/user_info</span>
                </div>
                <div class="section-title">请求方式</div>
                <div class="field"><span>GET</span></div>
                <div class="section-title">返回类型</div>
                <div class="field"><span>json</span></div>
                <div class="section-title">接口调用说明</div>
                <div style="font-size:12px; color:#667085; line-height:1.6;">
                  <div>如果为第三方使用：</div>
                  <div>1. 企业内部应用：申请获取企业内部应用accessToken接口，获取企业应用接口的凭证信息。</div>
                  <div>2. 第三方企业应用：调用获取第三方应用授权企业的accessToken接口，获取第三方应用授权企业应用接口的凭证信息。</div>
                </div>
                <div class="section-title">返回结果示例</div>
                <pre style="background:#1f2430; color:#e7edf7; padding:12px; border-radius:8px; font-size:12px;">{
  "resultCode": "200",
  "reason": "SUCCEEDED",
  "error_code": 0,
  "result": [
    { "name": "张江", "pinyin": "zhangjiang" },
    { "name": "石河子", "pinyin": "shihezi" }
  ]
}</pre>
              </div>
              <div style="flex:1; min-width:260px;">
                <div class="section-title">请求header</div>
                ${requestHeaders}
                <div class="section-title">请求参数</div>
                ${requestParams}
                <div class="section-title">返回参数</div>
                ${responseParams}
                <div class="section-title">响应状态参数</div>
                ${statusParams}
              </div>
            </div>
          </div>
        </div>
        <div class="tab-panel" id="tab-debug">
          <div class="card table-card">
            <div class="section-title">调试请求</div>
            <div class="toolbar">
              <div class="field"><label>请求方式</label><select class="select"><option>GET</option><option>POST</option></select></div>
              <div class="field"><label>请求地址</label><input class="input xl" value="/open-apis/authen/v1/user_info"></div>
              <button class="btn btn-primary" data-toast="已发送">发送</button>
            </div>
            <div class="section-title">响应结果</div>
            <pre style="background:#f5f7fb; padding:12px; border-radius:8px; font-size:12px;">{ "code": 200, "message": "OK" }</pre>
          </div>
        </div>
      `;
      return layout('南网生态设备管理平台', sidebarEco('产品管理'), content);
    },
    'custom-api-list': () => {
      const headers = ['ID', '名称', '状态', '协议方法', 'URL', '创建时间', '更新时间', '操作'];
      const rows = [
        ['53243263', '测试API', '<span style="color:#1bb977;">已发布</span>', 'POST', 'https://space-hkmwek', '2026-03-11 23:26:44', '2026-03-11 23:26:44', `${linkBtn('编辑')} ${linkBtn('删除', '已删除')}`]
      ];
      const content = `
        <div class="page-title">自定义API</div>
        <div class="tabs">
          <button class="tab active" data-tab="tab-custom-list">自定义API列表</button>
          <button class="tab" data-tab="tab-custom-add">添加API</button>
        </div>
        <div class="tab-panel is-active" id="tab-custom-list">
          <div class="card table-card">${table(headers, rows)}</div>
        </div>
        <div class="tab-panel" id="tab-custom-add">
          <div class="card table-card">
            <div class="toolbar">
              <div class="field"><label>API名称</label><input class="input" placeholder="请输入"></div>
              <div class="field"><label>接口地址</label><input class="input xl" placeholder="请输入"></div>
              <div class="field"><label>请求方式</label><select class="select"><option>HTTP</option><option>HTTPS</option></select></div>
              <div class="field"><select class="select"><option>GET</option><option>POST</option></select></div>
              <button class="btn btn-primary" data-toast="已保存">保存</button>
            </div>
          </div>
        </div>
      `;
      return layout('南网生态设备管理平台', sidebarEco('产品管理'), content);
    },

    'custom-api-detail': () => {
      const requestHeaderTable = table(
        ['标签', '类型', '说明', '参数示例', '操作'],
        [['Accept', 'json', '说明', '-', linkBtn('删除', '已删除')]]
      );
      const responseHeaderTable = table(
        ['标签', '类型', '说明', '参数示例', '操作'],
        [['Content-Type', 'json', '说明', '-', linkBtn('删除', '已删除')]]
      );
      const responseTable = table(
        ['参数名', '类型', '必填', '说明', '参数示例', '操作'],
        [['resultCode', 'string', '是', '结果码', '200', linkBtn('删除', '已删除')]]
      );
      const content = `
        <div class="page-title">自定义API详细页面</div>
        <div class="toolbar">
          <div class="field"><label>API名称</label><input class="input" placeholder="请输入"></div>
          <div class="field"><label>接口地址</label><input class="input xl" placeholder="请输入"></div>
        </div>
        <div class="toolbar">
          <div class="field"><label>请求方式</label><select class="select"><option>HTTP</option><option>HTTPS</option></select></div>
          <div class="field"><select class="select"><option>GET</option><option>POST</option></select></div>
          <div class="field"><label>状态</label></div>
          <div class="field">
            <label><input type="radio" name="status" checked> 已发布</label>
            <label><input type="radio" name="status"> 设计中</label>
            <label><input type="radio" name="status"> 废弃</label>
          </div>
        </div>
        <div class="toolbar">
          <div class="field"><label>详细说明</label><textarea class="textarea" placeholder="请输入"></textarea></div>
        </div>
        <div class="section-title">请求参数</div>
        <div class="tabs">
          <button class="tab active" data-tab="tab-request-header">请求头部</button>
          <button class="tab" data-tab="tab-request-body">请求体</button>
        </div>
        <div class="tab-panel is-active" id="tab-request-header">
          <div class="card table-card">${requestHeaderTable}</div>
        </div>
        <div class="tab-panel" id="tab-request-body">
          <div class="card table-card">${requestHeaderTable}</div>
        </div>
        <div class="section-title">返回头部</div>
        <div class="card table-card">${responseHeaderTable}</div>
        <div class="section-title">返回结果</div>
        <div class="toolbar">
          <input class="input" value="成功">
          <select class="select"><option>200</option><option>400</option></select>
          <select class="select"><option>JSON</option><option>XML</option></select>
          <select class="select"><option>OBJECT</option><option>ARRAY</option></select>
        </div>
        <div class="card table-card">${responseTable}</div>
      `;
      return layout('南网生态设备管理平台', sidebarEco('产品管理'), content);
    },

    'app-list': () => {
      const headers = [' ', '应用名称', 'AppID', '创建时间', '认证方式', 'AppSecret', '操作'];
      const rows = [
        [checkbox(true), '应用1', '06d8c1f1ce0514d6497fdb4f1a988636', '2026/03/07 16:58:16 GMT+08:00', 'API', '0194d7f975754b49408ac2ee22dec1eb', `${linkBtn('详情')} ${linkBtn('API')} ${linkBtn('删除', '已删除')}`],
        [checkbox(true), '应用2', '06d8c1f1ce0514d6497fdb4f1a988636', '2026/03/07 16:58:16 GMT+08:00', 'API', '0194d7f975754b49408ac2ee22dec1eb', `${linkBtn('详情')} ${linkBtn('API')} ${linkBtn('删除', '已删除')}`]
      ];
      const content = `
        <div class="page-title">我的应用</div>
        <div class="toolbar">
          <button class="btn btn-outline" data-open="modal-new-app">创建新应用</button>
        </div>
        <div class="card table-card">${table(headers, rows)}</div>
        ${pagination()}
        <div class="modal-backdrop" id="modal-new-app">
          <div class="modal">
            <h3>创建新应用</h3>
            <div class="field"><label>应用名称</label><input class="input" placeholder="请输入"></div>
            <div class="field"><label>认证方式</label><select class="select"><option>API</option><option>JWT</option></select></div>
            <div class="modal-actions">
              <button class="btn btn-ghost" data-close>取消</button>
              <button class="btn btn-primary" data-toast="应用已创建" data-close>确认</button>
            </div>
          </div>
        </div>
      `;
      return layout('南网生态设备管理平台', sidebarEco('产品管理'), content);
    },

    'model-list': () => {
      const headers = ['产品名称', '产品ID', '资源空间', '设备类型', '协议类型', '创建时间', '操作'];
      const rows = [
        ['逆变器', '69ad184418855b39c5009e60', 'DefaultApp_69acgaic', '逆变器', 'MQTT', '2026/03/08 14:33:40 GMT+08:00', `${linkBtn('详情')} ${linkBtn('管理设备')} ${linkBtn('删除', '已删除')}`],
        ['路灯', '69ad15cd18855b39c5009ccf', 'DefaultApp_69acgaic', 'smokeDetector', 'MQTT', '2026/03/08 14:33:40 GMT+08:00', `${linkBtn('详情')} ${linkBtn('管理设备')} ${linkBtn('删除', '已删除')}`]
      ];
      const content = `
        <div class="page-title">物模型列表</div>
        <div class="toolbar">
          <button class="btn btn-outline" data-open="modal-create-product">创建产品</button>
          <button class="btn btn-ghost" data-toast="已删除">删除</button>
          <div class="field" style="margin-left:8px;">
            <input class="input xl" placeholder="按照产品名称搜索">
          </div>
          <button class="btn btn-icon" aria-label="搜索">${icons.search}</button>
        </div>
        <div class="card table-card">${table(headers, rows)}</div>
        ${pagination()}
        <div class="modal-backdrop" id="modal-create-product">
          <div class="modal">
            <h3>创建产品</h3>
            <div class="field"><label>产品名称</label><input class="input" placeholder="请输入"></div>
            <div class="field"><label>设备类型</label><input class="input" placeholder="请输入"></div>
            <div class="modal-actions">
              <button class="btn btn-ghost" data-close>取消</button>
              <button class="btn btn-primary" data-toast="创建成功" data-close>创建</button>
            </div>
          </div>
        </div>
      `;
      return layout('南网生态设备管理平台', sidebarEco('产品管理'), content);
    },

    'model-detail': () => {
      const attrTable = table(
        [' ', '属性名称', '数据类型', '访问方式', '描述', '操作'],
        [
          [checkbox(true), '1', 'int(整型)', '可读', '电压', `${linkBtn('详情')} ${linkBtn('删除', '已删除')}`],
          [checkbox(false), '2', 'long(长整型)', '可读', '电流', `${linkBtn('详情')} ${linkBtn('删除', '已删除')}`]
        ]
      );
      const commandTable = table(
        [' ', '命令名称', '下发参数', '响应参数', '描述', '操作'],
        [
          [checkbox(true), '1', 'int(整型)', '可读', '电压', `${linkBtn('详情')} ${linkBtn('删除', '已删除')}`],
          [checkbox(false), '2', 'long(长整型)', '可读', '电流', `${linkBtn('详情')} ${linkBtn('删除', '已删除')}`]
        ]
      );
      const eventTable = table(
        [' ', '事件名称', '事件类型', '数据类型', '描述', '操作'],
        [
          [checkbox(true), '1', '告警', 'int(整型)', '电压', `${linkBtn('详情')} ${linkBtn('删除', '已删除')}`],
          [checkbox(false), '2', '告警', 'long(长整型)', '电流', `${linkBtn('详情')} ${linkBtn('删除', '已删除')}`]
        ]
      );
      const content = `
        <div class="page-title">物模型产品详情</div>
        <div class="card table-card">
          <div class="section-title">产品详情</div>
          <div class="toolbar">
            <div class="field"><label>产品名称</label><span>逆变器</span></div>
            <div class="field"><label>所属资源空间</label><span>DefaultApp_69acgaic</span></div>
            <div class="field"><label>设备类型</label><span>逆变器</span></div>
          </div>
          <div class="toolbar">
            <div class="field"><label>协议类型</label><span>MQTT</span></div>
            <div class="field"><label>数据格式</label><span>json</span></div>
            <div class="field"><label>创建时间</label><span>2026/03/08 14:33:40 GMT+08:00</span></div>
          </div>
        </div>
        <div class="tabs">
          <button class="tab active" data-tab="tab-attr">属性</button>
          <button class="tab" data-tab="tab-topic">topic管理</button>
          <button class="tab" data-tab="tab-debug">调试</button>
        </div>
        <div class="tab-panel is-active" id="tab-attr">
          <div class="toolbar">
            <button class="btn btn-outline" data-toast="已新增">新增属性</button>
            <button class="btn btn-ghost" data-toast="已删除">删除</button>
          </div>
          <div class="card table-card">${attrTable}</div>
          <div class="toolbar">
            <button class="btn btn-outline" data-toast="已新增">新增命令</button>
            <button class="btn btn-ghost" data-toast="已删除">删除</button>
          </div>
          <div class="card table-card">${commandTable}</div>
          <div class="toolbar">
            <button class="btn btn-outline" data-toast="已新增">新增事件</button>
            <button class="btn btn-ghost" data-toast="已删除">删除</button>
          </div>
          <div class="card table-card">${eventTable}</div>
        </div>
        <div class="tab-panel" id="tab-topic">
          <div class="card table-card">
            <div class="section-title">Topic列表</div>
            <div class="field">暂无配置</div>
          </div>
        </div>
        <div class="tab-panel" id="tab-debug">
          <div class="card table-card">
            <div class="section-title">调试</div>
            <div class="field">请选择设备进行调试</div>
          </div>
        </div>
      `;
      return layout('南网生态设备管理平台', sidebarEco('产品管理'), content);
    },
    'station-info': () => {
      const headers = ['场站名称', '通讯', '报警', '光伏装机容量', '光伏发电功率', '当日功率百分比(%)', '当日光伏发电量', '当日等效小时', '当日光伏发电量', '电站ID', '离线小时(近7日)', '操作'];
      const rows = [
        ['上鹤中心幼儿园', '<span class="status-dot status-ok"></span>', '<span class="status-dot status-bad"></span>', '218.5kWp', '52.06kW', '23.82%', '218.5kWp', '0.94h', '7193.1kwh', '#32132524', '16.3h', `${linkBtn('详情')}`],
        ['宁夏腾格里沙漠新能源基地', '<span class="status-dot status-ok"></span>', '<span class="status-dot status-ok"></span>', '218.5kWp', '52.06kW', '23.82%', '218.5kWp', '0.94h', '7193.1kwh', '#32132524', '16.3h', `${linkBtn('详情')}`]
      ];
      const content = `
        <div class="page-title">电站信息管理</div>
        <div class="toolbar">
          <div class="field"><label>电站名称</label><input class="input" placeholder="请输入"></div>
          <div class="field"><label>电站类型</label><select class="select"><option>集中式</option><option>分布式</option></select></div>
          <div class="field"><label>电站类型</label><select class="select"><option>家用屋顶</option><option>工商业</option></select></div>
          <button class="btn" data-toast="已搜索">搜索</button>
          <div class="spacer"></div>
          <button class="btn btn-outline" data-open="modal-add-station">添加</button>
        </div>
        <div class="card table-card">${table(headers, rows)}</div>
        ${pagination()}
        <div class="modal-backdrop" id="modal-add-station">
          <div class="modal">
            <h3>新增电站</h3>
            <div class="field"><label>电站名称</label><input class="input" placeholder="请输入"></div>
            <div class="field"><label>电站类型</label><select class="select"><option>集中式</option><option>分布式</option></select></div>
            <div class="modal-actions">
              <button class="btn btn-ghost" data-close>取消</button>
              <button class="btn btn-primary" data-toast="新增成功" data-close>保存</button>
            </div>
          </div>
        </div>
      `;
      return layout('南网生态设备管理平台', sidebarEco('电站管理'), content);
    },

    'device-list': () => {
      const headers = [' ', '状态', '设备名称', '设备标识码', '设备ID', '所属资源空间', '所属产品', '操作'];
      const rows = [
        [checkbox(true), '在线', '逆变器1', 'myNodeId', '69ad1841885b39c5009e60_myNodeId', 'DefaultApp_69acgaic', '逆变器', `${linkBtn('详情')} ${linkBtn('获取设备数据')} ${linkBtn('删除', '已删除')}`],
        [checkbox(false), '离线', '感应灯', 'myNodeId', '69ad1841885b39c5009e60_myNodeId', 'DefaultApp_69acgaic', '路灯', `${linkBtn('详情')} ${linkBtn('获取设备数据')} ${linkBtn('删除', '已删除')}`]
      ];
      const content = `
        <div class="page-title">设备管理</div>
        <div class="toolbar">
          <button class="btn btn-outline" data-open="modal-register-device">注册设备</button>
          <button class="btn btn-ghost" data-toast="已删除">删除</button>
          <div class="field" style="margin-left:8px;">
            <input class="input xl" placeholder="按照设备名称搜索">
          </div>
          <button class="btn btn-icon" aria-label="搜索">${icons.search}</button>
        </div>
        <div class="card table-card">${table(headers, rows)}</div>
        ${pagination()}
        <div class="modal-backdrop" id="modal-register-device">
          <div class="modal">
            <h3>注册设备</h3>
            <div class="field"><label>设备名称</label><input class="input" placeholder="请输入"></div>
            <div class="field"><label>所属产品</label><select class="select"><option>逆变器</option><option>路灯</option></select></div>
            <div class="modal-actions">
              <button class="btn btn-ghost" data-close>取消</button>
              <button class="btn btn-primary" data-toast="注册成功" data-close>注册</button>
            </div>
          </div>
        </div>
      `;
      return layout('南网生态设备管理平台', sidebarEco('设备管理'), content);
    },

    'resource-space': () => {
      const headers = [' ', '空间名称', 'APPID', '创建时间', '产品数量', '设备数量'];
      const rows = [
        [checkbox(true), '在线', 'e6f9cfd09b694aa897b33ea195a5c0f6', '2026/03/07 16:58:16 GMT+08:00', '2', '2']
      ];
      const content = `
        <div class="page-title">资源空间</div>
        <div class="toolbar">
          <button class="btn btn-outline" data-open="modal-create-space">新建资源空间</button>
          <div class="field" style="margin-left:8px;">
            <input class="input xl" placeholder="按照设备名称搜索">
          </div>
          <button class="btn btn-icon" aria-label="搜索">${icons.search}</button>
        </div>
        <div class="card table-card">${table(headers, rows)}</div>
        ${pagination()}
        <div class="modal-backdrop" id="modal-create-space">
          <div class="modal">
            <h3>新建资源空间</h3>
            <div class="field"><label>空间名称</label><input class="input" placeholder="请输入"></div>
            <div class="modal-actions">
              <button class="btn btn-ghost" data-close>取消</button>
              <button class="btn btn-primary" data-toast="创建成功" data-close>创建</button>
            </div>
          </div>
        </div>
      `;
      return layout('南网生态设备管理平台', sidebarEco('资源空间管理'), content);
    },

    'iotda-flow': () => {
      return `
        <div class="flow-page">
          <div class="flow">
            <div class="flow-step">创建资源区域</div>
            <div class="flow-arrow"><span class="flow-dot"></span></div>
            <div class="flow-step">创建产品（物模型）</div>
            <div class="flow-arrow"><span class="flow-dot"></span></div>
            <div class="flow-step">编辑属性 命令</div>
            <div class="flow-arrow"><span class="flow-dot"></span></div>
            <div class="flow-step">管理下属设备</div>
          </div>
        </div>
      `;
    },

    'bind-platform': () => {
      const content = `
        <div class="hz-layout">
          <div class="hz-topbar">
            <div style="font-weight:600;">赫兹电站平台 <span style="font-size:12px; margin-left:8px; color:#666;">数据看板</span></div>
            <div style="font-size:12px; color:#666;">2026-03-19 07:48:28 UTC+08:00</div>
          </div>
          <div class="hz-container">
            ${sidebarHez('数据看板')}
            <main class="hz-content">
              <div class="hz-card">
                <div class="section-title">运营情况概览</div>
                <div class="toolbar">
                  <div class="field"><label>总发电量</label><span>2498.49 GWh</span></div>
                  <div class="field"><label>今日发电</label><span>--</span></div>
                  <div class="field"><label>累计收益</label><span>--</span></div>
                </div>
              </div>
              <div class="hz-grid">
                <div class="hz-card">
                  <div class="section-title">场站分布</div>
                  <div style="height:220px; background:#f3f4f9; border-radius:8px; display:flex; align-items:center; justify-content:center; color:#9aa3b2;">地图区域</div>
                </div>
                <div class="hz-card">
                  <div class="section-title">告警统计</div>
                  <div class="toolbar" style="flex-direction:column; align-items:flex-start; gap:6px;">
                    <div class="field"><span class="status-dot status-warning"></span>告警总数 30</div>
                    <div class="field"><span class="status-dot status-ok"></span>已处理 0</div>
                    <div class="field"><span class="status-dot status-bad"></span>待处理 0</div>
                  </div>
                </div>
              </div>
              <div class="hz-card">
                <div class="section-title">消耗小时</div>
                <div style="height:140px; display:flex; align-items:flex-end; gap:12px;">
                  <div style="width:26px; height:60px; background:#4a78ec; border-radius:4px 4px 0 0;"></div>
                  <div style="width:26px; height:80px; background:#4a78ec; border-radius:4px 4px 0 0;"></div>
                  <div style="width:26px; height:100px; background:#4a78ec; border-radius:4px 4px 0 0;"></div>
                  <div style="width:26px; height:70px; background:#4a78ec; border-radius:4px 4px 0 0;"></div>
                </div>
              </div>
            </main>
          </div>
          <div class="hz-overlay">
            <div class="hz-modal">
              <h3>绑定能管平台账号</h3>
              <div class="tabs">
                <button class="tab active" data-tab="hz-phone">手机号登录</button>
                <button class="tab" data-tab="hz-email">邮箱</button>
                <button class="tab" data-tab="hz-user">用户名</button>
              </div>
              <div class="tab-panel is-active" id="hz-phone">
                <div class="auth-field"><input type="text" placeholder="请输入手机号"></div>
                <div class="auth-field"><input id="hz-pass" type="password" placeholder="请输入密码"></div>
                <div class="auth-helper"><input type="checkbox" checked>记住密码</div>
                <button class="auth-submit" data-toast="登录成功">登录</button>
              </div>
              <div class="tab-panel" id="hz-email">
                <div class="auth-field"><input type="text" placeholder="请输入邮箱"></div>
                <div class="auth-field"><input type="password" placeholder="请输入密码"></div>
                <button class="auth-submit" data-toast="登录成功">登录</button>
              </div>
              <div class="tab-panel" id="hz-user">
                <div class="auth-field"><input type="text" placeholder="请输入用户名"></div>
                <div class="auth-field"><input type="password" placeholder="请输入密码"></div>
                <button class="auth-submit" data-toast="登录成功">登录</button>
              </div>
            </div>
          </div>
        </div>
      `;
      return content;
    },
    'login-phone': () => `
      <div class="auth-shell">
        <div class="auth-hero">Hi, 你好！<br>欢迎进入赫兹电站管理系统</div>
        <div class="auth-card">
          <h2>登录</h2>
          <div class="sub">手机号登录</div>
          <div class="auth-field"><input type="text" placeholder="请输入手机号"></div>
          <div class="auth-field"><input id="login-pass" type="password" placeholder="请输入密码(6-16位字母加数字)"></div>
          <div class="auth-helper"><input type="checkbox" checked>记住密码</div>
          <button class="auth-submit" data-toast="登录成功">登录</button>
          <div class="auth-actions">
            <a href="javascript:void(0)">注册账号</a>
            <a href="javascript:void(0)">忘记密码?</a>
          </div>
        </div>
      </div>
    `,

    'register': () => `
      <div class="auth-shell">
        <div class="auth-hero">Hi, 你好！<br>欢迎进入赫兹电站管理系统</div>
        <div class="auth-card">
          <h2>注册</h2>
          <div class="sub">手机号注册</div>
          <div class="auth-field"><input type="text" placeholder="请输入手机号"></div>
          <div class="auth-field"><input type="password" placeholder="请输入验证码"></div>
          <div class="auth-field"><input id="reg-pass" type="password" placeholder="请输入密码"></div>
          <div class="auth-field"><input type="password" placeholder="请确认密码"></div>
          <button class="auth-submit" data-toast="注册成功">注册</button>
          <div class="auth-actions">
            <a href="javascript:void(0)">返回登录</a>
            <a href="javascript:void(0)">已有账号?</a>
          </div>
        </div>
      </div>
    `,

    'reset-password': () => `
      <div class="auth-shell">
        <div class="auth-hero">Hi, 你好！<br>欢迎进入赫兹电站管理系统</div>
        <div class="auth-card">
          <h2>重置密码</h2>
          <div class="sub">手机号找回</div>
          <div class="auth-field"><input type="text" placeholder="请输入手机号"></div>
          <div class="auth-field"><input type="password" placeholder="请输入验证码"></div>
          <div class="auth-field"><input type="password" placeholder="请输入新密码"></div>
          <button class="auth-submit" data-toast="已重置">提交</button>
          <div class="auth-actions">
            <a href="javascript:void(0)">返回登录</a>
            <a href="javascript:void(0)">联系客服</a>
          </div>
        </div>
      </div>
    `,

    'energy-dashboard': () => `
      <div class="dashboard-header">
        <div class="dashboard-title">
          <div style="width:34px; height:34px; border-radius:10px; background:#1f6bff; display:flex; align-items:center; justify-content:center;">⚡</div>
          <div>
            <div>生态移动绿电平台</div>
            <div style="font-size:11px; color:#8da3c7;">Energy Management System v1.0 | 2026-03-12 15:52:06</div>
          </div>
        </div>
        <div class="dashboard-stat">
          <div>今日总耗电量<br><span class="value">42,890</span> kWh</div>
          <div>实时绿电占比<br><span class="value" style="color:#2bd48f;">68.2</span> %</div>
          <div>今日碳排放<br><span class="value" style="color:#f3b04b;">12.5</span> t</div>
        </div>
        <div style="font-size:12px; color:#8da3c7;">厂区环境 24°C | 45%</div>
      </div>
      <div class="dashboard">
        <div style="display:flex; flex-direction:column; gap:12px;">
          <div class="panel">
            <div class="section-title" style="color:#cfe0ff;">储能车实时调度</div>
            <div class="mini-stat">
              <div>储能车ES-M100-500 <span style="float:right; color:#2bd48f;">供电中</span></div>
              <div class="progress"><span style="width:78%;"></span></div>
              <div class="badge">SOC: 97.8% <span style="margin-left:auto;">78%</span></div>
            </div>
            <div class="mini-stat" style="margin-top:12px;">
              <div>储能车ES-M200-1000 <span style="float:right; color:#2b9bff;">充电中</span></div>
              <div class="progress"><span style="width:42%;"></span></div>
              <div class="badge">SOC: 97.8% <span style="margin-left:auto;">42%</span></div>
            </div>
            <div class="mini-stat" style="margin-top:12px;">
              <div>储能车ES-M300-1500 <span style="float:right; color:#ff6b6b;">电量低</span></div>
              <div class="progress"><span style="width:12%; background:linear-gradient(90deg, #ff6b6b, #ffb86b);"></span></div>
              <div class="badge">SOC: 97.8% <span style="margin-left:auto;">12%</span></div>
            </div>
            <div class="mini-stat" style="margin-top:12px;">
              <div>储能车ES-M400-2000 <span style="float:right; color:#8da3c7;">待命中</span></div>
              <div class="progress"><span style="width:95%;"></span></div>
              <div class="badge">SOC: 97.8% <span style="margin-left:auto;">95%</span></div>
            </div>
          </div>
          <div class="panel">
            <div class="section-title" style="color:#cfe0ff;">车能量调度统计</div>
            <div style="display:flex; justify-content:space-between; font-size:12px; color:#8da3c7;">
              <div>累计需求量 (MWh)</div>
              <div>调度次数 (次)</div>
            </div>
            <div style="display:flex; justify-content:space-between; font-size:16px; margin:8px 0 12px;">
              <div>1,248.5</div>
              <div>3,642</div>
            </div>
            <div style="height:140px; display:flex; align-items:flex-end; gap:8px;">
              <div style="width:28px; height:60px; background:#2f6cf6; border-radius:4px 4px 0 0;"></div>
              <div style="width:28px; height:80px; background:#2f6cf6; border-radius:4px 4px 0 0;"></div>
              <div style="width:28px; height:70px; background:#2f6cf6; border-radius:4px 4px 0 0;"></div>
              <div style="width:28px; height:90px; background:#2f6cf6; border-radius:4px 4px 0 0;"></div>
              <div style="width:28px; height:110px; background:#2f6cf6; border-radius:4px 4px 0 0;"></div>
              <div style="width:28px; height:85px; background:#2f6cf6; border-radius:4px 4px 0 0;"></div>
            </div>
          </div>
        </div>
        <div style="display:flex; flex-direction:column; gap:12px;">
          <div class="panel">
            <div class="section-title" style="color:#cfe0ff;">全国储能车布局</div>
            <div style="font-size:12px; color:#8da3c7;">实时在线 124 | 离线 34 | 调度中心 6</div>
            <div class="map-panel">中国区域地图</div>
            <div class="dashboard-grid">
              <div class="panel" style="padding:10px;">
                <div class="mini-stat">可供电量 kWh</div>
                <div class="mini-stat big">3,123.5</div>
                <div class="badge">状态: 平稳</div>
              </div>
              <div class="panel" style="padding:10px;">
                <div class="mini-stat">最大可调度功率</div>
                <div class="mini-stat big">823.1kW</div>
                <div class="badge">平均调度功率</div>
              </div>
              <div class="panel" style="padding:10px;">
                <div class="mini-stat">可调用车辆数</div>
                <div class="mini-stat big">3辆</div>
                <div class="badge">需求不足</div>
              </div>
            </div>
          </div>
          <div class="panel">
            <div class="section-title" style="color:#cfe0ff;">电量功率分析</div>
            <div class="toolbar" style="justify-content:flex-end;">
              <button class="btn btn-primary">电量</button>
              <button class="btn btn-ghost">功率</button>
            </div>
            <svg class="line-chart" viewBox="0 0 360 120" preserveAspectRatio="none">
              <polyline points="0,70 40,60 80,50 120,55 160,45 200,50 240,40 280,42 320,38 360,40" fill="none" stroke="#2f6cf6" stroke-width="2" />
              <polyline points="0,80 40,78 80,70 120,68 160,62 200,60 240,62 280,58 320,56 360,55" fill="none" stroke="#2bd48f" stroke-width="2" />
            </svg>
          </div>
        </div>
        <div style="display:flex; flex-direction:column; gap:12px;">
          <div class="panel">
            <div class="section-title" style="color:#cfe0ff;">2026年度减排贡献</div>
            <div class="mini-stat"><span class="badge">累计发电量</span> <span class="mini-stat big">48,290</span></div>
            <div class="mini-stat" style="margin-top:12px;"><span class="badge">节省标煤(t)</span> <span class="mini-stat big">15,420</span></div>
            <div style="margin-top:10px; font-size:12px; color:#f3b04b;">累计清洁能源贡献值 ￥3,428,000</div>
          </div>
          <div class="panel">
            <div class="section-title" style="color:#cfe0ff;">碳强度下降预测</div>
            <svg class="line-chart" viewBox="0 0 320 120" preserveAspectRatio="none">
              <polyline points="0,20 40,30 80,38 120,48 160,58 200,66 240,74 280,84 320,92" fill="none" stroke="#2bd48f" stroke-width="2" />
            </svg>
          </div>
          <div class="panel">
            <div class="section-title" style="color:#cfe0ff;">AI智能分析</div>
            <div style="font-size:12px; color:#8da3c7; line-height:1.6;">在近期电量波动中，建议调整离峰充电策略，适配高峰负荷供给，保障调度效率。</div>
          </div>
          <div class="panel" style="text-align:center;">
            <div class="section-title" style="color:#cfe0ff;">全网风光储能使用率</div>
            <div style="font-size:26px; font-weight:600; color:#dfe8ff;">65.5%</div>
            <div style="font-size:12px; color:#8da3c7;">增长 +14.2% | 降低 -28.5%</div>
          </div>
        </div>
      </div>
    `,

    'mobile-order-list': () => {
      const headers = ['订单ID', '调度ID', '企业名称', '需求类型', '企业地址', '创建时间', '运维车辆', '订单状态', '操作'];
      const rows = [];
      const orderTable = table(headers, rows).replace('<table class="table">', '<table class="table" data-order-table>');
      const content = `
        <div class="page-title">订单列表</div>
        <div class="toolbar">
          <div class="field"><label>企业名称</label><input class="input" data-filter-order-company placeholder="请输入"></div>
          <div class="field"><label>工单ID</label><input class="input" data-filter-order-id placeholder="请输入"></div>
          <div class="field"><label>调度ID</label><input class="input" data-filter-order-dispatch placeholder="请输入"></div>
          <div class="field"><label>订单状态</label><select class="select" data-filter-order-status><option value="">全部</option><option>在途</option><option>进行中</option><option>完成</option><option>已取消</option></select></div>
          <button class="btn" data-action="search-order">搜索</button>
          <button class="btn btn-ghost" data-action="reset-order-filters">重置</button>
          <div class="spacer"></div>
        </div>
        <div class="card table-card" data-paginated data-page-size="25">
          ${orderTable}
          ${paginationNoSelect()}
        </div>
        <div class="modal-backdrop" id="modal-order-detail">
          <div class="modal modal-xxl dispatch-task-modal order-detail-modal">
            <div class="dispatch-task-head">
              <div>
                <div class="dispatch-title">订单详情</div>
                <div class="dispatch-title-sub">订单由调度任务生成，以下信息仅供查看</div>
              </div>
              <span class="dispatch-task-chip">移动绿电订单</span>
            </div>
            <div class="dispatch-shell order-detail-shell" data-order-detail-shell data-order-detail-form>
              <div class="dispatch-main">
                <div class="dispatch-section-title">工单与订单信息</div>
                <div class="dispatch-form-grid">
                  <div class="dispatch-item"><label>订单ID</label><input class="input" data-order-field="orderId" readonly></div>
                  <div class="dispatch-item"><label>调度ID</label><input class="input" data-order-field="dispatchId" readonly></div>
                  <div class="dispatch-item"><label>工单ID</label><input class="input" data-order-field="workorderId" readonly></div>
                  <div class="dispatch-item"><label>工单类型</label><input class="input" data-order-field="orderType" readonly></div>
                  <div class="dispatch-item dispatch-item-full"><label>公司名称</label><input class="input" data-order-field="companyName" readonly></div>
                  <div class="dispatch-item"><label>联系人</label><input class="input" data-order-field="contactName" readonly></div>
                  <div class="dispatch-item"><label>公司ID</label><input class="input" data-order-field="companyId" readonly></div>
                  <div class="dispatch-item"><label>保电电量需求(kWh)</label><input class="input" data-order-field="energyDemand" readonly></div>
                  <div class="dispatch-item"><label>联系方式</label><input class="input" data-order-field="contactPhone" readonly></div>
                  <div class="dispatch-item"><label>保电开始时间</label><input class="input" data-order-field="startTime" readonly></div>
                  <div class="dispatch-item"><label>保电结束时间</label><input class="input" data-order-field="endTime" readonly></div>
                  <div class="dispatch-item"><label>保电用需功率(kW)</label><input class="input" data-order-field="requiredPower" readonly></div>
                  <div class="dispatch-item"><label>创建时间</label><input class="input" data-order-field="createdAt" readonly></div>
                  <div class="dispatch-item dispatch-item-full"><label>详细位置</label><textarea class="textarea detail-address-textarea" data-order-field="address" readonly></textarea></div>
                  <div class="dispatch-item dispatch-item-full" data-order-cancel-reason-row style="display:none;">
                    <label>取消原因</label>
                    <textarea class="textarea dispatch-note" data-order-field="cancelReason" readonly></textarea>
                  </div>
                  <div class="dispatch-item dispatch-item-full" data-order-cancel-image-row style="display:none;">
                    <label>取消图片</label>
                    <div class="order-cancel-image-wrap">
                      <img class="order-cancel-image" data-order-cancel-image alt="取消现场图片" style="display:none;">
                      <div class="order-cancel-image-empty" data-order-cancel-image-empty>暂无取消图片</div>
                    </div>
                  </div>
                  <div class="dispatch-item dispatch-item-full" data-order-failure-record-row style="display:none;">
                    <label>失败记录</label>
                    <div class="dispatch-failure-list" data-order-failure-list></div>
                  </div>
                </div>
              </div>
              <div class="order-power-card" data-order-power-module style="display:none;">
                <div class="dispatch-section-title">用电计算</div>
                <div class="order-power-grid">
                  <div class="dispatch-item"><label>任务时长(h)</label><input class="input" data-order-power-field="durationHours" readonly></div>
                  <div class="dispatch-item"><label>计划用电量(kWh)</label><input class="input" data-order-power-field="plannedEnergy" readonly></div>
                  <div class="dispatch-item"><label>实际用电量(kWh)</label><input class="input" data-order-power-field="actualEnergy" readonly></div>
                  <div class="dispatch-item"><label>平均输出功率(kW)</label><input class="input" data-order-power-field="averagePower" readonly></div>
                  <div class="dispatch-item"><label>峰值输出功率(kW)</label><input class="input" data-order-power-field="peakPower" readonly></div>
                  <div class="dispatch-item"><label>能量利用率(%)</label><input class="input" data-order-power-field="utilizationRate" readonly></div>
                  <div class="dispatch-item"><label>电量偏差(kWh)</label><input class="input" data-order-power-field="energyDeviation" readonly></div>
                </div>
                <div class="order-power-note">该模块用于展示已完成订单的实际用电与计划偏差，后续可直接接入接口回传数据。</div>
              </div>
              <div class="dispatch-side">
                <div class="dispatch-section-title dispatch-section-title-side">车辆与司机</div>
                <div class="dispatch-item"><label>运维车辆</label><input class="input" data-order-field="vehicleId" readonly></div>
                <div class="dispatch-item"><label>负责司机</label><input class="input" data-order-field="driverName" readonly></div>
                <div class="dispatch-item"><label>司机联系电话</label><input class="input" data-order-field="driverPhone" readonly></div>
                <div class="dispatch-item"><label>订单状态</label><input class="input" data-order-field="orderStatus" readonly></div>
                <div class="dispatch-side-actions">
                  <button class="btn btn-light" type="button" data-action="view-order-vehicle">车辆详情</button>
                  <button class="btn btn-light" type="button" data-action="locate-order-vehicle">车辆位置</button>
                  <button class="btn btn-light" type="button" data-action="visualize-order-battery" style="display:none;">电池可视化</button>
                </div>
                <div class="dispatch-actions">
                  <button class="btn btn-primary" type="button" data-action="start-order-power" style="display:none;">开始供电</button>
                  <button class="btn btn-primary" type="button" data-close>关闭</button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="modal-backdrop" id="modal-order-vehicle-location">
          <div class="modal modal-xl">
            <h3>车辆位置</h3>
            <div class="field"><label>车辆编号</label><span data-order-location-vehicle-id>储能车ES-M100-500</span></div>
            <div class="field"><label>位置</label><span data-order-location-address>北京市朝阳区东华门 123 号</span></div>
            <div class="field"><label>经纬度</label><span data-order-location-coords>39.904211, 116.407394</span></div>
            <div class="map-frame large">
              <div id="order-vehicle-location-map" class="amap-host" aria-label="order-vehicle-map"></div>
            </div>
            <div class="modal-actions">
              <button class="btn btn-primary" data-close>关闭</button>
            </div>
          </div>
        </div>
        <div class="modal-backdrop" id="modal-order-vehicle-detail">
          <div class="modal modal-xl">
            <div class="detail-header">车辆信息</div>
            <div class="detail-section">
              <div class="detail-section-title">基本信息</div>
              <div class="card table-card">
                <table class="table detail-table">
                  <tbody>
                    <tr>
                      <td class="label-cell">车辆编号</td><td data-order-vehicle-detail-vehicle-id>储能车ES-M100-500</td>
                      <td class="label-cell">生产序列号</td><td data-order-vehicle-detail-serial-no>TXDSN202509150001</td>
                      <td class="label-cell">电池类型</td><td data-order-vehicle-detail-battery-type>LFP</td>
                      <td class="label-cell">经度</td><td data-order-vehicle-detail-lng>113.2644</td>
                    </tr>
                    <tr>
                      <td class="label-cell">标称容量(Ah)</td><td data-order-vehicle-detail-capacity>628</td>
                      <td class="label-cell">工作电压范围(V)</td><td data-order-vehicle-detail-voltage-range>728~923</td>
                      <td class="label-cell">标称能量(kWh)</td><td data-order-vehicle-detail-nominal-energy>522</td>
                      <td class="label-cell">纬度</td><td data-order-vehicle-detail-lat>23.1291</td>
                    </tr>
                    <tr>
                      <td class="label-cell">最大充放电电流(Ah)</td><td data-order-vehicle-detail-max-current>314</td>
                      <td class="label-cell">PCS功率(kW)</td><td data-order-vehicle-detail-pcs-power>250</td>
                      <td class="label-cell">标称功率(kW)</td><td data-order-vehicle-detail-rated-power>250</td>
                      <td class="label-cell">冷却方式</td><td data-order-vehicle-detail-cooling>液冷</td>
                    </tr>
                    <tr>
                      <td class="label-cell">防护等级</td><td data-order-vehicle-detail-protection>IPX5</td>
                      <td class="label-cell">外形尺寸</td><td data-order-vehicle-detail-size>3029*2438*2896mm</td>
                      <td class="label-cell">总重量(t)</td><td data-order-vehicle-detail-weight>6.8</td>
                      <td class="label-cell">生产日期</td><td data-order-vehicle-detail-production-date>2025年10月</td>
                    </tr>
                    <tr>
                      <td class="label-cell">生产厂家</td><td data-order-vehicle-detail-manufacturer>山东天欣达能源科技有限公司</td>
                      <td class="label-cell">归属公司</td><td data-order-vehicle-detail-company>南方电网</td>
                      <td class="label-cell"></td><td></td>
                      <td class="label-cell"></td><td></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div class="detail-section">
              <div class="detail-section-title">主要信息</div>
              <div class="card table-card">
                <table class="table detail-table">
                  <tbody>
                    <tr>
                      <td class="label-cell">车辆状态</td><td data-order-vehicle-detail-status>待机</td>
                      <td class="label-cell">总充电量(kWh)</td><td data-order-vehicle-detail-total-charge>3348</td>
                      <td class="label-cell">总放电量(kWh)</td><td data-order-vehicle-detail-total-discharge>2106.4</td>
                      <td class="label-cell"></td><td></td>
                    </tr>
                    <tr>
                      <td class="label-cell">总充电次数(次)</td><td data-order-vehicle-detail-total-charge-count>20</td>
                      <td class="label-cell">总放电次数(次)</td><td data-order-vehicle-detail-total-discharge-count>18</td>
                      <td class="label-cell">总功率(kW)</td><td data-order-vehicle-detail-total-power>0</td>
                      <td class="label-cell"></td><td></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div class="detail-section">
              <div class="detail-section-title">司机信息</div>
              <div class="card table-card">
                <table class="table detail-table">
                  <tbody>
                    <tr>
                      <td class="label-cell">司机名字</td><td><input class="input detail-inline-input" data-order-vehicle-detail-driver-name value="张三" readonly></td>
                      <td class="label-cell">联系方式</td><td><input class="input detail-inline-input" data-order-vehicle-detail-contact value="137323131331" readonly></td>
                      <td class="label-cell"></td><td></td>
                      <td class="label-cell"></td><td></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div class="detail-section">
              <div class="detail-section-title">充放电记录</div>
              <div class="card table-card" data-paginated data-page-size="5">
                <div class="table-scroll table-scroll-5">
                  ${table(
                    ['车辆状态', '充放电类型', '总充电量(kWh)', 'SOC(%)', '总放电量(kWh)', '放电SOC(%)', '开始时间', '结束时间'],
                    [
                      ['移动储能车-1号', '充电', '70.47', '95', '86.5', '100', '2026-03-07 09:02:04', '2026-03-07 09:02:04'],
                      ['移动储能车-1号', '充电', '221.85', '65', '86.5', '100', '2026-03-07 12:00:04', '2026-03-07 09:02:04'],
                      ['移动储能车-1号', '充电', '221.85', '65', '86.5', '100', '2026-03-07 09:02:04', '2026-03-07 09:02:04'],
                      ['移动储能车-1号', '放电', '221.85', '65', '86.5', '100', '2026-03-07 09:02:04', '2026-03-07 09:02:04'],
                      ['移动储能车-1号', '充电', '180.30', '82', '64.1', '92', '2026-03-08 08:10:12', '2026-03-08 08:58:31'],
                      ['移动储能车-1号', '放电', '180.30', '82', '110.6', '75', '2026-03-08 12:05:00', '2026-03-08 12:42:18'],
                      ['移动储能车-1号', '充电', '95.60', '88', '52.3', '98', '2026-03-09 07:20:44', '2026-03-09 07:56:10'],
                      ['移动储能车-1号', '放电', '95.60', '88', '74.9', '83', '2026-03-09 11:15:23', '2026-03-09 11:50:02'],
                      ['移动储能车-1号', '充电', '140.20', '90', '60.7', '95', '2026-03-10 09:05:31', '2026-03-10 09:46:19'],
                      ['移动储能车-1号', '放电', '140.20', '90', '98.2', '80', '2026-03-10 13:00:11', '2026-03-10 13:35:40'],
                      ['移动储能车-1号', '充电', '210.75', '78', '70.4', '93', '2026-03-11 06:40:22', '2026-03-11 07:25:08'],
                      ['移动储能车-1号', '放电', '210.75', '78', '120.8', '72', '2026-03-11 10:12:35', '2026-03-11 10:55:16'],
                      ['移动储能车-1号', '充电', '160.90', '85', '66.9', '96', '2026-03-12 08:00:00', '2026-03-12 08:43:27'],
                      ['移动储能车-1号', '放电', '160.90', '85', '102.5', '79', '2026-03-12 12:20:12', '2026-03-12 13:02:59']
                    ]
                  )}
                </div>
                <div class="pager" data-pager>
                  <select class="select" data-page-size>
                    <option value="5">5</option>
                    <option value="10">10</option>
                    <option value="20">20</option>
                  </select>
                  <div class="pagination" data-pages></div>
                </div>
              </div>
              <div class="detail-footer">
                <button class="btn btn-primary" data-close>关闭</button>
              </div>
            </div>
          </div>
        </div>
        <div class="modal-backdrop" id="modal-order-battery-visual">
          <div class="modal modal-xl modal-visual">
            <div class="battery-visual" data-order-battery-visual>
              <div class="battery-visual-head">
                <div class="battery-summary">
                  <span class="battery-summary-label">车辆编号</span>
                  <strong data-order-battery-vehicle-id>储能车ES-M100-500</strong>
                </div>
                <div class="battery-summary-grid">
                  <div class="battery-summary-item">
                    <span>总有功功率</span>
                    <strong data-order-summary-active-power>123.1 kW</strong>
                  </div>
                  <div class="battery-summary-item">
                    <span>总无功功率</span>
                    <strong data-order-summary-reactive-power>123.1 kVar</strong>
                  </div>
                  <div class="battery-summary-item">
                    <span>平均温度</span>
                    <strong data-order-summary-temperature>28.6 °C</strong>
                  </div>
                  <div class="battery-summary-item">
                    <span>平均湿度</span>
                    <strong data-order-summary-humidity>45.2 RH/%</strong>
                  </div>
                </div>
              </div>
              <div class="battery-visual-shell">
                <section class="battery-panel battery-panel-left">
                  <div class="battery-panel-group" data-order-panel-top-left></div>
                  <div class="battery-panel-divider"></div>
                  <div class="battery-panel-group" data-order-panel-bottom-left></div>
                </section>
                <section class="battery-core">
                  <div class="battery-core-glow"></div>
                  <div class="battery-device">
                    <div class="battery-device-cap"></div>
                    <div class="battery-device-body">
                      <div class="battery-segment" data-order-battery-segment="0"></div>
                      <div class="battery-segment" data-order-battery-segment="1"></div>
                      <div class="battery-segment" data-order-battery-segment="2"></div>
                      <div class="battery-segment" data-order-battery-segment="3"></div>
                      <div class="battery-segment" data-order-battery-segment="4"></div>
                    </div>
                  </div>
                  <div class="battery-soc" data-order-battery-soc>88%</div>
                </section>
                <section class="battery-panel battery-panel-right">
                  <div class="battery-panel-group" data-order-panel-top-right></div>
                  <div class="battery-panel-divider"></div>
                  <div class="battery-panel-group" data-order-panel-bottom-right></div>
                </section>
              </div>
            </div>
            <div class="modal-actions">
              <button class="btn btn-primary" data-close>关闭</button>
            </div>
          </div>
        </div>
      `;
      return layout('南网生态移动绿电管理平台', sidebarMobile('订单管理', { showLocation: false }), content);
    },

    'mobile-dispatch-list': () => {
      const headers = ['调度ID', '工单ID', '企业名称', '需求类型', '企业地址', '创建时间', '运维车辆', '调度状态', '操作'];
      const rows = [];
      const dispatchTable = table(headers, rows).replace('<table class="table">', '<table class="table" data-dispatch-table>');
      const content = `
        <div class="page-title">调度列表</div>
        <div class="dispatch-overview">
          <div class="dispatch-wait-card">
            <div class="dispatch-wait-label">等待调度工单</div>
            <div class="dispatch-wait-value"><strong data-dispatch-pending-count>0</strong><span>条</span></div>
            <div class="dispatch-wait-sub">统计来源：工单列表中“等待调度”状态</div>
          </div>
        </div>
        <div class="toolbar">
          <div class="field"><label>企业名称</label><input class="input" data-filter-dispatch-company placeholder="请输入"></div>
          <div class="field"><label>工单ID</label><input class="input" data-filter-dispatch-workorder placeholder="请输入"></div>
          <div class="field"><label>调度ID</label><input class="input" data-filter-dispatch-id placeholder="请输入"></div>
          <button class="btn" data-action="search-dispatch">搜索</button>
          <div class="field"><label>调度状态</label><select class="select" data-filter-dispatch-status><option value="">全部</option><option>调度中</option><option>调度完成</option><option>调度失败</option><option>已取消</option></select></div>
          <button class="btn btn-ghost" data-action="reset-dispatch-filters">重置</button>
          <div class="spacer"></div>
          <button class="btn btn-outline" data-action="new-dispatch">新增</button>
        </div>
        <div class="card table-card" data-paginated data-page-size="25">
          ${dispatchTable}
          ${paginationNoSelect()}
        </div>
        <div class="modal-backdrop" id="modal-dispatch-task">
          <div class="modal modal-xxl dispatch-task-modal">
            <div class="dispatch-task-head">
              <div>
                <div class="dispatch-title" data-dispatch-modal-title>添加调度任务</div>
                <div class="dispatch-title-sub">填写工单信息并匹配车辆后可直接派遣</div>
              </div>
              <span class="dispatch-task-chip">移动绿电调度</span>
            </div>
            <div class="dispatch-shell" data-dispatch-form>
              <div class="dispatch-main">
                <div class="dispatch-section-title">工单信息</div>
                <div class="dispatch-form-grid">
                  <div class="dispatch-item"><label>工单ID</label><select class="select" data-field="workorderId"><option value="">加载中...</option></select></div>
                  <div class="dispatch-item"><label>工单类型</label><input class="input" data-field="orderType" placeholder="自动带出" readonly></div>
                  <div class="dispatch-item"><label>调度ID</label><input class="input" data-field="dispatchId" placeholder="系统自动生成" readonly></div>
                  <div class="dispatch-item dispatch-item-full"><label>公司名称</label><input class="input" data-field="companyName" placeholder="自动带出" readonly></div>
                  <div class="dispatch-item"><label>联系人</label><input class="input" data-field="contactName" placeholder="自动带出" readonly></div>
                  <div class="dispatch-item"><label>公司ID</label><input class="input" data-field="companyId" placeholder="自动带出" readonly></div>
                  <div class="dispatch-item"><label>保电电量需求(kWh)</label><input class="input" data-field="energyDemand" placeholder="自动带出" readonly></div>
                  <div class="dispatch-item"><label>联系方式</label><input class="input" data-field="contactPhone" placeholder="自动带出" readonly></div>
                  <div class="dispatch-item"><label>保电开始时间</label><input class="input" data-field="startTime" placeholder="自动带出" readonly></div>
                  <div class="dispatch-item"><label>保电用需功率(kW)</label><input class="input" data-field="requiredPower" placeholder="自动带出" readonly></div>
                  <div class="dispatch-item dispatch-item-full"><label>详细位置</label><textarea class="textarea detail-address-textarea" data-field="address" placeholder="自动带出" readonly></textarea></div>
                  <div class="dispatch-item dispatch-item-full"><label>取消原因</label><textarea class="textarea dispatch-note" data-field="cancelReason" placeholder="取消后自动记录" readonly></textarea></div>
                  <div class="dispatch-item dispatch-item-full" data-dispatch-failure-record-row style="display:none;">
                    <label>失败记录</label>
                    <div class="dispatch-failure-list" data-dispatch-failure-list></div>
                  </div>
                </div>
              </div>
              <div class="dispatch-side">
                <div class="dispatch-section-title dispatch-section-title-side">车辆与司机</div>
                <div class="dispatch-item"><label>调度车辆编号</label><select class="select" data-field="vehicleId"><option value="">加载中...</option></select></div>
                <div class="dispatch-item"><label>负责司机</label><input class="input" data-field="driverName" placeholder="自动带出" readonly></div>
                <div class="dispatch-item"><label>司机联系电话</label><input class="input" data-field="driverPhone" placeholder="自动带出" readonly></div>
                <div class="dispatch-side-actions">
                  <button class="btn btn-light" type="button" data-action="view-dispatch-vehicle">车辆详情</button>
                  <button class="btn btn-light" type="button" data-action="locate-dispatch-vehicle">车辆位置</button>
                </div>
                <div class="dispatch-actions">
                  <button class="btn btn-cancel" type="button" data-close>取消</button>
                  <button class="btn btn-light" type="button" data-action="save-dispatch" data-dispatch-submit-label>派遣车辆</button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="modal-backdrop" id="modal-dispatch-no-pending">
          <div class="modal">
            <h3>提示</h3>
            <div class="field">暂无待调度工单</div>
            <div class="modal-actions">
              <button class="btn btn-primary" data-close>确定</button>
            </div>
          </div>
        </div>
        <div class="modal-backdrop" id="modal-confirm-cancel-dispatch">
          <div class="modal">
            <h3>确认取消</h3>
            <div class="field">确定要取消该调度吗？</div>
            <div class="field cancel-reason-field">
              <label for="cancel-dispatch-reason">取消原因</label>
              <textarea id="cancel-dispatch-reason" class="textarea cancel-reason-textarea" data-cancel-dispatch-reason-input placeholder="请输入取消原因"></textarea>
              <div class="cancel-reason-error" data-cancel-dispatch-reason-error style="display:none;">请输入取消原因</div>
            </div>
            <div class="modal-actions">
              <button class="btn btn-ghost" data-close>取消</button>
              <button class="btn btn-primary" data-action="confirm-cancel-dispatch">确认取消</button>
            </div>
          </div>
        </div>
        <div class="modal-backdrop" id="modal-dispatch-vehicle-location">
          <div class="modal modal-xl">
            <h3>车辆位置</h3>
            <div class="field"><label>车辆编号</label><span data-dispatch-location-vehicle-id>储能车ES-M100-500</span></div>
            <div class="field"><label>位置</label><span data-dispatch-location-address>北京市朝阳区东华门 123 号</span></div>
            <div class="field"><label>经纬度</label><span data-dispatch-location-coords>39.904211, 116.407394</span></div>
            <div class="map-frame large">
              <div id="dispatch-vehicle-location-map" class="amap-host" aria-label="dispatch-vehicle-map"></div>
            </div>
            <div class="modal-actions">
              <button class="btn btn-primary" data-close>关闭</button>
            </div>
          </div>
        </div>
        <div class="modal-backdrop" id="modal-dispatch-vehicle-detail">
          <div class="modal modal-xl">
            <div class="detail-header">车辆信息</div>
            <div class="detail-section">
              <div class="detail-section-title">基本信息</div>
              <div class="card table-card">
                <table class="table detail-table">
                  <tbody>
                    <tr>
                      <td class="label-cell">车辆编号</td><td data-dispatch-detail-vehicle-id>储能车ES-M100-500</td>
                      <td class="label-cell">生产序列号</td><td data-dispatch-detail-serial-no>TXDSN202509150001</td>
                      <td class="label-cell">电池类型</td><td data-dispatch-detail-battery-type>LFP</td>
                      <td class="label-cell">经度</td><td data-dispatch-detail-lng>113.2644</td>
                    </tr>
                    <tr>
                      <td class="label-cell">标称容量(Ah)</td><td data-dispatch-detail-capacity>628</td>
                      <td class="label-cell">工作电压范围(V)</td><td data-dispatch-detail-voltage-range>728~923</td>
                      <td class="label-cell">标称能量(kWh)</td><td data-dispatch-detail-nominal-energy>522</td>
                      <td class="label-cell">纬度</td><td data-dispatch-detail-lat>23.1291</td>
                    </tr>
                    <tr>
                      <td class="label-cell">最大充放电电流(Ah)</td><td data-dispatch-detail-max-current>314</td>
                      <td class="label-cell">PCS功率(kW)</td><td data-dispatch-detail-pcs-power>250</td>
                      <td class="label-cell">标称功率(kW)</td><td data-dispatch-detail-rated-power>250</td>
                      <td class="label-cell">冷却方式</td><td data-dispatch-detail-cooling>液冷</td>
                    </tr>
                    <tr>
                      <td class="label-cell">防护等级</td><td data-dispatch-detail-protection>IPX5</td>
                      <td class="label-cell">外形尺寸</td><td data-dispatch-detail-size>3029*2438*2896mm</td>
                      <td class="label-cell">总重量(t)</td><td data-dispatch-detail-weight>6.8</td>
                      <td class="label-cell">生产日期</td><td data-dispatch-detail-production-date>2025年10月</td>
                    </tr>
                    <tr>
                      <td class="label-cell">生产厂家</td><td data-dispatch-detail-manufacturer>山东天欣达能源科技有限公司</td>
                      <td class="label-cell">归属公司</td><td data-dispatch-detail-company>南方电网</td>
                      <td class="label-cell"></td><td></td>
                      <td class="label-cell"></td><td></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div class="detail-section">
              <div class="detail-section-title">主要信息</div>
              <div class="card table-card">
                <table class="table detail-table">
                  <tbody>
                    <tr>
                      <td class="label-cell">车辆状态</td><td data-dispatch-detail-status>待机</td>
                      <td class="label-cell">总充电量(kWh)</td><td data-dispatch-detail-total-charge>3348</td>
                      <td class="label-cell">总放电量(kWh)</td><td data-dispatch-detail-total-discharge>2106.4</td>
                      <td class="label-cell"></td><td></td>
                    </tr>
                    <tr>
                      <td class="label-cell">总充电次数(次)</td><td data-dispatch-detail-total-charge-count>20</td>
                      <td class="label-cell">总放电次数(次)</td><td data-dispatch-detail-total-discharge-count>18</td>
                      <td class="label-cell">总功率(kW)</td><td data-dispatch-detail-total-power>0</td>
                      <td class="label-cell"></td><td></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div class="detail-section">
              <div class="detail-section-title">司机信息</div>
              <div class="card table-card">
                <table class="table detail-table">
                  <tbody>
                    <tr>
                      <td class="label-cell">司机名字</td><td><input class="input detail-inline-input" data-dispatch-detail-driver-name value="张三" readonly></td>
                      <td class="label-cell">联系方式</td><td><input class="input detail-inline-input" data-dispatch-detail-contact value="137323131331" readonly></td>
                      <td class="label-cell"></td><td></td>
                      <td class="label-cell"></td><td></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div class="detail-section">
              <div class="detail-section-title">充放电记录</div>
              <div class="card table-card" data-paginated data-page-size="5">
                <div class="table-scroll table-scroll-5">
                  ${table(
                    ['车辆状态', '充放电类型', '总充电量(kWh)', 'SOC(%)', '总放电量(kWh)', '放电SOC(%)', '开始时间', '结束时间'],
                    [
                      ['移动储能车-1号', '充电', '70.47', '95', '86.5', '100', '2026-03-07 09:02:04', '2026-03-07 09:02:04'],
                      ['移动储能车-1号', '充电', '221.85', '65', '86.5', '100', '2026-03-07 12:00:04', '2026-03-07 09:02:04'],
                      ['移动储能车-1号', '充电', '221.85', '65', '86.5', '100', '2026-03-07 09:02:04', '2026-03-07 09:02:04'],
                      ['移动储能车-1号', '放电', '221.85', '65', '86.5', '100', '2026-03-07 09:02:04', '2026-03-07 09:02:04'],
                      ['移动储能车-1号', '充电', '180.30', '82', '64.1', '92', '2026-03-08 08:10:12', '2026-03-08 08:58:31'],
                      ['移动储能车-1号', '放电', '180.30', '82', '110.6', '75', '2026-03-08 12:05:00', '2026-03-08 12:42:18'],
                      ['移动储能车-1号', '充电', '95.60', '88', '52.3', '98', '2026-03-09 07:20:44', '2026-03-09 07:56:10'],
                      ['移动储能车-1号', '放电', '95.60', '88', '74.9', '83', '2026-03-09 11:15:23', '2026-03-09 11:50:02'],
                      ['移动储能车-1号', '充电', '140.20', '90', '60.7', '95', '2026-03-10 09:05:31', '2026-03-10 09:46:19'],
                      ['移动储能车-1号', '放电', '140.20', '90', '98.2', '80', '2026-03-10 13:00:11', '2026-03-10 13:35:40'],
                      ['移动储能车-1号', '充电', '210.75', '78', '70.4', '93', '2026-03-11 06:40:22', '2026-03-11 07:25:08'],
                      ['移动储能车-1号', '放电', '210.75', '78', '120.8', '72', '2026-03-11 10:12:35', '2026-03-11 10:55:16'],
                      ['移动储能车-1号', '充电', '160.90', '85', '66.9', '96', '2026-03-12 08:00:00', '2026-03-12 08:43:27'],
                      ['移动储能车-1号', '放电', '160.90', '85', '102.5', '79', '2026-03-12 12:20:12', '2026-03-12 13:02:59']
                    ]
                  )}
                </div>
                <div class="pager" data-pager>
                  <select class="select" data-page-size>
                    <option value="5">5</option>
                    <option value="10">10</option>
                    <option value="20">20</option>
                  </select>
                  <div class="pagination" data-pages></div>
                </div>
              </div>
              <div class="detail-footer">
                <button class="btn btn-primary" data-close>关闭</button>
              </div>
            </div>
          </div>
        </div>
      `;
      return layout('南网生态移动绿电管理平台', sidebarMobile('调度管理', { showLocation: false }), content);
    },

    'mobile-workorder-list': () => {
      const headers = ['工单ID', '企业名称', '联系人', '联系方式', '需求类型', '企业地址', '创建时间', '工单状态', '操作'];
      const detailActionBtn = (label = '详情') => `<button class="link-btn" data-action="view-workorder-detail">${label}</button>`;
      const cancelActionBtn = (label = '取消') => `<button class="link-btn" data-action="cancel-workorder">${label}</button>`;
      const workorderCatalog = Array.isArray(window.defaultWorkorderCatalog) && window.defaultWorkorderCatalog.length
        ? window.defaultWorkorderCatalog
        : DEFAULT_WORKORDER_CATALOG;
      const rows = workorderCatalog.map((item) => {
        const status = (item.status || '').trim() || '等待调度';
        const orderTypeText = (item.orderType || '').trim() || '供电';
        const actionCell = status === '等待调度'
          ? `<span class="action-space">${detailActionBtn('修改')} ${cancelActionBtn('取消')}</span>`
          : detailActionBtn('详情');
        return [
          item.workorderId || '#0000000',
          item.companyName || '—',
          item.contactName || '—',
          item.contactPhone || '—',
          `<span style="color:#2f6cf6;">${orderTypeText}</span>`,
          item.address || '—',
          item.createdAt || '—',
          status,
          actionCell
        ];
      });
      const workorderTable = table(headers, rows).replace('<table class="table">', '<table class="table" data-workorder-table>');
      const content = `
        <div class="page-title">工单列表</div>
        <div class="toolbar">
          <div class="field"><label>企业名称</label><input class="input" data-filter-workorder-company placeholder="请输入"></div>
          <div class="field"><label>工单ID</label><input class="input" data-filter-workorder-id placeholder="请输入"></div>
          <div class="field"><label>工单状态</label><select class="select" data-filter-workorder-status><option value="">全部</option><option>等待调度</option><option>调度已处理</option><option>已取消</option></select></div>
          <button class="btn" data-action="search-workorder">搜索</button>
          <button class="btn btn-ghost" data-action="reset-workorder-filters">重置</button>
          <div class="spacer"></div>
          <button class="btn btn-outline" data-action="new-workorder">新增</button>
        </div>
        <div class="card table-card" data-paginated data-page-size="25">
          ${workorderTable}
          ${paginationNoSelect()}
        </div>
        <div class="modal-backdrop" id="modal-new-work">
          <div class="modal modal-xl modal-workorder">
            <h3 data-workorder-modal-title>添加工单</h3>
            <div class="modal-body" data-workorder-form>
              <div class="modal-workorder-grid">
                <div class="modal-workorder-field">
                  <label>工单ID</label>
                  <input class="input" data-field="workorderId" placeholder="系统自动生成" readonly>
                </div>
                <div class="modal-workorder-field">
                  <label>工单类型</label>
                  <select class="select" data-field="orderType">
                    <option value="充电">充电</option>
                    <option value="供电">供电</option>
                  </select>
                </div>
                <div class="modal-workorder-field">
                  <label>公司名称</label>
                  <select class="select" data-field="companyName">
                    <option value="">请选择企业</option>
                    <option value="南方电网A">南方电网A</option>
                    <option value="南方电网B">南方电网B</option>
                  </select>
                </div>
                <div class="modal-workorder-field">
                  <label>公司类型</label>
                  <input class="input" data-field="companyType" placeholder="自动带出" readonly>
                </div>
                <div class="modal-workorder-field">
                  <label>公司ID</label>
                  <input class="input" data-field="companyId" placeholder="自动带出" readonly>
                </div>
                <div class="modal-workorder-field">
                  <label>联系人</label>
                  <input class="input" data-field="contactName" placeholder="自动带出" readonly>
                </div>
                <div class="modal-workorder-field">
                  <label>联系方式</label>
                  <input class="input" data-field="contactPhone" placeholder="自动带出" readonly>
                </div>
                <div class="modal-workorder-field">
                  <label>保电电量需求 (kWh)</label>
                  <input class="input" data-field="energyDemand" placeholder="请输入">
                </div>
                <div class="modal-workorder-field">
                  <label>保电用需功率 (kW)</label>
                  <input class="input" data-field="requiredPower" placeholder="请输入">
                </div>
                <div class="modal-workorder-field">
                  <label>保电开始时间</label>
                  <input class="input" type="date" data-field="startTime">
                </div>
                <div class="modal-workorder-field modal-workorder-field--full">
                  <label>详细位置</label>
                  <input class="input" data-field="address" placeholder="自动带出" readonly>
                </div>
                <div class="modal-workorder-field modal-workorder-field--full">
                  <label>备注</label>
                  <textarea class="textarea lg" data-field="note" placeholder="请输入"></textarea>
                </div>
                <div class="modal-workorder-field modal-workorder-field--full" data-workorder-cancel-reason-row style="display:none;">
                  <label>取消原因</label>
                  <textarea class="textarea lg" data-field="cancelReason" placeholder="取消后自动记录" readonly></textarea>
                </div>
              </div>
            </div>
            <div class="modal-actions modal-workorder-actions">
              <button class="btn btn-ghost" data-close>取消</button>
              <button class="btn btn-primary" data-action="add-workorder" data-workorder-submit-label>添加</button>
            </div>
          </div>
        </div>
        <div class="modal-backdrop" id="modal-workorder-detail">
          <div class="modal modal-xl">
            <div class="detail-header">工单详情</div>
            <div class="detail-section">
              <div class="detail-section-title">基础信息</div>
              <div class="card table-card">
                <table class="table detail-table">
                  <tbody>
                    <tr>
                      <td class="label-cell">工单ID</td><td data-detail-workorder-id>#4213123</td>
                      <td class="label-cell">工单状态</td><td data-detail-workorder-status>调度已处理</td>
                      <td class="label-cell">创建时间</td><td data-detail-workorder-created-at>2026-03-09 14:28:00</td>
                    </tr>
                    <tr>
                      <td class="label-cell">企业名称</td><td data-detail-workorder-company>南方电网A</td>
                      <td class="label-cell">企业ID</td><td data-detail-workorder-company-id>#3243241</td>
                      <td class="label-cell">公司类型</td><td data-detail-workorder-company-type>需求方</td>
                    </tr>
                    <tr>
                      <td class="label-cell">工单类型</td><td data-detail-workorder-type>充电</td>
                      <td class="label-cell">联系人</td><td data-detail-workorder-contact-name>张帆</td>
                      <td class="label-cell">联系方式</td><td data-detail-workorder-contact-phone>18217122721</td>
                    </tr>
                    <tr>
                      <td class="label-cell">保电开始时间</td><td data-detail-workorder-start-time>2026-03-12</td>
                      <td class="label-cell">保电电量需求(kWh)</td><td data-detail-workorder-energy-demand>—</td>
                      <td class="label-cell">保电用需功率(kW)</td><td data-detail-workorder-required-power>—</td>
                    </tr>
                    <tr>
                      <td class="label-cell">详细位置</td><td class="align-left" colspan="5" data-detail-workorder-address>北京市海淀区北三环西路 43 号院 2 号楼中航广场 25 层</td>
                    </tr>
                    <tr>
                      <td class="label-cell">备注</td><td class="align-left" colspan="5" data-detail-workorder-note>—</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div class="modal-actions">
              <button class="btn btn-primary" data-close>关闭</button>
            </div>
          </div>
        </div>
        <div class="modal-backdrop" id="modal-confirm-cancel-workorder">
          <div class="modal">
            <h3>确认取消</h3>
            <div class="field">确定要取消该工单吗？</div>
            <div class="field cancel-reason-field">
              <label for="cancel-workorder-reason">取消原因</label>
              <textarea id="cancel-workorder-reason" class="textarea cancel-reason-textarea" data-cancel-reason-input placeholder="请输入取消原因"></textarea>
              <div class="cancel-reason-error" data-cancel-reason-error style="display:none;">请输入取消原因</div>
            </div>
            <div class="modal-actions">
              <button class="btn btn-ghost" data-close>取消</button>
              <button class="btn btn-primary" data-action="confirm-cancel-workorder">确认取消</button>
            </div>
          </div>
        </div>
      `;
      return layout('南网生态移动绿电管理平台', sidebarMobile('工单管理', { showLocation: false }), content);
    },
    'mobile-vehicle-list': () => {
      const headers = ['车辆编号', '司机名称', '联系方式', '剩余电量(kwh)', '充放电状态', '数据传输状态', '当前位置', '操作'];
      const locationButton = (vehicleId, address, lng, lat) => `<button class="link-btn" data-action="view-vehicle-location" data-vehicle-id="${vehicleId}" data-address="${address}" data-lng="${lng}" data-lat="${lat}">查看</button>`;
      const visualButton = (vehicleId) => `<button class="link-btn" data-action="view-battery-visual" data-vehicle-id="${vehicleId}">电池可视化</button>`;
      const detailButton = (vehicleId) => `<button class="link-btn" data-action="view-vehicle-detail" data-vehicle-id="${vehicleId}">详情</button>`;
      const vehicleCatalog = Array.isArray(window.defaultVehicleCatalog)
        ? window.defaultVehicleCatalog
        : DEFAULT_VEHICLE_CATALOG;
      const rows = vehicleCatalog.map((item) => {
        const vehicleId = item.vehicleId || '未命名车辆';
        return [
          vehicleId,
          item.driverName || '—',
          item.contact || '—',
          item.energyLeft || '0.00',
          item.chargeStatus || '待机',
          item.dataStatus || '正常',
          locationButton(vehicleId, item.address || '未设置位置', item.lng || '', item.lat || ''),
          `<span class="action-space">${detailButton(vehicleId)} ${visualButton(vehicleId)} <button class="link-btn" data-action="delete-vehicle">删除</button></span>`
        ];
      });
      const vehicleTable = table(headers, rows).replace('<table class="table">', '<table class="table" data-vehicle-table>');
      const content = `
        <div class="page-title">车辆信息</div>
        <div class="toolbar">
          <div class="field"><label>车辆名称</label><input class="input" data-filter="vehicle-id" placeholder="请输入"></div>
          <div class="field"><label>充放电状态</label><select class="select" data-filter="charge-status"><option value="">全部</option><option>待机</option><option>放电</option><option>充电</option></select></div>
          <div class="field"><label>剩余电量</label><input class="input" style="width:70px;" data-filter="energy-min" placeholder="最小值"><span>-</span><input class="input" style="width:70px;" data-filter="energy-max" placeholder="最大值"></div>
          <div class="field"><label>司机名字</label><input class="input" data-filter="driver-name" placeholder="请输入"></div>
          <button class="btn" data-action="search-vehicle">搜索</button>
          <button class="btn btn-ghost" data-action="reset-vehicle-filter">重置</button>
          <div class="spacer"></div>
          <button class="btn btn-outline" data-open="modal-new-car">新增</button>
        </div>
        <div class="card table-card" data-paginated data-page-size="25">
          ${vehicleTable}
          ${paginationNoSelect()}
        </div>
        <div class="modal-backdrop" id="modal-new-car">
          <div class="modal modal-xxl">
            <h3>新增车辆</h3>
            <div class="modal-body" data-vehicle-form>
              <div class="form-grid">
                <div class="form-field"><label>车辆编号</label><input class="input" data-field="vehicleId" placeholder="请输入"></div>
                <div class="form-field"><label>PCS功率(kW)</label><input class="input" data-field="pcsPower" placeholder="请输入"></div>
                <div class="form-field"><label>归属公司</label><input class="input" data-field="company" placeholder="请输入"></div>

                <div class="form-field"><label>生产序列号</label><input class="input" data-field="serialNo" placeholder="请输入"></div>
                <div class="form-field"><label>冷却方式</label><input class="input" data-field="cooling" placeholder="请输入"></div>
                <div class="form-field"><label>司机名字</label><input class="input" data-field="driverName" placeholder="请输入"></div>

                <div class="form-field"><label>电池类型</label><input class="input" data-field="batteryType" placeholder="请输入"></div>
                <div class="form-field"><label>防护等级</label><input class="input" data-field="protection" placeholder="请输入"></div>
                <div class="form-field"><label>联系方式</label><input class="input" data-field="contact" placeholder="请输入"></div>

                <div class="form-field"><label>标称容量(Ah)</label><input class="input" data-field="capacity" placeholder="请输入"></div>
                <div class="form-field"><label>外形尺寸</label><input class="input" data-field="size" placeholder="请输入"></div>
                <div class="form-field"><label></label></div>

                <div class="form-field"><label>工作电压范围(V)</label><input class="input" data-field="voltageRange" placeholder="请输入"></div>
                <div class="form-field"><label>总重量(t)</label><input class="input" data-field="weight" placeholder="请输入"></div>
                <div class="form-field"><label></label></div>

                <div class="form-field"><label>标称能量(kWh)</label><input class="input" data-field="nominalEnergy" placeholder="请输入"></div>
                <div class="form-field"><label>生产日期</label><input class="input" data-field="productionDate" placeholder="请输入"></div>
                <div class="form-field"><label></label></div>

                <div class="form-field"><label>最大充/放电电流(Ah)</label><input class="input" data-field="maxCurrent" placeholder="请输入"></div>
                <div class="form-field"><label>生产厂家</label><input class="input" data-field="manufacturer" placeholder="请输入"></div>
                <div class="form-field"><label></label></div>
              </div>
            </div>
            <div class="modal-actions">
              <button class="btn btn-ghost" data-close>取消</button>
              <button class="btn btn-primary" data-action="add-vehicle">添加</button>
            </div>
          </div>
        </div>
        <div class="modal-backdrop" id="modal-vehicle-location">
          <div class="modal modal-xl">
            <h3>车辆位置</h3>
            <div class="field"><label>车辆编号</label><span data-location-vehicle-id>储能车ES-M100-500</span></div>
            <div class="field"><label>位置</label><span data-location-address>北京市朝阳区东华门 123 号</span></div>
            <div class="field"><label>经纬度</label><span data-location-coords>39.904211, 116.407394</span></div>
            <div class="map-frame large">
              <div id="vehicle-location-map" class="amap-host" aria-label="vehicle-map"></div>
            </div>
            <div class="modal-actions">
              <button class="btn btn-primary" data-close>关闭</button>
            </div>
          </div>
        </div>
        <div class="modal-backdrop" id="modal-vehicle-detail">
          <div class="modal modal-xl">
            <div class="detail-header">车辆信息</div>
            <div class="detail-section">
              <div class="detail-section-title">基本信息</div>
              <div class="card table-card">
                <table class="table detail-table">
                  <tbody>
                    <tr>
                      <td class="label-cell">车辆编号</td><td data-detail-vehicle-id>储能车ES-M100-500</td>
                      <td class="label-cell">生产序列号</td><td data-detail-serial-no>TXDSN202509150001</td>
                      <td class="label-cell">电池类型</td><td data-detail-battery-type>LFP</td>
                      <td class="label-cell">经度</td><td data-detail-lng>113.2644</td>
                    </tr>
                    <tr>
                      <td class="label-cell">标称容量(Ah)</td><td data-detail-capacity>628</td>
                      <td class="label-cell">工作电压范围(V)</td><td data-detail-voltage-range>728~923</td>
                      <td class="label-cell">标称能量(kWh)</td><td data-detail-nominal-energy>522</td>
                      <td class="label-cell">纬度</td><td data-detail-lat>23.1291</td>
                    </tr>
                    <tr>
                      <td class="label-cell">最大充放电电流(Ah)</td><td data-detail-max-current>314</td>
                      <td class="label-cell">PCS功率(kW)</td><td data-detail-pcs-power>250</td>
                      <td class="label-cell">标称功率(kW)</td><td data-detail-rated-power>250</td>
                      <td class="label-cell">冷却方式</td><td data-detail-cooling>液冷</td>
                    </tr>
                    <tr>
                      <td class="label-cell">防护等级</td><td data-detail-protection>IPX5</td>
                      <td class="label-cell">外形尺寸</td><td data-detail-size>3029*2438*2896mm</td>
                      <td class="label-cell">总重量(t)</td><td data-detail-weight>6.8</td>
                      <td class="label-cell">生产日期</td><td data-detail-production-date>2025年10月</td>
                    </tr>
                    <tr>
                      <td class="label-cell">生产厂家</td><td data-detail-manufacturer>山东天欣达能源科技有限公司</td>
                      <td class="label-cell">归属公司</td><td data-detail-company>南方电网</td>
                      <td class="label-cell"></td><td></td>
                      <td class="label-cell"></td><td></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div class="detail-section">
              <div class="detail-section-title">主要信息</div>
              <div class="card table-card">
                <table class="table detail-table">
                  <tbody>
                    <tr>
                      <td class="label-cell">车辆状态</td><td data-detail-status>待机</td>
                      <td class="label-cell">总充电量(kWh)</td><td data-detail-total-charge>3348</td>
                      <td class="label-cell">总放电量(kWh)</td><td data-detail-total-discharge>2106.4</td>
                      <td class="label-cell"></td><td></td>
                    </tr>
                    <tr>
                      <td class="label-cell">总充电次数(次)</td><td data-detail-total-charge-count>20</td>
                      <td class="label-cell">总放电次数(次)</td><td data-detail-total-discharge-count>18</td>
                      <td class="label-cell">总功率(kW)</td><td data-detail-total-power>0</td>
                      <td class="label-cell"></td><td></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div class="detail-section">
              <div class="detail-section-title">司机信息</div>
              <div class="card table-card">
                <table class="table detail-table">
                  <tbody>
                    <tr>
                      <td class="label-cell">司机名字</td><td><input class="input detail-inline-input" data-detail-driver-name value="张三"></td>
                      <td class="label-cell">联系方式</td><td><input class="input detail-inline-input" data-detail-contact value="137323131331"></td>
                      <td class="label-cell"></td><td></td>
                      <td class="label-cell"></td><td></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div class="detail-section">
              <div class="detail-section-title">充放电记录</div>
              <div class="card table-card" data-paginated data-page-size="5">
                <div class="table-scroll table-scroll-5">
                  ${table(
                    ['车辆状态', '充放电类型', '总充电量(kWh)', 'SOC(%)', '总放电量(kWh)', '放电SOC(%)', '开始时间', '结束时间'],
                    [
                      ['移动储能车-1号', '充电', '70.47', '95', '86.5', '100', '2026-03-07 09:02:04', '2026-03-07 09:02:04'],
                      ['移动储能车-1号', '充电', '221.85', '65', '86.5', '100', '2026-03-07 12:00:04', '2026-03-07 09:02:04'],
                      ['移动储能车-1号', '充电', '221.85', '65', '86.5', '100', '2026-03-07 09:02:04', '2026-03-07 09:02:04'],
                      ['移动储能车-1号', '放电', '221.85', '65', '86.5', '100', '2026-03-07 09:02:04', '2026-03-07 09:02:04'],
                      ['移动储能车-1号', '充电', '180.30', '82', '64.1', '92', '2026-03-08 08:10:12', '2026-03-08 08:58:31'],
                      ['移动储能车-1号', '放电', '180.30', '82', '110.6', '75', '2026-03-08 12:05:00', '2026-03-08 12:42:18'],
                      ['移动储能车-1号', '充电', '95.60', '88', '52.3', '98', '2026-03-09 07:20:44', '2026-03-09 07:56:10'],
                      ['移动储能车-1号', '放电', '95.60', '88', '74.9', '83', '2026-03-09 11:15:23', '2026-03-09 11:50:02'],
                      ['移动储能车-1号', '充电', '140.20', '90', '60.7', '95', '2026-03-10 09:05:31', '2026-03-10 09:46:19'],
                      ['移动储能车-1号', '放电', '140.20', '90', '98.2', '80', '2026-03-10 13:00:11', '2026-03-10 13:35:40'],
                      ['移动储能车-1号', '充电', '210.75', '78', '70.4', '93', '2026-03-11 06:40:22', '2026-03-11 07:25:08'],
                      ['移动储能车-1号', '放电', '210.75', '78', '120.8', '72', '2026-03-11 10:12:35', '2026-03-11 10:55:16'],
                      ['移动储能车-1号', '充电', '160.90', '85', '66.9', '96', '2026-03-12 08:00:00', '2026-03-12 08:43:27'],
                      ['移动储能车-1号', '放电', '160.90', '85', '102.5', '79', '2026-03-12 12:20:12', '2026-03-12 13:02:59']
                    ]
                  )}
                </div>
                <div class="pager" data-pager>
                  <select class="select" data-page-size>
                    <option value="5">5</option>
                    <option value="10">10</option>
                    <option value="20">20</option>
                  </select>
                  <div class="pagination" data-pages></div>
                </div>
              </div>
              <div class="detail-footer">
                <button class="btn btn-success" data-action="save-vehicle-detail">完成</button>
              </div>
            </div>
          </div>
        </div>
        <div class="modal-backdrop" id="modal-battery-visual">
          <div class="modal modal-xl modal-visual">
            <div class="battery-visual" data-battery-visual>
              <div class="battery-visual-head">
                <div class="battery-summary">
                  <span class="battery-summary-label">车辆编号</span>
                  <strong data-battery-vehicle-id>储能车ES-M100-500</strong>
                </div>
                <div class="battery-summary-grid">
                  <div class="battery-summary-item">
                    <span>总有功功率</span>
                    <strong data-summary-active-power>123.1 kW</strong>
                  </div>
                  <div class="battery-summary-item">
                    <span>总无功功率</span>
                    <strong data-summary-reactive-power>123.1 kVar</strong>
                  </div>
                  <div class="battery-summary-item">
                    <span>平均温度</span>
                    <strong data-summary-temperature>28.6 °C</strong>
                  </div>
                  <div class="battery-summary-item">
                    <span>平均湿度</span>
                    <strong data-summary-humidity>45.2 RH/%</strong>
                  </div>
                </div>
              </div>
              <div class="battery-visual-shell">
                <section class="battery-panel battery-panel-left">
                  <div class="battery-panel-group" data-panel-top-left></div>
                  <div class="battery-panel-divider"></div>
                  <div class="battery-panel-group" data-panel-bottom-left></div>
                </section>
                <section class="battery-core">
                  <div class="battery-core-glow"></div>
                  <div class="battery-device">
                    <div class="battery-device-cap"></div>
                    <div class="battery-device-body">
                      <div class="battery-segment" data-battery-segment="0"></div>
                      <div class="battery-segment" data-battery-segment="1"></div>
                      <div class="battery-segment" data-battery-segment="2"></div>
                      <div class="battery-segment" data-battery-segment="3"></div>
                      <div class="battery-segment" data-battery-segment="4"></div>
                    </div>
                  </div>
                  <div class="battery-soc" data-battery-soc>88%</div>
                </section>
                <section class="battery-panel battery-panel-right">
                  <div class="battery-panel-group" data-panel-top-right></div>
                  <div class="battery-panel-divider"></div>
                  <div class="battery-panel-group" data-panel-bottom-right></div>
                </section>
              </div>
            </div>
            <div class="modal-actions">
              <button class="btn btn-primary" data-close>关闭</button>
            </div>
          </div>
        </div>
        <div class="modal-backdrop" id="modal-confirm-delete">
          <div class="modal">
            <h3>确认删除</h3>
            <div class="field">确定要删除该车辆吗？</div>
            <div class="modal-actions">
              <button class="btn btn-ghost" data-close>取消</button>
              <button class="btn btn-primary" data-action="confirm-delete">删除</button>
            </div>
          </div>
        </div>
      `;
      return layout('南网生态移动绿电管理平台', sidebarMobile('车辆信息', { showLocation: false }), content);
    },

    'mobile-vehicle-map': () => {
      const content = `
        <div class="page-title">车辆位置</div>
        <div class="toolbar">
          <div class="field"><label>车辆编号</label><span>储能车ES-M100-500</span></div>
          <div class="field"><label>详细地址</label><span>北京市朝阳区东华门 123 号</span></div>
          <div class="field"><label>所在区域</label><span>北京市朝阳区</span></div>
          <div class="field"><label>经纬度</label><span>纬度 23.1658° | 经度 113.3129°</span></div>
          <div class="field"><label>定位时间</label><span>2026-03-12 18:15</span></div>
        </div>
        <div class="map-frame">
          <iframe title="map" src="https://www.openstreetmap.org/export/embed.html?bbox=116.32%2C39.87%2C116.44%2C39.95&amp;layer=mapnik"></iframe>
        </div>
      `;
      return layout('南网生态移动绿电管理平台', sidebarMobile('车辆位置', { showLocation: false }), content);
    },

    'mobile-alert-current': () => {
      const headers = ['车辆编号', '设备类型', '设备ID', '告警类型', '告警内容', '开始时间', '持续时间', '数据传输状态', '当前处理'];
      const rows = [
        ['储能车ES-M100-500', 'PCS2', 'PCS231231', '<span style="color:#e25c5c;">故障</span>', 'PCS2-PCS当前状态', '2026-03-09 14:28:00', '0小时2分1秒', '数据中断', linkBtn('查看')],
        ['储能车ES-M100-500', 'BMS', 'BMS2312313', '<span style="color:#e25c5c;">报警</span>', 'BMS1-SOC过高报警', '2026-03-07 12:00:00', '0小时2分1秒', '数据中断', linkBtn('查看')]
      ];
      const alertTable = table(headers, rows).replace('<table class="table">', '<table class="table" data-alert-current-table>');
      const content = `
        <div class="page-title">告警报警</div>
        <div class="toolbar">
          <div class="field"><label>车辆编号</label><input class="input" data-filter-alert-current-vehicle placeholder="请输入"></div>
          <div class="field"><label>告警类型</label><select class="select" data-filter-alert-current-type><option value="">全部</option><option>故障</option><option>报警</option></select></div>
          <div class="field"><label>设备类型</label><select class="select" data-filter-alert-current-device><option value="">全部</option><option>PCS2</option><option>BMS</option></select></div>
          <button class="btn" data-action="search-alert-current">搜索</button>
          <button class="btn btn-ghost" data-action="reset-alert-current-filters">重置</button>
        </div>
        <div class="card table-card" data-paginated data-page-size="25">
          ${alertTable}
          ${paginationNoSelect()}
        </div>
      `;
      return layout('南网生态移动绿电管理平台', sidebarMobile('当前告警', { showLocation: false }), content);
    },

    'mobile-alert-history': () => {
      const headers = ['车辆编号', '设备类型', '设备ID', '告警类型', '告警内容', '开始时间', '结束时间', '持续时间', '告警状态'];
      const rows = [
        ['储能车ES-M100-500', 'PCS2', 'PCS231231', '<span style="color:#e25c5c;">故障</span>', 'PCS2-PCS当前状态', '2026-03-09 14:28:00', '2026-03-09 14:30:01', '0小时2分1秒', '已处理'],
        ['储能车ES-M100-500', 'BMS', 'BMS2312313', '<span style="color:#e25c5c;">报警</span>', 'BMS1-SOC过高报警', '2026-03-07 12:00:00', '2026-03-09 14:30:01', '0小时2分1秒', '等待处理']
      ];
      const alertHistoryTable = table(headers, rows).replace('<table class="table">', '<table class="table" data-alert-history-table>');
      const content = `
        <div class="page-title">告警历史</div>
        <div class="toolbar">
          <div class="field"><label>车辆编号</label><input class="input" data-filter-alert-history-vehicle placeholder="请输入"></div>
          <div class="field"><label>告警类型</label><select class="select" data-filter-alert-history-type><option value="">全部</option><option>故障</option><option>报警</option></select></div>
          <div class="field"><label>设备类型</label><select class="select" data-filter-alert-history-device><option value="">全部</option><option>PCS2</option><option>BMS</option></select></div>
          <button class="btn" data-action="search-alert-history">搜索</button>
          <button class="btn btn-ghost" data-action="reset-alert-history-filters">重置</button>
        </div>
        <div class="card table-card" data-paginated data-page-size="25">
          ${alertHistoryTable}
          ${paginationNoSelect()}
        </div>
      `;
      return layout('南网生态移动绿电管理平台', sidebarMobile('全部告警', { showLocation: false }), content);
    },

    'mobile-project-list': () => {
      const headers = ['企业名称', '统一社会信用代码', '联系人', '联系方式', '公司类型', '详细位置', '创建时间', '所在区域', '操作'];
      const rows = [
        ['南方电网综合能源（广州）有限公司', '91440101MA59A1B23C', '李俊', '13800138001', '<span style="color:#2f6cf6;">需求方</span>', '广州市天河区珠江新城华夏路 16 号富力中心 A 座 18 层', '2026-03-20 09:18:00', '广州', `${linkBtn('修改')} ${linkBtn('删除', '已删除')}`],
        ['南网能源科技（广州黄埔）有限公司', '91440101MA5C2D8E1F', '陈珊', '13900139002', '<span style="color:#2f6cf6;">供应方</span>', '广州市黄埔区科学大道 111 号信息大厦 9 层', '2026-03-17 15:42:00', '广州', `${linkBtn('修改')} ${linkBtn('删除', '已删除')}`],
        ['南方电网数字电力（广州）有限公司', '91440101MA5D7F4G9H', '黄文', '13700137003', '<span style="color:#2f6cf6;">需求方</span>', '广州市海珠区琶洲大道东 8 号保利国际广场 3 层', '2026-03-12 10:06:00', '广州', `${linkBtn('修改')} ${linkBtn('删除', '已删除')}`],
        ['南网充电运营（广州番禺）有限公司', '91440101MA5E3J6K2L', '赵琳', '13600136004', '<span style="color:#2f6cf6;">供应方</span>', '广州市番禺区汉溪大道东 290 号保利大都汇 T2 栋 12 层', '2026-03-06 13:25:00', '广州', `${linkBtn('修改')} ${linkBtn('删除', '已删除')}`],
        ['南方电网电动出行服务（广州）有限公司', '91440101MA5F8M3N7P', '周岚', '13500135005', '<span style="color:#2f6cf6;">供应方</span>', '广州市白云区云城西路 888 号绿地中心 22 层', '2026-02-28 11:34:00', '广州', `${linkBtn('修改')} ${linkBtn('删除', '已删除')}`],
        ['南网储能运维（广州南沙）有限公司', '91440101MA5H4Q2R6T', '何涛', '13400134006', '<span style="color:#2f6cf6;">需求方</span>', '广州市南沙区进港大道 577 号创享湾 6 栋 5 层', '2026-02-23 16:50:00', '广州', `${linkBtn('修改')} ${linkBtn('删除', '已删除')}`]
      ];
      const projectTable = table(headers, rows).replace('<table class="table">', '<table class="table" data-project-table>');
      const content = `
        <div class="page-title">项目信息</div>
        <div class="toolbar">
          <div class="field"><label>企业名称</label><input class="input" data-filter-project-company placeholder="请输入"></div>
          <div class="field"><label>统一社会信用代码</label><input class="input" data-filter-project-credit placeholder="请输入"></div>
          <button class="btn" data-action="search-project">搜索</button>
          <button class="btn btn-ghost" data-action="reset-project-filters">重置</button>
          <div class="spacer"></div>
          <button class="btn btn-outline" data-open="modal-new-company" data-action="new-project">新增</button>
        </div>
        <div class="card table-card" data-paginated data-page-size="25">
          ${projectTable}
          ${paginationNoSelect()}
        </div>
        <div class="modal-backdrop" id="modal-new-company">
          <div class="modal modal-xl project-config-modal">
            <h3 data-project-modal-title>添加项目配置</h3>
            <div class="modal-body project-config-form" data-project-form>
              <div class="project-config-grid">
                <div class="form-field"><label>企业名称</label><input class="input" data-field="companyName" placeholder="请输入"></div>
                <div class="form-field"><label>统一社会信用代码</label><input class="input" data-field="creditCode" placeholder="请输入"></div>
                <div class="form-field"><label>联系人</label><input class="input" data-field="contactName" placeholder="请输入"></div>
                <div class="form-field"><label>联系方式</label><input class="input" data-field="contactPhone" placeholder="请输入"></div>
                <div class="form-field"><label>公司类型</label><select class="select" data-field="companyType"><option>需求方</option><option>供应方</option></select></div>
                <div class="form-field"><label>所在区域</label><input class="input" data-field="region" placeholder="请输入"></div>
                <div class="form-field"><label>合同编号</label><input class="input" data-field="contractNo" placeholder="请输入"></div>
              </div>
              <div class="project-config-block">
                <div class="form-field form-field-stack">
                  <label>详细位置</label>
                  <textarea class="textarea lg" data-field="address" placeholder="请输入"></textarea>
                </div>
              </div>
              <div class="project-config-block project-config-block-note">
                <div class="form-field form-field-stack">
                  <label>备注</label>
                  <textarea class="textarea lg project-note" data-field="remark" placeholder="请输入"></textarea>
                </div>
              </div>
            </div>
            <div class="modal-actions modal-workorder-actions">
              <button class="btn btn-ghost" data-close>取消</button>
              <button class="btn btn-primary" data-action="save-project" data-project-submit-label>增加</button>
            </div>
          </div>
        </div>
      `;
      return layout('南网生态移动绿电管理平台', sidebarMobile('企业信息建档', { showLocation: false }), content);
    },

    'mobile-flow': () => {
      return `
        <div class="flow-page">
          <div class="flow-title">移动绿电管理平台</div>
          <div class="flow">
            <div class="flow-step">用电单位</div>
            <div class="flow-arrow"><span class="flow-dot"></span></div>
            <div class="flow-step">运营人员</div>
            <div class="flow-arrow"><span class="flow-dot"></span></div>
            <div class="flow-step">系统</div>
          </div>
          <div class="flow" style="padding-top:20px;">
            <div class="flow-step">运营人员</div>
            <div class="flow-arrow"><span class="flow-dot"></span></div>
            <div class="flow-step">系统</div>
            <div class="flow-arrow"><span class="flow-dot"></span></div>
            <div class="flow-step">储能车司机</div>
            <div class="flow-arrow"><span class="flow-dot"></span></div>
            <div class="flow-step">用电单位</div>
          </div>
        </div>
      `;
    },

    'group-schedule-list': () => {
      const headers = ['电站名称', '通讯状态', 'D', '启动状态', '调控计划时间', '执行状态', '调控方式', '调控时间', '操作人', '操作'];
      const rows = [
        ['华南中学', '<span style="color:#2fbf71;">在线</span>', '1', '已启动', '2026-03-02 18:00', '待执行', '<span style="color:#2f6cf6;">远程启动</span>', '2026-03-02 18:00', '陈大文', linkBtn('⚙')],
        ['华南中学', '<span style="color:#2fbf71;">在线</span>', '2', '已启动', '2026-03-02 18:00', '已执行', '<span style="color:#2f6cf6;">有功控制</span>', '2026-03-02 18:00', '陈大文', linkBtn('⚙')]
      ];
      const content = `
        <div class="page-title">调度计划查询</div>
        <div class="card table-card" style="background:#0c3a5a; border:none;">
          <div class="toolbar">
            <button class="btn btn-outline" data-toast="已切换">调度计划下发</button>
            <button class="btn btn-outline" data-toast="已切换">调度计划查询</button>
          </div>
          <div class="toolbar">
            <div class="field" style="color:#fff;"><label>电站名称</label><input class="input" placeholder="请输入"></div>
            <div class="field" style="color:#fff;"><label>通讯状态</label><input class="input" placeholder="请输入"></div>
            <div class="spacer"></div>
            <button class="btn btn-outline" data-toast="已搜索">搜索</button>
          </div>
        </div>
        <div class="card table-card">${table(headers, rows)}</div>
      `;
      return layout('南网生态设备管理平台', sidebarEco('电站管理'), content);
    },

    'group-control-center': () => {
      const headers = ['电站名称', '通讯状态', '光伏装机容量(kwp)', '在线逆变器额定功率(kw)', '光伏实时发电功率(kw)', '电站实时上网功率(kw)', '光伏发电情况', '光伏发电起止时间', '操作'];
      const rows = [
        [checkbox(true), '华南中学', '<span style="color:#2fbf71;">在线</span>', '194.92', '193', '19.6', '0', linkBtn('查看'), '2026-03-02 18:00', `${linkBtn('调控计划')} ${linkBtn('调控记录')}`],
        [checkbox(false), '华南中学', '<span style="color:#2fbf71;">在线</span>', '194.92', '193', '19.6', '0', linkBtn('查看'), '2026-03-02 18:00', `${linkBtn('调控计划')} ${linkBtn('调控记录')}`]
      ];
      const content = `
        <div class="page-title">调控中心</div>
        <div class="card table-card" style="background:#0c3a5a; border:none;">
          <div class="toolbar">
            <button class="btn btn-outline" data-toast="已切换">调度计划下发</button>
            <button class="btn btn-outline" data-toast="已切换">调度计划查询</button>
          </div>
          <div class="toolbar">
            <div class="field" style="color:#fff;"><label>电站名称</label><input class="input" placeholder="请输入"></div>
            <div class="field" style="color:#fff;"><label>通讯状态</label><input class="input" placeholder="请输入"></div>
            <div class="spacer"></div>
            <button class="btn btn-outline" data-toast="已搜索">搜索</button>
          </div>
        </div>
        <div class="card table-card">
          <svg class="line-chart" viewBox="0 0 600 200" preserveAspectRatio="none">
            <polyline points="0,140 60,120 120,100 180,120 240,90 300,110 360,60 420,80 480,90 540,70 600,80" fill="none" stroke="#2f6cf6" stroke-width="2" />
          </svg>
        </div>
        <div class="toolbar" style="justify-content:flex-end;">
          <button class="btn btn-primary" data-toast="已下发">批量下发调度计划</button>
        </div>
        <div class="card table-card">${table(headers, rows)}</div>
      `;
      return layout('南网生态设备管理平台', sidebarEco('电站管理'), content);
    },

    'eco-landing': () => {
      return `
        <div class="landing-header">
          <div class="logo">赫兹电站</div>
          <div style="font-size:12px;">登录 | 注册</div>
        </div>
        <div class="landing-hero">
          <h1>一站式开放服务生态平台</h1>
          <p>连接万千商家服务，赋能生态协同增长</p>
          <p>我们是一款开放型服务生态平台，致力于让各类商家、服务商快速接入，实现服务聚合、流量互通与价值共享。</p>
        </div>
        <div class="feature-grid">
          <div class="feature-card"><div class="icon">☷</div><div>电站信息</div><div style="font-size:12px; color:#7a8496;">站点全生命周期管理</div></div>
          <div class="feature-card"><div class="icon">⌂</div><div>智能调控</div><div style="font-size:12px; color:#7a8496;">智能用电与负荷优化</div></div>
          <div class="feature-card"><div class="icon">⚡</div><div>移动绿电</div><div style="font-size:12px; color:#7a8496;">移动储能调度管理</div></div>
          <div class="feature-card"><div class="icon">◎</div><div>开放能源设备管理平台</div><div style="font-size:12px; color:#7a8496;">开放API与生态接入</div></div>
          <div class="feature-card"><div class="icon">☰</div><div>数据平台</div><div style="font-size:12px; color:#7a8496;">统计分析与API能力</div></div>
        </div>
        <div class="landing-section">
          <div class="bar-chart">
            <div class="section-title">累计接入电站数量</div>
            <div class="bar-row">
              <div class="bar" style="height:40px;"></div>
              <div class="bar" style="height:65px;"></div>
              <div class="bar" style="height:120px;"></div>
              <div class="bar" style="height:70px;"></div>
              <div class="bar" style="height:80px;"></div>
              <div class="bar" style="height:75px;"></div>
              <div class="bar" style="height:68px;"></div>
              <div class="bar" style="height:100px;"></div>
              <div class="bar" style="height:110px;"></div>
              <div class="bar" style="height:105px;"></div>
            </div>
          </div>
          <div class="service-list">
            <div class="section-title">服务与资源</div>
            <div class="service-item"><span>集中式电站资产运维管理</span><button class="btn btn-outline">详情</button></div>
            <div class="service-item"><span>绿电交易与碳资产管理项目对接</span><button class="btn btn-outline">详情</button></div>
            <div class="service-item"><span>分布式光伏并网申请流程服务</span><button class="btn btn-outline">详情</button></div>
            <div class="service-item"><span>智能能源调度管理系统部署方案</span><button class="btn btn-outline">详情</button></div>
          </div>
        </div>
        <div class="footer">
          <div>联系我们 | 隐私政策 | 版权声明</div>
          <div>© 2026 赫兹电站 绿色生态 版权所有</div>
        </div>
      `;
    },

    'eco-landing-admin': () => {
      return `
        <div class="landing-header">
          <div class="logo">赫兹电站</div>
          <div style="font-size:12px;">账户名admin</div>
        </div>
        <div class="landing-hero">
          <h1>一站式开放服务生态平台</h1>
          <p>连接万千商家服务，赋能生态协同增长</p>
          <p>我们是一款开放型服务生态平台，致力于让各类商家、服务商快速接入，实现服务聚合、流量互通与价值共享。</p>
        </div>
        <div class="feature-grid">
          <div class="feature-card"><div class="icon">☷</div><div>电站信息</div><div style="font-size:12px; color:#7a8496;">站点全生命周期管理</div></div>
          <div class="feature-card"><div class="icon">⌂</div><div>智能调控</div><div style="font-size:12px; color:#7a8496;">智能用电与负荷优化</div></div>
          <div class="feature-card"><div class="icon">⚡</div><div>移动绿电</div><div style="font-size:12px; color:#7a8496;">移动储能调度管理</div></div>
          <div class="feature-card"><div class="icon">◎</div><div>开放能源设备管理平台</div><div style="font-size:12px; color:#7a8496;">开放API与生态接入</div></div>
          <div class="feature-card"><div class="icon">☰</div><div>数据平台</div><div style="font-size:12px; color:#7a8496;">统计分析与API能力</div></div>
        </div>
        <div class="landing-section">
          <div class="bar-chart">
            <div class="section-title">累计接入电站数量</div>
            <div class="bar-row">
              <div class="bar" style="height:40px;"></div>
              <div class="bar" style="height:65px;"></div>
              <div class="bar" style="height:120px;"></div>
              <div class="bar" style="height:70px;"></div>
              <div class="bar" style="height:80px;"></div>
              <div class="bar" style="height:75px;"></div>
              <div class="bar" style="height:68px;"></div>
              <div class="bar" style="height:100px;"></div>
              <div class="bar" style="height:110px;"></div>
              <div class="bar" style="height:105px;"></div>
            </div>
          </div>
          <div class="service-list">
            <div class="section-title">服务与资源</div>
            <div class="service-item"><span>集中式电站资产运维管理</span><button class="btn btn-outline">详情</button></div>
            <div class="service-item"><span>绿电交易与碳资产管理项目对接</span><button class="btn btn-outline">详情</button></div>
            <div class="service-item"><span>分布式光伏并网申请流程服务</span><button class="btn btn-outline">详情</button></div>
            <div class="service-item"><span>智能能源调度管理系统部署方案</span><button class="btn btn-outline">详情</button></div>
          </div>
        </div>
        <div class="footer">
          <div>联系我们 | 隐私政策 | 版权声明</div>
          <div>© 2026 赫兹电站 绿色生态 版权所有</div>
        </div>
      `;
    }
  };

  const pageClasses = {
    'login-phone': 'auth-page',
    'register': 'auth-page',
    'reset-password': 'auth-page',
    'energy-dashboard': 'dashboard-page',
    'eco-landing': 'landing-page',
    'eco-landing-admin': 'landing-page',
    'bind-platform': 'hz-layout'
  };

  const pageId = document.body.dataset.page;
  const app = document.getElementById('app');
  document.body.className = pageClasses[pageId] || 'app-page';

  if (pages[pageId]) {
    app.innerHTML = pages[pageId]();
  } else {
    app.innerHTML = '<div class="page-title">页面未配置</div>';
  }
})();
