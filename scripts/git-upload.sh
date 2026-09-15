#!/usr/bin/env bash
set -euo pipefail
if [ "$#" -ne 1 ]; then echo "Usage: bash scripts/git-upload.sh https://github.com/USER/Xiao-Coin.git"; exit 1; fi
remote="$1"
npm run check
git init
git add .
if ! git diff --cached --quiet; then git commit -m "Publish official Xiao-Coin repository"; fi
git branch -M main
if git remote get-url origin >/dev/null 2>&1; then git remote set-url origin "$remote"; else git remote add origin "$remote"; fi
git push -u origin main
