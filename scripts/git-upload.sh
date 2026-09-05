#!/usr/bin/env bash
set -euo pipefail

if [ "$#" -ne 1 ]; then
  echo "Usage: bash scripts/git-upload.sh https://github.com/YOUR_USERNAME/Xiao-Coin.git"
  exit 1
fi

remote_url="$1"

if ! command -v git >/dev/null 2>&1; then
  echo "Git is not installed or is not available on PATH."
  exit 1
fi

if ! git config --get user.name >/dev/null || ! git config --get user.email >/dev/null; then
  cat <<'MESSAGE'
Git author identity is not configured. Run these commands once, then rerun this script:

  git config --global user.name "Your Name"
  git config --global user.email "you@example.com"
MESSAGE
  exit 1
fi

if [ ! -d .git ]; then
  git init
fi

git add -A
if ! git diff --cached --quiet; then
  git commit -m "Initial Xiao Coin repository"
else
  echo "No new staged changes; continuing with the current commit."
fi

git branch -M main

if git remote get-url origin >/dev/null 2>&1; then
  git remote set-url origin "$remote_url"
else
  git remote add origin "$remote_url"
fi

echo "Pushing main to $remote_url"
git push -u origin main
