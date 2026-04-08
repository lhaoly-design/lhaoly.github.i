#!/usr/bin/env python3
import json
import os
from http.server import ThreadingHTTPServer, SimpleHTTPRequestHandler

SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
SERVER_ROOT = os.environ.get("QCA_ROOT") or SCRIPT_DIR
DATA_FILE = os.path.join(SCRIPT_DIR, "qca_requests.json")

class QcaHandler(SimpleHTTPRequestHandler):
    def _send_json(self, status, payload):
        body = json.dumps(payload, ensure_ascii=False).encode("utf-8")
        self.send_response(status)
        self.send_header("Content-Type", "application/json; charset=utf-8")
        self.send_header("Content-Length", str(len(body)))
        self.end_headers()
        self.wfile.write(body)

    def _send_index(self):
        html = """<!doctype html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <title>群控群调入口</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif; margin: 24px; color: #1f2d3d; }
    h1 { font-size: 20px; margin: 0 0 12px; }
    ul { padding-left: 18px; }
    a { color: #1d5eb8; text-decoration: none; }
    a:hover { text-decoration: underline; }
    .hint { margin-top: 12px; font-size: 12px; color: #5d6b7b; }
  </style>
</head>
<body>
  <h1>群控群调页面入口</h1>
  <ul>
    <li><a href="/%E4%BE%9B%E7%94%B5%E5%B1%80%E7%AB%AF.html">供电局端</a></li>
    <li><a href="/%E8%BF%90%E8%90%A5%E7%AB%AF.html">运营端</a></li>
    <li><a href="/%E4%B8%9A%E4%B8%BB%E7%AB%AF.html">业主端</a></li>
  </ul>
  <div class="hint">如需修改端口，可设置环境变量 QCA_PORT。</div>
</body>
</html>
"""
        body = html.encode("utf-8")
        self.send_response(200)
        self.send_header("Content-Type", "text/html; charset=utf-8")
        self.send_header("Content-Length", str(len(body)))
        self.end_headers()
        self.wfile.write(body)

    def do_GET(self):
        if self.path == "/" or self.path.startswith("/index.html"):
            index_path = os.path.join(SERVER_ROOT, "index.html")
            if os.path.exists(index_path):
                return super().do_GET()
            self._send_index()
            return
        if self.path.startswith("/api/qca-requests"):
            try:
                if os.path.exists(DATA_FILE):
                    with open(DATA_FILE, "r", encoding="utf-8") as f:
                        data = json.load(f)
                    if not isinstance(data, list):
                        data = []
                else:
                    data = []
            except Exception:
                data = []
            self._send_json(200, data)
            return
        super().do_GET()

    def do_POST(self):
        if self.path.startswith("/api/qca-requests"):
            try:
                length = int(self.headers.get("Content-Length", "0"))
                raw = self.rfile.read(length) if length > 0 else b""
                payload = json.loads(raw.decode("utf-8") or "[]")
                if not isinstance(payload, list):
                    payload = []
                with open(DATA_FILE, "w", encoding="utf-8") as f:
                    json.dump(payload, f, ensure_ascii=False, indent=2)
                self._send_json(200, {"ok": True, "count": len(payload)})
            except Exception as exc:
                self._send_json(400, {"ok": False, "error": str(exc)})
            return
        self.send_response(404)
        self.end_headers()


if __name__ == "__main__":
    os.chdir(SERVER_ROOT)
    port = int(os.environ.get("QCA_PORT", "8099"))
    server = ThreadingHTTPServer(("0.0.0.0", port), QcaHandler)
    print(f"QCA server running at http://localhost:{port}")
    server.serve_forever()
