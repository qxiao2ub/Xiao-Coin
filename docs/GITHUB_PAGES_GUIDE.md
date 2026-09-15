# GitHub Pages deployment guide

## Upload

1. Create an empty GitHub repository.
2. Extract this ZIP and open a terminal in the repository root.
3. Run the included upload helper or normal Git commands.

```bash
git init
git add .
git commit -m "Publish official Xiao-Coin repository"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/Xiao-Coin.git
git push -u origin main
```

## Enable Pages

1. Open the GitHub repository.
2. Go to **Settings → Pages**.
3. Select **GitHub Actions** as the source.
4. Open **Actions** and confirm the `Deploy Xiao-Coin website` workflow succeeds.

## Test before sharing

- Confirm the logo loads.
- Test the Base.meme and BaseScan buttons.
- Copy and compare the full contract address.
- Connect a test wallet and confirm the site requests Base Mainnet, chain ID 8453.
- Confirm no buy, transfer, approval, or signature request occurs on this site.
- Run `npm run check` after every content change.

## Custom domain

A custom domain is optional. Configure it in GitHub Pages only after controlling the
DNS account securely. Enable HTTPS and keep renewal/account recovery information safe.
