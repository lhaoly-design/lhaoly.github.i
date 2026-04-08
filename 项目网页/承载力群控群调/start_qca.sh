#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$ROOT_DIR"

PORT="${QCA_PORT:-8099}"
QCA_ROOT="${QCA_ROOT:-"$(cd "$ROOT_DIR/.." && pwd)"}"
export QCA_ROOT

if command -v python3 >/dev/null 2>&1; then
  PY=python3
elif command -v python >/dev/null 2>&1; then
  PY=python
else
  echo "Python not found. Please install Python 3." >&2
  exit 1
fi

echo "Starting QCA server at http://localhost:${PORT}"
echo "Serving root: ${QCA_ROOT}"
echo "Open in browser: http://localhost:${PORT}/index.html"
"$PY" qca_server.py
