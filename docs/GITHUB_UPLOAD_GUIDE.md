# Upload to GitHub

## 1. Create the remote repository

On GitHub, create an empty public or private repository named `Xiao-Coin`. Do not
initialize it with another README, license, or `.gitignore`, because those files
already exist locally.

## 2. Extract and open Git Bash

Extract the ZIP, open Git Bash, and move into the repository folder. Example:

```bash
cd "/c/Users/YOUR_NAME/Downloads/Xiao-Coin"
```

## 3. Review before upload

```bash
npm install
npm run check:static
git status
```

Do not upload `node_modules`, keystore data, private keys, recovery phrases, or
non-example deployment parameter files. The included `.gitignore` blocks common cases.

## 4. Initialize and push

```bash
git init
git add .
git commit -m "Initial Xiao Coin repository"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/Xiao-Coin.git
git push -u origin main
```

Or use:

```bash
bash scripts/git-upload.sh https://github.com/YOUR_USERNAME/Xiao-Coin.git
```

## 5. Enable repository features

- Enable private vulnerability reporting under Security settings.
- Require pull-request checks before merging to `main` when collaborators join.
- Enable GitHub Pages with GitHub Actions as the source after configuring the contract address.
- Enable Dependabot and dependency review.
- Protect release tags and review Actions permissions.

## 6. After first npm install

Commit `package-lock.json`:

```bash
git add package-lock.json
git commit -m "Lock npm dependencies"
git push
```

## Replacing repository contents later

From the correct local folder:

```bash
git add -A
git commit -m "Update Xiao Coin repository"
git push origin main
```

Always run `pwd` and `git status` first so you do not push the wrong directory.
