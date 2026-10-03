#!/usr/bin/env bash
cd "$(dirname "$0")"
[ -d node_modules ] || { echo "Installing dependencies..."; npm install; }
echo "Starting Campus Canteen at http://localhost:5173"
npm run dev -- --open
