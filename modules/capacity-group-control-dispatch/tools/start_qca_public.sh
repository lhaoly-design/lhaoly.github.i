#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
WEB_ROOT="$(cd "${ROOT_DIR}/.." && pwd)"
cd "$ROOT_DIR"

PORT="${QCA_PORT:-8099}"
LOCAL_URL="http://localhost:${PORT}"

if command -v python3 >/dev/null 2>&1; then
  PY=python3
elif command -v python >/dev/null 2>&1; then
  PY=python
else
  echo "Python not found. Please install Python 3." >&2
  exit 1
fi

CLOUDFLARED_BIN=""
if command -v cloudflared >/dev/null 2>&1; then
  CLOUDFLARED_BIN="cloudflared"
else
  # Download cloudflared to local .bin if missing
  BIN_DIR="${ROOT_DIR}/.bin"
  mkdir -p "$BIN_DIR"
  ARCH="$(uname -m)"
  OS="$(uname -s | tr '[:upper:]' '[:lower:]')"
  if [ "$OS" = "darwin" ]; then
    if [ "$ARCH" = "arm64" ]; then
      URL="https://github.com/cloudflare/cloudflared/releases/latest/download/cloudflared-darwin-arm64.tgz"
    else
      URL="https://github.com/cloudflare/cloudflared/releases/latest/download/cloudflared-darwin-amd64.tgz"
    fi
    curl -L "$URL" | tar -xz -C "$BIN_DIR"
    CLOUDFLARED_BIN="${BIN_DIR}/cloudflared"
  elif [ "$OS" = "linux" ]; then
    if [ "$ARCH" = "aarch64" ] || [ "$ARCH" = "arm64" ]; then
      URL="https://github.com/cloudflare/cloudflared/releases/latest/download/cloudflared-linux-arm64"
    else
      URL="https://github.com/cloudflare/cloudflared/releases/latest/download/cloudflared-linux-amd64"
    fi
    curl -L -o "${BIN_DIR}/cloudflared" "$URL"
    chmod +x "${BIN_DIR}/cloudflared"
    CLOUDFLARED_BIN="${BIN_DIR}/cloudflared"
  else
    echo "Unsupported OS for auto-download. Please install cloudflared manually." >&2
    exit 1
  fi
fi

cleanup() {
  if [ -n "${SERVER_PID:-}" ]; then
    kill "$SERVER_PID" >/dev/null 2>&1 || true
  fi
}
trap cleanup EXIT

echo "Starting QCA server at ${LOCAL_URL}"
QCA_ROOT="$WEB_ROOT" "$PY" qca_server.py &
SERVER_PID=$!

sleep 0.6

echo "Starting public tunnel (Cloudflare Quick Tunnel)..."
"$CLOUDFLARED_BIN" tunnel --url "$LOCAL_URL"
