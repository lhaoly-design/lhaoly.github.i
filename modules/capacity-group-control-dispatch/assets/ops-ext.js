window.initExtApp = (() => {
  let inited = false;
  return function initExtApp() {
    if (inited) return;
    inited = true;
    window.__extAppInited = true;
  const extTemplateHTML = "<div class=\"ext-app\" id=\"extApp\">\n      <div class=\"app-shell\">\n          <aside class=\"sidebar\">\n            <nav class=\"nav\" id=\"navMenu\">\n              <div class=\"nav-group\">\n                <div class=\"nav-group-title\">\u63a5\u5165\u7ba1\u7406</div>\n                <button class=\"nav-button active\" data-section=\"home\">\u63a5\u5165\u6982\u89c8\u9996\u9875</button>\n                <div class=\"nav-folder open\" data-folder-id=\"platform-access\">\n                  <div class=\"nav-folder-row\">\n                    <button type=\"button\" class=\"nav-folder-toggle\" data-folder-toggle=\"platform-access\" aria-expanded=\"true\" aria-label=\"\u6536\u8d77\u5e73\u53f0\u63a5\u5165\u7ba1\u7406\u5b50\u83dc\u5355\"></button>\n                    <button class=\"nav-button nav-folder-label\" data-section=\"platforms\">\u5e73\u53f0\u63a5\u5165\u7ba1\u7406</button>\n                  </div>\n                  <div class=\"nav-folder-children\">\n                    <div class=\"nav-folder open\" data-folder-id=\"active-sync\">\n                      <div class=\"nav-folder-row\">\n                        <button type=\"button\" class=\"nav-folder-toggle\" data-folder-toggle=\"active-sync\" aria-expanded=\"true\" aria-label=\"\u6536\u8d77\u4e3b\u52a8\u540c\u6b65\u914d\u7f6e\u8be6\u60c5\u5b50\u83dc\u5355\"></button>\n                        <button class=\"nav-sub-button nav-folder-label\" data-section=\"active-config\">\u4e3b\u52a8\u540c\u6b65\u914d\u7f6e\u8be6\u60c5</button>\n                      </div>\n                      <div class=\"nav-folder-children\">\n                        <button class=\"nav-sub-button nav-deep-button\" data-section=\"api-detail\">API \u8be6\u60c5\u9875</button>\n                      </div>\n                    </div>\n                  </div>\n                </div>\n                <button class=\"nav-button\" data-section=\"wizard\">\u65b0\u5efa\u63a5\u5165\u5411\u5bfc</button>\n              </div>\n              <div class=\"nav-group\">\n                <div class=\"nav-group-title\">\u914d\u7f6e\u4e2d\u5fc3</div>\n                <button class=\"nav-button\" data-section=\"mapping\">\u6570\u636e\u6620\u5c04\u4e2d\u5fc3</button>\n                <div class=\"nav-submenu\">\n                  <button class=\"nav-sub-button\" data-section=\"mapping\" data-mapping-panel=\"mapping-model-center\">\u5185\u90e8\u6a21\u578b\u7ba1\u7406</button>\n                  <button class=\"nav-sub-button\" data-section=\"mapping\" data-mapping-panel=\"mapping-rule-center\">\u8f6c\u6362\u89c4\u5219\u7ba1\u7406</button>\n                  <button class=\"nav-sub-button\" data-section=\"mapping\" data-mapping-panel=\"mapping-relation-center\">\u6a21\u578b\u6620\u5c04\u7ba1\u7406</button>\n                </div>\n              </div>\n              <div class=\"nav-group\">\n                <div class=\"nav-group-title\">\u76d1\u63a7\u5ba1\u8ba1</div>\n                <button class=\"nav-button\" data-section=\"monitoring\">\u8fd0\u884c\u76d1\u63a7\u4e2d\u5fc3</button>\n                <button class=\"nav-button\" data-section=\"alerts\">\u544a\u8b66\u4e2d\u5fc3</button>\n                <div class=\"nav-folder open\" data-folder-id=\"audit-logs\">\n                  <div class=\"nav-folder-row\">\n                    <button type=\"button\" class=\"nav-folder-toggle\" data-folder-toggle=\"audit-logs\" aria-expanded=\"true\" aria-label=\"\u6536\u8d77\u65e5\u5fd7\u5ba1\u8ba1\u4e2d\u5fc3\u5b50\u83dc\u5355\"></button>\n                    <button class=\"nav-button nav-folder-label\" data-section=\"call-logs\">\u65e5\u5fd7\u5ba1\u8ba1\u4e2d\u5fc3</button>\n                  </div>\n                  <div class=\"nav-folder-children\">\n                    <button class=\"nav-sub-button\" data-section=\"call-logs\">\u8c03\u7528\u65e5\u5fd7</button>\n                    <button class=\"nav-sub-button\" data-section=\"protocol-logs\">\u8f6c\u6362\u65e5\u5fd7</button>\n                  </div>\n                </div>\n              </div>\n            </nav>\n          </aside>\n\n          <main class=\"workspace\">\n            <header class=\"topbar\" id=\"mainTopbar\">\n              <div class=\"headline-group\">\n                <div class=\"eyebrow\"></div>\n                <h1 class=\"headline\">\u5e73\u53f0\u9002\u914d\u4ece\u63a5\u5165\u5230\u76d1\u63a7\u7684\u4e00\u4f53\u5316\u539f\u578b</h1>\n                <p class=\"subline\" id=\"topbarSubtitle\">\u5f53\u524d\u805a\u7126\u5e73\u53f0\uff1a-\u3002\u53ef\u5728\u5e73\u53f0\u63a5\u5165\u7ba1\u7406\u4e2d\u5207\u6362\u5e73\u53f0\uff0c\u6240\u6709\u8be6\u60c5\u9875\u4f1a\u8054\u52a8\u66f4\u65b0\u3002</p>\n              </div>\n              <div class=\"topbar-actions\">\n                <span class=\"chip dot\" id=\"topPlatformStatus\">\u5df2\u542f\u7528</span>\n                <span class=\"chip\" id=\"topPlatformModes\">\u4e3b\u52a8\u62c9\u53d6 / \u4e3b\u52a8\u63a7\u5236</span>\n                <button type=\"button\" class=\"button secondary\" data-nav=\"alerts\">\u67e5\u770b\u544a\u8b66</button>\n                <button type=\"button\" class=\"button secondary\" data-nav=\"monitoring\" data-monitor-tab=\"monitor-api\">\u6027\u80fd\u76d1\u63a7</button>\n                <button type=\"button\" class=\"button brand\" data-nav=\"wizard\">\u65b0\u5efa\u63a5\u5165</button>\n              </div>\n            </header>\n\n            <section class=\"screen active\" id=\"screen-home\">\n              <div class=\"home-monitor-shell\">\n                <div class=\"home-monitor-head flow-blue-card\">\n                  <div>\n                    <div class=\"eyebrow\">Official Console</div>\n                    <h2 class=\"home-monitor-title\">\u5e73\u53f0\u8fd0\u884c\u72b6\u6001\u76d1\u63a7 - \u7cfb\u7edf\u9996\u9875</h2>\n                    <p class=\"home-monitor-subtitle\">\u6574\u5957\u5916\u90e8\u5e73\u53f0\u5bf9\u63a5\u76d1\u63a7\u7cfb\u7edf\u5b98\u65b9\u9996\u9875\u4e0e\u603b\u63a7\u5236\u53f0\uff0c\u5b9e\u65f6\u76d1\u63a7\u5e73\u53f0\u8fd0\u884c\u3001\u5728\u7ebf\u72b6\u6001\u3001\u63a5\u53e3\u53ef\u7528\u6027\u4e0e\u540c\u6b65\u72b6\u6001\u3002</p>\n                  </div>\n                  <div class=\"action-row\">\n                    <span class=\"chip\" id=\"homeRealtimeClock\">--:--:--</span>\n                    <button type=\"button\" class=\"button secondary\" data-nav=\"monitoring\" data-monitor-tab=\"monitor-api\">\u8fdb\u5165\u63a5\u53e3\u76d1\u63a7</button>\n                    <button type=\"button\" class=\"button brand\" data-nav=\"alerts\">\u67e5\u770b\u544a\u8b66\u4e2d\u5fc3</button>\n                  </div>\n                </div>\n\n                <div class=\"home-monitor-metrics\" id=\"homeMonitorMetrics\"></div>\n\n                <div class=\"home-monitor-grid\">\n                  <div class=\"home-monitor-panel flow-blue-card\">\n                    <h4 class=\"home-monitor-title\">\u5065\u5eb7\u5ea6\u8d8b\u52bf\u56fe</h4>\n                    <p class=\"home-monitor-subtitle\">\u6309\u65e5\u5c55\u793a\u5e73\u53f0\u5065\u5eb7\u5ea6\u8bc4\u5206\u53d8\u5316\uff0c\u8bc6\u522b\u5065\u5eb7\u6ce2\u52a8\u8d8b\u52bf</p>\n                    <div class=\"home-monitor-canvas\">\n                      <canvas id=\"homeHealthTrendCanvas\"></canvas>\n                    </div>\n                  </div>\n                  <div class=\"home-monitor-panel flow-blue-card\">\n                    <h4 class=\"home-monitor-title\">\u5e73\u53f0\u6027\u80fd\u5bf9\u6bd4\u67f1\u72b6\u56fe</h4>\n                    <p class=\"home-monitor-subtitle\">\u6309\u5e73\u53f0\u5bf9\u6bd4\u63a5\u53e3\u53ef\u7528\u7387\u3001\u540c\u6b65\u6210\u529f\u7387\u4e0e\u5e73\u5747\u54cd\u5e94\u65f6\u95f4</p>\n                    <div class=\"home-monitor-canvas\">\n                      <canvas id=\"homePerformanceCompareCanvas\"></canvas>\n                    </div>\n                  </div>\n                </div>\n\n                <div class=\"home-monitor-grid\">\n                  <div class=\"home-monitor-panel flow-blue-card\">\n                    <h4 class=\"home-monitor-title\">\u5b9e\u65f6\u72b6\u6001\u4e0e\u81ea\u52a8\u544a\u8b66</h4>\n                    <p class=\"home-monitor-subtitle\">\u5f02\u5e38\u81ea\u52a8\u89e6\u53d1\u544a\u8b66\u5e76\u901a\u77e5\u8d1f\u8d23\u4eba\uff0c\u5b9e\u65f6\u5c55\u793a\u5904\u7406\u72b6\u6001</p>\n                    <div class=\"home-monitor-list\" id=\"homeRealtimeAlertList\"></div>\n                  </div>\n                  <div class=\"home-monitor-panel flow-blue-card\">\n                    <h4 class=\"home-monitor-title\">\u5e73\u53f0\u5728\u7ebf\u72b6\u6001\u603b\u89c8</h4>\n                    <p class=\"home-monitor-subtitle\">\u7edf\u4e00\u5c55\u793a\u5e73\u53f0\u5728\u7ebf\u72b6\u6001\u3001\u63a5\u53e3\u53ef\u7528\u6027\u4e0e\u540c\u6b65\u72b6\u6001</p>\n                    <div class=\"home-monitor-list\" id=\"homePlatformStatusList\"></div>\n                  </div>\n                </div>\n              </div>\n            </section>\n\n            <section class=\"screen\" id=\"screen-platforms\">\n              <div class=\"panel\">\n                <div class=\"panel-header\">\n                  <div>\n                    <h2>\u5e73\u53f0\u63a5\u5165\u7ba1\u7406</h2>\n                    <p class=\"section-copy\">\u5217\u8868\u9875\u4fdd\u6301\u8f7b\u91cf\uff0c\u53ea\u505a\u7b5b\u9009\u3001\u67e5\u770b\u548c\u8df3\u8f6c\u3002\u8be6\u60c5\u914d\u7f6e\u76f4\u63a5\u8fdb\u5165\u5bf9\u5e94\u9875\u9762\u3002</p>\n                  </div>\n                  <div class=\"action-row\">\n                    <button type=\"button\" class=\"button secondary\" id=\"openPlatformCreateDrawer\">\u65b0\u589e\u5e73\u53f0</button>\n                    <button type=\"button\" class=\"button secondary\" id=\"exportPlatforms\">\u5bfc\u51fa\u53f0\u8d26</button>\n                    <button type=\"button\" class=\"button\" data-nav=\"wizard\">\u65b0\u5efa\u63a5\u5165</button>\n                  </div>\n                </div>\n                <div class=\"filter-bar\">\n                  <div class=\"field\">\n                    <label for=\"filterName\">\u5e73\u53f0\u540d\u79f0</label>\n                    <input id=\"filterName\" type=\"text\" placeholder=\"\u8bf7\u8f93\u5165\u5e73\u53f0\u540d\u79f0\">\n                  </div>\n                  <div class=\"field\">\n                    <label for=\"filterType\">\u5e73\u53f0\u7c7b\u578b</label>\n                    <select id=\"filterType\">\n                      <option value=\"\">\u5168\u90e8\u7c7b\u578b</option>\n                      <option value=\"\u50a8\u80fd\u5e73\u53f0\">\u50a8\u80fd\u5e73\u53f0</option>\n                      <option value=\"\u9006\u53d8\u5668\u5e73\u53f0\">\u9006\u53d8\u5668\u5e73\u53f0</option>\n                      <option value=\"\u805a\u5408\u5e73\u53f0\">\u805a\u5408\u5e73\u53f0</option>\n                      <option value=\"EMS\u5e73\u53f0\">EMS\u5e73\u53f0</option>\n                    </select>\n                  </div>\n                  <div class=\"field\">\n                    <label for=\"filterMode\">\u63a5\u5165\u65b9\u5f0f</label>\n                    <select id=\"filterMode\">\n                      <option value=\"\">\u5168\u90e8\u65b9\u5f0f</option>\n                      <option value=\"\u6807\u51c6\u5f00\u653e\">\u6807\u51c6\u5f00\u653e</option>\n                      <option value=\"\u4e3b\u52a8\u62c9\u53d6\">\u4e3b\u52a8\u62c9\u53d6</option>\n                    </select>\n                  </div>\n                  <div class=\"field\">\n                    <label for=\"filterStatus\">\u72b6\u6001</label>\n                    <select id=\"filterStatus\">\n                      <option value=\"\">\u5168\u90e8\u72b6\u6001</option>\n                      <option value=\"\u5df2\u542f\u7528\">\u5df2\u542f\u7528</option>\n                      <option value=\"\u5f85\u9a8c\u8bc1\">\u5f85\u9a8c\u8bc1</option>\n                      <option value=\"\u8349\u7a3f\">\u8349\u7a3f</option>\n                      <option value=\"\u5f02\u5e38\">\u5f02\u5e38</option>\n                      <option value=\"\u5df2\u505c\u7528\">\u5df2\u505c\u7528</option>\n                    </select>\n                  </div>\n                  <button type=\"button\" class=\"button secondary\" id=\"resetFilters\">\u91cd\u7f6e</button>\n                  <button type=\"button\" class=\"button brand\" id=\"applyFilters\">\u67e5\u8be2</button>\n                </div>\n              </div>\n\n              <div class=\"panel flat\">\n                <div class=\"table-shell\">\n                  <table>\n                    <thead>\n                      <tr>\n                        <th>\u5e73\u53f0\u7f16\u7801</th>\n                        <th>\u5e73\u53f0\u540d\u79f0</th>\n                        <th>\u63a5\u5165\u65b9\u5f0f</th>\n                        <th>\u8ba4\u8bc1\u65b9\u5f0f</th>\n                        <th>\u6700\u8fd1\u6d4b\u8bd5</th>\n                        <th>\u72b6\u6001</th>\n                        <th>\u542f\u505c</th>\n                        <th>\u64cd\u4f5c</th>\n                      </tr>\n                    </thead>\n                    <tbody id=\"platformTableBody\"></tbody>\n                  </table>\n                </div>\n              </div>\n            </section>\n\n            <section class=\"screen\" id=\"screen-wizard\">\n              <div class=\"panel\">\n                <div class=\"panel-header\">\n                  <div>\n                    <h2>\u65b0\u5efa / \u7f16\u8f91\u63a5\u5165\u5411\u5bfc</h2>\n                    <p class=\"section-copy\">\u5148\u5b9a\u4e49\u5e73\u53f0\u57fa\u7840\u4fe1\u606f\uff0c\u518d\u9009\u62e9\u63a5\u5165\u6a21\u5f0f\uff0c\u6700\u540e\u786e\u8ba4\u540e\u7eed\u5fc5\u914d\u6a21\u5757\u3002\u4fdd\u5b58\u540e\u81ea\u52a8\u751f\u6210\u5e73\u53f0\u8349\u7a3f\u3002</p>\n                  </div>\n                  <div class=\"action-row\">\n                    <button type=\"button\" class=\"button secondary\" id=\"wizardReset\">\u91cd\u7f6e\u5411\u5bfc</button>\n                    <button type=\"button\" class=\"button ghost\" data-nav=\"platforms\">\u8fd4\u56de\u5217\u8868</button>\n                  </div>\n                </div>\n\n                <div class=\"stepper\" id=\"wizardStepper\">\n                  <div class=\"step active\" data-step=\"1\"><strong>Step 1</strong>\u57fa\u7840\u4fe1\u606f</div>\n                  <div class=\"step\" data-step=\"2\"><strong>Step 2</strong>\u63a5\u5165\u65b9\u5f0f</div>\n                  <div class=\"step\" data-step=\"3\"><strong>Step 3</strong>\u914d\u7f6e\u5165\u53e3</div>\n                  <div class=\"step\" data-step=\"4\"><strong>Step 4</strong>\u4fdd\u5b58\u786e\u8ba4</div>\n                </div>\n              </div>\n\n              <div class=\"panel wizard-panel active\" data-step-panel=\"1\">\n                <div class=\"form-grid\">\n                  <div class=\"field\">\n                    <label for=\"wizardName\">\u5e73\u53f0\u540d\u79f0</label>\n                    <input id=\"wizardName\" type=\"text\" value=\"\u534e\u4e2d\u65b0\u63a5\u5165\u793a\u4f8b\u5e73\u53f0\">\n                  </div>\n                  <div class=\"field\">\n                    <label for=\"wizardVendor\">\u5382\u5546\u540d\u79f0</label>\n                    <input id=\"wizardVendor\" type=\"text\" value=\"\u793a\u4f8b\u80fd\u6e90\u79d1\u6280\">\n                  </div>\n                  <div class=\"field\">\n                    <label for=\"wizardType\">\u5e73\u53f0\u7c7b\u578b</label>\n                    <select id=\"wizardType\">\n                      <option value=\"\u50a8\u80fd\u5e73\u53f0\">\u50a8\u80fd\u5e73\u53f0</option>\n                      <option value=\"\u9006\u53d8\u5668\u5e73\u53f0\">\u9006\u53d8\u5668\u5e73\u53f0</option>\n                      <option value=\"\u805a\u5408\u5e73\u53f0\">\u805a\u5408\u5e73\u53f0</option>\n                      <option value=\"EMS\u5e73\u53f0\">EMS\u5e73\u53f0</option>\n                    </select>\n                  </div>\n                  <div class=\"field\">\n                    <label for=\"wizardVersion\">\u5e73\u53f0\u7248\u672c</label>\n                    <input id=\"wizardVersion\" type=\"text\" value=\"v1.0\">\n                  </div>\n                  <div class=\"field\">\n                    <label for=\"wizardOwner\">\u8054\u7cfb\u4eba</label>\n                    <input id=\"wizardOwner\" type=\"text\" value=\"\u674e\u5de5\">\n                  </div>\n                  <div class=\"field\">\n                    <label for=\"wizardEnv\">\u73af\u5883\u6807\u8bc6</label>\n                    <select id=\"wizardEnv\">\n                      <option value=\"\u6d4b\u8bd5\">\u6d4b\u8bd5</option>\n                      <option value=\"\u751f\u4ea7\">\u751f\u4ea7</option>\n                    </select>\n                  </div>\n                </div>\n                <div class=\"field\">\n                  <label for=\"wizardNote\">\u5907\u6ce8\u8bf4\u660e</label>\n                  <textarea id=\"wizardNote\">\u8be5\u5e73\u53f0\u4e3b\u8981\u63d0\u4f9b\u8bbe\u5907\u5b9e\u65f6\u70b9\u4f4d\u3001\u544a\u8b66\u72b6\u6001\u548c\u8fdc\u7a0b\u529f\u7387\u63a7\u5236\u80fd\u529b\uff0c\u521d\u59cb\u63a5\u5165\u5148\u8d70\u6d4b\u8bd5\u73af\u5883\u3002</textarea>\n                </div>\n                <div class=\"action-row\">\n                  <button type=\"button\" class=\"button brand\" id=\"wizardNext1\">\u4e0b\u4e00\u6b65</button>\n                </div>\n              </div>\n\n              <div class=\"panel wizard-panel\" data-step-panel=\"2\">\n                <div class=\"panel-header\">\n                  <div>\n                    <h3>\u9009\u62e9\u63a5\u5165\u65b9\u5f0f</h3>\n                    <p class=\"section-copy\">\u53ef\u9009\u62e9\u6807\u51c6\u5f00\u653e\u63a5\u5165\uff0c\u4e5f\u53ef\u540c\u65f6\u5f00\u542f\u4e3b\u52a8\u62c9\u53d6\u4e0e\u4e3b\u52a8\u63a7\u5236\u80fd\u529b\u3002</p>\n                  </div>\n                </div>\n                <div class=\"mode-grid\" id=\"wizardModes\">\n                  <button type=\"button\" class=\"mode-card\" data-mode=\"\u6807\u51c6\u5f00\u653e\">\n                    <div class=\"mini-tag info\">Mode A</div>\n                    <h4>\u6807\u51c6\u5f00\u653e\u63a5\u5165</h4>\n                    <div class=\"muted\">\u7b2c\u4e09\u65b9\u6309\u7167\u6211\u65b9\u6807\u51c6 API \u6587\u6863\u63a5\u5165\uff0c\u6838\u5fc3\u5173\u6ce8\u5e94\u7528\u6ce8\u518c\u3001\u5bc6\u94a5\u7ba1\u7406\u3001\u6807\u51c6\u6587\u6863\u548c SPI\u3002</div>\n                  </button>\n                  <button type=\"button\" class=\"mode-card active\" data-mode=\"\u4e3b\u52a8\u62c9\u53d6\">\n                    <div class=\"mini-tag ok\">Mode B</div>\n                    <h4>\u4e3b\u52a8\u62c9\u53d6\u63a5\u5165</h4>\n                    <div class=\"muted\">\u6211\u65b9\u5b9a\u65f6\u8c03\u7528\u7b2c\u4e09\u65b9\u63a5\u53e3\uff0c\u62c9\u53d6\u7535\u7ad9\u3001\u8bbe\u5907\u3001\u70b9\u4f4d\u3001\u72b6\u6001\u548c\u5386\u53f2\u6570\u636e\u3002</div>\n                  </button>\n                  <button type=\"button\" class=\"mode-card active\" data-mode=\"\u4e3b\u52a8\u63a7\u5236\">\n                    <div class=\"mini-tag warn\">Mode C</div>\n                    <h4>\u4e3b\u52a8\u63a7\u5236\u63a5\u5165</h4>\n                    <div class=\"muted\">\u6211\u65b9\u5411\u7b2c\u4e09\u65b9\u5e73\u53f0\u4e0b\u53d1\u63a7\u5236\u6307\u4ee4\uff0c\u5b8c\u6210\u529f\u7387\u63a7\u5236\u3001\u6a21\u5f0f\u5207\u6362\u548c\u56de\u6267\u8ffd\u8e2a\u3002</div>\n                  </button>\n                </div>\n                <div class=\"action-row\">\n                  <button type=\"button\" class=\"button secondary\" id=\"wizardPrev2\">\u4e0a\u4e00\u6b65</button>\n                  <button type=\"button\" class=\"button brand\" id=\"wizardNext2\">\u4e0b\u4e00\u6b65</button>\n                </div>\n              </div>\n\n              <div class=\"panel wizard-panel\" data-step-panel=\"3\">\n                <div class=\"panel-header\">\n                  <div>\n                    <h3>\u81ea\u52a8\u751f\u6210\u914d\u7f6e\u5165\u53e3</h3>\n                    <p class=\"section-copy\">\u7cfb\u7edf\u6839\u636e\u63a5\u5165\u65b9\u5f0f\u81ea\u52a8\u8ba1\u7b97\u540e\u7eed\u5fc5\u914d\u6a21\u5757\uff0c\u51cf\u5c11\u9057\u6f0f\u914d\u7f6e\u3002</p>\n                  </div>\n                </div>\n                <div class=\"module-preview\" id=\"wizardModules\"></div>\n                <div class=\"panel-note\" id=\"wizardSummary\"></div>\n                <div class=\"action-row\">\n                  <button type=\"button\" class=\"button secondary\" id=\"wizardPrev3\">\u4e0a\u4e00\u6b65</button>\n                  <button type=\"button\" class=\"button brand\" id=\"wizardNext3\">\u4e0b\u4e00\u6b65</button>\n                </div>\n              </div>\n\n              <div class=\"panel wizard-panel\" data-step-panel=\"4\">\n                <div class=\"grid-2-1\">\n                  <div class=\"list-card\">\n                    <h4>\u4fdd\u5b58\u786e\u8ba4</h4>\n                    <div class=\"line-list\" id=\"wizardReview\"></div>\n                  </div>\n                  <div class=\"mini-panel\">\n                    <h4>\u4fdd\u5b58\u540e\u52a8\u4f5c</h4>\n                      <div class=\"timeline\">\n                        <div class=\"timeline-item\">\u751f\u6210\u5e73\u53f0\u8349\u7a3f\u8bb0\u5f55\u5e76\u663e\u793a\u5728\u5217\u8868\u9875</div>\n                        <div class=\"timeline-item\">\u6839\u636e\u9009\u62e9\u7684\u6a21\u5f0f\u521b\u5efa\u6807\u51c6\u63a5\u5165\u9875\u7b7e\u6216\u4e3b\u52a8\u540c\u6b65\u9875\u7b7e</div>\n                        <div class=\"timeline-item\">\u5f15\u5bfc\u8fdb\u5165\u65e5\u5fd7\u4e0e\u76d1\u63a7\u9875\u9762\u89c2\u5bdf\u9996\u8f6e\u63a5\u5165\u7ed3\u679c</div>\n                      </div>\n                    </div>\n                </div>\n                <div class=\"action-row\">\n                  <button type=\"button\" class=\"button secondary\" id=\"wizardPrev4\">\u4e0a\u4e00\u6b65</button>\n                  <button type=\"button\" class=\"button brand\" id=\"wizardSave\">\u4fdd\u5b58\u8349\u7a3f</button>\n                </div>\n              </div>\n            </section>\n\n            <section class=\"screen\" id=\"screen-standard\">\n              <div class=\"panel\">\n                <div class=\"panel-header\">\n                  <div>\n                    <h2>\u6807\u51c6 API \u63a5\u5165\u8be6\u60c5</h2>\n                    <p class=\"section-copy\">\u670d\u52a1\u4e8e\u201c\u7b2c\u4e09\u65b9\u8c03\u7528\u5e73\u53f0\u6807\u51c6 API\u201d\u7684\u5f00\u653e\u63a5\u5165\u6a21\u5f0f\uff0c\u5305\u542b\u5e94\u7528\u6ce8\u518c\u3001\u5bc6\u94a5\u7ba1\u7406\u3001\u6807\u51c6\u6587\u6863\u548c\u8bbe\u5907\u63a7\u5236 SPI\u3002</p>\n                  </div>\n                  <div class=\"action-row\">\n                    <span class=\"chip\" id=\"standardPlatformBadge\">\u5f53\u524d\u5e73\u53f0\uff1a\u5317\u65b9\u9006\u53d8\u5668\u5f00\u653e\u5e73\u53f0</span>\n                    <button type=\"button\" class=\"button secondary\" id=\"rotateKey\">\u8f6e\u6362\u5bc6\u94a5</button>\n                  </div>\n                </div>\n                <div class=\"tab-row\" data-tab-group=\"standard-tabs\">\n                  <button type=\"button\" class=\"tab-button active\" data-group=\"standard-tabs\" data-target=\"standard-app\">\u5e94\u7528\u6ce8\u518c</button>\n                  <button type=\"button\" class=\"tab-button\" data-group=\"standard-tabs\" data-target=\"standard-key\">\u63a5\u5165\u5bc6\u94a5</button>\n                  <button type=\"button\" class=\"tab-button\" data-group=\"standard-tabs\" data-target=\"standard-doc\">\u6807\u51c6 API \u6587\u6863</button>\n                  <button type=\"button\" class=\"tab-button\" data-group=\"standard-tabs\" data-target=\"standard-spi\">\u8bbe\u5907\u63a7\u5236 SPI</button>\n                </div>\n\n                <div class=\"tab-panel active\" id=\"standard-app\">\n                  <div class=\"grid-2-1\">\n                    <div class=\"list-card\">\n                      <h4>\u5e94\u7528\u6ce8\u518c\u4fe1\u606f</h4>\n                      <div class=\"line-list\" id=\"standardAppInfo\"></div>\n                    </div>\n                    <div class=\"mini-panel\">\n                      <h4>\u5f00\u653e\u8303\u56f4</h4>\n                      <div class=\"badge-stack\">\n                        <span class=\"tag\">\u7535\u7ad9\u65b0\u589e\u6539</span>\n                        <span class=\"tag\">\u8bbe\u5907\u65b0\u589e\u6539</span>\n                        <span class=\"tag\">\u70b9\u4f4d\u6570\u636e\u4e0a\u4f20</span>\n                        <span class=\"tag\">\u72b6\u6001\u4e0a\u62a5</span>\n                      </div>\n                      <div class=\"spacer\"></div>\n                      <button type=\"button\" class=\"button secondary\" id=\"showOpenRights\">\u67e5\u770b\u6743\u9650\u77e9\u9635</button>\n                    </div>\n                  </div>\n                  <div class=\"list-card\">\n                    <div class=\"panel-header\">\n                      <div>\n                        <h4>\u5e73\u53f0\u767d\u540d\u5355 IP \u914d\u7f6e\u5217\u8868</h4>\n                      </div>\n                      <div class=\"action-row\">\n                        <button type=\"button\" class=\"button secondary\" id=\"addStandardWhitelistIp\">\u65b0\u589e IP</button>\n                        <button type=\"button\" class=\"button brand\" id=\"saveStandardWhitelistIp\">\u4fdd\u5b58\u767d\u540d\u5355</button>\n                      </div>\n                    </div>\n                    <div class=\"table-shell\">\n                      <table>\n                        <thead>\n                          <tr>\n                            <th>\u767d\u540d\u5355IP</th>\n                            <th>\u8bf4\u660e</th>\n                            <th>\u72b6\u6001</th>\n                          </tr>\n                        </thead>\n                        <tbody id=\"standardWhitelistIpBody\"></tbody>\n                      </table>\n                    </div>\n                  </div>\n                </div>\n\n                <div class=\"tab-panel\" id=\"standard-key\">\n                  <div class=\"stats-grid\">\n                    <div class=\"metric-card\">\n                      <div class=\"metric-label\">AppId</div>\n                      <div class=\"metric-value\" style=\"font-size:22px\">OPEN-PLAT-2026</div>\n                      <div class=\"metric-trend\">\u5e94\u7528\u72b6\u6001\uff1a\u542f\u7528\u4e2d</div>\n                    </div>\n                    <div class=\"metric-card\">\n                      <div class=\"metric-label\">API Key</div>\n                      <div class=\"metric-value\" style=\"font-size:22px\" id=\"apiKeyMasked\">SK_8H4D\u2022\u2022\u2022\u2022\u2022\u2022</div>\n                      <div class=\"metric-trend\">\u4ec5\u9996\u6b21\u5c55\u793a\u5b8c\u6574\u660e\u6587</div>\n                    </div>\n                    <div class=\"metric-card\">\n                      <div class=\"metric-label\">\u6700\u8fd1\u8f6e\u6362</div>\n                      <div class=\"metric-value\" style=\"font-size:22px\" id=\"apiKeyRotatedAt\">2026-03-18</div>\n                      <div class=\"metric-trend\">\u652f\u6301\u81ea\u52a8\u8f6e\u6362\u7b56\u7565</div>\n                    </div>\n                    <div class=\"metric-card\">\n                      <div class=\"metric-label\">\u5b89\u5168\u7b56\u7565</div>\n                      <div class=\"metric-value\" style=\"font-size:22px\">AES+\u8131\u654f</div>\n                      <div class=\"metric-trend\">\u654f\u611f\u5b57\u6bb5\u52a0\u5bc6\u5b58\u50a8</div>\n                    </div>\n                  </div>\n                </div>\n\n                <div class=\"tab-panel\" id=\"standard-doc\">\n                  <div class=\"grid-2-1\">\n                    <div class=\"list-card\">\n                      <h4>\u6807\u51c6\u6587\u6863\u5206\u7ec4</h4>\n                      <div class=\"line-list\">\n                        <div class=\"line-item\"><span class=\"line-key\">\u7535\u7ad9\u7ba1\u7406</span><span>\u65b0\u589e / \u4fee\u6539 / \u5220\u9664 / \u67e5\u8be2</span></div>\n                        <div class=\"line-item\"><span class=\"line-key\">\u8bbe\u5907\u7ba1\u7406</span><span>\u65b0\u589e / \u4fee\u6539 / \u5220\u9664 / \u67e5\u8be2</span></div>\n                        <div class=\"line-item\"><span class=\"line-key\">\u70b9\u4f4d\u6570\u636e\u4e0a\u62a5</span><span>\u5b9e\u65f6 / \u6279\u91cf / \u5386\u53f2</span></div>\n                        <div class=\"line-item\"><span class=\"line-key\">\u72b6\u6001\u4e0a\u62a5</span><span>\u8bbe\u5907\u72b6\u6001 / \u544a\u8b66\u72b6\u6001 / \u8fd0\u884c\u6a21\u5f0f</span></div>\n                        <div class=\"line-item\"><span class=\"line-key\">\u8bbe\u5907\u63a7\u5236 SPI</span><span>Header \u914d\u7f6e / \u56de\u8c03\u9274\u6743 / \u54cd\u5e94\u6a21\u7248</span></div>\n                      </div>\n                    </div>\n                    <div class=\"mini-panel\">\n                      <h4>\u5728\u7ebf\u8c03\u8bd5</h4>\n                      <div class=\"panel-note\">\u70b9\u51fb\u4e0b\u65b9\u6309\u94ae\u53ef\u5728\u62bd\u5c49\u4e2d\u67e5\u770b curl \u793a\u4f8b\u3001\u8bf7\u6c42\u5934\u548c\u6807\u51c6\u54cd\u5e94\u6837\u4f8b\u3002</div>\n                      <button type=\"button\" class=\"button brand\" id=\"openDocDebug\">\u6253\u5f00\u8c03\u8bd5\u6837\u4f8b</button>\n                    </div>\n                  </div>\n                </div>\n\n                <div class=\"tab-panel\" id=\"standard-spi\">\n                  <div class=\"two-column\">\n                    <div class=\"list-card\">\n                      <h4>SPI \u7ed1\u5b9a\u89c4\u5219</h4>\n                      <div class=\"form-grid\">\n                        <div class=\"field\">\n                          <label for=\"standardSpiTimeout\">\u63a7\u5236\u8d85\u65f6</label>\n                          <input id=\"standardSpiTimeout\" type=\"text\">\n                        </div>\n                        <div class=\"field\">\n                          <label for=\"standardSpiRetryCount\">\u91cd\u8bd5\u6b21\u6570</label>\n                          <input id=\"standardSpiRetryCount\" type=\"text\">\n                        </div>\n                        <div class=\"field\">\n                          <label for=\"standardSpiSignMethod\">\u7b7e\u540d\u65b9\u5f0f</label>\n                          <input id=\"standardSpiSignMethod\" type=\"text\">\n                        </div>\n                        <div class=\"field\">\n                          <label for=\"standardSpiResultPath\">\u56de\u6267\u67e5\u8be2</label>\n                          <input id=\"standardSpiResultPath\" type=\"text\">\n                        </div>\n                      </div>\n                      <div class=\"spacer\"></div>\n                      <h4>\u56de\u8c03\u5e73\u53f0\u51ed\u8bc1</h4>\n                      <div class=\"form-grid\">\n                        <div class=\"field\">\n                          <label for=\"standardSpiCallbackApiKey\">\u56de\u8c03\u5e73\u53f0 apiKey</label>\n                          <input id=\"standardSpiCallbackApiKey\" type=\"text\">\n                        </div>\n                        <div class=\"field\">\n                          <label for=\"standardSpiCallbackApiSecret\">\u56de\u8c03\u5e73\u53f0 apiSecret</label>\n                          <input id=\"standardSpiCallbackApiSecret\" type=\"text\">\n                        </div>\n                        <div class=\"field\">\n                          <label for=\"standardSpiCallbackUrl\">\u56de\u8c03\u5730\u5740</label>\n                          <input id=\"standardSpiCallbackUrl\" type=\"text\">\n                        </div>\n                        <div class=\"field\">\n                          <label for=\"standardSpiAuthMode\">\u9274\u6743\u65b9\u5f0f</label>\n                          <input id=\"standardSpiAuthMode\" type=\"text\">\n                        </div>\n                      </div>\n                    </div>\n                    <div class=\"list-card\">\n                      <div class=\"field\">\n                        <label for=\"standardSpiHeaderDefinition\">Header \u914d\u7f6e</label>\n                        <textarea id=\"standardSpiHeaderDefinition\"></textarea>\n                      </div>\n                      <div class=\"field\">\n                        <label for=\"standardSpiInputTemplate\">\u5165\u53c2\u6a21\u677f</label>\n                        <textarea id=\"standardSpiInputTemplate\"></textarea>\n                      </div>\n                      <div class=\"field\">\n                        <label for=\"standardSpiResponseTemplate\">\u54cd\u5e94\u6a21\u7248</label>\n                        <textarea id=\"standardSpiResponseTemplate\"></textarea>\n                      </div>\n                      <div class=\"field\">\n                        <label for=\"standardSpiResponseExample\">\u6807\u51c6\u54cd\u5e94\u793a\u4f8b</label>\n                        <textarea id=\"standardSpiResponseExample\"></textarea>\n                      </div>\n                    </div>\n                  </div>\n                  <div class=\"action-row\">\n                    <button type=\"button\" class=\"button secondary\" id=\"saveStandardSpiConfig\">\u4fdd\u5b58 SPI \u914d\u7f6e</button>\n                  </div>\n                  <div class=\"list-card\">\n                    <div class=\"panel-header\">\n                      <div>\n                        <h4>\u8c03\u8bd5</h4>\n                      </div>\n                      <button type=\"button\" class=\"button brand\" id=\"runStandardSpiDebug\">\u8c03\u8bd5</button>\n                    </div>\n                    <div class=\"two-column\">\n                      <div class=\"field\">\n                        <label for=\"standardSpiDebugInput\">\u8f93\u5165\u53c2\u6570</label>\n                        <textarea id=\"standardSpiDebugInput\">{\n        \"requestId\": \"CTRL-20260324-0099\",\n        \"stationCode\": \"ST-001\",\n        \"deviceCode\": \"PCS-991\",\n        \"controlCode\": \"setActivePower\",\n        \"controlName\": \"\u6709\u529f\u529f\u7387\u63a7\u5236\",\n        \"timestamp\": \"2026-03-24T10:15:58+08:00\",\n        \"data\": {\n          \"activePower\": 250,\n          \"unit\": \"kW\",\n          \"operator\": \"dispatch-center\"\n        }\n      }</textarea>\n                      </div>\n                      <div class=\"mini-panel\">\n                        <h4>\u8fd4\u56de\u7ed3\u679c</h4>\n                        <pre class=\"detail-code\" id=\"standardSpiDebugOutput\">\u70b9\u51fb\u201c\u8c03\u8bd5\u201d\u540e\u663e\u793a\u56de\u8c03\u8fd4\u56de\u7ed3\u679c\u3002</pre>\n                      </div>\n                    </div>\n                  </div>\n                </div>\n              </div>\n            </section>\n\n            <section class=\"screen\" id=\"screen-active-config\">\n              <div class=\"panel\">\n                <div class=\"panel-header\">\n                  <div>\n                    <h2>\u4e3b\u52a8\u540c\u6b65\u914d\u7f6e\u8be6\u60c5</h2>\n                    <p class=\"section-copy\">\u8986\u76d6\u5e94\u7528\u7ba1\u7406\u3001\u8ba4\u8bc1\u3001\u7b7e\u540d\u3001\u63a5\u53e3\u5b9a\u4e49\u3001\u8c03\u7528\u4efb\u52a1\u7ba1\u7406\u4e0e\u8c03\u7528\u7b56\u7565\u914d\u7f6e\u3002</p>\n                  </div>\n                  <div class=\"action-row\">\n                    <span class=\"chip\" id=\"activePlatformBadge\">\u5f53\u524d\u5e73\u53f0\uff1a-</span>\n                    <button type=\"button\" class=\"button secondary\" id=\"addApiDefinition\">\u65b0\u589e\u63a5\u53e3</button>\n                  </div>\n                </div>\n\n                <div class=\"tab-row\" data-tab-group=\"active-tabs\">\n                  <button type=\"button\" class=\"tab-button active\" data-group=\"active-tabs\" data-target=\"active-app\">\u5e94\u7528\u7ba1\u7406</button>\n                  <button type=\"button\" class=\"tab-button\" data-group=\"active-tabs\" data-target=\"active-auth\">\u8ba4\u8bc1\u914d\u7f6e</button>\n                  <button type=\"button\" class=\"tab-button\" data-group=\"active-tabs\" data-target=\"active-sign\">\u7b7e\u540d\u914d\u7f6e</button>\n                  <button type=\"button\" class=\"tab-button\" data-group=\"active-tabs\" data-target=\"active-api\">API \u5b9a\u4e49</button>\n                  <button type=\"button\" class=\"tab-button\" data-group=\"active-tabs\" data-target=\"active-task\">\u8c03\u7528\u4efb\u52a1\u7ba1\u7406</button>\n                  <button type=\"button\" class=\"tab-button\" data-group=\"active-tabs\" data-target=\"active-strategy\">\u8c03\u7528\u7b56\u7565\u914d\u7f6e</button>\n                </div>\n\n                <div class=\"tab-panel active\" id=\"active-app\">\n                  <div class=\"grid-2-1\">\n                    <div class=\"list-card\">\n                      <div class=\"panel-header\">\n                        <div>\n                          <h4>\u5e73\u53f0\u4fe1\u606f</h4>\n                          <p class=\"section-copy\">\u7ef4\u62a4\u4e3b\u52a8\u540c\u6b65\u5e73\u53f0\u7684\u57fa\u7840\u4fe1\u606f\uff0c\u4fdd\u5b58\u540e\u540c\u6b65\u66f4\u65b0\u5e73\u53f0\u53f0\u8d26\u4e0e\u9876\u90e8\u6458\u8981\u3002</p>\n                        </div>\n                      </div>\n                      <div class=\"form-grid\">\n                        <div class=\"field\">\n                          <label for=\"activePlatformName\">\u5e73\u53f0\u540d\u79f0</label>\n                          <input id=\"activePlatformName\" type=\"text\">\n                        </div>\n                        <div class=\"field\">\n                          <label for=\"activePlatformVendor\">\u5382\u5546\u540d\u79f0</label>\n                          <input id=\"activePlatformVendor\" type=\"text\">\n                        </div>\n                        <div class=\"field\">\n                          <label for=\"activePlatformMode\">\u5bf9\u63a5\u65b9\u5f0f</label>\n                          <select id=\"activePlatformMode\">\n                            <option value=\"\u4e3b\u52a8\u540c\u6b65\">\u4e3b\u52a8\u540c\u6b65</option>\n                          </select>\n                        </div>\n                        <div class=\"field\">\n                          <label for=\"activePlatformEnv\">\u73af\u5883</label>\n                          <select id=\"activePlatformEnv\">\n                            <option value=\"\u5f00\u53d1\">\u5f00\u53d1</option>\n                            <option value=\"\u6d4b\u8bd5\">\u6d4b\u8bd5</option>\n                            <option value=\"\u751f\u4ea7\">\u751f\u4ea7</option>\n                          </select>\n                        </div>\n                        <div class=\"field\">\n                          <label for=\"activePlatformOwner\">\u8d1f\u8d23\u4eba</label>\n                          <input id=\"activePlatformOwner\" type=\"text\">\n                        </div>\n                        <div class=\"field\">\n                          <label for=\"activePlatformVersion\">\u5bf9\u63a5\u5e73\u53f0\u7248\u672c</label>\n                          <input id=\"activePlatformVersion\" type=\"text\" placeholder=\"\u4f8b\u5982\uff1av1.0\">\n                        </div>\n                        <div class=\"field\" style=\"grid-column: 1 / -1;\">\n                          <label for=\"activePlatformBaseUrl\">\u57fa\u7840\u5730\u5740</label>\n                          <input id=\"activePlatformBaseUrl\" type=\"text\" placeholder=\"https://partner.example.com\">\n                        </div>\n                      </div>\n                      <div class=\"field\" style=\"margin-top: 16px;\">\n                        <label for=\"activePlatformDesc\">\u5e73\u53f0\u8bf4\u660e</label>\n                        <textarea id=\"activePlatformDesc\"></textarea>\n                      </div>\n                      <div class=\"action-row\" style=\"margin-top: 16px;\">\n                        <button type=\"button\" class=\"button brand\" id=\"saveActiveApp\">\u4fdd\u5b58</button>\n                      </div>\n                    </div>\n                    <div class=\"mini-panel\">\n                      <h4>\u914d\u7f6e\u63d0\u9192</h4>\n                      <div class=\"panel-note\">\u5e73\u53f0\u540d\u79f0\u3001\u73af\u5883\u3001\u7248\u672c\u548c\u57fa\u7840\u5730\u5740\u53d8\u66f4\u540e\uff0c\u4f1a\u540c\u6b65\u5f71\u54cd\u9876\u90e8\u6458\u8981\u3001\u5e73\u53f0\u5217\u8868\u548c\u540e\u7eed\u4e3b\u52a8\u540c\u6b65\u914d\u7f6e\u5c55\u793a\u3002</div>\n                    </div>\n                  </div>\n                </div>\n\n                <div class=\"tab-panel\" id=\"active-auth\">\n                  <div class=\"list-card\">\n                    <div class=\"form-grid\">\n                      <div class=\"field\">\n                        <label for=\"authModeSelect\">\u8ba4\u8bc1\u65b9\u5f0f</label>\n                        <select id=\"authModeSelect\">\n                          <option value=\"App + Key\">App + Key</option>\n                          <option value=\"API Key\">API Key</option>\n                          <option value=\"OAuth2.0\">OAuth2.0</option>\n                          <option value=\"\u8bc1\u4e66\u8ba4\u8bc1\">\u8bc1\u4e66\u8ba4\u8bc1</option>\n                        </select>\n                      </div>\n                      <div class=\"field\">\n                        <label for=\"authTokenUrl\">Token \u5730\u5740</label>\n                        <input id=\"authTokenUrl\" type=\"text\">\n                      </div>\n                      <div class=\"field\">\n                        <label for=\"authRequestMethod\">\u8bf7\u6c42\u65b9\u5f0f</label>\n                        <input id=\"authRequestMethod\" type=\"text\" placeholder=\"\u4f8b\u5982\uff1aPOST\">\n                      </div>\n                      <div class=\"field\">\n                        <label for=\"authClientId\">Client ID</label>\n                        <input id=\"authClientId\" type=\"text\">\n                      </div>\n                      <div class=\"field\">\n                        <label for=\"authAppKey\">appKey</label>\n                        <input id=\"authAppKey\" type=\"text\">\n                      </div>\n                      <div class=\"field\">\n                        <label for=\"authSecret\">Client Secret</label>\n                        <input id=\"authSecret\" type=\"password\">\n                      </div>\n                    </div>\n                    <div class=\"list-card\" style=\"grid-column: 1 / -1;\">\n                      <div class=\"panel-header\">\n                        <div>\n                          <h4>\u8bf7\u6c42 Header \u914d\u7f6e</h4>\n                        </div>\n                        <button type=\"button\" class=\"button secondary\" id=\"addAuthHeaderRow\">\u65b0\u589e Header</button>\n                      </div>\n                      <div class=\"kv-editor\" id=\"authHeaderList\"></div>\n                      <div class=\"kv-hint\">\u503c\u8f93\u5165\u6846\u652f\u6301\u53d8\u91cf\u65b9\u5f0f\u8f93\u5165\uff0c\u4f8b\u5982\uff1a`${clientId}`\u3001`${timestamp}`\u3002</div>\n                    </div>\n                    <div class=\"list-card\" style=\"grid-column: 1 / -1;\">\n                      <div class=\"panel-header\">\n                        <div>\n                          <h4>Token Header \u914d\u7f6e</h4>\n                        </div>\n                        <button type=\"button\" class=\"button secondary\" id=\"addAuthTokenHeaderRow\">\u65b0\u589e Header</button>\n                      </div>\n                      <div class=\"kv-editor\" id=\"authTokenHeaderList\"></div>\n                      <div class=\"kv-hint\">\u503c\u8f93\u5165\u6846\u652f\u6301\u53d8\u91cf\u65b9\u5f0f\u8f93\u5165\uff0c\u4f8b\u5982\uff1a`Bearer ${accessToken}`\u3001`${appKey}`\u3002</div>\n                    </div>\n                  </div>\n                  <div class=\"two-column\">\n                    <div class=\"list-card\">\n                      <h4>\u8bf7\u6c42\u53c2\u6570\u6784\u5efa\u811a\u672c</h4>\n                      <div class=\"field\">\n                        <label for=\"authRequestBuilderScript\">\u8bf7\u6c42\u53c2\u6570\u6784\u5efa\u811a\u672c</label>\n                        <textarea id=\"authRequestBuilderScript\"></textarea>\n                      </div>\n                    </div>\n                    <div class=\"list-card\">\n                      <h4>Token \u89e3\u6790\u811a\u672c</h4>\n                      <div class=\"field\">\n                        <label for=\"authTokenParserScript\">Token \u89e3\u6790\u811a\u672c</label>\n                        <textarea id=\"authTokenParserScript\"></textarea>\n                      </div>\n                    </div>\n                  </div>\n                  <div class=\"action-row\">\n                    <button type=\"button\" class=\"button secondary\" id=\"saveAuthConfig\">\u4fdd\u5b58\u8ba4\u8bc1\u914d\u7f6e</button>\n                    <button type=\"button\" class=\"button brand test-runner\" data-test-type=\"\u4e3b\u52a8\u540c\u6b65-\u8fde\u901a\u6027\u6d4b\u8bd5\">\u7acb\u5373\u9a8c\u8bc1</button>\n                  </div>\n                </div>\n\n                <div class=\"tab-panel\" id=\"active-sign\">\n                  <div class=\"list-card\">\n                    <div class=\"panel-header\">\n                      <div>\n                        <h4>\u7b7e\u540d\u914d\u7f6e</h4>\n                      </div>\n                      <div class=\"action-row\">\n                        <span class=\"chip\" id=\"signConfigStatusChip\">\u7b7e\u540d\u72b6\u6001\uff1a-</span>\n                        <button type=\"button\" class=\"button secondary\" id=\"toggleSignConfigEnabled\">\u5207\u6362\u542f\u7528</button>\n                      </div>\n                    </div>\n                    <div class=\"form-grid\">\n                      <div class=\"field\">\n                        <label for=\"signAlgorithm\">\u7b7e\u540d\u7b97\u6cd5</label>\n                        <select id=\"signAlgorithm\">\n                          <option value=\"MD5\">MD5\uff08\u7b80\u5355\u3001\u8001\u7cfb\u7edf\uff09</option>\n                          <option value=\"HMAC-SHA1\">HMAC-SHA1</option>\n                          <option value=\"HMAC-SHA256\">HMAC-SHA256\uff08\u6700\u4e3b\u6d41\u3001\u6700\u5b89\u5168\uff09</option>\n                          <option value=\"SHA256\">SHA256</option>\n                        </select>\n                      </div>\n                      <div class=\"field\">\n                        <label for=\"signSecretKeyType\">\u5bc6\u94a5 key</label>\n                        <select id=\"signSecretKeyType\">\n                          <option value=\"AppSecret\">AppSecret</option>\n                        </select>\n                      </div>\n                      <div class=\"field\">\n                        <label for=\"signFieldName\">\u7b7e\u540d\u5b57\u6bb5</label>\n                        <input id=\"signFieldName\" type=\"text\" placeholder=\"\u8bf7\u8f93\u5165\u7b7e\u540d\u5b57\u6bb5\">\n                      </div>\n                      <div class=\"field\">\n                        <label for=\"signEncoding\">\u7f16\u7801\u683c\u5f0f</label>\n                        <select id=\"signEncoding\">\n                          <option value=\"UTF-8\">UTF-8</option>\n                        </select>\n                      </div>\n                      <div class=\"field\">\n                        <label for=\"signLetterCase\">\u5927\u5c0f\u5199</label>\n                        <select id=\"signLetterCase\">\n                          <option value=\"\u5927\u5199\">\u5927\u5199</option>\n                          <option value=\"\u5c0f\u5199\">\u5c0f\u5199</option>\n                        </select>\n                      </div>\n                      <div class=\"field\">\n                        <label for=\"signTimestampUnit\">timestamp</label>\n                        <select id=\"signTimestampUnit\">\n                          <option value=\"\u79d2\">\u79d2</option>\n                          <option value=\"\u6beb\u79d2\">\u6beb\u79d2</option>\n                        </select>\n                      </div>\n                      <div class=\"field\">\n                        <label for=\"signNonceLength\">nonce \u968f\u673a\u6570\u4f4d\u6570</label>\n                        <input id=\"signNonceLength\" type=\"number\" min=\"1\" step=\"1\" placeholder=\"\u8bf7\u8f93\u5165\u968f\u673a\u6570\u4f4d\u6570\">\n                      </div>\n                      <div class=\"field\" style=\"grid-column: 1 / -1;\">\n                        <label for=\"signConcatRule\">\u7b7e\u540d\u5b57\u7b26\u62fc\u63a5\u89c4\u5219</label>\n                        <input\n                          id=\"signConcatRule\"\n                          type=\"text\"\n                          placeholder=\"keyname1=${params.username}&keyname2=${body}&keyname3=${body.xxx}+${appSecret}\"\n                        >\n                      </div>\n                    </div>\n                    <div class=\"action-row\" style=\"margin-top: 16px; justify-content: flex-end;\">\n                      <button type=\"button\" class=\"button brand\" id=\"saveSignConfig\">\u4fdd\u5b58</button>\n                    </div>\n                  </div>\n                </div>\n\n                <div class=\"tab-panel\" id=\"active-api\">\n                  <div class=\"panel-header\">\n                    <div>\n                      <h3 class=\"section-title\">API \u5b9a\u4e49\u7ba1\u7406</h3>\n                      <p class=\"section-copy\">\u8fd9\u91cc\u4ec5\u505a API \u6e05\u5355\u7ba1\u7406\u4e0e\u9009\u62e9\u3002\u540c\u6b65\u7b56\u7565\u5df2\u4e0b\u6c89\u5230\u8c03\u7528\u4efb\u52a1\u7ba1\u7406\uff0cAPI \u7684\u6a21\u677f\u3001\u534f\u8bae\u811a\u672c\u3001\u811a\u672c\u8fd0\u884c\u548c\u8fd4\u56de\u8c03\u8bd5\u7edf\u4e00\u8fdb\u5165\u72ec\u7acb\u7684 API \u8be6\u60c5\u9875\u5b8c\u6210\u3002</p>\n                    </div>\n                    <div class=\"action-row\">\n                      <span class=\"chip\" id=\"apiCountChip\">\u5171 3 \u4e2a\u63a5\u53e3\u5b9a\u4e49</span>\n                    </div>\n                  </div>\n                  <div class=\"table-shell\">\n                    <table>\n                      <thead>\n                        <tr>\n                          <th>\u63a5\u53e3\u7f16\u7801</th>\n                          <th>\u63a5\u53e3\u540d\u79f0</th>\n                          <th>\u5206\u7c7b</th>\n                          <th>\u65b9\u6cd5</th>\n                          <th>\u5730\u5740</th>\n                          <th>\u6210\u529f\u7387</th>\n                          <th>\u64cd\u4f5c</th>\n                        </tr>\n                      </thead>\n                      <tbody id=\"apiTableBody\"></tbody>\n                    </table>\n                  </div>\n                  <div class=\"action-row\" style=\"margin-top:16px;\">\n                    <button type=\"button\" class=\"button brand\" id=\"saveApiDefinitionList\">\u4fdd\u5b58 API \u5b9a\u4e49</button>\n                  </div>\n                </div>\n\n                <div class=\"tab-panel\" id=\"active-task\">\n                  <div class=\"grid-2-1\">\n                    <div class=\"list-card\">\n                      <div class=\"panel-header\">\n                        <div>\n                          <h4>\u8c03\u7528\u4efb\u52a1\u5217\u8868</h4>\n                          <p class=\"section-copy\">\u7ba1\u7406\u4efb\u52a1\u7f16\u6392\u3001\u540c\u6b65\u7b56\u7565\u3001\u8c03\u7528 API \u8303\u56f4\u3001\u8c03\u7528\u9891\u7387\u4e0e\u542f\u505c\u72b6\u6001\u3002</p>\n                        </div>\n                        <button type=\"button\" class=\"button secondary\" id=\"addCallTask\">\u65b0\u589e\u4efb\u52a1</button>\n                      </div>\n                      <div class=\"list-stack\" id=\"callTaskList\"></div>\n                    </div>\n                    <div class=\"mini-panel\">\n                      <h4>\u4efb\u52a1\u914d\u7f6e\u8be6\u60c5</h4>\n                      <div class=\"line-list\" id=\"callTaskMeta\"></div>\n                      <div class=\"form-grid\">\n                        <div class=\"field\">\n                          <label for=\"taskDetailName\">\u4efb\u52a1\u540d\u79f0</label>\n                          <input id=\"taskDetailName\" type=\"text\">\n                        </div>\n                        <div class=\"field\">\n                          <label for=\"taskDetailTriggerMode\">\u8c03\u7528\u65b9\u5f0f</label>\n                          <select id=\"taskDetailTriggerMode\">\n                            <option value=\"\u56fa\u5b9a\u9891\u7387\">\u56fa\u5b9a\u9891\u7387</option>\n                            <option value=\"\u5b9a\u65f6\u8c03\u7528\">\u5b9a\u65f6\u8c03\u7528</option>\n                          </select>\n                        </div>\n                        <div class=\"field\">\n                          <label for=\"taskDetailFrequency\">\u8c03\u7528\u9891\u7387</label>\n                          <input id=\"taskDetailFrequency\" type=\"text\" placeholder=\"\u4f8b\u5982\uff1a\u6bcf 5 \u5206\u949f / \u6bcf 1 \u5c0f\u65f6\">\n                        </div>\n                        <div class=\"field\">\n                          <label for=\"taskDetailCron\">\u5b9a\u65f6\u8868\u8fbe\u5f0f</label>\n                          <input id=\"taskDetailCron\" type=\"text\" placeholder=\"\u4f8b\u5982\uff1a0 0/5 * * * ?\">\n                        </div>\n                        <div class=\"field\">\n                          <label for=\"taskDetailStatus\">\u4efb\u52a1\u72b6\u6001</label>\n                          <select id=\"taskDetailStatus\">\n                            <option value=\"\u542f\u7528\">\u542f\u7528</option>\n                            <option value=\"\u505c\u7528\">\u505c\u7528</option>\n                          </select>\n                        </div>\n                        <div class=\"field\">\n                          <label for=\"taskDetailWindow\">\u6267\u884c\u7a97\u53e3</label>\n                          <input id=\"taskDetailWindow\" type=\"text\" placeholder=\"\u4f8b\u5982\uff1a\u5168\u5929 / 08:00-20:00\">\n                        </div>\n                        <div class=\"field\">\n                          <label for=\"taskDetailStrategy\">\u540c\u6b65\u7b56\u7565</label>\n                          <select id=\"taskDetailStrategy\"></select>\n                        </div>\n                      </div>\n                      <div class=\"panel-header\" style=\"margin-top: 12px;\">\n                        <div>\n                          <h4>API\u7f16\u6392</h4>\n                          <p class=\"section-copy\">\u6309\u8c03\u7528\u987a\u5e8f\u7ef4\u62a4 API\u540d\u79f0\u3001API\u53c2\u6570\u6765\u6e90\u3001\u53c2\u6570\u914d\u7f6e\u548c\u540e\u7f6e\u6570\u636e\u5904\u7406\u811a\u672c\u3002</p>\n                        </div>\n                        <button type=\"button\" class=\"button secondary\" id=\"addTaskApiConfig\">\u65b0\u589e API</button>\n                      </div>\n                      <div class=\"api-orchestration-list\" id=\"taskApiConfigList\"></div>\n                      <div class=\"field\">\n                        <label for=\"taskDetailNote\">\u4efb\u52a1\u8bf4\u660e</label>\n                        <textarea id=\"taskDetailNote\"></textarea>\n                      </div>\n                      <div class=\"panel-note\">\u8c03\u7528\u4efb\u52a1\u5b9a\u4e49\u5f53\u524d\u5e73\u53f0\u54ea\u4e9b API \u88ab\u89e6\u53d1\u6267\u884c\u3001\u4ee5\u4ec0\u4e48\u9891\u7387\u6216\u5b9a\u65f6\u8ba1\u5212\u8c03\u7528\uff0c\u4ee5\u53ca\u4efb\u52a1\u7684\u542f\u7528 / \u505c\u7528\u72b6\u6001\u3002</div>\n                      <div class=\"action-row\">\n                        <button type=\"button\" class=\"button secondary\" id=\"saveCallTask\">\u4fdd\u5b58\u4efb\u52a1</button>\n                        <button type=\"button\" class=\"button secondary\" id=\"toggleCallTaskStatus\">\u505c\u7528\u4efb\u52a1</button>\n                        <button type=\"button\" class=\"button brand\" data-nav=\"call-logs\">\u67e5\u770b\u4efb\u52a1\u65e5\u5fd7</button>\n                      </div>\n                    </div>\n                  </div>\n                </div>\n\n                <div class=\"tab-panel\" id=\"active-strategy\">\n                  <div class=\"grid-2-1\">\n                    <div class=\"list-card\">\n                      <div class=\"panel-header\">\n                        <div>\n                          <h4>\u8c03\u7528\u7b56\u7565\u5217\u8868</h4>\n                          <p class=\"section-copy\">\u5e73\u53f0\u7ea7\u7edf\u4e00\u7ba1\u7406\uff0cAPI \u53ea\u8d1f\u8d23\u9009\u62e9\u5f15\u7528\uff1b\u5de6\u4fa7\u8868\u683c\u9009\u4e2d\u7b56\u7565\uff0c\u53f3\u4fa7\u7ef4\u62a4\u8be6\u60c5\u3002</p>\n                        </div>\n                        <button type=\"button\" class=\"button secondary\" id=\"addPlatformStrategy\">\u65b0\u589e\u7b56\u7565</button>\n                      </div>\n                      <div class=\"table-shell\">\n                        <table>\n                          <thead>\n                            <tr>\n                              <th>\u7b56\u7565\u540d\u79f0</th>\n                              <th>\u7b56\u7565\u7c7b\u578b</th>\n                              <th>\u8d85\u65f6\u65f6\u95f4</th>\n                              <th>\u670d\u52a1\u964d\u7ea7</th>\n                              <th>\u7b56\u7565\u8bf4\u660e</th>\n                              <th>\u64cd\u4f5c</th>\n                            </tr>\n                          </thead>\n                          <tbody id=\"platformStrategyTableBody\"></tbody>\n                        </table>\n                      </div>\n                    </div>\n                    <div class=\"list-card detail-pane\">\n                      <h4>\u7b56\u7565\u914d\u7f6e\u8be6\u60c5</h4>\n                      <div class=\"line-list\" id=\"platformStrategyMeta\"></div>\n                      <div class=\"form-grid\">\n                        <div class=\"field\">\n                          <label for=\"strategyDetailName\">\u7b56\u7565\u540d\u79f0</label>\n                          <input id=\"strategyDetailName\" type=\"text\">\n                        </div>\n                        <div class=\"field\">\n                          <label for=\"strategyDetailType\">\u7b56\u7565</label>\n                          <select id=\"strategyDetailType\">\n                            <option value=\"\u91cd\u8bd5\u7b56\u7565\">\u91cd\u8bd5\u7b56\u7565</option>\n                            <option value=\"\u5feb\u901f\u5931\u8d25\">\u5feb\u901f\u5931\u8d25</option>\n                            <option value=\"\u8f6e\u8baf\u7b56\u7565\">\u8f6e\u8baf\u7b56\u7565</option>\n                          </select>\n                        </div>\n                        <div class=\"field\">\n                          <label for=\"strategyDetailTimeout\">\u8d85\u65f6\u65f6\u95f4\uff08\u79d2\uff09</label>\n                          <input id=\"strategyDetailTimeout\" type=\"number\" min=\"1\" step=\"1\" placeholder=\"\u4f8b\u5982\uff1a5\">\n                        </div>\n                        <div class=\"field\">\n                          <label for=\"strategyDetailServiceDegrade\">\u662f\u5426\u670d\u52a1\u964d\u7ea7</label>\n                          <select id=\"strategyDetailServiceDegrade\">\n                            <option value=\"\u5173\u95ed\">\u5173\u95ed</option>\n                            <option value=\"\u5f00\u542f\">\u5f00\u542f\uff08\u8fd4\u56de\u9ed8\u8ba4\u6570\u636e\uff09</option>\n                          </select>\n                        </div>\n                      </div>\n                      <div class=\"field\">\n                        <label for=\"strategyDetailDescription\">\u7b56\u7565\u8bf4\u660e</label>\n                        <textarea id=\"strategyDetailDescription\"></textarea>\n                      </div>\n                      <div class=\"form-grid\" id=\"strategyRetryFields\" style=\"display:none;\">\n                        <div class=\"field\">\n                          <label for=\"strategyDetailRetryCount\">\u91cd\u8bd5\u6b21\u6570</label>\n                          <input id=\"strategyDetailRetryCount\" type=\"number\" min=\"1\" step=\"1\" placeholder=\"\u4f8b\u5982\uff1a2\">\n                        </div>\n                        <div class=\"field\">\n                          <label for=\"strategyDetailRetryInterval\">\u91cd\u8bd5\u95f4\u9694</label>\n                          <input id=\"strategyDetailRetryInterval\" type=\"text\" placeholder=\"\u4f8b\u5982\uff1a2 \u79d2\">\n                        </div>\n                      </div>\n                      <div class=\"form-grid\" id=\"strategyPollingFields\" style=\"display:none;\">\n                        <div class=\"field\">\n                          <label for=\"strategyDetailBackupLink\">\u5907\u7528\u94fe\u8def</label>\n                          <input id=\"strategyDetailBackupLink\" type=\"text\" placeholder=\"\u8bf7\u8f93\u5165\u5907\u7528\u94fe\u8def\">\n                        </div>\n                        <div class=\"field\">\n                          <label>\u5907\u7528\u94fe\u8def\u8fde\u901a\u6027\u6d4b\u8bd5</label>\n                          <div class=\"action-row\" style=\"margin-top:auto;\">\n                            <button type=\"button\" class=\"button secondary\" id=\"testStrategyBackupLink\">\u5907\u7528\u94fe\u8def\u8fde\u901a\u6027\u6d4b\u8bd5</button>\n                          </div>\n                        </div>\n                      </div>\n                      <div class=\"panel-note\">\u4e0d\u540c\u7b56\u7565\u7c7b\u578b\u4f1a\u663e\u793a\u4e0d\u540c\u914d\u7f6e\u9879\uff1b\u4fdd\u5b58\u540e\u6240\u6709\u5f15\u7528\u8be5\u7b56\u7565\u7684 API \u81ea\u52a8\u7ee7\u627f\u3002</div>\n                      <div class=\"action-row\">\n                        <button type=\"button\" class=\"button brand\" id=\"savePlatformStrategy\">\u4fdd\u5b58\u7b56\u7565\u914d\u7f6e</button>\n                      </div>\n                    </div>\n                  </div>\n                </div>\n\n              </div>\n            </section>\n\n            <section class=\"screen\" id=\"screen-api-detail\">\n              <div class=\"panel\">\n                <div class=\"panel-header\">\n                  <div>\n                    <h2>API \u8be6\u60c5\u9875</h2>\n                    <p class=\"section-copy\">\u56f4\u7ed5\u5355\u4e2a API \u8fdb\u884c\u8bbe\u8ba1\u3002\u9875\u9762\u5305\u542b API \u57fa\u672c\u4fe1\u606f\u3001\u8f93\u5165\u53c2\u6570\u6a21\u677f\u3001\u8f93\u5165\u53c2\u6570\u534f\u8bae\u811a\u672c\u8f6c\u6362\u3001\u8fd0\u884c\u811a\u672c\u5f97\u5230\u8c03\u7528\u53c2\u6570\u3001\u8fd4\u56de\u6570\u636e\u6a21\u677f\u3001\u8fd4\u56de\u534f\u8bae\u8f6c\u6362\u811a\u672c\u548c\u6807\u51c6\u8fd4\u56de\u8c03\u8bd5\u7ed3\u679c\u3002</p>\n                  </div>\n                  <div class=\"action-row\">\n                    <span class=\"chip\" id=\"apiDetailHeaderBadge\">\u5f53\u524d API\uff1a-</span>\n                    <button type=\"button\" class=\"button secondary\" data-nav=\"active-config\">\u8fd4\u56de API \u5217\u8868</button>\n                  </div>\n                </div>\n\n                <div class=\"grid-2-1\">\n                  <div class=\"list-card\">\n                    <h4>API \u57fa\u672c\u4fe1\u606f</h4>\n                    <div class=\"form-grid\">\n                      <div class=\"field\">\n                        <label for=\"apiDetailCode\">API \u7f16\u7801</label>\n                        <input id=\"apiDetailCode\" type=\"text\" disabled>\n                      </div>\n                      <div class=\"field\">\n                        <label for=\"apiDetailName\">API \u540d\u79f0</label>\n                        <input id=\"apiDetailName\" type=\"text\" disabled>\n                      </div>\n                      <div class=\"field\">\n                        <label for=\"apiDetailMethod\">\u8bf7\u6c42\u65b9\u5f0f</label>\n                        <input id=\"apiDetailMethod\" type=\"text\" disabled>\n                      </div>\n                      <div class=\"field\">\n                        <label for=\"apiDetailCategory\">\u63a5\u53e3\u5206\u7c7b</label>\n                        <input id=\"apiDetailCategory\" type=\"text\" disabled>\n                      </div>\n                      <div class=\"field\">\n                        <label for=\"apiDetailBaseUrl\">\u5e73\u53f0\u57fa\u7840\u5730\u5740</label>\n                        <input id=\"apiDetailBaseUrl\" type=\"text\" disabled>\n                      </div>\n                      <div class=\"field\">\n                        <label for=\"apiDetailSubUrl\">\u5b50 URL</label>\n                        <input id=\"apiDetailSubUrl\" type=\"text\">\n                      </div>\n                      <div class=\"field\">\n                        <label for=\"apiDetailConnectivity\">\u6700\u8fd1\u8fde\u901a\u6027</label>\n                        <input id=\"apiDetailConnectivity\" type=\"text\" disabled>\n                      </div>\n                    </div>\n                  </div>\n                  <div class=\"mini-panel\">\n                    <h4>\u8bbe\u8ba1\u8bf4\u660e</h4>\n                    <div class=\"line-list\" id=\"apiDetailMeta\"></div>\n                    <div class=\"panel-note\" id=\"apiDetailNotice\">\u540c\u6b65\u7b56\u7565\u5df2\u4e0b\u6c89\u5230\u8c03\u7528\u4efb\u52a1\u7ba1\u7406\u4e2d\u7ef4\u62a4\uff0cAPI \u8be6\u60c5\u9875\u4e0d\u518d\u76f4\u63a5\u914d\u7f6e\u7b56\u7565\u3002</div>\n                  </div>\n                </div>\n\n                <div class=\"two-column\" id=\"apiDetailRequestSection\">\n                  <div class=\"list-card\">\n                    <h4>\u8f93\u5165\u53c2\u6570\u6a21\u677f</h4>\n                    <div class=\"field\">\n                      <label for=\"apiRequestTemplate\">\u5e73\u53f0\u6807\u51c6\u8f93\u5165\u53c2\u6570\u6a21\u677f</label>\n                      <textarea id=\"apiRequestTemplate\"></textarea>\n                    </div>\n                    <div class=\"field\">\n                      <label for=\"apiRequestScript\">\u8f93\u5165\u53c2\u6570\u534f\u8bae\u8f6c\u6362\u811a\u672c</label>\n                      <textarea id=\"apiRequestScript\"></textarea>\n                    </div>\n                    <div class=\"field\">\n                      <label for=\"apiPartnerRequestTemplate\">\u7b2c\u4e09\u65b9API\u8c03\u7528\u53c2\u6570\u6a21\u7248</label>\n                      <textarea id=\"apiPartnerRequestTemplate\"></textarea>\n                    </div>\n                    <div class=\"action-row\">\n                      <button type=\"button\" class=\"button brand\" id=\"runRequestScript\">\u8fd0\u884c\u811a\u672c</button>\n                    </div>\n                  </div>\n                  <div class=\"mini-panel\">\n                    <h4>\u8c03\u7528\u53c2\u6570\u8f93\u51fa</h4>\n                    <pre class=\"detail-code\" id=\"apiRequestOutput\">\u70b9\u51fb\u201c\u8fd0\u884c\u811a\u672c\u201d\u540e\u8f93\u51fa\u5b9e\u9645\u8c03\u7528\u53c2\u6570\u3002</pre>\n                  </div>\n                </div>\n\n                <div class=\"two-column\" id=\"apiDetailResponseSection\">\n                  <div class=\"list-card\">\n                    <h4>\u8fd4\u56de\u6570\u636e\u6a21\u677f</h4>\n                    <div class=\"field\">\n                      <label for=\"apiResponseTemplate\">\u7b2c\u4e09\u65b9\u8fd4\u56de\u6570\u636e\u6a21\u677f</label>\n                      <textarea id=\"apiResponseTemplate\"></textarea>\n                    </div>\n                    <div class=\"field\">\n                      <label for=\"apiResponseScript\">\u8fd4\u56de\u6570\u636e\u534f\u8bae\u8f6c\u6362\u811a\u672c</label>\n                      <textarea id=\"apiResponseScript\"></textarea>\n                    </div>\n                    <div class=\"field\">\n                      <label for=\"apiStandardResponseTemplate\">\u5e73\u53f0\u6807\u51c6\u54cd\u5e94\u6a21\u7248</label>\n                      <textarea id=\"apiStandardResponseTemplate\"></textarea>\n                    </div>\n                    <div class=\"action-row\">\n                      <button type=\"button\" class=\"button brand\" id=\"runResponseDebug\">\u70b9\u51fb\u8c03\u8bd5</button>\n                      <button type=\"button\" class=\"button secondary\" id=\"simulateResponseError\">\u6a21\u62df\u8fd4\u56de\u5f02\u5e38</button>\n                    </div>\n                  </div>\n                  <div class=\"mini-panel\">\n                    <h4>\u6807\u51c6\u8fd4\u56de\u8f93\u51fa</h4>\n                    <div id=\"apiResponseStatusBox\" class=\"result-box pass\" style=\"display:none;\"></div>\n                    <pre class=\"detail-code\" id=\"apiResponseOutput\">\u70b9\u51fb\u201c\u8c03\u8bd5\u201d\u540e\u8f93\u51fa\u5e73\u53f0\u6240\u9700\u6807\u51c6\u8fd4\u56de\u683c\u5f0f\u3002</pre>\n                  </div>\n                </div>\n\n                <div class=\"list-card\">\n                  <div class=\"panel-header\">\n                    <div>\n                      <h4>\u9875\u9762\u64cd\u4f5c</h4>\n                      <p class=\"section-copy\">\u4fdd\u5b58\u8bbe\u8ba1\u3001\u6267\u884c\u8fde\u901a\u6027\u9a8c\u8bc1\u3001\u67e5\u770b\u8c03\u7528\u8bb0\u5f55\u4e0e\u6574\u4f53\u8c03\u8bd5\u7edf\u4e00\u653e\u5728\u9875\u9762\u5c3e\u90e8\u3002</p>\n                    </div>\n                  </div>\n                  <div class=\"action-row\">\n                    <button type=\"button\" class=\"button secondary\" id=\"saveApiDetail\">\u4fdd\u5b58 API \u8bbe\u8ba1</button>\n                    <button type=\"button\" class=\"button secondary\" id=\"testApiConnectivity\">\u6d4b\u8bd5 API \u8fde\u901a\u6027</button>\n                    <button type=\"button\" class=\"button secondary\" id=\"viewApiRecords\">\u67e5\u770b\u8c03\u7528\u8bb0\u5f55</button>\n                    <button type=\"button\" class=\"button brand\" id=\"runOverallDebug\">\u6574\u4f53\u8c03\u8bd5</button>\n                  </div>\n                </div>\n              </div>\n            </section>\n\n            <section class=\"screen\" id=\"screen-mapping\">\n              <div class=\"panel\">\n                <div class=\"panel-header\">\n                  <div>\n                    <h2>\u6570\u636e\u6620\u5c04\u4e2d\u5fc3</h2>\n                  </div>\n                  <div class=\"action-row\">\n                    <span class=\"chip\" id=\"mappingVersionChip\">\u5f53\u524d\u53d1\u5e03\u7248\u672c\uff1av2.3</span>\n                    <span class=\"chip\" id=\"mappingSidebarLocation\">\u5f53\u524d\u6a21\u5757\uff1a\u5185\u90e8\u6a21\u578b\u7ba1\u7406</span>\n                  </div>\n                </div>\n\n                <div class=\"tab-panel active\" id=\"mapping-model-center\">\n                  <div class=\"tab-row\" data-tab-group=\"mapping-model-tabs\">\n                    <button type=\"button\" class=\"tab-button active\" data-group=\"mapping-model-tabs\" data-target=\"mapping-model-station\">\u7535\u7ad9\u6a21\u578b</button>\n                    <button type=\"button\" class=\"tab-button\" data-group=\"mapping-model-tabs\" data-target=\"mapping-model-device\">\u8bbe\u5907\u6a21\u578b</button>\n                    <button type=\"button\" class=\"tab-button\" data-group=\"mapping-model-tabs\" data-target=\"mapping-model-point\">\u70b9\u4f4d\u6a21\u578b</button>\n                    <button type=\"button\" class=\"tab-button\" data-group=\"mapping-model-tabs\" data-target=\"mapping-model-control\">\u63a7\u5236\u6307\u4ee4\u6a21\u578b</button>\n                    <button type=\"button\" class=\"tab-button\" data-group=\"mapping-model-tabs\" data-target=\"mapping-model-version\">\u7248\u672c\u7ba1\u7406</button>\n                  </div>\n\n                  <div class=\"tab-panel active\" id=\"mapping-model-station\">\n                    <div class=\"list-card\">\n                      <div class=\"panel-header\">\n                        <div>\n                          <h4>\u7535\u7ad9\u6a21\u578b\u5b57\u6bb5\u7ba1\u7406</h4>\n                        </div>\n                        <div class=\"action-row\">\n                          <span class=\"chip\">\u5b57\u6bb5\u6a21\u578b</span>\n                          <button type=\"button\" class=\"button secondary\" id=\"openStationModelCreate\">\u65b0\u589e</button>\n                        </div>\n                      </div>\n                      <div class=\"table-shell\">\n                        <table>\n                          <thead>\n                            <tr>\n                              <th>\u5b57\u6bb5\u540d\u79f0</th>\n                              <th>\u5b57\u6bb5\u7f16\u7801</th>\n                              <th>\u5b57\u6bb5\u7c7b\u578b</th>\n                              <th>\u5355\u4f4d</th>\n                              <th>\u5b57\u6bb5\u8bf4\u660e</th>\n                            </tr>\n                          </thead>\n                          <tbody id=\"internalStationModelBody\"></tbody>\n                        </table>\n                      </div>\n                    </div>\n                  </div>\n\n                  <div class=\"tab-panel\" id=\"mapping-model-device\">\n                    <div class=\"list-card\">\n                      <div class=\"panel-header\">\n                        <div>\n                          <h4>\u8bbe\u5907\u6a21\u578b\u5b57\u6bb5\u7ba1\u7406</h4>\n                        </div>\n                        <div class=\"action-row\">\n                          <span class=\"chip\">\u5b57\u6bb5\u6a21\u578b</span>\n                          <button type=\"button\" class=\"button secondary\" id=\"openDeviceModelCreate\">\u65b0\u589e</button>\n                        </div>\n                      </div>\n                      <div class=\"table-shell\">\n                        <table>\n                          <thead>\n                            <tr>\n                              <th>\u5b57\u6bb5\u540d\u79f0</th>\n                              <th>\u5b57\u6bb5\u7f16\u7801</th>\n                              <th>\u5b57\u6bb5\u7c7b\u578b</th>\n                              <th>\u5355\u4f4d</th>\n                              <th>\u5b57\u6bb5\u8bf4\u660e</th>\n                            </tr>\n                          </thead>\n                          <tbody id=\"internalDeviceModelBody\"></tbody>\n                        </table>\n                      </div>\n                    </div>\n                  </div>\n\n                  <div class=\"tab-panel\" id=\"mapping-model-point\">\n                    <div class=\"list-card\">\n                      <div class=\"panel-header\">\n                        <div>\n                          <h4>\u70b9\u4f4d\u6a21\u578b\u5b57\u6bb5\u7ba1\u7406</h4>\n                        </div>\n                        <div class=\"action-row\">\n                          <span class=\"chip\">\u5b57\u6bb5\u6a21\u578b</span>\n                          <button type=\"button\" class=\"button secondary\" id=\"openPointModelCreate\">\u65b0\u589e</button>\n                        </div>\n                      </div>\n                      <div class=\"table-shell\">\n                        <table>\n                          <thead>\n                            <tr>\n                              <th>\u5b57\u6bb5\u540d\u79f0</th>\n                              <th>\u5b57\u6bb5\u7f16\u7801</th>\n                              <th>\u5b57\u6bb5\u7c7b\u578b</th>\n                              <th>\u5355\u4f4d</th>\n                              <th>\u8bfb\u5199\u5c5e\u6027</th>\n                              <th>\u5b57\u6bb5\u8bf4\u660e</th>\n                            </tr>\n                          </thead>\n                          <tbody id=\"internalPointModelBody\"></tbody>\n                        </table>\n                      </div>\n                    </div>\n                  </div>\n\n                  <div class=\"tab-panel\" id=\"mapping-model-control\">\n                    <div class=\"list-card\">\n                      <div class=\"panel-header\">\n                        <div>\n                          <h4>\u63a7\u5236\u6307\u4ee4\u6a21\u578b</h4>\n                        </div>\n                        <div class=\"action-row\">\n                          <span class=\"chip\">\u5b57\u6bb5\u6a21\u578b</span>\n                          <button type=\"button\" class=\"button secondary\" id=\"openControlModelCreate\">\u65b0\u589e</button>\n                        </div>\n                      </div>\n                      <div class=\"table-shell\">\n                        <table>\n                          <thead>\n                            <tr>\n                              <th>\u63a7\u5236\u540d\u79f0</th>\n                              <th>\u63a7\u5236\u7f16\u7801</th>\n                              <th>\u63a7\u5236\u8f93\u5165\u53c2\u6570</th>\n                              <th>\u63a7\u5236\u8f93\u51fa\u53c2\u6570</th>\n                            </tr>\n                          </thead>\n                          <tbody id=\"internalControlModelBody\"></tbody>\n                        </table>\n                      </div>\n                    </div>\n                  </div>\n\n                  <div class=\"tab-panel\" id=\"mapping-model-version\">\n                    <div class=\"list-card\" id=\"mappingVersionListView\">\n                      <div class=\"panel-header\">\n                        <div>\n                          <h4>\u7248\u672c\u5217\u8868</h4>\n                        </div>\n                        <div class=\"action-row\">\n                          <span class=\"chip\" id=\"mappingVersionRecordCount\">0 \u6761\u8bb0\u5f55</span>\n                          <button type=\"button\" class=\"button secondary\" id=\"openMappingVersionCreate\">\u65b0\u589e</button>\n                        </div>\n                      </div>\n                      <div class=\"table-shell\">\n                        <table>\n                          <thead>\n                            <tr>\n                              <th>\u7248\u672c\u53f7</th>\n                              <th>\u72b6\u6001</th>\n                              <th>\u7248\u672c\u8bf4\u660e</th>\n                              <th>\u53d1\u5e03\u65f6\u95f4</th>\n                              <th>\u64cd\u4f5c</th>\n                            </tr>\n                          </thead>\n                          <tbody id=\"mappingVersionHistoryBody\"></tbody>\n                        </table>\n                      </div>\n                    </div>\n\n                    <div class=\"list-card\" id=\"mappingVersionDetailView\" style=\"display:none;\">\n                      <div class=\"panel-header\">\n                        <div>\n                          <h4>\u7248\u672c\u8be6\u60c5</h4>\n                        </div>\n                        <div class=\"action-row\">\n                          <span class=\"chip\" id=\"mappingVersionDetailBadge\">\u5f53\u524d\u7248\u672c\uff1a-</span>\n                          <button type=\"button\" class=\"button secondary\" id=\"backToMappingVersionList\">\u8fd4\u56de\u5217\u8868</button>\n                        </div>\n                      </div>\n                      <div class=\"line-list\" id=\"mappingVersionDetailMeta\"></div>\n                      <div class=\"tab-row\" data-tab-group=\"mapping-version-detail-tabs\">\n                        <button type=\"button\" class=\"tab-button active\" data-group=\"mapping-version-detail-tabs\" data-target=\"mapping-version-station\">\u7535\u7ad9\u6a21\u578b</button>\n                        <button type=\"button\" class=\"tab-button\" data-group=\"mapping-version-detail-tabs\" data-target=\"mapping-version-device\">\u8bbe\u5907\u6a21\u578b</button>\n                        <button type=\"button\" class=\"tab-button\" data-group=\"mapping-version-detail-tabs\" data-target=\"mapping-version-point\">\u70b9\u4f4d\u6a21\u578b</button>\n                        <button type=\"button\" class=\"tab-button\" data-group=\"mapping-version-detail-tabs\" data-target=\"mapping-version-control\">\u63a7\u5236\u6307\u4ee4\u6a21\u578b</button>\n                      </div>\n\n                      <div class=\"tab-panel active\" id=\"mapping-version-station\">\n                        <div class=\"table-shell\">\n                          <table>\n                            <thead>\n                              <tr>\n                                <th>\u5b57\u6bb5\u540d\u79f0</th>\n                                <th>\u5b57\u6bb5\u7f16\u7801</th>\n                                <th>\u5b57\u6bb5\u7c7b\u578b</th>\n                                <th>\u5355\u4f4d</th>\n                                <th>\u5b57\u6bb5\u8bf4\u660e</th>\n                              </tr>\n                            </thead>\n                            <tbody id=\"mappingVersionStationBody\"></tbody>\n                          </table>\n                        </div>\n                      </div>\n\n                      <div class=\"tab-panel\" id=\"mapping-version-device\">\n                        <div class=\"table-shell\">\n                          <table>\n                            <thead>\n                              <tr>\n                                <th>\u5b57\u6bb5\u540d\u79f0</th>\n                                <th>\u5b57\u6bb5\u7f16\u7801</th>\n                                <th>\u5b57\u6bb5\u7c7b\u578b</th>\n                                <th>\u5355\u4f4d</th>\n                                <th>\u5b57\u6bb5\u8bf4\u660e</th>\n                              </tr>\n                            </thead>\n                            <tbody id=\"mappingVersionDeviceBody\"></tbody>\n                          </table>\n                        </div>\n                      </div>\n\n                      <div class=\"tab-panel\" id=\"mapping-version-point\">\n                        <div class=\"table-shell\">\n                          <table>\n                            <thead>\n                              <tr>\n                                <th>\u5b57\u6bb5\u540d\u79f0</th>\n                                <th>\u5b57\u6bb5\u7f16\u7801</th>\n                                <th>\u5b57\u6bb5\u7c7b\u578b</th>\n                                <th>\u5355\u4f4d</th>\n                                <th>\u8bfb\u5199\u5c5e\u6027</th>\n                                <th>\u5b57\u6bb5\u8bf4\u660e</th>\n                              </tr>\n                            </thead>\n                            <tbody id=\"mappingVersionPointBody\"></tbody>\n                          </table>\n                        </div>\n                      </div>\n\n                      <div class=\"tab-panel\" id=\"mapping-version-control\">\n                        <div class=\"table-shell\">\n                          <table>\n                            <thead>\n                              <tr>\n                                <th>\u63a7\u5236\u540d\u79f0</th>\n                                <th>\u63a7\u5236\u7f16\u7801</th>\n                                <th>\u63a7\u5236\u8f93\u5165\u53c2\u6570</th>\n                                <th>\u63a7\u5236\u8f93\u51fa\u53c2\u6570</th>\n                              </tr>\n                            </thead>\n                            <tbody id=\"mappingVersionControlBody\"></tbody>\n                          </table>\n                        </div>\n                      </div>\n                    </div>\n                  </div>\n                </div>\n\n                <div class=\"tab-panel\" id=\"mapping-rule-center\">\n                  <div class=\"filter-bar\" style=\"grid-template-columns: minmax(220px, 320px) auto;\">\n                    <div class=\"field\">\n                      <label for=\"mappingRulePlatformSelect\">\u63a5\u5165\u5e73\u53f0</label>\n                      <select id=\"mappingRulePlatformSelect\"></select>\n                    </div>\n                    <span class=\"chip\" id=\"mappingRulePlatformBadge\">\u5f53\u524d\u5e73\u53f0\uff1a-</span>\n                  </div>\n                  <div class=\"tab-row\" data-tab-group=\"mapping-rule-tabs\">\n                    <button type=\"button\" class=\"tab-button active\" data-group=\"mapping-rule-tabs\" data-target=\"mapping-rule-unit\">\u5355\u4f4d\u8f6c\u6362\u89c4\u5219</button>\n                    <button type=\"button\" class=\"tab-button\" data-group=\"mapping-rule-tabs\" data-target=\"mapping-rule-timezone\">\u65f6\u533a\u8f6c\u6362\u89c4\u5219</button>\n                    <button type=\"button\" class=\"tab-button\" data-group=\"mapping-rule-tabs\" data-target=\"mapping-rule-status\">\u72b6\u6001\u7801\u8f6c\u6362\u89c4\u5219</button>\n                    <button type=\"button\" class=\"tab-button\" data-group=\"mapping-rule-tabs\" data-target=\"mapping-rule-aggregate\">\u6570\u636e\u805a\u5408\u8f6c\u6362\u89c4\u5219</button>\n                  </div>\n\n                  <div class=\"tab-panel active\" id=\"mapping-rule-unit\">\n                    <div class=\"list-card\">\n                      <div class=\"panel-header\">\n                        <div>\n                          <h4>\u5355\u4f4d\u8f6c\u6362\u89c4\u5219</h4>\n                        </div>\n                        <div class=\"action-row\">\n                          <span class=\"chip\" id=\"unitRuleCount\">0 \u6761\u89c4\u5219</span>\n                          <button type=\"button\" class=\"button secondary\" id=\"openUnitRuleCreate\">\u65b0\u589e</button>\n                        </div>\n                      </div>\n                      <div class=\"table-shell\">\n                        <table>\n                          <thead>\n                            <tr>\n                              <th>\u89c4\u5219\u540d\u79f0</th>\n                              <th>\u8f6c\u6362\u65b9\u5411\u7c7b\u578b</th>\n                              <th>\u539f\u59cb\u5355\u4f4d\u540d\u79f0</th>\n                              <th>\u539f\u59cb\u5355\u4f4d\u7f16\u7801</th>\n                              <th>\u76ee\u6807\u5355\u4f4d\u540d\u79f0</th>\n                              <th>\u76ee\u6807\u5355\u4f4d\u7f16\u7801</th>\n                              <th>\u8ba1\u7b97\u516c\u5f0f</th>\n                              <th>\u64cd\u4f5c</th>\n                            </tr>\n                          </thead>\n                          <tbody id=\"unitRuleBody\"></tbody>\n                        </table>\n                      </div>\n                    </div>\n                  </div>\n\n                  <div class=\"tab-panel\" id=\"mapping-rule-timezone\">\n                    <div class=\"list-card\">\n                      <div class=\"panel-header\">\n                        <div>\n                          <h4>\u65f6\u533a\u8f6c\u6362\u89c4\u5219</h4>\n                        </div>\n                        <div class=\"action-row\">\n                          <span class=\"chip\" id=\"timezoneRuleCount\">0 \u6761\u89c4\u5219</span>\n                          <button type=\"button\" class=\"button secondary\" id=\"openTimezoneRuleCreate\">\u65b0\u589e</button>\n                        </div>\n                      </div>\n                      <div class=\"table-shell\">\n                        <table>\n                          <thead>\n                            <tr>\n                              <th>\u89c4\u5219\u540d\u79f0</th>\n                              <th>\u8f6c\u6362\u65b9\u5411\u7c7b\u578b</th>\n                              <th>\u539f\u59cb\u65f6\u533a\u540d\u79f0</th>\n                              <th>\u539f\u59cb\u65f6\u533a\u7f16\u7801</th>\n                              <th>\u76ee\u6807\u65f6\u533a\u540d\u79f0</th>\n                              <th>\u76ee\u6807\u65f6\u533a\u7f16\u7801</th>\n                              <th>\u8f6c\u6362\u516c\u5f0f</th>\n                              <th>\u64cd\u4f5c</th>\n                            </tr>\n                          </thead>\n                          <tbody id=\"timezoneRuleBody\"></tbody>\n                        </table>\n                      </div>\n                    </div>\n                  </div>\n\n                  <div class=\"tab-panel\" id=\"mapping-rule-status\">\n                    <div class=\"list-card\">\n                      <div class=\"panel-header\">\n                        <div>\n                          <h4>\u72b6\u6001\u7801\u8f6c\u6362\u89c4\u5219</h4>\n                        </div>\n                        <div class=\"action-row\">\n                          <span class=\"chip\" id=\"statusRuleCount\">0 \u6761\u89c4\u5219</span>\n                          <button type=\"button\" class=\"button secondary\" id=\"openStatusRuleCreate\">\u65b0\u589e</button>\n                        </div>\n                      </div>\n                      <div class=\"table-shell\">\n                        <table>\n                          <thead>\n                            <tr>\n                              <th>\u89c4\u5219\u540d\u79f0</th>\n                              <th>\u8f6c\u6362\u65b9\u5411\u7c7b\u578b</th>\n                              <th>\u539f\u59cb\u5b57\u6bb5\u540d\u79f0</th>\n                              <th>\u539f\u59cb\u5b57\u6bb5\u7f16\u7801</th>\n                              <th>\u76ee\u6807\u5b57\u6bb5\u540d\u79f0</th>\n                              <th>\u76ee\u6807\u5b57\u6bb5\u7f16\u7801</th>\n                              <th>\u679a\u4e3e\u6620\u5c04</th>\n                              <th>\u64cd\u4f5c</th>\n                            </tr>\n                          </thead>\n                          <tbody id=\"statusRuleBody\"></tbody>\n                        </table>\n                      </div>\n                    </div>\n                  </div>\n\n                  <div class=\"tab-panel\" id=\"mapping-rule-aggregate\">\n                    <div class=\"list-card\">\n                      <div class=\"panel-header\">\n                        <div>\n                          <h4>\u6570\u636e\u805a\u5408\u8f6c\u6362\u89c4\u5219</h4>\n                        </div>\n                        <div class=\"action-row\">\n                          <span class=\"chip\" id=\"aggregateRuleCount\">0 \u6761\u89c4\u5219</span>\n                          <button type=\"button\" class=\"button secondary\" id=\"openAggregateRuleCreate\">\u65b0\u589e</button>\n                        </div>\n                      </div>\n                      <div class=\"table-shell\">\n                        <table>\n                          <thead>\n                            <tr>\n                              <th>\u89c4\u5219\u540d\u79f0</th>\n                              <th>\u8f6c\u6362\u65b9\u5411\u7c7b\u578b</th>\n                              <th>\u539f\u59cb\u5b57\u6bb5\u540d\u79f0</th>\n                              <th>\u539f\u59cb\u5b57\u6bb5\u7f16\u7801\u5217\u8868</th>\n                              <th>\u76ee\u6807\u5b57\u6bb5\u540d\u79f0</th>\n                              <th>\u76ee\u6807\u5b57\u6bb5\u7f16\u7801</th>\n                              <th>\u8f6c\u6362\u516c\u5f0f</th>\n                              <th>\u64cd\u4f5c</th>\n                            </tr>\n                          </thead>\n                          <tbody id=\"aggregateRuleBody\"></tbody>\n                        </table>\n                      </div>\n                    </div>\n                  </div>\n                </div>\n\n                <div class=\"tab-panel\" id=\"mapping-relation-center\">\n                  <div class=\"filter-bar\" style=\"grid-template-columns: minmax(220px, 320px) auto;\">\n                    <div class=\"field\">\n                      <label for=\"mappingRelationPlatformSelect\">\u63a5\u5165\u5e73\u53f0</label>\n                      <select id=\"mappingRelationPlatformSelect\"></select>\n                    </div>\n                    <span class=\"chip\" id=\"mappingRelationPlatformBadge\">\u5f53\u524d\u5e73\u53f0\uff1a-</span>\n                  </div>\n                  <div class=\"tab-row\" data-tab-group=\"mapping-relation-tabs\">\n                    <button type=\"button\" class=\"tab-button active\" data-group=\"mapping-relation-tabs\" data-target=\"mapping-station\">\u7535\u7ad9\u6a21\u578b\u6620\u5c04</button>\n                    <button type=\"button\" class=\"tab-button\" data-group=\"mapping-relation-tabs\" data-target=\"mapping-device\">\u8bbe\u5907\u6a21\u578b\u6620\u5c04</button>\n                    <button type=\"button\" class=\"tab-button\" data-group=\"mapping-relation-tabs\" data-target=\"mapping-point\">\u6570\u636e\u70b9\u4f4d\u6620\u5c04</button>\n                    <button type=\"button\" class=\"tab-button\" data-group=\"mapping-relation-tabs\" data-target=\"mapping-control\">\u63a7\u5236\u6307\u4ee4</button>\n                    <button type=\"button\" class=\"tab-button\" data-group=\"mapping-relation-tabs\" data-target=\"mapping-version\">\u6620\u5c04\u7248\u672c</button>\n                  </div>\n\n                  <div class=\"tab-panel active\" id=\"mapping-station\">\n                    <div class=\"list-card\">\n                      <div class=\"panel-header\">\n                        <div>\n                          <h4>\u7535\u7ad9\u6a21\u578b\u6620\u5c04</h4>\n                        </div>\n                        <div class=\"action-row\">\n                          <button type=\"button\" class=\"button ghost\" data-mapping-json-export=\"station\">\u5bfc\u51fa JSON</button>\n                          <button type=\"button\" class=\"button ghost\" data-mapping-json-import=\"station\">\u5bfc\u5165 JSON</button>\n                          <button type=\"button\" class=\"button secondary\" data-open-mapping-relation=\"station\">\u65b0\u589e\u6620\u5c04\u5173\u7cfb</button>\n                        </div>\n                      </div>\n                      <div class=\"table-shell\">\n                        <table>\n                          <thead>\n                            <tr>\n                              <th>\u5185\u90e8\u6a21\u578b\u5b57\u6bb5\u540d\u79f0</th>\n                              <th>\u5185\u90e8\u6a21\u578b\u5b57\u6bb5\u7f16\u7801</th>\n                              <th>\u5916\u90e8\u6a21\u578b\u5b57\u6bb5\u540d\u79f0</th>\n                              <th>\u5916\u90e8\u6a21\u578b\u5b57\u6bb5\u7f16\u7801</th>\n                              <th>\u8f6c\u6362\u89c4\u5219</th>\n                              <th>\u5173\u7cfb</th>\n                              <th>\u64cd\u4f5c</th>\n                            </tr>\n                          </thead>\n                          <tbody id=\"stationMappingBody\"></tbody>\n                        </table>\n                      </div>\n                    </div>\n                    <div class=\"list-card\">\n                      <div class=\"panel-header\">\n                        <div>\n                          <h4>\u8c03\u8bd5\u7ba1\u7406</h4>\n                        </div>\n                        <div class=\"action-row\">\n                          <span class=\"chip\" id=\"stationMappingDebugBadge\">-</span>\n                          <button type=\"button\" class=\"button secondary\" data-mapping-debug-reset=\"station\">\u8f7d\u5165\u793a\u4f8b</button>\n                          <button type=\"button\" class=\"button brand\" data-mapping-debug-run=\"station\">\u8fd0\u884c\u8f6c\u6362</button>\n                        </div>\n                      </div>\n                      <div class=\"two-column\">\n                        <div class=\"field\">\n                          <label for=\"stationMappingDebugInput\">\u539f\u59cb\u6570\u636e\u6a21\u7248</label>\n                          <textarea id=\"stationMappingDebugInput\" data-mapping-debug-input=\"station\"></textarea>\n                        </div>\n                        <div class=\"mini-panel\">\n                          <h4>\u6620\u5c04\u7ed3\u679c</h4>\n                          <pre class=\"detail-code\" id=\"stationMappingDebugOutput\"></pre>\n                        </div>\n                      </div>\n                    </div>\n                  </div>\n\n                  <div class=\"tab-panel\" id=\"mapping-device\">\n                    <div class=\"list-card\">\n                      <div class=\"panel-header\">\n                        <div>\n                          <h4>\u8bbe\u5907\u6a21\u578b\u6620\u5c04</h4>\n                        </div>\n                        <div class=\"action-row\">\n                          <button type=\"button\" class=\"button ghost\" data-mapping-json-export=\"device\">\u5bfc\u51fa JSON</button>\n                          <button type=\"button\" class=\"button ghost\" data-mapping-json-import=\"device\">\u5bfc\u5165 JSON</button>\n                          <button type=\"button\" class=\"button secondary\" data-open-mapping-relation=\"device\">\u65b0\u589e\u6620\u5c04\u5173\u7cfb</button>\n                        </div>\n                      </div>\n                      <div class=\"table-shell\">\n                        <table>\n                          <thead>\n                            <tr>\n                              <th>\u5185\u90e8\u6a21\u578b\u5b57\u6bb5\u540d\u79f0</th>\n                              <th>\u5185\u90e8\u6a21\u578b\u5b57\u6bb5\u7f16\u7801</th>\n                              <th>\u5916\u90e8\u6a21\u578b\u5b57\u6bb5\u540d\u79f0</th>\n                              <th>\u5916\u90e8\u6a21\u578b\u5b57\u6bb5\u7f16\u7801</th>\n                              <th>\u8f6c\u6362\u89c4\u5219</th>\n                              <th>\u5173\u7cfb</th>\n                              <th>\u64cd\u4f5c</th>\n                            </tr>\n                          </thead>\n                          <tbody id=\"deviceMappingBody\"></tbody>\n                        </table>\n                      </div>\n                    </div>\n                    <div class=\"list-card\">\n                      <div class=\"panel-header\">\n                        <div>\n                          <h4>\u8c03\u8bd5\u7ba1\u7406</h4>\n                        </div>\n                        <div class=\"action-row\">\n                          <span class=\"chip\" id=\"deviceMappingDebugBadge\">-</span>\n                          <button type=\"button\" class=\"button secondary\" data-mapping-debug-reset=\"device\">\u8f7d\u5165\u793a\u4f8b</button>\n                          <button type=\"button\" class=\"button brand\" data-mapping-debug-run=\"device\">\u8fd0\u884c\u8f6c\u6362</button>\n                        </div>\n                      </div>\n                      <div class=\"two-column\">\n                        <div class=\"field\">\n                          <label for=\"deviceMappingDebugInput\">\u539f\u59cb\u6570\u636e\u6a21\u7248</label>\n                          <textarea id=\"deviceMappingDebugInput\" data-mapping-debug-input=\"device\"></textarea>\n                        </div>\n                        <div class=\"mini-panel\">\n                          <h4>\u6620\u5c04\u7ed3\u679c</h4>\n                          <pre class=\"detail-code\" id=\"deviceMappingDebugOutput\"></pre>\n                        </div>\n                      </div>\n                    </div>\n                  </div>\n\n                  <div class=\"tab-panel\" id=\"mapping-point\">\n                    <div class=\"list-card\">\n                      <div class=\"panel-header\">\n                        <div>\n                          <h4>\u6570\u636e\u70b9\u4f4d\u6620\u5c04</h4>\n                        </div>\n                        <div class=\"action-row\">\n                          <button type=\"button\" class=\"button ghost\" data-mapping-json-export=\"point\">\u5bfc\u51fa JSON</button>\n                          <button type=\"button\" class=\"button ghost\" data-mapping-json-import=\"point\">\u5bfc\u5165 JSON</button>\n                          <button type=\"button\" class=\"button secondary\" data-open-mapping-relation=\"point\">\u65b0\u589e\u6620\u5c04\u5173\u7cfb</button>\n                        </div>\n                      </div>\n                      <div class=\"table-shell\">\n                        <table>\n                          <thead>\n                            <tr>\n                              <th>\u5185\u90e8\u6a21\u578b\u5b57\u6bb5\u540d\u79f0</th>\n                              <th>\u5185\u90e8\u6a21\u578b\u5b57\u6bb5\u7f16\u7801</th>\n                              <th>\u5916\u90e8\u6a21\u578b\u5b57\u6bb5\u540d\u79f0</th>\n                              <th>\u5916\u90e8\u6a21\u578b\u5b57\u6bb5\u7f16\u7801</th>\n                              <th>\u4e00\u5bf9\u4e00\u8f6c\u6362\u89c4\u5219</th>\n                              <th>\u4e00\u5bf9\u591a\u805a\u5408\u89c4\u5219</th>\n                              <th>\u5173\u7cfb</th>\n                              <th>\u64cd\u4f5c</th>\n                            </tr>\n                          </thead>\n                          <tbody id=\"pointMappingBody\"></tbody>\n                        </table>\n                      </div>\n                    </div>\n                    <div class=\"list-card\">\n                      <div class=\"panel-header\">\n                        <div>\n                          <h4>\u8c03\u8bd5\u7ba1\u7406</h4>\n                        </div>\n                        <div class=\"action-row\">\n                          <span class=\"chip\" id=\"pointMappingDebugBadge\">-</span>\n                          <button type=\"button\" class=\"button secondary\" data-mapping-debug-reset=\"point\">\u8f7d\u5165\u793a\u4f8b</button>\n                          <button type=\"button\" class=\"button brand\" data-mapping-debug-run=\"point\">\u8fd0\u884c\u8f6c\u6362</button>\n                        </div>\n                      </div>\n                      <div class=\"two-column\">\n                        <div class=\"field\">\n                          <label for=\"pointMappingDebugInput\">\u539f\u59cb\u6570\u636e\u6a21\u7248</label>\n                          <textarea id=\"pointMappingDebugInput\" data-mapping-debug-input=\"point\"></textarea>\n                        </div>\n                        <div class=\"mini-panel\">\n                          <h4>\u6620\u5c04\u7ed3\u679c</h4>\n                          <pre class=\"detail-code\" id=\"pointMappingDebugOutput\"></pre>\n                        </div>\n                      </div>\n                    </div>\n                  </div>\n\n                  <div class=\"tab-panel\" id=\"mapping-control\">\n                    <div class=\"list-card\" id=\"controlMappingListView\">\n                      <div class=\"panel-header\">\n                        <div>\n                          <h4>\u63a7\u5236\u6307\u4ee4\u6620\u5c04\u5217\u8868</h4>\n                        </div>\n                        <div class=\"action-row\">\n                          <button type=\"button\" class=\"button ghost\" data-mapping-json-export=\"control\">\u5bfc\u51fa JSON</button>\n                          <button type=\"button\" class=\"button ghost\" data-mapping-json-import=\"control\">\u5bfc\u5165 JSON</button>\n                          <button type=\"button\" class=\"button secondary\" id=\"addControlMapping\">\u65b0\u589e\u63a7\u5236\u6620\u5c04</button>\n                        </div>\n                      </div>\n                      <div class=\"table-shell\">\n                        <table>\n                          <thead>\n                            <tr>\n                              <th>\u6620\u5c04\u540d\u79f0</th>\n                              <th>\u5185\u90e8\u63a7\u5236</th>\n                              <th>\u5916\u90e8\u63a7\u5236</th>\n                              <th>\u7ed1\u5b9a API</th>\n                              <th>\u72b6\u6001</th>\n                              <th>\u64cd\u4f5c</th>\n                            </tr>\n                          </thead>\n                          <tbody id=\"controlMappingTableBody\"></tbody>\n                        </table>\n                      </div>\n                    </div>\n\n                    <div class=\"list-card\" id=\"controlMappingDetailView\" style=\"display:none;\">\n                      <div class=\"panel-header\">\n                        <div>\n                          <h4>\u63a7\u5236\u6307\u4ee4\u6620\u5c04\u8be6\u60c5</h4>\n                        </div>\n                        <div class=\"action-row\">\n                          <span class=\"chip\" id=\"controlMappingBadge\">\u5f53\u524d\u6620\u5c04\uff1a-</span>\n                          <button type=\"button\" class=\"button ghost\" data-mapping-json-export=\"control\">\u5bfc\u51fa JSON</button>\n                          <button type=\"button\" class=\"button ghost\" data-mapping-json-import=\"control\">\u5bfc\u5165 JSON</button>\n                          <button type=\"button\" class=\"button secondary\" id=\"backToControlMappingList\">\u8fd4\u56de\u5217\u8868</button>\n                        </div>\n                      </div>\n                      <div class=\"line-list\" id=\"controlMappingMeta\"></div>\n                      <div class=\"form-grid\">\n                        <div class=\"field\">\n                          <label for=\"standardControlName\">\u5185\u90e8\u63a7\u5236\u540d\u79f0</label>\n                          <input id=\"standardControlName\" type=\"text\">\n                        </div>\n                        <div class=\"field\">\n                          <label for=\"standardControlCode\">\u5185\u90e8\u63a7\u5236\u7f16\u7801</label>\n                          <input id=\"standardControlCode\" type=\"text\">\n                        </div>\n                        <div class=\"field\">\n                          <label for=\"partnerControlName\">\u5916\u90e8\u63a7\u5236\u540d\u79f0</label>\n                          <input id=\"partnerControlName\" type=\"text\">\n                        </div>\n                        <div class=\"field\">\n                          <label for=\"partnerControlCode\">\u5916\u90e8\u63a7\u5236\u7f16\u7801</label>\n                          <input id=\"partnerControlCode\" type=\"text\">\n                        </div>\n                      </div>\n                      <div class=\"list-card\">\n                        <div class=\"panel-header\">\n                          <div>\n                            <h4>\u8f93\u5165\u53c2\u6570\u6620\u5c04</h4>\n                          </div>\n                          <button type=\"button\" class=\"button secondary\" id=\"addInputControlMappingRow\">\u65b0\u589e\u6620\u5c04</button>\n                        </div>\n                        <div class=\"table-shell\">\n                          <table>\n                            <thead>\n                              <tr>\n                                <th>\u5185\u90e8\u53c2\u6570\u540d</th>\n                                <th>\u5185\u90e8\u53c2\u6570\u7f16\u7801</th>\n                                <th>\u5185\u90e8\u53c2\u6570\u7c7b\u578b</th>\n                                <th>\u5185\u90e8\u53c2\u6570\u5355\u4f4d</th>\n                                <th>\u5916\u90e8\u53c2\u6570\u540d</th>\n                                <th>\u5916\u90e8\u53c2\u6570\u7f16\u7801</th>\n                                <th>\u5916\u90e8\u53c2\u6570\u7c7b\u578b</th>\n                                <th>\u5916\u90e8\u53c2\u6570\u5355\u4f4d</th>\n                              </tr>\n                            </thead>\n                            <tbody id=\"controlInputMappingBody\"></tbody>\n                          </table>\n                        </div>\n                      </div>\n                      <div class=\"list-card\">\n                        <div class=\"panel-header\">\n                          <div>\n                            <h4>\u8f93\u51fa\u53c2\u6570\u6620\u5c04</h4>\n                          </div>\n                          <button type=\"button\" class=\"button secondary\" id=\"addOutputControlMappingRow\">\u65b0\u589e\u6620\u5c04</button>\n                        </div>\n                        <div class=\"table-shell\">\n                          <table>\n                            <thead>\n                              <tr>\n                                <th>\u5185\u90e8\u53c2\u6570\u540d</th>\n                                <th>\u5185\u90e8\u53c2\u6570\u7f16\u7801</th>\n                                <th>\u5185\u90e8\u53c2\u6570\u7c7b\u578b</th>\n                                <th>\u5185\u90e8\u53c2\u6570\u5355\u4f4d</th>\n                                <th>\u5916\u90e8\u53c2\u6570\u540d</th>\n                                <th>\u5916\u90e8\u53c2\u6570\u7f16\u7801</th>\n                                <th>\u5916\u90e8\u53c2\u6570\u7c7b\u578b</th>\n                                <th>\u5916\u90e8\u53c2\u6570\u5355\u4f4d</th>\n                              </tr>\n                            </thead>\n                            <tbody id=\"controlOutputMappingBody\"></tbody>\n                          </table>\n                        </div>\n                      </div>\n                      <div class=\"action-row\">\n                        <button type=\"button\" class=\"button secondary\" id=\"saveControlMapping\">\u4fdd\u5b58\u63a7\u5236\u6620\u5c04</button>\n                        <button type=\"button\" class=\"button brand\" id=\"openControlMappingDiff\">\u67e5\u770b\u6620\u5c04\u5bf9\u7167</button>\n                      </div>\n                    </div>\n                    <div class=\"list-card\">\n                      <div class=\"panel-header\">\n                        <div>\n                          <h4>\u8c03\u8bd5\u7ba1\u7406</h4>\n                        </div>\n                        <div class=\"action-row\">\n                          <span class=\"chip\" id=\"controlMappingDebugBadge\">-</span>\n                          <button type=\"button\" class=\"button secondary\" data-mapping-debug-reset=\"control\">\u8f7d\u5165\u793a\u4f8b</button>\n                          <button type=\"button\" class=\"button brand\" data-mapping-debug-run=\"control\">\u8fd0\u884c\u8f6c\u6362</button>\n                        </div>\n                      </div>\n                      <div class=\"two-column\">\n                        <div class=\"field\">\n                          <label for=\"controlMappingDebugInput\">\u539f\u59cb\u6570\u636e\u6a21\u7248</label>\n                          <textarea id=\"controlMappingDebugInput\" data-mapping-debug-input=\"control\"></textarea>\n                        </div>\n                        <div class=\"mini-panel\">\n                          <h4>\u6620\u5c04\u7ed3\u679c</h4>\n                          <pre class=\"detail-code\" id=\"controlMappingDebugOutput\"></pre>\n                        </div>\n                      </div>\n                    </div>\n                  </div>\n\n                  <div class=\"tab-panel\" id=\"mapping-version\">\n                    <div class=\"list-card\" id=\"mappingRelationVersionListView\">\n                      <div class=\"panel-header\">\n                        <div>\n                          <h4>\u6620\u5c04\u7248\u672c\u5217\u8868</h4>\n                        </div>\n                        <div class=\"action-row\">\n                          <span class=\"chip\" id=\"mappingRelationVersionCount\">0 \u6761\u8bb0\u5f55</span>\n                          <button type=\"button\" class=\"button ghost\" data-mapping-json-export=\"version\">\u5bfc\u51fa JSON</button>\n                          <button type=\"button\" class=\"button ghost\" data-mapping-json-import=\"version\">\u5bfc\u5165 JSON</button>\n                        </div>\n                      </div>\n                      <div class=\"table-shell\">\n                        <table>\n                          <thead>\n                            <tr>\n                              <th>\u7248\u672c\u53f7</th>\n                              <th>\u7248\u672c\u521b\u5efa\u4eba</th>\n                              <th>\u7248\u672c\u72b6\u6001</th>\n                              <th>\u64cd\u4f5c</th>\n                            </tr>\n                          </thead>\n                          <tbody id=\"mappingRelationVersionBody\"></tbody>\n                        </table>\n                      </div>\n                    </div>\n\n                    <div class=\"list-card\" id=\"mappingRelationVersionDetailView\" style=\"display:none;\">\n                      <div class=\"panel-header\">\n                        <div>\n                          <h4>\u6620\u5c04\u7248\u672c\u8be6\u60c5</h4>\n                        </div>\n                        <div class=\"action-row\">\n                          <span class=\"chip\" id=\"mappingRelationVersionBadge\">\u5f53\u524d\u7248\u672c\uff1a-</span>\n                          <button type=\"button\" class=\"button ghost\" data-mapping-json-export=\"version\">\u5bfc\u51fa JSON</button>\n                          <button type=\"button\" class=\"button ghost\" data-mapping-json-import=\"version\">\u5bfc\u5165 JSON</button>\n                          <button type=\"button\" class=\"button secondary\" id=\"backToMappingRelationVersionList\">\u8fd4\u56de\u5217\u8868</button>\n                        </div>\n                      </div>\n                      <div class=\"line-list\" id=\"mappingRelationVersionMeta\"></div>\n                      <div class=\"tab-row\" data-tab-group=\"mapping-relation-version-tabs\">\n                        <button type=\"button\" class=\"tab-button active\" data-group=\"mapping-relation-version-tabs\" data-target=\"mapping-relation-version-station\">\u7535\u7ad9\u6620\u5c04</button>\n                        <button type=\"button\" class=\"tab-button\" data-group=\"mapping-relation-version-tabs\" data-target=\"mapping-relation-version-device\">\u8bbe\u5907\u6620\u5c04</button>\n                        <button type=\"button\" class=\"tab-button\" data-group=\"mapping-relation-version-tabs\" data-target=\"mapping-relation-version-point\">\u70b9\u4f4d\u6620\u5c04</button>\n                        <button type=\"button\" class=\"tab-button\" data-group=\"mapping-relation-version-tabs\" data-target=\"mapping-relation-version-control\">\u63a7\u5236\u6307\u4ee4\u6620\u5c04</button>\n                      </div>\n\n                      <div class=\"tab-panel active\" id=\"mapping-relation-version-station\">\n                        <div class=\"table-shell\">\n                          <table>\n                            <thead>\n                              <tr>\n                                <th>\u5185\u90e8\u6a21\u578b\u5b57\u6bb5\u540d\u79f0</th>\n                                <th>\u5185\u90e8\u6a21\u578b\u5b57\u6bb5\u7f16\u7801</th>\n                                <th>\u5916\u90e8\u6a21\u578b\u5b57\u6bb5\u540d\u79f0</th>\n                                <th>\u5916\u90e8\u6a21\u578b\u5b57\u6bb5\u7f16\u7801</th>\n                                <th>\u8f6c\u6362\u89c4\u5219</th>\n                                <th>\u5173\u7cfb</th>\n                              </tr>\n                            </thead>\n                            <tbody id=\"mappingRelationVersionStationBody\"></tbody>\n                          </table>\n                        </div>\n                      </div>\n\n                      <div class=\"tab-panel\" id=\"mapping-relation-version-device\">\n                        <div class=\"table-shell\">\n                          <table>\n                            <thead>\n                              <tr>\n                                <th>\u5185\u90e8\u6a21\u578b\u5b57\u6bb5\u540d\u79f0</th>\n                                <th>\u5185\u90e8\u6a21\u578b\u5b57\u6bb5\u7f16\u7801</th>\n                                <th>\u5916\u90e8\u6a21\u578b\u5b57\u6bb5\u540d\u79f0</th>\n                                <th>\u5916\u90e8\u6a21\u578b\u5b57\u6bb5\u7f16\u7801</th>\n                                <th>\u8f6c\u6362\u89c4\u5219</th>\n                                <th>\u5173\u7cfb</th>\n                              </tr>\n                            </thead>\n                            <tbody id=\"mappingRelationVersionDeviceBody\"></tbody>\n                          </table>\n                        </div>\n                      </div>\n\n                      <div class=\"tab-panel\" id=\"mapping-relation-version-point\">\n                        <div class=\"table-shell\">\n                          <table>\n                            <thead>\n                              <tr>\n                                <th>\u5185\u90e8\u6a21\u578b\u5b57\u6bb5\u540d\u79f0</th>\n                                <th>\u5185\u90e8\u6a21\u578b\u5b57\u6bb5\u7f16\u7801</th>\n                                <th>\u5916\u90e8\u6a21\u578b\u5b57\u6bb5\u540d\u79f0</th>\n                                <th>\u5916\u90e8\u6a21\u578b\u5b57\u6bb5\u7f16\u7801</th>\n                                <th>\u4e00\u5bf9\u4e00\u8f6c\u6362\u89c4\u5219</th>\n                                <th>\u4e00\u5bf9\u591a\u805a\u5408\u89c4\u5219</th>\n                                <th>\u5173\u7cfb</th>\n                              </tr>\n                            </thead>\n                            <tbody id=\"mappingRelationVersionPointBody\"></tbody>\n                          </table>\n                        </div>\n                      </div>\n\n                      <div class=\"tab-panel\" id=\"mapping-relation-version-control\">\n                        <div class=\"table-shell\">\n                          <table>\n                            <thead>\n                              <tr>\n                                <th>\u6620\u5c04\u540d\u79f0</th>\n                                <th>\u5185\u90e8\u63a7\u5236</th>\n                                <th>\u5916\u90e8\u63a7\u5236</th>\n                                <th>\u7ed1\u5b9a API</th>\n                                <th>\u8f93\u5165\u6620\u5c04</th>\n                                <th>\u8f93\u51fa\u6620\u5c04</th>\n                                <th>\u72b6\u6001</th>\n                              </tr>\n                            </thead>\n                            <tbody id=\"mappingRelationVersionControlBody\"></tbody>\n                          </table>\n                        </div>\n                      </div>\n                    </div>\n                  </div>\n                </div>\n              </div>\n            </section>\n\n            <section class=\"screen\" id=\"screen-protocol\">\n              <div class=\"panel\">\n                <div class=\"panel-header\">\n                  <div>\n                    <h2>API \u534f\u8bae\u8f6c\u6362\u4e2d\u5fc3</h2>\n                    <p class=\"section-copy\">\u534f\u8bae\u914d\u7f6e\u6309 API \u7ef4\u5ea6\u7ba1\u7406\u3002\u534f\u8bae\u8f6c\u6362\u76d1\u63a7\u5df2\u8fc1\u5165\u8fd0\u884c\u76d1\u63a7\u4e2d\u5fc3\uff0c\u8f6c\u6362\u65e5\u5fd7\u5df2\u8fc1\u5165\u65e5\u5fd7\u5ba1\u8ba1\u4e2d\u5fc3 &gt; \u8f6c\u6362\u65e5\u5fd7\u3002</p>\n                  </div>\n                  <div class=\"action-row\">\n                    <button type=\"button\" class=\"button secondary\" id=\"openCurrentApiDetail\">\u6253\u5f00\u5f53\u524d API \u8be6\u60c5</button>\n                    <button type=\"button\" class=\"button brand\" id=\"openProtocolLog\">\u67e5\u770b\u8f6c\u6362\u65e5\u5fd7</button>\n                  </div>\n                </div>\n                <div class=\"grid-2-1\">\n                  <div class=\"list-card\">\n                    <h4>\u5f53\u524d API</h4>\n                    <div class=\"form-grid\">\n                      <div class=\"field\">\n                        <label for=\"protocolPlatformName\">\u5e73\u53f0</label>\n                        <input id=\"protocolPlatformName\" type=\"text\" value=\"\" disabled>\n                      </div>\n                      <div class=\"field\">\n                        <label for=\"protocolApiSelect\">API</label>\n                        <select id=\"protocolApiSelect\"></select>\n                      </div>\n                    </div>\n                    <div class=\"line-list\" id=\"protocolApiMeta\"></div>\n                  </div>\n                  <div class=\"mini-panel\">\n                    <h4>API \u7ef4\u5ea6\u5904\u7406\u94fe\u8def</h4>\n                    <div class=\"timeline\">\n                      <div class=\"timeline-item\">\u521b\u5efa API \u5e76\u5b9a\u4e49\u57fa\u7840\u4fe1\u606f</div>\n                      <div class=\"timeline-item\">\u914d\u7f6e\u8c03\u7528\u5165\u53c2\u8f6c\u6362\uff1a\u6807\u51c6\u53c2\u6570 -&gt; \u7b2c\u4e09\u65b9\u53c2\u6570</div>\n                      <div class=\"timeline-item\">\u914d\u7f6e\u8c03\u7528\u8fd4\u56de\u8f6c\u6362\uff1a\u7b2c\u4e09\u65b9\u8fd4\u56de -&gt; \u6807\u51c6\u8fd4\u56de</div>\n                      <div class=\"timeline-item\">\u8fd0\u884c\u6001\u76d1\u63a7\u548c\u8f6c\u6362\u65e5\u5fd7\u4ece\u4e2d\u5fc3\u9875\u5206\u79bb\uff0c\u5206\u522b\u8fdb\u5165\u76d1\u63a7\u4e0e\u65e5\u5fd7\u83dc\u5355\u67e5\u770b</div>\n                    </div>\n                  </div>\n                </div>\n                <div class=\"tab-row\" data-tab-group=\"protocol-tabs\">\n                  <button type=\"button\" class=\"tab-button active\" data-group=\"protocol-tabs\" data-target=\"protocol-overview\">API \u6982\u89c8</button>\n                </div>\n\n                <div class=\"tab-panel active\" id=\"protocol-overview\">\n                  <div class=\"grid-2-1\">\n                    <div class=\"list-card\">\n                      <h4>API \u914d\u7f6e\u6982\u89c8</h4>\n                      <div class=\"line-list\" id=\"protocolOverviewInfo\"></div>\n                    </div>\n                    <div class=\"mini-panel\">\n                      <h4>\u8bbe\u8ba1\u7ea6\u675f</h4>\n                      <div class=\"panel-note\" id=\"protocolOverviewNote\">\u534f\u8bae\u8f6c\u6362\u548c\u8c03\u8bd5\u5168\u90e8\u7ed1\u5b9a\u5728\u5355\u4e2a API \u4e0a\uff0c\u907f\u514d\u5e73\u53f0\u7ea7\u914d\u7f6e\u65e0\u6cd5\u7cbe\u786e\u5b9a\u4f4d\u5165\u53c2\u3001\u8fd4\u56de\u548c\u95ee\u9898\u65e5\u5fd7\u3002</div>\n                    </div>\n                  </div>\n                </div>\n              </div>\n            </section>\n\n            <section class=\"screen\" id=\"screen-monitoring\">\n              <div class=\"panel\">\n                <div class=\"panel-header\">\n                  <div>\n                    <h2>\u8fd0\u884c\u76d1\u63a7\u4e2d\u5fc3</h2>\n                    <p class=\"section-copy\">\u5b9e\u65f6\u67e5\u770b\u5e73\u53f0\u8fd0\u884c\u72b6\u6001\u3001\u540c\u6b65\u8d28\u91cf\u3001\u63a5\u53e3\u8c03\u7528\u7a33\u5b9a\u6027\u3001\u6d41\u91cf\u6d88\u8017\u548c\u54cd\u5e94\u65f6\u95f4\u5206\u5e03\u3002</p>\n                  </div>\n                  <div class=\"tab-row\" data-tab-group=\"monitor-tabs\">\n                    <button type=\"button\" class=\"tab-button active\" data-group=\"monitor-tabs\" data-target=\"monitor-sync\">\u540c\u6b65\u76d1\u63a7</button>\n                    <button type=\"button\" class=\"tab-button\" data-group=\"monitor-tabs\" data-target=\"monitor-api\">\u63a5\u53e3\u8c03\u7528</button>\n                    <button type=\"button\" class=\"tab-button\" data-group=\"monitor-tabs\" data-target=\"monitor-response\">\u54cd\u5e94\u76d1\u63a7</button>\n                    <button type=\"button\" class=\"tab-button\" data-group=\"monitor-tabs\" data-target=\"monitor-protocol\">\u534f\u8bae\u8f6c\u6362\u76d1\u63a7</button>\n                    <button type=\"button\" class=\"tab-button\" data-group=\"monitor-tabs\" data-target=\"monitor-flow\">\u6d41\u91cf</button>\n                    <button type=\"button\" class=\"tab-button\" data-group=\"monitor-tabs\" data-target=\"monitor-alert-stats\">\u544a\u8b66\u7edf\u8ba1</button>\n                  </div>\n                </div>\n\n                <div class=\"tab-panel active\" id=\"monitor-sync\">\n                  <div class=\"sync-monitor-shell\">\n                    <div class=\"sync-filter-bar flow-blue-card\">\n                      <div class=\"field\">\n                        <label for=\"syncMonitorPlatformFilter\">\u5916\u90e8\u5e73\u53f0</label>\n                        <select id=\"syncMonitorPlatformFilter\"></select>\n                      </div>\n                      <div class=\"field\">\n                        <label for=\"syncMonitorTypeFilter\">\u540c\u6b65\u7c7b\u578b</label>\n                        <select id=\"syncMonitorTypeFilter\"></select>\n                      </div>\n                      <div class=\"field\">\n                        <label for=\"syncMonitorRangeFilter\">\u65f6\u95f4\u8303\u56f4</label>\n                        <select id=\"syncMonitorRangeFilter\">\n                          <option value=\"24h\">\u8fd124\u5c0f\u65f6</option>\n                          <option value=\"7d\" selected>\u8fd17\u5929</option>\n                          <option value=\"30d\">\u8fd130\u5929</option>\n                        </select>\n                      </div>\n                      <div class=\"field\">\n                        <label for=\"syncMonitorGranularityFilter\">\u7edf\u8ba1\u7c92\u5ea6</label>\n                        <select id=\"syncMonitorGranularityFilter\">\n                          <option value=\"5m\">5\u5206\u949f</option>\n                          <option value=\"1h\" selected>1\u5c0f\u65f6</option>\n                          <option value=\"1d\">1\u5929</option>\n                        </select>\n                      </div>\n                      <button type=\"button\" class=\"button brand\" id=\"syncMonitorQueryButton\">\u67e5\u8be2</button>\n                    </div>\n\n                    <div class=\"sync-kpi-grid\">\n                      <div class=\"sync-kpi-card flow-blue-card\">\n                        <div class=\"sync-kpi-label\">\u540c\u6b65\u9891\u7387</div>\n                        <div class=\"sync-kpi-value\" id=\"syncMonitorFrequency\">-</div>\n                        <div class=\"sync-kpi-sub\" id=\"syncMonitorFrequencySub\">-</div>\n                      </div>\n                      <div class=\"sync-kpi-card flow-blue-card\">\n                        <div class=\"sync-kpi-label\">\u6570\u636e\u91cf</div>\n                        <div class=\"sync-kpi-value\" id=\"syncMonitorVolume\">-</div>\n                        <div class=\"sync-kpi-sub\" id=\"syncMonitorVolumeSub\">-</div>\n                      </div>\n                      <div class=\"sync-kpi-card flow-blue-card\">\n                        <div class=\"sync-kpi-label\">\u5ef6\u8fdf</div>\n                        <div class=\"sync-kpi-value\" id=\"syncMonitorDelay\">-</div>\n                        <div class=\"sync-kpi-sub\" id=\"syncMonitorDelaySub\">-</div>\n                      </div>\n                      <div class=\"sync-kpi-card flow-blue-card\">\n                        <div class=\"sync-kpi-label\">\u5931\u8d25\u6b21\u6570</div>\n                        <div class=\"sync-kpi-value\" id=\"syncMonitorFailureCount\">-</div>\n                        <div class=\"sync-kpi-sub\" id=\"syncMonitorFailureCountSub\">-</div>\n                      </div>\n                      <div class=\"sync-kpi-card flow-blue-card\">\n                        <div class=\"sync-kpi-label\">\u6210\u529f\u7387</div>\n                        <div class=\"sync-kpi-value\" id=\"syncMonitorSuccessRate\">-</div>\n                        <div class=\"sync-kpi-sub\" id=\"syncMonitorSuccessRateSub\">-</div>\n                      </div>\n                      <div class=\"sync-kpi-card flow-blue-card\">\n                        <div class=\"sync-kpi-label\">\u5f02\u5e38\u6b21\u6570</div>\n                        <div class=\"sync-kpi-value\" id=\"syncMonitorAbnormalCount\">-</div>\n                        <div class=\"sync-kpi-sub\" id=\"syncMonitorAbnormalCountSub\">-</div>\n                      </div>\n                    </div>\n\n                    <div class=\"sync-chart-grid\">\n                      <div class=\"sync-card flow-blue-card\">\n                        <h4 class=\"sync-title\">\u540c\u6b65\u9762\u79ef\u8d8b\u52bf\u56fe\uff08\u542b\u5ef6\u8fdf\u9608\u503c\u9884\u8b66\u7ebf\uff09</h4>\n                        <p class=\"sync-sub\">\u5c55\u793a\u6570\u636e\u91cf\u4e0e\u5ef6\u8fdf\u8d8b\u52bf\uff0c\u652f\u6301\u9608\u503c\u8d8a\u7ebf\u9884\u8b66</p>\n                        <div class=\"sync-canvas-wrap\">\n                          <canvas id=\"syncMonitorTrendCanvas\"></canvas>\n                        </div>\n                      </div>\n                      <div class=\"sync-card flow-blue-card\">\n                        <h4 class=\"sync-title\">\u540c\u6b65\u7b56\u7565\u5bf9\u6bd4\uff08\u6a2a\u5411\u6761\u5f62\u56fe\uff09</h4>\n                        <p class=\"sync-sub\">\u6309\u7b56\u7565\u5bf9\u6bd4\u6210\u529f\u7387\u3001\u5ef6\u8fdf\u548c\u5931\u8d25\u5206\u5e03</p>\n                        <div class=\"sync-canvas-wrap\" style=\"height:220px;\">\n                          <canvas id=\"syncMonitorStrategyCanvas\"></canvas>\n                        </div>\n                        <div class=\"sync-reason-list\" id=\"syncMonitorReasonList\"></div>\n                      </div>\n                    </div>\n                  </div>\n                </div>\n\n                <div class=\"tab-panel\" id=\"monitor-api\">\n                  <div class=\"api-monitor-shell\">\n                    <div class=\"api-filter-bar flow-blue-card\">\n                      <div class=\"field\">\n                        <label for=\"apiMonitorPlatformFilter\">\u5916\u90e8\u5e73\u53f0</label>\n                        <select id=\"apiMonitorPlatformFilter\"></select>\n                      </div>\n                      <div class=\"field\">\n                        <label for=\"apiMonitorTypeFilter\">\u63a5\u53e3\u7c7b\u578b</label>\n                        <select id=\"apiMonitorTypeFilter\"></select>\n                      </div>\n                      <div class=\"field\">\n                        <label for=\"apiMonitorRangeFilter\">\u65f6\u95f4\u8303\u56f4</label>\n                        <select id=\"apiMonitorRangeFilter\">\n                          <option value=\"24h\">\u8fd124\u5c0f\u65f6</option>\n                          <option value=\"7d\" selected>\u8fd17\u5929</option>\n                          <option value=\"30d\">\u8fd130\u5929</option>\n                        </select>\n                      </div>\n                      <div class=\"field\">\n                        <label for=\"apiMonitorGranularityFilter\">\u7edf\u8ba1\u7c92\u5ea6</label>\n                        <select id=\"apiMonitorGranularityFilter\">\n                          <option value=\"5m\">5\u5206\u949f</option>\n                          <option value=\"1h\" selected>1\u5c0f\u65f6</option>\n                          <option value=\"1d\">1\u5929</option>\n                        </select>\n                      </div>\n                      <button type=\"button\" class=\"button brand\" id=\"apiMonitorQueryButton\">\u67e5\u8be2</button>\n                    </div>\n\n                    <div class=\"api-kpi-grid\">\n                      <div class=\"api-kpi-card flow-blue-card\">\n                        <div class=\"api-kpi-label\">\u8c03\u7528\u6b21\u6570</div>\n                        <div class=\"api-kpi-value\" id=\"apiMonitorTotalCalls\">-</div>\n                        <div class=\"api-kpi-sub\" id=\"apiMonitorTotalCallsSub\">-</div>\n                      </div>\n                      <div class=\"api-kpi-card flow-blue-card\">\n                        <div class=\"api-kpi-label\">\u6210\u529f\u7387</div>\n                        <div class=\"api-kpi-value\" id=\"apiMonitorSuccessRate\">-</div>\n                        <div class=\"api-kpi-sub\" id=\"apiMonitorSuccessRateSub\">-</div>\n                      </div>\n                      <div class=\"api-kpi-card flow-blue-card\">\n                        <div class=\"api-kpi-label\">\u5931\u8d25\u7387</div>\n                        <div class=\"api-kpi-value\" id=\"apiMonitorFailureRate\">-</div>\n                        <div class=\"api-kpi-sub\" id=\"apiMonitorFailureRateSub\">-</div>\n                      </div>\n                      <div class=\"api-kpi-card flow-blue-card\">\n                        <div class=\"api-kpi-label\">\u5e73\u5747\u54cd\u5e94\u65f6\u95f4</div>\n                        <div class=\"api-kpi-value\" id=\"apiMonitorAvgLatency\">-</div>\n                        <div class=\"api-kpi-sub\" id=\"apiMonitorAvgLatencySub\">-</div>\n                      </div>\n                      <div class=\"api-kpi-card flow-blue-card\">\n                        <div class=\"api-kpi-label\">\u8d85\u65f6\u6b21\u6570</div>\n                        <div class=\"api-kpi-value\" id=\"apiMonitorTimeoutCount\">-</div>\n                        <div class=\"api-kpi-sub\" id=\"apiMonitorTimeoutCountSub\">-</div>\n                      </div>\n                      <div class=\"api-kpi-card flow-blue-card\">\n                        <div class=\"api-kpi-label\">\u7a33\u5b9a\u6027</div>\n                        <div class=\"api-kpi-value\" id=\"apiMonitorStability\">-</div>\n                        <div class=\"api-kpi-sub\" id=\"apiMonitorStabilitySub\">-</div>\n                      </div>\n                    </div>\n\n                    <div class=\"api-chart-grid\">\n                      <div class=\"api-card flow-blue-card\">\n                        <div class=\"panel-header\" style=\"padding:0\">\n                          <div>\n                            <h4 class=\"api-title\">\u8c03\u7528\u6b21\u6570\u9762\u79ef\u56fe + \u6210\u529f\u7387\u53cc\u8f74\u6298\u7ebf + \u5065\u5eb7\u9608\u503c\u7ebf</h4>\n                            <p class=\"api-sub\">\u5de6\u8f74\u8c03\u7528\u6b21\u6570\u9762\u79ef\u8d8b\u52bf\uff0c\u53f3\u8f74\u6210\u529f\u7387\u4e0e\u9608\u503c\u7ebf\uff0c\u8bc6\u522b\u5065\u5eb7\u6ce2\u52a8</p>\n                          </div>\n                          <div class=\"action-row\">\n                            <button type=\"button\" class=\"button ghost\" id=\"openApiCallLogs\">\u67e5\u770b\u8c03\u7528\u65e5\u5fd7</button>\n                            <button type=\"button\" class=\"button ghost\" id=\"openPerformanceLogs\">\u67e5\u770b\u5f02\u5e38\u660e\u7ec6</button>\n                          </div>\n                        </div>\n                        <div class=\"api-canvas-wrap\">\n                          <canvas id=\"apiMonitorTrendCanvas\"></canvas>\n                        </div>\n                      </div>\n                      <div class=\"api-card flow-blue-card\">\n                        <h4 class=\"api-title\">\u6a2a\u5411\u6027\u80fd\u6761\u5f62\u56fe\u4e0e\u5931\u8d25\u539f\u56e0\u5206\u6790</h4>\n                        <p class=\"api-sub\">\u6309\u63a5\u53e3\u5e73\u5747\u54cd\u5e94\u65f6\u95f4\u6a2a\u5411\u5bf9\u6bd4\uff0c\u8054\u52a8\u5f02\u5e38\u8bc6\u522b\u4e0e\u5931\u8d25\u539f\u56e0</p>\n                        <div class=\"api-canvas-wrap\" style=\"height:220px;\">\n                          <canvas id=\"apiMonitorMetricCanvas\"></canvas>\n                        </div>\n                        <div class=\"api-anomaly-list\" id=\"apiMonitorReasonList\"></div>\n                      </div>\n                    </div>\n\n                    <div class=\"api-table-card flow-blue-card\">\n                      <div class=\"api-table-head\">\n                        <div>\n                          <h4 class=\"api-title\">\u63a5\u53e3\u8c03\u7528\u660e\u7ec6\u8868\u683c</h4>\n                          <p class=\"api-sub\">\u6309\u63a5\u53e3\u5c55\u793a\u8c03\u7528\u6b21\u6570\u3001\u6210\u529f\u7387\u3001\u54cd\u5e94\u6027\u80fd\u4e0e\u5f02\u5e38\u72b6\u6001</p>\n                        </div>\n                        <span class=\"flow-anomaly-tip\" id=\"apiMonitorAnomalySummary\">\u5f02\u5e38\u63a5\u53e3\uff1a-</span>\n                      </div>\n                      <div class=\"api-table-shell\">\n                        <table>\n                          <thead>\n                            <tr>\n                              <th>\u63a5\u53e3\u7f16\u7801</th>\n                              <th>\u63a5\u53e3\u540d\u79f0</th>\n                              <th>\u63a5\u53e3\u7c7b\u578b</th>\n                              <th>\u8c03\u7528\u6b21\u6570</th>\n                              <th>\u6210\u529f\u7387</th>\n                              <th>\u5931\u8d25\u7387</th>\n                              <th>\u5e73\u5747\u54cd\u5e94\u65f6\u95f4</th>\n                              <th>\u8d85\u65f6\u6b21\u6570</th>\n                              <th>\u7a33\u5b9a\u6027\u8bc4\u5206</th>\n                              <th>\u5931\u8d25\u539f\u56e0\u5206\u6790</th>\n                              <th>\u5f02\u5e38\u72b6\u6001</th>\n                            </tr>\n                          </thead>\n                          <tbody id=\"apiMonitorTableBody\"></tbody>\n                        </table>\n                      </div>\n                    </div>\n                  </div>\n                </div>\n\n                <div class=\"tab-panel\" id=\"monitor-response\">\n                  <div class=\"rt-monitor-shell\">\n                    <div class=\"rt-filter-bar flow-blue-card\">\n                      <div class=\"field\">\n                        <label for=\"rtPlatformFilter\">\u5916\u90e8\u5e73\u53f0</label>\n                        <select id=\"rtPlatformFilter\"></select>\n                      </div>\n                      <div class=\"field\">\n                        <label for=\"rtRangeFilter\">\u65f6\u95f4\u8303\u56f4</label>\n                        <select id=\"rtRangeFilter\">\n                          <option value=\"24h\">\u8fd124\u5c0f\u65f6</option>\n                          <option value=\"7d\" selected>\u8fd17\u5929</option>\n                          <option value=\"30d\">\u8fd130\u5929</option>\n                        </select>\n                      </div>\n                      <div class=\"field\">\n                        <label for=\"rtGranularityFilter\">\u7edf\u8ba1\u7c92\u5ea6</label>\n                        <select id=\"rtGranularityFilter\">\n                          <option value=\"5m\">5\u5206\u949f</option>\n                          <option value=\"1h\" selected>1\u5c0f\u65f6</option>\n                          <option value=\"1d\">1\u5929</option>\n                        </select>\n                      </div>\n                      <button type=\"button\" class=\"button brand\" id=\"rtQueryButton\">\u67e5\u8be2</button>\n                    </div>\n\n                    <div class=\"rt-kpi-grid\">\n                      <div class=\"rt-kpi-card flow-blue-card\">\n                        <div class=\"rt-kpi-label\">\u5e73\u5747\u54cd\u5e94\u65f6\u95f4</div>\n                        <div class=\"rt-kpi-value\" id=\"rtAvgValue\">-</div>\n                        <div class=\"rt-kpi-sub\" id=\"rtAvgSub\">-</div>\n                      </div>\n                      <div class=\"rt-kpi-card flow-blue-card\">\n                        <div class=\"rt-kpi-label\">\u6700\u5c0f\u54cd\u5e94\u65f6\u95f4</div>\n                        <div class=\"rt-kpi-value\" id=\"rtMinValue\">-</div>\n                        <div class=\"rt-kpi-sub\" id=\"rtMinSub\">-</div>\n                      </div>\n                      <div class=\"rt-kpi-card flow-blue-card\">\n                        <div class=\"rt-kpi-label\">\u6700\u5927\u54cd\u5e94\u65f6\u95f4</div>\n                        <div class=\"rt-kpi-value\" id=\"rtMaxValue\">-</div>\n                        <div class=\"rt-kpi-sub\" id=\"rtMaxSub\">-</div>\n                      </div>\n                      <div class=\"rt-kpi-card flow-blue-card\">\n                        <div class=\"rt-kpi-label\">\u603b\u8c03\u7528\u6b21\u6570</div>\n                        <div class=\"rt-kpi-value\" id=\"rtTotalCallValue\">-</div>\n                        <div class=\"rt-kpi-sub\" id=\"rtTotalCallSub\">-</div>\n                      </div>\n                    </div>\n\n                    <div class=\"rt-chart-grid\">\n                      <div class=\"rt-card flow-blue-card\">\n                        <h4 class=\"rt-title\">\u54cd\u5e94\u65f6\u95f4\u8d8b\u52bf\u6298\u7ebf\u56fe</h4>\n                        <p class=\"rt-sub\">\u6309\u65f6\u95f4\u7ef4\u5ea6\u5c55\u793a\u5e73\u5747RT\u3001\u6700\u5c0fRT\u3001\u6700\u5927RT\u8d8b\u52bf\u53d8\u5316</p>\n                        <div class=\"rt-canvas-wrap\">\n                          <canvas id=\"rtTrendCanvas\"></canvas>\n                        </div>\n                      </div>\n\n                      <div class=\"rt-card flow-blue-card\">\n                        <h4 class=\"rt-title\">\u54cd\u5e94\u65f6\u95f4\u5206\u5e03</h4>\n                        <p class=\"rt-sub\">\u533a\u95f4\uff1a0~100ms\u3001100~300ms\u3001300~500ms\u3001500~1000ms\u3001&gt;1000ms</p>\n                        <div class=\"rt-canvas-wrap\" style=\"height:220px;\">\n                          <canvas id=\"rtDistCanvas\"></canvas>\n                        </div>\n                        <div class=\"rt-dist-table\">\n                          <table>\n                            <thead>\n                              <tr>\n                                <th>\u533a\u95f4</th>\n                                <th>\u8c03\u7528\u6b21\u6570</th>\n                                <th>\u5360\u6bd4</th>\n                              </tr>\n                            </thead>\n                            <tbody id=\"rtDistTableBody\"></tbody>\n                          </table>\n                        </div>\n                      </div>\n                    </div>\n                  </div>\n                </div>\n\n                <div class=\"tab-panel\" id=\"monitor-protocol\">\n                  <div class=\"protocol-monitor-shell\">\n                    <div class=\"protocol-filter-bar flow-blue-card\">\n                      <div class=\"field\">\n                        <label for=\"protocolMonitorPlatformFilter\">\u5e73\u53f0</label>\n                        <select id=\"protocolMonitorPlatformFilter\"></select>\n                      </div>\n                      <div class=\"field\">\n                        <label for=\"protocolMonitorTypeFilter\">\u8f6c\u6362\u7c7b\u578b</label>\n                        <select id=\"protocolMonitorTypeFilter\"></select>\n                      </div>\n                      <div class=\"field\">\n                        <label for=\"protocolMonitorRangeFilter\">\u65f6\u95f4\u8303\u56f4</label>\n                        <select id=\"protocolMonitorRangeFilter\">\n                          <option value=\"24h\">\u8fd124\u5c0f\u65f6</option>\n                          <option value=\"7d\" selected>\u8fd17\u5929</option>\n                          <option value=\"30d\">\u8fd130\u5929</option>\n                        </select>\n                      </div>\n                      <div class=\"field\">\n                        <label for=\"protocolMonitorGranularityFilter\">\u7edf\u8ba1\u7c92\u5ea6</label>\n                        <select id=\"protocolMonitorGranularityFilter\">\n                          <option value=\"5m\">5\u5206\u949f</option>\n                          <option value=\"1h\" selected>1\u5c0f\u65f6</option>\n                          <option value=\"1d\">1\u5929</option>\n                        </select>\n                      </div>\n                      <button type=\"button\" class=\"button brand\" id=\"protocolMonitorQueryButton\">\u67e5\u8be2</button>\n                    </div>\n\n                    <div class=\"protocol-kpi-grid\">\n                      <div class=\"protocol-kpi-card flow-blue-card\">\n                        <div class=\"protocol-kpi-label\">\u8f6c\u6362\u8017\u65f6</div>\n                        <div class=\"protocol-kpi-value\" id=\"protocolMonitorLatency\">-</div>\n                        <div class=\"protocol-kpi-sub\" id=\"protocolMonitorLatencySub\">-</div>\n                      </div>\n                      <div class=\"protocol-kpi-card flow-blue-card\">\n                        <div class=\"protocol-kpi-label\">\u6210\u529f\u7387</div>\n                        <div class=\"protocol-kpi-value\" id=\"protocolMonitorSuccessRate\">-</div>\n                        <div class=\"protocol-kpi-sub\" id=\"protocolMonitorSuccessRateSub\">-</div>\n                      </div>\n                      <div class=\"protocol-kpi-card flow-blue-card\">\n                        <div class=\"protocol-kpi-label\">\u5931\u8d25\u7387</div>\n                        <div class=\"protocol-kpi-value\" id=\"protocolMonitorFailureRate\">-</div>\n                        <div class=\"protocol-kpi-sub\" id=\"protocolMonitorFailureRateSub\">-</div>\n                      </div>\n                      <div class=\"protocol-kpi-card flow-blue-card\">\n                        <div class=\"protocol-kpi-label\">\u5e76\u53d1\u8f6c\u6362\u6570</div>\n                        <div class=\"protocol-kpi-value\" id=\"protocolMonitorConcurrency\">-</div>\n                        <div class=\"protocol-kpi-sub\" id=\"protocolMonitorConcurrencySub\">-</div>\n                      </div>\n                      <div class=\"protocol-kpi-card flow-blue-card\">\n                        <div class=\"protocol-kpi-label\">\u6027\u80fd\u5f02\u5e38\u544a\u8b66</div>\n                        <div class=\"protocol-kpi-value\" id=\"protocolMonitorAlertCount\">-</div>\n                        <div class=\"protocol-kpi-sub\" id=\"protocolMonitorAlertCountSub\">-</div>\n                      </div>\n                    </div>\n\n                    <div class=\"protocol-chart-grid\">\n                      <div class=\"protocol-card flow-blue-card\">\n                        <h4 class=\"protocol-title\">\u6df7\u5408\u9762\u79ef\u8d8b\u52bf\u56fe\uff08\u542b\u9608\u503c\u9884\u8b66\u7ebf\uff09</h4>\n                        <p class=\"protocol-sub\">\u8f6c\u6362\u91cf\u9762\u79ef\u8d8b\u52bf + \u8017\u65f6/\u5931\u8d25\u7387\u53cc\u8f74\u6298\u7ebf + \u9608\u503c\u9884\u8b66\u7ebf</p>\n                        <div class=\"protocol-canvas-wrap\">\n                          <canvas id=\"protocolMonitorTrendCanvas\"></canvas>\n                        </div>\n                      </div>\n                      <div class=\"protocol-card flow-blue-card\">\n                        <h4 class=\"protocol-title\">\u5206\u7ec4\u67f1\u72b6\u56fe\u4e0e\u591a\u6307\u6807\u5bf9\u6bd4</h4>\n                        <p class=\"protocol-sub\">\u6309\u5e73\u53f0\u5bf9\u6bd4\u6210\u529f\u7387\u3001\u5931\u8d25\u7387\u4e0e\u5e76\u53d1\u80fd\u529b\uff0c\u8bc6\u522b\u74f6\u9888</p>\n                        <div class=\"protocol-canvas-wrap\" style=\"height:220px;\">\n                          <canvas id=\"protocolMonitorCompareCanvas\"></canvas>\n                        </div>\n                        <div class=\"protocol-alert-list\" id=\"protocolMonitorAlertList\"></div>\n                      </div>\n                    </div>\n                  </div>\n                </div>\n\n                <div class=\"tab-panel\" id=\"monitor-flow\">\n                  <div class=\"flow-monitor-shell\">\n                    <div class=\"flow-filter-bar flow-blue-card\">\n                      <div class=\"field\">\n                        <label for=\"flowPlatformFilter\">\u5916\u90e8\u5e73\u53f0</label>\n                        <select id=\"flowPlatformFilter\"></select>\n                      </div>\n                      <div class=\"field\">\n                        <label for=\"flowRangeFilter\">\u65f6\u95f4\u8303\u56f4</label>\n                        <select id=\"flowRangeFilter\">\n                          <option value=\"24h\">\u8fd124\u5c0f\u65f6</option>\n                          <option value=\"7d\" selected>\u8fd17\u5929</option>\n                          <option value=\"30d\">\u8fd130\u5929</option>\n                        </select>\n                      </div>\n                      <div class=\"field\">\n                        <label for=\"flowGranularityFilter\">\u7edf\u8ba1\u7c92\u5ea6</label>\n                        <select id=\"flowGranularityFilter\">\n                          <option value=\"5m\">5\u5206\u949f</option>\n                          <option value=\"1h\" selected>1\u5c0f\u65f6</option>\n                          <option value=\"1d\">1\u5929</option>\n                        </select>\n                      </div>\n                      <button type=\"button\" class=\"button brand\" id=\"flowQueryButton\">\u67e5\u8be2</button>\n                    </div>\n\n                    <div class=\"flow-kpi-grid\">\n                      <div class=\"flow-kpi-card flow-blue-card\">\n                        <div class=\"flow-kpi-label\">\u4e0a\u884c\u6d41\u91cf</div>\n                        <div class=\"flow-kpi-value\" id=\"flowUpValue\">-</div>\n                        <div class=\"flow-kpi-sub\" id=\"flowUpSub\">-</div>\n                      </div>\n                      <div class=\"flow-kpi-card flow-blue-card\">\n                        <div class=\"flow-kpi-label\">\u4e0b\u884c\u6d41\u91cf</div>\n                        <div class=\"flow-kpi-value\" id=\"flowDownValue\">-</div>\n                        <div class=\"flow-kpi-sub\" id=\"flowDownSub\">-</div>\n                      </div>\n                      <div class=\"flow-kpi-card flow-blue-card\">\n                        <div class=\"flow-kpi-label\">\u603b\u6d41\u91cf</div>\n                        <div class=\"flow-kpi-value\" id=\"flowTotalValue\">-</div>\n                        <div class=\"flow-kpi-sub\" id=\"flowTotalSub\">-</div>\n                      </div>\n                      <div class=\"flow-kpi-card flow-blue-card\">\n                        <div class=\"flow-kpi-label\">\u6d41\u91cf\u5f02\u5e38\u6b21\u6570</div>\n                        <div class=\"flow-kpi-value\" id=\"flowAnomalyValue\">-</div>\n                        <div class=\"flow-kpi-sub\" id=\"flowAnomalySub\">-</div>\n                      </div>\n                    </div>\n\n                    <div class=\"flow-chart-grid\">\n                      <div class=\"flow-chart-card flow-blue-card\">\n                        <h4 class=\"flow-chart-title\">\u6d41\u91cf\u8d8b\u52bf\u6298\u7ebf\u56fe</h4>\n                        <p class=\"flow-chart-sub\">\u5c55\u793a\u4e0a\u884c\u3001\u4e0b\u884c\u3001\u603b\u6d41\u91cf\u5728\u6240\u9009\u65f6\u95f4\u8303\u56f4\u5185\u7684\u53d8\u5316\u8d8b\u52bf</p>\n                        <div class=\"flow-canvas-wrap\">\n                          <canvas id=\"flowTrendCanvas\"></canvas>\n                        </div>\n                      </div>\n                      <div class=\"flow-chart-card flow-blue-card\">\n                        <h4 class=\"flow-chart-title\">\u5404\u5e73\u53f0\u6d41\u91cf\u67f1\u72b6\u56fe</h4>\n                        <p class=\"flow-chart-sub\">\u6309\u603b\u6d41\u91cf\u7edf\u8ba1\u5e73\u53f0\u6392\u540d\uff0c\u81ea\u52a8\u6807\u8bb0\u7a81\u589e/\u7a81\u964d\u98ce\u9669</p>\n                        <div class=\"flow-canvas-wrap\">\n                          <canvas id=\"flowPlatformCanvas\"></canvas>\n                        </div>\n                      </div>\n                    </div>\n\n                    <div class=\"flow-table-card flow-blue-card\">\n                      <div class=\"flow-table-head\">\n                        <div>\n                          <h4 class=\"flow-chart-title\">\u6d41\u91cf\u7edf\u8ba1\u8868\u683c</h4>\n                          <p class=\"flow-chart-sub\">\u5e73\u53f0\u7ea7\u4e0a/\u4e0b\u884c\u6d41\u91cf\u3001\u5cf0\u503c\u548c\u5f02\u5e38\u8bc6\u522b\u7ed3\u679c</p>\n                        </div>\n                        <span class=\"flow-anomaly-tip\" id=\"flowAnomalyTip\">\u5f02\u5e38\u5e73\u53f0\uff1a-</span>\n                      </div>\n                      <div class=\"flow-table-shell\">\n                        <table>\n                          <thead>\n                            <tr>\n                              <th>\u5e73\u53f0\u540d\u79f0</th>\n                              <th>\u4e0a\u884c\u6d41\u91cf</th>\n                              <th>\u4e0b\u884c\u6d41\u91cf</th>\n                              <th>\u603b\u6d41\u91cf</th>\n                              <th>\u5e73\u5747\u6d41\u91cf</th>\n                              <th>\u5cf0\u503c\u6d41\u91cf</th>\n                              <th>\u53d8\u5316\u5e45\u5ea6</th>\n                              <th>\u5f02\u5e38\u8bc6\u522b</th>\n                            </tr>\n                          </thead>\n                          <tbody id=\"flowTableBody\"></tbody>\n                        </table>\n                      </div>\n                    </div>\n                  </div>\n                </div>\n\n                <div class=\"tab-panel\" id=\"monitor-alert-stats\">\n                  <div class=\"alert-analytics-shell\">\n                    <div class=\"alert-analytics-head flow-blue-card\">\n                      <div>\n                        <h4 class=\"alert-analytics-title\">\u544a\u8b66\u7edf\u8ba1\u5206\u6790</h4>\n                        <p class=\"alert-analytics-subtitle\">\u8986\u76d6\u544a\u8b66\u603b\u91cf\u3001\u7c7b\u578b\u5206\u5e03\u3001\u9891\u7387\u8d8b\u52bf\u3001\u5904\u7406\u65f6\u957f\u4e0e\u6839\u56e0\u5206\u6790</p>\n                      </div>\n                      <button type=\"button\" class=\"button brand\" id=\"generateAlertAnalysisReport\">\u751f\u6210\u5206\u6790\u62a5\u544a</button>\n                    </div>\n\n                    <div class=\"alert-analytics-metrics\" id=\"alertAnalyticsMetrics\"></div>\n\n                    <div class=\"alert-analytics-grid\">\n                      <div class=\"alert-analytics-panel flow-blue-card\">\n                        <h4 class=\"alert-analytics-title\">\u544a\u8b66\u9891\u7387\u8d8b\u52bf</h4>\n                        <p class=\"alert-analytics-subtitle\">\u6309\u65e5\u7edf\u8ba1\u544a\u8b66\u9891\u7387\uff0c\u8bc6\u522b\u9ad8\u53d1\u5468\u671f</p>\n                        <div class=\"alert-analytics-canvas\">\n                          <canvas id=\"alertFrequencyTrendCanvas\"></canvas>\n                        </div>\n                      </div>\n                      <div class=\"alert-analytics-panel flow-blue-card\">\n                        <h4 class=\"alert-analytics-title\">\u544a\u8b66\u7c7b\u578b\u5206\u5e03</h4>\n                        <p class=\"alert-analytics-subtitle\">\u7edf\u8ba1\u5404\u7c7b\u544a\u8b66\u5360\u6bd4</p>\n                        <div class=\"alert-analytics-canvas\">\n                          <canvas id=\"alertTypeDistCanvas\"></canvas>\n                        </div>\n                      </div>\n                    </div>\n\n                    <div class=\"alert-analytics-grid\">\n                      <div class=\"alert-analytics-panel flow-blue-card\">\n                        <h4 class=\"alert-analytics-title\">\u544a\u8b66\u5904\u7406\u65f6\u957f\u5206\u6790</h4>\n                        <p class=\"alert-analytics-subtitle\">\u901a\u77e5\u3001\u5904\u7406\u3001\u5173\u95ed\u5404\u9636\u6bb5\u5e73\u5747\u8017\u65f6\uff08\u5206\u949f\uff09</p>\n                        <div class=\"alert-analytics-canvas\">\n                          <canvas id=\"alertDurationCanvas\"></canvas>\n                        </div>\n                      </div>\n                      <div class=\"alert-analytics-panel flow-blue-card\">\n                        <h4 class=\"alert-analytics-title\">\u9ad8\u53d1\u5e73\u53f0\u4e0e\u9ad8\u53d1\u65f6\u6bb5</h4>\n                        <p class=\"alert-analytics-subtitle\">\u8bc6\u522b\u544a\u8b66\u9ad8\u53d1\u5e73\u53f0\u4e0e\u65f6\u95f4\u6bb5\uff0c\u652f\u6491\u6392\u969c\u4e0e\u503c\u73ed\u7b56\u7565</p>\n                        <div class=\"alert-analytics-canvas\" style=\"height:220px;\">\n                          <canvas id=\"alertHotspotCanvas\"></canvas>\n                        </div>\n                        <div class=\"alert-analytics-list\" id=\"alertHotspotList\"></div>\n                      </div>\n                    </div>\n\n                    <div class=\"alert-analytics-panel flow-blue-card\">\n                      <h4 class=\"alert-analytics-title\">\u544a\u8b66\u6839\u56e0\u5206\u6790</h4>\n                      <p class=\"alert-analytics-subtitle\">\u5f52\u7c7b\u544a\u8b66\u89e6\u53d1\u6839\u56e0\uff0c\u5b9a\u4f4d\u6cbb\u7406\u4f18\u5148\u7ea7</p>\n                      <div class=\"alert-analytics-list\" id=\"alertRootCauseList\"></div>\n                    </div>\n                  </div>\n                </div>\n              </div>\n            </section>\n\n            <section class=\"screen\" id=\"screen-alerts\">\n              <div class=\"panel\">\n                <div class=\"panel-header\">\n                  <div>\n                    <h2>\u544a\u8b66\u4e2d\u5fc3</h2>\n                    <p class=\"section-copy\">\u7edf\u4e00\u67e5\u770b\u544a\u8b66\u4e8b\u4ef6\u3001\u89c4\u5219\u914d\u7f6e\u548c\u5904\u7406\u7edf\u8ba1\uff0c\u8986\u76d6\u901a\u77e5\u3001\u5904\u7f6e\u3001\u5173\u95ed\u7684\u5b8c\u6574\u544a\u8b66\u95ed\u73af\u3002</p>\n                  </div>\n                  <div class=\"action-row\">\n                    <button type=\"button\" class=\"button secondary\" id=\"triggerAlertTest\">\u89e6\u53d1\u6d4b\u8bd5\u544a\u8b66</button>\n                    <button type=\"button\" class=\"button brand\" id=\"openNotifyTemplate\">\u901a\u77e5\u6a21\u677f</button>\n                  </div>\n                </div>\n                <div class=\"tab-row\" data-tab-group=\"alert-tabs\">\n                  <button type=\"button\" class=\"tab-button active\" data-group=\"alert-tabs\" data-target=\"alert-events\">\u544a\u8b66\u5217\u8868</button>\n                  <button type=\"button\" class=\"tab-button\" data-group=\"alert-tabs\" data-target=\"alert-rules\">\u544a\u8b66\u89c4\u5219\u914d\u7f6e</button>\n                </div>\n\n                <div class=\"tab-panel active\" id=\"alert-events\">\n                  <div class=\"stats-grid\" id=\"alertEventSummary\"></div>\n                  <div class=\"panel flat\">\n                    <div class=\"table-shell\">\n                      <table>\n                        <thead>\n                          <tr>\n                            <th>\u544a\u8b66\u7c7b\u578b</th>\n                            <th>\u544a\u8b66\u540d\u79f0</th>\n                            <th>\u544a\u8b66\u5f00\u59cb\u65f6\u95f4</th>\n                            <th>\u544a\u8b66\u72b6\u6001</th>\n                            <th>\u544a\u8b66\u7ed3\u675f\u65f6\u95f4</th>\n                            <th>\u544a\u8b66\u5904\u7406\u4eba</th>\n                            <th>\u64cd\u4f5c</th>\n                          </tr>\n                        </thead>\n                        <tbody id=\"alertEventTableBody\"></tbody>\n                      </table>\n                    </div>\n                  </div>\n                </div>\n\n                <div class=\"tab-panel\" id=\"alert-rules\">\n                  <div id=\"alertRuleListView\">\n                    <div class=\"panel-header\">\n                      <div>\n                        <h4>\u544a\u8b66\u89c4\u5219\u914d\u7f6e\u5217\u8868</h4>\n                        <p class=\"section-copy\">\u6309\u544a\u8b66\u7c7b\u578b\u7ef4\u62a4\u89c4\u5219\u540d\u79f0\u3001\u89e6\u53d1\u89c4\u5219\u3001\u5904\u7406\u7b56\u7565\u548c\u5904\u7406\u4eba\u4fe1\u606f\uff0c\u70b9\u51fb\u7f16\u8f91\u8fdb\u5165\u89c4\u5219\u914d\u7f6e\u9875\u3002</p>\n                      </div>\n                    </div>\n                    <div class=\"panel flat\">\n                      <div class=\"table-shell\">\n                        <table>\n                          <thead>\n                            <tr>\n                              <th>\u544a\u8b66\u7c7b\u578b</th>\n                              <th>\u89c4\u5219\u540d\u79f0</th>\n                              <th>\u89e6\u53d1\u89c4\u5219</th>\n                              <th>\u5904\u7406\u7b56\u7565</th>\n                              <th>\u5904\u7406\u4eba\u53f7\u7801</th>\n                              <th>\u5904\u7406\u4eba\u540d\u5b57</th>\n                              <th>\u662f\u5426\u5f00\u542f</th>\n                              <th>\u64cd\u4f5c</th>\n                            </tr>\n                          </thead>\n                          <tbody id=\"alertRuleTableBody\"></tbody>\n                        </table>\n                      </div>\n                    </div>\n                  </div>\n\n                  <div id=\"alertRuleDetailView\" style=\"display:none;\">\n                    <div class=\"panel-header\">\n                      <div>\n                        <h4>\u544a\u8b66\u89c4\u5219\u7f16\u8f91\u9875</h4>\n                        <p class=\"section-copy\">\u7f16\u8f91\u544a\u8b66\u7c7b\u578b\u3001\u89c4\u5219\u540d\u79f0\u3001\u89e6\u53d1\u6761\u4ef6\u3001\u5904\u7406\u7b56\u7565\u548c\u5904\u7406\u4eba\u4fe1\u606f\uff0c\u4fdd\u5b58\u540e\u540c\u6b65\u56de\u89c4\u5219\u5217\u8868\u3002</p>\n                      </div>\n                      <div class=\"action-row\">\n                        <button type=\"button\" class=\"button secondary\" id=\"backToAlertRuleList\">\u8fd4\u56de\u5217\u8868</button>\n                      </div>\n                    </div>\n                    <div class=\"grid-2-1\">\n                      <div class=\"list-card\">\n                        <div class=\"form-grid\">\n                          <div class=\"field\">\n                            <label for=\"alertRuleType\">\u544a\u8b66\u7c7b\u578b</label>\n                            <select id=\"alertRuleType\">\n                              <option value=\"\u8d85\u65f6\u544a\u8b66\">\u8d85\u65f6\u544a\u8b66</option>\n                              <option value=\"\u540c\u6b65\u5f02\u5e38\">\u540c\u6b65\u5f02\u5e38</option>\n                              <option value=\"\u8ba4\u8bc1\u5f02\u5e38\">\u8ba4\u8bc1\u5f02\u5e38</option>\n                              <option value=\"\u975e\u6cd5\u8c03\u7528\">\u975e\u6cd5\u8c03\u7528</option>\n                            </select>\n                          </div>\n                          <div class=\"field\">\n                            <label for=\"alertRuleName\">\u89c4\u5219\u540d\u79f0</label>\n                            <input id=\"alertRuleName\" type=\"text\" placeholder=\"\u8bf7\u8f93\u5165\u89c4\u5219\u540d\u79f0\">\n                          </div>\n                          <div class=\"field\">\n                            <label for=\"alertRuleTriggerCount\">\u8fde\u7eed\u89e6\u53d1\u6b21\u6570</label>\n                            <input id=\"alertRuleTriggerCount\" type=\"number\" min=\"1\" step=\"1\" placeholder=\"\u8bf7\u8f93\u5165\u8fde\u7eed\u89e6\u53d1\u6b21\u6570\">\n                          </div>\n                          <div class=\"field\">\n                            <label for=\"alertRuleDuration\">\u6301\u7eed\u65f6\u95f4\uff08\u79d2\uff09</label>\n                            <input id=\"alertRuleDuration\" type=\"number\" min=\"1\" step=\"1\" placeholder=\"\u8bf7\u8f93\u5165\u6301\u7eed\u65f6\u95f4\uff08\u79d2\uff09\">\n                          </div>\n                          <div class=\"field\">\n                            <label for=\"alertRuleStrategy\">\u5904\u7406\u7b56\u7565</label>\n                            <select id=\"alertRuleStrategy\">\n                              <option value=\"\u77ed\u4fe1\u901a\u77e5\">\u77ed\u4fe1\u901a\u77e5</option>\n                              <option value=\"\u7ad9\u5185\u4fe1\u901a\u77e5\">\u7ad9\u5185\u4fe1\u901a\u77e5</option>\n                            </select>\n                          </div>\n                          <div class=\"field\">\n                            <label for=\"alertRulePhones\">\u5904\u7406\u4eba\u4fe1\u606f</label>\n                            <input id=\"alertRulePhones\" type=\"text\" placeholder=\"\u8bf7\u8f93\u5165\u53f7\u7801\">\n                          </div>\n                          <div class=\"field\">\n                            <label for=\"alertRuleContacts\">\u5904\u7406\u4eba\u540d\u5b57</label>\n                            <input id=\"alertRuleContacts\" type=\"text\" placeholder=\"\u8bf7\u8f93\u5165\u5904\u7406\u4eba\u540d\u5b57\">\n                          </div>\n                          <div class=\"field\" style=\"grid-column: 1 / -1;\">\n                            <label for=\"alertRuleDescription\">\u89c4\u5219\u8bf4\u660e</label>\n                            <textarea id=\"alertRuleDescription\" placeholder=\"\u8bf7\u8f93\u5165\u89c4\u5219\u8bf4\u660e\" style=\"min-height: 180px;\"></textarea>\n                          </div>\n                          <div class=\"field\" style=\"grid-column: 1 / -1;\">\n                            <label>\u662f\u5426\u5f00\u542f</label>\n                            <div class=\"form-toggle-row\">\n                              <div class=\"form-toggle-copy\">\n                                <strong>\u89c4\u5219\u72b6\u6001</strong>\n                                <span>\u5f00\u542f\u540e\u8be5\u89c4\u5219\u7acb\u5373\u53c2\u4e0e\u544a\u8b66\u5224\u5b9a\u4e0e\u901a\u77e5\u3002</span>\n                              </div>\n                              <button\n                                type=\"button\"\n                                class=\"platform-toggle\"\n                                id=\"alertRuleEnabledToggle\"\n                                data-enabled=\"false\"\n                                role=\"switch\"\n                                aria-checked=\"false\"\n                                aria-label=\"\u5f00\u542f\u544a\u8b66\u89c4\u5219\"\n                              >\n                                <span class=\"platform-toggle-track\"><span class=\"platform-toggle-thumb\"></span></span>\n                                <span class=\"platform-toggle-label\" id=\"alertRuleEnabledLabel\">\u5173\u95ed</span>\n                              </button>\n                            </div>\n                          </div>\n                          <div class=\"action-row\" style=\"grid-column: 1 / -1; justify-content: flex-end; margin-top: 4px;\">\n                            <button type=\"button\" class=\"button brand\" id=\"saveAlertRule\">\u4fdd\u5b58</button>\n                          </div>\n                        </div>\n                      </div>\n                      <div class=\"mini-panel\">\n                        <h4 id=\"alertRuleEditorBadge\">\u5f53\u524d\u89c4\u5219\uff1a-</h4>\n                        <div class=\"line-list\" id=\"alertRuleMeta\"></div>\n                        <div class=\"panel-note\">\u89c4\u5219\u7f16\u8f91\u9875\u4e3b\u8981\u7ef4\u62a4\u89c4\u5219\u540d\u79f0\u3001\u8fde\u7eed\u89e6\u53d1\u6b21\u6570\u3001\u6301\u7eed\u65f6\u95f4\u3001\u5904\u7406\u7b56\u7565\u3001\u5904\u7406\u4eba\u548c\u542f\u7528\u72b6\u6001\uff0c\u4fdd\u5b58\u540e\u76f4\u63a5\u56de\u586b\u5230\u89c4\u5219\u914d\u7f6e\u5217\u8868\u3002</div>\n                      </div>\n                    </div>\n                  </div>\n                </div>\n\n              </div>\n            </section>\n\n            <section class=\"screen\" id=\"screen-call-logs\">\n              <div class=\"panel\">\n                <div class=\"panel-header\">\n                  <div>\n                    <h2>\u8c03\u7528\u65e5\u5fd7</h2>\n                    <p class=\"section-copy\">\u65e5\u5fd7\u5ba1\u8ba1\u4e2d\u5fc3 &gt; \u8c03\u7528\u65e5\u5fd7\u3002\u7edf\u4e00\u67e5\u770b API \u8c03\u7528\u660e\u7ec6\uff0c\u652f\u6301\u67e5\u770b\u8be6\u60c5\u548c\u8df3\u8f6c API \u8be6\u60c5\u8bbe\u8ba1\u9875\u3002</p>\n                  </div>\n                  <div class=\"action-row\">\n                    <span class=\"chip\" id=\"logScopeChip\">\u5f53\u524d\u89c6\u56fe\uff1a\u8c03\u7528\u65e5\u5fd7 / \u5168\u90e8\u7ed3\u679c</span>\n                    <button type=\"button\" class=\"button secondary\" id=\"filterFailLogs\">\u4ec5\u770b\u5931\u8d25\u65e5\u5fd7</button>\n                    <button type=\"button\" class=\"button brand\" id=\"resetLogs\">\u663e\u793a\u5168\u90e8</button>\n                  </div>\n                </div>\n\n                <div class=\"panel flat\">\n                  <div class=\"table-shell\">\n                    <table>\n                      <thead>\n                        <tr>\n                          <th>\u65f6\u95f4</th>\n                          <th>\u5e73\u53f0</th>\n                          <th>API \u7f16\u7801</th>\n                          <th>\u65e5\u5fd7\u7c7b\u578b</th>\n                          <th>\u63a5\u53e3 / \u64cd\u4f5c</th>\n                          <th>\u7ed3\u679c</th>\n                          <th>\u534f\u8bae\u8f6c\u6362</th>\n                          <th>\u63a5\u53e3\u54cd\u5e94</th>\n                          <th>\u8017\u65f6</th>\n                          <th>\u64cd\u4f5c</th>\n                        </tr>\n                      </thead>\n                      <tbody id=\"logTableBody\"></tbody>\n                    </table>\n                  </div>\n                </div>\n              </div>\n            </section>\n\n            <section class=\"screen\" id=\"screen-protocol-logs\">\n              <div class=\"panel\">\n                <div class=\"panel-header\">\n                  <div>\n                    <h2>\u8f6c\u6362\u65e5\u5fd7</h2>\n                    <p class=\"section-copy\">\u65e5\u5fd7\u5ba1\u8ba1\u4e2d\u5fc3 &gt; \u8f6c\u6362\u65e5\u5fd7\u3002\u67e5\u8be2\u6240\u6709 API \u7684\u534f\u8bae\u8f6c\u6362\u8bb0\u5f55\uff0c\u53ef\u6309\u5e73\u53f0\u3001API\u3001\u534f\u8bae\u8f6c\u6362\u7c7b\u578b\u548c\u7ed3\u679c\u7b5b\u9009\u3002</p>\n                  </div>\n                  <div class=\"action-row\">\n                    <button type=\"button\" class=\"button secondary\" data-nav=\"call-logs\">\u67e5\u770b\u8c03\u7528\u65e5\u5fd7</button>\n                    <button type=\"button\" class=\"button brand\" id=\"openProtocolMonitor\">\u67e5\u770b\u534f\u8bae\u8f6c\u6362\u76d1\u63a7</button>\n                  </div>\n                </div>\n                <div class=\"list-card\">\n                  <div class=\"filter-bar\" style=\"grid-template-columns: repeat(4, minmax(0, 1fr)) auto auto;\">\n                    <div class=\"field\">\n                      <label for=\"protocolLogPlatformFilter\">\u5e73\u53f0</label>\n                      <select id=\"protocolLogPlatformFilter\"></select>\n                    </div>\n                    <div class=\"field\">\n                      <label for=\"protocolLogApiFilter\">API</label>\n                      <select id=\"protocolLogApiFilter\"></select>\n                    </div>\n                    <div class=\"field\">\n                      <label for=\"protocolLogTypeFilter\">\u534f\u8bae\u8f6c\u6362\u7c7b\u578b</label>\n                      <select id=\"protocolLogTypeFilter\">\n                        <option value=\"\">\u5168\u90e8\u7c7b\u578b</option>\n                        <option value=\"\u5b8c\u6574\u94fe\u8def\">\u5b8c\u6574\u94fe\u8def</option>\n                        <option value=\"\u8c03\u7528\u5165\u53c2\u8f6c\u6362\">\u8c03\u7528\u5165\u53c2\u8f6c\u6362</option>\n                        <option value=\"\u8c03\u7528\u8fd4\u56de\u8f6c\u6362\">\u8c03\u7528\u8fd4\u56de\u8f6c\u6362</option>\n                      </select>\n                    </div>\n                    <div class=\"field\">\n                      <label for=\"protocolLogResultFilter\">\u7ed3\u679c</label>\n                      <select id=\"protocolLogResultFilter\">\n                        <option value=\"\">\u5168\u90e8\u7ed3\u679c</option>\n                        <option value=\"\u6210\u529f\">\u6210\u529f</option>\n                        <option value=\"\u5931\u8d25\">\u5931\u8d25</option>\n                      </select>\n                    </div>\n                    <button type=\"button\" class=\"button secondary\" id=\"resetProtocolLogs\">\u91cd\u7f6e</button>\n                    <button type=\"button\" class=\"button brand\" id=\"queryProtocolLogs\">\u67e5\u8be2</button>\n                  </div>\n                </div>\n                <div class=\"panel flat\">\n                  <div class=\"table-shell\">\n                    <table>\n                      <thead>\n                        <tr>\n                          <th>\u65f6\u95f4</th>\n                          <th>\u5e73\u53f0</th>\n                          <th>API</th>\n                          <th>\u8f6c\u6362\u7c7b\u578b</th>\n                          <th>\u7ed3\u679c</th>\n                          <th>\u8017\u65f6</th>\n                          <th>\u64cd\u4f5c</th>\n                        </tr>\n                      </thead>\n                      <tbody id=\"protocolLogTableBody\"></tbody>\n                    </table>\n                  </div>\n                </div>\n              </div>\n            </section>\n          </main>\n        </div>\n\n        <div class=\"overlay\" id=\"overlay\"></div>\n        <aside class=\"drawer\" id=\"drawer\">\n          <div class=\"drawer-header\">\n            <div>\n              <div class=\"eyebrow\" id=\"drawerEyebrow\">Detail</div>\n              <h3 id=\"drawerTitle\" class=\"section-title\">\u8be6\u60c5</h3>\n            </div>\n            <button type=\"button\" class=\"button secondary mobile-only\" id=\"closeDrawerMobile\">\u5173\u95ed</button>\n            <button type=\"button\" class=\"button ghost\" id=\"closeDrawer\">\u5173\u95ed</button>\n          </div>\n          <div class=\"drawer-body\" id=\"drawerBody\"></div>\n        </aside>\n\n        <div class=\"toast-stack\" id=\"toastStack\"></div>\n      </div>";

(function(){
  const mount = document.getElementById("extMount");
  if (!mount) return;
  if (!mount.querySelector("#extApp")) {
    mount.innerHTML = extTemplateHTML;
  }
  mount.classList.add("is-ready");
  mount.classList.remove("is-loading");
})();
(function(){
  const dataStore = {
        platforms: [
          {
            id: 'P001',
            code: 'P001',
            name: '储能示例平台',
            vendor: '能云科技',
            type: '储能平台',
            modes: ['主动拉取', '主动控制'],
            auth: 'API Key',
            syncType: '增量 + 控制',
            status: '已启用',
            alarms: 2,
            health: 96,
            successRate: 98.9,
            lastSync: '今天 10:20',
            testResult: '通过',
            owner: '张磊',
            env: '生产',
            version: 'v3.2',
            support: '企业微信',
            desc: '面向储能站点，提供设备点位、告警状态与控制接口。',
            baseUrl: 'https://partner-east-storage.example.com',
            appId: 'east-storage-prod',
            apiKey: 'SK_8H4D2MPL91',
            keyRotatedAt: '2026-03-18',
            callStrategies: [
              { id: 'STR-FAST', name: '快速轮询策略', timeout: '5 秒', retry: '2 次', circuit: '连续 5 次失败熔断 15 分钟', healthCheck: '10 分钟' },
              { id: 'STR-STABLE', name: '稳态全量策略', timeout: '8 秒', retry: '1 次', circuit: '连续 3 次失败告警', healthCheck: '30 分钟' },
              { id: 'STR-CTRL', name: '控制优先策略', timeout: '4 秒', retry: '1 次', circuit: '超时立即告警', healthCheck: '5 分钟' }
            ],
            callTasks: [
              { id: 'TASK-RT-SYNC', name: '实时点位采集', strategyRef: 'STR-FAST', apiCodes: ['API-RT-01'], triggerMode: '固定频率', frequency: '每 5 分钟', cron: '0 */5 * * * ?', status: '启用', window: '全天', note: '持续拉取设备实时点位，供监控与分析使用。' },
              { id: 'TASK-EQ-FULL', name: '设备清单全量同步', strategyRef: 'STR-STABLE', apiCodes: ['API-EQ-02'], triggerMode: '定时调用', frequency: '每日 02:00', cron: '0 0 2 * * ?', status: '启用', window: '02:00-03:00', note: '每日全量校准设备台账与模型信息。' },
              { id: 'TASK-CTRL-CHECK', name: '控制结果回查', strategyRef: 'STR-CTRL', apiCodes: ['API-CTRL-03'], triggerMode: '固定频率', frequency: '每 1 分钟', cron: '0 */1 * * * ?', status: '停用', window: '控制窗口内', note: '控制场景启用后执行回执回查。' }
            ],
            apis: [
              { code: 'API-RT-01', name: '拉取设备实时点位', category: '点位数据', method: 'GET', path: '/api/v1/device/points', subUrl: '/api/v1/device/points', strategy: '增量 / 5 分钟', strategyRef: 'STR-FAST', success: '98.7%' },
              { code: 'API-EQ-02', name: '拉取设备清单', category: '设备数据', method: 'GET', path: '/api/v1/devices', subUrl: '/api/v1/devices', strategy: '全量 / 每日', strategyRef: 'STR-STABLE', success: '99.5%' },
              { code: 'API-CTRL-03', name: '下发有功功率控制', category: '控制点位', method: 'POST', path: '/api/v1/control/power', subUrl: '/api/v1/control/power', strategy: '实时 / 控制', strategyRef: 'STR-CTRL', success: '97.8%' }
            ]
          },
          {
            id: 'P002',
            code: 'P002',
            name: '北方逆变器开放平台',
            vendor: '北辰逆变器',
            type: '逆变器平台',
            modes: ['标准开放'],
            auth: 'App + Key',
            syncType: '开放接入',
            status: '已启用',
            alarms: 0,
            health: 99,
            successRate: 99.7,
            lastSync: '第三方主动推送',
            testResult: '通过',
            owner: '高峰',
            env: '生产',
            version: 'v2.6',
            support: '邮件',
            desc: '第三方按标准 API 接入，主要上报站级和设备级数据。',
            baseUrl: 'https://open.north-inverter.example.com',
            appId: 'north-open-plat',
            apiKey: 'SK_3D8MOPEN66',
            keyRotatedAt: '2026-03-12',
            callStrategies: [
              { id: 'STR-OPEN', name: '开放接入策略', timeout: '6 秒', retry: '1 次', circuit: '连续 3 次失败触发告警', healthCheck: '15 分钟' }
            ],
            callTasks: [],
            apis: []
          },
          {
            id: 'P003',
            code: 'P003',
            name: '华南聚合商测试平台',
            vendor: '聚合智联',
            type: '聚合平台',
            modes: ['主动拉取'],
            auth: 'OAuth2.0',
            syncType: '全量 + 增量',
            status: '待验证',
            alarms: 1,
            health: 83,
            successRate: 94.2,
            lastSync: '今天 09:40',
            testResult: '未完成',
            owner: '王宁',
            env: '测试',
            version: 'v1.4',
            support: '电话',
            desc: '新接入测试平台，当前处于参数联调阶段。',
            baseUrl: 'https://south-agg-test.example.com',
            appId: 'south-agg-test',
            apiKey: 'SK_2MTEST8890',
            keyRotatedAt: '2026-03-08',
            callStrategies: [
              { id: 'STR-TEST', name: '测试联调策略', timeout: '10 秒', retry: '2 次', circuit: '连续 2 次失败提示人工检查', healthCheck: '60 分钟' }
            ],
            callTasks: [
              { id: 'TASK-PLANT-FULL', name: '电站清单联调任务', strategyRef: 'STR-TEST', apiCodes: ['API-PLANT-01'], triggerMode: '定时调用', frequency: '每日 09:00', cron: '0 0 9 * * ?', status: '启用', window: '09:00-10:00', note: '联调期每日拉取一次电站清单，核对站级模型。' },
              { id: 'TASK-ALARM-INC', name: '告警增量拉取', strategyRef: 'STR-TEST', apiCodes: ['API-STATUS-02'], triggerMode: '固定频率', frequency: '每 10 分钟', cron: '0 */10 * * * ?', status: '启用', window: '全天', note: '用于测试环境告警状态增量验证。' }
            ],
            apis: [
              { code: 'API-PLANT-01', name: '拉取电站清单', category: '电站数据', method: 'GET', path: '/open/v2/plants', subUrl: '/open/v2/plants', strategy: '全量 / 每日', strategyRef: 'STR-TEST', success: '95.6%' },
              { code: 'API-STATUS-02', name: '拉取告警状态', category: '状态类接口', method: 'GET', path: '/open/v2/alarm/status', subUrl: '/open/v2/alarm/status', strategy: '增量 / 10 分钟', strategyRef: 'STR-TEST', success: '92.8%' }
            ]
          },
          {
            id: 'P004',
            code: 'P004',
            name: '区域 EMS 联控',
            vendor: '智控能源',
            type: 'EMS平台',
            modes: ['标准开放', '主动控制'],
            auth: '证书认证',
            syncType: '控制为主',
            status: '异常',
            alarms: 4,
            health: 71,
            successRate: 88.1,
            lastSync: '今天 10:03',
            testResult: '失败',
            owner: '周锐',
            env: '生产',
            version: 'v4.0',
            support: '工单系统',
            desc: '区域联控平台，控制链路稳定性存在波动。',
            baseUrl: 'https://regional-ems.example.com',
            appId: 'regional-ems',
            apiKey: 'CERT_MODE',
            keyRotatedAt: '2026-03-02',
            callStrategies: [
              { id: 'STR-EMS-CTRL', name: '区域控制策略', timeout: '4 秒', retry: '1 次', circuit: '超时立即告警并尝试备用链路', healthCheck: '5 分钟' }
            ],
            callTasks: [
              { id: 'TASK-EMS-CTRL', name: '联控模式切换任务', strategyRef: 'STR-EMS-CTRL', apiCodes: ['API-CTRL-01'], triggerMode: '定时调用', frequency: '每日 07:30', cron: '0 30 7 * * ?', status: '停用', window: '07:00-08:00', note: '仅在调峰场景下启用，当前因链路异常临时停用。' }
            ],
            apis: [
              { code: 'API-CTRL-01', name: '模式切换', category: '控制点位', method: 'POST', path: '/control/mode', subUrl: '/control/mode', strategy: '实时 / 控制', strategyRef: 'STR-EMS-CTRL', success: '88.1%' }
            ]
          }
        ],
        metrics: [
          { label: '已启用平台', value: '2', trend: '生产平台稳定运行中' },
          { label: '待验证平台', value: '1', trend: '新平台等待首轮联调' },
          { label: '异常平台', value: '1', trend: '需优先处理控制链路问题' },
          { label: '今日同步失败', value: '17', trend: '较昨日下降 11%' },
          { label: '今日告警数', value: '9', trend: '2 条尚未关闭' }
        ],
        internalStationModels: [
          { modelName: '电站模型', fieldName: '电站编码', fieldCode: 'stationCode', fieldType: 'string', unit: '-', desc: '电站唯一标识' },
          { modelName: '电站模型', fieldName: '电站名称', fieldCode: 'stationName', fieldType: 'string', unit: '-', desc: '平台标准电站名称' },
          { modelName: '电站模型', fieldName: '装机容量', fieldCode: 'capacity', fieldType: 'number', unit: 'MW', desc: '电站额定装机容量' },
          { modelName: '电站模型', fieldName: '时区', fieldCode: 'timezone', fieldType: 'string', unit: '-', desc: '站点时区编码' }
        ],
        internalDeviceModels: [
          { modelName: '设备模型', fieldName: '设备编码', fieldCode: 'deviceCode', fieldType: 'string', unit: '-', desc: '设备唯一标识' },
          { modelName: '设备模型', fieldName: '额定功率', fieldCode: 'ratedPower', fieldType: 'number', unit: 'kW', desc: '设备额定输出功率' },
          { modelName: '设备模型', fieldName: '运行状态', fieldCode: 'runningStatus', fieldType: 'enum', unit: '-', desc: '设备运行状态枚举值' },
          { modelName: '设备模型', fieldName: '故障编码', fieldCode: 'faultCode', fieldType: 'string', unit: '-', desc: '设备故障码' }
        ],
        internalPointModels: [
          { modelName: '点位模型', fieldName: '有功功率', fieldCode: 'activePower', fieldType: 'number', unit: 'kW', access: '只读', desc: '设备有功功率点位' },
          { modelName: '点位模型', fieldName: 'SOC', fieldCode: 'soc', fieldType: 'number', unit: '%', access: '只读', desc: '电池荷电状态点位' },
          { modelName: '点位模型', fieldName: '温度', fieldCode: 'temperature', fieldType: 'number', unit: 'C', access: '只读', desc: '设备温度点位' },
          { modelName: '点位模型', fieldName: '告警等级', fieldCode: 'alarmLevel', fieldType: 'enum', unit: '-', access: '只读', desc: '告警等级枚举点位' }
        ],
        internalControlModels: [
          {
            templateName: '有功功率控制模板',
            templateCode: 'CTRL-ACTIVE-POWER',
            inputParams: [
              { name: '设备编码', code: 'deviceCode', type: 'string', unit: '-' },
              { name: '控制功率', code: 'activePower', type: 'number', unit: 'kW' },
              { name: '请求流水号', code: 'requestId', type: 'string', unit: '-' }
            ],
            outputParams: [
              { name: '控制任务编号', code: 'controlTaskId', type: 'string', unit: '-' },
              { name: '是否接收', code: 'accepted', type: 'boolean', unit: '-' },
              { name: '结果码', code: 'resultCode', type: 'string', unit: '-' }
            ]
          },
          {
            templateName: '运行模式切换模板',
            templateCode: 'CTRL-SWITCH-MODE',
            inputParams: [
              { name: '设备编码', code: 'deviceCode', type: 'string', unit: '-' },
              { name: '目标模式', code: 'targetMode', type: 'enum', unit: '-' },
              { name: '请求流水号', code: 'requestId', type: 'string', unit: '-' }
            ],
            outputParams: [
              { name: '执行状态', code: 'executeStatus', type: 'string', unit: '-' },
              { name: '回执消息', code: 'message', type: 'string', unit: '-' },
              { name: '结果码', code: 'resultCode', type: 'string', unit: '-' }
            ]
          }
        ],
        mappingVersions: [
          {
            id: 'MAP-V2.3',
            version: 'v2.3',
            status: '已发布',
            createdAt: '2026-03-18 11:20',
            publishedAt: '2026-03-18 14:30',
            creator: '陈薇',
            note: '补齐控制指令模型，并统一点位单位标准。',
            summary: '电站字段 4 个 / 设备字段 4 个 / 点位字段 4 个 / 控制模板 2 个',
            snapshot: {
              station: [
                { modelName: '电站模型', fieldName: '电站编码', fieldCode: 'stationCode', fieldType: 'string', unit: '-', desc: '电站唯一标识' },
                { modelName: '电站模型', fieldName: '电站名称', fieldCode: 'stationName', fieldType: 'string', unit: '-', desc: '平台标准电站名称' },
                { modelName: '电站模型', fieldName: '装机容量', fieldCode: 'capacity', fieldType: 'number', unit: 'MW', desc: '电站额定装机容量' },
                { modelName: '电站模型', fieldName: '时区', fieldCode: 'timezone', fieldType: 'string', unit: '-', desc: '站点时区编码' }
              ],
              device: [
                { modelName: '设备模型', fieldName: '设备编码', fieldCode: 'deviceCode', fieldType: 'string', unit: '-', desc: '设备唯一标识' },
                { modelName: '设备模型', fieldName: '额定功率', fieldCode: 'ratedPower', fieldType: 'number', unit: 'kW', desc: '设备额定输出功率' },
                { modelName: '设备模型', fieldName: '运行状态', fieldCode: 'runningStatus', fieldType: 'enum', unit: '-', desc: '设备运行状态枚举值' },
                { modelName: '设备模型', fieldName: '故障编码', fieldCode: 'faultCode', fieldType: 'string', unit: '-', desc: '设备故障码' }
              ],
              point: [
                { modelName: '点位模型', fieldName: '有功功率', fieldCode: 'activePower', fieldType: 'number', unit: 'kW', access: '只读', desc: '设备有功功率点位' },
                { modelName: '点位模型', fieldName: 'SOC', fieldCode: 'soc', fieldType: 'number', unit: '%', access: '只读', desc: '电池荷电状态点位' },
                { modelName: '点位模型', fieldName: '温度', fieldCode: 'temperature', fieldType: 'number', unit: 'C', access: '只读', desc: '设备温度点位' },
                { modelName: '点位模型', fieldName: '告警等级', fieldCode: 'alarmLevel', fieldType: 'enum', unit: '-', access: '只读', desc: '告警等级枚举点位' }
              ],
              control: [
                {
                  templateName: '有功功率控制模板',
                  templateCode: 'CTRL-ACTIVE-POWER',
                  inputParams: [
                    { name: '设备编码', code: 'deviceCode', type: 'string', unit: '-' },
                    { name: '控制功率', code: 'activePower', type: 'number', unit: 'kW' },
                    { name: '请求流水号', code: 'requestId', type: 'string', unit: '-' }
                  ],
                  outputParams: [
                    { name: '控制任务编号', code: 'controlTaskId', type: 'string', unit: '-' },
                    { name: '是否接收', code: 'accepted', type: 'boolean', unit: '-' },
                    { name: '结果码', code: 'resultCode', type: 'string', unit: '-' }
                  ]
                },
                {
                  templateName: '运行模式切换模板',
                  templateCode: 'CTRL-SWITCH-MODE',
                  inputParams: [
                    { name: '设备编码', code: 'deviceCode', type: 'string', unit: '-' },
                    { name: '目标模式', code: 'targetMode', type: 'enum', unit: '-' },
                    { name: '请求流水号', code: 'requestId', type: 'string', unit: '-' }
                  ],
                  outputParams: [
                    { name: '执行状态', code: 'executeStatus', type: 'string', unit: '-' },
                    { name: '回执消息', code: 'message', type: 'string', unit: '-' },
                    { name: '结果码', code: 'resultCode', type: 'string', unit: '-' }
                  ]
                }
              ]
            }
          },
          {
            id: 'MAP-V2.2',
            version: 'v2.2',
            status: '历史版本',
            createdAt: '2026-03-05 15:10',
            publishedAt: '2026-03-05 18:00',
            creator: '陈薇',
            note: '完成设备模型和电站模型拆分。',
            summary: '电站字段 3 个 / 设备字段 3 个 / 点位字段 3 个 / 控制模板 1 个',
            snapshot: {
              station: [
                { modelName: '电站模型', fieldName: '电站编码', fieldCode: 'stationCode', fieldType: 'string', unit: '-', desc: '电站唯一标识' },
                { modelName: '电站模型', fieldName: '电站名称', fieldCode: 'stationName', fieldType: 'string', unit: '-', desc: '平台标准电站名称' },
                { modelName: '电站模型', fieldName: '时区', fieldCode: 'timezone', fieldType: 'string', unit: '-', desc: '站点时区编码' }
              ],
              device: [
                { modelName: '设备模型', fieldName: '设备编码', fieldCode: 'deviceCode', fieldType: 'string', unit: '-', desc: '设备唯一标识' },
                { modelName: '设备模型', fieldName: '额定功率', fieldCode: 'ratedPower', fieldType: 'number', unit: 'kW', desc: '设备额定输出功率' },
                { modelName: '设备模型', fieldName: '运行状态', fieldCode: 'runningStatus', fieldType: 'enum', unit: '-', desc: '设备运行状态枚举值' }
              ],
              point: [
                { modelName: '点位模型', fieldName: '有功功率', fieldCode: 'activePower', fieldType: 'number', unit: 'kW', access: '只读', desc: '设备有功功率点位' },
                { modelName: '点位模型', fieldName: 'SOC', fieldCode: 'soc', fieldType: 'number', unit: '%', access: '只读', desc: '电池荷电状态点位' },
                { modelName: '点位模型', fieldName: '温度', fieldCode: 'temperature', fieldType: 'number', unit: 'C', access: '只读', desc: '设备温度点位' }
              ],
              control: [
                {
                  templateName: '运行模式切换模板',
                  templateCode: 'CTRL-SWITCH-MODE',
                  inputParams: [
                    { name: '设备编码', code: 'deviceCode', type: 'string', unit: '-' },
                    { name: '目标模式', code: 'targetMode', type: 'enum', unit: '-' }
                  ],
                  outputParams: [
                    { name: '执行状态', code: 'executeStatus', type: 'string', unit: '-' },
                    { name: '结果码', code: 'resultCode', type: 'string', unit: '-' }
                  ]
                }
              ]
            }
          }
        ],
        unitConversionRules: [
          {
            id: 'RULE-UNIT-01',
            platformId: 'P001',
            name: '温度单位换算',
            sourceUnitName: '华氏度',
            sourceUnitCode: 'F',
            targetUnitName: '摄氏度',
            targetUnitCode: 'C',
            formula: '(value - 32) / 1.8',
            updatedAt: '2026-03-24 09:20',
            note: '温度点位统一换算为平台标准摄氏度。'
          },
          {
            id: 'RULE-UNIT-02',
            platformId: 'P001',
            name: '功率单位换算',
            sourceUnitName: '瓦',
            sourceUnitCode: 'W',
            targetUnitName: '千瓦',
            targetUnitCode: 'kW',
            formula: 'value / 1000',
            updatedAt: '2026-03-22 16:45',
            note: '功率点位统一按千瓦输出。'
          },
          {
            id: 'RULE-UNIT-03',
            platformId: 'P003',
            name: '电量单位换算',
            sourceUnitName: '瓦时',
            sourceUnitCode: 'Wh',
            targetUnitName: '千瓦时',
            targetUnitCode: 'kWh',
            formula: 'value / 1000',
            updatedAt: '2026-03-21 14:10',
            note: '华南聚合商测试平台统一将电量字段转换为千瓦时。'
          }
        ],
        timezoneConversionRules: [
          {
            id: 'RULE-TZ-01',
            platformId: 'P001',
            name: 'UTC 转平台时区',
            sourceTimezoneName: '协调世界时',
            sourceTimezoneCode: 'UTC',
            targetTimezoneName: '中国标准时间',
            targetTimezoneCode: 'UTC+8',
            formula: 'datetime + 8h',
            updatedAt: '2026-03-20 19:10',
            note: '所有第三方 UTC 时间统一转为平台默认展示时区。'
          },
          {
            id: 'RULE-TZ-02',
            platformId: 'P001',
            name: '欧洲中部时间转平台时区',
            sourceTimezoneName: '中欧时间',
            sourceTimezoneCode: 'CET',
            targetTimezoneName: '中国标准时间',
            targetTimezoneCode: 'UTC+8',
            formula: 'datetime + 7h / 夏令时 + 6h',
            updatedAt: '2026-03-21 13:40',
            note: '兼容欧洲站点历史数据时区转换。'
          },
          {
            id: 'RULE-TZ-03',
            platformId: 'P003',
            name: '站点时区直连映射',
            sourceTimezoneName: '平台时区',
            sourceTimezoneCode: 'UTC+8',
            targetTimezoneName: '中国标准时间',
            targetTimezoneCode: 'UTC+8',
            formula: 'datetime + 0h',
            updatedAt: '2026-03-23 09:05',
            note: '华南聚合商测试平台时区字段直接透传。'
          }
        ],
        statusCodeConversionRules: [
          {
            id: 'RULE-STATUS-01',
            platformId: 'P001',
            name: '设备运行状态映射',
            sourceFieldName: '设备状态',
            sourceFieldCode: 'device_status',
            targetFieldName: '运行状态',
            targetFieldCode: 'runningStatus',
            mappings: [
              { source: 'RUNNING', target: '运行中' },
              { source: 'FAULT', target: '故障' },
              { source: 'STANDBY', target: '待机' }
            ],
            updatedAt: '2026-03-24 10:12',
            note: '第三方设备状态统一映射为平台标准设备运行状态。'
          },
          {
            id: 'RULE-STATUS-02',
            platformId: 'P001',
            name: '告警级别映射',
            sourceFieldName: '告警级别',
            sourceFieldCode: 'alarm_level',
            targetFieldName: '事件等级',
            targetFieldCode: 'eventLevel',
            mappings: [
              { source: '1', target: '提示' },
              { source: '2', target: '一般' },
              { source: '3', target: '严重' }
            ],
            updatedAt: '2026-03-23 18:30',
            note: '告警级别统一转换为平台事件等级。'
          },
          {
            id: 'RULE-STATUS-03',
            platformId: 'P003',
            name: '聚合商设备状态映射',
            sourceFieldName: '设备状态',
            sourceFieldCode: 'device_state',
            targetFieldName: '运行状态',
            targetFieldCode: 'runningStatus',
            mappings: [
              { source: 'ONLINE', target: '运行中' },
              { source: 'OFFLINE', target: '离线' },
              { source: 'ALARM', target: '故障' }
            ],
            updatedAt: '2026-03-24 08:40',
            note: '华南聚合商测试平台设备状态统一映射到内部运行状态。'
          }
        ],
        aggregationConversionRules: [
          {
            id: 'RULE-AGG-01',
            platformId: 'P001',
            name: '三相有功功率聚合',
            sourceFieldNames: 'A 相有功功率、B 相有功功率、C 相有功功率',
            sourceFieldCodes: 'pa,pb,pc',
            targetFieldName: '总有功功率',
            targetFieldCode: 'activePower',
            formula: 'pa + pb + pc',
            updatedAt: '2026-03-22 11:05',
            note: '对多路原始功率字段进行汇总后输出平台统一功率字段。'
          },
          {
            id: 'RULE-AGG-02',
            platformId: 'P001',
            name: '电池簇 SOC 均值聚合',
            sourceFieldNames: '簇 1 SOC、簇 2 SOC、簇 3 SOC',
            sourceFieldCodes: 'soc_1,soc_2,soc_3',
            targetFieldName: '电池簇平均 SOC',
            targetFieldCode: 'soc',
            formula: '(soc_1 + soc_2 + soc_3) / 3',
            updatedAt: '2026-03-19 15:50',
            note: '对多簇 SOC 点位做平均聚合。'
          },
          {
            id: 'RULE-AGG-03',
            platformId: 'P003',
            name: '双路功率聚合',
            sourceFieldNames: '主路功率、副路功率',
            sourceFieldCodes: 'power_main,power_backup',
            targetFieldName: '总有功功率',
            targetFieldCode: 'activePower',
            formula: 'power_main + power_backup',
            updatedAt: '2026-03-20 16:25',
            note: '华南聚合商测试平台将双路功率字段聚合为标准功率字段。'
          }
        ],
        stationMappings: [
          {
            id: 'ST-MAP-01',
            platformId: 'P001',
            versionId: 'MAP-V2.3',
            modelName: '电站模型',
            internalFieldName: '电站编码',
            internalFieldCode: 'stationCode',
            externalFieldName: '场站编号',
            externalFieldCode: 'plant_code',
            ruleRef: '',
            relation: '一对一'
          },
          {
            id: 'ST-MAP-02',
            platformId: 'P001',
            versionId: 'MAP-V2.3',
            modelName: '电站模型',
            internalFieldName: '电站名称',
            internalFieldCode: 'stationName',
            externalFieldName: '场站名称',
            externalFieldCode: 'plant_name',
            ruleRef: '',
            relation: '一对一'
          },
          {
            id: 'ST-MAP-03',
            platformId: 'P001',
            versionId: 'MAP-V2.3',
            modelName: '电站模型',
            internalFieldName: '时区',
            internalFieldCode: 'timezone',
            externalFieldName: '站点时区',
            externalFieldCode: 'tz',
            ruleRef: 'timezone:RULE-TZ-01',
            relation: '一对一'
          },
          {
            id: 'ST-MAP-11',
            platformId: 'P003',
            versionId: 'MAP-V2.3',
            modelName: '电站模型',
            internalFieldName: '电站编码',
            internalFieldCode: 'stationCode',
            externalFieldName: '电站ID',
            externalFieldCode: 'station_id',
            ruleRef: '',
            relation: '一对一'
          },
          {
            id: 'ST-MAP-12',
            platformId: 'P003',
            versionId: 'MAP-V2.3',
            modelName: '电站模型',
            internalFieldName: '时区',
            internalFieldCode: 'timezone',
            externalFieldName: '站点时区',
            externalFieldCode: 'station_timezone',
            ruleRef: 'timezone:RULE-TZ-03',
            relation: '一对一'
          }
        ],
        deviceMappings: [
          {
            id: 'DEV-MAP-01',
            platformId: 'P001',
            versionId: 'MAP-V2.3',
            modelName: '设备模型',
            internalFieldName: '设备编码',
            internalFieldCode: 'deviceCode',
            externalFieldName: '设备编号',
            externalFieldCode: 'device_sn',
            ruleRef: '',
            relation: '一对一'
          },
          {
            id: 'DEV-MAP-02',
            platformId: 'P001',
            versionId: 'MAP-V2.3',
            modelName: '设备模型',
            internalFieldName: '运行状态',
            internalFieldCode: 'runningStatus',
            externalFieldName: '设备状态',
            externalFieldCode: 'device_status',
            ruleRef: 'status:RULE-STATUS-01',
            relation: '一对一'
          },
          {
            id: 'DEV-MAP-03',
            platformId: 'P001',
            versionId: 'MAP-V2.3',
            modelName: '设备模型',
            internalFieldName: 'SOC',
            internalFieldCode: 'soc',
            externalFieldName: '电池荷电状态',
            externalFieldCode: 'battery_soc',
            ruleRef: 'unit:RULE-UNIT-02',
            relation: '一对一'
          },
          {
            id: 'DEV-MAP-11',
            platformId: 'P003',
            versionId: 'MAP-V2.3',
            modelName: '设备模型',
            internalFieldName: '设备编码',
            internalFieldCode: 'deviceCode',
            externalFieldName: '设备ID',
            externalFieldCode: 'asset_id',
            ruleRef: '',
            relation: '一对一'
          },
          {
            id: 'DEV-MAP-12',
            platformId: 'P003',
            versionId: 'MAP-V2.3',
            modelName: '设备模型',
            internalFieldName: '运行状态',
            internalFieldCode: 'runningStatus',
            externalFieldName: '设备状态',
            externalFieldCode: 'device_state',
            ruleRef: 'status:RULE-STATUS-03',
            relation: '一对一'
          }
        ],
        pointMappings: [
          {
            id: 'POINT-MAP-01',
            platformId: 'P001',
            versionId: 'MAP-V2.3',
            modelName: '点位模型',
            internalFieldName: '有功功率',
            internalFieldCode: 'activePower',
            externalFieldName: '功率值',
            externalFieldCode: 'p_active',
            ruleRef: 'unit:RULE-UNIT-02',
            aggregateRuleId: '',
            relation: '一对一'
          },
          {
            id: 'POINT-MAP-02',
            platformId: 'P001',
            versionId: 'MAP-V2.3',
            modelName: '点位模型',
            internalFieldName: '温度',
            internalFieldCode: 'temperature',
            externalFieldName: '设备温度',
            externalFieldCode: 'temp_f',
            ruleRef: 'unit:RULE-UNIT-01',
            aggregateRuleId: '',
            relation: '一对一'
          },
          {
            id: 'POINT-MAP-03',
            platformId: 'P001',
            versionId: 'MAP-V2.3',
            modelName: '点位模型',
            internalFieldName: 'SOC',
            internalFieldCode: 'soc',
            externalFieldName: '簇 SOC 组合',
            externalFieldCode: 'soc_1,soc_2,soc_3',
            ruleRef: '',
            aggregateRuleId: 'RULE-AGG-02',
            relation: '一对多'
          },
          {
            id: 'POINT-MAP-11',
            platformId: 'P003',
            versionId: 'MAP-V2.3',
            modelName: '点位模型',
            internalFieldName: '有功功率',
            internalFieldCode: 'activePower',
            externalFieldName: '双路功率',
            externalFieldCode: 'power_main,power_backup',
            ruleRef: '',
            aggregateRuleId: 'RULE-AGG-03',
            relation: '一对多'
          },
          {
            id: 'POINT-MAP-12',
            platformId: 'P003',
            versionId: 'MAP-V2.3',
            modelName: '点位模型',
            internalFieldName: 'SOC',
            internalFieldCode: 'soc',
            externalFieldName: '簇电量',
            externalFieldCode: 'soc_wh',
            ruleRef: 'unit:RULE-UNIT-03',
            aggregateRuleId: '',
            relation: '一对一'
          }
        ],
        controlMappings: [
          {
            id: 'CTRL-MAP-01',
            platformId: 'P001',
            name: '有功功率控制映射',
            status: '已启用',
            apiCode: 'API-CTRL-03',
            standard: {
              name: '有功功率控制',
              code: 'setActivePower'
            },
            partner: {
              name: '下发有功功率',
              code: 'set_power_w'
            },
            inputMappings: [
              {
                internal: { name: '设备编码', code: 'deviceCode', type: 'string', unit: '-' },
                external: { name: '设备编号', code: 'device_sn', type: 'string', unit: '-' }
              },
              {
                internal: { name: '有功功率', code: 'activePower', type: 'number', unit: 'kW' },
                external: { name: '设置功率', code: 'set_power_w', type: 'number', unit: 'W' }
              },
              {
                internal: { name: '请求流水号', code: 'requestId', type: 'string', unit: '-' },
                external: { name: '请求编号', code: 'request_id', type: 'string', unit: '-' }
              }
            ],
            outputMappings: [
              {
                internal: { name: '控制任务编号', code: 'controlTaskId', type: 'string', unit: '-' },
                external: { name: '任务编号', code: 'task_id', type: 'string', unit: '-' }
              },
              {
                internal: { name: '是否接收', code: 'accepted', type: 'boolean', unit: '-' },
                external: { name: '是否接收', code: 'accepted', type: 'boolean', unit: '-' }
              },
              {
                internal: { name: '结果码', code: 'resultCode', type: 'string', unit: '-' },
                external: { name: '响应码', code: 'code', type: 'string', unit: '-' }
              }
            ]
          },
          {
            id: 'CTRL-MAP-02',
            platformId: 'P001',
            name: '运行模式切换映射',
            status: '已启用',
            apiCode: 'API-CTRL-01',
            standard: {
              name: '运行模式切换',
              code: 'switchMode'
            },
            partner: {
              name: '模式切换',
              code: 'set_mode'
            },
            inputMappings: [
              {
                internal: { name: '设备编码', code: 'deviceCode', type: 'string', unit: '-' },
                external: { name: '设备编号', code: 'eq_code', type: 'string', unit: '-' }
              },
              {
                internal: { name: '目标模式', code: 'targetMode', type: 'enum', unit: '-' },
                external: { name: '模式编码', code: 'mode', type: 'enum', unit: '-' }
              },
              {
                internal: { name: '请求流水号', code: 'requestId', type: 'string', unit: '-' },
                external: { name: '请求编号', code: 'request_id', type: 'string', unit: '-' }
              }
            ],
            outputMappings: [
              {
                internal: { name: '执行状态', code: 'executeStatus', type: 'string', unit: '-' },
                external: { name: '状态', code: 'status', type: 'string', unit: '-' }
              },
              {
                internal: { name: '回执消息', code: 'message', type: 'string', unit: '-' },
                external: { name: '消息', code: 'msg', type: 'string', unit: '-' }
              },
              {
                internal: { name: '结果码', code: 'resultCode', type: 'string', unit: '-' },
                external: { name: '响应码', code: 'code', type: 'string', unit: '-' }
              }
            ]
          }
        ],
        alerts: [
          {
            id: 'AL-001',
            platformId: 'P004',
            title: '设备控制接口连续超时',
            level: '高',
            type: '超时告警',
            status: '已通知',
            time: '2026-03-24 10:05',
            cause: '控制接口 P95 响应时间达到 5.6 秒，连续 3 次超时。',
            suggestion: '检查第三方控制网关性能，必要时临时熔断并切至备用链路。',
            owner: '运维值班组',
            strategy: '短信 + 站内信 + 10 分钟未恢复升级',
            channels: ['短信', '站内信'],
            phones: ['13800001111', '13900002222'],
            contacts: ['李工', '周值班'],
            notifiedAt: '2026-03-24 10:06',
            handledAt: '',
            closedAt: '',
            notifyMinutes: 1,
            handleMinutes: 0,
            closeMinutes: 0
          },
          {
            id: 'AL-002',
            platformId: 'P001',
            title: '增量同步数据量突增',
            level: '中',
            type: '同步异常',
            status: '已处理',
            time: '2026-03-24 09:48',
            cause: '最近 30 分钟数据量较基线提升 180%。',
            suggestion: '核查第三方是否补发历史数据，评估是否需要临时扩容转换线程池。',
            owner: '平台实施组',
            strategy: '短信 + 站内信 + 值班群通知',
            channels: ['短信', '站内信'],
            phones: ['13700003333'],
            contacts: ['王实施'],
            notifiedAt: '2026-03-24 09:49',
            handledAt: '2026-03-24 10:03',
            closedAt: '',
            notifyMinutes: 1,
            handleMinutes: 15,
            closeMinutes: 0
          },
          {
            id: 'AL-003',
            platformId: 'P003',
            title: 'OAuth Token 刷新失败',
            level: '中',
            type: '认证异常',
            status: '已关闭',
            time: '2026-03-24 08:36',
            cause: '测试环境 Token 地址返回 401，后续重试成功。',
            suggestion: '检查 client secret 是否近期变更。',
            owner: '联调负责人',
            strategy: '站内信 + 负责人确认关闭',
            channels: ['站内信'],
            phones: [],
            contacts: ['刘联调'],
            notifiedAt: '2026-03-24 08:37',
            handledAt: '2026-03-24 08:41',
            closedAt: '2026-03-24 08:52',
            notifyMinutes: 1,
            handleMinutes: 5,
            closeMinutes: 16
          },
          {
            id: 'AL-004',
            platformId: 'P002',
            title: '开放接口签名校验失败',
            level: '高',
            type: '非法调用',
            status: '已通知',
            time: '2026-03-24 07:58',
            cause: '外部来源 IP 未命中白名单且签名校验连续失败 8 次。',
            suggestion: '核查来源 IP、签名密钥和调用方配置，必要时临时封禁来源。',
            owner: '安全值班',
            strategy: '短信 + 站内信 + 安全人员升级',
            channels: ['短信', '站内信'],
            phones: ['13600004444'],
            contacts: ['赵安全'],
            notifiedAt: '2026-03-24 07:59',
            handledAt: '',
            closedAt: '',
            notifyMinutes: 1,
            handleMinutes: 0,
            closeMinutes: 0
          }
        ],
        alertRules: [
          {
            id: 'RULE-001',
            type: '超时告警',
            name: '接口超时连续触发规则',
            triggerCount: 3,
            durationSeconds: 300,
            trigger: '连续触发 3 次，持续 300 秒',
            strategy: '短信通知',
            phones: '13800001111',
            contacts: '李工',
            description: '同一 API 连续超时达到阈值后，立即短信通知值班人员跟进处理。',
            enabled: true
          },
          {
            id: 'RULE-002',
            type: '同步异常',
            name: '同步任务波动告警规则',
            triggerCount: 5,
            durationSeconds: 900,
            trigger: '连续触发 5 次，持续 900 秒',
            strategy: '站内信通知',
            phones: '13700003333',
            contacts: '王实施',
            description: '同步任务失败次数在 15 分钟内持续升高时，先通过站内信提醒实施同学。',
            enabled: true
          },
          {
            id: 'RULE-003',
            type: '认证异常',
            name: '认证失败升级告警规则',
            triggerCount: 2,
            durationSeconds: 1800,
            trigger: '连续触发 2 次，持续 1800 秒',
            strategy: '短信通知',
            phones: '13500005555',
            contacts: '刘联调',
            description: '认证异常连续出现后直接短信通知接口负责人，避免影响平台调用。',
            enabled: true
          },
          {
            id: 'RULE-004',
            type: '非法调用',
            name: '来源异常调用告警规则',
            triggerCount: 8,
            durationSeconds: 120,
            trigger: '连续触发 8 次，持续 120 秒',
            strategy: '站内信通知',
            phones: '13600004444',
            contacts: '赵安全',
            description: '短时间内出现异常调用或非法来源访问时，通过站内信同步安全值班跟进。',
            enabled: false
          }
        ],
        logs: [
          {
            id: 'LOG-001',
            time: '10:20:04',
            platform: '储能示例平台',
            apiCode: 'API-RT-01',
            apiCategory: '点位数据',
            type: '调用日志',
            transformType: '完整链路',
            action: 'GET /api/v1/device/points',
            result: '成功',
            duration: '182ms',
            latencyMs: 182,
            stageDurations: { protocolTransform: 24, interfaceResponse: 118, responseTransform: 40 },
            payload: {
              requestId: 'REQ-1001',
              params: { stationId: 'ST-001' },
              responseCode: 200,
              items: 36,
              standardRequest: { stationId: 'ST-001', startTime: '2026-03-24 10:15:00' },
              partnerRequest: { url: '/api/v1/device/points', query: { plant_code: 'ST-001' } },
              partnerResponse: { code: 0, itemCount: 36 },
              standardResponse: { code: '0', itemCount: 36 }
            }
          },
          {
            id: 'LOG-002',
            time: '10:05:33',
            platform: '区域 EMS 联控',
            apiCode: 'API-CTRL-01',
            apiCategory: '控制点位',
            type: '调用日志',
            transformType: '调用返回转换',
            action: 'POST /control/mode',
            result: '失败',
            duration: '5098ms',
            latencyMs: 5098,
            stageDurations: { protocolTransform: 31, interfaceResponse: 5012, responseTransform: 55 },
            payload: {
              requestId: 'REQ-1002',
              reason: 'upstream timeout',
              retry: 2,
              circuitBreaker: 'open',
              responseCode: 504,
              standardRequest: { deviceCode: 'EMS-01', targetMode: '并网', requestId: 'REQ-1002' },
              partnerRequest: { url: '/control/mode', body: { eq_code: 'EMS-01', mode: 'GRID', request_id: 'REQ-1002' } },
              partnerResponse: { code: 504, message: 'upstream timeout' },
              standardResponse: { code: '504', message: '调用失败' },
              errorLog: '上游接口超时，响应体为空，熔断器已打开。'
            }
          },
          {
            id: 'LOG-003',
            time: '09:48:12',
            platform: '储能示例平台',
            apiCode: 'API-RT-01',
            apiCategory: '点位数据',
            type: '同步任务日志',
            transformType: '完整链路',
            action: '增量点位同步',
            result: '成功',
            duration: '1.8s',
            latencyMs: 1800,
            stageDurations: { protocolTransform: 140, interfaceResponse: 1430, responseTransform: 230 },
            payload: { requestId: 'SYNC-989', count: 1248, cursor: '2026-03-24T09:45:00+08:00', compensation: false }
          },
          {
            id: 'LOG-004',
            time: '09:12:51',
            platform: '北方逆变器开放平台',
            apiCode: 'OPEN-STANDARD',
            apiCategory: '标准开放',
            type: '协议转换日志',
            transformType: '调用入参转换',
            action: '入站报文转换',
            result: '成功',
            duration: '96ms',
            latencyMs: 96,
            stageDurations: { protocolTransform: 62, interfaceResponse: 0, responseTransform: 34 },
            payload: { template: 'HTTP-v1.9', mappingVersion: 'v2.1', masked: true, status: 'ok' }
          },
          {
            id: 'LOG-005',
            time: '09:02:18',
            platform: '储能示例平台',
            apiCode: 'API-EQ-02',
            apiCategory: '设备数据',
            type: '调用日志',
            transformType: '完整链路',
            action: 'GET /api/v1/devices',
            result: '成功',
            duration: '640ms',
            latencyMs: 640,
            stageDurations: { protocolTransform: 28, interfaceResponse: 548, responseTransform: 64 },
            payload: {
              requestId: 'REQ-DEV-01',
              responseCode: 200,
              items: 128,
              pageNo: 1,
              standardRequest: { stationId: 'ST-001', pageNo: 1, pageSize: 100 },
              partnerRequest: { url: '/api/v1/devices', query: { plant_code: 'ST-001', page_index: 1, page_size: 100 } },
              partnerResponse: { code: 0, itemCount: 128 },
              standardResponse: { code: '0', itemCount: 128 },
              errorLog: ''
            }
          },
          {
            id: 'LOG-006',
            time: '09:43:20',
            platform: '华南聚合商测试平台',
            apiCode: 'API-STATUS-02',
            apiCategory: '状态类接口',
            type: '调用日志',
            transformType: '调用返回转换',
            action: 'GET /open/v2/alarm/status',
            result: '成功',
            duration: '228ms',
            latencyMs: 228,
            stageDurations: { protocolTransform: 22, interfaceResponse: 156, responseTransform: 50 },
            payload: {
              requestId: 'REQ-STATUS-01',
              responseCode: 200,
              items: 18,
              from: '2026-03-24 09:00:00',
              standardRequest: { startTime: '2026-03-24 09:00:00', endTime: '2026-03-24 10:00:00' },
              partnerRequest: { url: '/open/v2/alarm/status', query: { from: '2026-03-24T01:00:00Z', to: '2026-03-24T02:00:00Z' } },
              partnerResponse: { code: 0, itemCount: 18 },
              standardResponse: { code: '0', itemCount: 18 },
              errorLog: ''
            }
          },
          {
            id: 'LOG-007',
            time: '09:42:11',
            platform: '储能示例平台',
            apiCode: 'API-CTRL-03',
            apiCategory: '控制点位',
            type: '调用日志',
            transformType: '完整链路',
            action: 'POST /api/v1/control/power',
            result: '成功',
            duration: '1220ms',
            latencyMs: 1220,
            stageDurations: { protocolTransform: 36, interfaceResponse: 1108, responseTransform: 76 },
            payload: {
              requestId: 'CTRL-20260324-0099',
              responseCode: 200,
              taskId: 'TASK-991',
              accepted: true,
              standardRequest: { deviceCode: 'PCS-991', activePower: 250, requestId: 'CTRL-20260324-0099' },
              partnerRequest: { url: '/api/v1/control/power', body: { device_sn: 'PCS-991', set_power_w: 250000, request_id: 'CTRL-20260324-0099' } },
              partnerResponse: { code: 0, data: { taskId: 'TASK-991', accepted: true } },
              standardResponse: { code: '0', data: { controlTaskId: 'TASK-991', accepted: true } },
              errorLog: ''
            }
          },
          {
            id: 'LOG-008',
            time: '08:41:52',
            platform: '储能示例平台',
            apiCode: 'API-RT-01',
            apiCategory: '点位数据',
            type: '调用日志',
            transformType: '调用返回转换',
            action: 'GET /api/v1/device/points',
            result: '失败',
            duration: '842ms',
            latencyMs: 842,
            stageDurations: { protocolTransform: 26, interfaceResponse: 782, responseTransform: 34 },
            payload: {
              requestId: 'REQ-ERR-01',
              responseCode: 200,
              reason: 'data.items[].temp_f 缺失',
              fallback: 'default temperature',
              standardRequest: { stationId: 'ST-001', startTime: '2026-03-24 08:40:00', endTime: '2026-03-24 08:45:00' },
              partnerRequest: { url: '/api/v1/device/points', query: { plant_code: 'ST-001' } },
              partnerResponse: { code: 0, data: { items: [{ deviceCode: 'PCS-991', mode: 'RUNNING' }] } },
              standardResponse: { code: '1', message: '转换失败，已使用默认值' },
              errorLog: '返回字段 temp_f 缺失，触发默认值填充和异常日志记录。'
            }
          }
        ],
        activeAppInfo: [
          ['第三方应用标识', 'east-storage-prod'],
          ['基础地址', 'https://partner-east-storage.example.com'],
          ['环境', '生产环境'],
          ['认证方式', 'API Key'],
          ['最近连通性测试', '2026-03-24 09:55 通过']
        ],
        standardAppInfo: [
          ['应用名称', '北方逆变器标准开放应用'],
          ['AppId', 'OPEN-PLAT-2026'],
          ['回调地址', 'https://ps2.example.com/open/callback/inverter'],
          ['接入状态', '已启用'],
          ['最近联调时间', '2026-03-22 16:10']
        ],
        standardWhitelistIps: [
          { ip: '10.20.30.11', remark: '生产主出口', status: '启用' },
          { ip: '10.20.30.12', remark: '生产备用出口', status: '启用' },
          { ip: '10.20.40.8', remark: '测试环境联调出口', status: '停用' }
        ],
        standardSpiConfig: {
          timeout: '5000ms',
          retryCount: '2 次',
          signMethod: 'HMAC-SHA256',
          resultPath: '/open-api/v1/control/result',
          callbackApiKey: 'OPEN-CTRL-CALLBACK-KEY',
          callbackApiSecret: 'SECRET-CTRL-CB-2026-******',
          callbackUrl: 'https://ps2.example.com/open/spi/device/control',
          authMode: 'apiKey + apiSecret + 时间戳签名',
          headerDefinition: `Content-Type: application/json
  X-Api-Key: OPEN-CTRL-CALLBACK-KEY
  X-Timestamp: 1711425600000
  X-Nonce: AUTO_GENERATE
  X-Signature: HMAC_SHA256(apiSecret, body + timestamp + nonce)`,
          inputTemplate: `{
    "requestId": "CTRL-20260324-0099",
    "stationCode": "ST-001",
    "deviceCode": "PCS-991",
    "controlCode": "setActivePower",
    "controlName": "有功功率控制",
    "timestamp": "2026-03-24T10:15:58+08:00",
    "data": {
      "activePower": 250,
      "unit": "kW",
      "operator": "dispatch-center"
    }
  }`,
          responseTemplate: `{
    "requestId": "CTRL-20260324-0099",
    "code": "0",
    "message": "accepted",
    "data": {
      "controlTaskId": "TASK-991",
      "acceptedAt": "2026-03-24T10:16:00+08:00",
      "status": "PROCESSING"
    }
  }`,
          responseExample: `{
    "requestId": "CTRL-20260324-0099",
    "code": "0",
    "message": "accepted",
    "data": {
      "controlTaskId": "TASK-991",
      "acceptedAt": "2026-03-24T10:16:00+08:00"
    }
  }`,
          debugInput: `{
    "requestId": "CTRL-20260324-0099",
    "stationCode": "ST-001",
    "deviceCode": "PCS-991",
    "controlCode": "setActivePower",
    "controlName": "有功功率控制",
    "timestamp": "2026-03-24T10:15:58+08:00",
    "data": {
      "activePower": 250,
      "unit": "kW",
      "operator": "dispatch-center"
    }
  }`
        },
        apiProtocols: {
          'API-RT-01': {
            protocolType: 'HTTP / JSON',
            version: 'v1.9',
            requestMappings: [
              ['stationId', 'plant_code', 'query', 'string', 'direct'],
              ['startTime', 'begin_time', 'query', 'datetime', 'UTC+8 -> UTC'],
              ['endTime', 'end_time', 'query', 'datetime', 'UTC+8 -> UTC']
            ],
            responseMappings: [
              ['data.items[].deviceCode', 'deviceCode', 'string', 'direct', '记录日志'],
              ['data.items[].temp_f', 'temperature', 'number', 'F -> C', '填默认值'],
              ['data.items[].mode', 'status', 'enum', 'RUNNING -> 运行中', '告警']
            ],
            requestStandardSample: `{
    "stationId": "ST-001",
    "startTime": "2026-03-24 10:00:00",
    "endTime": "2026-03-24 10:05:00"
  }`,
            requestPartnerSample: `GET /api/v1/device/points?plant_code=ST-001&begin_time=2026-03-24T02:00:00Z&end_time=2026-03-24T02:05:00Z`,
            responsePartnerSample: `{
    "code": 0,
    "data": {
      "items": [
        {"deviceCode": "PCS-991", "temp_f": 82.4, "mode": "RUNNING"}
      ]
    }
  }`,
            responseStandardSample: `{
    "code": "0",
    "data": [
      {"deviceCode": "PCS-991", "temperature": 28, "status": "运行中"}
    ]
  }`,
            debugSuccess: `调试通过

  1. 标准入参已转换为第三方 query 参数。
  2. 第三方返回字段 temp_f 已成功换算为 temperature。
  3. 本次调试耗时 182ms。`,
            debugError: `调试失败

  第三方返回字段 data.items[].temp_f 缺失。
  处理策略：记录转换失败日志，按规则填默认值并触发中等级别告警。`,
            logs: [
              ['2026-03-24 10:20:04', '成功', '入参转换 3 条 / 返回转换 3 条', '182ms'],
              ['2026-03-24 09:55:18', '成功', '增量调试，命中时区转换规则', '201ms'],
              ['2026-03-24 08:41:52', '失败', '返回字段 temp_f 缺失', '176ms']
            ]
          },
          'API-EQ-02': {
            protocolType: 'HTTP / JSON',
            version: 'v1.6',
            requestMappings: [
              ['stationId', 'plant_code', 'query', 'string', 'direct'],
              ['pageNo', 'page_index', 'query', 'number', 'default=1'],
              ['pageSize', 'page_size', 'query', 'number', 'default=100']
            ],
            responseMappings: [
              ['data.list[].deviceSn', 'deviceCode', 'string', 'direct', '记录日志'],
              ['data.list[].deviceModel', 'deviceModel', 'string', '模型映射', '告警'],
              ['data.list[].deviceType', 'deviceType', 'enum', '类型映射表', '填默认值']
            ],
            requestStandardSample: `{
    "stationId": "ST-001",
    "pageNo": 1,
    "pageSize": 100
  }`,
            requestPartnerSample: `GET /api/v1/devices?plant_code=ST-001&page_index=1&page_size=100`,
            responsePartnerSample: `{
    "code": 0,
    "data": {
      "list": [
        {"deviceSn": "PCS-991", "deviceModel": "PCS_3P", "deviceType": "converter"}
      ]
    }
  }`,
            responseStandardSample: `{
    "code": "0",
    "data": [
      {"deviceCode": "PCS-991", "deviceModel": "PCS", "deviceType": "储能变流器"}
    ]
  }`,
            debugSuccess: `调试通过

  设备清单接口返回正常，模型映射命中 PCS_3P -> PCS。`,
            debugError: `调试失败

  deviceType 未命中映射字典，已按默认类型处理并写入异常日志。`,
            logs: [
              ['2026-03-24 02:01:05', '成功', '全量设备清单同步', '650ms'],
              ['2026-03-23 02:00:59', '成功', '模型映射命中 42 条', '710ms']
            ]
          },
          'API-CTRL-03': {
            protocolType: 'HTTP / JSON',
            version: 'v2.2',
            requestMappings: [
              ['deviceCode', 'device_sn', 'body', 'string', 'direct'],
              ['activePower', 'set_power_w', 'body', 'number', 'kW -> W'],
              ['requestId', 'request_id', 'body', 'string', '幂等透传']
            ],
            responseMappings: [
              ['data.taskId', 'controlTaskId', 'string', 'direct', '记录日志'],
              ['data.accepted', 'accepted', 'boolean', 'true/false', '告警'],
              ['message', 'message', 'string', 'direct', '记录日志']
            ],
            requestStandardSample: `{
    "deviceCode": "PCS-991",
    "activePower": 250,
    "requestId": "CTRL-20260324-0099"
  }`,
            requestPartnerSample: `POST /api/v1/control/power
  {
    "device_sn": "PCS-991",
    "set_power_w": 250000,
    "request_id": "CTRL-20260324-0099"
  }`,
            responsePartnerSample: `{
    "code": 0,
    "message": "accepted",
    "data": {"taskId": "TASK-991", "accepted": true}
  }`,
            responseStandardSample: `{
    "code": "0",
    "message": "accepted",
    "data": {"controlTaskId": "TASK-991", "accepted": true}
  }`,
            debugSuccess: `调试通过

  控制入参已完成 kW -> W 转换，第三方成功返回 taskId。`,
            debugError: `调试失败

  第三方返回 accepted=false，控制任务未被接收。已建议检查设备离线或权限不足。`,
            logs: [
              ['2026-03-24 10:05:33', '失败', '控制接口上游超时', '5098ms'],
              ['2026-03-24 09:42:11', '成功', '模拟控制通过', '1220ms']
            ]
          },
          'API-PLANT-01': {
            protocolType: 'HTTP / JSON',
            version: 'v1.2',
            requestMappings: [
              ['pageNo', 'page', 'query', 'number', 'direct'],
              ['pageSize', 'size', 'query', 'number', 'direct']
            ],
            responseMappings: [
              ['data.records[].plantCode', 'stationCode', 'string', 'direct', '记录日志'],
              ['data.records[].plantName', 'stationName', 'string', 'trim()', '记录日志']
            ],
            requestStandardSample: `{
    "pageNo": 1,
    "pageSize": 50
  }`,
            requestPartnerSample: `GET /open/v2/plants?page=1&size=50`,
            responsePartnerSample: `{"data":{"records":[{"plantCode":"PL-001","plantName":"南方一号"}]}}`,
            responseStandardSample: `{"data":[{"stationCode":"PL-001","stationName":"南方一号"}]}`,
            debugSuccess: '电站清单 API 调试通过。',
            debugError: '电站名称字段为空，已按异常策略记录日志。',
            logs: [
              ['2026-03-24 09:40:02', '成功', '分页拉取电站清单', '468ms']
            ]
          },
          'API-STATUS-02': {
            protocolType: 'HTTP / JSON',
            version: 'v1.3',
            requestMappings: [
              ['startTime', 'from', 'query', 'datetime', 'UTC+8 -> UTC'],
              ['endTime', 'to', 'query', 'datetime', 'UTC+8 -> UTC']
            ],
            responseMappings: [
              ['data.items[].alarmCode', 'alarmCode', 'string', 'direct', '记录日志'],
              ['data.items[].level', 'alarmLevel', 'enum', '状态码映射', '告警']
            ],
            requestStandardSample: `{"startTime":"2026-03-24 09:00:00","endTime":"2026-03-24 10:00:00"}`,
            requestPartnerSample: `GET /open/v2/alarm/status?from=2026-03-24T01:00:00Z&to=2026-03-24T02:00:00Z`,
            responsePartnerSample: `{"data":{"items":[{"alarmCode":"A01","level":"high"}]}}`,
            responseStandardSample: `{"data":[{"alarmCode":"A01","alarmLevel":"高"}]}`,
            debugSuccess: '告警状态 API 调试通过。',
            debugError: 'level 未命中状态码字典，已触发告警。',
            logs: [
              ['2026-03-24 09:43:20', '成功', '告警状态增量拉取', '228ms']
            ]
          },
          'API-CTRL-01': {
            protocolType: 'HTTP / JSON',
            version: 'v2.0',
            requestMappings: [
              ['deviceCode', 'eq_code', 'body', 'string', 'direct'],
              ['targetMode', 'mode', 'body', 'enum', '模式映射'],
              ['requestId', 'request_id', 'body', 'string', '幂等透传']
            ],
            responseMappings: [
              ['data.taskNo', 'controlTaskId', 'string', 'direct', '记录日志'],
              ['data.status', 'accepted', 'enum', 'ACCEPT -> true', '告警']
            ],
            requestStandardSample: `{"deviceCode":"EMS-01","targetMode":"并网","requestId":"REQ-EMS-01"}`,
            requestPartnerSample: `POST /control/mode {"eq_code":"EMS-01","mode":"GRID","request_id":"REQ-EMS-01"}`,
            responsePartnerSample: `{"data":{"taskNo":"EMS-889","status":"ACCEPT"}}`,
            responseStandardSample: `{"data":{"controlTaskId":"EMS-889","accepted":true}}`,
            debugSuccess: '模式切换 API 调试通过。',
            debugError: '上游超时，建议切换备用链路。',
            logs: [
              ['2026-03-24 10:05:33', '失败', '模式切换上游超时', '5098ms']
            ]
          }
        }
      };

      dataStore.mappingRelationVersions = [
        {
          id: 'REL-V1.2',
          platformId: 'P001',
          version: 'v1.2',
          creator: '陈薇',
          status: '已发布',
          createdAt: '2026-03-24 18:20',
          snapshot: {
            station: JSON.parse(JSON.stringify((dataStore.stationMappings || []).filter((item) => item.platformId === 'P001'))),
            device: JSON.parse(JSON.stringify((dataStore.deviceMappings || []).filter((item) => item.platformId === 'P001'))),
            point: JSON.parse(JSON.stringify((dataStore.pointMappings || []).filter((item) => item.platformId === 'P001'))),
            control: JSON.parse(JSON.stringify((dataStore.controlMappings || []).filter((item) => item.platformId === 'P001')))
          }
        },
        {
          id: 'REL-V1.1',
          platformId: 'P001',
          version: 'v1.1',
          creator: '陈薇',
          status: '历史版本',
          createdAt: '2026-03-16 10:05',
          snapshot: {
            station: JSON.parse(JSON.stringify((dataStore.stationMappings || []).filter((item) => item.platformId === 'P001').slice(0, 2))),
            device: JSON.parse(JSON.stringify((dataStore.deviceMappings || []).filter((item) => item.platformId === 'P001').slice(0, 2))),
            point: JSON.parse(JSON.stringify((dataStore.pointMappings || []).filter((item) => item.platformId === 'P001').slice(0, 2))),
            control: JSON.parse(JSON.stringify((dataStore.controlMappings || []).filter((item) => item.platformId === 'P001').slice(0, 1)))
          }
        },
        {
          id: 'REL-V0.9',
          platformId: 'P003',
          version: 'v0.9',
          creator: '王宁',
          status: '草稿',
          createdAt: '2026-03-22 16:20',
          snapshot: {
            station: JSON.parse(JSON.stringify((dataStore.stationMappings || []).filter((item) => item.platformId === 'P003'))),
            device: JSON.parse(JSON.stringify((dataStore.deviceMappings || []).filter((item) => item.platformId === 'P003'))),
            point: JSON.parse(JSON.stringify((dataStore.pointMappings || []).filter((item) => item.platformId === 'P003'))),
            control: JSON.parse(JSON.stringify((dataStore.controlMappings || []).filter((item) => item.platformId === 'P003')))
          }
        }
      ];

      const state = {
        section: 'home',
        currentPlatformId: 'P001',
        filters: {
          name: '',
          type: '',
          mode: '',
          status: ''
        },
        wizard: {
          step: 1,
          modes: ['主动拉取', '主动控制']
        },
        navFolders: {
          'platform-access': true,
          'active-sync': true,
          'audit-logs': true
        },
        currentApiCode: 'API-RT-01',
        currentStrategyId: 'STR-FAST',
        currentTaskId: 'TASK-RT-SYNC',
        mappingPanel: 'mapping-model-center',
        mappingRulePlatformId: 'P001',
        mappingRelationPlatformId: 'P001',
        currentConversionRuleId: 'RULE-UNIT-01',
        currentInternalModelType: '',
        currentConversionRuleType: '',
        currentMappingVersionId: 'MAP-V2.3',
        mappingVersionView: 'list',
        currentMappingRelationType: 'station',
        currentMappingRelationId: '',
        currentMappingRelationVersionId: 'REL-V1.2',
        mappingRelationVersionView: 'list',
        currentControlMappingId: 'CTRL-MAP-01',
        controlMappingView: 'list',
        mappingDebug: {
          station: { input: '', output: '' },
          device: { input: '', output: '' },
          point: { input: '', output: '' },
          control: { input: '', output: '' }
        },
        currentAlertRuleId: 'RULE-001',
        alertRuleView: 'list',
        protocolLogFilters: {
          platformId: '',
          apiCode: '',
          transformType: '',
          result: ''
        },
        activeProtocolLogId: 'LOG-001',
        alertId: 'AL-001',
        logFilter: 'all',
        logPlatformId: '',
        logType: '调用日志',
        logApiCode: '',
        alertAnalyticsReport: '',
        apiMonitorFilters: {
          platformId: '',
          apiType: '',
          range: '7d',
          granularity: '1h'
        },
        apiMonitorRemote: {
          enabled: true,
          loading: false,
          queryKey: '',
          data: null
        },
        syncMonitorFilters: {
          platformId: '',
          syncType: '',
          range: '7d',
          granularity: '1h'
        },
        protocolMonitorFilters: {
          platformId: '',
          transformType: '',
          range: '7d',
          granularity: '1h'
        },
        flowMonitorFilters: {
          platformId: '',
          range: '7d',
          granularity: '1h'
        },
        responseMonitorFilters: {
          platformId: '',
          range: '7d',
          granularity: '1h'
        },
        overallDebug: {
          apiCode: '',
          requestResult: null
        },
        activeLogId: 'LOG-001'
      };

      const flowMonitorCharts = {
        trend: null,
        platform: null
      };

      const apiMonitorCharts = {
        trend: null,
        metric: null
      };

      const syncMonitorCharts = {
        trend: null,
        strategy: null
      };

      const protocolMonitorCharts = {
        trend: null,
        compare: null
      };

      const alertAnalyticsCharts = {
        trend: null,
        type: null,
        duration: null,
        hotspot: null
      };

      const responseMonitorCharts = {
        trend: null,
        distribution: null
      };

      const homeMonitorCharts = {
        healthTrend: null,
        performanceCompare: null
      };

      const $ = (selector) => document.querySelector(selector);
      const $$ = (selector) => Array.from(document.querySelectorAll(selector));
      const escapeHtml = (value) => String(value ?? '')
        .replaceAll('&', '&amp;')
        .replaceAll('<', '&lt;')
        .replaceAll('>', '&gt;')
        .replaceAll('"', '&quot;')
        .replaceAll("'", '&#39;');

      function getCurrentPlatform() {
        return dataStore.platforms.find((item) => item.id === state.currentPlatformId) || dataStore.platforms[0];
      }

      function syncCurrentApiSelection() {
        const platform = getCurrentPlatform();
        if (!platform.apis.length) {
          state.currentApiCode = '';
          return;
        }
        if (!platform.apis.some((api) => api.code === state.currentApiCode)) {
          state.currentApiCode = platform.apis[0].code;
        }
      }

      function getCurrentApi() {
        syncCurrentApiSelection();
        const platform = getCurrentPlatform();
        return platform.apis.find((api) => api.code === state.currentApiCode) || null;
      }

      function getApiProtocol(apiCode) {
        return dataStore.apiProtocols[apiCode] || null;
      }

      function getPlatformStrategies(platform = getCurrentPlatform()) {
        return platform.callStrategies || [];
      }

      function syncCurrentStrategySelection() {
        const platform = getCurrentPlatform();
        const strategies = getPlatformStrategies(platform);
        if (!strategies.length) {
          state.currentStrategyId = '';
          return;
        }
        if (!strategies.some((item) => item.id === state.currentStrategyId)) {
          state.currentStrategyId = strategies[0].id;
        }
      }

      function getCurrentStrategy(platform = getCurrentPlatform()) {
        syncCurrentStrategySelection();
        return getPlatformStrategies(platform).find((item) => item.id === state.currentStrategyId) || null;
      }

      function parseStrategyNumber(value, fallback) {
        const matched = String(value ?? '').match(/\d+/);
        const parsed = matched ? Number.parseInt(matched[0], 10) : Number.NaN;
        return Number.isFinite(parsed) && parsed > 0 ? parsed : fallback;
      }

      function inferStrategyType(strategy) {
        const name = String(strategy.name || '');
        const circuit = String(strategy.circuit || '');
        if (strategy.type === '重试策略' || strategy.type === '快速失败' || strategy.type === '轮讯策略') {
          return strategy.type;
        }
        if (name.includes('轮询') || name.includes('轮讯') || (strategy.backupLink && String(strategy.backupLink).trim() && String(strategy.backupLink).trim() !== '待配置')) {
          return '轮讯策略';
        }
        if (name.includes('快速') || name.includes('控制') || circuit.includes('立即')) {
          return '快速失败';
        }
        return '重试策略';
      }

      function getStrategyDefaultDescription(type) {
        if (type === '快速失败') return '调用失败后快速返回，避免长时间阻塞请求链路。';
        if (type === '轮讯策略') return '主链路异常时切换至备用链路，保障调用连续性。';
        return '调用失败后按配置次数与间隔进行重试。';
      }

      function normalizeStrategy(strategy, platform = getCurrentPlatform()) {
        const type = inferStrategyType(strategy);
        const timeoutSeconds = parseStrategyNumber(strategy.timeoutSeconds || strategy.timeout, 5);
        const retryCount = String(parseStrategyNumber(strategy.retryCount || strategy.retry, 2));
        const serviceDegradeEnabled = strategy.serviceDegradeEnabled === true || strategy.serviceDegrade === '开启';
        return {
          id: strategy.id,
          name: strategy.name || '未命名策略',
          type,
          timeoutSeconds,
          timeout: `${timeoutSeconds} 秒`,
          serviceDegradeEnabled,
          serviceDegrade: serviceDegradeEnabled ? '开启' : '关闭',
          description: strategy.description || strategy.note || getStrategyDefaultDescription(type),
          retryCount,
          retryInterval: strategy.retryInterval || '2 秒',
          backupLink: strategy.backupLink || (platform.baseUrl ? platform.baseUrl.replace('https://', 'https://backup-') : '待配置')
        };
      }

      function getStrategyTableSummary(strategy) {
        if (strategy.type === '重试策略') {
          return `重试 ${strategy.retryCount} 次 / 间隔 ${strategy.retryInterval}`;
        }
        if (strategy.type === '轮讯策略') {
          return `备用链路：${strategy.backupLink || '未配置'}`;
        }
        return '失败立即返回，不做重试等待';
      }

      function renderStrategyTypeFields(type) {
        $('#strategyRetryFields').style.display = type === '重试策略' ? 'grid' : 'none';
        $('#strategyPollingFields').style.display = type === '轮讯策略' ? 'grid' : 'none';
      }

      function getPlatformTasks(platform = getCurrentPlatform()) {
        return platform.callTasks || [];
      }

      function syncCurrentTaskSelection() {
        const platform = getCurrentPlatform();
        const tasks = getPlatformTasks(platform);
        if (!tasks.length) {
          state.currentTaskId = '';
          return;
        }
        if (!tasks.some((item) => item.id === state.currentTaskId)) {
          state.currentTaskId = tasks[0].id;
        }
      }

      function getCurrentTask(platform = getCurrentPlatform()) {
        syncCurrentTaskSelection();
        return getPlatformTasks(platform).find((item) => item.id === state.currentTaskId) || null;
      }

      function createDefaultTaskApiConfig(index = 0, platform = getCurrentPlatform()) {
        const api = platform.apis[index] || platform.apis[0] || null;
        return {
          apiCode: api ? api.code : '',
          paramSource: index === 0 ? '初始入参' : '前API返回数据',
          paramValue: '',
          postProcessScript: ''
        };
      }

      function normalizeTaskApiConfigs(task, platform = getCurrentPlatform()) {
        if (!task) return [];
        const legacyApiCodes = Array.isArray(task.apiCodes) ? task.apiCodes.filter(Boolean) : [];
        const sourceConfigs = Array.isArray(task.apiConfigs) && task.apiConfigs.length
          ? task.apiConfigs
          : legacyApiCodes.map((apiCode, index) => ({
            apiCode,
            paramSource: index === 0 ? '初始入参' : '前API返回数据',
            paramValue: '',
            postProcessScript: ''
          }));

        const configs = (sourceConfigs.length ? sourceConfigs : [createDefaultTaskApiConfig(0, platform)]).map((item, index) => {
          const defaults = createDefaultTaskApiConfig(index, platform);
          return {
            apiCode: item.apiCode || item.code || defaults.apiCode,
            paramSource: item.paramSource === '前API返回数据' ? '前API返回数据' : '初始入参',
            paramValue: String(item.paramValue ?? item.parameterValue ?? item.params ?? item.parseScript ?? ''),
            postProcessScript: String(item.postProcessScript ?? item.nextRequestParamsScript ?? item.nextRequestScript ?? item.postScript ?? '')
          };
        });

        task.apiConfigs = configs;
        task.apiCodes = configs.map((item) => item.apiCode).filter(Boolean);
        return configs;
      }

      function collectTaskApiConfigs() {
        return $$('#taskApiConfigList .api-orchestration-row').map((row, index) => {
          const apiCode = row.querySelector('[data-task-api-field="apiCode"]')?.value || '';
          const paramSource = row.querySelector('[data-task-api-field="paramSource"]')?.value === '前API返回数据'
            ? '前API返回数据'
            : '初始入参';
          const paramValue = row.querySelector('[data-task-api-field="paramValue"]')?.value || '';
          const postProcessScript = row.querySelector('[data-task-api-field="postProcessScript"]')?.value || '';
          return {
            apiCode,
            paramSource: index === 0 && !paramSource ? '初始入参' : paramSource,
            paramValue,
            postProcessScript
          };
        });
      }

      function renderTaskApiConfigRows(task = getCurrentTask(), platform = getCurrentPlatform()) {
        const container = $('#taskApiConfigList');
        if (!container) return;
        if (!task) {
          container.innerHTML = '<div class="panel-note">请选择调用任务后配置 API 编排。</div>';
          return;
        }

        const apiOptions = platform.apis.map((api) => `
          <option value="${escapeHtml(api.code)}">${escapeHtml(api.code)} · ${escapeHtml(api.name)}</option>
        `).join('');
        const configs = normalizeTaskApiConfigs(task, platform);

        container.innerHTML = configs.map((config, index) => {
          const paramSource = config.paramSource === '前API返回数据' ? '前API返回数据' : '初始入参';
          const paramLabel = paramSource === '前API返回数据' ? '数据解析脚本' : '参数输入';
          const paramPlaceholder = paramSource === '前API返回数据'
            ? '例如：return { deviceCode: prevResponse.data.deviceCode };'
            : '请输入本次 API 的参数值或参数模板';
          const paramField = paramSource === '前API返回数据'
            ? `
              <textarea
                data-task-api-field="paramValue"
                placeholder="${paramPlaceholder}"
              >${escapeHtml(config.paramValue)}</textarea>
              <div class="kv-hint">从前一个 API 的返回结果中解析出当前 API 所需参数。</div>
            `
            : `
              <input
                data-task-api-field="paramValue"
                type="text"
                placeholder="${paramPlaceholder}"
                value="${escapeHtml(config.paramValue)}"
              >
              <div class="kv-hint">直接填写初始入参或参数模板。</div>
            `;

          return `
            <div class="api-orchestration-row" data-task-api-index="${index}">
              <div class="field">
                <label>API名称</label>
                <select data-task-api-field="apiCode">
                  ${apiOptions || '<option value="">当前平台暂无 API</option>'}
                </select>
              </div>
              <div class="field">
                <label>API参数来源</label>
                <select data-task-api-field="paramSource">
                  <option value="初始入参" ${paramSource === '初始入参' ? 'selected' : ''}>初始入参</option>
                  <option value="前API返回数据" ${paramSource === '前API返回数据' ? 'selected' : ''}>前API返回数据</option>
                </select>
              </div>
              <div class="field">
                <label>${paramLabel}</label>
                ${paramField}
              </div>
              <div class="api-orchestration-actions">
                <button type="button" class="button ghost" data-task-api-action="remove">移除</button>
              </div>
              <div class="field" style="grid-column: 1 / -1;">
                <label>后置数据处理脚本</label>
                <textarea
                  data-task-api-field="postProcessScript"
                  placeholder="例如：return { nextApiParams: { plantCode: currentResponse.data.plantCode } };"
                >${escapeHtml(config.postProcessScript)}</textarea>
                <div class="kv-hint">基于当前 API 返回结果加工下一次请求参数，供后续 API 编排节点使用。</div>
              </div>
            </div>
          `;
        }).join('');

        $$('#taskApiConfigList [data-task-api-field="apiCode"]').forEach((select, index) => {
          select.value = configs[index].apiCode || '';
        });
      }

      function getPlatformById(platformId) {
        return dataStore.platforms.find((item) => item.id === platformId) || null;
      }

      function getMappingManagePlatforms() {
        return dataStore.platforms || [];
      }

      function syncMappingPlatformSelections() {
        const platforms = getMappingManagePlatforms();
        const defaultId = platforms[0] ? platforms[0].id : '';
        if (!platforms.some((item) => item.id === state.mappingRulePlatformId)) {
          state.mappingRulePlatformId = defaultId;
        }
        if (!platforms.some((item) => item.id === state.mappingRelationPlatformId)) {
          state.mappingRelationPlatformId = defaultId;
        }
      }

      function getScopedConversionRules(type, platformId = state.mappingRulePlatformId) {
        const groups = {
          unit: dataStore.unitConversionRules || [],
          timezone: dataStore.timezoneConversionRules || [],
          status: dataStore.statusCodeConversionRules || [],
          aggregate: dataStore.aggregationConversionRules || []
        };
        return (groups[type] || []).filter((item) => (item.platformId || 'P001') === platformId);
      }

      function getScopedMappingList(type, platformId = state.mappingRelationPlatformId) {
        return getMappingList(type).filter((item) => (item.platformId || 'P001') === platformId);
      }

      function getScopedControlMappings(platformId = state.mappingRelationPlatformId) {
        return getControlMappings().filter((item) => (item.platformId || 'P001') === platformId);
      }

      function getScopedMappingRelationVersions(platformId = state.mappingRelationPlatformId) {
        return (dataStore.mappingRelationVersions || []).filter((item) => (item.platformId || 'P001') === platformId);
      }

      function renderMappingScopeSelectors() {
        syncMappingPlatformSelections();
        const platformOptions = getMappingManagePlatforms().map((item) => `
          <option value="${item.id}">${item.name}</option>
        `).join('');
        const ruleSelect = $('#mappingRulePlatformSelect');
        const relationSelect = $('#mappingRelationPlatformSelect');
        if (ruleSelect) {
          ruleSelect.innerHTML = platformOptions;
          ruleSelect.value = state.mappingRulePlatformId;
        }
        if (relationSelect) {
          relationSelect.innerHTML = platformOptions;
          relationSelect.value = state.mappingRelationPlatformId;
        }
        if ($('#mappingRulePlatformBadge')) {
          $('#mappingRulePlatformBadge').textContent = '当前平台：' + platformName(state.mappingRulePlatformId);
        }
        if ($('#mappingRelationPlatformBadge')) {
          $('#mappingRelationPlatformBadge').textContent = '当前平台：' + platformName(state.mappingRelationPlatformId);
        }
      }

      function getMappingVersions() {
        return dataStore.mappingVersions || [];
      }

      function getPublishedMappingVersion() {
        return getMappingVersions().find((item) => item.status === '已发布') || getMappingVersions()[0] || null;
      }

      function getNextMappingVersionLabel() {
        const parsed = getMappingVersions().map((item) => {
          const match = String(item.version || '').match(/^v?(\d+)(?:\.(\d+))?$/i);
          if (!match) return null;
          return { major: Number(match[1]), minor: Number(match[2] || 0) };
        }).filter(Boolean);
        if (!parsed.length) return 'v1.0';
        const latest = parsed.reduce((max, item) => {
          if (item.major > max.major) return item;
          if (item.major === max.major && item.minor > max.minor) return item;
          return max;
        }, parsed[0]);
        return `v${latest.major}.${latest.minor + 1}`;
      }

      function snapshotCurrentModels() {
        return JSON.parse(JSON.stringify({
          station: dataStore.internalStationModels || [],
          device: dataStore.internalDeviceModels || [],
          point: dataStore.internalPointModels || [],
          control: dataStore.internalControlModels || []
        }));
      }

      function buildMappingVersionSummary(snapshot) {
        return `电站模型 ${snapshot.station.length} 个 / 设备模型 ${snapshot.device.length} 个 / 点位模型 ${snapshot.point.length} 个 / 控制指令模型 ${snapshot.control.length} 个`;
      }

      function formatDateTime(date = new Date()) {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const hour = String(date.getHours()).padStart(2, '0');
        const minute = String(date.getMinutes()).padStart(2, '0');
        return `${year}-${month}-${day} ${hour}:${minute}`;
      }

      function buildSnapshotCards(snapshot) {
        const groups = [
          ['电站模型', snapshot.station || []],
          ['设备模型', snapshot.device || []],
          ['点位模型', snapshot.point || []],
          ['控制指令模型', snapshot.control || []]
        ];
        return groups.map(([title, items]) => `
          <div class="mini-panel">
            <h4>${title}</h4>
            <div class="line-list">
              ${items.length ? items.map((item) => `
                <div class="line-item"><span class="line-key">${item.name}</span><span>${item.code}</span></div>
              `).join('') : '<div class="line-item"><span class="line-key">暂无模型</span><span>-</span></div>'}
            </div>
          </div>
        `).join('');
      }

      function buildMappingVersionDrawerContent(record) {
        return `
          <div class="line-list">
            <div class="line-item"><span class="line-key">版本号</span><span>${record.version}</span></div>
            <div class="line-item"><span class="line-key">版本状态</span><span>${record.status}</span></div>
            <div class="line-item"><span class="line-key">版本说明</span><span>${record.note || '未填写'}</span></div>
            <div class="line-item"><span class="line-key">快照摘要</span><span>${record.summary}</span></div>
            <div class="line-item"><span class="line-key">发布时间</span><span>${record.publishedAt || '待发布'}</span></div>
          </div>
          <div class="two-column">
            ${buildSnapshotCards(record.snapshot)}
          </div>
        `;
      }

      function upsertMappingVersion(publish = false) {
        const versionInput = ($('#mappingVersionDraftName').value || '').trim() || getNextMappingVersionLabel();
        const noteInput = ($('#mappingVersionDraftNote').value || '').trim() || '基于当前内部模型生成版本快照。';
        const snapshot = snapshotCurrentModels();
        const now = formatDateTime();
        let record = getMappingVersions().find((item) => item.version === versionInput && item.status === '草稿');

        if (!record) {
          record = {
            id: 'MAP-' + Date.now(),
            version: versionInput,
            status: '草稿',
            createdAt: now,
            publishedAt: '',
            creator: '产品经理',
            note: noteInput,
            summary: '',
            snapshot
          };
          dataStore.mappingVersions.unshift(record);
        }

        record.version = versionInput;
        record.note = noteInput;
        record.snapshot = snapshot;
        record.summary = buildMappingVersionSummary(snapshot);
        record.creator = '产品经理';

        if (publish) {
          dataStore.mappingVersions.forEach((item) => {
            if (item.id !== record.id && item.status === '已发布') {
              item.status = '历史版本';
            }
          });
          record.status = '已发布';
          record.publishedAt = now;
        } else if (record.status !== '已发布') {
          record.status = '草稿';
        }

        state.currentMappingVersionId = record.id;
        return record;
      }

      function getUnitConversionRules() {
        return dataStore.unitConversionRules || [];
      }

      function getTimezoneConversionRules() {
        return dataStore.timezoneConversionRules || [];
      }

      function getStatusCodeConversionRules() {
        return dataStore.statusCodeConversionRules || [];
      }

      function getAggregationConversionRules() {
        return dataStore.aggregationConversionRules || [];
      }

      function getConversionRule(type, ruleId, platformId = '') {
        const groups = {
          unit: getUnitConversionRules(),
          timezone: getTimezoneConversionRules(),
          status: getStatusCodeConversionRules(),
          aggregate: getAggregationConversionRules()
        };
        const list = groups[type] || [];
        return list.find((item) => item.id === ruleId && (!platformId || (item.platformId || 'P001') === platformId))
          || list.find((item) => item.id === ruleId)
          || null;
      }

      function getConversionDirectionLabel(rule) {
        return rule && rule.directionType === '内部-->外部' ? '内部-->外部' : '外部-->内部';
      }

      function buildInternalModelMeta(type) {
        const configs = {
          station: {
            title: '新增电站模型字段',
            successText: '电站模型字段已保存',
            modelName: '电站模型',
            list: () => dataStore.internalStationModels || (dataStore.internalStationModels = [])
          },
          device: {
            title: '新增设备模型字段',
            successText: '设备模型字段已保存',
            modelName: '设备模型',
            list: () => dataStore.internalDeviceModels || (dataStore.internalDeviceModels = [])
          },
          point: {
            title: '新增点位模型字段',
            successText: '点位模型字段已保存',
            modelName: '点位模型',
            list: () => dataStore.internalPointModels || (dataStore.internalPointModels = [])
          },
          control: {
            title: '新增控制指令模型',
            successText: '控制指令模型已保存',
            modelName: '控制指令模型',
            list: () => dataStore.internalControlModels || (dataStore.internalControlModels = [])
          }
        };
        return configs[type] || null;
      }

      function formatControlParamsTextarea(params = []) {
        return params.map((item) => [item.name, item.code, item.type, item.unit].join(', ')).join('\n');
      }

      function parseControlParamsTextarea(text = '') {
        return text.split('\n').map((line) => line.trim()).filter(Boolean).map((line) => {
          const parts = line.split(/,|，/).map((item) => item.trim());
          return {
            name: parts[0] || '',
            code: parts[1] || '',
            type: parts[2] || '',
            unit: parts[3] || ''
          };
        }).filter((item) => item.name || item.code || item.type || item.unit);
      }

      function formatStatusMappingsTextarea(mappings = []) {
        return mappings.map((item) => `${item.source} => ${item.target}`).join('\n');
      }

      function parseStatusMappingsTextarea(text = '') {
        return text.split('\n').map((line) => line.trim()).filter(Boolean).map((line) => {
          const match = line.match(/^(.*?)\s*(?:=>|->|=|:)\s*(.*)$/);
          if (match) {
            return {
              source: match[1].trim(),
              target: match[2].trim()
            };
          }
          return {
            source: line,
            target: ''
          };
        }).filter((item) => item.source || item.target);
      }

      function openInternalModelEditor(type) {
        state.currentInternalModelType = type;

        if (type === 'version') {
          openDrawer(
            '新增模型版本',
            `
              <div class="form-grid">
                <div class="field">
                  <label for="mappingVersionDraftName">版本号</label>
                  <input id="mappingVersionDraftName" type="text" value="${getNextMappingVersionLabel()}">
                </div>
                <div class="field">
                  <label for="mappingVersionDraftNote">版本说明</label>
                  <input id="mappingVersionDraftNote" type="text" value="基于当前内部模型生成版本快照。">
                </div>
              </div>
              <div class="action-row">
                <button type="button" class="button secondary" id="saveMappingVersionDraftFromDrawer">保存版本</button>
                <button type="button" class="button brand" id="publishMappingVersionDraftFromDrawer">发布版本</button>
              </div>
            `,
            'Model Version'
          );
          return;
        }

        const meta = buildInternalModelMeta(type);
        if (!meta) return;

        if (type === 'control') {
          openDrawer(
            meta.title,
            `
              <div class="form-grid">
                <div class="field">
                  <label for="internalControlTemplateName">控制名称</label>
                  <input id="internalControlTemplateName" type="text" placeholder="请输入控制名称">
                </div>
                <div class="field">
                  <label for="internalControlTemplateCode">控制编码</label>
                  <input id="internalControlTemplateCode" type="text" placeholder="请输入控制编码">
                </div>
                <div class="field" style="grid-column:1 / -1;">
                  <label for="internalControlInputParams">控制输入参数</label>
                  <textarea id="internalControlInputParams" placeholder="参数名, 参数编码, 参数类型, 单位&#10;设备编码, deviceCode, string, -"></textarea>
                </div>
                <div class="field" style="grid-column:1 / -1;">
                  <label for="internalControlOutputParams">控制输出参数</label>
                  <textarea id="internalControlOutputParams" placeholder="参数名, 参数编码, 参数类型, 单位&#10;结果码, resultCode, string, -"></textarea>
                </div>
              </div>
              <div class="action-row">
                <button type="button" class="button brand" id="saveInternalModel">保存</button>
              </div>
            `,
            'Model'
          );
          return;
        }

        openDrawer(
          meta.title,
          `
            <div class="form-grid">
              <div class="field">
                <label for="internalModelFieldName">字段名称</label>
                <input id="internalModelFieldName" type="text" placeholder="请输入字段名称">
              </div>
              <div class="field">
                <label for="internalModelFieldCode">字段编码</label>
                <input id="internalModelFieldCode" type="text" placeholder="请输入字段编码">
              </div>
              <div class="field">
                <label for="internalModelFieldType">字段类型</label>
                <input id="internalModelFieldType" type="text" placeholder="例如：string / number / enum">
              </div>
              <div class="field">
                <label for="internalModelFieldUnit">单位</label>
                <input id="internalModelFieldUnit" type="text" placeholder="例如：kW">
              </div>
              ${type === 'point' ? `
                <div class="field">
                  <label for="internalModelFieldAccess">读写属性</label>
                  <select id="internalModelFieldAccess">
                    <option value="只读">只读</option>
                    <option value="读写">读写</option>
                    <option value="只写">只写</option>
                  </select>
                </div>
              ` : ''}
              <div class="field" style="grid-column:1 / -1;">
                <label for="internalModelFieldDesc">字段说明</label>
                <textarea id="internalModelFieldDesc" placeholder="请输入字段说明"></textarea>
              </div>
            </div>
            <div class="action-row">
              <button type="button" class="button brand" id="saveInternalModel">保存</button>
            </div>
          `,
          'Model'
        );
      }

      function saveInternalModelFromDrawer() {
        const type = state.currentInternalModelType;
        const meta = buildInternalModelMeta(type);
        if (!meta) return;

        if (type === 'control') {
          const templateName = $('#internalControlTemplateName').value.trim();
          const templateCode = $('#internalControlTemplateCode').value.trim();
          const inputParams = parseControlParamsTextarea($('#internalControlInputParams').value);
          const outputParams = parseControlParamsTextarea($('#internalControlOutputParams').value);

          if (!templateName || !templateCode) {
            showToast('请完善控制名称和控制编码');
            return;
          }

          meta.list().unshift({
            templateName,
            templateCode,
            inputParams,
            outputParams
          });
        } else {
          const fieldName = $('#internalModelFieldName').value.trim();
          const fieldCode = $('#internalModelFieldCode').value.trim();
          const fieldType = $('#internalModelFieldType').value.trim();
          const unit = $('#internalModelFieldUnit').value.trim() || '-';
          const desc = $('#internalModelFieldDesc').value.trim();

          if (!fieldName || !fieldCode || !fieldType) {
            showToast('请完善字段名称、字段编码和字段类型');
            return;
          }

          const record = {
            modelName: meta.modelName,
            fieldName,
            fieldCode,
            fieldType,
            unit,
            desc
          };

          if (type === 'point') {
            record.access = $('#internalModelFieldAccess').value;
          }

          meta.list().unshift(record);
        }

        renderMappings();
        closeDrawer();
        showToast(meta.successText);
      }

      function saveMappingVersionFromDrawer(publish = false) {
        const record = upsertMappingVersion(publish);
        state.mappingVersionView = 'list';
        renderMappings();
        closeDrawer();
        showToast((publish ? '模型版本已发布：' : '模型版本已保存：') + record.version);
      }

      function buildConversionRuleMeta(type) {
        const configs = {
          unit: {
            title: '新增单位转换规则',
            prefix: 'RULE-UNIT-',
            successText: '单位转换规则已保存',
            list: () => dataStore.unitConversionRules || (dataStore.unitConversionRules = [])
          },
          timezone: {
            title: '新增时区转换规则',
            prefix: 'RULE-TZ-',
            successText: '时区转换规则已保存',
            list: () => dataStore.timezoneConversionRules || (dataStore.timezoneConversionRules = [])
          },
          status: {
            title: '新增状态码转换规则',
            prefix: 'RULE-STATUS-',
            successText: '状态码转换规则已保存',
            list: () => dataStore.statusCodeConversionRules || (dataStore.statusCodeConversionRules = [])
          },
          aggregate: {
            title: '新增数据聚合转换规则',
            prefix: 'RULE-AGG-',
            successText: '数据聚合转换规则已保存',
            list: () => dataStore.aggregationConversionRules || (dataStore.aggregationConversionRules = [])
          }
        };
        return configs[type] || null;
      }

      function openConversionRuleEditor(type) {
        state.currentConversionRuleType = type;
        const meta = buildConversionRuleMeta(type);
        if (!meta) return;
        const currentPlatformName = platformName(state.mappingRulePlatformId);
        const platformField = `
          <div class="field">
            <label for="conversionRulePlatformName">所属平台</label>
            <input id="conversionRulePlatformName" type="text" value="${currentPlatformName}" disabled>
          </div>
        `;
        const directionField = `
          <div class="field">
            <label for="conversionRuleDirectionType">转换方向类型</label>
            <select id="conversionRuleDirectionType">
              <option value="外部-->内部">外部-->内部</option>
              <option value="内部-->外部">内部-->外部</option>
            </select>
          </div>
        `;

        if (type === 'unit') {
          openDrawer(
            meta.title,
            `
              <div class="form-grid">
                ${platformField}
                ${directionField}
                <div class="field">
                  <label for="conversionRuleName">规则名称</label>
                  <input id="conversionRuleName" type="text" placeholder="请输入规则名称">
                </div>
                <div class="field">
                  <label for="conversionRuleSourceName">原始单位名称</label>
                  <input id="conversionRuleSourceName" type="text" placeholder="请输入原始单位名称">
                </div>
                <div class="field">
                  <label for="conversionRuleSourceCode">原始单位编码</label>
                  <input id="conversionRuleSourceCode" type="text" placeholder="请输入原始单位编码">
                </div>
                <div class="field">
                  <label for="conversionRuleTargetName">目标单位名称</label>
                  <input id="conversionRuleTargetName" type="text" placeholder="请输入目标单位名称">
                </div>
                <div class="field">
                  <label for="conversionRuleTargetCode">目标单位编码</label>
                  <input id="conversionRuleTargetCode" type="text" placeholder="请输入目标单位编码">
                </div>
                <div class="field">
                  <label for="conversionRuleFormula">计算公式</label>
                  <input id="conversionRuleFormula" type="text" placeholder="例如：value / 1000">
                </div>
                <div class="field" style="grid-column:1 / -1;">
                  <label for="conversionRuleNote">备注</label>
                  <textarea id="conversionRuleNote" placeholder="请输入规则说明"></textarea>
                </div>
              </div>
              <div class="action-row">
                <button type="button" class="button brand" id="saveConversionRule">保存</button>
              </div>
            `,
            'Rule'
          );
          return;
        }

        if (type === 'timezone') {
          openDrawer(
            meta.title,
            `
              <div class="form-grid">
                ${platformField}
                ${directionField}
                <div class="field">
                  <label for="conversionRuleName">规则名称</label>
                  <input id="conversionRuleName" type="text" placeholder="请输入规则名称">
                </div>
                <div class="field">
                  <label for="conversionRuleSourceName">原始时区名称</label>
                  <input id="conversionRuleSourceName" type="text" placeholder="请输入原始时区名称">
                </div>
                <div class="field">
                  <label for="conversionRuleSourceCode">原始时区编码</label>
                  <input id="conversionRuleSourceCode" type="text" placeholder="请输入原始时区编码">
                </div>
                <div class="field">
                  <label for="conversionRuleTargetName">目标时区名称</label>
                  <input id="conversionRuleTargetName" type="text" placeholder="请输入目标时区名称">
                </div>
                <div class="field">
                  <label for="conversionRuleTargetCode">目标时区编码</label>
                  <input id="conversionRuleTargetCode" type="text" placeholder="请输入目标时区编码">
                </div>
                <div class="field">
                  <label for="conversionRuleFormula">转换公式</label>
                  <input id="conversionRuleFormula" type="text" placeholder="例如：datetime + 8h">
                </div>
                <div class="field" style="grid-column:1 / -1;">
                  <label for="conversionRuleNote">备注</label>
                  <textarea id="conversionRuleNote" placeholder="请输入规则说明"></textarea>
                </div>
              </div>
              <div class="action-row">
                <button type="button" class="button brand" id="saveConversionRule">保存</button>
              </div>
            `,
            'Rule'
          );
          return;
        }

        if (type === 'status') {
          openDrawer(
            meta.title,
            `
              <div class="form-grid">
                ${platformField}
                ${directionField}
                <div class="field">
                  <label for="conversionRuleName">规则名称</label>
                  <input id="conversionRuleName" type="text" placeholder="请输入规则名称">
                </div>
                <div class="field">
                  <label for="conversionRuleSourceName">原始字段名称</label>
                  <input id="conversionRuleSourceName" type="text" placeholder="请输入原始字段名称">
                </div>
                <div class="field">
                  <label for="conversionRuleSourceCode">原始字段编码</label>
                  <input id="conversionRuleSourceCode" type="text" placeholder="请输入原始字段编码">
                </div>
                <div class="field">
                  <label for="conversionRuleTargetName">目标字段名称</label>
                  <input id="conversionRuleTargetName" type="text" placeholder="请输入目标字段名称">
                </div>
                <div class="field">
                  <label for="conversionRuleTargetCode">目标字段编码</label>
                  <input id="conversionRuleTargetCode" type="text" placeholder="请输入目标字段编码">
                </div>
                <div class="field" style="grid-column:1 / -1;">
                  <label for="conversionRuleMappings">枚举映射</label>
                  <textarea id="conversionRuleMappings" placeholder="原状态码 => 目标状态码&#10;RUNNING => 运行中"></textarea>
                </div>
                <div class="field" style="grid-column:1 / -1;">
                  <label for="conversionRuleNote">备注</label>
                  <textarea id="conversionRuleNote" placeholder="请输入规则说明"></textarea>
                </div>
              </div>
              <div class="action-row">
                <button type="button" class="button brand" id="saveConversionRule">保存</button>
              </div>
            `,
            'Rule'
          );
          return;
        }

        openDrawer(
          meta.title,
          `
            <div class="form-grid">
              ${platformField}
              ${directionField}
              <div class="field">
                <label for="conversionRuleName">规则名称</label>
                <input id="conversionRuleName" type="text" placeholder="请输入规则名称">
              </div>
              <div class="field">
                <label for="conversionRuleSourceName">原始字段名称</label>
                <input id="conversionRuleSourceName" type="text" placeholder="请输入原始字段名称">
              </div>
              <div class="field">
                <label for="conversionRuleSourceCode">原始字段编码列表</label>
                <input id="conversionRuleSourceCode" type="text" placeholder="例如：soc_1,soc_2,soc_3">
              </div>
              <div class="field">
                <label for="conversionRuleTargetName">目标字段名称</label>
                <input id="conversionRuleTargetName" type="text" placeholder="请输入目标字段名称">
              </div>
              <div class="field">
                <label for="conversionRuleTargetCode">目标字段编码</label>
                <input id="conversionRuleTargetCode" type="text" placeholder="请输入目标字段编码">
              </div>
              <div class="field">
                <label for="conversionRuleFormula">转换公式</label>
                <input id="conversionRuleFormula" type="text" placeholder="例如：(soc_1 + soc_2 + soc_3) / 3">
              </div>
              <div class="field" style="grid-column:1 / -1;">
                <label for="conversionRuleNote">备注</label>
                <textarea id="conversionRuleNote" placeholder="请输入规则说明"></textarea>
              </div>
            </div>
            <div class="action-row">
              <button type="button" class="button brand" id="saveConversionRule">保存</button>
            </div>
          `,
          'Rule'
        );
      }

      function saveConversionRuleFromDrawer() {
        const type = state.currentConversionRuleType;
        const meta = buildConversionRuleMeta(type);
        if (!meta) return;

        const name = $('#conversionRuleName').value.trim();
        const sourceName = $('#conversionRuleSourceName').value.trim();
        const sourceCode = $('#conversionRuleSourceCode').value.trim();
        const targetName = $('#conversionRuleTargetName').value.trim();
        const targetCode = $('#conversionRuleTargetCode').value.trim();
        const directionType = $('#conversionRuleDirectionType') ? $('#conversionRuleDirectionType').value : '外部-->内部';
        const formulaInput = $('#conversionRuleFormula') ? $('#conversionRuleFormula').value.trim() : '';
        const note = $('#conversionRuleNote').value.trim();

        if (!name || !sourceName || !sourceCode || !targetName || !targetCode) {
          showToast('请完善规则名称及源目标字段信息');
          return;
        }

        const record = {
          id: meta.prefix + String(Date.now()).slice(-6),
          platformId: state.mappingRulePlatformId,
          name,
          directionType,
          updatedAt: formatDateTime(),
          note
        };

        if (type === 'unit') {
          record.sourceUnitName = sourceName;
          record.sourceUnitCode = sourceCode;
          record.targetUnitName = targetName;
          record.targetUnitCode = targetCode;
          record.formula = formulaInput;
        } else if (type === 'timezone') {
          record.sourceTimezoneName = sourceName;
          record.sourceTimezoneCode = sourceCode;
          record.targetTimezoneName = targetName;
          record.targetTimezoneCode = targetCode;
          record.formula = formulaInput;
        } else if (type === 'status') {
          record.sourceFieldName = sourceName;
          record.sourceFieldCode = sourceCode;
          record.targetFieldName = targetName;
          record.targetFieldCode = targetCode;
          record.mappings = parseStatusMappingsTextarea($('#conversionRuleMappings').value);
        } else {
          record.sourceFieldNames = sourceName;
          record.sourceFieldCodes = sourceCode;
          record.targetFieldName = targetName;
          record.targetFieldCode = targetCode;
          record.formula = formulaInput;
        }

        meta.list().unshift(record);
        state.currentConversionRuleId = record.id;
        renderMappings();
        closeDrawer();
        showToast(meta.successText);
      }

      function getMappingList(type) {
        if (type === 'station') return dataStore.stationMappings || [];
        if (type === 'device') return dataStore.deviceMappings || [];
        if (type === 'point') return dataStore.pointMappings || [];
        return [];
      }

      function getMappingRelationById(type, relationId) {
        return getMappingList(type).find((item) => item.id === relationId) || null;
      }

      function getMappingVersionById(versionId) {
        return getMappingVersions().find((item) => item.id === versionId) || getPublishedMappingVersion() || null;
      }

      function getMappingRelationVersions() {
        return dataStore.mappingRelationVersions || [];
      }

      function buildMappingRelationVersionSummary(snapshot) {
        const stationCount = snapshot && snapshot.station ? snapshot.station.length : 0;
        const deviceCount = snapshot && snapshot.device ? snapshot.device.length : 0;
        const pointCount = snapshot && snapshot.point ? snapshot.point.length : 0;
        const controlCount = snapshot && snapshot.control ? snapshot.control.length : 0;
        return `电站映射 ${stationCount} 条 / 设备映射 ${deviceCount} 条 / 点位映射 ${pointCount} 条 / 控制映射 ${controlCount} 条`;
      }

      function syncCurrentMappingRelationVersionSelection() {
        const versions = getScopedMappingRelationVersions();
        if (!versions.length) {
          state.currentMappingRelationVersionId = '';
          return;
        }
        if (!versions.some((item) => item.id === state.currentMappingRelationVersionId)) {
          state.currentMappingRelationVersionId = versions[0].id;
        }
      }

      function getCurrentMappingRelationVersion() {
        syncCurrentMappingRelationVersionSelection();
        return getScopedMappingRelationVersions().find((item) => item.id === state.currentMappingRelationVersionId) || null;
      }

      function getMappingDebugConfig(type) {
        const configs = {
          station: {
            input: '#stationMappingDebugInput',
            output: '#stationMappingDebugOutput',
            badge: '#stationMappingDebugBadge'
          },
          device: {
            input: '#deviceMappingDebugInput',
            output: '#deviceMappingDebugOutput',
            badge: '#deviceMappingDebugBadge'
          },
          point: {
            input: '#pointMappingDebugInput',
            output: '#pointMappingDebugOutput',
            badge: '#pointMappingDebugBadge'
          },
          control: {
            input: '#controlMappingDebugInput',
            output: '#controlMappingDebugOutput',
            badge: '#controlMappingDebugBadge'
          }
        };
        return configs[type] || null;
      }

      function getSampleValueByType(type, code, index) {
        if (type === 'number') return (index + 1) * 1000;
        if (type === 'boolean') return index % 2 === 0;
        if (type === 'enum') {
          if ((code || '').toLowerCase().includes('mode')) return 'GRID';
          return 'RUNNING';
        }
        return `${code || 'field'}_sample_${index + 1}`;
      }

      function buildControlMappingDebugSample(mapping) {
        const request = {};
        const response = {};
        (mapping && mapping.inputMappings ? mapping.inputMappings : []).forEach((item, index) => {
          const external = item.external || {};
          request[external.code || `input_${index + 1}`] = getSampleValueByType(external.type, external.code, index);
        });
        (mapping && mapping.outputMappings ? mapping.outputMappings : []).forEach((item, index) => {
          const external = item.external || {};
          response[external.code || `output_${index + 1}`] = getSampleValueByType(external.type, external.code, index);
        });
        return JSON.stringify({ request, response }, null, 2);
      }

      function getDefaultMappingDebugInput(type) {
        const platformId = state.mappingRelationPlatformId;
        if (type === 'station') {
          if (platformId === 'P003') {
            return JSON.stringify({
              station_id: 'SOUTH-ST-001',
              station_timezone: 'UTC+8'
            }, null, 2);
          }
          return JSON.stringify({
            plant_code: 'PLANT-001',
            plant_name: '华东储能一站',
            tz: 'UTC'
          }, null, 2);
        }
        if (type === 'device') {
          if (platformId === 'P003') {
            return JSON.stringify({
              asset_id: 'EMS-DEV-01',
              device_state: 'ONLINE'
            }, null, 2);
          }
          return JSON.stringify({
            device_sn: 'PCS-0101',
            device_status: 'RUNNING',
            battery_soc: 86000
          }, null, 2);
        }
        if (type === 'point') {
          if (platformId === 'P003') {
            return JSON.stringify({
              power_main: 2100,
              power_backup: 1800,
              soc_wh: 86500
            }, null, 2);
          }
          return JSON.stringify({
            p_active: 5200,
            temp_f: 86,
            soc_1: 91,
            soc_2: 89,
            soc_3: 90
          }, null, 2);
        }
        return buildControlMappingDebugSample(getCurrentControlMapping());
      }

      function getMappingDebugState(type) {
        if (!state.mappingDebug[type]) {
          state.mappingDebug[type] = { input: '', output: '' };
        }
        if (!state.mappingDebug[type].input) {
          state.mappingDebug[type].input = getDefaultMappingDebugInput(type);
        }
        return state.mappingDebug[type];
      }

      function renderMappingDebugPanel(type) {
        const config = getMappingDebugConfig(type);
        if (!config || !$(config.input) || !$(config.output)) return;
        const debugState = getMappingDebugState(type);
        const badge = $(config.badge);
        if (badge) {
          if (type === 'control') {
            const mapping = getCurrentControlMapping();
            badge.textContent = mapping ? `当前映射：${mapping.id}` : '当前映射：-';
          } else {
            badge.textContent = `${getScopedMappingList(type).length} 条映射`;
          }
        }
        $(config.input).value = debugState.input;
        $(config.output).textContent = debugState.output || '点击“运行转换”后输出映射结果。';
      }

      function renderMappingDebugPanels() {
        ['station', 'device', 'point', 'control'].forEach((type) => renderMappingDebugPanel(type));
      }

      function escapeRegExp(text) {
        return String(text || '').replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      }

      function evaluateNumericFormula(formula, context) {
        if (!formula) return null;
        let expression = formula;
        Object.keys(context || {})
          .sort((a, b) => b.length - a.length)
          .forEach((key) => {
            expression = expression.replace(new RegExp(`\\b${escapeRegExp(key)}\\b`, 'g'), String(Number(context[key] ?? 0)));
          });
        if (!/^[0-9+\-*/ ().]+$/.test(expression)) return null;
        try {
          return Function(`"use strict"; return (${expression});`)();
        } catch (error) {
          return null;
        }
      }

      function normalizeNumericResult(value) {
        if (!Number.isFinite(value)) return value;
        return Number(value.toFixed(3));
      }

      function applyUnitRule(rule, value) {
        const numericValue = Number(value);
        if (!Number.isFinite(numericValue)) return value;
        const result = evaluateNumericFormula(rule.formula, { value: numericValue });
        return result === null ? value : normalizeNumericResult(result);
      }

      function applyTimezoneRule(rule, value) {
        if (value === rule.sourceTimezoneCode || value === rule.sourceTimezoneName) {
          return rule.targetTimezoneCode || rule.targetTimezoneName || value;
        }
        const hourMatch = (rule.formula || '').match(/\+\s*(\d+)h/);
        const parsed = new Date(value);
        if (hourMatch && !Number.isNaN(parsed.getTime())) {
          parsed.setUTCHours(parsed.getUTCHours() + Number(hourMatch[1]));
          return parsed.toISOString().replace('T', ' ').slice(0, 19);
        }
        return rule.targetTimezoneCode || value;
      }

      function applyStatusRule(rule, value) {
        const matched = (rule.mappings || []).find((item) => String(item.source) === String(value));
        return matched ? matched.target : value;
      }

      function applyRuleRef(ruleRef, value, platformId = state.mappingRelationPlatformId) {
        if (!ruleRef || value === undefined || value === null || value === '') return value;
        const [type, ruleId] = ruleRef.split(':');
        const rule = getConversionRule(type, ruleId, platformId);
        if (!rule) return value;
        if (type === 'unit') return applyUnitRule(rule, value);
        if (type === 'timezone') return applyTimezoneRule(rule, value);
        if (type === 'status') return applyStatusRule(rule, value);
        return value;
      }

      function applyAggregateRule(ruleId, payload, platformId = state.mappingRelationPlatformId) {
        const rule = getConversionRule('aggregate', ruleId, platformId);
        if (!rule) return null;
        const codes = (rule.sourceFieldCodes || '')
          .split(',')
          .map((item) => item.trim())
          .filter(Boolean);
        const hasValue = codes.some((code) => payload[code] !== undefined && payload[code] !== null && payload[code] !== '');
        if (!hasValue) return null;
        const context = {};
        codes.forEach((code) => {
          context[code] = Number(payload[code] ?? 0);
        });
        const result = evaluateNumericFormula(rule.formula, context);
        return result === null ? null : normalizeNumericResult(result);
      }

      function mapModelDebugData(type, payload) {
        const result = {};
        const platformId = state.mappingRelationPlatformId;
        getScopedMappingList(type, platformId).forEach((item) => {
          let mappedValue = null;
          if (type === 'point' && item.aggregateRuleId) {
            mappedValue = applyAggregateRule(item.aggregateRuleId, payload, platformId);
          } else {
            const externalCodes = (item.externalFieldCode || '')
              .split(',')
              .map((code) => code.trim())
              .filter(Boolean);
            if (externalCodes.length > 1) {
              mappedValue = externalCodes.map((code) => payload[code]).filter((value) => value !== undefined);
            } else {
              mappedValue = payload[externalCodes[0]];
            }
            mappedValue = applyRuleRef(item.ruleRef, mappedValue, platformId);
          }
          result[item.internalFieldCode] = mappedValue === undefined ? null : mappedValue;
        });
        return result;
      }

      function mapControlParams(mappings, payload) {
        const result = {};
        (mappings || []).forEach((item, index) => {
          const internal = item.internal || {};
          const external = item.external || {};
          const key = internal.code || internal.name || `field_${index + 1}`;
          result[key] = external.code && payload[external.code] !== undefined ? payload[external.code] : null;
        });
        return result;
      }

      function mapControlDebugData(payload) {
        const mapping = getCurrentControlMapping();
        if (!mapping) return null;
        const source = payload && typeof payload === 'object' ? payload : {};
        const requestPayload = source.request && typeof source.request === 'object' ? source.request : source;
        const responsePayload = source.response && typeof source.response === 'object' ? source.response : {};
        return {
          mappingId: mapping.id,
          request: mapControlParams(mapping.inputMappings, requestPayload),
          response: mapControlParams(mapping.outputMappings, responsePayload)
        };
      }

      function runMappingDebug(type) {
        const config = getMappingDebugConfig(type);
        if (!config || !$(config.input)) return;
        const debugState = getMappingDebugState(type);
        debugState.input = $(config.input).value.trim();
        try {
          const payload = JSON.parse(debugState.input || '{}');
          const result = type === 'control'
            ? mapControlDebugData(payload)
            : mapModelDebugData(type, payload);
          if (!result) {
            debugState.output = '未找到可调试的映射记录。';
            renderMappingDebugPanel(type);
            showToast('未找到可调试的映射记录');
            return;
          }
          debugState.output = JSON.stringify(result, null, 2);
          renderMappingDebugPanel(type);
          showToast('已完成映射转换');
        } catch (error) {
          debugState.output = `JSON 解析失败：${error.message}`;
          renderMappingDebugPanel(type);
          showToast('原始数据模版格式错误');
        }
      }

      function resetMappingDebug(type) {
        const debugState = getMappingDebugState(type);
        debugState.input = getDefaultMappingDebugInput(type);
        debugState.output = '';
        renderMappingDebugPanel(type);
        showToast('已载入示例数据');
      }

      function getSnapshotModelsByType(versionId, type) {
        const version = getMappingVersionById(versionId);
        if (!version || !version.snapshot) return [];
        return version.snapshot[type] || [];
      }

      function getPrimaryRuleOptions(platformId = state.mappingRelationPlatformId) {
        return [
          ...getScopedConversionRules('unit', platformId).map((item) => ({ value: `unit:${item.id}`, label: `单位转换 / ${item.name}` })),
          ...getScopedConversionRules('timezone', platformId).map((item) => ({ value: `timezone:${item.id}`, label: `时区转换 / ${item.name}` })),
          ...getScopedConversionRules('status', platformId).map((item) => ({ value: `status:${item.id}`, label: `状态码转换 / ${item.name}` }))
        ];
      }

      function getPrimaryRuleLabel(ruleRef, platformId = state.mappingRelationPlatformId) {
        if (!ruleRef) return '未选择';
        const [type, ruleId] = ruleRef.split(':');
        const rule = getConversionRule(type, ruleId, platformId);
        if (!rule) return '未匹配规则';
        const labels = { unit: '单位转换', timezone: '时区转换', status: '状态码转换' };
        return `${labels[type] || '转换规则'} / ${rule.name}`;
      }

      function getAggregateRuleLabel(ruleId, platformId = state.mappingRelationPlatformId) {
        if (!ruleId) return '未选择';
        const rule = getConversionRule('aggregate', ruleId, platformId);
        return rule ? rule.name : '未匹配规则';
      }

      function renderMappingRelationModelOptions(type, versionId, selectedModelName = '') {
        const select = $('#mappingRelationModelSelect');
        if (!select) return;
        const models = getSnapshotModelsByType(versionId, type);
        const modelNames = Array.from(new Set(models.map((item) => item.modelName || item.name).filter(Boolean)));
        select.innerHTML = modelNames.length
          ? modelNames.map((name) => `<option value="${name}">${name}</option>`).join('')
          : '<option value="">当前版本无可选模型</option>';
        const targetValue = selectedModelName && modelNames.includes(selectedModelName)
          ? selectedModelName
          : (modelNames[0] || '');
        select.value = targetValue;
      }

      function openMappingRelationEditor(type, relationId = '') {
        const relation = relationId ? getMappingRelationById(type, relationId) : null;
        const typeLabels = {
          station: '电站模型映射',
          device: '设备模型映射',
          point: '数据点位映射'
        };
        const versionId = relation ? relation.versionId : ((getPublishedMappingVersion() && getPublishedMappingVersion().id) || '');
        const versionOptions = getMappingVersions().map((item) => `
          <option value="${item.id}">${item.version} · ${item.status}</option>
        `).join('');
        const relationPlatformId = relation ? (relation.platformId || state.mappingRelationPlatformId) : state.mappingRelationPlatformId;
        const primaryRuleOptions = getPrimaryRuleOptions(relationPlatformId).map((item) => `
          <option value="${item.value}">${item.label}</option>
        `).join('');
        const aggregateOptions = getScopedConversionRules('aggregate', relationPlatformId).map((item) => `
          <option value="${item.id}">${item.name}</option>
        `).join('');
        const isPoint = type === 'point';

        state.currentMappingRelationType = type;
        state.currentMappingRelationId = relationId || '';

        openDrawer(
          relation ? '编辑映射关系' : '新增映射关系',
          `
            <div class="form-grid">
              <div class="field">
                <label for="mappingRelationPlatformName">所属平台</label>
                <input id="mappingRelationPlatformName" type="text" value="${platformName(relationPlatformId)}" disabled>
              </div>
              <div class="field">
                <label for="mappingRelationTypeLabel">映射类型</label>
                <input id="mappingRelationTypeLabel" type="text" value="${typeLabels[type]}" disabled>
              </div>
              <div class="field">
                <label for="mappingRelationVersionSelect">内部模型版本</label>
                <select id="mappingRelationVersionSelect">${versionOptions}</select>
              </div>
              <div class="field">
                <label for="mappingRelationModelSelect">内部模型名称</label>
                <select id="mappingRelationModelSelect"></select>
              </div>
              <div class="field">
                <label for="mappingRelationInternalFieldName">内部模型字段名称</label>
                <input id="mappingRelationInternalFieldName" type="text" value="${relation ? relation.internalFieldName : ''}">
              </div>
              <div class="field">
                <label for="mappingRelationInternalFieldCode">内部模型字段编码</label>
                <input id="mappingRelationInternalFieldCode" type="text" value="${relation ? relation.internalFieldCode : ''}">
              </div>
              <div class="field">
                <label for="mappingRelationExternalFieldName">外部模型字段名称</label>
                <input id="mappingRelationExternalFieldName" type="text" value="${relation ? relation.externalFieldName : ''}">
              </div>
              <div class="field">
                <label for="mappingRelationExternalFieldCode">外部模型字段编码</label>
                <input id="mappingRelationExternalFieldCode" type="text" value="${relation ? relation.externalFieldCode : ''}">
              </div>
              <div class="field">
                <label for="mappingRelationPrimaryRuleSelect">一对一转换规则</label>
                <select id="mappingRelationPrimaryRuleSelect">
                  <option value="">不选择</option>
                  ${primaryRuleOptions}
                </select>
              </div>
              ${isPoint ? `
                <div class="field">
                  <label for="mappingRelationAggregateRuleSelect">一对多聚合规则</label>
                  <select id="mappingRelationAggregateRuleSelect">
                    <option value="">不选择</option>
                    ${aggregateOptions}
                  </select>
                </div>
                <div class="field">
                  <label for="mappingRelationRelationSelect">关系</label>
                  <select id="mappingRelationRelationSelect">
                    <option value="一对一">一对一</option>
                    <option value="一对多">一对多</option>
                  </select>
                </div>
              ` : `
                <div class="field">
                  <label for="mappingRelationRelationText">关系</label>
                  <input id="mappingRelationRelationText" type="text" value="一对一" disabled>
                </div>
              `}
            </div>
            <div class="action-row">
              <button type="button" class="button brand" id="saveMappingRelation">保存映射关系</button>
            </div>
          `,
          'Mapping Relation'
        );

        if ($('#mappingRelationVersionSelect')) {
          $('#mappingRelationVersionSelect').value = versionId;
        }
        renderMappingRelationModelOptions(type, versionId, relation ? relation.modelName : '');
        $('#mappingRelationPrimaryRuleSelect').value = relation ? relation.ruleRef : '';
        if (isPoint) {
          $('#mappingRelationAggregateRuleSelect').value = relation ? relation.aggregateRuleId : '';
          $('#mappingRelationRelationSelect').value = relation ? relation.relation : '一对一';
        }
      }

      function saveMappingRelationFromDrawer() {
        const type = state.currentMappingRelationType;
        const list = getMappingList(type);
        const versionId = $('#mappingRelationVersionSelect').value;
        const modelName = $('#mappingRelationModelSelect').value.trim();
        const internalFieldName = $('#mappingRelationInternalFieldName').value.trim();
        const internalFieldCode = $('#mappingRelationInternalFieldCode').value.trim();
        const externalFieldName = $('#mappingRelationExternalFieldName').value.trim();
        const externalFieldCode = $('#mappingRelationExternalFieldCode').value.trim();
        const ruleRef = $('#mappingRelationPrimaryRuleSelect').value;
        const aggregateRuleId = $('#mappingRelationAggregateRuleSelect') ? $('#mappingRelationAggregateRuleSelect').value : '';
        const relation = $('#mappingRelationRelationSelect') ? $('#mappingRelationRelationSelect').value : '一对一';

        if (!versionId || !modelName || !internalFieldName || !internalFieldCode || !externalFieldName || !externalFieldCode) {
          showToast('请完善映射关系必填字段');
          return;
        }

        let record = state.currentMappingRelationId ? getMappingRelationById(type, state.currentMappingRelationId) : null;
        if (!record) {
          const prefixes = { station: 'ST-MAP-', device: 'DEV-MAP-', point: 'POINT-MAP-' };
          record = { id: prefixes[type] + String(Date.now()).slice(-6) };
          list.unshift(record);
        }

        record.versionId = versionId;
        record.platformId = state.mappingRelationPlatformId;
        record.modelName = modelName;
        record.internalFieldName = internalFieldName;
        record.internalFieldCode = internalFieldCode;
        record.externalFieldName = externalFieldName;
        record.externalFieldCode = externalFieldCode;
        record.ruleRef = ruleRef;
        record.aggregateRuleId = aggregateRuleId;
        record.relation = type === 'point' ? relation : '一对一';

        renderMappings();
        closeDrawer();
        showToast('映射关系已保存');
      }

      function getControlMappings() {
        return dataStore.controlMappings || [];
      }

      function getAlertRules() {
        return dataStore.alertRules || [];
      }

      function syncCurrentControlMappingSelection() {
        const mappings = getScopedControlMappings();
        if (!mappings.length) {
          state.currentControlMappingId = '';
          return;
        }
        if (!mappings.some((item) => item.id === state.currentControlMappingId)) {
          state.currentControlMappingId = mappings[0].id;
        }
      }

      function getCurrentControlMapping() {
        syncCurrentControlMappingSelection();
        const mapping = getScopedControlMappings().find((item) => item.id === state.currentControlMappingId) || null;
        if (!mapping) return null;
        if (!mapping.inputMappings) {
          const standardParams = (mapping.standard && mapping.standard.params) || [];
          const partnerParams = (mapping.partner && mapping.partner.params) || [];
          const maxLength = Math.max(standardParams.length, partnerParams.length);
          mapping.inputMappings = Array.from({ length: maxLength }).map((_, index) => ({
            internal: standardParams[index] || { name: '', code: '', type: '', unit: '-' },
            external: partnerParams[index] || { name: '', code: '', type: '', unit: '-' }
          }));
        }
        if (!mapping.outputMappings) {
          mapping.outputMappings = [];
        }
        return mapping;
      }

      function syncCurrentAlertRuleSelection() {
        const rules = getAlertRules();
        if (!rules.length) {
          state.currentAlertRuleId = '';
          return;
        }
        if (!rules.some((item) => item.id === state.currentAlertRuleId)) {
          state.currentAlertRuleId = rules[0].id;
        }
      }

      function getCurrentAlertRule() {
        syncCurrentAlertRuleSelection();
        return getAlertRules().find((item) => item.id === state.currentAlertRuleId) || null;
      }

      function getAlertRuleTriggerText(rule) {
        const triggerCount = Number(rule && rule.triggerCount);
        const durationSeconds = Number(rule && rule.durationSeconds);
        if (Number.isFinite(triggerCount) && Number.isFinite(durationSeconds) && triggerCount > 0 && durationSeconds > 0) {
          return `连续触发 ${triggerCount} 次，持续 ${durationSeconds} 秒`;
        }
        return rule && rule.trigger ? rule.trigger : '-';
      }

      function setAlertRuleEnabledToggle(enabled, disabled = false) {
        const toggle = $('#alertRuleEnabledToggle');
        const label = $('#alertRuleEnabledLabel');
        if (!toggle || !label) return;
        const isEnabled = !!enabled;
        toggle.dataset.enabled = isEnabled ? 'true' : 'false';
        toggle.classList.toggle('is-on', isEnabled);
        toggle.setAttribute('aria-checked', isEnabled ? 'true' : 'false');
        toggle.setAttribute('aria-label', isEnabled ? '关闭告警规则' : '开启告警规则');
        toggle.disabled = disabled;
        label.textContent = isEnabled ? '开启' : '关闭';
      }

      function getStrategyById(strategyId, platform = getCurrentPlatform()) {
        return getPlatformStrategies(platform).find((item) => item.id === strategyId) || null;
      }

      function getApiStrategyLabel(api, platform = getCurrentPlatform()) {
        const taskStrategies = getPlatformTasks(platform)
          .filter((task) => normalizeTaskApiConfigs(task, platform).some((item) => item.apiCode === api.code) && task.strategyRef)
          .map((task) => getStrategyById(task.strategyRef, platform)?.name || '')
          .filter(Boolean);
        const uniqueNames = Array.from(new Set(taskStrategies));
        if (uniqueNames.length) {
          return uniqueNames.join(' / ');
        }
        return '未配置任务策略';
      }

      function sleep(ms) {
        return new Promise((resolve) => setTimeout(resolve, ms));
      }

      function formatMs(value) {
        const num = Number(value || 0);
        if (!Number.isFinite(num)) return '-';
        if (num >= 1000) return (num / 1000).toFixed(1).replace('.0', '') + 's';
        return Math.round(num) + 'ms';
      }

      function getApiMetaByCode(apiCode) {
        for (const platform of dataStore.platforms) {
          const api = (platform.apis || []).find((item) => item.code === apiCode);
          if (api) {
            return { api, platform };
          }
        }
        if (apiCode === 'OPEN-STANDARD') {
          return {
            api: { code: 'OPEN-STANDARD', name: '标准开放接口', category: '标准开放' },
            platform: dataStore.platforms.find((item) => item.id === 'P002') || dataStore.platforms[0]
          };
        }
        return { api: { code: apiCode, name: apiCode, category: '未分类' }, platform: null };
      }

      function getCallLogs() {
        return dataStore.logs.filter((log) => log.type === '调用日志');
      }

      function extractSyncVolume(payload = {}) {
        if (!payload || typeof payload !== 'object') return 0;
        const directCount = Number(payload.count);
        if (Number.isFinite(directCount) && directCount > 0) return directCount;

        if (Array.isArray(payload.items)) return payload.items.length;

        const itemsCount = Number(payload.items);
        if (Number.isFinite(itemsCount) && itemsCount > 0) return itemsCount;

        const partnerCount = Number(payload.partnerResponse && payload.partnerResponse.itemCount);
        if (Number.isFinite(partnerCount) && partnerCount > 0) return partnerCount;

        const standardCount = Number(payload.standardResponse && payload.standardResponse.itemCount);
        if (Number.isFinite(standardCount) && standardCount > 0) return standardCount;

        const partnerItems = payload.partnerResponse && payload.partnerResponse.data && payload.partnerResponse.data.items;
        if (Array.isArray(partnerItems)) return partnerItems.length;

        const standardItems = payload.standardResponse && payload.standardResponse.data;
        if (Array.isArray(standardItems)) return standardItems.length;

        return 0;
      }

      function getHomeSyncVolumeRanking() {
        const volumeByPlatform = new Map();

        dataStore.logs
          .filter((log) => ['调用日志', '同步任务日志'].includes(log.type))
          .forEach((log) => {
            const platformId = platformIdByName(log.platform);
            const volume = extractSyncVolume(log.payload);
            if (!platformId || volume <= 0) return;
            volumeByPlatform.set(platformId, (volumeByPlatform.get(platformId) || 0) + volume);
          });

        return dataStore.platforms
          .map((platform) => ({
            platform,
            volume: volumeByPlatform.get(platform.id) || 0
          }))
          .sort((a, b) => {
            if (b.volume !== a.volume) return b.volume - a.volume;
            return b.platform.successRate - a.platform.successRate;
          });
      }

      function percentile(values, p) {
        if (!values.length) return 0;
        const sorted = values.slice().sort((a, b) => a - b);
        const index = Math.min(sorted.length - 1, Math.ceil(sorted.length * p) - 1);
        return sorted[index];
      }

      function openLogsView(options = {}) {
        state.logPlatformId = options.platformId || '';
        state.logType = options.type || '调用日志';
        state.logApiCode = options.apiCode || '';
        state.logFilter = options.result || 'all';
        state.activeLogId = '';
        renderLogs();
        setSection('call-logs');
      }

      function openProtocolLogsView(options = {}) {
        const hasPlatformId = Object.prototype.hasOwnProperty.call(options, 'platformId');
        const hasApiCode = Object.prototype.hasOwnProperty.call(options, 'apiCode');
        const hasTransformType = Object.prototype.hasOwnProperty.call(options, 'transformType');
        const hasResult = Object.prototype.hasOwnProperty.call(options, 'result');

        if (hasPlatformId) state.protocolLogFilters.platformId = options.platformId || '';
        if (hasApiCode) state.protocolLogFilters.apiCode = options.apiCode || '';
        if (hasTransformType) state.protocolLogFilters.transformType = options.transformType || '';
        if (hasResult) state.protocolLogFilters.result = options.result || '';

        state.activeProtocolLogId = '';
        renderProtocolLogFilters();
        renderProtocolLogs();
        setSection('protocol-logs');
      }

      function getProtocolLogs() {
        return dataStore.logs.filter((log) => Boolean(log.transformType));
      }

      function getProtocolApiOptions(platformId = state.protocolLogFilters.platformId) {
        const apiMap = new Map();

        dataStore.platforms.forEach((platform) => {
          if (platformId && platform.id !== platformId) return;
          (platform.apis || []).forEach((api) => {
            apiMap.set(api.code, {
              code: api.code,
              label: api.code + ' · ' + api.name
            });
          });
        });

        getProtocolLogs().forEach((log) => {
          if (platformId && platformIdByName(log.platform) !== platformId) return;
          if (apiMap.has(log.apiCode)) return;
          const { api } = getApiMetaByCode(log.apiCode);
          apiMap.set(log.apiCode, {
            code: log.apiCode,
            label: log.apiCode + ' · ' + api.name
          });
        });

        return Array.from(apiMap.values()).sort((a, b) => a.code.localeCompare(b.code, 'zh-CN'));
      }

      function getFilteredProtocolLogs() {
        return getProtocolLogs().filter((log) => {
          const byPlatform = !state.protocolLogFilters.platformId || platformIdByName(log.platform) === state.protocolLogFilters.platformId;
          const byApi = !state.protocolLogFilters.apiCode || log.apiCode === state.protocolLogFilters.apiCode;
          const byTransformType = !state.protocolLogFilters.transformType || log.transformType === state.protocolLogFilters.transformType;
          const byResult = !state.protocolLogFilters.result || log.result === state.protocolLogFilters.result;
          return byPlatform && byApi && byTransformType && byResult;
        });
      }

      function openApiDesignByCode(apiCode, options = {}) {
        const { api, platform } = getApiMetaByCode(apiCode);
        if (!api || !platform) {
          showToast('未找到关联 API 设计页');
          return;
        }

        state.currentPlatformId = platform.id;
        state.currentApiCode = api.code;
        renderAll();

        const hasEditableApi = (platform.apis || []).some((item) => item.code === api.code);
        if (hasEditableApi) {
          setSection('api-detail');
          if (options.scrollTargetId) {
            setTimeout(() => {
              const target = document.getElementById(options.scrollTargetId);
              if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
              }
            }, 60);
          }
          if (options.toast !== false) {
            showToast('已进入 API 详情页：' + api.name);
          }
          return;
        }

        setSection(getPlatformDetailSection(platform));
        if (options.toast !== false) {
          showToast('当前日志关联的是平台开放接口，已进入平台详情：' + platform.name);
        }
      }

      function renderProtocolLogFilters() {
        const platformSelect = $('#protocolLogPlatformFilter');
        const apiSelect = $('#protocolLogApiFilter');
        const platforms = dataStore.platforms
          .map((platform) => `<option value="${platform.id}">${platform.name}</option>`)
          .join('');

        platformSelect.innerHTML = `<option value="">全部平台</option>${platforms}`;
        platformSelect.value = state.protocolLogFilters.platformId || '';

        const apiOptions = getProtocolApiOptions(state.protocolLogFilters.platformId)
          .map((item) => `<option value="${item.code}">${item.label}</option>`)
          .join('');

        if (state.protocolLogFilters.apiCode && !getProtocolApiOptions(state.protocolLogFilters.platformId).some((item) => item.code === state.protocolLogFilters.apiCode)) {
          state.protocolLogFilters.apiCode = '';
        }

        apiSelect.innerHTML = `<option value="">全部 API</option>${apiOptions}`;
        apiSelect.value = state.protocolLogFilters.apiCode || '';
        $('#protocolLogTypeFilter').value = state.protocolLogFilters.transformType || '';
        $('#protocolLogResultFilter').value = state.protocolLogFilters.result || '';
      }

      function buildProtocolLogDetailContent(active) {
        if (!active) {
          return '<div class="panel-note">未找到协议转换日志详情。</div>';
        }

        const payload = active.payload || {};
        const apiMeta = getApiMetaByCode(active.apiCode);
        const protocolMs = active.stageDurations ? formatMs(active.stageDurations.protocolTransform) : '-';
        const responseMs = active.stageDurations ? formatMs(active.stageDurations.interfaceResponse) : '-';
        const responseTransformMs = active.stageDurations ? formatMs(active.stageDurations.responseTransform) : '-';
        const resultClass = active.result === '成功' ? 'pass' : 'fail';
        const resultText = active.result === '成功'
          ? '本次协议转换链路已完成，标准入参、第三方请求、第三方返回和标准返回均已归档。'
          : (payload.errorLog || '本次转换失败，请检查异常日志和字段映射规则。');

        return `
          <div class="panel-header">
            <div>
              <h4>${apiMeta.api.name}</h4>
              <p class="section-copy">${active.time} · ${active.platform} · ${active.transformType}</p>
            </div>
            <span class="status-pill ${statusClass(active.result)}">${active.result}</span>
          </div>
          <div class="result-box ${resultClass}">${resultText}</div>
          <div class="line-list">
            <div class="line-item"><span class="line-key">日志编号</span><span>${active.id}</span></div>
            <div class="line-item"><span class="line-key">API 编码</span><span>${active.apiCode}</span></div>
            <div class="line-item"><span class="line-key">日志类型</span><span>${active.type}</span></div>
            <div class="line-item"><span class="line-key">接口 / 操作</span><span>${active.action}</span></div>
            <div class="line-item"><span class="line-key">协议转换耗时</span><span>${protocolMs}</span></div>
            <div class="line-item"><span class="line-key">接口响应耗时</span><span>${responseMs}</span></div>
            <div class="line-item"><span class="line-key">返回转换耗时</span><span>${responseTransformMs}</span></div>
          </div>
          <div class="action-row">
            <button type="button" class="button secondary" data-open-api-design="${active.apiCode}">跳转 API 详情设计</button>
          </div>
          <div class="mini-panel">
            <h4>标准入参</h4>
            <pre class="detail-code">${JSON.stringify(payload.standardRequest || {}, null, 2)}</pre>
          </div>
          <div class="mini-panel">
            <h4>调用参数</h4>
            <pre class="detail-code">${JSON.stringify(payload.partnerRequest || {}, null, 2)}</pre>
          </div>
          <div class="mini-panel">
            <h4>第三方返回</h4>
            <pre class="detail-code">${JSON.stringify(payload.partnerResponse || {}, null, 2)}</pre>
          </div>
          <div class="mini-panel">
            <h4>标准返回</h4>
            <pre class="detail-code">${JSON.stringify(payload.standardResponse || {}, null, 2)}</pre>
          </div>
        `;
      }

      function openProtocolLogDetailDrawer(logId = state.activeProtocolLogId) {
        const logs = getFilteredProtocolLogs();
        const active = logs.find((item) => item.id === logId) || getProtocolLogs().find((item) => item.id === logId);
        if (!active) {
          showToast('未找到协议转换日志详情');
          return;
        }
        state.activeProtocolLogId = active.id;
        openDrawer('协议转换日志详情', buildProtocolLogDetailContent(active), 'Protocol');
      }

      function renderProtocolLogs() {
        const logs = getFilteredProtocolLogs();
        const active = logs.find((item) => item.id === state.activeProtocolLogId) || null;
        state.activeProtocolLogId = active ? active.id : '';

        $('#protocolLogTableBody').innerHTML = logs.map((item) => `
          <tr class="${item.id === state.activeProtocolLogId ? 'selected' : ''}" data-protocol-log-id="${item.id}">
            <td>${item.time}</td>
            <td>${item.platform}</td>
            <td>${item.apiCode}</td>
            <td>${item.transformType}</td>
            <td><span class="status-pill ${statusClass(item.result)}">${item.result}</span></td>
            <td>${item.duration}</td>
            <td>
              <div class="action-row">
                <button type="button" class="button ghost" data-protocol-log-action="detail" data-log-id="${item.id}">详情</button>
                <button type="button" class="button ghost" data-open-api-design="${item.apiCode}">API详情</button>
              </div>
            </td>
          </tr>
        `).join('') || '<tr><td colspan="7" class="muted">当前筛选条件下暂无转换日志。</td></tr>';
      }

      function formatProtocolBucketLabel(timeText) {
        const parts = String(timeText || '00:00:00').split(':');
        const hour = Number(parts[0] || 0);
        const minute = Number(parts[1] || 0);
        const bucketMinute = Math.floor(minute / 10) * 10;
        return `${String(hour).padStart(2, '0')}:${String(bucketMinute).padStart(2, '0')}`;
      }

      function renderProtocolOverviewCharts() {
        if ($('#protocolMonitorTrendCanvas')) {
          renderProtocolMonitor();
        }
      }

      function renderOverallDebugStages(stages) {
        const container = $('#overallDebugStageList');
        if (!container) return;
        container.innerHTML = stages.map((stage) => `
          <div class="stage-item ${stage.status}">
            <div class="stage-head">
              <strong>${stage.name}</strong>
              <span>${stage.badge}</span>
            </div>
            <div class="stage-message">${stage.message}</div>
          </div>
        `).join('');
      }

      function buildOverallDebugRequest(api) {
        const debugInput = parseJsonText($('#overallDebugInput').value);
        const requestResult = runTransformScript(
          $('#apiRequestScript').value,
          'transformRequest',
          debugInput,
          { api, baseUrl: getCurrentPlatform().baseUrl, platform: getCurrentPlatform() }
        );
        state.overallDebug.apiCode = api.code;
        state.overallDebug.requestResult = requestResult;
        $('#overallDebugRequestOutput').textContent = JSON.stringify(requestResult, null, 2);
        return requestResult;
      }

      async function runOverallDebugFlow() {
        const api = getCurrentApi();
        if (!api) {
          showToast('请先选择 API');
          return;
        }

        try {
          const requestResult = state.overallDebug.apiCode === api.code && state.overallDebug.requestResult
            ? state.overallDebug.requestResult
            : buildOverallDebugRequest(api);

          const stages = [
            { name: '生成调用参数', status: 'done', badge: '已完成', message: '已生成第三方调用参数，等待发起接口请求。' },
            { name: '调用第三方 API', status: 'running', badge: '执行中', message: '正在发起 HTTP 请求并等待第三方平台响应。' },
            { name: '返回协议转换', status: 'pending', badge: '待执行', message: '请求返回后转换为平台标准格式。' },
            { name: '标准格式校验', status: 'pending', badge: '待执行', message: '校验输出是否符合平台标准响应结构。' }
          ];
          renderOverallDebugStages(stages);
          $('#overallDebugResultBox').className = 'result-box info';
          $('#overallDebugResultBox').textContent = '整体调试运行中，请关注调用阶段进度。';
          $('#overallDebugFinalOutput').textContent = '等待第三方 API 返回...';

          await sleep(320);
          stages[1] = { name: '调用第三方 API', status: 'done', badge: '已完成', message: '第三方平台已返回响应，准备执行返回协议转换。' };
          stages[2] = { name: '返回协议转换', status: 'running', badge: '执行中', message: '正在将第三方响应转换为平台标准返回格式。' };
          renderOverallDebugStages(stages);

          const partnerResponse = parseJsonText($('#apiResponseTemplate').value);
          await sleep(280);
          const responseResult = runTransformScript(
            $('#apiResponseScript').value,
            'transformResponse',
            partnerResponse,
            { api, baseUrl: getCurrentPlatform().baseUrl, platform: getCurrentPlatform() }
          );

          stages[2] = { name: '返回协议转换', status: 'done', badge: '已完成', message: '返回协议已完成转换，开始校验标准格式。' };
          stages[3] = { name: '标准格式校验', status: 'running', badge: '执行中', message: '正在校验 code、data 等标准响应字段。' };
          renderOverallDebugStages(stages);

          await sleep(240);
          const passed = validateStandardResponse(responseResult);
          stages[3] = {
            name: '标准格式校验',
            status: passed ? 'done' : 'error',
            badge: passed ? '通过' : '未通过',
            message: passed ? '输出结果符合平台标准数据格式。' : '输出结果未通过平台标准数据格式校验。'
          };
          renderOverallDebugStages(stages);

          $('#apiRequestOutput').textContent = JSON.stringify(requestResult, null, 2);
          $('#apiResponseOutput').textContent = JSON.stringify(responseResult, null, 2);
          $('#apiResponseStatusBox').style.display = 'block';
          $('#apiResponseStatusBox').className = 'result-box ' + (passed ? 'pass' : 'fail');
          $('#apiResponseStatusBox').textContent = passed ? '标准返回格式校验通过' : '标准返回格式校验未通过';

          $('#overallDebugFinalOutput').textContent = JSON.stringify(responseResult, null, 2);
          $('#overallDebugResultBox').className = 'result-box ' + (passed ? 'pass' : 'fail');
          $('#overallDebugResultBox').textContent = passed
            ? '整体调试通过，输出结果符合平台标准数据格式。'
            : '整体调试已完成，但输出结果未通过平台标准数据格式校验。';
          showToast(passed ? '整体调试通过' : '整体调试完成，但标准格式校验未通过');
        } catch (error) {
          renderOverallDebugStages([
            { name: '生成调用参数', status: 'error', badge: '失败', message: '运行失败：' + error.message },
            { name: '调用第三方 API', status: 'pending', badge: '未执行', message: '等待修正输入参数或转换脚本。' },
            { name: '返回协议转换', status: 'pending', badge: '未执行', message: '等待上一步完成。' },
            { name: '标准格式校验', status: 'pending', badge: '未执行', message: '等待上一步完成。' }
          ]);
          $('#apiResponseStatusBox').style.display = 'block';
          $('#apiResponseStatusBox').className = 'result-box fail';
          $('#apiResponseStatusBox').textContent = '整体调试失败';
          $('#apiResponseOutput').textContent = '整体调试失败：\n' + error.message;
          $('#overallDebugResultBox').className = 'result-box fail';
          $('#overallDebugResultBox').textContent = '整体调试失败：' + error.message;
          $('#overallDebugFinalOutput').textContent = '整体调试失败：\n' + error.message;
          showToast('整体调试失败');
        }
      }

      function getRequestScriptValue(api, protocol) {
        if (protocol && protocol.requestScript) return protocol.requestScript;
        return `function transformRequest(standardInput, context) {
    return {
      url: context.baseUrl + "${api.subUrl || api.path}",
      method: "${api.method}",
      params: standardInput
    };
  }`;
      }

      function getResponseScriptValue(api, protocol) {
        if (protocol && protocol.responseScript) return protocol.responseScript;
        return `function transformResponse(partnerResponse, context) {
    return {
      code: String(partnerResponse.code ?? "0"),
      data: partnerResponse.data ?? partnerResponse
    };
  }`;
      }

      function createDefaultApiProtocol(api) {
        return {
          protocolType: 'HTTP / JSON',
          version: 'v1.0',
          requestScript: `function transformRequest(standardInput, context) {\n  return {\n    url: context.baseUrl + "${api.subUrl || api.path}",\n    method: "${api.method}",\n    params: standardInput\n  };\n}`,
          responseScript: `function transformResponse(partnerResponse, context) {\n  return {\n    code: String(partnerResponse.code ?? "0"),\n    data: partnerResponse.data ?? partnerResponse\n  };\n}`,
          requestMappings: [
            ['requestId', 'request_id', 'query', 'string', 'direct'],
            ['startTime', 'start_time', 'query', 'datetime', 'UTC+8 -> UTC']
          ],
          responseMappings: [
            ['data.items[].id', 'id', 'string', 'direct', '记录日志'],
            ['data.items[].status', 'status', 'enum', '状态码映射', '告警']
          ],
          requestStandardSample: `{
    "requestId": "${api.code}-DEBUG-001",
    "startTime": "2026-03-24 10:00:00"
  }`,
          requestPartnerSample: `${api.method} ${api.path}?request_id=${api.code}-DEBUG-001&start_time=2026-03-24T02:00:00Z`,
          responsePartnerSample: `{
    "code": 0,
    "data": {
      "items": [
        {"id": "ITEM-001", "status": "ok"}
      ]
    }
  }`,
          responseStandardSample: `{
    "code": "0",
    "data": [
      {"id": "ITEM-001", "status": "正常"}
    ]
  }`,
          debugSuccess: `调试通过

  API ${api.code} 已完成默认协议转换验证。`,
          debugError: `调试失败

  返回字段未命中默认规则，请补充 API 级协议转换配置。`,
          logs: [
            ['2026-03-24 10:35:00', '成功', '新建 API 默认调试通过', '320ms']
          ]
        };
      }

      function parseJsonText(text) {
        return JSON.parse((text || '').trim() || '{}');
      }

      function parseHeaderDefinitionItems(value) {
        if (Array.isArray(value)) {
          return value
            .map((item) => ({
              key: (item.key || '').trim(),
              value: (item.value || '').trim()
            }))
            .filter((item) => item.key || item.value);
        }

        if (value && typeof value === 'object') {
          return Object.entries(value).map(([key, headerValue]) => ({
            key: String(key).trim(),
            value: String(headerValue || '').trim()
          })).filter((item) => item.key || item.value);
        }

        return String(value || '')
          .split('\n')
          .map((line) => line.trim())
          .filter(Boolean)
          .map((line) => {
            const index = line.indexOf(':');
            if (index === -1) {
              return { key: line.trim(), value: '' };
            }
            return {
              key: line.slice(0, index).trim(),
              value: line.slice(index + 1).trim()
            };
          })
          .filter((item) => item.key || item.value);
      }

      function stringifyHeaderDefinitionItems(items) {
        return (items || [])
          .filter((item) => item.key || item.value)
          .map((item) => `${item.key}: ${item.value}`.trim())
          .join('\n');
      }

      function getAuthHeaderItems(config, field) {
        const itemsField = field + 'Items';
        if (!Array.isArray(config[itemsField]) || !config[itemsField].length) {
          config[itemsField] = parseHeaderDefinitionItems(config[field]);
        }
        return config[itemsField];
      }

      function renderAuthHeaderRows(target, items, type) {
        const variableHint = type === 'token' ? '支持变量，例如 Bearer ${accessToken}' : '支持变量，例如 ${clientId}';
        $(target).innerHTML = items.map((item, index) => `
          <div class="kv-row" data-auth-header-row="${type}" data-auth-header-index="${index}">
            <input
              class="cell-input"
              data-auth-header-field="key"
              data-auth-header-type="${type}"
              data-auth-header-index="${index}"
              value="${item.key || ''}"
              placeholder="Header Key"
            >
            <input
              class="cell-input"
              data-auth-header-field="value"
              data-auth-header-type="${type}"
              data-auth-header-index="${index}"
              value="${item.value || ''}"
              placeholder="${variableHint}"
            >
            <button
              type="button"
              class="button ghost"
              data-auth-header-remove="${type}"
              data-auth-header-index="${index}"
            >删除</button>
          </div>
        `).join('') || `
          <div class="kv-hint">暂无 Header 记录，点击右上角“新增 Header”开始配置。</div>
        `;
      }

      function collectAuthHeaderItems(type) {
        return $$(`[data-auth-header-type="${type}"][data-auth-header-field="key"]`).map((keyInput) => {
          const index = keyInput.dataset.authHeaderIndex;
          const valueInput = document.querySelector(`[data-auth-header-type="${type}"][data-auth-header-field="value"][data-auth-header-index="${index}"]`);
          return {
            key: keyInput.value.trim(),
            value: valueInput ? valueInput.value.trim() : ''
          };
        }).filter((item) => item.key || item.value);
      }

      function buildDefaultAuthConfig(platform) {
        const presets = {
          P001: {
            mode: 'API Key',
            tokenUrl: 'https://partner-east-storage.example.com/auth/token',
            requestMethod: 'POST',
            clientId: 'east-storage-prod',
            appKey: 'APPKEY-EAST-STORAGE-01',
            secret: '******',
            headerDefinition: `Content-Type: application/json
  X-App-Id: east-storage-prod
  X-Env: prod`,
            tokenHeaderDefinition: `Authorization: Bearer \${accessToken}
  X-App-Key: APPKEY-EAST-STORAGE-01`,
            requestBuilderScript: `function buildAuthRequest(context) {
    return {
      grant_type: 'client_credentials',
      client_id: context.clientId,
      app_key: context.appKey,
      client_secret: context.clientSecret,
      scope: 'station.read device.read control.write'
    };
  }`,
            tokenParserScript: `function parseToken(response) {
    return {
      accessToken: response.access_token,
      expiresIn: response.expires_in,
      refreshToken: response.refresh_token || ''
    };
  }`
          },
          P003: {
            mode: 'OAuth2.0',
            tokenUrl: 'https://south-agg-test.example.com/oauth/token',
            requestMethod: 'POST',
            clientId: 'south-agg-test',
            appKey: 'APPKEY-SOUTH-AGG-TEST',
            secret: '******',
            headerDefinition: `Content-Type: application/x-www-form-urlencoded
  X-Tenant-Code: south-agg
  X-Trace-Source: adaptor-center`,
            tokenHeaderDefinition: `Authorization: Bearer \${accessToken}
  X-App-Key: APPKEY-SOUTH-AGG-TEST`,
            requestBuilderScript: `function buildAuthRequest(context) {
    return {
      grant_type: 'client_credentials',
      client_id: context.clientId,
      app_key: context.appKey,
      client_secret: context.clientSecret,
      audience: 'station-data'
    };
  }`,
            tokenParserScript: `function parseToken(response) {
    return {
      accessToken: response.data ? response.data.access_token : response.access_token,
      expiresIn: response.data ? response.data.expires_in : response.expires_in,
      tokenType: response.data ? response.data.token_type : response.token_type
    };
  }`
          },
          P004: {
            mode: '证书认证',
            tokenUrl: 'https://regional-ems.example.com/auth/cert/token',
            requestMethod: 'POST',
            clientId: 'regional-ems',
            appKey: 'APPKEY-REGIONAL-EMS',
            secret: 'CERT_MODE',
            headerDefinition: `Content-Type: application/json
  X-Cert-Serial: EMS-PROD-2026
  X-Sign-Alg: HMAC-SHA256`,
            tokenHeaderDefinition: `Authorization: Bearer \${accessToken}
  X-App-Key: APPKEY-REGIONAL-EMS`,
            requestBuilderScript: `function buildAuthRequest(context) {
    return {
      client_id: context.clientId,
      app_key: context.appKey,
      cert_serial: 'EMS-PROD-2026',
      nonce: 'AUTO_GENERATE',
      timestamp: Date.now()
    };
  }`,
            tokenParserScript: `function parseToken(response) {
    return {
      accessToken: response.token,
      expiresAt: response.expire_time,
      sessionId: response.session_id || ''
    };
  }`
          }
        };
        return presets[platform.id] || {
          mode: platform.auth || 'API Key',
          tokenUrl: `${platform.baseUrl || 'https://partner.example.com'}/oauth/token`,
          requestMethod: 'POST',
          clientId: platform.appId || '',
          appKey: platform.apiKey || '',
          secret: platform.apiKey || '******',
          headerDefinition: `Content-Type: application/json
  X-App-Id: ${platform.appId || 'demo-app'}`,
          tokenHeaderDefinition: `Authorization: Bearer \${accessToken}
  X-App-Key: ${platform.apiKey || 'demo-app-key'}`,
          requestBuilderScript: `function buildAuthRequest(context) {
    return {
      client_id: context.clientId,
      app_key: context.appKey,
      client_secret: context.clientSecret
    };
  }`,
          tokenParserScript: `function parseToken(response) {
    return {
      accessToken: response.access_token || response.token,
      expiresIn: response.expires_in || 7200
    };
  }`
        };
      }

      function buildDefaultSignConfig(platform) {
        const signEnabled = platform.auth !== 'API Key';
        return {
          enabled: signEnabled,
          algorithm: 'HMAC-SHA256',
          secretKeyType: 'AppSecret',
          signField: 'sign',
          signConcatRule: 'keyname1=${params.username}&keyname2=${body}&keyname3=${body.xxx}+${appSecret}',
          encoding: 'UTF-8',
          letterCase: '大写',
          timestampUnit: '秒',
          nonceLength: 16
        };
      }

      const activeDataTypeOptions = [
        { value: '电站数据', desc: '电站基础信息与站级台账' },
        { value: '设备数据', desc: '设备清单与设备属性数据' },
        { value: '点位数据', desc: '实时点位与当前状态点位' },
        { value: '告警数据', desc: '告警事件与告警状态数据' },
        { value: '历史点位数据', desc: '历史点位与时序补采数据' }
      ];

      function buildDefaultActiveDataTypes(platform) {
        const presets = {
          P001: ['电站数据', '设备数据', '点位数据', '告警数据', '历史点位数据'],
          P003: ['电站数据', '设备数据', '告警数据'],
          P004: ['设备数据', '点位数据', '告警数据']
        };
        if (presets[platform.id]) return presets[platform.id].slice();
        if (platform.modes && platform.modes.includes('主动拉取')) {
          return ['电站数据', '设备数据', '点位数据'];
        }
        return [];
      }

      function getActiveDataTypes(platform = getCurrentPlatform()) {
        if (!platform.ingestDataTypes) {
          platform.ingestDataTypes = buildDefaultActiveDataTypes(platform);
        }
        return platform.ingestDataTypes;
      }

      function getActiveAuthConfig(platform = getCurrentPlatform()) {
        if (!platform.authConfig) {
          platform.authConfig = buildDefaultAuthConfig(platform);
        }
        return platform.authConfig;
      }

      function getActiveSignConfig(platform = getCurrentPlatform()) {
        if (!platform.signConfig) {
          platform.signConfig = buildDefaultSignConfig(platform);
        }
        return platform.signConfig;
      }

      function runTransformScript(scriptText, fnName, input, context) {
        const executor = new Function('input', 'context', `${scriptText}
  if (typeof ${fnName} !== 'function') {
    throw new Error('${fnName} 未定义');
  }
  return ${fnName}(input, context);`);
        return executor(input, context);
      }

      function validateStandardResponse(output) {
        return Boolean(output && typeof output === 'object' && 'code' in output && 'data' in output);
      }

      function statusClass(status) {
        if (status === '已启用' || status === '通过' || status === '成功' || status === '已处理' || status === '已关闭') return 'ok';
        if (status === '异常' || status === '失败') return 'danger';
        if (status === '待验证' || status === '处理中' || status === '待处理' || status === '已通知' || status === '高') return 'warn';
        return 'info';
      }

      function getPlatformAccessMode(platform = getCurrentPlatform()) {
        return getPlatformDetailSection(platform) === 'standard' ? '标准开放' : '主动拉取';
      }

      function getStandardSpiConfig() {
        return dataStore.standardSpiConfig || {};
      }

      function renderTopbar() {
        const platform = getCurrentPlatform();
        $('#mainTopbar').style.display = 'none';
        $('#topbarSubtitle').textContent = '当前聚焦平台：' + platform.name + '。可在平台接入管理中切换平台，所有详情页会联动更新。';
        $('#topPlatformStatus').textContent = platform.status;
        $('#topPlatformStatus').className = 'chip dot';
        $('#topPlatformModes').textContent = platform.modes.join(' / ');
        $('#standardPlatformBadge').textContent = '当前平台：北方逆变器开放平台';
        $('#activePlatformBadge').textContent = '当前平台：' + platform.name;
      }

      function syncMappingPanelSelection() {
        const validPanels = ['mapping-model-center', 'mapping-rule-center', 'mapping-relation-center'];
        if (!validPanels.includes(state.mappingPanel)) {
          state.mappingPanel = 'mapping-model-center';
        }
      }

      function renderMappingSidebarNavigation() {
        syncMappingPanelSelection();
        const labels = {
          'mapping-model-center': '内部模型管理',
          'mapping-rule-center': '转换规则管理',
          'mapping-relation-center': '模型映射管理'
        };
        ['mapping-model-center', 'mapping-rule-center', 'mapping-relation-center'].forEach((panelId) => {
          const panel = document.getElementById(panelId);
          if (panel) {
            panel.classList.toggle('active', state.mappingPanel === panelId);
          }
        });
        $$('.nav-sub-button[data-section="mapping"]').forEach((button) => {
          button.classList.toggle('active', state.section === 'mapping' && button.dataset.mappingPanel === state.mappingPanel);
        });
        const chip = $('#mappingSidebarLocation');
        if (chip) {
          chip.textContent = '当前模块：' + labels[state.mappingPanel];
        }
      }

      function getNavFolderAncestors(section = state.section) {
        const folderMap = {
          platforms: ['platform-access'],
          standard: ['platform-access'],
          'active-config': ['platform-access', 'active-sync'],
          'api-detail': ['platform-access', 'active-sync'],
          'call-logs': ['audit-logs'],
          'protocol-logs': ['audit-logs']
        };
        return folderMap[section] || [];
      }

      function renderNavFolders() {
        const activeFolders = new Set(getNavFolderAncestors());
        $$('.nav-folder').forEach((folder) => {
          const folderId = folder.dataset.folderId;
          const isOpen = Boolean(state.navFolders[folderId]);
          const row = folder.querySelector('.nav-folder-row');
          const labelButton = row ? row.querySelector('.nav-button, .nav-sub-button') : null;

          folder.classList.toggle('open', isOpen);
          if (labelButton) {
            labelButton.classList.toggle('child-active', activeFolders.has(folderId) && !labelButton.classList.contains('active'));
          }
        });

        $$('[data-folder-toggle]').forEach((toggle) => {
          const folderId = toggle.dataset.folderToggle;
          const isOpen = Boolean(state.navFolders[folderId]);
          toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
          toggle.setAttribute('aria-label', isOpen ? '收起子菜单' : '展开子菜单');
        });
      }

      function syncNavFolders(section = state.section) {
        getNavFolderAncestors(section).forEach((folderId) => {
          state.navFolders[folderId] = true;
        });
        renderNavFolders();
      }

      function parseRate(value) {
        return Number(String(value || '0').replace('%', '')) || 0;
      }

      function createDonutGradient(segments) {
        const total = segments.reduce((sum, item) => sum + item.value, 0);
        if (!total) {
          return 'conic-gradient(rgba(16, 35, 63, 0.08) 0 360deg)';
        }
        let current = 0;
        const stops = segments.map((item) => {
          const next = current + (item.value / total) * 360;
          const stop = `${item.color} ${current}deg ${next}deg`;
          current = next;
          return stop;
        });
        if (current < 360) {
          stops.push(`rgba(16, 35, 63, 0.08) ${current}deg 360deg`);
        }
        return `conic-gradient(${stops.join(', ')})`;
      }

      function renderScaledBars(target, items, options = {}) {
        const formatter = options.formatter || ((value) => String(value));
        const maxValue = options.maxValue || Math.max(...items.map((item) => item.value), 1);
        $(target).innerHTML = items.map((item) => {
          const width = item.value <= 0 ? 8 : Math.max(12, (item.value / maxValue) * 100);
          const label = item.action
            ? `<button type="button" class="button ghost" style="padding:0;background:transparent;border:0;box-shadow:none;text-align:left;font-weight:600" ${item.action}>${item.label}</button>`
            : `<span>${item.label}</span>`;
          return `
            <div class="bar-row">
              ${label}
              <div class="bar-track"><div class="bar-fill" style="width:${width}%"></div></div>
              <strong>${formatter(item.value)}</strong>
            </div>
          `;
        }).join('');
      }

      function renderOverviewMetrics() {
        const legacy = $('#overviewMetrics');
        if (legacy) {
          legacy.innerHTML = '';
        }
      }

      function renderHomeDashboard() {
        const metricsContainer = $('#homeMonitorMetrics');
        if (!metricsContainer) return;

        const platforms = dataStore.platforms.slice();
        const callLogs = getCallLogs();
        const syncLogs = dataStore.logs.filter((log) => ['调用日志', '同步任务日志'].includes(log.type));
        const successfulCalls = callLogs.filter((log) => log.result === '成功').length;
        const successfulSync = syncLogs.filter((log) => log.result === '成功').length;
        const avgResponseMs = callLogs.length
          ? Math.round(callLogs.reduce((sum, log) => sum + Number(log.latencyMs || 0), 0) / callLogs.length)
          : 0;
        const healthScore = platforms.length
          ? Math.round(platforms.reduce((sum, item) => sum + Number(item.health || 0), 0) / platforms.length)
          : 0;
        const interfaceAvailability = callLogs.length ? (successfulCalls / callLogs.length) * 100 : 0;
        const syncSuccessRate = syncLogs.length ? (successfulSync / syncLogs.length) * 100 : 0;

        metricsContainer.innerHTML = [
          { label: '平台健康度评分', value: healthScore + '分', trend: `覆盖 ${platforms.length} 个平台` },
          { label: '接口可用率', value: interfaceAvailability.toFixed(1) + '%', trend: `${successfulCalls}/${callLogs.length || 0}` },
          { label: '同步成功率', value: syncSuccessRate.toFixed(1) + '%', trend: `${successfulSync}/${syncLogs.length || 0}` },
          { label: '平均响应时间', value: formatMs(avgResponseMs), trend: '实时接口调用平均耗时' }
        ].map((item) => `
          <div class="home-monitor-metric flow-blue-card">
            <div class="home-monitor-label">${item.label}</div>
            <div class="home-monitor-value">${item.value}</div>
            <div class="home-monitor-sub">${item.trend}</div>
          </div>
        `).join('');

        const clock = $('#homeRealtimeClock');
        if (clock) {
          const now = new Date();
          const hh = String(now.getHours()).padStart(2, '0');
          const mm = String(now.getMinutes()).padStart(2, '0');
          const ss = String(now.getSeconds()).padStart(2, '0');
          clock.textContent = `${hh}:${mm}:${ss}`;
        }

        const healthTrendCanvas = $('#homeHealthTrendCanvas');
        if (healthTrendCanvas && window.Chart) {
          if (homeMonitorCharts.healthTrend) homeMonitorCharts.healthTrend.destroy();
          const labels = [];
          const values = [];
          const baseDate = new Date('2026-03-24T00:00:00+08:00');
          for (let index = 6; index >= 0; index -= 1) {
            const date = new Date(baseDate.getTime() - index * 24 * 60 * 60 * 1000);
            labels.push(String(date.getMonth() + 1).padStart(2, '0') + '-' + String(date.getDate()).padStart(2, '0'));
            const value = Math.max(60, Math.min(100, healthScore + Math.round(4 * Math.sin((7 - index) / 2.4) - 2 * Math.cos((7 - index) / 3.1))));
            values.push(value);
          }
          homeMonitorCharts.healthTrend = new window.Chart(healthTrendCanvas.getContext('2d'), {
            type: 'line',
            data: {
              labels,
              datasets: [{
                label: '健康度评分',
                data: values,
                borderColor: '#2f78e6',
                backgroundColor: 'rgba(47, 120, 230, 0.18)',
                fill: true,
                borderWidth: 2.4,
                tension: 0.3,
                pointRadius: 2
              }]
            },
            options: {
              responsive: true,
              maintainAspectRatio: false,
              plugins: { legend: { display: false } },
              scales: {
                x: { grid: { display: false }, ticks: { color: '#56709b' } },
                y: { beginAtZero: true, max: 100, ticks: { color: '#56709b' }, grid: { color: 'rgba(50, 102, 184, 0.12)' } }
              }
            }
          });
        }

        const compareCanvas = $('#homePerformanceCompareCanvas');
        if (compareCanvas && window.Chart) {
          if (homeMonitorCharts.performanceCompare) homeMonitorCharts.performanceCompare.destroy();
          const platformRows = platforms.map((platform) => {
            const logs = callLogs.filter((item) => item.platform === platform.name);
            const successCount = logs.filter((item) => item.result === '成功').length;
            const availability = logs.length ? (successCount / logs.length) * 100 : platform.successRate;
            const avgLatency = logs.length
              ? Math.round(logs.reduce((sum, item) => sum + Number(item.latencyMs || 0), 0) / logs.length)
              : 0;
            const syncSuccess = platform.successRate || 0;
            const latencyScore = avgLatency > 0 ? Math.max(0, 100 - avgLatency / 25) : 85;
            const performanceScore = Math.round(availability * 0.45 + syncSuccess * 0.35 + latencyScore * 0.2);
            return {
              name: platform.name,
              score: performanceScore
            };
          }).sort((a, b) => b.score - a.score);

          homeMonitorCharts.performanceCompare = new window.Chart(compareCanvas.getContext('2d'), {
            type: 'bar',
            data: {
              labels: platformRows.map((item) => item.name),
              datasets: [{
                label: '综合性能评分',
                data: platformRows.map((item) => item.score),
                backgroundColor: 'rgba(29, 94, 184, 0.72)',
                borderRadius: 8
              }]
            },
            options: {
              responsive: true,
              maintainAspectRatio: false,
              plugins: { legend: { display: false } },
              scales: {
                x: { grid: { display: false }, ticks: { color: '#56709b' } },
                y: { beginAtZero: true, max: 100, ticks: { color: '#56709b' }, grid: { color: 'rgba(50, 102, 184, 0.12)' } }
              }
            }
          });
        }

        const activeAlerts = dataStore.alerts.filter((item) => item.status !== '已关闭');
        $('#homeRealtimeAlertList').innerHTML = (activeAlerts.length ? activeAlerts.slice(0, 5).map((item) => `
          <div class="home-monitor-item">
            <strong>${item.title}</strong> · ${item.type} · ${platformName(item.platformId)}<br>
            当前状态：${item.status}，已自动通知负责人 ${item.owner || '未分配'}
          </div>
        `).join('') : '<div class="home-monitor-item">暂无进行中的异常告警，系统运行稳定。</div>');

        $('#homePlatformStatusList').innerHTML = platforms.map((platform) => {
          const logs = callLogs.filter((item) => item.platform === platform.name);
          const successCount = logs.filter((item) => item.result === '成功').length;
          const availability = logs.length ? (successCount / logs.length) * 100 : platform.successRate;
          const syncState = platform.status === '异常' ? '同步异常' : (platform.status === '已启用' ? '同步正常' : '待验证');
          const onlineState = platform.status === '已启用' ? '在线' : (platform.status === '已停用' ? '离线' : '波动');
          return `
            <div class="home-monitor-item">
              <strong>${platform.name}</strong> · 在线状态：${onlineState}<br>
              接口可用性：${availability.toFixed(1)}% · 数据同步状态：${syncState}
            </div>
          `;
        }).join('');
      }

      function filteredPlatforms() {
        return dataStore.platforms.filter((item) => {
          const byName = !state.filters.name || item.name.includes(state.filters.name);
          const byType = !state.filters.type || item.type === state.filters.type;
          const byMode = !state.filters.mode || getPlatformAccessMode(item) === state.filters.mode;
          const byStatus = !state.filters.status || item.status === state.filters.status;
          return byName && byType && byMode && byStatus;
        });
      }

      function isPlatformEnabled(platform) {
        return platform.status !== '已停用';
      }

      function togglePlatformEnabled(platformId) {
        const platform = dataStore.platforms.find((item) => item.id === platformId);
        if (!platform) return;

        if (isPlatformEnabled(platform)) {
          platform.previousStatusBeforeDisable = platform.status;
          platform.status = '已停用';
        } else {
          platform.status = platform.previousStatusBeforeDisable || '已启用';
          delete platform.previousStatusBeforeDisable;
        }

        state.currentPlatformId = platform.id;
        renderAll();
        showToast(`平台已${isPlatformEnabled(platform) ? '启用' : '停用'}：${platform.name}`);
      }

      function renderPlatformTable() {
        $('#platformTableBody').innerHTML = filteredPlatforms().map((item) => `
          <tr class="${item.id === state.currentPlatformId ? 'selected' : ''}" data-platform-id="${item.id}">
            <td>${item.code}</td>
            <td><strong>${item.name}</strong><div class="muted">${item.vendor} · ${item.type}</div></td>
            <td><span class="mini-tag info">${getPlatformAccessMode(item)}</span></td>
            <td>${item.auth}</td>
            <td><span class="status-pill ${statusClass(item.testResult)}">${item.testResult}</span></td>
            <td><span class="status-pill ${statusClass(item.status)}">${item.status}</span></td>
            <td>
              <button
                type="button"
                class="platform-toggle ${isPlatformEnabled(item) ? 'is-on' : ''}"
                data-action="toggle-status"
                data-platform-id="${item.id}"
                role="switch"
                aria-checked="${isPlatformEnabled(item) ? 'true' : 'false'}"
                aria-label="${isPlatformEnabled(item) ? '禁用' : '启用'}平台 ${item.name}"
              >
                <span class="platform-toggle-track"><span class="platform-toggle-thumb"></span></span>
                <span class="platform-toggle-label">${isPlatformEnabled(item) ? '启用' : '禁用'}</span>
              </button>
            </td>
            <td>
              <div class="action-row">
                <button type="button" class="button ghost" data-action="detail" data-platform-id="${item.id}">详情</button>
                <button type="button" class="button ghost" data-action="logs" data-platform-id="${item.id}">日志</button>
              </div>
            </td>
          </tr>
        `).join('');
      }

      function getHomePlatformResponseRanking() {
        const logs = getCallLogs();
        const responseMap = new Map();

        logs.forEach((log) => {
          const responseMs = Number((log.stageDurations || {}).interfaceResponse || 0);
          if (!responseMap.has(log.platform)) {
            responseMap.set(log.platform, []);
          }
          if (responseMs > 0) {
            responseMap.get(log.platform).push(responseMs);
          }
        });

        const entries = dataStore.platforms.map((platform) => {
          const samples = responseMap.get(platform.name) || [];
          const avgResponseMs = samples.length
            ? Math.round(samples.reduce((sum, value) => sum + value, 0) / samples.length)
            : null;
          return {
            platform,
            avgResponseMs,
            sampleCount: samples.length
          };
        });

        const valid = entries.filter((item) => item.avgResponseMs !== null);
        const minResponse = valid.length ? Math.min(...valid.map((item) => item.avgResponseMs)) : 0;
        const maxResponse = valid.length ? Math.max(...valid.map((item) => item.avgResponseMs)) : 0;

        return entries
          .sort((a, b) => {
            if (a.avgResponseMs === null && b.avgResponseMs === null) return a.platform.name.localeCompare(b.platform.name, 'zh-CN');
            if (a.avgResponseMs === null) return 1;
            if (b.avgResponseMs === null) return -1;
            if (a.avgResponseMs !== b.avgResponseMs) return a.avgResponseMs - b.avgResponseMs;
            return b.platform.successRate - a.platform.successRate;
          })
          .map((item) => {
            let scoreWidth = 8;
            if (item.avgResponseMs !== null) {
              if (maxResponse === minResponse) {
                scoreWidth = 100;
              } else {
                const ratio = (item.avgResponseMs - minResponse) / (maxResponse - minResponse);
                scoreWidth = Math.max(18, Math.round(100 - ratio * 72));
              }
            }
            return {
              ...item,
              scoreWidth
            };
          });
      }

      function renderPlatformInspector() {
        const container = $('#platformInspector');
        if (!container) return;
        const ranking = getHomePlatformResponseRanking();
        container.innerHTML = `
          <div class="panel-header">
            <div>
              <h3>平台过去一天平均响应时间排名</h3>
              <p class="section-copy">按接口响应阶段平均耗时从低到高排序</p>
            </div>
            <span class="chip">共 ${ranking.length} 个平台</span>
          </div>
          <div class="list-stack">
            ${ranking.map((item, index) => `
              <button type="button" class="alert-item ${item.platform.id === state.currentPlatformId ? 'active' : ''}" data-select-platform="${item.platform.id}">
                <div class="action-row" style="justify-content:space-between;">
                  <strong>${index + 1}. ${item.platform.name}</strong>
                  <span class="status-pill ${statusClass(item.platform.status)}">${item.platform.status}</span>
                </div>
                <div class="bar-row">
                  <span>平均响应</span>
                  <div class="bar-track"><div class="bar-fill" style="width:${item.scoreWidth}%"></div></div>
                  <strong>${item.avgResponseMs === null ? '暂无样本' : formatMs(item.avgResponseMs)}</strong>
                </div>
                <div class="action-row">
                  <span class="tag">调用样本 ${item.sampleCount} 条</span>
                  <span class="tag">成功率 ${item.platform.successRate}%</span>
                  <span class="tag">${item.platform.apis.length} 个 API</span>
                </div>
              </button>
            `).join('')}
          </div>
        `;
      }

      function renderStandardAppInfo() {
        $('#standardAppInfo').innerHTML = dataStore.standardAppInfo.map(([key, value]) => `
          <div class="line-item"><span class="line-key">${key}</span><span>${value}</span></div>
        `).join('');
      }

      function renderStandardWhitelistIps() {
        $('#standardWhitelistIpBody').innerHTML = (dataStore.standardWhitelistIps || []).map((item, index) => `
          <tr data-standard-ip-row="${index}">
            <td>
              <input
                class="cell-input"
                data-standard-ip-field="ip"
                data-standard-ip-index="${index}"
                value="${item.ip || ''}"
                placeholder="例如：10.20.30.11"
              >
            </td>
            <td>
              <input
                class="cell-input"
                data-standard-ip-field="remark"
                data-standard-ip-index="${index}"
                value="${item.remark || ''}"
                placeholder="请输入说明"
              >
            </td>
            <td>
              <select
                class="cell-input"
                data-standard-ip-field="status"
                data-standard-ip-index="${index}"
              >
                <option value="启用" ${item.status === '启用' ? 'selected' : ''}>启用</option>
                <option value="停用" ${item.status === '停用' ? 'selected' : ''}>停用</option>
              </select>
            </td>
          </tr>
        `).join('') || '<tr><td colspan="3" class="muted">暂无白名单 IP，请新增一条记录。</td></tr>';
      }

      function collectStandardWhitelistIps() {
        const rows = $$('tr[data-standard-ip-row]');
        return rows.map((row) => {
          const index = row.dataset.standardIpRow;
          const getField = (field) => {
            const input = row.querySelector(`[data-standard-ip-index="${index}"][data-standard-ip-field="${field}"]`);
            return input ? input.value.trim() : '';
          };
          return {
            ip: getField('ip'),
            remark: getField('remark'),
            status: getField('status') || '启用'
          };
        }).filter((item) => item.ip || item.remark);
      }

      function renderStandardSpiConfig() {
        const config = getStandardSpiConfig();
        $('#standardSpiTimeout').value = config.timeout || '';
        $('#standardSpiRetryCount').value = config.retryCount || '';
        $('#standardSpiSignMethod').value = config.signMethod || '';
        $('#standardSpiResultPath').value = config.resultPath || '';
        $('#standardSpiCallbackApiKey').value = config.callbackApiKey || '';
        $('#standardSpiCallbackApiSecret').value = config.callbackApiSecret || '';
        $('#standardSpiCallbackUrl').value = config.callbackUrl || '';
        $('#standardSpiAuthMode').value = config.authMode || '';
        $('#standardSpiHeaderDefinition').value = config.headerDefinition || '';
        $('#standardSpiInputTemplate').value = config.inputTemplate || '';
        $('#standardSpiResponseTemplate').value = config.responseTemplate || '';
        $('#standardSpiResponseExample').value = config.responseExample || '';
        $('#standardSpiDebugInput').value = config.debugInput || config.inputTemplate || '';
        $('#standardSpiDebugOutput').textContent = '点击“调试”后显示回调返回结果。';
      }

      function saveStandardSpiConfig() {
        const config = getStandardSpiConfig();
        config.timeout = $('#standardSpiTimeout').value.trim();
        config.retryCount = $('#standardSpiRetryCount').value.trim();
        config.signMethod = $('#standardSpiSignMethod').value.trim();
        config.resultPath = $('#standardSpiResultPath').value.trim();
        config.callbackApiKey = $('#standardSpiCallbackApiKey').value.trim();
        config.callbackApiSecret = $('#standardSpiCallbackApiSecret').value.trim();
        config.callbackUrl = $('#standardSpiCallbackUrl').value.trim();
        config.authMode = $('#standardSpiAuthMode').value.trim();
        config.headerDefinition = $('#standardSpiHeaderDefinition').value;
        config.inputTemplate = $('#standardSpiInputTemplate').value;
        config.responseTemplate = $('#standardSpiResponseTemplate').value;
        config.responseExample = $('#standardSpiResponseExample').value;
        config.debugInput = $('#standardSpiDebugInput').value;
        dataStore.standardSpiConfig = config;
        renderStandardSpiConfig();
      }

      function runStandardSpiDebug() {
        const config = getStandardSpiConfig();
        const inputText = $('#standardSpiDebugInput').value;
        config.debugInput = inputText;
        try {
          const input = parseJsonText(inputText);
          const response = parseJsonText($('#standardSpiResponseTemplate').value);
          response.requestId = input.requestId || response.requestId || `CTRL-${Date.now()}`;
          response.data = response.data || {};

          if (!input.deviceCode || !input.controlCode) {
            response.code = '1';
            response.message = 'missing required fields';
            response.data.errorFields = ['deviceCode', 'controlCode'].filter((field) => !input[field]);
          } else {
            response.code = response.code || '0';
            response.message = response.message || 'accepted';
            response.data.controlTaskId = response.data.controlTaskId || ('TASK-' + String(Date.now()).slice(-4));
            response.data.acceptedAt = input.timestamp || response.data.acceptedAt || new Date().toISOString();
            response.data.deviceCode = input.deviceCode;
            response.data.controlCode = input.controlCode;
          }

          $('#standardSpiDebugOutput').textContent = JSON.stringify(response, null, 2);
          showToast('SPI 调试完成');
        } catch (error) {
          $('#standardSpiDebugOutput').textContent = '调试失败：\n' + error.message;
          showToast('SPI 调试失败');
        }
      }

      function openPlatformCreateDrawer() {
        openDrawer(
          '新增接入平台',
          `
            <div class="form-grid">
              <div class="field">
                <label for="drawerPlatformName">平台名称</label>
                <input id="drawerPlatformName" type="text">
              </div>
              <div class="field">
                <label for="drawerPlatformVendor">厂商名称</label>
                <input id="drawerPlatformVendor" type="text">
              </div>
              <div class="field">
                <label for="drawerPlatformType">平台类型</label>
                <select id="drawerPlatformType">
                  <option value="储能平台">储能平台</option>
                  <option value="逆变器平台">逆变器平台</option>
                  <option value="聚合平台">聚合平台</option>
                  <option value="EMS平台">EMS平台</option>
                </select>
              </div>
              <div class="field">
                <label for="drawerPlatformAccessMode">接入方式</label>
                <select id="drawerPlatformAccessMode">
                  <option value="主动拉取">主动拉取</option>
                  <option value="标准开放">标准开放</option>
                </select>
              </div>
              <div class="field">
                <label for="drawerPlatformAuth">认证方式</label>
                <input id="drawerPlatformAuth" type="text" value="API Key">
              </div>
              <div class="field">
                <label for="drawerPlatformEnv">环境</label>
                <select id="drawerPlatformEnv">
                  <option value="生产">生产</option>
                  <option value="测试">测试</option>
                </select>
              </div>
              <div class="field">
                <label for="drawerPlatformOwner">负责人</label>
                <input id="drawerPlatformOwner" type="text">
              </div>
              <div class="field">
                <label for="drawerPlatformVersion">版本</label>
                <input id="drawerPlatformVersion" type="text" placeholder="例如：v1.0">
              </div>
              <div class="field">
                <label for="drawerPlatformBaseUrl">基础地址</label>
                <input id="drawerPlatformBaseUrl" type="text" placeholder="https://partner.example.com">
              </div>
              <div class="field">
                <label for="drawerPlatformSupport">支持方式</label>
                <input id="drawerPlatformSupport" type="text" placeholder="电话 / 邮件 / 企业微信">
              </div>
            </div>
            <div class="field">
              <label for="drawerPlatformDesc">平台说明</label>
              <textarea id="drawerPlatformDesc"></textarea>
            </div>
            <div class="action-row">
              <button type="button" class="button brand" id="savePlatformDrawer">保存平台</button>
            </div>
          `,
          'Platform'
        );
        $('#drawerPlatformAccessMode').addEventListener('change', (event) => {
          $('#drawerPlatformAuth').value = event.target.value === '标准开放' ? 'App + Key' : 'API Key';
        });
      }

      function savePlatformFromDrawer() {
        const name = ($('#drawerPlatformName').value || '').trim();
        const vendor = ($('#drawerPlatformVendor').value || '').trim();
        if (!name || !vendor) {
          showToast('请填写平台名称和厂商名称');
          return;
        }
        const accessMode = $('#drawerPlatformAccessMode').value;
        const code = 'P' + String(dataStore.platforms.length + 1).padStart(3, '0');
        const platform = {
          id: code,
          code,
          name,
          vendor,
          type: $('#drawerPlatformType').value,
          modes: [accessMode],
          auth: ($('#drawerPlatformAuth').value || '').trim() || (accessMode === '标准开放' ? 'App + Key' : 'API Key'),
          syncType: accessMode === '标准开放' ? '开放接入' : '待配置',
          status: '草稿',
          alarms: 0,
          health: 0,
          successRate: 0,
          lastSync: '-',
          testResult: '未测试',
          owner: ($('#drawerPlatformOwner').value || '').trim() || '待分配',
          env: $('#drawerPlatformEnv').value,
          version: ($('#drawerPlatformVersion').value || '').trim() || 'v1.0',
          support: ($('#drawerPlatformSupport').value || '').trim() || '待配置',
          desc: $('#drawerPlatformDesc').value,
          baseUrl: ($('#drawerPlatformBaseUrl').value || '').trim() || '待配置',
          appId: 'draft-' + code.toLowerCase(),
          apiKey: '待生成',
          keyRotatedAt: '-',
          callStrategies: [
            { id: 'STR-DRAFT', name: '草稿默认策略', timeout: '5 秒', retry: '2 次', circuit: '连续 3 次失败告警', healthCheck: '15 分钟' }
          ],
          callTasks: [],
          apis: []
        };
        dataStore.platforms.unshift(platform);
        state.currentPlatformId = platform.id;
        renderAll();
        closeDrawer();
        showToast('已新增平台：' + platform.name);
      }

      function renderActiveAppInfo() {
        const platform = getCurrentPlatform();
        $('#activePlatformName').value = platform.name || '';
        $('#activePlatformVendor').value = platform.vendor || '';
        $('#activePlatformMode').value = '主动同步';
        $('#activePlatformEnv').value = platform.env || '测试';
        $('#activePlatformOwner').value = platform.owner || '';
        $('#activePlatformVersion').value = platform.version || '';
        $('#activePlatformBaseUrl').value = platform.baseUrl || '';
        $('#activePlatformDesc').value = platform.desc || '';
      }

      function renderActiveAuthConfig() {
        const platform = getCurrentPlatform();
        const authConfig = getActiveAuthConfig(platform);
        $('#authModeSelect').value = authConfig.mode || platform.auth || 'API Key';
        $('#authTokenUrl').value = authConfig.tokenUrl || '';
        $('#authRequestMethod').value = authConfig.requestMethod || 'POST';
        $('#authClientId').value = authConfig.clientId || '';
        $('#authAppKey').value = authConfig.appKey || platform.apiKey || '';
        $('#authSecret').value = authConfig.secret || '';
        renderAuthHeaderRows('#authHeaderList', getAuthHeaderItems(authConfig, 'headerDefinition'), 'request');
        renderAuthHeaderRows('#authTokenHeaderList', getAuthHeaderItems(authConfig, 'tokenHeaderDefinition'), 'token');
        $('#authRequestBuilderScript').value = authConfig.requestBuilderScript || '';
        $('#authTokenParserScript').value = authConfig.tokenParserScript || '';
      }

      function syncAuthHeaderDraft(type) {
        const authConfig = getActiveAuthConfig();
        const items = collectAuthHeaderItems(type);
        if (type === 'token') {
          authConfig.tokenHeaderItems = items;
        } else {
          authConfig.headerItems = items;
        }
      }

      function addAuthHeaderRow(type) {
        syncAuthHeaderDraft(type);
        const authConfig = getActiveAuthConfig();
        const field = type === 'token' ? 'tokenHeaderDefinition' : 'headerDefinition';
        const items = getAuthHeaderItems(authConfig, field);
        items.push({ key: '', value: '' });
        renderActiveAuthConfig();
      }

      function removeAuthHeaderRow(type, index) {
        syncAuthHeaderDraft(type);
        const authConfig = getActiveAuthConfig();
        const field = type === 'token' ? 'tokenHeaderDefinition' : 'headerDefinition';
        const items = getAuthHeaderItems(authConfig, field);
        items.splice(index, 1);
        renderActiveAuthConfig();
      }

      function renderActiveSignConfig() {
        const config = getActiveSignConfig();
        $('#signAlgorithm').value = config.algorithm || '';
        $('#signSecretKeyType').value = config.secretKeyType || 'AppSecret';
        $('#signFieldName').value = config.signField || '';
        $('#signConcatRule').value = config.signConcatRule || '';
        $('#signEncoding').value = config.encoding || 'UTF-8';
        $('#signLetterCase').value = config.letterCase || '大写';
        $('#signTimestampUnit').value = config.timestampUnit || '秒';
        $('#signNonceLength').value = String(config.nonceLength || 16);
        $('#signConfigStatusChip').textContent = '签名状态：' + (config.enabled ? '已启用' : '已停用');
        $('#toggleSignConfigEnabled').textContent = config.enabled ? '停用签名' : '启用签名';
      }

      function renderActiveDataTypes() {
        if (!$('#activeDataTypeSelect') || !$('#activeDataTypeCount')) {
          return;
        }
        const selectedTypes = getActiveDataTypes();
        $('#activeDataTypeCount').textContent = selectedTypes.length + ' 项已选';
        $('#activeDataTypeSelect').innerHTML = activeDataTypeOptions.map((item) => `
          <option value="${item.value}" ${selectedTypes.includes(item.value) ? 'selected' : ''}>
            ${item.value}｜${item.desc}
          </option>
        `).join('');
      }

      function saveActiveSignConfig() {
        const config = getActiveSignConfig();
        const nonceLength = Number.parseInt($('#signNonceLength').value, 10);
        config.algorithm = $('#signAlgorithm').value;
        config.secretKeyType = $('#signSecretKeyType').value;
        config.signField = $('#signFieldName').value.trim();
        config.signConcatRule = $('#signConcatRule').value.trim();
        config.encoding = $('#signEncoding').value;
        config.letterCase = $('#signLetterCase').value;
        config.timestampUnit = $('#signTimestampUnit').value;
        config.nonceLength = Number.isFinite(nonceLength) && nonceLength > 0 ? nonceLength : 16;
        renderActiveSignConfig();
      }

      function toggleActiveSignConfig() {
        const config = getActiveSignConfig();
        config.enabled = !config.enabled;
        renderActiveSignConfig();
      }

      function renderApiTable() {
        const platform = getCurrentPlatform();
        $('#apiCountChip').textContent = '共 ' + platform.apis.length + ' 个接口定义';
        $('#apiTableBody').innerHTML = platform.apis.map((api) => `
          <tr>
            <td>${api.code}</td>
            <td><strong>${api.name}</strong></td>
            <td>${api.category}</td>
            <td>${api.method}</td>
            <td>${api.subUrl || api.path}</td>
            <td>${api.success}</td>
            <td>
              <div class="action-row">
                <button type="button" class="button ghost api-design" data-api-code="${api.code}">设计详情</button>
              </div>
            </td>
          </tr>
        `).join('') || `<tr><td colspan="7" class="muted">当前平台暂无主动同步接口定义。</td></tr>`;
      }

      function renderApiDesignDetail() {
        const platform = getCurrentPlatform();
        const api = getCurrentApi();
        const meta = $('#apiDetailMeta');
        if (!api) {
          $('#apiDetailHeaderBadge').textContent = '当前 API：-';
          $('#apiDetailCode').value = '';
          $('#apiDetailName').value = '';
          $('#apiDetailMethod').value = '';
          $('#apiDetailBaseUrl').value = '';
          $('#apiDetailSubUrl').value = '';
          $('#apiDetailCategory').value = '';
          $('#apiDetailConnectivity').value = '';
          $('#apiRequestTemplate').value = '';
          $('#apiRequestScript').value = '';
          $('#apiPartnerRequestTemplate').value = '';
          $('#apiRequestOutput').textContent = '请先选择 API。';
          $('#apiResponseTemplate').value = '';
          $('#apiResponseScript').value = '';
          $('#apiStandardResponseTemplate').value = '';
          $('#apiResponseOutput').textContent = '请先选择 API。';
          meta.innerHTML = '<div class="line-item"><span class="line-key">状态</span><span>暂无 API 可编辑</span></div>';
          return;
        }
        const protocol = getApiProtocol(api.code) || createDefaultApiProtocol(api);
        $('#apiDetailHeaderBadge').textContent = '当前 API：' + api.code + ' · ' + api.name;
        $('#apiDetailCode').value = api.code;
        $('#apiDetailName').value = api.name;
        $('#apiDetailMethod').value = api.method;
        $('#apiDetailBaseUrl').value = platform.baseUrl;
        $('#apiDetailSubUrl').value = api.subUrl || api.path;
        $('#apiDetailCategory').value = api.category;
        $('#apiDetailConnectivity').value = api.lastConnectivityResult || '未测试';
        $('#apiRequestTemplate').value = protocol.requestStandardSample || '';
        $('#apiRequestScript').value = getRequestScriptValue(api, protocol);
        $('#apiPartnerRequestTemplate').value = protocol.requestPartnerSample || '';
        $('#apiResponseTemplate').value = protocol.responsePartnerSample || '';
        $('#apiResponseScript').value = getResponseScriptValue(api, protocol);
        $('#apiStandardResponseTemplate').value = protocol.responseStandardSample || '';
        $('#apiRequestOutput').textContent = '点击“运行脚本”后输出实际调用参数。';
        $('#apiResponseOutput').textContent = '点击“调试”后输出平台所需标准返回格式。';
        $('#apiResponseStatusBox').style.display = 'none';
        $('#apiResponseStatusBox').textContent = '';
        meta.innerHTML = `
          <div class="line-item"><span class="line-key">平台基础地址</span><span>${platform.baseUrl}</span></div>
          <div class="line-item"><span class="line-key">任务策略</span><span>${getApiStrategyLabel(api, platform)}</span></div>
          <div class="line-item"><span class="line-key">最近连通性</span><span>${api.lastConnectivityResult || '未测试'}</span></div>
          <div class="line-item"><span class="line-key">调用记录</span><span>${dataStore.logs.filter((log) => log.apiCode === api.code).length} 条</span></div>
        `;
      }

      function renderPlatformStrategies() {
        const platform = getCurrentPlatform();
        const strategies = getPlatformStrategies(platform);
        syncCurrentStrategySelection();
        const current = getCurrentStrategy(platform);
        $('#platformStrategyTableBody').innerHTML = strategies.map((item) => {
          const strategy = normalizeStrategy(item, platform);
          const apiCount = platform.apis.filter((api) => api.strategyRef === item.id).length;
          return `
            <tr class="${item.id === state.currentStrategyId ? 'selected' : ''}" data-strategy-id="${item.id}">
              <td><strong>${strategy.name}</strong><div class="muted">${strategy.id}</div></td>
              <td>${strategy.type}</td>
              <td>${strategy.timeout}</td>
              <td><span class="status-pill ${strategy.serviceDegradeEnabled ? 'ok' : 'info'}">${strategy.serviceDegrade}</span></td>
              <td>${strategy.description}<div class="muted">${getStrategyTableSummary(strategy)} / ${apiCount} 个 API 引用</div></td>
              <td><button type="button" class="button ghost" data-strategy-action="edit" data-strategy-id="${item.id}">编辑</button></td>
            </tr>
          `;
        }).join('') || '<tr><td colspan="6" class="muted">当前平台暂无调用策略，可新增一条策略后再绑定 API。</td></tr>';

        if (!current) {
          $('#platformStrategyMeta').innerHTML = '<div class="line-item"><span class="line-key">状态</span><span>暂无策略可编辑</span></div>';
          $('#strategyDetailName').value = '';
          $('#strategyDetailType').value = '重试策略';
          $('#strategyDetailTimeout').value = '5';
          $('#strategyDetailServiceDegrade').value = '关闭';
          $('#strategyDetailDescription').value = '';
          $('#strategyDetailRetryCount').value = '';
          $('#strategyDetailRetryInterval').value = '';
          $('#strategyDetailBackupLink').value = '';
          renderStrategyTypeFields('重试策略');
          return;
        }

        const strategy = normalizeStrategy(current, platform);
        $('#platformStrategyMeta').innerHTML = `
          <div class="line-item"><span class="line-key">策略编码</span><span>${strategy.id}</span></div>
          <div class="line-item"><span class="line-key">策略类型</span><span>${strategy.type}</span></div>
          <div class="line-item"><span class="line-key">引用 API 数</span><span>${platform.apis.filter((api) => api.strategyRef === strategy.id).length}</span></div>
          <div class="line-item"><span class="line-key">服务降级</span><span>${strategy.serviceDegrade}</span></div>
        `;
        $('#strategyDetailName').value = strategy.name;
        $('#strategyDetailType').value = strategy.type;
        $('#strategyDetailTimeout').value = String(strategy.timeoutSeconds);
        $('#strategyDetailServiceDegrade').value = strategy.serviceDegrade;
        $('#strategyDetailDescription').value = strategy.description;
        $('#strategyDetailRetryCount').value = strategy.retryCount;
        $('#strategyDetailRetryInterval').value = strategy.retryInterval;
        $('#strategyDetailBackupLink').value = strategy.backupLink;
        renderStrategyTypeFields(strategy.type);
      }

      function renderCallTasks() {
        const platform = getCurrentPlatform();
        const tasks = getPlatformTasks(platform);
        syncCurrentTaskSelection();
        const current = getCurrentTask(platform);

        $('#callTaskList').innerHTML = tasks.map((task) => `
          <button type="button" class="alert-item ${task.id === state.currentTaskId ? 'active' : ''}" data-task-id="${task.id}">
            <div class="action-row" style="justify-content:space-between">
              <strong>${task.name}</strong>
              <span class="status-pill ${task.status === '启用' ? 'ok' : 'warn'}">${task.status}</span>
            </div>
            <div class="muted">${task.triggerMode} / ${task.frequency} / 策略：${getStrategyById(task.strategyRef, platform)?.name || '未配置'}</div>
            <div class="badge-stack">
              ${normalizeTaskApiConfigs(task, platform).map((item) => item.apiCode).filter(Boolean).map((code) => `<span class="tag">${code}</span>`).join('')}
            </div>
          </button>
        `).join('') || '<div class="panel-note">当前平台暂无调用任务，可新增任务定义 API 编排与调用计划。</div>';

        $('#taskDetailStrategy').innerHTML = getPlatformStrategies(platform).map((item) => `
          <option value="${item.id}">${item.name}</option>
        `).join('') || '<option value="">暂无可选策略</option>';

        if (!current) {
          $('#callTaskMeta').innerHTML = '<div class="line-item"><span class="line-key">状态</span><span>暂无任务可编辑</span></div>';
          $('#taskDetailName').value = '';
          $('#taskDetailTriggerMode').value = '固定频率';
          $('#taskDetailFrequency').value = '';
          $('#taskDetailCron').value = '';
          $('#taskDetailStatus').value = '启用';
          $('#taskDetailWindow').value = '';
          $('#taskDetailStrategy').value = '';
          $('#taskDetailNote').value = '';
          renderTaskApiConfigRows(null, platform);
          $('#toggleCallTaskStatus').textContent = '停用任务';
          return;
        }

        const apiConfigs = normalizeTaskApiConfigs(current, platform);
        $('#callTaskMeta').innerHTML = `
          <div class="line-item"><span class="line-key">任务编码</span><span>${current.id}</span></div>
          <div class="line-item"><span class="line-key">任务状态</span><span>${current.status}</span></div>
          <div class="line-item"><span class="line-key">同步策略</span><span>${getStrategyById(current.strategyRef, platform)?.name || '未配置'}</span></div>
          <div class="line-item"><span class="line-key">引用 API 数</span><span>${apiConfigs.map((item) => item.apiCode).filter(Boolean).length}</span></div>
        `;
        $('#taskDetailName').value = current.name;
        $('#taskDetailTriggerMode').value = current.triggerMode;
        $('#taskDetailFrequency').value = current.frequency;
        $('#taskDetailCron').value = current.cron || '';
        $('#taskDetailStatus').value = current.status;
        $('#taskDetailWindow').value = current.window || '';
        $('#taskDetailStrategy').value = current.strategyRef || '';
        $('#taskDetailNote').value = current.note || '';
        renderTaskApiConfigRows(current, platform);
        $('#toggleCallTaskStatus').textContent = current.status === '启用' ? '停用任务' : '启用任务';
      }

      function renderProtocolCenter() {
        const platform = getCurrentPlatform();
        const select = $('#protocolApiSelect');
        $('#protocolPlatformName').value = platform.name;
        syncCurrentApiSelection();

        if (!platform.apis.length) {
          select.innerHTML = '<option value="">请先创建 API</option>';
          select.disabled = true;
          $('#protocolApiMeta').innerHTML = '<div class="line-item"><span class="line-key">提示</span><span>当前平台还没有 API，请先在 API 定义中创建接口。</span></div>';
          $('#protocolOverviewInfo').innerHTML = '<div class="line-item"><span class="line-key">状态</span><span>未创建 API</span></div>';
          $('#protocolOverviewNote').textContent = '当前平台未配置 API，无法进行 API 级入参转换、返回转换和调试。';
          renderProtocolOverviewCharts();
          renderProtocolLogFilters();
          renderProtocolLogs();
          return;
        }

        select.disabled = false;
        select.innerHTML = platform.apis.map((api) => `<option value="${api.code}">${api.code} · ${api.name}</option>`).join('');
        const api = getCurrentApi();
        if (!api) return;
        select.value = api.code;
        const protocol = getApiProtocol(api.code) || createDefaultApiProtocol(api);

        $('#protocolApiMeta').innerHTML = `
          <div class="line-item"><span class="line-key">请求方式</span><span>${api.method}</span></div>
          <div class="line-item"><span class="line-key">子 URL</span><span>${api.subUrl || api.path}</span></div>
          <div class="line-item"><span class="line-key">分类</span><span>${api.category}</span></div>
          <div class="line-item"><span class="line-key">任务策略</span><span>${getApiStrategyLabel(api, platform)}</span></div>
        `;
        $('#protocolOverviewInfo').innerHTML = `
          <div class="line-item"><span class="line-key">API 编码</span><span>${api.code}</span></div>
          <div class="line-item"><span class="line-key">协议类型</span><span>${protocol.protocolType}</span></div>
          <div class="line-item"><span class="line-key">协议版本</span><span>${protocol.version}</span></div>
          <div class="line-item"><span class="line-key">入参转换规则</span><span>${protocol.requestMappings.length} 条</span></div>
          <div class="line-item"><span class="line-key">返回转换规则</span><span>${protocol.responseMappings.length} 条</span></div>
        `;
        $('#protocolOverviewNote').textContent = '当前 API 为 ' + api.name + '。所有协议处理规则都只对这个 API 生效，调试时会完整展示“标准请求 -> 第三方请求 -> 第三方返回 -> 标准返回”的转换链路。';
        renderProtocolOverviewCharts();
        renderProtocolLogFilters();
        renderProtocolLogs();
      }

      function renderVersionFieldRows(target, fields, includeAccess = false) {
        $(target).innerHTML = fields.map((item) => `
          <tr>
            <td>${item.fieldName || item.name || '-'}</td>
            <td>${item.fieldCode || item.code || '-'}</td>
            <td>${item.fieldType || item.valueType || '-'}</td>
            <td>${item.unit || '-'}</td>
            ${includeAccess ? `<td>${item.access || '-'}</td>` : ''}
            <td>${item.desc || item.note || '-'}</td>
          </tr>
        `).join('') || `<tr><td colspan="${includeAccess ? 6 : 5}" class="muted">暂无字段记录。</td></tr>`;
      }

      function formatControlTemplateParams(params = []) {
        return params.map((item) => `
          <div>${item.name} / ${item.code} / ${item.type} / ${item.unit}</div>
        `).join('') || '<div class="muted">-</div>';
      }

      function renderControlTemplateRows(target, templates) {
        $(target).innerHTML = (templates || []).map((item) => `
          <tr>
            <td><strong>${item.templateName || '-'}</strong></td>
            <td>${item.templateCode || '-'}</td>
            <td>${formatControlTemplateParams(item.inputParams)}</td>
            <td>${formatControlTemplateParams(item.outputParams)}</td>
          </tr>
        `).join('') || '<tr><td colspan="4" class="muted">暂无控制模板。</td></tr>';
      }

      function renderMappingVersions() {
        const versions = getMappingVersions();
        const current = versions.find((item) => item.id === state.currentMappingVersionId) || versions[0] || null;
        const published = getPublishedMappingVersion();

        $('#mappingVersionChip').textContent = published ? `当前发布版本：${published.version}` : '当前发布版本：未发布';
        $('#mappingVersionListView').style.display = state.mappingVersionView === 'list' ? 'block' : 'none';
        $('#mappingVersionDetailView').style.display = state.mappingVersionView === 'detail' ? 'block' : 'none';
        $('#mappingVersionRecordCount').textContent = versions.length + ' 条记录';
        $('#mappingVersionHistoryBody').innerHTML = versions.map((item) => {
          const badgeClass = item.status === '已发布' ? 'ok' : (item.status === '历史版本' ? 'warn' : 'info');
          return `
            <tr class="${item.id === state.currentMappingVersionId ? 'selected' : ''}">
              <td><strong>${item.version}</strong><div class="muted">${item.createdAt || '-'}</div></td>
              <td><span class="status-pill ${badgeClass}">${item.status}</span></td>
              <td>${item.note || '-'}</td>
              <td>${item.publishedAt || '待发布'}</td>
              <td><button type="button" class="button ghost" data-version-action="detail" data-version-id="${item.id}">详情</button></td>
            </tr>
          `;
        }).join('') || '<tr><td colspan="5" class="muted">暂无版本记录。</td></tr>';

        if (!current) {
          $('#mappingVersionDetailBadge').textContent = '当前版本：-';
          $('#mappingVersionDetailMeta').innerHTML = '<div class="line-item"><span class="line-key">状态</span><span>暂无版本详情</span></div>';
          renderVersionFieldRows('#mappingVersionStationBody', []);
          renderVersionFieldRows('#mappingVersionDeviceBody', []);
          renderVersionFieldRows('#mappingVersionPointBody', [], true);
          renderControlTemplateRows('#mappingVersionControlBody', []);
          return;
        }

        $('#mappingVersionDetailBadge').textContent = '当前版本：' + current.version;
        $('#mappingVersionDetailMeta').innerHTML = [
          ['版本号', current.version],
          ['版本状态', current.status],
          ['版本说明', current.note || '-'],
          ['发布时间', current.publishedAt || '待发布'],
          ['字段摘要', current.summary]
        ].map(([key, value]) => `
          <div class="line-item"><span class="line-key">${key}</span><span>${value}</span></div>
        `).join('');
        renderVersionFieldRows('#mappingVersionStationBody', current.snapshot ? current.snapshot.station || [] : []);
        renderVersionFieldRows('#mappingVersionDeviceBody', current.snapshot ? current.snapshot.device || [] : []);
        renderVersionFieldRows('#mappingVersionPointBody', current.snapshot ? current.snapshot.point || [] : [], true);
        renderControlTemplateRows('#mappingVersionControlBody', current.snapshot ? current.snapshot.control || [] : []);
      }

      function renderMappingRelationSnapshotRows(target, items, type) {
        if (type === 'control') {
          $(target).innerHTML = (items || []).map((item) => `
            <tr>
              <td><strong>${item.name}</strong><div class="muted">${item.id}</div></td>
              <td>${item.standard.name}<div class="muted">${item.standard.code}</div></td>
              <td>${item.partner.name}<div class="muted">${item.partner.code}</div></td>
              <td>${item.apiCode}</td>
              <td>${(item.inputMappings || []).length} 条</td>
              <td>${(item.outputMappings || []).length} 条</td>
              <td><span class="status-pill ${item.status === '已启用' ? 'ok' : 'warn'}">${item.status}</span></td>
            </tr>
          `).join('') || '<tr><td colspan="7" class="muted">暂无控制指令映射版本数据。</td></tr>';
          return;
        }

        if (type === 'point') {
          $(target).innerHTML = (items || []).map((item) => `
            <tr>
              <td><strong>${item.internalFieldName}</strong></td>
              <td>${item.internalFieldCode}</td>
              <td>${item.externalFieldName}</td>
              <td>${item.externalFieldCode}</td>
              <td>${getPrimaryRuleLabel(item.ruleRef)}</td>
              <td>${getAggregateRuleLabel(item.aggregateRuleId)}</td>
              <td>${item.relation}</td>
            </tr>
          `).join('') || '<tr><td colspan="7" class="muted">暂无点位映射版本数据。</td></tr>';
          return;
        }

        $(target).innerHTML = (items || []).map((item) => `
          <tr>
            <td><strong>${item.internalFieldName}</strong></td>
            <td>${item.internalFieldCode}</td>
            <td>${item.externalFieldName}</td>
            <td>${item.externalFieldCode}</td>
            <td>${getPrimaryRuleLabel(item.ruleRef)}</td>
            <td>${item.relation}</td>
          </tr>
        `).join('') || `<tr><td colspan="6" class="muted">暂无${type === 'station' ? '电站' : '设备'}映射版本数据。</td></tr>`;
      }

      function renderMappingRelationVersions() {
        const versions = getScopedMappingRelationVersions();
        const current = getCurrentMappingRelationVersion();
        $('#mappingRelationVersionListView').style.display = state.mappingRelationVersionView === 'list' ? 'block' : 'none';
        $('#mappingRelationVersionDetailView').style.display = state.mappingRelationVersionView === 'detail' ? 'block' : 'none';
        $('#mappingRelationVersionCount').textContent = versions.length + ' 条记录';
        $('#mappingRelationVersionBody').innerHTML = versions.map((item) => {
          const badgeClass = item.status === '已发布' ? 'ok' : (item.status === '历史版本' ? 'warn' : 'info');
          return `
            <tr class="${item.id === state.currentMappingRelationVersionId ? 'selected' : ''}">
              <td><strong>${item.version}</strong><div class="muted">${item.createdAt || '-'}</div></td>
              <td>${item.creator || '-'}</td>
              <td><span class="status-pill ${badgeClass}">${item.status}</span></td>
              <td><button type="button" class="button ghost" data-mapping-relation-version-action="detail" data-mapping-relation-version-id="${item.id}">详情预览</button></td>
            </tr>
          `;
        }).join('') || '<tr><td colspan="4" class="muted">暂无映射版本记录。</td></tr>';

        if (!current) {
          $('#mappingRelationVersionBadge').textContent = '当前版本：-';
          $('#mappingRelationVersionMeta').innerHTML = '<div class="line-item"><span class="line-key">状态</span><span>暂无版本详情</span></div>';
          renderMappingRelationSnapshotRows('#mappingRelationVersionStationBody', [], 'station');
          renderMappingRelationSnapshotRows('#mappingRelationVersionDeviceBody', [], 'device');
          renderMappingRelationSnapshotRows('#mappingRelationVersionPointBody', [], 'point');
          renderMappingRelationSnapshotRows('#mappingRelationVersionControlBody', [], 'control');
          return;
        }

        $('#mappingRelationVersionBadge').textContent = '当前版本：' + current.version;
        $('#mappingRelationVersionMeta').innerHTML = [
          ['版本号', current.version],
          ['创建人', current.creator || '-'],
          ['状态', current.status || '-'],
          ['创建时间', current.createdAt || '-'],
          ['聚合摘要', buildMappingRelationVersionSummary(current.snapshot || {})]
        ].map(([key, value]) => `
          <div class="line-item"><span class="line-key">${key}</span><span>${value}</span></div>
        `).join('');
        renderMappingRelationSnapshotRows('#mappingRelationVersionStationBody', current.snapshot ? current.snapshot.station || [] : [], 'station');
        renderMappingRelationSnapshotRows('#mappingRelationVersionDeviceBody', current.snapshot ? current.snapshot.device || [] : [], 'device');
        renderMappingRelationSnapshotRows('#mappingRelationVersionPointBody', current.snapshot ? current.snapshot.point || [] : [], 'point');
        renderMappingRelationSnapshotRows('#mappingRelationVersionControlBody', current.snapshot ? current.snapshot.control || [] : [], 'control');
      }

      function renderConversionRules() {
        const unitRules = getScopedConversionRules('unit');
        const timezoneRules = getScopedConversionRules('timezone');
        const statusRules = getScopedConversionRules('status');
        const aggregateRules = getScopedConversionRules('aggregate');

        $('#unitRuleCount').textContent = unitRules.length + ' 条规则';
        $('#timezoneRuleCount').textContent = timezoneRules.length + ' 条规则';
        $('#statusRuleCount').textContent = statusRules.length + ' 条规则';
        $('#aggregateRuleCount').textContent = aggregateRules.length + ' 条规则';

        $('#unitRuleBody').innerHTML = unitRules.map((item) => `
          <tr>
            <td><strong>${item.name}</strong><div class="muted">${item.updatedAt}</div></td>
            <td>${getConversionDirectionLabel(item)}</td>
            <td>${item.sourceUnitName}</td>
            <td>${item.sourceUnitCode}</td>
            <td>${item.targetUnitName}</td>
            <td>${item.targetUnitCode}</td>
            <td>${item.formula}</td>
            <td><button type="button" class="button ghost" data-rule-action="detail" data-rule-type="unit" data-rule-id="${item.id}">详情</button></td>
          </tr>
        `).join('') || '<tr><td colspan="8" class="muted">暂无单位转换规则。</td></tr>';

        $('#timezoneRuleBody').innerHTML = timezoneRules.map((item) => `
          <tr>
            <td><strong>${item.name}</strong><div class="muted">${item.updatedAt}</div></td>
            <td>${getConversionDirectionLabel(item)}</td>
            <td>${item.sourceTimezoneName}</td>
            <td>${item.sourceTimezoneCode}</td>
            <td>${item.targetTimezoneName}</td>
            <td>${item.targetTimezoneCode}</td>
            <td>${item.formula}</td>
            <td><button type="button" class="button ghost" data-rule-action="detail" data-rule-type="timezone" data-rule-id="${item.id}">详情</button></td>
          </tr>
        `).join('') || '<tr><td colspan="8" class="muted">暂无时区转换规则。</td></tr>';

        $('#statusRuleBody').innerHTML = statusRules.map((item) => `
          <tr>
            <td><strong>${item.name}</strong><div class="muted">${item.updatedAt}</div></td>
            <td>${getConversionDirectionLabel(item)}</td>
            <td>${item.sourceFieldName}</td>
            <td>${item.sourceFieldCode}</td>
            <td>${item.targetFieldName}</td>
            <td>${item.targetFieldCode}</td>
            <td>${item.mappings.map((mapping) => `${mapping.source} -> ${mapping.target}`).join('<br>')}</td>
            <td><button type="button" class="button ghost" data-rule-action="detail" data-rule-type="status" data-rule-id="${item.id}">详情</button></td>
          </tr>
        `).join('') || '<tr><td colspan="8" class="muted">暂无状态码转换规则。</td></tr>';

        $('#aggregateRuleBody').innerHTML = aggregateRules.map((item) => `
          <tr>
            <td><strong>${item.name}</strong><div class="muted">${item.updatedAt}</div></td>
            <td>${getConversionDirectionLabel(item)}</td>
            <td>${item.sourceFieldNames}</td>
            <td>${item.sourceFieldCodes}</td>
            <td>${item.targetFieldName}</td>
            <td>${item.targetFieldCode}</td>
            <td>${item.formula}</td>
            <td><button type="button" class="button ghost" data-rule-action="detail" data-rule-type="aggregate" data-rule-id="${item.id}">详情</button></td>
          </tr>
        `).join('') || '<tr><td colspan="8" class="muted">暂无数据聚合转换规则。</td></tr>';
      }

      function openConversionRuleDetail(type, ruleId) {
        const rule = getConversionRule(type, ruleId, state.mappingRulePlatformId);
        if (!rule) {
          showToast('未找到规则详情');
          return;
        }

        if (type === 'unit') {
          openDrawer(
            rule.name,
            `
              <div class="line-list">
                <div class="line-item"><span class="line-key">所属平台</span><span>${platformName(rule.platformId || state.mappingRulePlatformId)}</span></div>
                <div class="line-item"><span class="line-key">转换方向类型</span><span>${getConversionDirectionLabel(rule)}</span></div>
                <div class="line-item"><span class="line-key">原始单位名称</span><span>${rule.sourceUnitName}</span></div>
                <div class="line-item"><span class="line-key">原始单位编码</span><span>${rule.sourceUnitCode}</span></div>
                <div class="line-item"><span class="line-key">目标单位名称</span><span>${rule.targetUnitName}</span></div>
                <div class="line-item"><span class="line-key">目标单位编码</span><span>${rule.targetUnitCode}</span></div>
                <div class="line-item"><span class="line-key">计算公式</span><span>${rule.formula}</span></div>
                <div class="line-item"><span class="line-key">备注</span><span>${rule.note}</span></div>
              </div>
            `,
            'Rule Detail'
          );
          return;
        }

        if (type === 'timezone') {
          openDrawer(
            rule.name,
            `
              <div class="line-list">
                <div class="line-item"><span class="line-key">所属平台</span><span>${platformName(rule.platformId || state.mappingRulePlatformId)}</span></div>
                <div class="line-item"><span class="line-key">转换方向类型</span><span>${getConversionDirectionLabel(rule)}</span></div>
                <div class="line-item"><span class="line-key">原始时区名称</span><span>${rule.sourceTimezoneName}</span></div>
                <div class="line-item"><span class="line-key">原始时区编码</span><span>${rule.sourceTimezoneCode}</span></div>
                <div class="line-item"><span class="line-key">目标时区名称</span><span>${rule.targetTimezoneName}</span></div>
                <div class="line-item"><span class="line-key">目标时区编码</span><span>${rule.targetTimezoneCode}</span></div>
                <div class="line-item"><span class="line-key">转换公式</span><span>${rule.formula}</span></div>
                <div class="line-item"><span class="line-key">备注</span><span>${rule.note}</span></div>
              </div>
            `,
            'Rule Detail'
          );
          return;
        }

        if (type === 'status') {
          openDrawer(
            rule.name,
            `
              <div class="line-list">
                <div class="line-item"><span class="line-key">所属平台</span><span>${platformName(rule.platformId || state.mappingRulePlatformId)}</span></div>
                <div class="line-item"><span class="line-key">转换方向类型</span><span>${getConversionDirectionLabel(rule)}</span></div>
                <div class="line-item"><span class="line-key">原始字段名称</span><span>${rule.sourceFieldName}</span></div>
                <div class="line-item"><span class="line-key">原始字段编码</span><span>${rule.sourceFieldCode}</span></div>
                <div class="line-item"><span class="line-key">目标字段名称</span><span>${rule.targetFieldName}</span></div>
                <div class="line-item"><span class="line-key">目标字段编码</span><span>${rule.targetFieldCode}</span></div>
              </div>
              <div class="table-shell">
                <table>
                  <thead>
                    <tr>
                      <th>原状态码枚举</th>
                      <th>目标枚举状态码</th>
                    </tr>
                  </thead>
                  <tbody>
                    ${rule.mappings.map((mapping) => `
                      <tr>
                        <td>${mapping.source}</td>
                        <td>${mapping.target}</td>
                      </tr>
                    `).join('')}
                  </tbody>
                </table>
              </div>
            `,
            'Rule Detail'
          );
          return;
        }

        openDrawer(
          rule.name,
          `
            <div class="line-list">
              <div class="line-item"><span class="line-key">所属平台</span><span>${platformName(rule.platformId || state.mappingRulePlatformId)}</span></div>
              <div class="line-item"><span class="line-key">转换方向类型</span><span>${getConversionDirectionLabel(rule)}</span></div>
              <div class="line-item"><span class="line-key">原始字段名称</span><span>${rule.sourceFieldNames}</span></div>
              <div class="line-item"><span class="line-key">原始字段编码列表</span><span>${rule.sourceFieldCodes}</span></div>
              <div class="line-item"><span class="line-key">目标字段名称</span><span>${rule.targetFieldName}</span></div>
              <div class="line-item"><span class="line-key">目标字段编码</span><span>${rule.targetFieldCode}</span></div>
              <div class="line-item"><span class="line-key">转换公式</span><span>${rule.formula}</span></div>
              <div class="line-item"><span class="line-key">备注</span><span>${rule.note}</span></div>
            </div>
          `,
          'Rule Detail'
        );
      }

      function renderMappings() {
        renderMappingScopeSelectors();
        $('#internalStationModelBody').innerHTML = (dataStore.internalStationModels || []).map((item) => `
          <tr>
            <td><strong>${item.fieldName}</strong></td>
            <td>${item.fieldCode}</td>
            <td>${item.fieldType}</td>
            <td>${item.unit}</td>
            <td>${item.desc}</td>
          </tr>
        `).join('') || '<tr><td colspan="5" class="muted">暂无电站模型字段。</td></tr>';

        $('#internalDeviceModelBody').innerHTML = (dataStore.internalDeviceModels || []).map((item) => `
          <tr>
            <td><strong>${item.fieldName}</strong></td>
            <td>${item.fieldCode}</td>
            <td>${item.fieldType}</td>
            <td>${item.unit}</td>
            <td>${item.desc}</td>
          </tr>
        `).join('') || '<tr><td colspan="5" class="muted">暂无设备模型字段。</td></tr>';

        $('#internalPointModelBody').innerHTML = (dataStore.internalPointModels || []).map((item) => `
          <tr>
            <td><strong>${item.fieldName}</strong></td>
            <td>${item.fieldCode}</td>
            <td>${item.fieldType}</td>
            <td>${item.unit}</td>
            <td>${item.access}</td>
            <td>${item.desc}</td>
          </tr>
        `).join('') || '<tr><td colspan="6" class="muted">暂无点位模型字段。</td></tr>';

        renderControlTemplateRows('#internalControlModelBody', dataStore.internalControlModels || []);

        renderMappingVersions();
        renderMappingRelationVersions();
        renderConversionRules();

        $('#stationMappingBody').innerHTML = getScopedMappingList('station').map((item) => {
          const version = getMappingVersionById(item.versionId);
          return `
            <tr>
              <td><strong>${item.internalFieldName}</strong><div class="muted">${item.modelName} · ${(version && version.version) || '-'}</div></td>
              <td>${item.internalFieldCode}</td>
              <td>${item.externalFieldName}</td>
              <td>${item.externalFieldCode}</td>
              <td>${getPrimaryRuleLabel(item.ruleRef, item.platformId || state.mappingRelationPlatformId)}</td>
              <td>${item.relation}</td>
              <td><button type="button" class="button ghost" data-mapping-action="edit" data-mapping-type="station" data-mapping-id="${item.id}">编辑</button></td>
            </tr>
          `;
        }).join('') || '<tr><td colspan="7" class="muted">暂无电站模型映射。</td></tr>';

        $('#deviceMappingBody').innerHTML = getScopedMappingList('device').map((item) => {
          const version = getMappingVersionById(item.versionId);
          return `
            <tr>
              <td><strong>${item.internalFieldName}</strong><div class="muted">${item.modelName} · ${(version && version.version) || '-'}</div></td>
              <td>${item.internalFieldCode}</td>
              <td>${item.externalFieldName}</td>
              <td>${item.externalFieldCode}</td>
              <td>${getPrimaryRuleLabel(item.ruleRef, item.platformId || state.mappingRelationPlatformId)}</td>
              <td>${item.relation}</td>
              <td><button type="button" class="button ghost" data-mapping-action="edit" data-mapping-type="device" data-mapping-id="${item.id}">编辑</button></td>
            </tr>
          `;
        }).join('') || '<tr><td colspan="7" class="muted">暂无设备模型映射。</td></tr>';

        $('#pointMappingBody').innerHTML = getScopedMappingList('point').map((item) => {
          const version = getMappingVersionById(item.versionId);
          return `
            <tr>
              <td><strong>${item.internalFieldName}</strong><div class="muted">${item.modelName} · ${(version && version.version) || '-'}</div></td>
              <td>${item.internalFieldCode}</td>
              <td>${item.externalFieldName}</td>
              <td>${item.externalFieldCode}</td>
              <td>${getPrimaryRuleLabel(item.ruleRef, item.platformId || state.mappingRelationPlatformId)}</td>
              <td>${getAggregateRuleLabel(item.aggregateRuleId, item.platformId || state.mappingRelationPlatformId)}</td>
              <td>${item.relation}</td>
              <td><button type="button" class="button ghost" data-mapping-action="edit" data-mapping-type="point" data-mapping-id="${item.id}">编辑</button></td>
            </tr>
          `;
        }).join('') || '<tr><td colspan="8" class="muted">暂无数据点位映射。</td></tr>';
        renderControlMappings();
        renderMappingDebugPanels();
      }

      function renderControlParamMappingEditor(target, mappings, group) {
        $(target).innerHTML = mappings.map((item, index) => `
          <tr data-param-group="${group}" data-param-index="${index}">
            <td><input class="cell-input" data-param-group="${group}" data-param-index="${index}" data-param-side="internal" data-param-field="name" value="${(item.internal && item.internal.name) || ''}"></td>
            <td><input class="cell-input" data-param-group="${group}" data-param-index="${index}" data-param-side="internal" data-param-field="code" value="${(item.internal && item.internal.code) || ''}"></td>
            <td><input class="cell-input" data-param-group="${group}" data-param-index="${index}" data-param-side="internal" data-param-field="type" value="${(item.internal && item.internal.type) || ''}"></td>
            <td><input class="cell-input" data-param-group="${group}" data-param-index="${index}" data-param-side="internal" data-param-field="unit" value="${(item.internal && item.internal.unit) || ''}"></td>
            <td><input class="cell-input" data-param-group="${group}" data-param-index="${index}" data-param-side="external" data-param-field="name" value="${(item.external && item.external.name) || ''}"></td>
            <td><input class="cell-input" data-param-group="${group}" data-param-index="${index}" data-param-side="external" data-param-field="code" value="${(item.external && item.external.code) || ''}"></td>
            <td><input class="cell-input" data-param-group="${group}" data-param-index="${index}" data-param-side="external" data-param-field="type" value="${(item.external && item.external.type) || ''}"></td>
            <td><input class="cell-input" data-param-group="${group}" data-param-index="${index}" data-param-side="external" data-param-field="unit" value="${(item.external && item.external.unit) || ''}"></td>
          </tr>
        `).join('') || '<tr><td colspan="8" class="muted">暂无映射，请新增一行参数映射。</td></tr>';
      }

      function renderControlParamMappingPreview(mappings, emptyText) {
        if (!mappings || !mappings.length) {
          return `<div class="muted">${emptyText}</div>`;
        }
        return `
          <div class="table-shell">
            <table>
              <thead>
                <tr>
                  <th>内部参数名</th>
                  <th>内部参数编码</th>
                  <th>内部参数类型</th>
                  <th>内部参数单位</th>
                  <th>外部参数名</th>
                  <th>外部参数编码</th>
                  <th>外部参数类型</th>
                  <th>外部参数单位</th>
                </tr>
              </thead>
              <tbody>
                ${mappings.map((item) => `
                  <tr>
                    <td>${(item.internal && item.internal.name) || '-'}</td>
                    <td>${(item.internal && item.internal.code) || '-'}</td>
                    <td>${(item.internal && item.internal.type) || '-'}</td>
                    <td>${(item.internal && item.internal.unit) || '-'}</td>
                    <td>${(item.external && item.external.name) || '-'}</td>
                    <td>${(item.external && item.external.code) || '-'}</td>
                    <td>${(item.external && item.external.type) || '-'}</td>
                    <td>${(item.external && item.external.unit) || '-'}</td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        `;
      }

      function collectControlParamMappings(group) {
        const rows = $$(`tr[data-param-group="${group}"]`);
        return rows.map((row) => {
          const index = row.dataset.paramIndex;
          const getValue = (side, field) => {
            const input = row.querySelector(`[data-param-group="${group}"][data-param-index="${index}"][data-param-side="${side}"][data-param-field="${field}"]`);
            return input ? input.value.trim() : '';
          };
          const internal = {
            name: getValue('internal', 'name'),
            code: getValue('internal', 'code'),
            type: getValue('internal', 'type'),
            unit: getValue('internal', 'unit')
          };
          const external = {
            name: getValue('external', 'name'),
            code: getValue('external', 'code'),
            type: getValue('external', 'type'),
            unit: getValue('external', 'unit')
          };
          return { internal, external };
        }).filter((item) => {
          const internal = item.internal || {};
          const external = item.external || {};
          return internal.name || internal.code || internal.type || internal.unit || external.name || external.code || external.type || external.unit;
        });
      }

      function renderControlMappings() {
        const mappings = getScopedControlMappings();
        syncCurrentControlMappingSelection();
        const current = getCurrentControlMapping();
        $('#controlMappingListView').style.display = state.controlMappingView === 'list' ? 'block' : 'none';
        $('#controlMappingDetailView').style.display = state.controlMappingView === 'detail' ? 'block' : 'none';
        $('#controlMappingTableBody').innerHTML = mappings.map((item) => `
          <tr class="${item.id === state.currentControlMappingId ? 'selected' : ''}">
            <td><strong>${item.name}</strong></td>
            <td>${item.standard.name}<div class="muted">${item.standard.code}</div></td>
            <td>${item.partner.name}<div class="muted">${item.partner.code}</div></td>
            <td>${item.apiCode}</td>
            <td><span class="status-pill ${item.status === '已启用' ? 'ok' : 'warn'}">${item.status}</span></td>
            <td><button type="button" class="button ghost" data-control-action="detail" data-control-mapping-id="${item.id}">详情</button></td>
          </tr>
        `).join('') || '<tr><td colspan="6" class="muted">暂无控制指令映射，请新增一条映射。</td></tr>';

        if (!current) {
          $('#controlMappingBadge').textContent = '当前映射：-';
          $('#controlMappingMeta').innerHTML = '<div class="line-item"><span class="line-key">状态</span><span>暂无映射可编辑</span></div>';
          $('#standardControlName').value = '';
          $('#standardControlCode').value = '';
          $('#partnerControlName').value = '';
          $('#partnerControlCode').value = '';
          $('#controlInputMappingBody').innerHTML = '<tr><td colspan="8" class="muted">暂无映射</td></tr>';
          $('#controlOutputMappingBody').innerHTML = '<tr><td colspan="8" class="muted">暂无映射</td></tr>';
          renderMappingDebugPanel('control');
          return;
        }

        $('#controlMappingBadge').textContent = '当前映射：' + current.id;
        $('#controlMappingMeta').innerHTML = `
          <div class="line-item"><span class="line-key">映射名称</span><span>${current.name}</span></div>
          <div class="line-item"><span class="line-key">绑定 API</span><span>${current.apiCode}</span></div>
          <div class="line-item"><span class="line-key">映射状态</span><span>${current.status}</span></div>
        `;
        $('#standardControlName').value = current.standard.name;
        $('#standardControlCode').value = current.standard.code;
        $('#partnerControlName').value = current.partner.name;
        $('#partnerControlCode').value = current.partner.code;
        renderControlParamMappingEditor('#controlInputMappingBody', current.inputMappings || [], 'input');
        renderControlParamMappingEditor('#controlOutputMappingBody', current.outputMappings || [], 'output');
        renderMappingDebugPanel('control');
      }

      function cloneJson(value) {
        return JSON.parse(JSON.stringify(value));
      }

      function getMappingJsonTabLabel(type) {
        const labels = {
          station: '电站模型映射',
          device: '设备模型映射',
          point: '数据点位映射',
          control: '控制指令映射',
          version: '映射版本'
        };
        return labels[type] || '映射数据';
      }

      function getMappingJsonExportItems(type, platformId = state.mappingRelationPlatformId) {
        if (type === 'station' || type === 'device' || type === 'point') {
          return getScopedMappingList(type, platformId);
        }
        if (type === 'control') {
          return getScopedControlMappings(platformId);
        }
        if (type === 'version') {
          return getScopedMappingRelationVersions(platformId);
        }
        return [];
      }

      function buildMappingJsonExportPayload(type, platformId = state.mappingRelationPlatformId) {
        return {
          schema: 'mapping-relation-json',
          tab: type,
          platformId,
          platformName: platformName(platformId),
          exportedAt: formatDateTime(),
          items: cloneJson(getMappingJsonExportItems(type, platformId))
        };
      }

      function downloadJsonFile(filename, payload) {
        const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json;charset=utf-8' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = filename;
        document.body.appendChild(link);
        link.click();
        link.remove();
        setTimeout(() => URL.revokeObjectURL(url), 0);
      }

      function exportMappingJson(type) {
        const platformId = state.mappingRelationPlatformId;
        const filename = `mapping-${type}-${platformId}.json`;
        downloadJsonFile(filename, buildMappingJsonExportPayload(type, platformId));
        showToast(getMappingJsonTabLabel(type) + ' JSON 已导出');
      }

      function openMappingJsonImportDrawer(type) {
        openDrawer(
          '导入 JSON',
          `
            <div class="field">
              <label for="mappingJsonImportInput">${getMappingJsonTabLabel(type)} JSON</label>
              <textarea id="mappingJsonImportInput" placeholder='请粘贴 JSON 数组或包含 items 的对象'></textarea>
            </div>
            <div class="action-row">
              <button type="button" class="button brand" data-mapping-json-import-confirm="${type}">确认导入</button>
            </div>
          `,
          'JSON'
        );
      }

      function getMappingJsonImportItems(type) {
        const payload = parseJsonText($('#mappingJsonImportInput').value);
        if (Array.isArray(payload)) {
          return payload;
        }
        if (payload && typeof payload === 'object') {
          if (payload.tab && payload.tab !== type) {
            throw new Error('导入 JSON 与当前页签类型不匹配');
          }
          if (Array.isArray(payload.items)) {
            return payload.items;
          }
        }
        throw new Error('请输入数组或包含 items 的 JSON 对象');
      }

      function createImportedId(prefix, index) {
        return prefix + String(Date.now()).slice(-6) + String(index + 1).padStart(2, '0');
      }

      function resetMappingDebugDrafts() {
        state.mappingDebug = {
          station: { input: '', output: '' },
          device: { input: '', output: '' },
          point: { input: '', output: '' },
          control: { input: '', output: '' }
        };
      }

      function normalizeMappingRelationImportItem(type, item, index, platformId = state.mappingRelationPlatformId) {
        const source = item && typeof item === 'object' ? item : {};
        const published = getPublishedMappingVersion() || getMappingVersions()[0] || {};
        const defaults = {
          station: { prefix: 'ST-MAP-', modelName: '电站模型' },
          device: { prefix: 'DEV-MAP-', modelName: '设备模型' },
          point: { prefix: 'POINT-MAP-', modelName: '点位模型' }
        };
        const config = defaults[type];
        const record = {
          id: String(source.id || createImportedId(config.prefix, index)),
          platformId,
          versionId: source.versionId || published.id || '',
          modelName: source.modelName || config.modelName,
          internalFieldName: source.internalFieldName || '',
          internalFieldCode: source.internalFieldCode || '',
          externalFieldName: source.externalFieldName || '',
          externalFieldCode: source.externalFieldCode || '',
          ruleRef: source.ruleRef || ''
        };
        if (type === 'point') {
          record.aggregateRuleId = source.aggregateRuleId || '';
          record.relation = source.relation || (record.aggregateRuleId ? '一对多' : '一对一');
        } else {
          record.relation = source.relation || '一对一';
        }
        return record;
      }

      function normalizeControlMappingParams(mappings) {
        return (Array.isArray(mappings) ? mappings : []).map((item) => {
          const source = item && typeof item === 'object' ? item : {};
          const internal = source.internal && typeof source.internal === 'object' ? source.internal : {};
          const external = source.external && typeof source.external === 'object' ? source.external : {};
          return {
            internal: {
              name: internal.name || '',
              code: internal.code || '',
              type: internal.type || '',
              unit: internal.unit || '-'
            },
            external: {
              name: external.name || '',
              code: external.code || '',
              type: external.type || '',
              unit: external.unit || '-'
            }
          };
        }).filter((item) => {
          const values = [
            item.internal.name,
            item.internal.code,
            item.internal.type,
            item.internal.unit,
            item.external.name,
            item.external.code,
            item.external.type,
            item.external.unit
          ];
          return values.some((value) => value && value !== '-');
        });
      }

      function normalizeControlMappingImportItem(item, index, platformId = state.mappingRelationPlatformId) {
        const source = item && typeof item === 'object' ? item : {};
        const platform = getPlatformById(platformId) || { apis: [] };
        return {
          id: String(source.id || createImportedId('CTRL-MAP-', index)),
          platformId,
          name: source.name || ('导入控制映射 ' + (index + 1)),
          status: source.status || '已启用',
          apiCode: source.apiCode || ((platform.apis && platform.apis[0] && platform.apis[0].code) || 'API-NEW'),
          standard: {
            name: (source.standard && source.standard.name) || '',
            code: (source.standard && source.standard.code) || ''
          },
          partner: {
            name: (source.partner && source.partner.name) || '',
            code: (source.partner && source.partner.code) || ''
          },
          inputMappings: normalizeControlMappingParams(source.inputMappings),
          outputMappings: normalizeControlMappingParams(source.outputMappings)
        };
      }

      function normalizeMappingRelationVersionImportItem(item, index, platformId = state.mappingRelationPlatformId) {
        const source = item && typeof item === 'object' ? item : {};
        const snapshot = source.snapshot && typeof source.snapshot === 'object' ? source.snapshot : {};
        return {
          id: String(source.id || createImportedId('REL-V', index)),
          platformId,
          version: source.version || ('vJSON-' + (index + 1)),
          creator: source.creator || 'JSON导入',
          status: source.status || '草稿',
          createdAt: source.createdAt || formatDateTime(),
          snapshot: {
            station: (Array.isArray(snapshot.station) ? snapshot.station : []).map((record, itemIndex) => normalizeMappingRelationImportItem('station', record, itemIndex, platformId)),
            device: (Array.isArray(snapshot.device) ? snapshot.device : []).map((record, itemIndex) => normalizeMappingRelationImportItem('device', record, itemIndex, platformId)),
            point: (Array.isArray(snapshot.point) ? snapshot.point : []).map((record, itemIndex) => normalizeMappingRelationImportItem('point', record, itemIndex, platformId)),
            control: (Array.isArray(snapshot.control) ? snapshot.control : []).map((record, itemIndex) => normalizeControlMappingImportItem(record, itemIndex, platformId))
          }
        };
      }

      function replacePlatformScopedList(key, items, platformId = state.mappingRelationPlatformId) {
        const others = (dataStore[key] || []).filter((item) => (item.platformId || 'P001') !== platformId);
        dataStore[key] = items.concat(others);
      }

      function importMappingJson(type) {
        try {
          const importedItems = getMappingJsonImportItems(type);
          if (!importedItems.length) {
            throw new Error('JSON 中没有可导入的数据');
          }

          const platformId = state.mappingRelationPlatformId;

          if (type === 'station' || type === 'device' || type === 'point') {
            const keyMap = {
              station: 'stationMappings',
              device: 'deviceMappings',
              point: 'pointMappings'
            };
            const normalized = importedItems.map((item, index) => normalizeMappingRelationImportItem(type, item, index, platformId));
            replacePlatformScopedList(keyMap[type], normalized, platformId);
            state.currentMappingRelationId = normalized[0] ? normalized[0].id : '';
            state.currentMappingRelationType = type;
          } else if (type === 'control') {
            const normalized = importedItems.map((item, index) => normalizeControlMappingImportItem(item, index, platformId));
            replacePlatformScopedList('controlMappings', normalized, platformId);
            state.currentControlMappingId = normalized[0] ? normalized[0].id : '';
            state.controlMappingView = 'list';
          } else if (type === 'version') {
            const normalized = importedItems.map((item, index) => normalizeMappingRelationVersionImportItem(item, index, platformId));
            replacePlatformScopedList('mappingRelationVersions', normalized, platformId);
            state.currentMappingRelationVersionId = normalized[0] ? normalized[0].id : '';
            state.mappingRelationVersionView = 'list';
          }

          resetMappingDebugDrafts();
          renderMappings();
          closeDrawer();
          showToast(getMappingJsonTabLabel(type) + ' JSON 已导入，共 ' + importedItems.length + ' 条');
        } catch (error) {
          showToast(error.message || 'JSON 导入失败');
        }
      }

      function getSyncMonitorStats() {
        const dimensions = [
          { key: 'station', label: '电站数据', categories: ['电站数据'] },
          { key: 'device', label: '设备数据', categories: ['设备数据'] },
          { key: 'point', label: '点位数据', categories: ['点位数据'] }
        ];
        const syncLogs = dataStore.logs.filter((log) => ['调用日志', '同步任务日志'].includes(log.type));

        return dimensions.map((dimension) => {
          const logs = syncLogs.filter((log) => dimension.categories.includes(log.apiCategory));
          const successCount = logs.filter((log) => log.result === '成功').length;
          const relatedApiCount = dataStore.platforms.reduce((sum, platform) => {
            return sum + (platform.apis || []).filter((api) => dimension.categories.includes(api.category)).length;
          }, 0);
          return {
            key: dimension.key,
            label: dimension.label,
            count: logs.length,
            successCount,
            successRate: logs.length ? Math.round((successCount / logs.length) * 100) : 0,
            relatedApiCount
          };
        });
      }

      function resolveSyncType(log) {
        const category = String(log && log.apiCategory || '');
        if (category.includes('电站')) return '电站同步';
        if (category.includes('设备')) return '设备同步';
        if (category.includes('点位')) return '点位同步';
        if (category.includes('状态')) return '状态同步';
        if (category.includes('控制')) return '控制回查';
        return category || '通用同步';
      }

      function getSyncMonitorLogs(filters = state.syncMonitorFilters) {
        const logs = dataStore.logs.filter((log) => ['调用日志', '同步任务日志'].includes(log.type));
        return logs.filter((log) => {
          const byPlatform = !filters.platformId || platformIdByName(log.platform) === filters.platformId;
          const byType = !filters.syncType || resolveSyncType(log) === filters.syncType;
          return byPlatform && byType;
        });
      }

      function buildSyncMonitorSnapshot(filters = state.syncMonitorFilters) {
        const logs = getSyncMonitorLogs(filters);
        const labels = buildFlowTimeline(filters.range, filters.granularity);
        const rangeScale = getApiMonitorRangeScale(filters.range);
        const granularityFactor = filters.granularity === '1d' ? 2.2 : (filters.granularity === '1h' ? 1.25 : 1);
        const seed = flowSeed([filters.platformId || 'all', filters.syncType || 'all', filters.range, filters.granularity].join('|'));

        const totalBase = Math.max(logs.length, 6);
        const successBase = logs.filter((log) => log.result === '成功').length;
        const failBase = logs.filter((log) => log.result !== '成功').length;
        const volumeBase = logs.reduce((sum, log) => sum + extractSyncVolume(log.payload), 0);
        const avgDelayBase = logs.length
          ? Math.round(logs.reduce((sum, log) => sum + Number(log.latencyMs || 0), 0) / logs.length)
          : 460 + seed % 260;
        const timeoutBase = logs.filter((log) => isTimeoutCallLog(log)).length;
        const abnormalBase = logs.filter((log) => log.result !== '成功' || Number(log.latencyMs || 0) >= 1200).length;

        const pointCount = labels.length;
        const volumeSeries = [];
        const delaySeries = [];
        const thresholdSeries = [];
        const countSeries = [];
        const successSeries = [];
        const delayThreshold = 1200;
        const scaledTotal = Math.max(8, Math.round(totalBase * rangeScale * granularityFactor));
        const scaledVolume = Math.max(20, Math.round((volumeBase || totalBase * 40) * rangeScale));

        for (let index = 0; index < pointCount; index += 1) {
          const trend = 1 + 0.18 * Math.sin((index + seed % 7) / 2.7) + 0.09 * Math.cos((index + seed % 5) / 2.2);
          const count = Math.max(1, Math.round((scaledTotal / pointCount) * trend));
          const successRate = Math.max(70, Math.min(100, (successBase / Math.max(totalBase, 1)) * 100 + 4 * Math.sin((index + seed % 3) / 2.8)));
          const delay = Math.max(120, Math.round(avgDelayBase * (1 + 0.2 * Math.sin((index + seed % 4) / 3.1))));
          const volume = Math.max(10, Math.round((scaledVolume / pointCount) * (1 + 0.24 * Math.cos((index + seed % 6) / 2.9))));
          countSeries.push(count);
          successSeries.push(Number(successRate.toFixed(1)));
          delaySeries.push(delay);
          volumeSeries.push(volume);
          thresholdSeries.push(delayThreshold);
        }

        if (pointCount > 10) {
          const spikeIndex = Math.floor(pointCount * 0.72);
          delaySeries[spikeIndex] = Math.max(delaySeries[spikeIndex], 1520);
        }

        const totalCount = countSeries.reduce((sum, value) => sum + value, 0);
        const successRate = totalCount ? successSeries.reduce((sum, value) => sum + value, 0) / successSeries.length : 0;
        const failureCount = Math.round(failBase * rangeScale);
        const timeoutCount = Math.round(timeoutBase * rangeScale);
        const abnormalCount = Math.round(abnormalBase * rangeScale) + delaySeries.filter((value) => value >= delayThreshold).length;
        const avgDelay = delaySeries.length ? Math.round(delaySeries.reduce((sum, value) => sum + value, 0) / delaySeries.length) : avgDelayBase;
        const totalVolume = volumeSeries.reduce((sum, value) => sum + value, 0);
        const avgFrequencyPerHour = totalCount / Math.max(getFlowRangeMinutes(filters.range) / 60, 1);

        const reasonMap = new Map();
        logs.filter((log) => log.result !== '成功').forEach((log) => {
          const reason = normalizeFailureReason(log);
          reasonMap.set(reason, (reasonMap.get(reason) || 0) + 1);
        });
        const reasonRows = Array.from(reasonMap.entries())
          .map(([reason, count]) => ({ reason, count }))
          .sort((a, b) => b.count - a.count)
          .slice(0, 5);
        if (!reasonRows.length) {
          reasonRows.push({ reason: '暂无失败原因数据', count: 0 });
        }

        const candidatePlatforms = filters.platformId
          ? dataStore.platforms.filter((item) => item.id === filters.platformId)
          : dataStore.platforms.slice();
        const strategyMap = new Map();
        candidatePlatforms.forEach((platform) => {
          (platform.callStrategies || []).forEach((strategy, idx) => {
            const key = strategy.id || strategy.name || (platform.id + '-' + idx);
            if (!strategyMap.has(key)) {
              const localSeed = flowSeed(key + String(seed));
              const failRate = 6 + localSeed % 22;
              const success = Math.max(65, 100 - failRate);
              const latency = 380 + localSeed % 1100;
              strategyMap.set(key, {
                label: strategy.name || key,
                successRate: success,
                avgDelay: latency
              });
            }
          });
        });
        if (!strategyMap.size) {
          strategyMap.set('DEFAULT', { label: '默认同步策略', successRate: 92, avgDelay: avgDelay });
        }
        const strategyRows = Array.from(strategyMap.values())
          .sort((a, b) => a.successRate - b.successRate)
          .slice(0, 8);

        return {
          labels,
          volumeSeries,
          delaySeries,
          thresholdSeries,
          countSeries,
          successSeries,
          reasonRows,
          strategyRows,
          overview: {
            frequencyText: avgFrequencyPerHour.toFixed(1) + ' 次/小时',
            volumeText: formatFlowSize(totalVolume),
            delayText: formatMs(avgDelay),
            failureCount,
            successRate,
            abnormalCount
          }
        };
      }

      function destroySyncMonitorChart(chartKey) {
        if (syncMonitorCharts[chartKey] && typeof syncMonitorCharts[chartKey].destroy === 'function') {
          syncMonitorCharts[chartKey].destroy();
        }
        syncMonitorCharts[chartKey] = null;
      }

      function renderSyncMonitorTrendChart(snapshot) {
        const canvas = $('#syncMonitorTrendCanvas');
        if (!canvas || !window.Chart) return;
        const panel = $('#monitor-sync');
        if (panel && !panel.classList.contains('active')) return;

        destroySyncMonitorChart('trend');
        syncMonitorCharts.trend = new window.Chart(canvas.getContext('2d'), {
          data: {
            labels: snapshot.labels,
            datasets: [
              {
                type: 'line',
                label: '数据量',
                yAxisID: 'y',
                data: snapshot.volumeSeries,
                borderColor: '#2f78e6',
                backgroundColor: 'rgba(47, 120, 230, 0.18)',
                fill: true,
                tension: 0.3,
                borderWidth: 2.2,
                pointRadius: 0
              },
              {
                type: 'line',
                label: '延迟',
                yAxisID: 'y1',
                data: snapshot.delaySeries,
                borderColor: '#15408f',
                backgroundColor: 'rgba(21, 64, 143, 0.14)',
                tension: 0.3,
                borderWidth: 2.2,
                pointRadius: 2
              },
              {
                type: 'line',
                label: '延迟阈值线',
                yAxisID: 'y1',
                data: snapshot.thresholdSeries,
                borderColor: 'rgba(178, 106, 0, 0.95)',
                borderDash: [8, 6],
                borderWidth: 2,
                pointRadius: 0
              }
            ]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            interaction: { mode: 'index', intersect: false },
            plugins: {
              legend: { position: 'top', labels: { color: '#375079', boxWidth: 12 } },
              tooltip: {
                callbacks: {
                  label: (context) => {
                    if (context.dataset.label === '数据量') return `${context.dataset.label}：${formatFlowSize(context.parsed.y)}`;
                    return `${context.dataset.label}：${formatMs(context.parsed.y)}`;
                  }
                }
              }
            },
            scales: {
              x: {
                grid: { display: false },
                ticks: { color: '#56709b', maxRotation: 0, autoSkip: true, maxTicksLimit: 8 }
              },
              y: {
                beginAtZero: true,
                position: 'left',
                ticks: { color: '#56709b', callback: (value) => formatFlowAxis(Number(value)) },
                grid: { color: 'rgba(50, 102, 184, 0.12)' }
              },
              y1: {
                beginAtZero: true,
                position: 'right',
                ticks: { color: '#37598d', callback: (value) => formatMs(Number(value)) },
                grid: { drawOnChartArea: false }
              }
            }
          }
        });
      }

      function renderSyncMonitorStrategyChart(snapshot) {
        const canvas = $('#syncMonitorStrategyCanvas');
        if (!canvas || !window.Chart) return;
        const panel = $('#monitor-sync');
        if (panel && !panel.classList.contains('active')) return;

        destroySyncMonitorChart('strategy');
        syncMonitorCharts.strategy = new window.Chart(canvas.getContext('2d'), {
          type: 'bar',
          data: {
            labels: snapshot.strategyRows.map((item) => item.label),
            datasets: [
              {
                label: '成功率',
                data: snapshot.strategyRows.map((item) => Number(item.successRate.toFixed(1))),
                backgroundColor: snapshot.strategyRows.map((item) => item.successRate < 85 ? 'rgba(178, 106, 0, 0.82)' : 'rgba(29, 94, 184, 0.72)'),
                borderRadius: 8
              }
            ]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            indexAxis: 'y',
            plugins: {
              legend: { display: false },
              tooltip: {
                callbacks: {
                  label: (context) => `成功率：${context.parsed.x}%`
                }
              }
            },
            scales: {
              x: {
                beginAtZero: true,
                max: 100,
                ticks: { color: '#56709b', callback: (value) => value + '%' },
                grid: { color: 'rgba(50, 102, 184, 0.12)' }
              },
              y: {
                ticks: { color: '#56709b' },
                grid: { display: false }
              }
            }
          }
        });
      }

      function renderSyncMonitor() {
        const platformSelect = $('#syncMonitorPlatformFilter');
        const typeSelect = $('#syncMonitorTypeFilter');
        const rangeSelect = $('#syncMonitorRangeFilter');
        const granularitySelect = $('#syncMonitorGranularityFilter');
        if (!platformSelect || !typeSelect || !rangeSelect || !granularitySelect) return;

        platformSelect.innerHTML = [`<option value="">全部平台</option>`]
          .concat(dataStore.platforms.map((item) => `<option value="${item.id}">${item.name}</option>`))
          .join('');

        const syncTypeSet = new Set(dataStore.logs
          .filter((log) => ['调用日志', '同步任务日志'].includes(log.type))
          .map((log) => resolveSyncType(log)));
        typeSelect.innerHTML = [`<option value="">全部类型</option>`]
          .concat(Array.from(syncTypeSet).sort((a, b) => String(a).localeCompare(String(b), 'zh-CN')).map((item) => `<option value="${item}">${item}</option>`))
          .join('');

        platformSelect.value = state.syncMonitorFilters.platformId;
        typeSelect.value = state.syncMonitorFilters.syncType;
        rangeSelect.value = state.syncMonitorFilters.range;
        granularitySelect.value = state.syncMonitorFilters.granularity;

        const snapshot = buildSyncMonitorSnapshot(state.syncMonitorFilters);
        $('#syncMonitorFrequency').textContent = snapshot.overview.frequencyText;
        $('#syncMonitorVolume').textContent = snapshot.overview.volumeText;
        $('#syncMonitorDelay').textContent = snapshot.overview.delayText;
        $('#syncMonitorFailureCount').textContent = String(snapshot.overview.failureCount);
        $('#syncMonitorSuccessRate').textContent = snapshot.overview.successRate.toFixed(1) + '%';
        $('#syncMonitorAbnormalCount').textContent = String(snapshot.overview.abnormalCount);

        $('#syncMonitorFrequencySub').textContent = `统计点 ${snapshot.labels.length} 个`;
        $('#syncMonitorVolumeSub').textContent = '累计同步数据量';
        $('#syncMonitorDelaySub').textContent = '阈值 1200ms';
        $('#syncMonitorFailureCountSub').textContent = '同步失败调用总数';
        $('#syncMonitorSuccessRateSub').textContent = '全量同步成功占比';
        $('#syncMonitorAbnormalCountSub').textContent = '失败 + 高延迟次数';

        $('#syncMonitorReasonList').innerHTML = snapshot.reasonRows.map((item) => `
          <div class="sync-reason-item">${item.reason}：${item.count} 次</div>
        `).join('');

        renderSyncMonitorTrendChart(snapshot);
        renderSyncMonitorStrategyChart(snapshot);
      }

      function getProtocolTransformLatency(log) {
        const stages = log && log.stageDurations || {};
        const protocolTransform = Number(stages.protocolTransform || 0);
        const responseTransform = Number(stages.responseTransform || 0);
        const sum = protocolTransform + responseTransform;
        if (sum > 0) return sum;
        const latency = Number(log && log.latencyMs || 0);
        return latency > 0 ? Math.round(latency * 0.35) : 0;
      }

      function getProtocolMonitorLogs(filters = state.protocolMonitorFilters) {
        const logs = getProtocolLogs();
        return logs.filter((log) => {
          const byPlatform = !filters.platformId || platformIdByName(log.platform) === filters.platformId;
          const byType = !filters.transformType || log.transformType === filters.transformType;
          return byPlatform && byType;
        });
      }

      function buildProtocolMonitorSnapshot(filters = state.protocolMonitorFilters) {
        const logs = getProtocolMonitorLogs(filters);
        const labels = buildFlowTimeline(filters.range, filters.granularity);
        const rangeScale = getApiMonitorRangeScale(filters.range);
        const granularityFactor = filters.granularity === '1d' ? 2.5 : (filters.granularity === '1h' ? 1.3 : 1);
        const seed = flowSeed([filters.platformId || 'all', filters.transformType || 'all', filters.range, filters.granularity].join('|'));

        const platformMap = new Map();
        const concurrencyBucket = new Map();
        logs.forEach((log) => {
          const key = platformIdByName(log.platform) || log.platform || 'UNKNOWN';
          if (!platformMap.has(key)) {
            platformMap.set(key, {
              platformName: log.platform || key,
              total: 0,
              success: 0,
              fail: 0,
              latencySum: 0,
              latencyCount: 0,
              maxConcurrency: 0
            });
          }
          const item = platformMap.get(key);
          const latency = getProtocolTransformLatency(log);
          item.total += 1;
          if (log.result === '成功') item.success += 1;
          else item.fail += 1;
          if (latency > 0) {
            item.latencySum += latency;
            item.latencyCount += 1;
          }

          const bucket = `${key}-${formatProtocolBucketLabel(log.time)}`;
          concurrencyBucket.set(bucket, (concurrencyBucket.get(bucket) || 0) + 1);
          item.maxConcurrency = Math.max(item.maxConcurrency, concurrencyBucket.get(bucket));
        });

        if (!platformMap.size) {
          dataStore.platforms.forEach((platform, index) => {
            const pseudoTotal = 8 + (seed + index * 7) % 22;
            const pseudoFail = Math.max(0, Math.round(pseudoTotal * ((seed + index * 3) % 18) / 100));
            const pseudoSuccess = pseudoTotal - pseudoFail;
            const pseudoLatency = 140 + (seed + index * 17) % 520;
            platformMap.set(platform.id, {
              platformName: platform.name,
              total: pseudoTotal,
              success: pseudoSuccess,
              fail: pseudoFail,
              latencySum: pseudoLatency * pseudoTotal,
              latencyCount: pseudoTotal,
              maxConcurrency: 2 + ((seed + index * 5) % 6)
            });
          });
        }

        const platformRows = Array.from(platformMap.values()).map((item) => {
          const successRate = item.total ? (item.success / item.total) * 100 : 0;
          const failureRate = item.total ? (item.fail / item.total) * 100 : 0;
          const avgLatency = Math.round(item.latencySum / Math.max(item.latencyCount, 1));
          return {
            platformName: item.platformName,
            total: item.total,
            successRate,
            failureRate,
            avgLatency,
            concurrency: item.maxConcurrency
          };
        }).sort((a, b) => b.total - a.total);

        const totalBase = platformRows.reduce((sum, item) => sum + item.total, 0);
        const successBase = platformRows.reduce((sum, item) => sum + Math.round(item.total * (item.successRate / 100)), 0);
        const failBase = Math.max(0, totalBase - successBase);
        const avgLatencyBase = platformRows.length
          ? platformRows.reduce((sum, item) => sum + item.avgLatency, 0) / platformRows.length
          : 0;
        const successRateBase = totalBase ? (successBase / totalBase) * 100 : 0;
        const failureRateBase = totalBase ? (failBase / totalBase) * 100 : 0;
        const concurrencyBase = platformRows.length
          ? Math.max(...platformRows.map((item) => item.concurrency), 1)
          : 1;

        const trendCount = [];
        const trendLatency = [];
        const trendFailureRate = [];
        const thresholdLatency = [];
        const thresholdFailureRate = [];
        const scaledTotal = Math.max(8, Math.round(totalBase * rangeScale * granularityFactor));
        for (let index = 0; index < labels.length; index += 1) {
          const trendFactor = 1 + 0.18 * Math.sin((index + seed % 5) / 2.8) + 0.08 * Math.cos((index + seed % 7) / 2.1);
          const countValue = Math.max(1, Math.round((scaledTotal / Math.max(labels.length, 1)) * trendFactor));
          const latencyValue = Math.max(60, Math.round(avgLatencyBase * (1 + 0.16 * Math.sin((index + seed % 4) / 3.2))));
          const failureRateValue = Math.max(0, Math.min(100, failureRateBase + 2.8 * Math.sin((index + seed % 3) / 3.1)));
          trendCount.push(countValue);
          trendLatency.push(latencyValue);
          trendFailureRate.push(Number(failureRateValue.toFixed(1)));
          thresholdLatency.push(450);
          thresholdFailureRate.push(15);
        }

        if (labels.length > 10) {
          const spikeIndex = Math.floor(labels.length * 0.74);
          trendLatency[spikeIndex] = Math.max(trendLatency[spikeIndex], 620);
          trendFailureRate[spikeIndex] = Math.max(trendFailureRate[spikeIndex], 18);
        }

        const alertRows = [];
        if (trendLatency.some((value) => value >= 450)) {
          alertRows.push('检测到耗时突增，存在阈值越线风险（>=450ms）');
        }
        if (trendFailureRate.some((value) => value >= 15)) {
          alertRows.push('检测到失败率上升，存在失败率预警（>=15%）');
        }
        platformRows.forEach((row) => {
          if (row.avgLatency >= 450 || row.failureRate >= 15) {
            alertRows.push(`${row.platformName} 可能存在转换瓶颈（耗时 ${formatMs(row.avgLatency)} / 失败率 ${row.failureRate.toFixed(1)}%）`);
          }
        });
        const uniqueAlerts = Array.from(new Set(alertRows)).slice(0, 5);
        if (!uniqueAlerts.length) {
          uniqueAlerts.push('当前周期未发现明显协议转换异常，运行稳定。');
        }

        return {
          labels,
          trendCount,
          trendLatency,
          trendFailureRate,
          thresholdLatency,
          thresholdFailureRate,
          platformRows: platformRows.slice(0, 8),
          alertRows: uniqueAlerts,
          overview: {
            avgLatency: avgLatencyBase,
            successRate: successRateBase,
            failureRate: failureRateBase,
            concurrency: concurrencyBase,
            alertCount: uniqueAlerts.filter((item) => !item.includes('未发现')).length
          }
        };
      }

      function destroyProtocolMonitorChart(chartKey) {
        if (protocolMonitorCharts[chartKey] && typeof protocolMonitorCharts[chartKey].destroy === 'function') {
          protocolMonitorCharts[chartKey].destroy();
        }
        protocolMonitorCharts[chartKey] = null;
      }

      function renderProtocolMonitorTrendChart(snapshot) {
        const canvas = $('#protocolMonitorTrendCanvas');
        if (!canvas || !window.Chart) return;
        const panel = $('#monitor-protocol');
        if (panel && !panel.classList.contains('active')) return;

        destroyProtocolMonitorChart('trend');
        protocolMonitorCharts.trend = new window.Chart(canvas.getContext('2d'), {
          data: {
            labels: snapshot.labels,
            datasets: [
              {
                type: 'line',
                label: '转换量',
                yAxisID: 'y',
                data: snapshot.trendCount,
                borderColor: '#2f78e6',
                backgroundColor: 'rgba(47, 120, 230, 0.18)',
                fill: true,
                borderWidth: 2.2,
                tension: 0.3,
                pointRadius: 0
              },
              {
                type: 'line',
                label: '转换耗时',
                yAxisID: 'y1',
                data: snapshot.trendLatency,
                borderColor: '#15408f',
                backgroundColor: 'rgba(21, 64, 143, 0.14)',
                borderWidth: 2.1,
                tension: 0.28,
                pointRadius: 2
              },
              {
                type: 'line',
                label: '失败率',
                yAxisID: 'y2',
                data: snapshot.trendFailureRate,
                borderColor: '#b26a00',
                backgroundColor: 'rgba(178, 106, 0, 0.12)',
                borderWidth: 2,
                tension: 0.28,
                pointRadius: 2
              },
              {
                type: 'line',
                label: '耗时阈值线',
                yAxisID: 'y1',
                data: snapshot.thresholdLatency,
                borderColor: 'rgba(178, 106, 0, 0.95)',
                borderDash: [8, 6],
                borderWidth: 2,
                tension: 0,
                pointRadius: 0
              },
              {
                type: 'line',
                label: '失败率阈值线',
                yAxisID: 'y2',
                data: snapshot.thresholdFailureRate,
                borderColor: 'rgba(198, 40, 40, 0.9)',
                borderDash: [8, 6],
                borderWidth: 2,
                tension: 0,
                pointRadius: 0
              }
            ]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            interaction: { mode: 'index', intersect: false },
            plugins: {
              legend: { position: 'top', labels: { color: '#375079', boxWidth: 12 } },
              tooltip: {
                callbacks: {
                  label: (context) => {
                    if (context.dataset.yAxisID === 'y1') return `${context.dataset.label}：${formatMs(context.parsed.y)}`;
                    if (context.dataset.yAxisID === 'y2') return `${context.dataset.label}：${context.parsed.y}%`;
                    return `${context.dataset.label}：${context.parsed.y}`;
                  }
                }
              }
            },
            scales: {
              x: {
                grid: { display: false },
                ticks: { color: '#56709b', maxRotation: 0, autoSkip: true, maxTicksLimit: 8 }
              },
              y: {
                beginAtZero: true,
                position: 'left',
                ticks: { color: '#56709b' },
                grid: { color: 'rgba(50, 102, 184, 0.12)' }
              },
              y1: {
                beginAtZero: true,
                position: 'right',
                ticks: { color: '#35598f', callback: (value) => formatMs(Number(value)) },
                grid: { drawOnChartArea: false }
              },
              y2: {
                beginAtZero: true,
                max: 100,
                position: 'right',
                offset: true,
                ticks: { color: '#944422', callback: (value) => value + '%' },
                grid: { drawOnChartArea: false }
              }
            }
          }
        });
      }

      function renderProtocolMonitorCompareChart(snapshot) {
        const canvas = $('#protocolMonitorCompareCanvas');
        if (!canvas || !window.Chart) return;
        const panel = $('#monitor-protocol');
        if (panel && !panel.classList.contains('active')) return;

        destroyProtocolMonitorChart('compare');
        protocolMonitorCharts.compare = new window.Chart(canvas.getContext('2d'), {
          type: 'bar',
          data: {
            labels: snapshot.platformRows.map((item) => item.platformName),
            datasets: [
              {
                label: '成功率',
                yAxisID: 'y',
                data: snapshot.platformRows.map((item) => Number(item.successRate.toFixed(1))),
                backgroundColor: 'rgba(29, 94, 184, 0.7)',
                borderRadius: 6
              },
              {
                label: '失败率',
                yAxisID: 'y',
                data: snapshot.platformRows.map((item) => Number(item.failureRate.toFixed(1))),
                backgroundColor: 'rgba(178, 106, 0, 0.72)',
                borderRadius: 6
              },
              {
                label: '并发转换数',
                yAxisID: 'y1',
                data: snapshot.platformRows.map((item) => item.concurrency),
                backgroundColor: 'rgba(21, 64, 143, 0.7)',
                borderRadius: 6
              }
            ]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: { position: 'top', labels: { color: '#375079', boxWidth: 12 } },
              tooltip: {
                callbacks: {
                  label: (context) => context.dataset.yAxisID === 'y'
                    ? `${context.dataset.label}：${context.parsed.y}%`
                    : `${context.dataset.label}：${context.parsed.y}`
                }
              }
            },
            scales: {
              x: {
                grid: { display: false },
                ticks: { color: '#56709b' }
              },
              y: {
                beginAtZero: true,
                max: 100,
                position: 'left',
                ticks: { color: '#56709b', callback: (value) => value + '%' },
                grid: { color: 'rgba(50, 102, 184, 0.12)' }
              },
              y1: {
                beginAtZero: true,
                position: 'right',
                ticks: { color: '#35598f' },
                grid: { drawOnChartArea: false }
              }
            }
          }
        });
      }

      function renderProtocolMonitor() {
        const platformSelect = $('#protocolMonitorPlatformFilter');
        const typeSelect = $('#protocolMonitorTypeFilter');
        const rangeSelect = $('#protocolMonitorRangeFilter');
        const granularitySelect = $('#protocolMonitorGranularityFilter');
        if (!platformSelect || !typeSelect || !rangeSelect || !granularitySelect) return;

        platformSelect.innerHTML = [`<option value="">全部平台</option>`]
          .concat(dataStore.platforms.map((item) => `<option value="${item.id}">${item.name}</option>`))
          .join('');

        const transformTypeSet = new Set(getProtocolLogs().map((log) => log.transformType || '未分类'));
        typeSelect.innerHTML = [`<option value="">全部类型</option>`]
          .concat(Array.from(transformTypeSet).sort((a, b) => String(a).localeCompare(String(b), 'zh-CN')).map((item) => `<option value="${item}">${item}</option>`))
          .join('');

        platformSelect.value = state.protocolMonitorFilters.platformId;
        typeSelect.value = state.protocolMonitorFilters.transformType;
        rangeSelect.value = state.protocolMonitorFilters.range;
        granularitySelect.value = state.protocolMonitorFilters.granularity;

        const snapshot = buildProtocolMonitorSnapshot(state.protocolMonitorFilters);
        $('#protocolMonitorLatency').textContent = formatMs(snapshot.overview.avgLatency || 0);
        $('#protocolMonitorSuccessRate').textContent = snapshot.overview.successRate.toFixed(1) + '%';
        $('#protocolMonitorFailureRate').textContent = snapshot.overview.failureRate.toFixed(1) + '%';
        $('#protocolMonitorConcurrency').textContent = String(snapshot.overview.concurrency || 0);
        $('#protocolMonitorAlertCount').textContent = String(snapshot.overview.alertCount || 0);

        $('#protocolMonitorLatencySub').textContent = '协议转换平均耗时';
        $('#protocolMonitorSuccessRateSub').textContent = '转换成功占比';
        $('#protocolMonitorFailureRateSub').textContent = '转换失败占比';
        $('#protocolMonitorConcurrencySub').textContent = '峰值并发转换能力';
        $('#protocolMonitorAlertCountSub').textContent = '耗时突增 / 失败率上升自动告警';

        $('#protocolMonitorAlertList').innerHTML = snapshot.alertRows.map((item) => `
          <div class="protocol-alert-item">${item}</div>
        `).join('');

        renderProtocolMonitorTrendChart(snapshot);
        renderProtocolMonitorCompareChart(snapshot);
      }

      function isTimeoutCallLog(log) {
        const latency = Number(log && log.latencyMs || 0);
        const responseMs = Number(log && log.stageDurations && log.stageDurations.interfaceResponse || 0);
        const payload = log && log.payload || {};
        const timeoutText = [
          payload.reason || '',
          payload.errorLog || '',
          payload.partnerResponse && payload.partnerResponse.message || ''
        ].join(' ');
        return latency >= 5000 || responseMs >= 5000 || /timeout|超时/i.test(timeoutText);
      }

      function normalizeFailureReason(log) {
        const payload = log && log.payload || {};
        const raw = payload.reason || payload.errorLog || payload.partnerResponse && payload.partnerResponse.message || '';
        if (/timeout|超时/i.test(raw)) return '上游接口超时';
        if (/签名|鉴权|认证|token/i.test(raw)) return '认证/签名失败';
        if (/缺失|字段|格式|解析|转换/i.test(raw)) return '报文字段/转换异常';
        if (/熔断|限流|429|rate/i.test(raw)) return '限流/熔断触发';
        return raw || '未知异常';
      }

      function resolveApiTypeByLog(log) {
        if (log && log.apiCategory) return log.apiCategory;
        const meta = getApiMetaByCode(log && log.apiCode || '');
        return (meta.api && meta.api.category) || '未分类';
      }

      function buildApiMonitorQueryString(filters = {}) {
        const params = new URLSearchParams();
        if (filters.platformId) params.set('platformId', filters.platformId);
        if (filters.apiType) params.set('apiType', filters.apiType);
        if (filters.range) params.set('range', filters.range);
        if (filters.granularity) params.set('granularity', filters.granularity);
        return params.toString();
      }

      function buildApiMonitorQueryKey(filters = state.apiMonitorFilters) {
        return [filters.platformId || 'all', filters.apiType || 'all', filters.range || '7d', filters.granularity || '1h'].join('|');
      }

      async function fetchJsonWithTimeout(url, timeoutMs = 6000) {
        const controller = new AbortController();
        const timer = setTimeout(() => controller.abort(), timeoutMs);
        try {
          const response = await fetch(url, { signal: controller.signal });
          if (!response.ok) {
            throw new Error('HTTP ' + response.status);
          }
          return await response.json();
        } finally {
          clearTimeout(timer);
        }
      }

      function unwrapPayload(json) {
        if (!json || typeof json !== 'object') return null;
        if (Object.prototype.hasOwnProperty.call(json, 'data')) return json.data;
        return json;
      }

      function normalizeApiMonitorRemoteSnapshot(overviewRaw, trendRaw, metricsRaw, detailRaw) {
        const overview = unwrapPayload(overviewRaw) || {};
        const trend = unwrapPayload(trendRaw) || {};
        const metrics = unwrapPayload(metricsRaw) || {};
        const detail = unwrapPayload(detailRaw) || {};

        const labels = Array.isArray(trend.labels) ? trend.labels : [];
        const calls = Array.isArray(trend.calls) ? trend.calls : [];
        const successRates = Array.isArray(trend.successRates) ? trend.successRates : [];
        const metricBars = Array.isArray(metrics.items) ? metrics.items : [];
        const rows = Array.isArray(detail.rows) ? detail.rows : [];
        const reasonRows = Array.isArray(detail.failureReasons) ? detail.failureReasons : [];

        if (!labels.length || !rows.length) return null;

        const safeRows = rows.map((item) => {
          const failureRate = Number(item.failureRate || 0);
          const timeout = Number(item.timeout || 0);
          const avgLatency = Number(item.avgLatency || 0);
          const stabilityScore = Number(item.stabilityScore || item.stability || Math.max(0, 100 - failureRate * 1.4 - timeout * 4 - Math.max(0, (avgLatency - 500) / 25)));
          const anomalyLevel = item.anomalyLevel || (stabilityScore < 75 ? 'high' : stabilityScore < 88 ? 'medium' : 'low');
          return {
            apiCode: item.apiCode || '-',
            apiName: item.apiName || item.apiCode || '-',
            apiType: item.apiType || '未分类',
            total: Number(item.total || 0),
            successRate: Number(item.successRate || 0),
            failureRate,
            avgLatency,
            timeout,
            stabilityScore,
            reason: item.reason || '-',
            anomalyLevel
          };
        });
        const normalizedMetricBars = (metricBars.length ? metricBars.map((item) => ({
          label: item.label || item.apiCode || '-',
          value: Number(item.value || 0),
          anomalyLevel: item.anomalyLevel || 'low'
        })) : safeRows
          .slice()
          .sort((a, b) => b.avgLatency - a.avgLatency)
          .slice(0, 8)
          .map((item) => ({
            label: item.apiCode,
            value: item.avgLatency,
            anomalyLevel: item.anomalyLevel
          })));

        return {
          source: 'remote',
          labels,
          trendCalls: calls,
          trendSuccessRate: successRates,
          metricBars: normalizedMetricBars,
          rows: safeRows,
          reasonRows: reasonRows.map((item) => ({
            reason: item.reason || '未知异常',
            count: Number(item.count || 0),
            ratio: Number(item.ratio || 0)
          })),
          overview: {
            totalCalls: Number(overview.totalCalls || 0),
            successRate: Number(overview.successRate || 0),
            avgLatency: Number(overview.avgLatency || 0),
            failureRate: Number(overview.failureRate || 0),
            timeoutCount: Number(overview.timeoutCount || 0),
            stability: Number(overview.stability || overview.stabilityScore || (safeRows.length
              ? safeRows.reduce((sum, item) => sum + item.stabilityScore, 0) / safeRows.length
              : 0))
          },
          anomalyApiNames: safeRows.filter((item) => item.anomalyLevel !== 'low').map((item) => item.apiCode)
        };
      }

      async function requestApiMonitorRemoteSnapshot(filters) {
        const query = buildApiMonitorQueryString(filters);
        const suffix = query ? ('?' + query) : '';
        const [overviewRaw, trendRaw, metricsRaw, detailRaw] = await Promise.all([
          fetchJsonWithTimeout('/api/monitor/interface/overview' + suffix),
          fetchJsonWithTimeout('/api/monitor/interface/trend' + suffix),
          fetchJsonWithTimeout('/api/monitor/interface/metrics' + suffix),
          fetchJsonWithTimeout('/api/monitor/interface/detail' + suffix)
        ]);
        return normalizeApiMonitorRemoteSnapshot(overviewRaw, trendRaw, metricsRaw, detailRaw);
      }

      function getApiMonitorRangeScale(range) {
        const map = {
          '24h': 1,
          '7d': 3.6,
          '30d': 10.5
        };
        return map[range] || map['7d'];
      }

      function buildApiMonitorLocalSnapshot(filters = state.apiMonitorFilters) {
        const allCallLogs = getCallLogs();
        const platformFilteredLogs = filters.platformId
          ? allCallLogs.filter((log) => platformIdByName(log.platform) === filters.platformId)
          : allCallLogs.slice();
        const filteredLogs = filters.apiType
          ? platformFilteredLogs.filter((log) => resolveApiTypeByLog(log) === filters.apiType)
          : platformFilteredLogs;

        const apiMap = new Map();
        const reasonMap = new Map();
        filteredLogs.forEach((log) => {
          const apiCode = log.apiCode || 'UNKNOWN-API';
          const meta = getApiMetaByCode(apiCode);
          const apiType = resolveApiTypeByLog(log);
          if (!apiMap.has(apiCode)) {
            apiMap.set(apiCode, {
              apiCode,
              apiName: meta.api && meta.api.name || apiCode,
              apiType,
              total: 0,
              success: 0,
              fail: 0,
              timeout: 0,
              latencyTotal: 0,
              latencyCount: 0,
              abnormal: 0,
              reasonMap: new Map()
            });
          }
          const item = apiMap.get(apiCode);
          item.total += 1;
          if (log.result === '成功') {
            item.success += 1;
          } else {
            item.fail += 1;
          }

          const latency = Number(log.latencyMs || 0);
          if (latency > 0) {
            item.latencyTotal += latency;
            item.latencyCount += 1;
          }

          const timeout = isTimeoutCallLog(log);
          if (timeout) item.timeout += 1;
          if (log.result !== '成功' || timeout) item.abnormal += 1;

          if (log.result !== '成功') {
            const reason = normalizeFailureReason(log);
            item.reasonMap.set(reason, (item.reasonMap.get(reason) || 0) + 1);
            reasonMap.set(reason, (reasonMap.get(reason) || 0) + 1);
          }
        });

        const rows = Array.from(apiMap.values()).map((item) => {
          const successRate = item.total ? (item.success / item.total) * 100 : 0;
          const failureRate = item.total ? (item.fail / item.total) * 100 : 0;
          const avgLatency = Math.round(item.latencyTotal / Math.max(item.latencyCount, 1));
          const topReasonEntry = Array.from(item.reasonMap.entries()).sort((a, b) => b[1] - a[1])[0];
          const reason = topReasonEntry ? `${topReasonEntry[0]}（${topReasonEntry[1]}次）` : '-';
          const stabilityScore = Math.max(0, 100 - failureRate * 1.4 - item.timeout * 4 - Math.max(0, (avgLatency - 500) / 25));
          let anomalyLevel = 'low';
          if (stabilityScore < 75 || failureRate >= 20 || item.timeout >= 2 || avgLatency >= 1200) anomalyLevel = 'high';
          else if (stabilityScore < 88 || failureRate >= 10 || item.timeout >= 1 || avgLatency >= 700 || item.abnormal >= 2) anomalyLevel = 'medium';
          return {
            apiCode: item.apiCode,
            apiName: item.apiName,
            apiType: item.apiType,
            total: item.total,
            successRate,
            failureRate,
            avgLatency,
            timeout: item.timeout,
            stabilityScore,
            reason,
            anomalyLevel
          };
        }).sort((a, b) => {
          const levelWeight = { high: 3, medium: 2, low: 1 };
          if (levelWeight[b.anomalyLevel] !== levelWeight[a.anomalyLevel]) return levelWeight[b.anomalyLevel] - levelWeight[a.anomalyLevel];
          return b.total - a.total;
        });

        const totalCallsBase = rows.reduce((sum, item) => sum + item.total, 0);
        const successCallsBase = rows.reduce((sum, item) => sum + Math.round(item.total * (item.successRate / 100)), 0);
        const failureCallsBase = rows.reduce((sum, item) => sum + Math.round(item.total * (item.failureRate / 100)), 0);
        const timeoutCountBase = rows.reduce((sum, item) => sum + item.timeout, 0);
        const avgLatencyBase = rows.length
          ? rows.reduce((sum, item) => sum + item.avgLatency, 0) / rows.length
          : 0;
        const stabilityBase = rows.length
          ? rows.reduce((sum, item) => sum + item.stabilityScore, 0) / rows.length
          : 0;

        const labels = buildFlowTimeline(filters.range, filters.granularity);
        const pointCount = labels.length;
        const rangeScale = getApiMonitorRangeScale(filters.range);
        const granularityFactor = filters.granularity === '1d' ? 2.6 : (filters.granularity === '1h' ? 1.3 : 1);
        const seed = flowSeed(buildApiMonitorQueryKey(filters));
        const trendCalls = [];
        const trendSuccessRate = [];
        const trendTotalBase = Math.max(8, Math.round(totalCallsBase * rangeScale * granularityFactor));
        const baseSuccessRate = totalCallsBase ? (successCallsBase / Math.max(totalCallsBase, 1)) * 100 : 90;
        for (let index = 0; index < pointCount; index += 1) {
          const trendFactor = 1 + 0.2 * Math.sin((index + seed % 7) / 2.7) + 0.08 * Math.cos((index + seed % 5) / 1.9);
          const calls = Math.max(1, Math.round((trendTotalBase / Math.max(pointCount, 1)) * trendFactor));
          trendCalls.push(calls);
          const successRate = Math.max(65, Math.min(100, baseSuccessRate + 4 * Math.sin((index + seed % 3) / 3.1) - (rows.some((item) => item.anomalyLevel === 'high') ? 2 : 0)));
          trendSuccessRate.push(Number(successRate.toFixed(1)));
        }

        const reasonRows = Array.from(reasonMap.entries())
          .map(([reason, count]) => ({ reason, count }))
          .sort((a, b) => b.count - a.count)
          .slice(0, 5)
          .map((item) => ({
            reason: item.reason,
            count: item.count,
            ratio: failureCallsBase ? (item.count / failureCallsBase) * 100 : 0
          }));

        const metricBars = rows
          .slice()
          .sort((a, b) => b.avgLatency - a.avgLatency)
          .slice(0, 8)
          .map((item) => ({
            label: item.apiCode,
            value: item.avgLatency,
            anomalyLevel: item.anomalyLevel
          }));

        const totalCalls = trendCalls.reduce((sum, value) => sum + value, 0);
        const successRate = totalCallsBase ? (successCallsBase / Math.max(totalCallsBase, 1)) * 100 : 0;
        const failureRate = totalCallsBase ? (failureCallsBase / Math.max(totalCallsBase, 1)) * 100 : 0;

        return {
          source: 'local',
          labels,
          trendCalls,
          trendSuccessRate,
          metricBars,
          rows,
          reasonRows,
          overview: {
            totalCalls,
            successRate,
            avgLatency: avgLatencyBase,
            failureRate,
            timeoutCount: Math.round(timeoutCountBase * rangeScale),
            stability: stabilityBase
          },
          anomalyApiNames: rows.filter((item) => item.anomalyLevel !== 'low').map((item) => item.apiCode)
        };
      }

      function destroyApiMonitorChart(chartKey) {
        if (apiMonitorCharts[chartKey] && typeof apiMonitorCharts[chartKey].destroy === 'function') {
          apiMonitorCharts[chartKey].destroy();
        }
        apiMonitorCharts[chartKey] = null;
      }

      function renderApiMonitorTrendChart(snapshot) {
        const canvas = $('#apiMonitorTrendCanvas');
        if (!canvas || !window.Chart) return;
        const panel = $('#monitor-api');
        if (panel && !panel.classList.contains('active')) return;
        destroyApiMonitorChart('trend');
        const healthThreshold = snapshot.trendSuccessRate.map(() => 95);
        apiMonitorCharts.trend = new window.Chart(canvas.getContext('2d'), {
          data: {
            labels: snapshot.labels,
            datasets: [
              {
                type: 'line',
                label: '调用次数',
                yAxisID: 'y',
                data: snapshot.trendCalls,
                borderColor: '#2f78e6',
                backgroundColor: 'rgba(47, 120, 230, 0.18)',
                fill: true,
                borderWidth: 2.2,
                tension: 0.3,
                pointRadius: 0
              },
              {
                type: 'line',
                label: '成功率',
                yAxisID: 'y1',
                data: snapshot.trendSuccessRate,
                borderColor: '#173f8f',
                backgroundColor: 'rgba(23, 63, 143, 0.16)',
                borderWidth: 2.4,
                tension: 0.3,
                pointRadius: 2
              },
              {
                type: 'line',
                label: '健康阈值线',
                yAxisID: 'y1',
                data: healthThreshold,
                borderColor: 'rgba(178, 106, 0, 0.95)',
                borderWidth: 2,
                borderDash: [8, 6],
                tension: 0,
                pointRadius: 0
              }
            ]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            interaction: { mode: 'index', intersect: false },
            plugins: {
              legend: { position: 'top', labels: { color: '#375079', boxWidth: 12 } },
              tooltip: {
                callbacks: {
                  label: (context) => {
                    if (context.dataset.yAxisID === 'y1') return `${context.dataset.label}：${context.parsed.y}%`;
                    return `${context.dataset.label}：${context.parsed.y} 次`;
                  }
                }
              }
            },
            scales: {
              x: {
                grid: { display: false },
                ticks: { color: '#56709b', maxRotation: 0, autoSkip: true, maxTicksLimit: 8 }
              },
              y: {
                beginAtZero: true,
                position: 'left',
                ticks: { color: '#56709b' },
                grid: { color: 'rgba(50, 102, 184, 0.12)' }
              },
              y1: {
                beginAtZero: true,
                max: 100,
                position: 'right',
                ticks: {
                  color: '#36598f',
                  callback: (value) => value + '%'
                },
                grid: { drawOnChartArea: false }
              }
            }
          }
        });
      }

      function renderApiMonitorMetricChart(snapshot) {
        const canvas = $('#apiMonitorMetricCanvas');
        if (!canvas || !window.Chart) return;
        const panel = $('#monitor-api');
        if (panel && !panel.classList.contains('active')) return;
        destroyApiMonitorChart('metric');
        const colors = snapshot.metricBars.map((item) => {
          if (item.anomalyLevel === 'high') return 'rgba(178, 106, 0, 0.82)';
          if (item.anomalyLevel === 'medium') return 'rgba(29, 94, 184, 0.78)';
          return 'rgba(47, 120, 230, 0.66)';
        });
        apiMonitorCharts.metric = new window.Chart(canvas.getContext('2d'), {
          type: 'bar',
          data: {
            labels: snapshot.metricBars.map((item) => item.label),
            datasets: [{
              label: '平均响应时间',
              data: snapshot.metricBars.map((item) => item.value),
              backgroundColor: colors,
              borderRadius: 8
            }]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            indexAxis: 'y',
            plugins: {
              legend: { display: false },
              tooltip: {
                callbacks: {
                  label: (context) => `平均响应时间：${formatMs(context.parsed.x)}`
                }
              }
            },
            scales: {
              x: {
                ticks: { color: '#56709b', callback: (value) => formatMs(Number(value)) },
                grid: { color: 'rgba(50, 102, 184, 0.12)' }
              },
              y: {
                ticks: { color: '#56709b' },
                grid: { display: false }
              }
            }
          }
        });
      }

      function renderApiMonitorSnapshot(snapshot) {
        $('#apiMonitorTotalCalls').textContent = String(snapshot.overview.totalCalls || 0);
        $('#apiMonitorSuccessRate').textContent = (snapshot.overview.successRate || 0).toFixed(1) + '%';
        $('#apiMonitorFailureRate').textContent = (snapshot.overview.failureRate || 0).toFixed(1) + '%';
        $('#apiMonitorAvgLatency').textContent = formatMs(snapshot.overview.avgLatency || 0);
        $('#apiMonitorTimeoutCount').textContent = String(snapshot.overview.timeoutCount || 0);
        $('#apiMonitorStability').textContent = (snapshot.overview.stability || 0).toFixed(1) + '分';

        $('#apiMonitorTotalCallsSub').textContent = `统计点 ${snapshot.labels.length} 个`;
        $('#apiMonitorSuccessRateSub').textContent = '成功调用占比';
        $('#apiMonitorFailureRateSub').textContent = '失败调用占比';
        $('#apiMonitorAvgLatencySub').textContent = '接口整体平均响应耗时';
        $('#apiMonitorTimeoutCountSub').textContent = '超时阈值：5s';
        $('#apiMonitorStabilitySub').textContent = '综合成功率、超时与延迟评估';

        const reasonRows = snapshot.reasonRows.length ? snapshot.reasonRows : [{ reason: '暂无失败原因数据', count: 0, ratio: 0 }];
        $('#apiMonitorReasonList').innerHTML = reasonRows.map((item) => `
          <div class="api-anomaly-item">${item.reason}：${item.count} 次（${item.ratio.toFixed(1)}%）</div>
        `).join('');

        $('#apiMonitorAnomalySummary').textContent = snapshot.anomalyApiNames.length
          ? `异常接口：${snapshot.anomalyApiNames.join('、')}`
          : '异常接口：无';

        $('#apiMonitorTableBody').innerHTML = snapshot.rows.map((item) => `
          <tr>
            <td><strong>${item.apiCode}</strong></td>
            <td>${item.apiName}</td>
            <td>${item.apiType}</td>
            <td>${item.total}</td>
            <td>${item.successRate.toFixed(1)}%</td>
            <td>${item.failureRate.toFixed(1)}%</td>
            <td>${formatMs(item.avgLatency)}</td>
            <td>${item.timeout}</td>
            <td>${item.stabilityScore.toFixed(1)}分</td>
            <td><span class="api-fail-reason" title="${escapeHtml(item.reason)}">${item.reason}</span></td>
            <td><span class="api-anomaly-pill ${item.anomalyLevel}">${item.anomalyLevel === 'high' ? '高风险' : item.anomalyLevel === 'medium' ? '中风险' : '正常'}</span></td>
          </tr>
        `).join('') || '<tr><td colspan="11" class="muted">暂无接口调用数据。</td></tr>';

        renderApiMonitorTrendChart(snapshot);
        renderApiMonitorMetricChart(snapshot);
      }

      async function renderApiMonitor() {
        const platformSelect = $('#apiMonitorPlatformFilter');
        const typeSelect = $('#apiMonitorTypeFilter');
        const rangeSelect = $('#apiMonitorRangeFilter');
        const granularitySelect = $('#apiMonitorGranularityFilter');
        if (!platformSelect || !typeSelect || !rangeSelect || !granularitySelect) return;

        platformSelect.innerHTML = [`<option value="">全部平台</option>`]
          .concat(dataStore.platforms.map((item) => `<option value="${item.id}">${item.name}</option>`))
          .join('');

        const typeSet = new Set(getCallLogs().map((log) => resolveApiTypeByLog(log)));
        typeSelect.innerHTML = [`<option value="">全部类型</option>`]
          .concat(Array.from(typeSet).sort((a, b) => String(a).localeCompare(String(b), 'zh-CN')).map((type) => `<option value="${type}">${type}</option>`))
          .join('');

        platformSelect.value = state.apiMonitorFilters.platformId;
        typeSelect.value = state.apiMonitorFilters.apiType;
        rangeSelect.value = state.apiMonitorFilters.range;
        granularitySelect.value = state.apiMonitorFilters.granularity;

        const localSnapshot = buildApiMonitorLocalSnapshot(state.apiMonitorFilters);
        renderApiMonitorSnapshot(localSnapshot);

        if (!state.apiMonitorRemote.enabled || state.apiMonitorRemote.loading) return;

        const queryKey = buildApiMonitorQueryKey(state.apiMonitorFilters);
        if (state.apiMonitorRemote.queryKey === queryKey && state.apiMonitorRemote.data) {
          renderApiMonitorSnapshot(state.apiMonitorRemote.data);
          return;
        }

        state.apiMonitorRemote.loading = true;
        try {
          const remoteSnapshot = await requestApiMonitorRemoteSnapshot(state.apiMonitorFilters);
          if (remoteSnapshot) {
            state.apiMonitorRemote.queryKey = queryKey;
            state.apiMonitorRemote.data = remoteSnapshot;
            renderApiMonitorSnapshot(remoteSnapshot);
          }
        } catch (error) {
          // 保持本地降级数据展示
        } finally {
          state.apiMonitorRemote.loading = false;
        }
      }

      function getFlowRangeMinutes(range) {
        const map = {
          '24h': 24 * 60,
          '7d': 7 * 24 * 60,
          '30d': 30 * 24 * 60
        };
        return map[range] || map['7d'];
      }

      function getFlowGranularityMinutes(granularity) {
        const map = {
          '5m': 5,
          '1h': 60,
          '1d': 1440
        };
        return map[granularity] || map['1h'];
      }

      function flowSeed(text) {
        return String(text || '')
          .split('')
          .reduce((sum, char, index) => sum + char.charCodeAt(0) * (index + 3), 0);
      }

      function formatFlowSize(valueMb, digits = 2) {
        const safeValue = Number(valueMb || 0);
        if (!Number.isFinite(safeValue) || safeValue <= 0) return '0 MB';
        if (safeValue >= 1024 * 1024) return (safeValue / (1024 * 1024)).toFixed(digits).replace(/\.0+$/, '').replace(/(\.\d*[1-9])0+$/, '$1') + ' TB';
        if (safeValue >= 1024) return (safeValue / 1024).toFixed(digits).replace(/\.0+$/, '').replace(/(\.\d*[1-9])0+$/, '$1') + ' GB';
        return Math.round(safeValue) + ' MB';
      }

      function formatFlowAxis(valueMb) {
        if (valueMb >= 1024) return (valueMb / 1024).toFixed(1).replace(/\.0$/, '') + 'GB';
        return Math.round(valueMb) + 'MB';
      }

      function formatFlowLabel(date, granularity) {
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const hour = String(date.getHours()).padStart(2, '0');
        const minute = String(date.getMinutes()).padStart(2, '0');
        if (granularity === '1d') return `${month}-${day}`;
        if (granularity === '1h') return `${month}-${day} ${hour}:00`;
        return `${hour}:${minute}`;
      }

      function buildFlowTimeline(range, granularity) {
        const rangeMinutes = getFlowRangeMinutes(range);
        const granularityMinutes = getFlowGranularityMinutes(granularity);
        const estimatedCount = Math.ceil(rangeMinutes / granularityMinutes);
        const pointCount = Math.max(8, Math.min(56, estimatedCount));
        const end = new Date('2026-03-24T10:30:00+08:00');
        const labels = [];
        for (let index = pointCount - 1; index >= 0; index -= 1) {
          const pointDate = new Date(end.getTime() - index * granularityMinutes * 60 * 1000);
          labels.push(formatFlowLabel(pointDate, granularity));
        }
        return labels;
      }

      function buildPlatformFlowSeries(platformId, pointCount, granularity) {
        const seed = flowSeed(platformId);
        const granularityFactor = granularity === '1d' ? 7.2 : (granularity === '1h' ? 1.9 : 1);
        const baseUp = (70 + seed % 65) * granularityFactor;
        const baseDown = (95 + seed % 88) * granularityFactor;
        const upSeries = [];
        const downSeries = [];

        for (let index = 0; index < pointCount; index += 1) {
          const trend = 1 + 0.18 * Math.sin((index + seed % 5) / 2.8) + 0.11 * Math.cos((index + seed % 7) / 4.2);
          const peak = 1 + 0.06 * Math.sin((index + seed % 3) / 1.4);
          upSeries.push(Math.max(12, Math.round(baseUp * trend * peak)));
          downSeries.push(Math.max(20, Math.round(baseDown * (trend + 0.08) * (1 + 0.04 * Math.cos(index / 2.1)))));
        }

        if (pointCount > 10 && platformId === 'P004') {
          const peakIndex = Math.max(3, Math.floor(pointCount * 0.68));
          upSeries[peakIndex] = Math.round(upSeries[peakIndex] * 1.85);
          downSeries[peakIndex] = Math.round(downSeries[peakIndex] * 1.72);
          upSeries[pointCount - 1] = Math.round(upSeries[pointCount - 1] * 1.58);
          downSeries[pointCount - 1] = Math.round(downSeries[pointCount - 1] * 1.46);
        }

        if (pointCount > 10 && platformId === 'P003') {
          const dropIndex = Math.max(4, Math.floor(pointCount * 0.72));
          upSeries[dropIndex] = Math.round(upSeries[dropIndex] * 0.52);
          downSeries[dropIndex] = Math.round(downSeries[dropIndex] * 0.56);
          upSeries[pointCount - 1] = Math.round(upSeries[pointCount - 1] * 0.62);
          downSeries[pointCount - 1] = Math.round(downSeries[pointCount - 1] * 0.66);
        }

        return {
          upSeries,
          downSeries,
          totalSeries: upSeries.map((value, index) => value + downSeries[index])
        };
      }

      function analyzeFlowAnomaly(totalSeries) {
        let anomalyPoints = 0;
        for (let index = 3; index < totalSeries.length; index += 1) {
          const baseline = (totalSeries[index - 1] + totalSeries[index - 2] + totalSeries[index - 3]) / 3;
          const change = ((totalSeries[index] - baseline) / Math.max(baseline, 1)) * 100;
          if (change >= 45 || change <= -35) anomalyPoints += 1;
        }

        const lastIndex = totalSeries.length - 1;
        const reference = lastIndex >= 3
          ? (totalSeries[lastIndex - 1] + totalSeries[lastIndex - 2] + totalSeries[lastIndex - 3]) / 3
          : totalSeries[lastIndex - 1] || totalSeries[lastIndex] || 1;
        const latestChange = ((totalSeries[lastIndex] - reference) / Math.max(reference, 1)) * 100;

        let status = 'normal';
        if (latestChange >= 45) status = 'spike';
        if (latestChange <= -35) status = 'drop';

        return {
          anomalyPoints,
          latestChange,
          status
        };
      }

      function buildFlowMonitorSnapshot() {
        const platformId = state.flowMonitorFilters.platformId;
        const range = state.flowMonitorFilters.range;
        const granularity = state.flowMonitorFilters.granularity;
        const labels = buildFlowTimeline(range, granularity);
        const selectedPlatforms = platformId
          ? dataStore.platforms.filter((item) => item.id === platformId)
          : dataStore.platforms.slice();

        const trendUp = new Array(labels.length).fill(0);
        const trendDown = new Array(labels.length).fill(0);
        const rows = selectedPlatforms.map((platform) => {
          const series = buildPlatformFlowSeries(platform.id, labels.length, granularity);
          const anomaly = analyzeFlowAnomaly(series.totalSeries);
          series.upSeries.forEach((value, index) => {
            trendUp[index] += value;
            trendDown[index] += series.downSeries[index];
          });
          const upFlow = series.upSeries.reduce((sum, value) => sum + value, 0);
          const downFlow = series.downSeries.reduce((sum, value) => sum + value, 0);
          const totalFlow = upFlow + downFlow;
          const averageFlow = totalFlow / Math.max(series.totalSeries.length, 1);
          const peakFlow = Math.max(...series.totalSeries, 0);
          return {
            platformId: platform.id,
            platformName: platform.name,
            upFlow,
            downFlow,
            totalFlow,
            averageFlow,
            peakFlow,
            anomalyPoints: anomaly.anomalyPoints,
            latestChange: anomaly.latestChange,
            anomalyStatus: anomaly.status
          };
        }).sort((a, b) => b.totalFlow - a.totalFlow);

        const trendTotal = trendUp.map((value, index) => value + trendDown[index]);
        const totalUpFlow = rows.reduce((sum, item) => sum + item.upFlow, 0);
        const totalDownFlow = rows.reduce((sum, item) => sum + item.downFlow, 0);
        const totalFlow = totalUpFlow + totalDownFlow;
        const anomalyCount = rows.reduce((sum, item) => sum + item.anomalyPoints, 0);
        const abnormalRows = rows.filter((item) => item.anomalyStatus !== 'normal');

        return {
          labels,
          rows,
          trendUp,
          trendDown,
          trendTotal,
          totalUpFlow,
          totalDownFlow,
          totalFlow,
          anomalyCount,
          abnormalRows
        };
      }

      function destroyFlowChart(chartKey) {
        if (flowMonitorCharts[chartKey] && typeof flowMonitorCharts[chartKey].destroy === 'function') {
          flowMonitorCharts[chartKey].destroy();
        }
        flowMonitorCharts[chartKey] = null;
      }

      function renderFlowTrendChart(snapshot) {
        const canvas = $('#flowTrendCanvas');
        if (!canvas || !window.Chart) return;
        const panel = $('#monitor-flow');
        if (panel && !panel.classList.contains('active')) return;

        destroyFlowChart('trend');
        flowMonitorCharts.trend = new window.Chart(canvas.getContext('2d'), {
          type: 'line',
          data: {
            labels: snapshot.labels,
            datasets: [
              {
                label: '上行流量',
                data: snapshot.trendUp,
                borderColor: '#2f78e6',
                backgroundColor: 'rgba(47, 120, 230, 0.14)',
                tension: 0.3,
                borderWidth: 2,
                pointRadius: 2
              },
              {
                label: '下行流量',
                data: snapshot.trendDown,
                borderColor: '#69a1ff',
                backgroundColor: 'rgba(105, 161, 255, 0.14)',
                tension: 0.3,
                borderWidth: 2,
                pointRadius: 2
              },
              {
                label: '总流量',
                data: snapshot.trendTotal,
                borderColor: '#1d4faa',
                backgroundColor: 'rgba(29, 79, 170, 0.16)',
                tension: 0.34,
                borderWidth: 2.6,
                pointRadius: 2
              }
            ]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            interaction: {
              mode: 'index',
              intersect: false
            },
            plugins: {
              legend: {
                position: 'top',
                labels: {
                  color: '#375079',
                  boxWidth: 12
                }
              },
              tooltip: {
                callbacks: {
                  label: (context) => `${context.dataset.label}：${formatFlowSize(context.parsed.y)}`
                }
              }
            },
            scales: {
              x: {
                grid: {
                  display: false
                },
                ticks: {
                  color: '#56709b',
                  maxRotation: 0,
                  autoSkip: true,
                  maxTicksLimit: 8
                }
              },
              y: {
                beginAtZero: true,
                ticks: {
                  color: '#56709b',
                  callback: (value) => formatFlowAxis(Number(value))
                },
                grid: {
                  color: 'rgba(50, 102, 184, 0.12)'
                }
              }
            }
          }
        });
      }

      function renderFlowPlatformChart(snapshot) {
        const canvas = $('#flowPlatformCanvas');
        if (!canvas || !window.Chart) return;
        const panel = $('#monitor-flow');
        if (panel && !panel.classList.contains('active')) return;

        destroyFlowChart('platform');
        const barColors = snapshot.rows.map((item) => {
          if (item.anomalyStatus === 'spike') return 'rgba(178, 106, 0, 0.82)';
          if (item.anomalyStatus === 'drop') return 'rgba(29, 94, 184, 0.8)';
          return 'rgba(47, 120, 230, 0.72)';
        });

        flowMonitorCharts.platform = new window.Chart(canvas.getContext('2d'), {
          type: 'bar',
          data: {
            labels: snapshot.rows.map((item) => item.platformName),
            datasets: [
              {
                label: '总流量',
                data: snapshot.rows.map((item) => item.totalFlow),
                backgroundColor: barColors,
                borderRadius: 8,
                maxBarThickness: 36
              }
            ]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: {
                display: false
              },
              tooltip: {
                callbacks: {
                  label: (context) => `总流量：${formatFlowSize(context.parsed.y)}`
                }
              }
            },
            scales: {
              x: {
                grid: {
                  display: false
                },
                ticks: {
                  color: '#56709b'
                }
              },
              y: {
                beginAtZero: true,
                ticks: {
                  color: '#56709b',
                  callback: (value) => formatFlowAxis(Number(value))
                },
                grid: {
                  color: 'rgba(50, 102, 184, 0.12)'
                }
              }
            }
          }
        });
      }

      function renderFlowMonitor() {
        const platformSelect = $('#flowPlatformFilter');
        const rangeSelect = $('#flowRangeFilter');
        const granularitySelect = $('#flowGranularityFilter');
        if (!platformSelect || !rangeSelect || !granularitySelect) return;

        const options = [`<option value="">全部平台</option>`].concat(
          dataStore.platforms.map((item) => `<option value="${item.id}">${item.name}</option>`)
        );
        platformSelect.innerHTML = options.join('');
        platformSelect.value = state.flowMonitorFilters.platformId;
        rangeSelect.value = state.flowMonitorFilters.range;
        granularitySelect.value = state.flowMonitorFilters.granularity;

        const snapshot = buildFlowMonitorSnapshot();
        const upRatio = snapshot.totalFlow ? (snapshot.totalUpFlow / snapshot.totalFlow) * 100 : 0;
        const downRatio = snapshot.totalFlow ? (snapshot.totalDownFlow / snapshot.totalFlow) * 100 : 0;
        const spikeCount = snapshot.rows.filter((item) => item.anomalyStatus === 'spike').length;
        const dropCount = snapshot.rows.filter((item) => item.anomalyStatus === 'drop').length;

        $('#flowUpValue').textContent = formatFlowSize(snapshot.totalUpFlow);
        $('#flowDownValue').textContent = formatFlowSize(snapshot.totalDownFlow);
        $('#flowTotalValue').textContent = formatFlowSize(snapshot.totalFlow);
        $('#flowAnomalyValue').textContent = String(snapshot.anomalyCount);

        $('#flowUpSub').textContent = `上行占比 ${upRatio.toFixed(1)}%`;
        $('#flowDownSub').textContent = `下行占比 ${downRatio.toFixed(1)}%`;
        $('#flowTotalSub').textContent = `覆盖 ${snapshot.labels.length} 个统计点`;
        $('#flowAnomalySub').textContent = `突增平台 ${spikeCount} 个 / 突降平台 ${dropCount} 个`;

        $('#flowAnomalyTip').textContent = snapshot.abnormalRows.length
          ? `异常平台：${snapshot.abnormalRows.map((item) => item.platformName).join('、')}`
          : '异常平台：无';

        $('#flowTableBody').innerHTML = snapshot.rows.map((item) => {
          const changeText = `${item.latestChange >= 0 ? '+' : ''}${item.latestChange.toFixed(1)}%`;
          const badgeTextMap = {
            spike: '流量突增',
            drop: '流量突降',
            normal: '正常'
          };
          return `
            <tr>
              <td><strong>${item.platformName}</strong></td>
              <td>${formatFlowSize(item.upFlow)}</td>
              <td>${formatFlowSize(item.downFlow)}</td>
              <td>${formatFlowSize(item.totalFlow)}</td>
              <td>${formatFlowSize(item.averageFlow)}</td>
              <td>${formatFlowSize(item.peakFlow)}</td>
              <td>${changeText}</td>
              <td><span class="flow-anomaly-badge ${item.anomalyStatus}">${badgeTextMap[item.anomalyStatus]}</span></td>
            </tr>
          `;
        }).join('') || '<tr><td colspan="8" class="muted">暂无流量统计数据。</td></tr>';

        renderFlowTrendChart(snapshot);
        renderFlowPlatformChart(snapshot);
      }

      function getResponsePlatformLogs(platformId = '') {
        const callLogs = getCallLogs();
        if (!platformId) return callLogs;
        return callLogs.filter((log) => platformIdByName(log.platform) === platformId);
      }

      function buildResponseSeriesFromPlatform(platform, pointCount, granularity, range) {
        const logs = getResponsePlatformLogs(platform.id);
        const latencies = logs.map((log) => Number(log.latencyMs || 0)).filter((value) => value > 0);
        const seed = flowSeed(platform.id + range + granularity);
        const baseAvg = latencies.length
          ? Math.round(latencies.reduce((sum, value) => sum + value, 0) / latencies.length)
          : 280 + seed % 220;
        const baseMin = latencies.length ? Math.min(...latencies) : Math.max(40, Math.round(baseAvg * 0.48));
        const baseMax = latencies.length ? Math.max(...latencies) : Math.round(baseAvg * 1.65);
        const granularityFactor = granularity === '1d' ? 1.22 : (granularity === '1h' ? 1.08 : 1);
        const avgSeries = [];
        const minSeries = [];
        const maxSeries = [];
        const callsSeries = [];
        const baseCalls = Math.max(8, (logs.length || 4) * (granularity === '1d' ? 4 : (granularity === '1h' ? 2 : 1)));

        for (let index = 0; index < pointCount; index += 1) {
          const trend = 1 + 0.15 * Math.sin((index + seed % 7) / 2.9) + 0.08 * Math.cos((index + seed % 11) / 3.4);
          const avgValue = Math.max(35, Math.round(baseAvg * granularityFactor * trend));
          const minValue = Math.max(10, Math.min(Math.round(baseMin * trend * 0.95), Math.round(avgValue * 0.82)));
          const maxValue = Math.max(avgValue + 24, Math.round(baseMax * granularityFactor * (trend + 0.04)));
          avgSeries.push(avgValue);
          minSeries.push(minValue);
          maxSeries.push(maxValue);
          callsSeries.push(Math.max(2, Math.round(baseCalls * (1 + 0.14 * Math.sin((index + seed % 5) / 2.2)))));
        }

        if (pointCount > 10 && platform.id === 'P004') {
          const spikeIndex = Math.max(4, Math.floor(pointCount * 0.7));
          maxSeries[spikeIndex] = Math.max(maxSeries[spikeIndex], 1680);
          avgSeries[spikeIndex] = Math.round(avgSeries[spikeIndex] * 1.33);
          callsSeries[spikeIndex] = Math.round(callsSeries[spikeIndex] * 1.16);
        }

        if (pointCount > 10 && platform.id === 'P003') {
          const dropIndex = Math.max(5, Math.floor(pointCount * 0.68));
          minSeries[dropIndex] = Math.max(18, Math.round(minSeries[dropIndex] * 0.58));
          avgSeries[dropIndex] = Math.max(45, Math.round(avgSeries[dropIndex] * 0.75));
        }

        return { avgSeries, minSeries, maxSeries, callsSeries };
      }

      function getResponseBinLabel(latency) {
        if (latency <= 100) return '0~100ms';
        if (latency <= 300) return '100~300ms';
        if (latency <= 500) return '300~500ms';
        if (latency <= 1000) return '500~1000ms';
        return '>1000ms';
      }

      function buildResponseMonitorSnapshot() {
        const platformId = state.responseMonitorFilters.platformId;
        const range = state.responseMonitorFilters.range;
        const granularity = state.responseMonitorFilters.granularity;
        const labels = buildFlowTimeline(range, granularity);
        const selectedPlatforms = platformId
          ? dataStore.platforms.filter((item) => item.id === platformId)
          : dataStore.platforms.slice();

        const avgSeries = new Array(labels.length).fill(0);
        const minSeries = new Array(labels.length).fill(Number.POSITIVE_INFINITY);
        const maxSeries = new Array(labels.length).fill(0);
        const callsSeries = new Array(labels.length).fill(0);

        const platformSeriesList = selectedPlatforms.map((platform) => buildResponseSeriesFromPlatform(platform, labels.length, granularity, range));
        platformSeriesList.forEach((series) => {
          for (let index = 0; index < labels.length; index += 1) {
            const calls = series.callsSeries[index];
            const weightedAvgSum = avgSeries[index] * callsSeries[index] + series.avgSeries[index] * calls;
            callsSeries[index] += calls;
            avgSeries[index] = weightedAvgSum / Math.max(callsSeries[index], 1);
            minSeries[index] = Math.min(minSeries[index], series.minSeries[index]);
            maxSeries[index] = Math.max(maxSeries[index], series.maxSeries[index]);
          }
        });

        for (let index = 0; index < labels.length; index += 1) {
          if (!Number.isFinite(minSeries[index])) minSeries[index] = 0;
          avgSeries[index] = Math.round(avgSeries[index]);
        }

        const distributionKeys = ['0~100ms', '100~300ms', '300~500ms', '500~1000ms', '>1000ms'];
        const distributionMap = new Map(distributionKeys.map((key) => [key, 0]));
        for (let index = 0; index < labels.length; index += 1) {
          const calls = callsSeries[index];
          const minCount = Math.max(1, Math.floor(calls * 0.22));
          const avgCount = Math.max(1, Math.floor(calls * 0.6));
          const maxCount = Math.max(0, calls - minCount - avgCount);
          distributionMap.set(getResponseBinLabel(minSeries[index]), distributionMap.get(getResponseBinLabel(minSeries[index])) + minCount);
          distributionMap.set(getResponseBinLabel(avgSeries[index]), distributionMap.get(getResponseBinLabel(avgSeries[index])) + avgCount);
          distributionMap.set(getResponseBinLabel(maxSeries[index]), distributionMap.get(getResponseBinLabel(maxSeries[index])) + maxCount);
        }

        const distributionRows = distributionKeys.map((key) => {
          const count = distributionMap.get(key) || 0;
          return {
            range: key,
            count
          };
        });
        const totalCalls = callsSeries.reduce((sum, value) => sum + value, 0);
        distributionRows.forEach((item) => {
          item.percent = totalCalls ? (item.count / totalCalls) * 100 : 0;
        });

        const weightedTotal = avgSeries.reduce((sum, value, index) => sum + value * callsSeries[index], 0);
        const averageRt = totalCalls ? weightedTotal / totalCalls : 0;
        const minimumRt = minSeries.length ? Math.min(...minSeries) : 0;
        const maximumRt = maxSeries.length ? Math.max(...maxSeries) : 0;

        return {
          labels,
          avgSeries,
          minSeries,
          maxSeries,
          callsSeries,
          distributionRows,
          averageRt,
          minimumRt,
          maximumRt,
          totalCalls
        };
      }

      function destroyResponseChart(chartKey) {
        if (responseMonitorCharts[chartKey] && typeof responseMonitorCharts[chartKey].destroy === 'function') {
          responseMonitorCharts[chartKey].destroy();
        }
        responseMonitorCharts[chartKey] = null;
      }

      function renderResponseTrendChart(snapshot) {
        const canvas = $('#rtTrendCanvas');
        if (!canvas || !window.Chart) return;
        const panel = $('#monitor-response');
        if (panel && !panel.classList.contains('active')) return;

        destroyResponseChart('trend');
        responseMonitorCharts.trend = new window.Chart(canvas.getContext('2d'), {
          type: 'line',
          data: {
            labels: snapshot.labels,
            datasets: [
              {
                label: '平均RT',
                data: snapshot.avgSeries,
                borderColor: '#1d63d1',
                backgroundColor: 'rgba(29, 99, 209, 0.14)',
                tension: 0.32,
                borderWidth: 2.4,
                pointRadius: 2
              },
              {
                label: '最小RT',
                data: snapshot.minSeries,
                borderColor: '#67a7ff',
                backgroundColor: 'rgba(103, 167, 255, 0.14)',
                tension: 0.3,
                borderWidth: 2,
                pointRadius: 2
              },
              {
                label: '最大RT',
                data: snapshot.maxSeries,
                borderColor: '#0f3f93',
                backgroundColor: 'rgba(15, 63, 147, 0.14)',
                tension: 0.3,
                borderWidth: 2.2,
                pointRadius: 2
              }
            ]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            interaction: { mode: 'index', intersect: false },
            plugins: {
              legend: {
                position: 'top',
                labels: { color: '#375079', boxWidth: 12 }
              },
              tooltip: {
                callbacks: {
                  label: (context) => `${context.dataset.label}：${formatMs(context.parsed.y)}`
                }
              }
            },
            scales: {
              x: {
                grid: { display: false },
                ticks: { color: '#56709b', maxRotation: 0, autoSkip: true, maxTicksLimit: 8 }
              },
              y: {
                beginAtZero: true,
                ticks: { color: '#56709b', callback: (value) => formatMs(Number(value)) },
                grid: { color: 'rgba(50, 102, 184, 0.12)' }
              }
            }
          }
        });
      }

      function renderResponseDistributionChart(snapshot) {
        const canvas = $('#rtDistCanvas');
        if (!canvas || !window.Chart) return;
        const panel = $('#monitor-response');
        if (panel && !panel.classList.contains('active')) return;

        destroyResponseChart('distribution');
        responseMonitorCharts.distribution = new window.Chart(canvas.getContext('2d'), {
          type: 'bar',
          data: {
            labels: snapshot.distributionRows.map((item) => item.range),
            datasets: [
              {
                label: '调用次数',
                data: snapshot.distributionRows.map((item) => item.count),
                backgroundColor: [
                  'rgba(98, 162, 255, 0.72)',
                  'rgba(66, 139, 242, 0.78)',
                  'rgba(43, 113, 226, 0.82)',
                  'rgba(29, 86, 190, 0.86)',
                  'rgba(14, 58, 144, 0.9)'
                ],
                borderRadius: 8
              }
            ]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: { display: false },
              tooltip: {
                callbacks: {
                  label: (context) => `调用次数：${context.parsed.y}`
                }
              }
            },
            scales: {
              x: {
                grid: { display: false },
                ticks: { color: '#56709b' }
              },
              y: {
                beginAtZero: true,
                ticks: { color: '#56709b' },
                grid: { color: 'rgba(50, 102, 184, 0.12)' }
              }
            }
          }
        });
      }

      function renderResponseMonitor() {
        const platformSelect = $('#rtPlatformFilter');
        const rangeSelect = $('#rtRangeFilter');
        const granularitySelect = $('#rtGranularityFilter');
        if (!platformSelect || !rangeSelect || !granularitySelect) return;

        const options = [`<option value="">全部平台</option>`].concat(
          dataStore.platforms.map((item) => `<option value="${item.id}">${item.name}</option>`)
        );
        platformSelect.innerHTML = options.join('');
        platformSelect.value = state.responseMonitorFilters.platformId;
        rangeSelect.value = state.responseMonitorFilters.range;
        granularitySelect.value = state.responseMonitorFilters.granularity;

        const snapshot = buildResponseMonitorSnapshot();
        $('#rtAvgValue').textContent = formatMs(snapshot.averageRt);
        $('#rtMinValue').textContent = formatMs(snapshot.minimumRt);
        $('#rtMaxValue').textContent = formatMs(snapshot.maximumRt);
        $('#rtTotalCallValue').textContent = String(snapshot.totalCalls);

        $('#rtAvgSub').textContent = `当前统计点 ${snapshot.labels.length} 个`;
        $('#rtMinSub').textContent = `低于100ms占比 ${snapshot.totalCalls ? ((snapshot.distributionRows[0].count / snapshot.totalCalls) * 100).toFixed(1) : '0.0'}%`;
        $('#rtMaxSub').textContent = `超过1000ms占比 ${snapshot.totalCalls ? ((snapshot.distributionRows[4].count / snapshot.totalCalls) * 100).toFixed(1) : '0.0'}%`;
        $('#rtTotalCallSub').textContent = `按${granularitySelect.options[granularitySelect.selectedIndex].text}聚合`;

        $('#rtDistTableBody').innerHTML = snapshot.distributionRows.map((item) => `
          <tr>
            <td>${item.range}</td>
            <td>${item.count}</td>
            <td>${item.percent.toFixed(1)}%</td>
          </tr>
        `).join('');

        renderResponseTrendChart(snapshot);
        renderResponseDistributionChart(snapshot);
      }

      function renderMonitorMetrics() {
        renderSyncMonitor();
        renderApiMonitor();
        renderProtocolMonitor();
        renderResponseMonitor();
        renderFlowMonitor();
      }

      function renderBars(target, items) {
        $(target).innerHTML = items.map(([label, value]) => `
          <div class="bar-row">
            <span>${label}</span>
            <div class="bar-track"><div class="bar-fill" style="width:${value}%"></div></div>
            <strong>${value}</strong>
          </div>
        `).join('');
      }

      function openAlertDetailDrawer(alertId = state.alertId) {
        const alert = dataStore.alerts.find((item) => item.id === alertId);
        if (!alert) return;
        openDrawer(
          '告警详情',
          `
            <div class="panel-header">
              <div>
                <h3>${alert.title}</h3>
                <p class="section-copy">${alert.type} · ${platformName(alert.platformId)} · ${alert.time}</p>
              </div>
              <span class="status-pill ${statusClass(alert.status)}">${alert.status}</span>
            </div>
            <div class="line-list">
              <div class="line-item"><span class="line-key">告警编号</span><span>${alert.id}</span></div>
              <div class="line-item"><span class="line-key">告警级别</span><span>${alert.level}</span></div>
              <div class="line-item"><span class="line-key">告警类型</span><span>${alert.type}</span></div>
              <div class="line-item"><span class="line-key">告警开始时间</span><span>${alert.time}</span></div>
              <div class="line-item"><span class="line-key">告警结束时间</span><span>${alert.closedAt || '-'}</span></div>
              <div class="line-item"><span class="line-key">告警处理人</span><span>${alert.owner || '-'}</span></div>
              <div class="line-item"><span class="line-key">通知策略</span><span>${alert.strategy || '-'}</span></div>
              <div class="line-item"><span class="line-key">短信号码</span><span>${alert.phones.length ? alert.phones.join(' / ') : '-'}</span></div>
              <div class="line-item"><span class="line-key">联系人</span><span>${alert.contacts.length ? alert.contacts.join(' / ') : '-'}</span></div>
              <div class="line-item"><span class="line-key">通知时间</span><span>${alert.notifiedAt || '-'}</span></div>
              <div class="line-item"><span class="line-key">处理时间</span><span>${alert.handledAt || '-'}</span></div>
            </div>
            <div class="mini-panel">
              <h4>触发原因</h4>
              <div class="muted">${alert.cause || '-'}</div>
            </div>
            <div class="mini-panel">
              <h4>处理建议</h4>
              <div class="muted">${alert.suggestion || '-'}</div>
            </div>
          `,
          'Alert'
        );
      }

      function parseAlertDateTime(value) {
        const text = String(value || '').trim();
        const normalized = text.replace(' ', 'T');
        const date = new Date(normalized);
        if (Number.isNaN(date.getTime())) return null;
        return date;
      }

      function formatDayKey(date) {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
      }

      function formatDayLabelFromKey(dayKey) {
        const parts = String(dayKey || '').split('-');
        if (parts.length !== 3) return dayKey;
        return `${parts[1]}-${parts[2]}`;
      }

      function resolveAlertRootCause(alert) {
        const text = [alert && alert.type || '', alert && alert.title || '', alert && alert.cause || ''].join(' ');
        if (/timeout|超时/i.test(text)) return '接口超时与上游响应慢';
        if (/认证|签名|token|鉴权/i.test(text)) return '认证签名配置异常';
        if (/同步|任务|数据/i.test(text)) return '同步任务波动或数据异常';
        if (/非法|安全|越权|ip|白名单/i.test(text)) return '安全策略或来源异常';
        if (/转换|字段|解析|报文/i.test(text)) return '协议转换与报文质量问题';
        return '其他配置或链路异常';
      }

      function destroyAlertAnalyticsChart(chartKey) {
        if (alertAnalyticsCharts[chartKey] && typeof alertAnalyticsCharts[chartKey].destroy === 'function') {
          alertAnalyticsCharts[chartKey].destroy();
        }
        alertAnalyticsCharts[chartKey] = null;
      }

      function buildAlertAnalyticsSnapshot(alerts = []) {
        const safeAlerts = Array.isArray(alerts) ? alerts.slice() : [];
        const now = new Date('2026-03-24T23:59:59+08:00');
        const dayKeys = [];
        for (let index = 6; index >= 0; index -= 1) {
          const date = new Date(now.getTime() - index * 24 * 60 * 60 * 1000);
          dayKeys.push(formatDayKey(date));
        }

        const byDay = new Map(dayKeys.map((key) => [key, 0]));
        const byType = new Map();
        const byPlatform = new Map();
        const byHour = new Map();
        const byCause = new Map();
        const durationValues = {
          notify: [],
          handle: [],
          close: []
        };

        safeAlerts.forEach((alert) => {
          const date = parseAlertDateTime(alert.time);
          if (date) {
            const dayKey = formatDayKey(date);
            if (byDay.has(dayKey)) byDay.set(dayKey, byDay.get(dayKey) + 1);
            const hourKey = String(date.getHours()).padStart(2, '0') + ':00';
            byHour.set(hourKey, (byHour.get(hourKey) || 0) + 1);
          }

          byType.set(alert.type, (byType.get(alert.type) || 0) + 1);
          const platformLabel = platformName(alert.platformId || '');
          byPlatform.set(platformLabel, (byPlatform.get(platformLabel) || 0) + 1);

          const rootCause = resolveAlertRootCause(alert);
          byCause.set(rootCause, (byCause.get(rootCause) || 0) + 1);

          if (Number(alert.notifyMinutes) > 0) durationValues.notify.push(Number(alert.notifyMinutes));
          if (Number(alert.handleMinutes) > 0) durationValues.handle.push(Number(alert.handleMinutes));
          if (Number(alert.closeMinutes) > 0) durationValues.close.push(Number(alert.closeMinutes));
        });

        const average = (values) => values.length ? Math.round(values.reduce((sum, value) => sum + value, 0) / values.length) : 0;
        const averageNotify = average(durationValues.notify);
        const averageHandle = average(durationValues.handle);
        const averageClose = average(durationValues.close);

        const dayLabels = dayKeys.map((key) => formatDayLabelFromKey(key));
        const dayCounts = dayKeys.map((key) => byDay.get(key) || 0);
        const typeRows = Array.from(byType.entries()).map(([label, count]) => ({ label, count })).sort((a, b) => b.count - a.count);
        const platformRows = Array.from(byPlatform.entries()).map(([label, count]) => ({ label, count })).sort((a, b) => b.count - a.count);
        const hourRows = Array.from(byHour.entries()).map(([label, count]) => ({ label, count })).sort((a, b) => b.count - a.count);
        const causeRows = Array.from(byCause.entries()).map(([label, count]) => ({ label, count })).sort((a, b) => b.count - a.count);

        const hottestPlatform = platformRows[0] || { label: '无', count: 0 };
        const hottestHour = hourRows[0] || { label: '无', count: 0 };
        const topCause = causeRows[0] || { label: '暂无根因', count: 0 };

        return {
          totalAlerts: safeAlerts.length,
          dayLabels,
          dayCounts,
          typeRows,
          platformRows,
          hourRows,
          causeRows,
          averageNotify,
          averageHandle,
          averageClose,
          hottestPlatform,
          hottestHour,
          topCause
        };
      }

      function renderAlertAnalyticsCharts(snapshot) {
        const trendCanvas = $('#alertFrequencyTrendCanvas');
        if (trendCanvas && window.Chart) {
          destroyAlertAnalyticsChart('trend');
          alertAnalyticsCharts.trend = new window.Chart(trendCanvas.getContext('2d'), {
            type: 'line',
            data: {
              labels: snapshot.dayLabels,
              datasets: [{
                label: '告警次数',
                data: snapshot.dayCounts,
                borderColor: '#2f78e6',
                backgroundColor: 'rgba(47, 120, 230, 0.18)',
                fill: true,
                borderWidth: 2.4,
                tension: 0.3,
                pointRadius: 2
              }]
            },
            options: {
              responsive: true,
              maintainAspectRatio: false,
              plugins: {
                legend: { display: false },
                tooltip: {
                  callbacks: {
                    label: (context) => `告警次数：${context.parsed.y}`
                  }
                }
              },
              scales: {
                x: { grid: { display: false }, ticks: { color: '#56709b' } },
                y: { beginAtZero: true, ticks: { color: '#56709b' }, grid: { color: 'rgba(50, 102, 184, 0.12)' } }
              }
            }
          });
        }

        const typeCanvas = $('#alertTypeDistCanvas');
        if (typeCanvas && window.Chart) {
          destroyAlertAnalyticsChart('type');
          const typeRows = snapshot.typeRows.length ? snapshot.typeRows : [{ label: '暂无', count: 0 }];
          alertAnalyticsCharts.type = new window.Chart(typeCanvas.getContext('2d'), {
            type: 'doughnut',
            data: {
              labels: typeRows.map((item) => item.label),
              datasets: [{
                data: typeRows.map((item) => item.count),
                backgroundColor: ['#1d5eb8', '#69a1ff', '#214f88', '#b26a00', '#2a6fd6', '#7a8eb3']
              }]
            },
            options: {
              responsive: true,
              maintainAspectRatio: false,
              plugins: {
                legend: { position: 'bottom', labels: { color: '#56709b', boxWidth: 12 } }
              }
            }
          });
        }

        const durationCanvas = $('#alertDurationCanvas');
        if (durationCanvas && window.Chart) {
          destroyAlertAnalyticsChart('duration');
          alertAnalyticsCharts.duration = new window.Chart(durationCanvas.getContext('2d'), {
            type: 'bar',
            data: {
              labels: ['通知时长', '处理时长', '关闭时长'],
              datasets: [{
                label: '平均耗时（分钟）',
                data: [snapshot.averageNotify, snapshot.averageHandle, snapshot.averageClose],
                backgroundColor: ['rgba(47, 120, 230, 0.72)', 'rgba(105, 161, 255, 0.78)', 'rgba(29, 79, 170, 0.82)'],
                borderRadius: 8
              }]
            },
            options: {
              responsive: true,
              maintainAspectRatio: false,
              plugins: { legend: { display: false } },
              scales: {
                x: { grid: { display: false }, ticks: { color: '#56709b' } },
                y: { beginAtZero: true, ticks: { color: '#56709b' }, grid: { color: 'rgba(50, 102, 184, 0.12)' } }
              }
            }
          });
        }

        const hotspotCanvas = $('#alertHotspotCanvas');
        if (hotspotCanvas && window.Chart) {
          destroyAlertAnalyticsChart('hotspot');
          const platformRows = snapshot.platformRows.slice(0, 5);
          alertAnalyticsCharts.hotspot = new window.Chart(hotspotCanvas.getContext('2d'), {
            type: 'bar',
            data: {
              labels: platformRows.map((item) => item.label),
              datasets: [{
                label: '告警次数',
                data: platformRows.map((item) => item.count),
                backgroundColor: 'rgba(29, 94, 184, 0.72)',
                borderRadius: 8
              }]
            },
            options: {
              responsive: true,
              maintainAspectRatio: false,
              indexAxis: 'y',
              plugins: { legend: { display: false } },
              scales: {
                x: { beginAtZero: true, ticks: { color: '#56709b' }, grid: { color: 'rgba(50, 102, 184, 0.12)' } },
                y: { ticks: { color: '#56709b' }, grid: { display: false } }
              }
            }
          });
        }
      }

      function buildAlertAnalysisReport(snapshot) {
        const lines = [
          '【外部平台告警分析报告】',
          '统计日期：2026-03-24',
          '',
          `1) 告警总数：${snapshot.totalAlerts}`,
          `2) 高发平台：${snapshot.hottestPlatform.label}（${snapshot.hottestPlatform.count} 次）`,
          `3) 高发时段：${snapshot.hottestHour.label}（${snapshot.hottestHour.count} 次）`,
          `4) 主要根因：${snapshot.topCause.label}（${snapshot.topCause.count} 次）`,
          `5) 平均时长：通知 ${snapshot.averageNotify} 分钟 / 处理 ${snapshot.averageHandle} 分钟 / 关闭 ${snapshot.averageClose} 分钟`,
          '',
          '【类型分布】'
        ];
        snapshot.typeRows.forEach((item) => {
          lines.push(`- ${item.label}：${item.count} 次`);
        });
        lines.push('', '【根因分析】');
        snapshot.causeRows.forEach((item) => {
          lines.push(`- ${item.label}：${item.count} 次`);
        });
        lines.push('', '【建议动作】');
        lines.push('- 对高发平台建立专项巡检与限流策略。');
        lines.push('- 针对高发时段调整告警抑制窗口与值班排班。');
        lines.push('- 对Top根因建立专项治理任务，跟踪闭环。');
        return lines.join('\n');
      }

      function renderAlertAnalytics(alerts = []) {
        if (!$('#alertAnalyticsMetrics')) return;
        const snapshot = buildAlertAnalyticsSnapshot(alerts);

        $('#alertAnalyticsMetrics').innerHTML = [
          { label: '告警总数', value: String(snapshot.totalAlerts), trend: '当前统计周期内告警总量' },
          { label: '高发平台', value: snapshot.hottestPlatform.label, trend: `${snapshot.hottestPlatform.count} 次` },
          { label: '高发时段', value: snapshot.hottestHour.label, trend: `${snapshot.hottestHour.count} 次` },
          { label: '平均关闭时长', value: snapshot.averageClose + ' 分钟', trend: `通知 ${snapshot.averageNotify} / 处理 ${snapshot.averageHandle}` }
        ].map((item) => `
          <div class="alert-analytics-card flow-blue-card">
            <div class="alert-analytics-label">${item.label}</div>
            <div class="alert-analytics-value">${item.value}</div>
            <div class="alert-analytics-sub">${item.trend}</div>
          </div>
        `).join('');

        $('#alertHotspotList').innerHTML = [
          `高发平台：${snapshot.hottestPlatform.label}（${snapshot.hottestPlatform.count} 次）`,
          `高发时段：${snapshot.hottestHour.label}（${snapshot.hottestHour.count} 次）`,
          `重点根因：${snapshot.topCause.label}（${snapshot.topCause.count} 次）`
        ].map((text) => `<div class="alert-analytics-item">${text}</div>`).join('');

        $('#alertRootCauseList').innerHTML = snapshot.causeRows.slice(0, 6).map((item) => `
          <div class="alert-analytics-item">${item.label}：${item.count} 次</div>
        `).join('') || '<div class="alert-analytics-item">暂无根因分析数据</div>';

        renderAlertAnalyticsCharts(snapshot);

        state.alertAnalyticsReport = buildAlertAnalysisReport(snapshot);
      }

      function renderAlerts() {
        const alerts = dataStore.alerts.slice();
        const statusOrder = ['已通知', '已处理', '已关闭'];
        const averageMinutes = (field) => {
          const values = alerts.map((item) => Number(item[field] || 0)).filter((value) => value > 0);
          if (!values.length) return 0;
          return Math.round(values.reduce((sum, value) => sum + value, 0) / values.length);
        };

        $('#alertEventSummary').innerHTML = [
          { label: '告警总数', value: String(alerts.length), trend: '覆盖接口、同步、认证与安全告警' },
          { label: '待闭环告警', value: String(alerts.filter((item) => item.status !== '已关闭').length), trend: '已通知与已处理状态继续跟进' },
          { label: '已关闭告警', value: String(alerts.filter((item) => item.status === '已关闭').length), trend: '闭环率持续跟踪' },
          { label: '平均关闭时长', value: averageMinutes('closeMinutes') + ' 分钟', trend: '按通知 -> 处理 -> 关闭链路统计' }
        ].map((item) => `
          <div class="metric-card">
            <div class="metric-label">${item.label}</div>
            <div class="metric-value">${item.value}</div>
          <div class="metric-trend">${item.trend}</div>
          </div>
        `).join('');

        $('#alertEventTableBody').innerHTML = alerts.map((item) => `
          <tr class="${item.id === state.alertId ? 'selected' : ''}" data-alert-id="${item.id}">
            <td>${item.type}</td>
            <td><strong>${item.title}</strong></td>
            <td>${item.time}</td>
            <td><span class="status-pill ${statusClass(item.status)}">${item.status}</span></td>
            <td>${item.closedAt || '-'}</td>
            <td>${item.owner || '-'}</td>
            <td><button type="button" class="button ghost" data-alert-action="detail" data-alert-id="${item.id}">详情</button></td>
          </tr>
        `).join('') || '<tr><td colspan="7" class="muted">暂无告警记录。</td></tr>';

        const rules = getAlertRules();
        syncCurrentAlertRuleSelection();
        const currentRule = getCurrentAlertRule();
        $('#alertRuleListView').style.display = state.alertRuleView === 'list' ? 'block' : 'none';
        $('#alertRuleDetailView').style.display = state.alertRuleView === 'detail' ? 'grid' : 'none';
        $('#alertRuleTableBody').innerHTML = rules.map((rule) => `
          <tr class="${rule.id === state.currentAlertRuleId ? 'selected' : ''}">
            <td><strong>${rule.type}</strong></td>
            <td>${rule.name || '-'}</td>
            <td>${getAlertRuleTriggerText(rule)}</td>
            <td>${rule.strategy}</td>
            <td>${rule.phones}</td>
            <td>${rule.contacts}</td>
            <td><span class="status-pill ${rule.enabled ? 'ok' : 'info'}">${rule.enabled ? '开启' : '关闭'}</span></td>
            <td><button type="button" class="button ghost" data-alert-rule-action="edit" data-alert-rule-id="${rule.id}">编辑</button></td>
          </tr>
        `).join('') || '<tr><td colspan="8" class="muted">暂无告警规则配置。</td></tr>';

        if (!currentRule) {
          $('#alertRuleEditorBadge').textContent = '当前规则：-';
          $('#alertRuleMeta').innerHTML = '<div class="line-item"><span class="line-key">状态</span><span>暂无规则可编辑</span></div>';
          $('#alertRuleType').value = '超时告警';
          $('#alertRuleName').value = '';
          $('#alertRuleTriggerCount').value = '';
          $('#alertRuleDuration').value = '';
          $('#alertRuleStrategy').value = '短信通知';
          $('#alertRulePhones').value = '';
          $('#alertRuleContacts').value = '';
          $('#alertRuleDescription').value = '';
          setAlertRuleEnabledToggle(false, true);
        } else {
          $('#alertRuleEditorBadge').textContent = '当前规则：' + (currentRule.name || currentRule.id);
          $('#alertRuleMeta').innerHTML = `
            <div class="line-item"><span class="line-key">告警类型</span><span>${currentRule.type}</span></div>
            <div class="line-item"><span class="line-key">规则名称</span><span>${currentRule.name || '-'}</span></div>
            <div class="line-item"><span class="line-key">处理策略</span><span>${currentRule.strategy}</span></div>
            <div class="line-item"><span class="line-key">处理人</span><span>${currentRule.contacts}</span></div>
            <div class="line-item"><span class="line-key">状态</span><span>${currentRule.enabled ? '开启' : '关闭'}</span></div>
          `;
          $('#alertRuleType').value = currentRule.type;
          $('#alertRuleName').value = currentRule.name || '';
          $('#alertRuleTriggerCount').value = String(currentRule.triggerCount || '');
          $('#alertRuleDuration').value = String(currentRule.durationSeconds || '');
          $('#alertRuleStrategy').value = currentRule.strategy;
          $('#alertRulePhones').value = currentRule.phones;
          $('#alertRuleContacts').value = currentRule.contacts;
          $('#alertRuleDescription').value = currentRule.description || '';
          setAlertRuleEnabledToggle(currentRule.enabled);
        }

        renderAlertAnalytics(alerts);
      }

      function platformName(id) {
        const item = dataStore.platforms.find((platform) => platform.id === id);
        return item ? item.name : id;
      }

      function platformIdByName(name) {
        const item = dataStore.platforms.find((platform) => platform.name === name);
        return item ? item.id : '';
      }

      function getPlatformDetailSection(platform = getCurrentPlatform()) {
        return platform.modes.length === 1 && platform.modes.includes('标准开放') ? 'standard' : 'active-config';
      }

      function getFilteredLogs() {
        return dataStore.logs.filter((log) => {
          const byResult = state.logFilter === 'all' || log.result === '失败';
          const byPlatform = !state.logPlatformId || platformIdByName(log.platform) === state.logPlatformId;
          const byType = state.logType === 'all' || log.type === state.logType;
          const byApiCode = !state.logApiCode || log.apiCode === state.logApiCode;
          return byResult && byPlatform && byType && byApiCode;
        });
      }

      function openLogDetailDrawer(logId = state.activeLogId) {
        const log = dataStore.logs.find((item) => item.id === logId);
        if (!log) return;
        const protocolMs = log.stageDurations ? formatMs(log.stageDurations.protocolTransform) : '-';
        const responseMs = log.stageDurations ? formatMs(log.stageDurations.interfaceResponse) : '-';
        const responseTransformMs = log.stageDurations ? formatMs(log.stageDurations.responseTransform) : '-';
        openDrawer(
          '日志详情',
          `
            <div class="line-list">
              <div class="line-item"><span class="line-key">日志编号</span><span>${log.id}</span></div>
              <div class="line-item"><span class="line-key">平台</span><span>${log.platform}</span></div>
              <div class="line-item"><span class="line-key">API 编码</span><span>${log.apiCode}</span></div>
              <div class="line-item"><span class="line-key">日志类型</span><span>${log.type}</span></div>
              <div class="line-item"><span class="line-key">协议转换类型</span><span>${log.transformType || '-'}</span></div>
              <div class="line-item"><span class="line-key">接口 / 操作</span><span>${log.action}</span></div>
              <div class="line-item"><span class="line-key">结果</span><span>${log.result}</span></div>
              <div class="line-item"><span class="line-key">耗时</span><span>${log.duration}</span></div>
              <div class="line-item"><span class="line-key">协议转换耗时</span><span>${protocolMs}</span></div>
              <div class="line-item"><span class="line-key">接口响应耗时</span><span>${responseMs}</span></div>
              <div class="line-item"><span class="line-key">返回转换耗时</span><span>${responseTransformMs}</span></div>
            </div>
            <pre class="detail-code">${JSON.stringify(log.payload, null, 2)}</pre>
          `,
          'Log'
        );
      }

      function renderLogs() {
        const logs = getFilteredLogs();
        const scopeParts = [];
        if (state.logPlatformId) scopeParts.push(platformName(state.logPlatformId));
        if (state.logType !== 'all') scopeParts.push(state.logType);
        if (state.logApiCode) scopeParts.push(state.logApiCode);
        scopeParts.push(state.logFilter === 'fail' ? '失败日志' : '全部结果');
        $('#logScopeChip').textContent = '当前视图：' + scopeParts.join(' / ');
        const active = logs.find((item) => item.id === state.activeLogId) || logs[0] || null;
        state.activeLogId = active ? active.id : '';
        $('#logTableBody').innerHTML = logs.map((item) => `
          <tr class="${item.id === state.activeLogId ? 'selected' : ''}" data-log-id="${item.id}">
            <td>${item.time}</td>
            <td>${item.platform}</td>
            <td>${item.apiCode}</td>
            <td>${item.type}</td>
            <td>${item.action}</td>
            <td><span class="status-pill ${statusClass(item.result)}">${item.result}</span></td>
            <td>${item.stageDurations ? formatMs(item.stageDurations.protocolTransform) : '-'}</td>
            <td>${item.stageDurations ? formatMs(item.stageDurations.interfaceResponse) : '-'}</td>
            <td>${item.duration}</td>
            <td>
              <div class="action-row">
                <button type="button" class="button ghost" data-log-action="detail" data-log-id="${item.id}">详情</button>
                <button type="button" class="button ghost" data-open-api-design="${item.apiCode}">API详情</button>
              </div>
            </td>
          </tr>
        `).join('') || '<tr><td colspan="10" class="muted">当前筛选条件下暂无日志。</td></tr>';
      }

      function setSection(section) {
        state.section = section;
        $$('.screen').forEach((screen) => {
          screen.classList.toggle('active', screen.id === 'screen-' + section);
        });
        $$('.nav-button, .nav-sub-button').forEach((button) => {
          button.classList.toggle('active', button.dataset.section === section);
        });
        renderMappingSidebarNavigation();
        syncNavFolders(section);
      }

      function activateTab(group, target) {
        const button = document.querySelector(`.tab-button[data-group="${group}"][data-target="${target}"]`);
        if (button) {
          button.click();
        }
      }

      function showToast(message) {
        const el = document.createElement('div');
        el.className = 'toast';
        el.textContent = message;
        $('#toastStack').appendChild(el);
        setTimeout(() => {
          el.remove();
        }, 2600);
      }

      function openDrawer(title, body, eyebrow = 'Detail') {
        $('#drawerTitle').textContent = title;
        $('#drawerEyebrow').textContent = eyebrow;
        $('#drawerBody').innerHTML = body;
        $('#overlay').classList.add('show');
        $('#drawer').classList.add('open');
      }

      function closeDrawer() {
        $('#overlay').classList.remove('show');
        $('#drawer').classList.remove('open');
      }

      function runTest(testType) {
        openDrawer(
          testType,
          `
            <div class="mini-panel">
              <h4>执行进度</h4>
              <div class="progress-shell"><div class="progress-bar" id="testProgressBar"></div></div>
              <div class="line-list">
                <div class="line-item"><span class="line-key">状态</span><span id="testStatusText">开始执行 ${testType}...</span></div>
              </div>
            </div>
            <div class="mini-panel">
              <h4>测试结果</h4>
              <div class="line-list" id="testResultDetail"></div>
            </div>
            <div class="mini-panel">
              <h4>诊断建议</h4>
              <pre class="detail-code" id="testDiagnosis">执行中...</pre>
            </div>
          `,
          'Test'
        );
        $('#testProgressBar').style.width = '0%';
        $('#testStatusText').textContent = '开始执行 ' + testType + '...';
        $('#testDiagnosis').textContent = '执行中...';
        $('#testResultDetail').innerHTML = '';

        let progress = 0;
        const timer = setInterval(() => {
          if (!$('#testProgressBar') || !$('#testStatusText') || !$('#testDiagnosis') || !$('#testResultDetail')) {
            clearInterval(timer);
            return;
          }
          progress += 18;
          $('#testProgressBar').style.width = Math.min(progress, 100) + '%';
          $('#testStatusText').textContent = testType + ' 执行中，当前进度 ' + Math.min(progress, 100) + '%';
          if (progress >= 100) {
            clearInterval(timer);
            const detail = [
              ['测试类型', testType],
              ['执行时间', '2026-03-24 10:26:00'],
              ['目标平台', getCurrentPlatform().name],
              ['目标 API', testType.includes('API') ? ((getCurrentApi() && getCurrentApi().code + ' · ' + getCurrentApi().name) || '未选择') : '全平台'],
              ['结果', testType.includes('异常') ? '发现 1 项可恢复异常' : '通过'],
              ['请求耗时', testType.includes('控制') ? '1.9s' : '382ms'],
              ['诊断结论', testType.includes('异常') ? '接口限流阈值偏低，建议提升并增加重试间隔' : '认证、响应、解析和映射链路均正常']
            ];
            $('#testResultDetail').innerHTML = detail.map(([k, v]) => `
              <div class="line-item"><span class="line-key">${k}</span><span>${v}</span></div>
            `).join('');
            $('#testDiagnosis').textContent = testType.includes('异常')
              ? '建议：\n1. 调整接口调用频率限制。\n2. 增加异常场景模拟样本。\n3. 联动告警规则设置更合理的抑制窗口。'
              : '建议：\n1. 保持当前配置。\n2. 变更认证或接口地址后重新执行连通性测试。\n3. 上线前再跑一次全链路回归。';
            $('#testStatusText').textContent = testType + ' 已完成';
            showToast(testType + ' 已执行完成');
          }
        }, 180);
      }

      function renderWizardModules() {
        const modes = state.wizard.modes;
        const modules = [];
        if (modes.includes('标准开放')) {
          modules.push(['标准 API 接入详情', '应用注册、密钥管理、标准 API 文档、设备控制 SPI']);
        }
        if (modes.includes('主动拉取')) {
          modules.push(['主动同步配置详情', '认证、签名、API 定义、调用任务、调用策略、API 协议转换、数据映射']);
        }
        if (modes.includes('主动控制')) {
          modules.push(['控制接口配置', '控制指令映射、回执查询、模拟控制测试、调用监控']);
        }
        modules.push(['运行监控与日志', '接口调用监控、性能分析、失败重试与阶段耗时审计']);
        $('#wizardModules').innerHTML = modules.map(([title, desc]) => `
          <div class="list-card">
            <h4>${title}</h4>
            <div class="muted">${desc}</div>
          </div>
        `).join('');
        $('#wizardSummary').textContent = '已选择接入方式：' + modes.join(' / ') + '。保存后系统将自动生成对应配置入口，并引导进入监控与日志页面。';
        $('#wizardReview').innerHTML = [
          ['平台名称', $('#wizardName').value],
          ['厂商名称', $('#wizardVendor').value],
          ['平台类型', $('#wizardType').value],
          ['环境', $('#wizardEnv').value],
          ['接入方式', modes.join(' / ')],
          ['后续重点模块', modules.map((item) => item[0]).join('、')]
        ].map(([key, value]) => `
          <div class="line-item"><span class="line-key">${key}</span><span>${value}</span></div>
        `).join('');
      }

      function setWizardStep(step) {
        state.wizard.step = step;
        $$('#wizardStepper .step').forEach((item) => {
          const num = Number(item.dataset.step);
          item.classList.toggle('active', num === step);
          item.classList.toggle('done', num < step);
        });
        $$('[data-step-panel]').forEach((panel) => {
          panel.classList.toggle('active', Number(panel.dataset.stepPanel) === step);
        });
        renderWizardModules();
      }

      function createSampleApiDefinition() {
        const platform = getCurrentPlatform();
        const code = 'API-NEW-' + String(platform.apis.length + 1).padStart(2, '0');
        const api = {
          code,
          name: '新增样例接口',
          category: '状态类接口',
          method: 'GET',
          path: '/api/v1/new/sample',
          subUrl: '/api/v1/new/sample',
          strategy: '',
          strategyRef: '',
          lastConnectivityResult: '未测试',
          success: '待验证'
        };
        platform.apis.push(api);
        dataStore.apiProtocols[code] = createDefaultApiProtocol(api);
        state.currentApiCode = code;
        return api;
      }

      function addDraftPlatform() {
        const modes = state.wizard.modes.slice();
        const code = 'P' + String(dataStore.platforms.length + 1).padStart(3, '0');
        const platform = {
          id: code,
          code,
          name: $('#wizardName').value,
          vendor: $('#wizardVendor').value,
          type: $('#wizardType').value,
          modes,
          auth: modes.includes('标准开放') ? 'App + Key' : 'API Key',
          syncType: modes.includes('主动拉取') ? '待配置' : '开放接入',
          status: '草稿',
          alarms: 0,
          health: 0,
          successRate: 0,
          lastSync: '-',
          testResult: '未测试',
          owner: $('#wizardOwner').value,
          env: $('#wizardEnv').value,
          version: $('#wizardVersion').value,
          support: '待配置',
          desc: $('#wizardNote').value,
          baseUrl: '待配置',
          appId: 'draft-' + code.toLowerCase(),
          apiKey: '待生成',
          keyRotatedAt: '-',
          ingestDataTypes: modes.includes('主动拉取') ? ['电站数据', '设备数据', '点位数据'] : [],
          authConfig: {
            mode: modes.includes('标准开放') ? 'App + Key' : 'API Key',
            tokenUrl: 'https://draft.example.com/oauth/token',
            requestMethod: 'POST',
            clientId: 'draft-' + code.toLowerCase(),
            appKey: 'draft-app-key-' + code.toLowerCase(),
            secret: '待配置',
            headerDefinition: `Content-Type: application/json
  X-App-Id: draft-${code.toLowerCase()}`,
            tokenHeaderDefinition: `Authorization: Bearer \${accessToken}
  X-App-Key: draft-app-key-${code.toLowerCase()}`,
            requestBuilderScript: `function buildAuthRequest(context) {
    return {
      client_id: context.clientId,
      app_key: context.appKey,
      client_secret: context.clientSecret
    };
  }`,
            tokenParserScript: `function parseToken(response) {
    return {
      accessToken: response.access_token || response.token,
      expiresIn: response.expires_in || 7200
    };
  }`
          },
          callStrategies: [
            { id: 'STR-DRAFT', name: '草稿默认策略', timeout: '5 秒', retry: '2 次', circuit: '连续 3 次失败告警', healthCheck: '15 分钟' }
          ],
          callTasks: [],
          apis: []
        };
        dataStore.platforms.unshift(platform);
        state.currentPlatformId = platform.id;
        renderAll();
        setSection('platforms');
        showToast('已保存平台草稿：' + platform.name);
      }

      function renderAll() {
        renderTopbar();
        renderHomeDashboard();
        renderOverviewMetrics();
        renderPlatformTable();
        renderPlatformInspector();
        renderStandardAppInfo();
        renderStandardWhitelistIps();
        renderStandardSpiConfig();
        renderActiveAppInfo();
        renderActiveAuthConfig();
        renderActiveSignConfig();
        renderActiveDataTypes();
        renderApiTable();
        renderApiDesignDetail();
        renderCallTasks();
        renderPlatformStrategies();
        renderProtocolCenter();
        renderMappingSidebarNavigation();
        renderMappings();
        renderMonitorMetrics();
        renderAlerts();
        renderLogs();
        renderWizardModules();
        renderNavFolders();
      }

      function bindTabs() {
        document.body.addEventListener('click', (event) => {
          const tab = event.target.closest('.tab-button');
          if (!tab) return;
          const group = tab.dataset.group;
          const target = tab.dataset.target;
          const scope = tab.closest('.panel');
          const groupButtons = $$(`.tab-button[data-group="${group}"]`).filter((item) => item.closest('.panel') === scope);
          groupButtons.forEach((item) => item.classList.remove('active'));
          tab.classList.add('active');
          const targetIds = groupButtons.map((item) => item.dataset.target);
          scope.querySelectorAll('.tab-panel').forEach((panel) => {
            if (targetIds.includes(panel.id)) {
              panel.classList.toggle('active', panel.id === target);
            }
          });
          if (group === 'monitor-tabs' && target === 'monitor-flow') {
            requestAnimationFrame(() => renderFlowMonitor());
          }
          if (group === 'monitor-tabs' && target === 'monitor-response') {
            requestAnimationFrame(() => renderResponseMonitor());
          }
          if (group === 'monitor-tabs' && target === 'monitor-sync') {
            requestAnimationFrame(() => renderSyncMonitor());
          }
          if (group === 'monitor-tabs' && target === 'monitor-api') {
            requestAnimationFrame(() => renderApiMonitor());
          }
          if (group === 'monitor-tabs' && target === 'monitor-protocol') {
            requestAnimationFrame(() => renderProtocolMonitor());
          }
          if (group === 'monitor-tabs' && target === 'monitor-alert-stats') {
            requestAnimationFrame(() => renderAlertAnalytics(dataStore.alerts));
          }
        });
      }

      function bindEvents() {
        $('#navMenu').addEventListener('click', (event) => {
          const toggle = event.target.closest('[data-folder-toggle]');
          if (toggle) {
            const folderId = toggle.dataset.folderToggle;
            state.navFolders[folderId] = !state.navFolders[folderId];
            renderNavFolders();
            return;
          }
          const button = event.target.closest('.nav-button, .nav-sub-button');
          if (!button) return;
          if (button.dataset.mappingPanel) {
            state.mappingPanel = button.dataset.mappingPanel;
            setSection('mapping');
            return;
          }
          if (button.dataset.section === 'mapping' && !button.dataset.mappingPanel) {
            state.mappingPanel = state.mappingPanel || 'mapping-model-center';
          }
          setSection(button.dataset.section);
        });

        document.body.addEventListener('click', (event) => {
          const nav = event.target.closest('[data-nav]');
          if (nav) {
            setSection(nav.dataset.nav);
            if (nav.dataset.monitorTab) {
              activateTab('monitor-tabs', nav.dataset.monitorTab);
            }
          }
        });

        document.body.addEventListener('click', (event) => {
          const platformTrigger = event.target.closest('[data-select-platform]');
          if (platformTrigger) {
            state.currentPlatformId = platformTrigger.dataset.selectPlatform;
            renderAll();
            setSection('home');
            return;
          }
          const apiTrigger = event.target.closest('[data-select-api]');
          if (apiTrigger) {
            if (apiTrigger.dataset.selectPlatform) {
              state.currentPlatformId = apiTrigger.dataset.selectPlatform;
            }
            state.currentApiCode = apiTrigger.dataset.selectApi;
            renderAll();
            setSection('api-detail');
          }
        });

        document.body.addEventListener('click', (event) => {
          const addRelationButton = event.target.closest('[data-open-mapping-relation]');
          if (addRelationButton) {
            openMappingRelationEditor(addRelationButton.dataset.openMappingRelation);
            return;
          }

          const editRelationButton = event.target.closest('[data-mapping-action="edit"]');
          if (editRelationButton) {
            openMappingRelationEditor(editRelationButton.dataset.mappingType, editRelationButton.dataset.mappingId);
            return;
          }

          if (event.target.id === 'saveMappingRelation') {
            saveMappingRelationFromDrawer();
          }
        });

        document.body.addEventListener('click', (event) => {
          const exportButton = event.target.closest('[data-mapping-json-export]');
          if (exportButton) {
            exportMappingJson(exportButton.dataset.mappingJsonExport);
            return;
          }

          const importButton = event.target.closest('[data-mapping-json-import]');
          if (importButton) {
            openMappingJsonImportDrawer(importButton.dataset.mappingJsonImport);
            return;
          }

          const confirmButton = event.target.closest('[data-mapping-json-import-confirm]');
          if (confirmButton) {
            importMappingJson(confirmButton.dataset.mappingJsonImportConfirm);
          }
        });

        document.body.addEventListener('click', (event) => {
          if (event.target.id === 'saveInternalModel') {
            saveInternalModelFromDrawer();
            return;
          }
          if (event.target.id === 'saveConversionRule') {
            saveConversionRuleFromDrawer();
            return;
          }
          if (event.target.id === 'saveMappingVersionDraftFromDrawer') {
            saveMappingVersionFromDrawer(false);
            return;
          }
          if (event.target.id === 'publishMappingVersionDraftFromDrawer') {
            saveMappingVersionFromDrawer(true);
          }
        });

        document.body.addEventListener('change', (event) => {
          if (event.target.id === 'mappingRelationVersionSelect') {
            renderMappingRelationModelOptions(state.currentMappingRelationType, event.target.value);
            return;
          }
          if (event.target.id === 'mappingRulePlatformSelect') {
            state.mappingRulePlatformId = event.target.value;
            state.currentConversionRuleId = '';
            renderMappings();
            return;
          }
          if (event.target.id === 'mappingRelationPlatformSelect') {
            state.mappingRelationPlatformId = event.target.value;
            state.currentMappingRelationId = '';
            state.currentMappingRelationVersionId = '';
            state.currentControlMappingId = '';
            state.mappingRelationVersionView = 'list';
            state.controlMappingView = 'list';
            state.mappingDebug = {
              station: { input: '', output: '' },
              device: { input: '', output: '' },
              point: { input: '', output: '' },
              control: { input: '', output: '' }
            };
            renderMappings();
          }
        });

        document.body.addEventListener('click', (event) => {
          const runButton = event.target.closest('[data-mapping-debug-run]');
          if (runButton) {
            runMappingDebug(runButton.dataset.mappingDebugRun);
            return;
          }
          const resetButton = event.target.closest('[data-mapping-debug-reset]');
          if (resetButton) {
            resetMappingDebug(resetButton.dataset.mappingDebugReset);
          }
        });

        document.body.addEventListener('input', (event) => {
          const debugInput = event.target.closest('[data-mapping-debug-input]');
          if (!debugInput) return;
          const type = debugInput.dataset.mappingDebugInput;
          getMappingDebugState(type).input = debugInput.value;
        });

        $('#openStationModelCreate').addEventListener('click', () => openInternalModelEditor('station'));
        $('#openDeviceModelCreate').addEventListener('click', () => openInternalModelEditor('device'));
        $('#openPointModelCreate').addEventListener('click', () => openInternalModelEditor('point'));
        $('#openControlModelCreate').addEventListener('click', () => openInternalModelEditor('control'));
        $('#openMappingVersionCreate').addEventListener('click', () => openInternalModelEditor('version'));
        $('#openUnitRuleCreate').addEventListener('click', () => openConversionRuleEditor('unit'));
        $('#openTimezoneRuleCreate').addEventListener('click', () => openConversionRuleEditor('timezone'));
        $('#openStatusRuleCreate').addEventListener('click', () => openConversionRuleEditor('status'));
        $('#openAggregateRuleCreate').addEventListener('click', () => openConversionRuleEditor('aggregate'));

        $('#applyFilters').addEventListener('click', () => {
          state.filters.name = $('#filterName').value.trim();
          state.filters.type = $('#filterType').value;
          state.filters.mode = $('#filterMode').value;
          state.filters.status = $('#filterStatus').value;
          renderPlatformTable();
        });

        $('#resetFilters').addEventListener('click', () => {
          $('#filterName').value = '';
          $('#filterType').value = '';
          $('#filterMode').value = '';
          $('#filterStatus').value = '';
          state.filters = { name: '', type: '', mode: '', status: '' };
          renderPlatformTable();
        });

        $('#exportPlatforms').addEventListener('click', () => showToast('已模拟导出台账列表'));
        $('#openPlatformCreateDrawer').addEventListener('click', openPlatformCreateDrawer);

        $('#platformTableBody').addEventListener('click', (event) => {
          const actionButton = event.target.closest('[data-action]');
          const row = event.target.closest('tr[data-platform-id]');
          if (!row) return;
          if (actionButton && actionButton.dataset.action === 'toggle-status') {
            togglePlatformEnabled(row.dataset.platformId);
            return;
          }
          state.currentPlatformId = row.dataset.platformId;
          renderAll();
          if (!actionButton) return;
          const action = actionButton.dataset.action;
          if (action === 'detail') {
            const platform = getCurrentPlatform();
            setSection(getPlatformDetailSection(platform));
            showToast('已进入平台详情：' + platform.name);
          }
          if (action === 'logs') {
            state.logPlatformId = row.dataset.platformId;
            state.logType = '调用日志';
            state.logFilter = 'all';
            state.activeLogId = '';
            renderLogs();
            setSection('call-logs');
            showToast('已进入调用日志列表：' + getCurrentPlatform().name);
          }
        });

        $('#wizardNext1').addEventListener('click', () => setWizardStep(2));
        $('#wizardPrev2').addEventListener('click', () => setWizardStep(1));
        $('#wizardNext2').addEventListener('click', () => setWizardStep(3));
        $('#wizardPrev3').addEventListener('click', () => setWizardStep(2));
        $('#wizardNext3').addEventListener('click', () => setWizardStep(4));
        $('#wizardPrev4').addEventListener('click', () => setWizardStep(3));
        $('#wizardReset').addEventListener('click', () => {
          state.wizard.modes = ['主动拉取', '主动控制'];
          $$('#wizardModes .mode-card').forEach((card) => {
            card.classList.toggle('active', state.wizard.modes.includes(card.dataset.mode));
          });
          setWizardStep(1);
          showToast('已重置向导');
        });

        $('#wizardModes').addEventListener('click', (event) => {
          const card = event.target.closest('.mode-card');
          if (!card) return;
          const mode = card.dataset.mode;
          if (state.wizard.modes.includes(mode)) {
            state.wizard.modes = state.wizard.modes.filter((item) => item !== mode);
          } else {
            state.wizard.modes.push(mode);
          }
          if (!state.wizard.modes.length) {
            state.wizard.modes = [mode];
          }
          $$('#wizardModes .mode-card').forEach((item) => {
            item.classList.toggle('active', state.wizard.modes.includes(item.dataset.mode));
          });
          renderWizardModules();
        });

        $('#wizardSave').addEventListener('click', addDraftPlatform);

        $('#rotateKey').addEventListener('click', () => {
          $('#apiKeyRotatedAt').textContent = '2026-03-24';
          $('#apiKeyMasked').textContent = 'SK_9N7R••••••';
          showToast('已完成密钥轮换，明文仅首次展示');
        });

        $('#showOpenRights').addEventListener('click', () => {
          openDrawer(
            '开放权限矩阵',
            `
              <div class="line-list">
                <div class="line-item"><span class="line-key">电站管理</span><span>读 / 写</span></div>
                <div class="line-item"><span class="line-key">设备管理</span><span>读 / 写</span></div>
                <div class="line-item"><span class="line-key">点位上报</span><span>写</span></div>
                <div class="line-item"><span class="line-key">设备控制 SPI</span><span>实现回调</span></div>
              </div>
            `,
            'Permission'
          );
        });

        $('#addStandardWhitelistIp').addEventListener('click', () => {
          dataStore.standardWhitelistIps.push({
            ip: '',
            remark: '',
            status: '启用'
          });
          renderStandardWhitelistIps();
          showToast('已新增白名单 IP 行');
        });

        $('#saveStandardWhitelistIp').addEventListener('click', () => {
          dataStore.standardWhitelistIps = collectStandardWhitelistIps();
          renderStandardWhitelistIps();
          showToast('白名单 IP 配置已保存');
        });

        $('#openDocDebug').addEventListener('click', () => {
          openDrawer(
            '标准 API 调试样例',
            `
              <pre class="detail-code">curl -X POST 'https://ps2.example.com/open-api/v1/stations/upsert' \\
    -H 'X-App-Id: OPEN-PLAT-2026' \\
    -H 'X-Sign: ******' \\
    -d '{"stationCode":"ST-001","stationName":"华东一号储能站"}'</pre>
              <div class="panel-note">支持复制 curl、查看标准响应、切换到在线调试环境。</div>
            `,
            'Debug'
          );
        });

        $('#saveStandardSpiConfig').addEventListener('click', () => {
          saveStandardSpiConfig();
          showToast('SPI 配置已保存');
        });

        $('#runStandardSpiDebug').addEventListener('click', runStandardSpiDebug);

        document.body.addEventListener('click', (event) => {
          if (event.target.id === 'savePlatformDrawer') {
            savePlatformFromDrawer();
          }
        });

        $('#addAuthHeaderRow').addEventListener('click', () => {
          addAuthHeaderRow('request');
        });

        $('#addAuthTokenHeaderRow').addEventListener('click', () => {
          addAuthHeaderRow('token');
        });

        document.body.addEventListener('click', (event) => {
          const removeButton = event.target.closest('[data-auth-header-remove]');
          if (!removeButton) return;
          removeAuthHeaderRow(removeButton.dataset.authHeaderRemove, Number(removeButton.dataset.authHeaderIndex));
        });

        $('#saveAuthConfig').addEventListener('click', () => {
          const platform = getCurrentPlatform();
          const authConfig = getActiveAuthConfig(platform);
          const headerItems = collectAuthHeaderItems('request');
          const tokenHeaderItems = collectAuthHeaderItems('token');
          platform.auth = $('#authModeSelect').value;
          authConfig.mode = $('#authModeSelect').value;
          authConfig.tokenUrl = $('#authTokenUrl').value.trim();
          authConfig.requestMethod = $('#authRequestMethod').value.trim() || 'POST';
          authConfig.clientId = $('#authClientId').value.trim();
          authConfig.appKey = $('#authAppKey').value.trim();
          authConfig.secret = $('#authSecret').value;
          authConfig.headerItems = headerItems;
          authConfig.tokenHeaderItems = tokenHeaderItems;
          authConfig.headerDefinition = stringifyHeaderDefinitionItems(headerItems);
          authConfig.tokenHeaderDefinition = stringifyHeaderDefinitionItems(tokenHeaderItems);
          authConfig.requestBuilderScript = $('#authRequestBuilderScript').value;
          authConfig.tokenParserScript = $('#authTokenParserScript').value;
          if (authConfig.appKey) {
            platform.apiKey = authConfig.appKey;
          }
          renderTopbar();
          renderActiveAppInfo();
          renderActiveAuthConfig();
          showToast('认证配置已保存，请重新执行连通性测试');
        });

        $('#saveActiveApp').addEventListener('click', () => {
          const platform = getCurrentPlatform();
          platform.name = $('#activePlatformName').value.trim() || platform.name;
          platform.vendor = $('#activePlatformVendor').value.trim() || platform.vendor;
          platform.syncType = $('#activePlatformMode').value;
          platform.env = $('#activePlatformEnv').value;
          platform.owner = $('#activePlatformOwner').value.trim() || platform.owner;
          platform.version = $('#activePlatformVersion').value.trim() || platform.version;
          platform.baseUrl = $('#activePlatformBaseUrl').value.trim() || platform.baseUrl;
          platform.desc = $('#activePlatformDesc').value.trim() || platform.desc;
          renderAll();
          showToast('平台信息已保存');
        });

        $('#protocolApiSelect').addEventListener('change', (event) => {
          state.currentApiCode = event.target.value;
          renderProtocolCenter();
          showToast('已切换到 API：' + event.target.value);
        });

        $('#openCurrentApiDetail').addEventListener('click', () => {
          const api = getCurrentApi();
          if (!api) {
            showToast('请先选择 API');
            return;
          }
          setSection('api-detail');
          showToast('已进入 API 详情页：' + api.name);
        });

        $('#openProtocolLog').addEventListener('click', () => {
          const api = getCurrentApi();
          openProtocolLogsView({
            platformId: state.currentPlatformId,
            apiCode: api ? api.code : '',
            transformType: '',
            result: ''
          });
          showToast('已打开转换日志');
        });

        $('#openProtocolMonitor').addEventListener('click', () => {
          setSection('monitoring');
          activateTab('monitor-tabs', 'monitor-protocol');
          showToast('已打开协议转换监控');
        });

        $('#protocolLogPlatformFilter').addEventListener('change', (event) => {
          state.protocolLogFilters.platformId = event.target.value;
          renderProtocolLogFilters();
        });

        $('#queryProtocolLogs').addEventListener('click', () => {
          state.protocolLogFilters.platformId = $('#protocolLogPlatformFilter').value;
          state.protocolLogFilters.apiCode = $('#protocolLogApiFilter').value;
          state.protocolLogFilters.transformType = $('#protocolLogTypeFilter').value;
          state.protocolLogFilters.result = $('#protocolLogResultFilter').value;
          state.activeProtocolLogId = '';
          renderProtocolLogFilters();
          renderProtocolLogs();
          showToast('已更新 API 转换日志筛选条件');
        });

        $('#resetProtocolLogs').addEventListener('click', () => {
          state.protocolLogFilters = {
            platformId: '',
            apiCode: '',
            transformType: '',
            result: ''
          };
          state.activeProtocolLogId = '';
          renderProtocolLogFilters();
          renderProtocolLogs();
        });

        $('#protocolLogTableBody').addEventListener('click', (event) => {
          const detailButton = event.target.closest('[data-protocol-log-action="detail"]');
          if (!detailButton) return;
          state.activeProtocolLogId = detailButton.dataset.logId;
          renderProtocolLogs();
          openProtocolLogDetailDrawer(detailButton.dataset.logId);
        });

        $('#addApiDefinition').addEventListener('click', () => {
          const api = createSampleApiDefinition();
          renderAll();
          setSection('api-detail');
          showToast('已创建 API 并进入设计详情：' + api.code);
        });

        $('#apiTableBody').addEventListener('click', (event) => {
          const row = event.target.closest('tr');
          const button = event.target.closest('.api-design');
          if (!button && !row) return;
          const platform = getCurrentPlatform();
          const targetCode = button ? button.dataset.apiCode : (row && row.querySelector('td') ? row.querySelector('td').textContent.trim() : '');
          const api = platform.apis.find((item) => item.code === targetCode);
          if (!api) return;
          state.currentApiCode = api.code;
          renderAll();
          setSection('api-detail');
          if (button) {
            showToast('已进入 API 设计详情：' + api.name);
          }
        });

        $('#saveApiDefinitionList').addEventListener('click', () => {
          showToast('API 定义列表已保存');
        });

        $('#toggleSignConfigEnabled').addEventListener('click', () => {
          toggleActiveSignConfig();
          showToast('签名配置状态已更新');
        });

        $('#saveSignConfig').addEventListener('click', () => {
          saveActiveSignConfig();
          showToast('签名配置已保存');
        });

        $('#saveApiDetail').addEventListener('click', () => {
          const api = getCurrentApi();
          if (!api) {
            showToast('请先选择 API');
            return;
          }
          api.subUrl = $('#apiDetailSubUrl').value.trim() || api.subUrl || api.path;
          api.path = api.subUrl;
          const protocol = getApiProtocol(api.code) || createDefaultApiProtocol(api);
          protocol.requestStandardSample = $('#apiRequestTemplate').value;
          protocol.requestScript = $('#apiRequestScript').value;
          protocol.requestPartnerSample = $('#apiPartnerRequestTemplate').value;
          protocol.responsePartnerSample = $('#apiResponseTemplate').value;
          protocol.responseScript = $('#apiResponseScript').value;
          protocol.responseStandardSample = $('#apiStandardResponseTemplate').value;
          dataStore.apiProtocols[api.code] = protocol;
          renderAll();
          showToast('API 设计详情已保存：' + api.code);
        });

        $('#testApiConnectivity').addEventListener('click', () => {
          const api = getCurrentApi();
          if (!api) {
            showToast('请先选择 API');
            return;
          }
          api.lastConnectivityResult = '2026-03-24 10:42 通过';
          renderApiDesignDetail();
          openDrawer(
            'API 连通性测试结果',
            `
              <div class="result-box pass">连通性测试通过</div>
              <div class="line-list">
                <div class="line-item"><span class="line-key">目标 API</span><span>${api.code} · ${api.name}</span></div>
                <div class="line-item"><span class="line-key">请求地址</span><span>${getCurrentPlatform().baseUrl}${api.subUrl || api.path}</span></div>
                <div class="line-item"><span class="line-key">响应结果</span><span>HTTP 200 / 认证通过 / 接口可达</span></div>
                <div class="line-item"><span class="line-key">耗时</span><span>286ms</span></div>
              </div>
            `,
            'Connectivity'
          );
        });

        $('#viewApiRecords').addEventListener('click', () => {
          const api = getCurrentApi();
          if (!api) {
            showToast('请先选择 API');
            return;
          }
          const records = dataStore.logs.filter((log) => log.apiCode === api.code);
          openDrawer(
            api.name + ' 调用记录',
            records.length ? records.map((item) => `
              <div class="line-item">
                <span class="line-key">${item.time} · ${item.result}</span>
                <span>${item.action} · ${item.duration}</span>
              </div>
            `).join('') : '<div class="muted">暂无调用记录</div>',
            'API Log'
          );
        });

        $('#runRequestScript').addEventListener('click', () => {
          const api = getCurrentApi();
          if (!api) {
            showToast('请先选择 API');
            return;
          }
          try {
            const input = parseJsonText($('#apiRequestTemplate').value);
            const result = runTransformScript(
              $('#apiRequestScript').value,
              'transformRequest',
              input,
              { api, baseUrl: getCurrentPlatform().baseUrl, platform: getCurrentPlatform() }
            );
            $('#apiRequestOutput').textContent = JSON.stringify(result, null, 2);
            showToast('输入参数脚本运行成功');
          } catch (error) {
            $('#apiRequestOutput').textContent = '脚本运行失败：\n' + error.message;
            showToast('输入参数脚本运行失败');
          }
        });

        $('#runResponseDebug').addEventListener('click', () => {
          const api = getCurrentApi();
          if (!api) {
            showToast('请先选择 API');
            return;
          }
          try {
            const input = parseJsonText($('#apiResponseTemplate').value);
            const result = runTransformScript(
              $('#apiResponseScript').value,
              'transformResponse',
              input,
              { api, baseUrl: getCurrentPlatform().baseUrl, platform: getCurrentPlatform() }
            );
            const passed = validateStandardResponse(result);
            const box = $('#apiResponseStatusBox');
            box.style.display = 'block';
            box.className = 'result-box ' + (passed ? 'pass' : 'fail');
            box.textContent = passed ? '标准返回格式校验通过' : '标准返回格式校验未通过';
            $('#apiResponseOutput').textContent = JSON.stringify(result, null, 2);
            showToast(passed ? '返回调试通过' : '返回调试完成，但格式未通过');
          } catch (error) {
            const box = $('#apiResponseStatusBox');
            box.style.display = 'block';
            box.className = 'result-box fail';
            box.textContent = '调试失败';
            $('#apiResponseOutput').textContent = '返回调试失败：\n' + error.message;
            showToast('返回调试失败');
          }
        });

        $('#simulateResponseError').addEventListener('click', () => {
          $('#apiResponseStatusBox').style.display = 'block';
          $('#apiResponseStatusBox').className = 'result-box fail';
          $('#apiResponseStatusBox').textContent = '标准返回格式校验未通过';
          $('#apiResponseOutput').textContent = `{
    "error": "第三方返回字段缺失",
    "detail": "data.items[].temp_f 不存在，无法转换为平台标准字段 temperature"
  }`;
          showToast('已模拟返回异常');
        });

        $('#runOverallDebug').addEventListener('click', () => {
          const api = getCurrentApi();
          if (!api) {
            showToast('请先选择 API');
            return;
          }
          openDrawer(
            '整体调试',
            `
              <div class="field">
                <label for="overallDebugInput">整体调试输入参数</label>
                <textarea id="overallDebugInput">${$('#apiRequestTemplate').value}</textarea>
              </div>
              <div class="action-row">
                <button type="button" class="button secondary" id="previewOverallDebug">输出调用参数</button>
                <button type="button" class="button brand" id="executeOverallDebug">运行</button>
              </div>
              <div class="mini-panel">
                <h4>调用参数</h4>
                <pre class="detail-code" id="overallDebugRequestOutput">点击“输出调用参数”后展示第三方实际调用参数。</pre>
              </div>
              <div class="mini-panel">
                <h4>调用阶段进度</h4>
                <div class="stage-list" id="overallDebugStageList"></div>
              </div>
              <div class="mini-panel">
                <h4>转换结果</h4>
                <div class="result-box info" id="overallDebugResultBox">运行后输出标准返回格式校验结果。</div>
                <pre class="detail-code" id="overallDebugFinalOutput">等待运行...</pre>
              </div>
            `,
            'Debug'
          );
          try {
            buildOverallDebugRequest(api);
            renderOverallDebugStages([
              { name: '生成调用参数', status: 'done', badge: '已完成', message: '已根据当前输入参数生成第三方调用参数。' },
              { name: '调用第三方 API', status: 'pending', badge: '待执行', message: '点击“运行”后发起 API 调用。' },
              { name: '返回协议转换', status: 'pending', badge: '待执行', message: '等待第三方 API 返回后执行。' },
              { name: '标准格式校验', status: 'pending', badge: '待执行', message: '等待协议转换结果生成后执行。' }
            ]);
          } catch (error) {
            $('#overallDebugRequestOutput').textContent = '调用参数生成失败：\n' + error.message;
            $('#overallDebugResultBox').className = 'result-box fail';
            $('#overallDebugResultBox').textContent = '请先修正输入参数或入参转换脚本。';
          }
        });

        $('#platformStrategyTableBody').addEventListener('click', (event) => {
          const button = event.target.closest('[data-strategy-action="edit"]');
          const row = event.target.closest('tr[data-strategy-id]');
          if (!button && !row) return;
          state.currentStrategyId = button ? button.dataset.strategyId : row.dataset.strategyId;
          renderPlatformStrategies();
        });

        $('#callTaskList').addEventListener('click', (event) => {
          const item = event.target.closest('[data-task-id]');
          if (!item) return;
          state.currentTaskId = item.dataset.taskId;
          renderCallTasks();
        });

        $('#addPlatformStrategy').addEventListener('click', () => {
          const platform = getCurrentPlatform();
          const next = platform.callStrategies.length + 1;
          const strategy = {
            id: 'STR-CUSTOM-' + next,
            name: '自定义策略 ' + next,
            type: '重试策略',
            timeoutSeconds: 6,
            timeout: '6 秒',
            serviceDegradeEnabled: false,
            serviceDegrade: '关闭',
            description: '新增的自定义调用策略，请按实际调用要求补充参数。',
            retryCount: '2',
            retry: '2 次',
            retryInterval: '2 秒',
            backupLink: ''
          };
          platform.callStrategies.push(strategy);
          state.currentStrategyId = strategy.id;
          renderPlatformStrategies();
          renderApiDesignDetail();
          showToast('已新增平台级调用策略');
        });

        $('#strategyDetailType').addEventListener('change', (event) => {
          renderStrategyTypeFields(event.target.value);
        });

        $('#testStrategyBackupLink').addEventListener('click', () => {
          const strategy = getCurrentStrategy();
          if (!strategy) {
            showToast('请先选择调用策略');
            return;
          }
          if ($('#strategyDetailType').value !== '轮讯策略') {
            showToast('当前策略不是轮讯策略');
            return;
          }
          const backupLink = $('#strategyDetailBackupLink').value.trim();
          if (!backupLink) {
            showToast('请先填写备用链路');
            return;
          }
          showToast('备用链路连通性测试通过：' + backupLink);
        });

        $('#savePlatformStrategy').addEventListener('click', () => {
          const platform = getCurrentPlatform();
          const strategy = getCurrentStrategy(platform);
          if (!strategy) {
            showToast('请先选择调用策略');
            return;
          }
          const normalized = normalizeStrategy(strategy, platform);
          const type = $('#strategyDetailType').value;
          const timeoutSeconds = parseStrategyNumber($('#strategyDetailTimeout').value, normalized.timeoutSeconds);
          const serviceDegradeEnabled = $('#strategyDetailServiceDegrade').value === '开启';

          strategy.name = $('#strategyDetailName').value.trim() || strategy.name;
          strategy.type = type;
          strategy.timeoutSeconds = timeoutSeconds;
          strategy.timeout = `${timeoutSeconds} 秒`;
          strategy.serviceDegradeEnabled = serviceDegradeEnabled;
          strategy.serviceDegrade = serviceDegradeEnabled ? '开启' : '关闭';
          strategy.description = $('#strategyDetailDescription').value.trim() || normalized.description;
          strategy.note = strategy.description;

          if (type === '重试策略') {
            const retryCount = parseStrategyNumber($('#strategyDetailRetryCount').value, parseStrategyNumber(normalized.retryCount, 2));
            strategy.retryCount = String(retryCount);
            strategy.retry = `${retryCount} 次`;
            strategy.retryInterval = $('#strategyDetailRetryInterval').value.trim() || normalized.retryInterval;
            strategy.backupLink = '';
          } else if (type === '轮讯策略') {
            strategy.retryCount = '';
            strategy.retry = '';
            strategy.retryInterval = '';
            strategy.backupLink = $('#strategyDetailBackupLink').value.trim() || normalized.backupLink;
          } else {
            strategy.retryCount = '';
            strategy.retry = '';
            strategy.retryInterval = '';
            strategy.backupLink = '';
          }

          renderPlatformStrategies();
          renderApiDesignDetail();
          showToast('调用策略配置已保存');
        });

        $('#addCallTask').addEventListener('click', () => {
          const platform = getCurrentPlatform();
          const next = platform.callTasks.length + 1;
          const task = {
            id: 'TASK-CUSTOM-' + next,
            name: '新增调用任务 ' + next,
            strategyRef: getPlatformStrategies(platform)[0] ? getPlatformStrategies(platform)[0].id : '',
            apiConfigs: [createDefaultTaskApiConfig(0, platform)],
            apiCodes: platform.apis[0] ? [platform.apis[0].code] : [],
            triggerMode: '固定频率',
            frequency: '每 15 分钟',
            cron: '0 */15 * * * ?',
            status: '启用',
            window: '全天',
            note: '新建任务，请补充 API 范围、频率和执行窗口。'
          };
          platform.callTasks.push(task);
          state.currentTaskId = task.id;
          renderCallTasks();
          showToast('已新增调用任务');
        });

        $('#addTaskApiConfig').addEventListener('click', () => {
          const task = getCurrentTask();
          if (!task) {
            showToast('请先选择调用任务');
            return;
          }
          const platform = getCurrentPlatform();
          const apiConfigs = collectTaskApiConfigs();
          task.apiConfigs = apiConfigs.length ? apiConfigs : normalizeTaskApiConfigs(task, platform);
          task.apiConfigs.push(createDefaultTaskApiConfig(task.apiConfigs.length, platform));
          task.apiCodes = task.apiConfigs.map((item) => item.apiCode).filter(Boolean);
          renderTaskApiConfigRows(task, platform);
        });

        $('#taskApiConfigList').addEventListener('click', (event) => {
          const button = event.target.closest('[data-task-api-action="remove"]');
          if (!button) return;
          const task = getCurrentTask();
          if (!task) return;
          const platform = getCurrentPlatform();
          const index = Number(button.closest('[data-task-api-index]')?.dataset.taskApiIndex);
          const apiConfigs = collectTaskApiConfigs();
          apiConfigs.splice(Number.isFinite(index) ? index : -1, 1);
          task.apiConfigs = apiConfigs.length ? apiConfigs : [createDefaultTaskApiConfig(0, platform)];
          task.apiCodes = task.apiConfigs.map((item) => item.apiCode).filter(Boolean);
          renderTaskApiConfigRows(task, platform);
        });

        $('#taskApiConfigList').addEventListener('change', (event) => {
          const field = event.target.closest('[data-task-api-field]')?.dataset.taskApiField;
          if (field !== 'paramSource') return;
          const task = getCurrentTask();
          if (!task) return;
          const platform = getCurrentPlatform();
          task.apiConfigs = collectTaskApiConfigs();
          task.apiCodes = task.apiConfigs.map((item) => item.apiCode).filter(Boolean);
          renderTaskApiConfigRows(task, platform);
        });

        $('#saveCallTask').addEventListener('click', () => {
          const task = getCurrentTask();
          if (!task) {
            showToast('请先选择调用任务');
            return;
          }
          task.name = $('#taskDetailName').value.trim() || task.name;
          task.triggerMode = $('#taskDetailTriggerMode').value;
          task.frequency = $('#taskDetailFrequency').value.trim() || task.frequency;
          task.cron = $('#taskDetailCron').value.trim();
          task.status = $('#taskDetailStatus').value;
          task.window = $('#taskDetailWindow').value.trim() || task.window;
          task.strategyRef = $('#taskDetailStrategy').value;
          task.apiConfigs = collectTaskApiConfigs();
          task.apiCodes = task.apiConfigs.map((item) => item.apiCode).filter(Boolean);
          task.note = $('#taskDetailNote').value.trim() || task.note;
          renderCallTasks();
          renderApiDesignDetail();
          renderProtocolCenter();
          showToast('调用任务已保存');
        });

        $('#toggleCallTaskStatus').addEventListener('click', () => {
          const task = getCurrentTask();
          if (!task) {
            showToast('请先选择调用任务');
            return;
          }
          task.status = task.status === '启用' ? '停用' : '启用';
          $('#taskDetailStatus').value = task.status;
          renderCallTasks();
          showToast('任务状态已更新为：' + task.status);
        });

        $('#mappingVersionHistoryBody').addEventListener('click', (event) => {
          const detailButton = event.target.closest('[data-version-action="detail"]');
          if (!detailButton) return;
          const record = getMappingVersions().find((item) => item.id === detailButton.dataset.versionId);
          if (!record) return;
          state.currentMappingVersionId = record.id;
          state.mappingVersionView = 'detail';
          renderMappings();
        });

        $('#backToMappingVersionList').addEventListener('click', () => {
          state.mappingVersionView = 'list';
          renderMappings();
        });

        $('#mappingRelationVersionBody').addEventListener('click', (event) => {
          const detailButton = event.target.closest('[data-mapping-relation-version-action="detail"]');
          if (!detailButton) return;
          const record = getScopedMappingRelationVersions().find((item) => item.id === detailButton.dataset.mappingRelationVersionId);
          if (!record) return;
          state.currentMappingRelationVersionId = record.id;
          state.mappingRelationVersionView = 'detail';
          renderMappings();
        });

        $('#backToMappingRelationVersionList').addEventListener('click', () => {
          state.mappingRelationVersionView = 'list';
          renderMappings();
        });

        ['unitRuleBody', 'timezoneRuleBody', 'statusRuleBody', 'aggregateRuleBody'].forEach((id) => {
          $('#' + id).addEventListener('click', (event) => {
            const button = event.target.closest('[data-rule-action="detail"]');
            if (!button) return;
            openConversionRuleDetail(button.dataset.ruleType, button.dataset.ruleId);
          });
        });

        $('#controlMappingTableBody').addEventListener('click', (event) => {
          const item = event.target.closest('[data-control-action="detail"]');
          if (!item) return;
          state.currentControlMappingId = item.dataset.controlMappingId;
          state.controlMappingView = 'detail';
          state.mappingDebug.control.input = '';
          state.mappingDebug.control.output = '';
          renderControlMappings();
        });

        $('#addControlMapping').addEventListener('click', () => {
          const next = getControlMappings().length + 1;
          const mapping = {
            id: 'CTRL-MAP-' + String(next).padStart(2, '0'),
            platformId: state.mappingRelationPlatformId,
            name: '新增控制映射 ' + next,
            status: '已启用',
            apiCode: getCurrentApi() ? getCurrentApi().code : 'API-NEW',
            standard: {
              name: '内部控制名称',
              code: 'internalControlCode'
            },
            partner: {
              name: '外部控制名称',
              code: 'externalControlCode'
            },
            inputMappings: [
              {
                internal: { name: '内部参数名', code: 'internalParamCode', type: 'string', unit: '-' },
                external: { name: '外部参数名', code: 'externalParamCode', type: 'string', unit: '-' }
              }
            ],
            outputMappings: [
              {
                internal: { name: '内部输出参数名', code: 'internalResultCode', type: 'string', unit: '-' },
                external: { name: '外部输出参数名', code: 'externalResultCode', type: 'string', unit: '-' }
              }
            ]
          };
          dataStore.controlMappings.push(mapping);
          state.currentControlMappingId = mapping.id;
          state.controlMappingView = 'detail';
          state.mappingDebug.control.input = '';
          state.mappingDebug.control.output = '';
          renderControlMappings();
          showToast('已新增控制指令映射');
        });

        $('#backToControlMappingList').addEventListener('click', () => {
          state.controlMappingView = 'list';
          renderControlMappings();
        });

        $('#addInputControlMappingRow').addEventListener('click', () => {
          const mapping = getCurrentControlMapping();
          if (!mapping) {
            showToast('请先选择控制映射');
            return;
          }
          mapping.inputMappings.push({
            internal: { name: '', code: '', type: 'string', unit: '-' },
            external: { name: '', code: '', type: 'string', unit: '-' }
          });
          renderControlMappings();
        });

        $('#addOutputControlMappingRow').addEventListener('click', () => {
          const mapping = getCurrentControlMapping();
          if (!mapping) {
            showToast('请先选择控制映射');
            return;
          }
          mapping.outputMappings.push({
            internal: { name: '', code: '', type: 'string', unit: '-' },
            external: { name: '', code: '', type: 'string', unit: '-' }
          });
          renderControlMappings();
        });

        $('#saveControlMapping').addEventListener('click', () => {
          const mapping = getCurrentControlMapping();
          if (!mapping) {
            showToast('请先选择控制映射');
            return;
          }
          mapping.standard.name = $('#standardControlName').value.trim() || mapping.standard.name;
          mapping.standard.code = $('#standardControlCode').value.trim() || mapping.standard.code;
          mapping.partner.name = $('#partnerControlName').value.trim() || mapping.partner.name;
          mapping.partner.code = $('#partnerControlCode').value.trim() || mapping.partner.code;
          mapping.inputMappings = collectControlParamMappings('input');
          mapping.outputMappings = collectControlParamMappings('output');
          mapping.name = mapping.standard.name + ' 映射';
          renderControlMappings();
          showToast('控制指令映射已保存');
        });

        $('#openControlMappingDiff').addEventListener('click', () => {
          const mapping = getCurrentControlMapping();
          if (!mapping) {
            showToast('请先选择控制映射');
            return;
          }
          openDrawer(
            '控制指令映射对照',
            `
              <div class="line-list">
                <div class="line-item"><span class="line-key">内部控制</span><span>${mapping.standard.name} / ${mapping.standard.code}</span></div>
                <div class="line-item"><span class="line-key">外部控制</span><span>${mapping.partner.name} / ${mapping.partner.code}</span></div>
              </div>
              <div class="list-card">
                <div class="panel-header">
                  <div><h4>输入参数映射</h4></div>
                </div>
                ${renderControlParamMappingPreview(mapping.inputMappings || [], '暂无输入参数映射')}
              </div>
              <div class="list-card">
                <div class="panel-header">
                  <div><h4>输出参数映射</h4></div>
                </div>
                ${renderControlParamMappingPreview(mapping.outputMappings || [], '暂无输出参数映射')}
              </div>
            `,
            'Control Mapping'
          );
        });

        $$('.test-runner').forEach((button) => {
          button.addEventListener('click', () => runTest(button.dataset.testType));
        });

        const runAllTestsButton = $('#runAllTests');
        if (runAllTestsButton) {
          runAllTestsButton.addEventListener('click', () => runTest('全链路回归测试'));
        }
        const scheduleTestButton = $('#scheduleTest');
        if (scheduleTestButton) {
          scheduleTestButton.addEventListener('click', () => showToast('已加入定时巡检计划，每日 09:00 自动执行'));
        }

        $('#triggerAlertTest').addEventListener('click', () => {
          const newAlert = {
            id: 'AL-NEW-' + String(dataStore.alerts.length + 1).padStart(2, '0'),
            platformId: state.currentPlatformId,
            title: '测试告警：接口调用失败率升高',
            level: '中',
            type: '触发测试',
            status: '已通知',
            time: '2026-03-24 10:30',
            cause: '测试触发，验证通知链路是否有效。',
            suggestion: '确认短信、站内信模板与通知联系人配置已生效。',
            owner: '系统自动',
            strategy: '短信 + 站内信',
            channels: ['短信', '站内信'],
            phones: ['13900006666'],
            contacts: ['系统管理员'],
            notifiedAt: '2026-03-24 10:31',
            handledAt: '',
            closedAt: '',
            notifyMinutes: 1,
            handleMinutes: 0,
            closeMinutes: 0
          };
          dataStore.alerts.unshift(newAlert);
          state.alertId = newAlert.id;
          renderAlerts();
          showToast('已触发一条测试告警');
        });

        $('#openNotifyTemplate').addEventListener('click', () => {
          openDrawer(
            '通知模板',
            `
              <pre class="detail-code">【外部平台对接告警】
  平台：${getCurrentPlatform().name}
  告警：控制接口连续超时
  时间：2026-03-24 10:05
  建议：检查第三方控制网关性能，必要时切换备用链路。</pre>
            `,
            'Template'
          );
        });

        $('#generateAlertAnalysisReport').addEventListener('click', () => {
          const reportText = state.alertAnalyticsReport || '暂无可生成的告警分析报告数据。';
          openDrawer(
            '告警分析报告',
            `
              <div class="panel-note">报告已按当前统计视图生成，可直接复制用于周报/复盘。</div>
              <pre class="detail-code">${escapeHtml(reportText)}</pre>
            `,
            'Report'
          );
          showToast('告警分析报告已生成');
        });

        $('#alertEventTableBody').addEventListener('click', (event) => {
          const button = event.target.closest('[data-alert-action="detail"]');
          const row = event.target.closest('tr[data-alert-id]');
          if (!button && !row) return;
          state.alertId = button ? button.dataset.alertId : row.dataset.alertId;
          renderAlerts();
          if (button) {
            openAlertDetailDrawer(state.alertId);
          }
        });

        $('#alertRuleTableBody').addEventListener('click', (event) => {
          const button = event.target.closest('[data-alert-rule-action="edit"]');
          if (!button) return;
          state.currentAlertRuleId = button.dataset.alertRuleId;
          state.alertRuleView = 'detail';
          renderAlerts();
          showToast('已进入告警规则编辑页');
        });

        $('#backToAlertRuleList').addEventListener('click', () => {
          state.alertRuleView = 'list';
          renderAlerts();
        });

        $('#saveAlertRule').addEventListener('click', () => {
          const rule = getCurrentAlertRule();
          if (!rule) {
            showToast('请先选择告警规则');
            return;
          }
          const triggerCount = Number.parseInt($('#alertRuleTriggerCount').value, 10);
          const durationSeconds = Number.parseInt($('#alertRuleDuration').value, 10);
          rule.type = $('#alertRuleType').value;
          rule.name = $('#alertRuleName').value.trim();
          rule.triggerCount = Number.isFinite(triggerCount) && triggerCount > 0 ? triggerCount : (rule.triggerCount || 1);
          rule.durationSeconds = Number.isFinite(durationSeconds) && durationSeconds > 0 ? durationSeconds : (rule.durationSeconds || 60);
          rule.trigger = getAlertRuleTriggerText(rule);
          rule.strategy = $('#alertRuleStrategy').value;
          rule.phones = $('#alertRulePhones').value.trim();
          rule.contacts = $('#alertRuleContacts').value.trim();
          rule.description = $('#alertRuleDescription').value.trim();
          rule.enabled = $('#alertRuleEnabledToggle').dataset.enabled === 'true';
          state.alertRuleView = 'list';
          renderAlerts();
          showToast('告警规则配置已保存');
        });

        $('#alertRuleEnabledToggle').addEventListener('click', () => {
          const toggle = $('#alertRuleEnabledToggle');
          if (toggle.disabled) return;
          setAlertRuleEnabledToggle(toggle.dataset.enabled !== 'true');
        });

        document.body.addEventListener('click', (event) => {
          const statusButton = event.target.closest('[data-alert-status]');
          if (!statusButton) return;
          const alert = dataStore.alerts.find((item) => item.id === state.alertId);
          if (!alert) return;

          const nextStatus = statusButton.dataset.alertStatus;
          alert.status = nextStatus;
          if (nextStatus === '已通知') {
            alert.notifiedAt = alert.notifiedAt || '2026-03-24 10:32';
            alert.notifyMinutes = alert.notifyMinutes || 1;
          }
          if (nextStatus === '已处理') {
            alert.notifiedAt = alert.notifiedAt || '2026-03-24 10:32';
            alert.handledAt = alert.handledAt || '2026-03-24 10:38';
            alert.handleMinutes = alert.handleMinutes || 8;
          }
          if (nextStatus === '已关闭') {
            alert.notifiedAt = alert.notifiedAt || '2026-03-24 10:32';
            alert.handledAt = alert.handledAt || '2026-03-24 10:38';
            alert.closedAt = alert.closedAt || '2026-03-24 10:50';
            alert.handleMinutes = alert.handleMinutes || 8;
            alert.closeMinutes = alert.closeMinutes || 18;
          }
          renderAlerts();
          showToast('告警状态已更新为：' + nextStatus);
        });

        document.body.addEventListener('click', (event) => {
          const previewButton = event.target.closest('#previewOverallDebug');
          if (previewButton) {
            const api = getCurrentApi();
            if (!api) {
              showToast('请先选择 API');
              return;
            }
            try {
              buildOverallDebugRequest(api);
              renderOverallDebugStages([
                { name: '生成调用参数', status: 'done', badge: '已完成', message: '已更新第三方调用参数。' },
                { name: '调用第三方 API', status: 'pending', badge: '待执行', message: '点击“运行”后发起请求。' },
                { name: '返回协议转换', status: 'pending', badge: '待执行', message: '等待 API 返回后执行。' },
                { name: '标准格式校验', status: 'pending', badge: '待执行', message: '等待返回协议转换完成后执行。' }
              ]);
              $('#overallDebugResultBox').className = 'result-box info';
              $('#overallDebugResultBox').textContent = '调用参数已更新，可以开始执行整体调试。';
              showToast('调用参数已更新');
            } catch (error) {
              $('#overallDebugRequestOutput').textContent = '调用参数生成失败：\n' + error.message;
              $('#overallDebugResultBox').className = 'result-box fail';
              $('#overallDebugResultBox').textContent = '调用参数生成失败，请先修正输入参数或入参转换脚本。';
              showToast('调用参数生成失败');
            }
            return;
          }

          const executeButton = event.target.closest('#executeOverallDebug');
          if (executeButton) {
            runOverallDebugFlow();
            return;
          }

          const apiDesignButton = event.target.closest('[data-open-api-design]');
          if (apiDesignButton) {
            openApiDesignByCode(apiDesignButton.dataset.openApiDesign);
          }
        });

        $('#filterFailLogs').addEventListener('click', () => {
          state.logFilter = 'fail';
          renderLogs();
        });

        $('#openApiCallLogs').addEventListener('click', () => {
          openLogsView({ type: '调用日志' });
          showToast('已打开接口调用日志');
        });

        $('#openPerformanceLogs').addEventListener('click', () => {
          openLogsView({ type: '调用日志' });
          showToast('已打开性能相关调用日志');
        });

        $('#syncMonitorQueryButton').addEventListener('click', () => {
          state.syncMonitorFilters.platformId = $('#syncMonitorPlatformFilter').value;
          state.syncMonitorFilters.syncType = $('#syncMonitorTypeFilter').value;
          state.syncMonitorFilters.range = $('#syncMonitorRangeFilter').value;
          state.syncMonitorFilters.granularity = $('#syncMonitorGranularityFilter').value;
          renderSyncMonitor();
          showToast('同步监控筛选条件已更新');
        });

        $('#apiMonitorQueryButton').addEventListener('click', () => {
          state.apiMonitorFilters.platformId = $('#apiMonitorPlatformFilter').value;
          state.apiMonitorFilters.apiType = $('#apiMonitorTypeFilter').value;
          state.apiMonitorFilters.range = $('#apiMonitorRangeFilter').value;
          state.apiMonitorFilters.granularity = $('#apiMonitorGranularityFilter').value;
          state.apiMonitorRemote.queryKey = '';
          state.apiMonitorRemote.data = null;
          renderApiMonitor();
          showToast('接口调用监控筛选条件已更新');
        });

        $('#protocolMonitorQueryButton').addEventListener('click', () => {
          state.protocolMonitorFilters.platformId = $('#protocolMonitorPlatformFilter').value;
          state.protocolMonitorFilters.transformType = $('#protocolMonitorTypeFilter').value;
          state.protocolMonitorFilters.range = $('#protocolMonitorRangeFilter').value;
          state.protocolMonitorFilters.granularity = $('#protocolMonitorGranularityFilter').value;
          renderProtocolMonitor();
          showToast('协议转换监控筛选条件已更新');
        });

        $('#rtQueryButton').addEventListener('click', () => {
          state.responseMonitorFilters.platformId = $('#rtPlatformFilter').value;
          state.responseMonitorFilters.range = $('#rtRangeFilter').value;
          state.responseMonitorFilters.granularity = $('#rtGranularityFilter').value;
          renderResponseMonitor();
          showToast('响应监控筛选条件已更新');
        });

        $('#flowQueryButton').addEventListener('click', () => {
          state.flowMonitorFilters.platformId = $('#flowPlatformFilter').value;
          state.flowMonitorFilters.range = $('#flowRangeFilter').value;
          state.flowMonitorFilters.granularity = $('#flowGranularityFilter').value;
          renderFlowMonitor();
          showToast('流量监控筛选条件已更新');
        });

        $('#resetLogs').addEventListener('click', () => {
          state.logFilter = 'all';
          state.logPlatformId = '';
          state.logType = '调用日志';
          state.logApiCode = '';
          state.activeLogId = '';
          renderLogs();
        });

        $('#logTableBody').addEventListener('click', (event) => {
          const detailButton = event.target.closest('[data-log-action="detail"]');
          const row = event.target.closest('tr[data-log-id]');
          if (!row && !detailButton) return;
          state.activeLogId = detailButton ? detailButton.dataset.logId : row.dataset.logId;
          renderLogs();
          if (detailButton) {
            openLogDetailDrawer(state.activeLogId);
          }
        });

        document.body.addEventListener('click', (event) => {
          const logApiButton = event.target.closest('[data-open-log-api]');
          if (!logApiButton) return;
          openLogsView({ type: '调用日志', apiCode: logApiButton.dataset.openLogApi });
          showToast('已按 API 打开调用日志：' + logApiButton.dataset.openLogApi);
        });

        $('#closeDrawer').addEventListener('click', closeDrawer);
        $('#closeDrawerMobile').addEventListener('click', closeDrawer);
        $('#overlay').addEventListener('click', closeDrawer);
      }

      bindTabs();
      bindEvents();
      setWizardStep(1);
      renderAll();

      window.__extNavigate = function(section, opts) {
        const options = opts || {};
        if (!section) return;
        if (section === 'mapping' && options.mappingPanel) {
          state.mappingPanel = options.mappingPanel;
        }
        setSection(section);
        if (section === 'mapping' && options.mappingPanel) {
          renderMappingSidebarNavigation();
        }
        if (options.monitorTab) {
          activateTab('monitor-tabs', options.monitorTab);
        }
      };

  })();
  };
})();
