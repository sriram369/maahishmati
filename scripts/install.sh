#!/usr/bin/env sh
set -eu

REPO="${MAAHISHMATI_REPO:-sriram369/maahishmati}"

if ! command -v node >/dev/null 2>&1; then
  echo "Maahishmati needs Node.js 20+." >&2
  echo "Install Node first: https://nodejs.org" >&2
  exit 1
fi

if ! command -v npm >/dev/null 2>&1; then
  echo "Maahishmati needs npm." >&2
  exit 1
fi

echo "Installing Maahishmati from github:${REPO}..."
npm install -g "github:${REPO}"

echo
echo "Maahishmati installed."
echo "Try:"
echo "  bahubali"
echo "  bahubali run \"build a calculator app\""
echo "  bahubali thinking"
