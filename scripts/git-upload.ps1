param([Parameter(Mandatory=$true)][string]$RemoteUrl)
$ErrorActionPreference = "Stop"
npm run check
git init
git add .
$staged = git diff --cached --name-only
if ($staged) { git commit -m "Publish official Xiao-Coin repository" }
git branch -M main
$origin = git remote get-url origin 2>$null
if ($LASTEXITCODE -eq 0) { git remote set-url origin $RemoteUrl } else { git remote add origin $RemoteUrl }
git push -u origin main
