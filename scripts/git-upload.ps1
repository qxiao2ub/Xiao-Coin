param(
  [Parameter(Mandatory = $true)]
  [string]$RemoteUrl
)

$ErrorActionPreference = "Stop"

if (-not (Get-Command git -ErrorAction SilentlyContinue)) {
  throw "Git is not installed or is not available on PATH."
}

$userName = git config --get user.name
$userEmail = git config --get user.email
if (-not $userName -or -not $userEmail) {
  throw @"
Git author identity is not configured. Run these commands once, then rerun this script:

  git config --global user.name "Your Name"
  git config --global user.email "you@example.com"
"@
}

if (-not (Test-Path ".git")) {
  git init
}

git add -A
git diff --cached --quiet
if ($LASTEXITCODE -ne 0) {
  git commit -m "Initial Xiao Coin repository"
} else {
  Write-Host "No new staged changes; continuing with the current commit."
}

git branch -M main

$origin = git remote get-url origin 2>$null
if ($LASTEXITCODE -eq 0) {
  git remote set-url origin $RemoteUrl
} else {
  git remote add origin $RemoteUrl
}

Write-Host "Pushing main to $RemoteUrl"
git push -u origin main
