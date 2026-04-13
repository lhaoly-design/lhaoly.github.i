(function(){
  const $ = (id) => document.getElementById(id);
  const parseTrim = (value) => (value ?? "").toString().trim();
const umState = {
    inited: false,
    activeTab: "account",
    selectedOrgId: "",
    editingOrgId: "",
    editingRoleId: "",
    editingAccountId: "",
    center: null
  };
  function initUserManageModule() {
    if (umState.inited) return;
    {
      const rootEl = $("umRoot");
      if (!rootEl) return;

      const storageKey = "op_user_access_center_v2";
      const legacyKey = "op_user_mgmt_users_v1";
      const esc = (value) => String(value ?? "")
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/\"/g, "&quot;")
        .replace(/'/g, "&#39;");
      const nowText = () => new Date().toLocaleString("zh-CN", { hour12: false });
      const gid = (prefix) => `${prefix}-${Date.now().toString().slice(-8)}-${Math.floor(Math.random() * 900 + 100)}`;
      const uniq = (rows) => [...new Set((Array.isArray(rows) ? rows : []).map((x) => parseTrim(x)).filter(Boolean))];

      const APP_LABEL = { OPS: "运营端", GRID: "供电局端", BOTH: "双端" };
      const TYPE_LABEL = { OPS: "运营账号", GRID: "供电局账号", DUAL: "双端账号" };
      const ORG_LABEL = { OPS_CENTER: "运营中心", PROVINCE: "省公司", CITY: "市局", DISTRICT: "区局", TEAM: "班组" };
      const EXCLUDED_ROLE_PERMS = new Set(["接入管理", "配置中心", "监控审计"]);
      const MENU_PERM_FALLBACK = [
        "基础配置",
        "台区管理",
        "公司信息",
        "我的应用"
      ];
      const getMenuPerms = () => {
        const nodes = Array.from(document.querySelectorAll(".tabs .tabs-parent"));
        const labels = nodes.map((node) => {
          const labelNode = node.querySelector("span:not(.tabs-caret)");
          const raw = labelNode ? labelNode.textContent : node.textContent;
          return parseTrim(String(raw || "").replace(/▾/g, ""));
        }).filter((label) => label && !EXCLUDED_ROLE_PERMS.has(label));
        return uniq(labels).length ? uniq(labels) : [...MENU_PERM_FALLBACK];
      };
      const MENU_PERMS = getMenuPerms();
      const MENU_PERM_SET = new Set(MENU_PERMS);
      const ROLE_PERMS = {
        OPS: [...MENU_PERMS],
        GRID: [...MENU_PERMS],
        BOTH: [...MENU_PERMS]
      };
      const pickPerms = (names, fallbackCount = 2) => {
        const picked = MENU_PERMS.filter((x) => names.includes(x));
        return picked.length ? picked : MENU_PERMS.slice(0, fallbackCount);
      };

      const seed = () => ({ orgs: [], roles: [], accounts: [] });

      const load = () => {
        const DEMO_ORG_IDS = new Set(["ORG-OPS", "ORG-GD", "ORG-GZ"]);
        const DEMO_ROLE_IDS = new Set(["R-OPS-ADMIN", "R-OPS-OP", "R-GRID-ADMIN", "R-GRID-OP"]);
        const DEMO_ACCOUNT_IDS = new Set(["U-ADMIN-001", "U-OPS-001", "U-GRID-001", "U-DISPATCH-01", "U-OPER-001"]);
        const sanitize = (payload) => {
          const src = payload && typeof payload === "object" ? payload : {};
          const orgs = (Array.isArray(src.orgs) ? src.orgs : [])
            .filter((row) => row && typeof row === "object")
            .map((row) => ({
              id: parseTrim(row.id) || gid("ORG"),
              name: parseTrim(row.name),
              code: parseTrim(row.code),
              type: parseTrim(row.type) || "CITY",
              parentId: "",
              status: parseTrim(row.status) === "DISABLED" ? "DISABLED" : "ENABLED",
              remark: parseTrim(row.remark),
              createdAtMs: Number(row.createdAtMs) || Date.now(),
              system: false
            }))
            .filter((row) => row.name && row.code && !DEMO_ORG_IDS.has(row.id) && !row.system);
          const roles = (Array.isArray(src.roles) ? src.roles : [])
            .filter((row) => row && typeof row === "object")
            .map((row) => {
              const perms = uniq(Array.isArray(row.perms) ? row.perms : [])
                .filter((perm) => MENU_PERM_SET.has(parseTrim(perm)));
              if (!perms.length && MENU_PERMS.length) perms.push(MENU_PERMS[0]);
              return {
                id: parseTrim(row.id) || gid("R"),
                name: parseTrim(row.name),
                code: parseTrim(row.code),
                app: ["OPS", "GRID", "BOTH"].includes(parseTrim(row.app)) ? parseTrim(row.app) : "OPS",
                perms,
                status: parseTrim(row.status) === "DISABLED" ? "DISABLED" : "ENABLED",
                remark: parseTrim(row.remark),
                createdAtMs: Number(row.createdAtMs) || Date.now(),
                system: false
              };
            })
            .filter((row) => row.name && row.code && row.perms.length && !DEMO_ROLE_IDS.has(row.id) && !row.system);
          const orgSet = new Set(orgs.map((row) => row.id));
          const roleSet = new Set(roles.map((row) => row.id));
          const accounts = (Array.isArray(src.accounts) ? src.accounts : [])
            .filter((row) => row && typeof row === "object")
            .map((row) => ({
              id: parseTrim(row.id) || gid("U"),
              account: parseTrim(row.account),
              name: parseTrim(row.name),
              orgId: parseTrim(row.orgId),
              type: ["OPS", "GRID", "DUAL"].includes(parseTrim(row.type)) ? parseTrim(row.type) : "OPS",
              roleId: parseTrim(row.roleId),
              apps: uniq(Array.isArray(row.apps) ? row.apps : []),
              status: parseTrim(row.status) === "DISABLED" ? "DISABLED" : "ENABLED",
              password: parseTrim(row.password),
              lastLogin: parseTrim(row.lastLogin) || "-",
              scope: ["ALL", "ORG", "CUSTOM"].includes(parseTrim(row.scope)) ? parseTrim(row.scope) : "ORG",
              areas: uniq(Array.isArray(row.areas) ? row.areas : []),
              remark: parseTrim(row.remark),
              createdAtMs: Number(row.createdAtMs) || Date.now()
            }))
            .filter((row) => row.account && row.name && orgSet.has(row.orgId) && roleSet.has(row.roleId) && !DEMO_ACCOUNT_IDS.has(row.id));
          return { orgs, roles, accounts };
        };

        let parsed = null;
        try {
          const raw = localStorage.getItem(storageKey);
          if (raw) parsed = JSON.parse(raw);
        } catch (error) {}
        const clean = sanitize(parsed || seed());
        const mergeById = (base, extra) => {
          const map = new Map();
          (Array.isArray(base) ? base : []).forEach((row) => row && map.set(row.id, row));
          (Array.isArray(extra) ? extra : []).forEach((row) => {
            if (row && !map.has(row.id)) map.set(row.id, row);
          });
          return Array.from(map.values());
        };
        const nowMs = Date.now();
        const demo = {
          orgs: [
            { id: "ORG-OPS", name: "运营中心", code: "OPS-0001", type: "OPS_CENTER", parentId: "", status: "ENABLED", remark: "总部运营中心", createdAtMs: nowMs - 120 * 86400000, system: true },
            { id: "ORG-GD", name: "广东省公司", code: "GD-PRV-001", type: "PROVINCE", parentId: "", status: "ENABLED", remark: "省级单位", createdAtMs: nowMs - 110 * 86400000, system: true },
            { id: "ORG-GZ", name: "广州市局", code: "GZ-CITY-002", type: "CITY", parentId: "ORG-GD", status: "ENABLED", remark: "地市局", createdAtMs: nowMs - 100 * 86400000, system: true }
          ],
          roles: [
            { id: "R-OPS-ADMIN", name: "运营超级管理员", code: "OPS-ADMIN", app: "OPS", perms: [...MENU_PERMS], status: "ENABLED", remark: "运营端最高权限", createdAtMs: nowMs - 90 * 86400000, system: true },
            { id: "R-OPS-OP", name: "运营调度员", code: "OPS-OP", app: "OPS", perms: pickPerms(["基础配置", "我的应用"], 2), status: "ENABLED", remark: "运营调度与策略分析", createdAtMs: nowMs - 85 * 86400000, system: true },
            { id: "R-GRID-ADMIN", name: "供电局管理员", code: "GRID-ADMIN", app: "GRID", perms: [...MENU_PERMS], status: "ENABLED", remark: "供电局端管理权限", createdAtMs: nowMs - 80 * 86400000, system: true },
            { id: "R-GRID-OP", name: "台区运维员", code: "GRID-OP", app: "GRID", perms: pickPerms(["台区管理", "我的应用"], 2), status: "ENABLED", remark: "台区日常运维", createdAtMs: nowMs - 78 * 86400000, system: true }
          ],
          accounts: [
            { id: "U-ADMIN-001", account: "13800001234", name: "系统管理员", orgId: "ORG-OPS", type: "OPS", roleId: "R-OPS-ADMIN", apps: ["OPS"], status: "ENABLED", password: "******", lastLogin: nowText(), scope: "ALL", areas: [], remark: "内置管理员账号", createdAtMs: nowMs - 60 * 86400000 },
            { id: "U-OPS-001", account: "13688880101", name: "策略运营", orgId: "ORG-OPS", type: "OPS", roleId: "R-OPS-OP", apps: ["OPS"], status: "ENABLED", password: "******", lastLogin: nowText(), scope: "ORG", areas: ["029000646698"], remark: "策略分析值班", createdAtMs: nowMs - 50 * 86400000 },
            { id: "U-OPS-002", account: "13755560202", name: "审计专员", orgId: "ORG-OPS", type: "OPS", roleId: "R-OPS-OP", apps: ["OPS"], status: "ENABLED", password: "******", lastLogin: nowText(), scope: "ORG", areas: [], remark: "运营审计", createdAtMs: nowMs - 45 * 86400000 },
            { id: "U-GRID-001", account: "13977770303", name: "配网调度", orgId: "ORG-GZ", type: "GRID", roleId: "R-GRID-ADMIN", apps: ["GRID"], status: "ENABLED", password: "******", lastLogin: nowText(), scope: "ORG", areas: ["029000646699"], remark: "供电局调度席", createdAtMs: nowMs - 40 * 86400000 },
            { id: "U-DISPATCH-01", account: "13566660404", name: "联调调度", orgId: "ORG-GD", type: "DUAL", roleId: "R-OPS-OP", apps: ["OPS", "GRID"], status: "ENABLED", password: "******", lastLogin: nowText(), scope: "ORG", areas: ["029000646700"], remark: "双端联合调度", createdAtMs: nowMs - 35 * 86400000 },
            { id: "U-OPER-001", account: "13499990505", name: "台区运维", orgId: "ORG-GZ", type: "GRID", roleId: "R-GRID-OP", apps: ["GRID"], status: "DISABLED", password: "******", lastLogin: "-", scope: "ORG", areas: ["029000646699"], remark: "停用账号示例", createdAtMs: nowMs - 30 * 86400000 }
          ]
        };
        const merged = {
          orgs: mergeById(demo.orgs, clean.orgs),
          roles: mergeById(demo.roles, clean.roles),
          accounts: mergeById(demo.accounts, clean.accounts)
        };
        try { localStorage.removeItem(legacyKey); } catch (error) {}
        try { localStorage.setItem(storageKey, JSON.stringify(merged)); } catch (error) {}
        return merged;
      };

      const save = () => {
        try { localStorage.setItem(storageKey, JSON.stringify(umState.center)); } catch (error) {}
        try {
          const oldRows = umState.center.accounts.map((row) => ({
            id: row.id,
            account: row.account,
            name: row.name,
            role: row.roleId === "R-OPS-ADMIN" ? "ADMIN" : "OPERATOR",
            status: row.status,
            lastLogin: row.lastLogin,
            remark: row.remark,
            password: row.password,
            createdAtMs: row.createdAtMs
          }));
          localStorage.setItem(legacyKey, JSON.stringify(oldRows));
        } catch (error) {}
      };

      umState.center = load();
      if (!umState.selectedOrgId) umState.selectedOrgId = "ALL";
      if (!["org", "acc", "role"].includes(umState.activeTab)) umState.activeTab = "acc";

      const appContext = parseTrim(document.querySelector(".brand-tag")?.textContent || document.title || "");
      const showAppField = appContext.includes("运营端");
      const roleAppFilterMarkup = showAppField
        ? `<div class="f"><label>应用端</label><select id="um2RoleAppF"><option value="ALL">全部</option><option value="OPS">运营端</option><option value="GRID">供电局端</option><option value="BOTH">双端</option></select></div>`
        : "";
      const roleTableAppHead = showAppField ? "<th>应用端</th>" : "";
      const roleModalAppFieldMarkup = showAppField
        ? `<div class="f"><label>应用端</label><select id="um2RoleApp"><option value="OPS">运营端</option><option value="GRID">供电局端</option><option value="BOTH">双端</option></select></div>`
        : "";

      rootEl.innerHTML = `
        <div class="um-center">
          <div class="um-stats">
            <div class="um-stat"><div class="n">组织数</div><div class="v" id="um2StatOrg">0</div></div>
            <div class="um-stat"><div class="n">账号总数</div><div class="v" id="um2StatAcc">0</div></div>
            <div class="um-stat"><div class="n">停用账号</div><div class="v" id="um2StatOff">0</div></div>
            <div class="um-stat"><div class="n">角色数</div><div class="v" id="um2StatRole">0</div></div>
          </div>
          <div class="um-layout">
            <aside class="um-block">
              <div class="um-head"><div><h4>组织树</h4><p>按组织筛选账号</p></div><button class="btn s" id="um2OrgQuick" type="button">新增组织</button></div>
              <div class="um-tree" id="um2Tree"></div>
            </aside>
            <div class="um-main">
              <div class="um-subtabs" id="um2Tabs">
                <button class="on" data-tab="org" type="button">组织管理</button>
                <button data-tab="role" type="button">角色权限</button>
                <button data-tab="acc" type="button">账号管理</button>
              </div>
              <section class="um-panel on" data-panel="org">
                <article class="um-block">
                  <div class="um-filter-grid with-actions actions-2">
                    <div class="f"><label>关键词</label><input id="um2OrgKw" type="text" placeholder="组织名称/编码"></div>
                    <div class="f"><label>状态</label><select id="um2OrgStatusF"><option value="ALL">全部</option><option value="ENABLED">启用</option><option value="DISABLED">停用</option></select></div>
                    <div class="um-filter-actions"><button class="btn p" id="um2OrgSearch" type="button">查询</button><button class="btn s" id="um2OrgReset" type="button">重置</button><button class="btn s" id="um2OrgAdd" type="button">新增组织</button></div>
                  </div>
                  <div class="um-note" id="um2OrgMeta">-</div>
                  <div class="um-table"><table><thead><tr><th>组织</th><th>编码</th><th>类型</th><th>状态</th><th>账号数</th><th>操作</th></tr></thead><tbody id="um2OrgBody"></tbody></table></div>
                  <div class="qc-pager" id="um2OrgPager">
                    <span>每页</span>
                    <select id="um2OrgPageSize">
                      <option value="10" selected>10</option>
                      <option value="20">20</option>
                      <option value="50">50</option>
                      <option value="100">100</option>
                    </select>
                    <span>共</span><b id="um2OrgCount">0</b><span>条</span>
                    <button class="btn s" id="um2OrgPrev" type="button">上一页</button>
                    <span id="um2OrgPageInfo">1/1</span>
                    <button class="btn s" id="um2OrgNext" type="button">下一页</button>
                  </div>
                </article>
              </section>

              <section class="um-panel" data-panel="acc">
                <article class="um-block">
                  <div class="um-filter-grid with-actions actions-3">
                    <div class="f"><label>关键词</label><input id="um2AccKw" type="text" placeholder="账号/姓名/备注"></div>
                    <div class="f"><label>类型</label><select id="um2AccTypeF"><option value="ALL">全部</option><option value="OPS">运营账号</option><option value="GRID">供电局账号</option><option value="DUAL">双端账号</option></select></div>
                    <div class="f"><label>状态</label><select id="um2AccStatusF"><option value="ALL">全部</option><option value="ENABLED">启用</option><option value="DISABLED">停用</option></select></div>
                    <div class="um-filter-actions"><button class="btn p" id="um2AccSearch" type="button">查询</button><button class="btn s" id="um2AccReset" type="button">重置</button><button class="btn s" id="um2AccAdd" type="button">新增账号</button></div>
                  </div>
                  <div class="um-note" id="um2AccMeta">-</div>
                  <div class="um-table"><table><thead><tr><th>账号</th><th>姓名</th><th>归属组织</th><th>类型</th><th>账号角色</th><th>端</th><th>状态</th><th>最近登录</th><th>操作</th></tr></thead><tbody id="um2AccBody"></tbody></table></div>
                  <div class="qc-pager" id="um2AccPager">
                    <span>每页</span>
                    <select id="um2AccPageSize">
                      <option value="10" selected>10</option>
                      <option value="20">20</option>
                      <option value="50">50</option>
                      <option value="100">100</option>
                    </select>
                    <span>共</span><b id="um2AccCount">0</b><span>条</span>
                    <button class="btn s" id="um2AccPrev" type="button">上一页</button>
                    <span id="um2AccPageInfo">1/1</span>
                    <button class="btn s" id="um2AccNext" type="button">下一页</button>
                  </div>
                </article>
              </section>

              <section class="um-panel" data-panel="role">
                <article class="um-block">
                  <div class="um-filter-grid with-actions actions-2"><div class="f"><label>关键词</label><input id="um2RoleKw" type="text"></div>${roleAppFilterMarkup}<div class="um-filter-actions"><button class="btn p" id="um2RoleSearch" type="button">查询</button><button class="btn s" id="um2RoleReset" type="button">重置</button><button class="btn s" id="um2RoleAdd" type="button">新增角色</button></div></div>
                  <div class="um-note" id="um2RoleMeta">-</div>
                  <div class="um-table"><table><thead><tr><th>角色</th><th>编码</th>${roleTableAppHead}<th>权限</th><th>账号数</th><th>状态</th><th>操作</th></tr></thead><tbody id="um2RoleBody"></tbody></table></div>
                  <div class="qc-pager" id="um2RolePager">
                    <span>每页</span>
                    <select id="um2RolePageSize">
                      <option value="10" selected>10</option>
                      <option value="20">20</option>
                      <option value="50">50</option>
                      <option value="100">100</option>
                    </select>
                    <span>共</span><b id="um2RoleCount">0</b><span>条</span>
                    <button class="btn s" id="um2RolePrev" type="button">上一页</button>
                    <span id="um2RolePageInfo">1/1</span>
                    <button class="btn s" id="um2RoleNext" type="button">下一页</button>
                  </div>
                </article>
              </section>
            </div>
          </div>

          <div class="um-modal" id="um2OrgModal">
            <div class="um-block um-modal-card">
              <div class="um-head"><div><h4 id="um2OrgTitle">新增组织</h4><p>可用于账号归属</p></div><button class="btn s um-mini-btn" id="um2OrgClose" type="button">关闭</button></div>
              <div class="um-form-grid">
                <div class="f"><label>组织名称</label><input id="um2OrgName" type="text"></div>
                <div class="f"><label>组织编码（系统生成）</label><input id="um2OrgCode" type="text" readonly></div>
                <div class="f"><label>组织类型</label><select id="um2OrgType"><option value="OPS_CENTER">运营中心</option><option value="PROVINCE">省公司</option><option value="CITY">市局</option><option value="DISTRICT">区局</option><option value="TEAM">班组</option></select></div>
                <div class="f"><label>状态</label><select id="um2OrgStatus"><option value="ENABLED">启用</option><option value="DISABLED">停用</option></select></div>
                <div class="f"><label>备注</label><input id="um2OrgRemark" type="text"></div>
              </div>
              <div class="um-msg" id="um2OrgMsg">请填写后保存。</div>
              <div class="um-actions"><button class="btn p" id="um2OrgSave" type="button">保存</button><button class="btn s" id="um2OrgNew" type="button">重置</button></div>
            </div>
          </div>

          <div class="um-modal" id="um2AccModal">
            <div class="um-block um-modal-card">
              <div class="um-head"><div><h4 id="um2AccTitle">新增账号</h4><p>供电局账号需勾选供电局端</p></div><button class="btn s um-mini-btn" id="um2AccClose" type="button">关闭</button></div>
              <div class="um-form-grid">
                <div class="f"><label>账号</label><input id="um2AccAccount" type="text"></div>
                <div class="f"><label>姓名</label><input id="um2AccName" type="text"></div>
                <div class="f"><label>归属组织</label><select id="um2AccOrg"></select></div>
                <div class="f"><label>账号类型</label><select id="um2AccType"><option value="OPS">运营账号</option><option value="GRID">供电局账号</option><option value="DUAL">双端账号</option></select></div>
                <div class="f"><label>账号角色</label><select id="um2AccRole"></select></div>
                <div class="f"><label>状态</label><select id="um2AccStatus"><option value="ENABLED">启用</option><option value="DISABLED">停用</option></select></div>
                <div class="f"><label>密码</label><input id="um2AccPwd" type="password" placeholder="新增必填，编辑留空不改"></div>
                <div class="f" style="grid-column:span 2;"><label>可登录端</label><div class="um-login-apps"><label class="um-login-option"><input id="um2AccAppOps" type="checkbox" checked>运营端</label><label class="um-login-option"><input id="um2AccAppGrid" type="checkbox">供电局端</label></div></div>
                <div class="f" style="grid-column:span 3;"><label>备注</label><input id="um2AccRemark" type="text"></div>
              </div>
              <div class="um-msg" id="um2AccMsg">请填写后保存。</div>
              <div class="um-actions"><button class="btn p" id="um2AccSave" type="button">保存</button><button class="btn s" id="um2AccNew" type="button">重置</button></div>
            </div>
          </div>

          <div class="um-modal" id="um2RoleModal">
            <div class="um-block um-modal-card">
              <div class="um-head"><div><h4 id="um2RoleTitle">新增角色</h4><p>在此配置角色可拥有的权限</p></div><button class="btn s um-mini-btn" id="um2RoleClose" type="button">关闭</button></div>
              <div class="um-form-grid"><div class="f"><label>角色名</label><input id="um2RoleName" type="text"></div><div class="f"><label>编码（系统生成）</label><input id="um2RoleCode" type="text" readonly></div>${roleModalAppFieldMarkup}<div class="f"><label>状态</label><select id="um2RoleStatus"><option value="ENABLED">启用</option><option value="DISABLED">停用</option></select></div><div class="f" style="grid-column:span 2;"><label>备注</label><input id="um2RoleRemark" type="text"></div><div class="f" style="grid-column:span 3;"><label>权限配置</label><div id="um2RolePermBox" class="um-check-wrap"></div></div></div>
              <div class="um-msg" id="um2RoleMsg">请填写后保存。</div>
              <div class="um-actions"><button class="btn p" id="um2RoleSave" type="button">保存</button><button class="btn s" id="um2RoleNew" type="button">重置</button></div>
            </div>
          </div>
        </div>
      `;

      const D = (id) => rootEl.querySelector(`#${id}`);
      const getOrg = (id) => umState.center.orgs.find((x) => x.id === id);
      const getRole = (id) => umState.center.roles.find((x) => x.id === id);
      const getAcc = (id) => umState.center.accounts.find((x) => x.id === id);
      const pagerState = {
        org: { page: 1, pageSize: 10 },
        role: { page: 1, pageSize: 10 },
        acc: { page: 1, pageSize: 10 }
      };
      const normalizePageSize = (value, fallback = 10) => {
        const next = Number(value);
        return Number.isFinite(next) && next > 0 ? next : fallback;
      };
      const applyPager = (rows, state, refs) => {
        const total = rows.length;
        const totalPages = Math.max(1, Math.ceil(total / state.pageSize));
        if (state.page > totalPages) state.page = totalPages;
        if (state.page < 1) state.page = 1;
        const start = (state.page - 1) * state.pageSize;
        const pageRows = rows.slice(start, start + state.pageSize);
        if (refs.count) refs.count.textContent = String(total);
        if (refs.pageInfo) refs.pageInfo.textContent = `${state.page}/${totalPages}`;
        if (refs.prev) refs.prev.disabled = state.page <= 1;
        if (refs.next) refs.next.disabled = state.page >= totalPages;
        return pageRows;
      };
      const bindPager = (state, refs, onChange) => {
        if (refs.pageSize) {
          refs.pageSize.value = String(state.pageSize);
          refs.pageSize.addEventListener("change", () => {
            state.pageSize = normalizePageSize(refs.pageSize.value, state.pageSize);
            state.page = 1;
            onChange();
          });
        }
        if (refs.prev) {
          refs.prev.addEventListener("click", () => {
            if (state.page > 1) {
              state.page -= 1;
              onChange();
            }
          });
        }
        if (refs.next) {
          refs.next.addEventListener("click", () => {
            state.page += 1;
            onChange();
          });
        }
      };
      const inOrg = (orgId, rootId) => {
        if (!rootId || rootId === "ALL") return true;
        let cur = parseTrim(orgId);
        while (cur) {
          if (cur === rootId) return true;
          cur = parseTrim(getOrg(cur)?.parentId);
        }
        return false;
      };
      const roleName = (id) => getRole(id)?.name || "-";
      const sortDesc = (rows) => [...rows].sort((a, b) => Number(b.createdAtMs || 0) - Number(a.createdAtMs || 0));
      const genOrgCode = () => {
        const pad = (n, len = 2) => String(n).padStart(len, "0");
        let attempts = 0;
        while (attempts < 40) {
          const d = new Date();
          const candidate = `ORG${d.getFullYear()}${pad(d.getMonth() + 1)}${pad(d.getDate())}${pad(d.getHours())}${pad(d.getMinutes())}${pad(d.getSeconds())}${Math.floor(Math.random() * 900 + 100)}`;
          if (!umState.center.orgs.some((org) => parseTrim(org.code).toUpperCase() === candidate.toUpperCase())) return candidate;
          attempts += 1;
        }
        return `ORG${Date.now()}${Math.floor(Math.random() * 900 + 100)}`;
      };
      const genRoleCode = () => {
        const pad = (n, len = 2) => String(n).padStart(len, "0");
        let attempts = 0;
        while (attempts < 40) {
          const d = new Date();
          const candidate = `ROLE${d.getFullYear()}${pad(d.getMonth() + 1)}${pad(d.getDate())}${pad(d.getHours())}${pad(d.getMinutes())}${pad(d.getSeconds())}${Math.floor(Math.random() * 900 + 100)}`;
          if (!umState.center.roles.some((role) => parseTrim(role.code).toUpperCase() === candidate.toUpperCase())) return candidate;
          attempts += 1;
        }
        return `ROLE${Date.now()}${Math.floor(Math.random() * 900 + 100)}`;
      };
      const setMsg = (id, type, text) => {
        const node = D(id);
        if (!node) return;
        node.className = `um-msg ${type || "warn"}`;
        node.textContent = text;
      };
      const syncModalLock = () => {
        document.body.classList.toggle("um-modal-open", Boolean(document.querySelector(".um-modal.on")));
      };
      const toggleModal = (id, open) => {
        const node = D(id);
        if (!node) return;
        node.classList.toggle("on", Boolean(open));
        syncModalLock();
      };
      const closeAllModals = () => {
        ["um2OrgModal", "um2AccModal", "um2RoleModal"].forEach((id) => toggleModal(id, false));
      };
      const openModal = (id) => {
        closeAllModals();
        toggleModal(id, true);
      };
      ["um2OrgModal", "um2AccModal", "um2RoleModal"].forEach((id) => {
        const modal = D(id);
        if (!modal) return;
        modal.addEventListener("click", (event) => {
          if (event.target === modal) toggleModal(id, false);
        });
      });
      const rolePermOptions = () => [...MENU_PERMS];
      const getCheckedPerms = () => {
        const box = D("um2RolePermBox");
        if (!box) return [];
        return uniq([...box.querySelectorAll("input[type='checkbox']:checked")].map((node) => parseTrim(node.value)));
      };
      const renderRolePermBox = (selected = []) => {
        const box = D("um2RolePermBox");
        if (!box) return;
        const options = rolePermOptions();
        const selectedSet = new Set(uniq(selected));
        box.innerHTML = options.map((perm) => {
          const checked = selectedSet.has(perm) ? "checked" : "";
          return `<label class="um-check-item"><input type="checkbox" value="${esc(perm)}" ${checked}><span>${esc(perm)}</span></label>`;
        }).join("");
      };
      const swTab = (tab) => {
        umState.activeTab = tab;
        [...D("um2Tabs").querySelectorAll("button[data-tab]")].forEach((btn) => btn.classList.toggle("on", btn.dataset.tab === tab));
        [...rootEl.querySelectorAll(".um-panel")].forEach((panel) => panel.classList.toggle("on", panel.dataset.panel === tab));
        const sideSub = document.getElementById("umMenuSub");
        if (sideSub) {
          [...sideSub.querySelectorAll("button[data-um-open]")].forEach((btn) => {
            btn.classList.toggle("on", btn.dataset.umOpen === tab);
          });
        }
        const titleNode = document.getElementById("umTitle");
        if (titleNode) {
          const titleMap = { org: "组织管理", role: "角色管理", acc: "账号管理" };
          titleNode.textContent = titleMap[tab] || "用户管理";
        }
      };
      const renderSelects = () => {
        D("um2AccOrg").innerHTML = sortDesc(umState.center.orgs).map((o) => `<option value="${esc(o.id)}">${esc(o.name)}</option>`).join("");
        D("um2AccRole").innerHTML = sortDesc(umState.center.roles).map((r) => {
          const appLabel = showAppField ? `（${esc(APP_LABEL[r.app] || r.app)}）` : "";
          return `<option value="${esc(r.id)}">${esc(r.name)}${appLabel}</option>`;
        }).join("");
      };

      const renderStats = () => {
        D("um2StatOrg").textContent = `${umState.center.orgs.length}`;
        D("um2StatAcc").textContent = `${umState.center.accounts.length}`;
        D("um2StatOff").textContent = `${umState.center.accounts.filter((a) => a.status === "DISABLED").length}`;
        D("um2StatRole").textContent = `${umState.center.roles.length}`;
      };

      const renderTree = () => {
        const rows = [`<button class="um-tree-item ${umState.selectedOrgId === "ALL" ? "on" : ""}" data-org="ALL" type="button"><span>全部组织</span><span class="um-tree-count">${umState.center.accounts.length}</span></button>`];
        const walk = (pid, deep) => {
          umState.center.orgs.filter((o) => parseTrim(o.parentId) === parseTrim(pid)).forEach((o) => {
            const count = umState.center.accounts.filter((a) => inOrg(a.orgId, o.id)).length;
            rows.push(`<button class="um-tree-item ${umState.selectedOrgId === o.id ? "on" : ""}" data-org="${esc(o.id)}" type="button" style="padding-left:${8 + deep * 16}px;"><span>${esc(o.name)}</span><span class="um-tree-count">${count}</span></button>`);
            walk(o.id, deep + 1);
          });
        };
        walk("", 0);
        D("um2Tree").innerHTML = rows.join("");
      };

      const renderOrgTable = () => {
        const kw = parseTrim(D("um2OrgKw").value).toLowerCase();
        const sf = D("um2OrgStatusF").value || "ALL";
        const rows = sortDesc(umState.center.orgs).filter((o) => (sf === "ALL" || o.status === sf) && (!kw || [o.name, o.code, o.remark].join("|").toLowerCase().includes(kw)));
        const pageRows = applyPager(rows, pagerState.org, {
          count: D("um2OrgCount"),
          pageInfo: D("um2OrgPageInfo"),
          prev: D("um2OrgPrev"),
          next: D("um2OrgNext")
        });
        D("um2OrgBody").innerHTML = pageRows.length ? pageRows.map((o) => `<tr><td>${esc(o.name)}</td><td>${esc(o.code)}</td><td>${esc(ORG_LABEL[o.type] || o.type)}</td><td><span class="dce-tag ${o.status === "ENABLED" ? "ok" : "off"}">${o.status === "ENABLED" ? "启用" : "停用"}</span></td><td>${umState.center.accounts.filter((a) => inOrg(a.orgId, o.id)).length}</td><td><button class="btn s um-mini-btn" data-org-act="edit" data-id="${esc(o.id)}" type="button">编辑</button><button class="btn s um-mini-btn" data-org-act="del" data-id="${esc(o.id)}" type="button">删除</button></td></tr>`).join("") : `<tr><td colspan="6" style="text-align:center;color:#567099;">暂无记录</td></tr>`;
        D("um2OrgMeta").textContent = `共 ${umState.center.orgs.length} 个组织，筛选 ${rows.length} 个。`;
      };

      const renderRoleTable = () => {
        const kw = parseTrim(D("um2RoleKw").value).toLowerCase();
        const af = showAppField ? (D("um2RoleAppF")?.value || "ALL") : "ALL";
        const rows = sortDesc(umState.center.roles).filter((r) => {
          if (af !== "ALL" && r.app !== af) return false;
          return !kw || [r.name, r.code, r.remark].join("|").toLowerCase().includes(kw);
        });
        const pageRows = applyPager(rows, pagerState.role, {
          count: D("um2RoleCount"),
          pageInfo: D("um2RolePageInfo"),
          prev: D("um2RolePrev"),
          next: D("um2RoleNext")
        });
        const emptyCols = showAppField ? 7 : 6;
        D("um2RoleBody").innerHTML = pageRows.length ? pageRows.map((r) => {
          const appCell = showAppField ? `<td>${esc(APP_LABEL[r.app] || r.app)}</td>` : "";
          return `<tr><td>${esc(r.name)}</td><td>${esc(r.code)}</td>${appCell}<td>${esc((r.perms || []).join("、") || "-")}</td><td>${umState.center.accounts.filter((a) => a.roleId === r.id).length}</td><td><span class="dce-tag ${r.status === "ENABLED" ? "ok" : "off"}">${r.status === "ENABLED" ? "启用" : "停用"}</span></td><td><button class="btn s um-mini-btn" data-role-act="edit" data-id="${esc(r.id)}" type="button">编辑</button><button class="btn s um-mini-btn" data-role-act="del" data-id="${esc(r.id)}" type="button">删除</button></td></tr>`;
        }).join("") : `<tr><td colspan="${emptyCols}" style="text-align:center;color:#567099;">暂无记录</td></tr>`;
        D("um2RoleMeta").textContent = `共 ${umState.center.roles.length} 个角色，筛选 ${rows.length} 个。`;
      };

      const renderAccTable = () => {
        const kw = parseTrim(D("um2AccKw").value).toLowerCase();
        const tf = D("um2AccTypeF").value || "ALL";
        const sf = D("um2AccStatusF").value || "ALL";
        const rows = sortDesc(umState.center.accounts).filter((a) => inOrg(a.orgId, umState.selectedOrgId) && (tf === "ALL" || a.type === tf) && (sf === "ALL" || a.status === sf) && (!kw || [a.account, a.name, a.remark, getOrg(a.orgId)?.name || ""].join("|").toLowerCase().includes(kw)));
        const pageRows = applyPager(rows, pagerState.acc, {
          count: D("um2AccCount"),
          pageInfo: D("um2AccPageInfo"),
          prev: D("um2AccPrev"),
          next: D("um2AccNext")
        });
        D("um2AccBody").innerHTML = pageRows.length ? pageRows.map((a) => {
          const toggleClass = a.status === "ENABLED" ? " um-mini-btn-danger" : "";
          return `<tr><td>${esc(a.account)}</td><td>${esc(a.name)}</td><td>${esc(getOrg(a.orgId)?.name || "-")}</td><td>${esc(TYPE_LABEL[a.type] || a.type)}</td><td>${esc(roleName(a.roleId))}</td><td>${esc((a.apps || []).map((x) => APP_LABEL[x]).join("/") || "-")}</td><td><span class="dce-tag ${a.status === "ENABLED" ? "ok" : "off"}">${a.status === "ENABLED" ? "启用" : "停用"}</span></td><td>${esc(a.lastLogin || "-")}</td><td><button class="btn s um-mini-btn" data-acc-act="edit" data-id="${esc(a.id)}" type="button">编辑</button><button class="btn s um-mini-btn${toggleClass}" data-acc-act="toggle" data-id="${esc(a.id)}" type="button">${a.status === "ENABLED" ? "停用" : "启用"}</button><button class="btn s um-mini-btn" data-acc-act="del" data-id="${esc(a.id)}" type="button">删除</button></td></tr>`;
        }).join("") : `<tr><td colspan="9" style="text-align:center;color:#567099;">暂无记录</td></tr>`;
        D("um2AccMeta").textContent = `组织：${umState.selectedOrgId === "ALL" ? "全部组织" : (getOrg(umState.selectedOrgId)?.name || "-")}，共 ${umState.center.accounts.length} 个账号，筛选 ${rows.length} 个。`;
      };

      bindPager(pagerState.org, {
        pageSize: D("um2OrgPageSize"),
        prev: D("um2OrgPrev"),
        next: D("um2OrgNext")
      }, renderOrgTable);
      bindPager(pagerState.role, {
        pageSize: D("um2RolePageSize"),
        prev: D("um2RolePrev"),
        next: D("um2RoleNext")
      }, renderRoleTable);
      bindPager(pagerState.acc, {
        pageSize: D("um2AccPageSize"),
        prev: D("um2AccPrev"),
        next: D("um2AccNext")
      }, renderAccTable);

      const refresh = () => { renderSelects(); renderStats(); renderTree(); renderOrgTable(); renderRoleTable(); renderAccTable(); };

      D("um2Tabs").addEventListener("click", (event) => {
        const btn = event.target.closest("button[data-tab]");
        if (!btn) return;
        swTab(btn.dataset.tab);
      });
      D("um2Tree").addEventListener("click", (event) => {
        const btn = event.target.closest("button[data-org]");
        if (!btn) return;
        umState.selectedOrgId = btn.dataset.org || "ALL";
        pagerState.acc.page = 1;
        renderTree();
        renderAccTable();
      });
      D("um2OrgSearch").addEventListener("click", () => { pagerState.org.page = 1; renderOrgTable(); });
      D("um2OrgReset").addEventListener("click", () => { D("um2OrgKw").value = ""; D("um2OrgStatusF").value = "ALL"; pagerState.org.page = 1; renderOrgTable(); });
      D("um2AccSearch").addEventListener("click", () => { pagerState.acc.page = 1; renderAccTable(); });
      D("um2AccReset").addEventListener("click", () => { D("um2AccKw").value = ""; D("um2AccTypeF").value = "ALL"; D("um2AccStatusF").value = "ALL"; pagerState.acc.page = 1; renderAccTable(); });
      D("um2RoleSearch").addEventListener("click", () => { pagerState.role.page = 1; renderRoleTable(); });
      D("um2RoleReset").addEventListener("click", () => {
        D("um2RoleKw").value = "";
        if (showAppField && D("um2RoleAppF")) D("um2RoleAppF").value = "ALL";
        pagerState.role.page = 1;
        renderRoleTable();
      });
      if (showAppField && D("um2RoleAppF")) {
        D("um2RoleAppF").addEventListener("change", () => {
          pagerState.role.page = 1;
          renderRoleTable();
        });
      }
      D("um2OrgClose").addEventListener("click", () => toggleModal("um2OrgModal", false));
      D("um2AccClose").addEventListener("click", () => toggleModal("um2AccModal", false));
      D("um2RoleClose").addEventListener("click", () => toggleModal("um2RoleModal", false));

      const openOrgCreateModal = () => {
        swTab("org");
        D("um2OrgNew").click();
        openModal("um2OrgModal");
        D("um2OrgName").focus();
      };
      const openAccCreateModal = () => {
        swTab("acc");
        D("um2AccNew").click();
        openModal("um2AccModal");
        D("um2AccAccount").focus();
      };
      const openRoleCreateModal = () => {
        swTab("role");
        D("um2RoleNew").click();
        openModal("um2RoleModal");
        D("um2RoleName").focus();
      };

      D("um2OrgQuick").addEventListener("click", openOrgCreateModal);
      D("um2OrgAdd").addEventListener("click", openOrgCreateModal);
      D("um2AccAdd").addEventListener("click", openAccCreateModal);
      D("um2RoleAdd").addEventListener("click", openRoleCreateModal);
      D("um2OrgNew").addEventListener("click", () => { umState.editingOrgId = ""; D("um2OrgTitle").textContent = "新增组织"; D("um2OrgName").value = ""; D("um2OrgCode").value = genOrgCode(); D("um2OrgRemark").value = ""; D("um2OrgStatus").value = "ENABLED"; D("um2OrgType").value = "CITY"; setMsg("um2OrgMsg", "warn", "已清空组织表单。"); });
      D("um2OrgSave").addEventListener("click", () => {
        const name = parseTrim(D("um2OrgName").value);
        if (!name) { setMsg("um2OrgMsg", "error", "保存失败：组织名称必填。"); return; }
        if (!umState.editingOrgId) {
          let code = parseTrim(D("um2OrgCode").value);
          if (!code || umState.center.orgs.some((o) => parseTrim(o.code).toUpperCase() === code.toUpperCase())) {
            code = genOrgCode();
            D("um2OrgCode").value = code;
          }
          umState.center.orgs.push({ id: gid("ORG"), name, code, type: D("um2OrgType").value, parentId: "", status: D("um2OrgStatus").value, remark: parseTrim(D("um2OrgRemark").value), createdAtMs: Date.now(), system: false });
        } else {
          const t = getOrg(umState.editingOrgId);
          if (!t) return;
          if (!t.system) t.type = D("um2OrgType").value;
          t.name = name;
          t.status = D("um2OrgStatus").value;
          t.remark = parseTrim(D("um2OrgRemark").value);
          D("um2OrgCode").value = t.code || "";
        }
        save(); refresh(); toggleModal("um2OrgModal", false); setMsg("um2OrgMsg", "ok", `已保存组织 ${name}。`);
      });
      D("um2OrgBody").addEventListener("click", (event) => {
        const btn = event.target.closest("button[data-org-act][data-id]");
        if (!btn) return;
        const target = getOrg(btn.dataset.id);
        if (!target) return;
        if (btn.dataset.orgAct === "edit") { umState.editingOrgId = target.id; D("um2OrgTitle").textContent = `编辑组织 - ${target.name}`; D("um2OrgName").value = target.name; D("um2OrgCode").value = target.code; D("um2OrgType").value = target.type; D("um2OrgStatus").value = target.status; D("um2OrgRemark").value = target.remark || ""; openModal("um2OrgModal"); return; }
        if (btn.dataset.orgAct === "del") {
          if (target.system) { setMsg("um2OrgMsg", "error", "系统组织不允许删除。"); return; }
          if (umState.center.orgs.some((o) => o.parentId === target.id)) { setMsg("um2OrgMsg", "error", "删除失败：仍有下级组织。"); return; }
          if (umState.center.accounts.some((a) => a.orgId === target.id)) { setMsg("um2OrgMsg", "error", "删除失败：仍有关联账号。"); return; }
          if (!window.confirm(`确认删除组织 ${target.name} 吗？`)) return;
          umState.center.orgs = umState.center.orgs.filter((o) => o.id !== target.id);
          if (umState.selectedOrgId === target.id) umState.selectedOrgId = "ALL";
          if (umState.editingOrgId === target.id) { D("um2OrgNew").click(); toggleModal("um2OrgModal", false); }
          save(); refresh();
        }
      });
      D("um2AccNew").addEventListener("click", () => {
        umState.editingAccountId = "";
        D("um2AccTitle").textContent = "新增账号";
        D("um2AccAccount").value = "";
        D("um2AccName").value = "";
        D("um2AccType").value = "OPS";
        D("um2AccRole").value = D("um2AccRole").options[0]?.value || "";
        D("um2AccStatus").value = "ENABLED";
        D("um2AccPwd").value = "";
        D("um2AccRemark").value = "";
        D("um2AccAppOps").checked = true;
        D("um2AccAppGrid").checked = false;
        setMsg("um2AccMsg", "warn", "请填写后保存。");
      });
      D("um2AccType").addEventListener("change", () => {
        const v = D("um2AccType").value;
        D("um2AccAppOps").checked = v !== "GRID";
        D("um2AccAppGrid").checked = v !== "OPS";
      });
      D("um2AccSave").addEventListener("click", () => {
        const account = parseTrim(D("um2AccAccount").value);
        const name = parseTrim(D("um2AccName").value);
        const orgId = parseTrim(D("um2AccOrg").value);
        const roleId = parseTrim(D("um2AccRole").value);
        const pwd = parseTrim(D("um2AccPwd").value);
        const apps = uniq([D("um2AccAppOps").checked ? "OPS" : "", D("um2AccAppGrid").checked ? "GRID" : ""]);
        if (!account || !name) { setMsg("um2AccMsg", "error", "保存失败：账号和姓名必填。"); return; }
        if (!orgId || !getOrg(orgId)) { setMsg("um2AccMsg", "error", "保存失败：请选择组织。"); return; }
        if (!roleId || !getRole(roleId)) { setMsg("um2AccMsg", "error", "保存失败：请选择角色。"); return; }
        if (!umState.editingAccountId && pwd.length < 6) { setMsg("um2AccMsg", "error", "保存失败：新增账号密码至少 6 位。"); return; }
        if (umState.editingAccountId && pwd && pwd.length < 6) { setMsg("um2AccMsg", "error", "保存失败：新密码至少 6 位。"); return; }
        if (!apps.length) { setMsg("um2AccMsg", "error", "保存失败：至少选择一个登录端。"); return; }
        const dup = umState.center.accounts.find((a) => a.account.toLowerCase() === account.toLowerCase() && a.id !== umState.editingAccountId);
        if (dup) { setMsg("um2AccMsg", "error", `保存失败：账号 ${account} 已存在。`); return; }
        const type = apps.length === 2 ? "DUAL" : (apps[0] === "GRID" ? "GRID" : "OPS");
        if (!umState.editingAccountId) umState.center.accounts.push({ id: gid("U"), account, name, orgId, type, roleId, apps, status: D("um2AccStatus").value, password: pwd, lastLogin: "-", scope: "ORG", areas: [], remark: parseTrim(D("um2AccRemark").value), createdAtMs: Date.now() });
        else {
          const t = getAcc(umState.editingAccountId);
          if (!t) return;
          t.account = account; t.name = name; t.orgId = orgId; t.type = type; t.roleId = roleId; t.apps = apps; t.status = D("um2AccStatus").value; t.scope = "ORG"; t.areas = []; t.remark = parseTrim(D("um2AccRemark").value);
          if (pwd) t.password = pwd;
        }
        save(); refresh(); D("um2AccNew").click(); toggleModal("um2AccModal", false); setMsg("um2AccMsg", "ok", `已保存账号 ${account}。`);
      });
      D("um2AccBody").addEventListener("click", (event) => {
        const btn = event.target.closest("button[data-acc-act][data-id]");
        if (!btn) return;
        const t = getAcc(btn.dataset.id);
        if (!t) return;
        if (btn.dataset.accAct === "edit") {
          umState.editingAccountId = t.id;
          D("um2AccTitle").textContent = `编辑账号 - ${t.account}`;
          D("um2AccAccount").value = t.account;
          D("um2AccName").value = t.name;
          D("um2AccOrg").value = t.orgId;
          D("um2AccType").value = t.type;
          D("um2AccRole").value = t.roleId;
          D("um2AccStatus").value = t.status;
          D("um2AccPwd").value = "";
          D("um2AccRemark").value = t.remark || "";
          D("um2AccAppOps").checked = (t.apps || []).includes("OPS");
          D("um2AccAppGrid").checked = (t.apps || []).includes("GRID");
          openModal("um2AccModal");
          return;
        }
        if (btn.dataset.accAct === "toggle") {
          if (t.account.toLowerCase() === "admin" && t.status === "ENABLED") { setMsg("um2AccMsg", "error", "admin 账号不允许停用。"); return; }
          t.status = t.status === "ENABLED" ? "DISABLED" : "ENABLED";
          save(); refresh();
          return;
        }
        if (btn.dataset.accAct === "del") {
          if (t.account.toLowerCase() === "admin") { setMsg("um2AccMsg", "error", "admin 账号不允许删除。"); return; }
          if (!window.confirm(`确认删除账号 ${t.account} 吗？`)) return;
          umState.center.accounts = umState.center.accounts.filter((a) => a.id !== t.id);
          if (umState.editingAccountId === t.id) { D("um2AccNew").click(); toggleModal("um2AccModal", false); }
          save(); refresh();
        }
      });

      D("um2RoleNew").addEventListener("click", () => {
        umState.editingRoleId = "";
        D("um2RoleTitle").textContent = "新增角色";
        D("um2RoleName").value = "";
        D("um2RoleCode").value = genRoleCode();
        D("um2RoleCode").readOnly = true;
        if (showAppField && D("um2RoleApp")) D("um2RoleApp").value = "OPS";
        D("um2RoleStatus").value = "ENABLED";
        D("um2RoleRemark").value = "";
        renderRolePermBox(rolePermOptions());
        setMsg("um2RoleMsg", "warn", "已生成角色编码。");
      });
      D("um2RoleSave").addEventListener("click", () => {
        const name = parseTrim(D("um2RoleName").value);
        let code = parseTrim(D("um2RoleCode").value).toUpperCase();
        if (!code) {
          code = genRoleCode().toUpperCase();
          D("um2RoleCode").value = code;
        }
        const app = showAppField
          ? (D("um2RoleApp")?.value || "OPS")
          : (umState.editingRoleId ? (getRole(umState.editingRoleId)?.app || "GRID") : "GRID");
        if (!name || !code) { setMsg("um2RoleMsg", "error", "保存失败：角色名和编码必填。"); return; }
        const dup = umState.center.roles.find((r) => r.code.toUpperCase() === code && r.id !== umState.editingRoleId);
        if (dup) { setMsg("um2RoleMsg", "error", `保存失败：角色编码 ${code} 已存在。`); return; }
        const perms = getCheckedPerms();
        if (!perms.length) { setMsg("um2RoleMsg", "error", "保存失败：请至少勾选一个权限。"); return; }
        if (!umState.editingRoleId) umState.center.roles.push({ id: gid("R"), name, code, app, perms, status: D("um2RoleStatus").value, remark: parseTrim(D("um2RoleRemark").value), createdAtMs: Date.now(), system: false });
        else { const t = getRole(umState.editingRoleId); if (!t) return; if (!t.system) { t.code = code; t.app = app; } t.name = name; t.perms = perms; t.status = D("um2RoleStatus").value; t.remark = parseTrim(D("um2RoleRemark").value); }
        save(); refresh(); D("um2RoleNew").click(); toggleModal("um2RoleModal", false); setMsg("um2RoleMsg", "ok", `已保存角色 ${name}。`);
      });
      D("um2RoleBody").addEventListener("click", (event) => {
        const btn = event.target.closest("button[data-role-act][data-id]");
        if (!btn) return;
        const t = getRole(btn.dataset.id);
        if (!t) return;
        if (btn.dataset.roleAct === "edit") {
          umState.editingRoleId = t.id;
          D("um2RoleTitle").textContent = `编辑角色 - ${t.name}`;
          D("um2RoleName").value = t.name;
          D("um2RoleCode").value = t.code;
          D("um2RoleCode").readOnly = false;
          if (showAppField && D("um2RoleApp")) D("um2RoleApp").value = t.app;
          D("um2RoleStatus").value = t.status;
          D("um2RoleRemark").value = t.remark || "";
          renderRolePermBox(t.perms || []);
          openModal("um2RoleModal");
          return;
        }
        if (btn.dataset.roleAct === "del") {
          if (t.system) { setMsg("um2RoleMsg", "error", "系统角色不允许删除。"); return; }
          if (umState.center.accounts.some((a) => a.roleId === t.id)) { setMsg("um2RoleMsg", "error", "删除失败：仍有账号绑定该角色。"); return; }
          if (!window.confirm(`确认删除角色 ${t.name} 吗？`)) return;
          umState.center.roles = umState.center.roles.filter((r) => r.id !== t.id);
          if (umState.editingRoleId === t.id) { D("um2RoleNew").click(); toggleModal("um2RoleModal", false); }
          save(); refresh();
        }
      });

      refresh();
      renderRolePermBox(rolePermOptions());
      swTab(umState.activeTab);
      window.__um2OpenTab = (tab) => {
        if (!["org", "acc", "role"].includes(tab)) return;
        swTab(tab);
      };
      umState.inited = true;
      return;
    }


    const required = [
      "umKeyword", "umRoleFilter", "umStatusFilter", "umSearch", "umReset", "umAdd",
      "umMeta", "umBody", "umFormTitle", "umAccount", "umName", "umRole", "umStatus",
      "umPassword", "umRemark", "umSave", "umCancel", "umMsg"
    ];
    if (!required.every((id) => $(id))) return;

    const refs = {
      keyword: $("umKeyword"),
      roleFilter: $("umRoleFilter"),
      statusFilter: $("umStatusFilter"),
      searchBtn: $("umSearch"),
      resetBtn: $("umReset"),
      addBtn: $("umAdd"),
      meta: $("umMeta"),
      body: $("umBody"),
      formTitle: $("umFormTitle"),
      account: $("umAccount"),
      name: $("umName"),
      role: $("umRole"),
      status: $("umStatus"),
      password: $("umPassword"),
      remark: $("umRemark"),
      saveBtn: $("umSave"),
      cancelBtn: $("umCancel"),
      msg: $("umMsg")
    };

    const UM_STORAGE_KEY = "op_user_mgmt_users_v1";
    const ROLE_LABELS = {
      ADMIN: "管理员",
      DISPATCHER: "调度员",
      OPERATOR: "运营员",
      VIEWER: "查看员"
    };
    const STATUS_LABELS = {
      ENABLED: "启用",
      DISABLED: "停用"
    };
    const esc = (value) => String(value ?? "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
    const nowText = () => new Date().toLocaleString("zh-CN", { hour12: false });
    const roleLabel = (role) => ROLE_LABELS[role] || role || "-";
    const statusLabel = (status) => STATUS_LABELS[status] || status || "-";
    const genUserId = () => `U-${Date.now().toString().slice(-8)}-${Math.floor(Math.random() * 90 + 10)}`;
    const seedUsers = () => [];

    const setMeta = (text) => {
      refs.meta.textContent = text;
    };
    const setMsg = (type, text) => {
      refs.msg.className = `um-msg ${type || "warn"}`;
      refs.msg.textContent = text;
    };
    const saveUsers = () => {
      try {
        localStorage.setItem(UM_STORAGE_KEY, JSON.stringify(umState.users));
      } catch (error) {}
    };
    const loadUsers = () => {
      try {
        const raw = localStorage.getItem(UM_STORAGE_KEY);
        if (!raw) return [];
        const parsed = JSON.parse(raw);
        if (!Array.isArray(parsed)) return [];
        const rows = parsed
          .filter((row) => row && typeof row === "object")
          .map((row) => ({
            id: parseTrim(row.id) || genUserId(),
            account: parseTrim(row.account),
            name: parseTrim(row.name),
            role: parseTrim(row.role) || "OPERATOR",
            status: parseTrim(row.status) === "DISABLED" ? "DISABLED" : "ENABLED",
            lastLogin: parseTrim(row.lastLogin) || "-",
            remark: parseTrim(row.remark),
            password: parseTrim(row.password),
            createdAtMs: Number(row.createdAtMs) || Date.now()
          }))
          .filter((row) => row.account && row.name);
        return rows;
      } catch (error) {
        return [];
      }
    };

    const resetForm = (user = null) => {
      if (!user) {
        umState.editingId = "";
        refs.formTitle.textContent = "新增用户";
        refs.account.value = "";
        refs.name.value = "";
        refs.role.value = "OPERATOR";
        refs.status.value = "ENABLED";
        refs.password.value = "";
        refs.remark.value = "";
        return;
      }
      umState.editingId = user.id;
      refs.formTitle.textContent = `编辑用户 - ${user.account}`;
      refs.account.value = user.account;
      refs.name.value = user.name;
      refs.role.value = user.role;
      refs.status.value = user.status;
      refs.password.value = "";
      refs.remark.value = user.remark || "";
    };

    const getFilteredUsers = () => {
      const keyword = parseTrim(refs.keyword.value).toLowerCase();
      const role = refs.roleFilter.value || "ALL";
      const status = refs.statusFilter.value || "ALL";
      return umState.users.filter((row) => {
        if (role !== "ALL" && row.role !== role) return false;
        if (status !== "ALL" && row.status !== status) return false;
        if (!keyword) return true;
        const hay = [row.account, row.name, row.remark].join("|").toLowerCase();
        return hay.includes(keyword);
      });
    };

    const renderTable = (rows) => {
      refs.body.innerHTML = "";
      if (!rows.length) {
        refs.body.innerHTML = `<tr><td colspan="7" style="text-align:center;color:#567099;">暂无匹配的用户记录</td></tr>`;
        return;
      }
      rows.forEach((row) => {
        const tr = document.createElement("tr");
        const statusTagClass = row.status === "ENABLED" ? "ok" : "off";
        const disableAction = row.status === "ENABLED" ? "停用" : "启用";
        const toggleClass = row.status === "ENABLED" ? " um-mini-btn-danger" : "";
        tr.innerHTML = `
          <td>${esc(row.account)}</td>
          <td>${esc(row.name)}</td>
          <td>${esc(roleLabel(row.role))}</td>
          <td><span class="dce-tag ${statusTagClass}">${esc(statusLabel(row.status))}</span></td>
          <td>${esc(row.lastLogin || "-")}</td>
          <td title="${esc(row.remark || "")}">${esc(row.remark || "-")}</td>
          <td>
            <button class="btn s um-mini-btn" data-act="edit" data-id="${esc(row.id)}" type="button">编辑</button>
            <button class="btn s um-mini-btn${toggleClass}" data-act="toggle" data-id="${esc(row.id)}" type="button">${disableAction}</button>
            <button class="btn s um-mini-btn" data-act="delete" data-id="${esc(row.id)}" type="button">删除</button>
          </td>
        `;
        refs.body.appendChild(tr);
      });
    };

    const refreshView = () => {
      const rows = getFilteredUsers();
      renderTable(rows);
      setMeta(`共 ${umState.users.length} 个用户，当前筛选结果 ${rows.length} 个。`);
    };

    const saveUser = () => {
      const account = parseTrim(refs.account.value);
      const name = parseTrim(refs.name.value);
      const role = refs.role.value || "OPERATOR";
      const status = refs.status.value === "DISABLED" ? "DISABLED" : "ENABLED";
      const password = parseTrim(refs.password.value);
      const remark = parseTrim(refs.remark.value);

      if (!account) {
        setMsg("error", "保存失败：账号不能为空。");
        return;
      }
      if (!name) {
        setMsg("error", "保存失败：姓名不能为空。");
        return;
      }
      if (!umState.editingId && password.length < 6) {
        setMsg("error", "保存失败：新增用户密码至少 6 位。");
        return;
      }

      const duplicated = umState.users.find((row) =>
        row.account.toLowerCase() === account.toLowerCase() && row.id !== umState.editingId
      );
      if (duplicated) {
        setMsg("error", `保存失败：账号 ${account} 已存在。`);
        return;
      }

      if (!umState.editingId) {
        umState.users.unshift({
          id: genUserId(),
          account,
          name,
          role,
          status,
          lastLogin: "-",
          remark,
          password,
          createdAtMs: Date.now()
        });
        saveUsers();
        refreshView();
        resetForm();
        setMsg("ok", `已新增用户 ${account}。`);
        return;
      }

      const target = umState.users.find((row) => row.id === umState.editingId);
      if (!target) {
        setMsg("error", "保存失败：未找到待编辑用户。");
        return;
      }
      target.account = account;
      target.name = name;
      target.role = role;
      target.status = status;
      target.remark = remark;
      if (password) target.password = password;
      saveUsers();
      refreshView();
      resetForm(target);
      setMsg("ok", `已更新用户 ${account}。`);
    };

    const editUser = (id) => {
      const target = umState.users.find((row) => row.id === id);
      if (!target) return;
      resetForm(target);
      setMsg("warn", `正在编辑用户 ${target.account}。`);
    };

    const toggleUserStatus = (id) => {
      const target = umState.users.find((row) => row.id === id);
      if (!target) return;
      if (target.account.toLowerCase() === "admin") {
        setMsg("error", "admin 账号不允许停用。");
        return;
      }
      target.status = target.status === "ENABLED" ? "DISABLED" : "ENABLED";
      saveUsers();
      refreshView();
      setMsg("ok", `用户 ${target.account} 已${target.status === "ENABLED" ? "启用" : "停用"}。`);
    };

    const deleteUser = (id) => {
      const target = umState.users.find((row) => row.id === id);
      if (!target) return;
      if (target.account.toLowerCase() === "admin") {
        setMsg("error", "admin 账号不允许删除。");
        return;
      }
      const yes = window.confirm(`确认删除用户 ${target.account} 吗？`);
      if (!yes) return;
      umState.users = umState.users.filter((row) => row.id !== id);
      saveUsers();
      if (umState.editingId === id) resetForm();
      refreshView();
      setMsg("ok", `用户 ${target.account} 已删除。`);
    };

    umState.users = loadUsers().sort((a, b) => Number(b.createdAtMs || 0) - Number(a.createdAtMs || 0));
    saveUsers();
    refreshView();
    resetForm();
    setMsg("warn", "提示：可新增用户，或在列表中编辑、停用、删除。");

    refs.searchBtn.addEventListener("click", refreshView);
    refs.resetBtn.addEventListener("click", () => {
      refs.keyword.value = "";
      refs.roleFilter.value = "ALL";
      refs.statusFilter.value = "ALL";
      refreshView();
    });
    refs.addBtn.addEventListener("click", () => {
      resetForm();
      refs.account.focus();
      setMsg("warn", "已切换到新增用户模式。");
    });
    refs.saveBtn.addEventListener("click", saveUser);
    refs.cancelBtn.addEventListener("click", () => {
      resetForm();
      setMsg("warn", "已取消编辑。");
    });
    refs.keyword.addEventListener("keydown", (event) => {
      if (event.key !== "Enter") return;
      event.preventDefault();
      refreshView();
    });
    refs.roleFilter.addEventListener("change", refreshView);
    refs.statusFilter.addEventListener("change", refreshView);
    refs.body.addEventListener("click", (event) => {
      const button = event.target.closest("button[data-act][data-id]");
      if (!button) return;
      const act = button.dataset.act;
      const id = button.dataset.id;
      if (act === "edit") {
        editUser(id);
        return;
      }
      if (act === "toggle") {
        toggleUserStatus(id);
        return;
      }
      if (act === "delete") {
        deleteUser(id);
      }
    });

    umState.inited = true;
  }
  window.initUserManageModule = initUserManageModule;
})();
