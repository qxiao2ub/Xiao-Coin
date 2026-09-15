# Start here

This repository is the public information and GitHub Pages package for the live
Xiao-Coin ($XIAO) created through Base.meme.

## 1. Verify the canonical identity

- Network: Base Mainnet
- Chain ID: `8453`
- Contract: `0xc62792b29E6aDbc179e47DAfCe159119bb918888`
- Base.meme page: https://base.meme/coin/base:0xc62792b29E6aDbc179e47DAfCe159119bb918888
- BaseScan: https://basescan.org/token/0xc62792b29E6aDbc179e47DAfCe159119bb918888

Do not upload or publish the repository until you have independently compared the
full address on the launch page and BaseScan.

## 2. Run the repository checks

```bash
node --version
npm run check
```

There are no npm runtime dependencies. The check validates configuration, links,
required assets, PNG dimensions, canonical-address consistency, and common secret patterns.

## 3. Preview the website locally

From the repository root:

```bash
python -m http.server 8000 --directory web
```

Then open `http://localhost:8000` in a browser. Wallet features require MetaMask or
another EIP-1193-compatible browser wallet.

## 4. Upload to GitHub

Create an empty GitHub repository and run:

```bash
bash scripts/git-upload.sh https://github.com/YOUR_USERNAME/Xiao-Coin.git
```

PowerShell:

```powershell
.\scripts\git-upload.ps1 -RemoteUrl "https://github.com/YOUR_USERNAME/Xiao-Coin.git"
```

## 5. Enable GitHub Pages

Choose **Settings → Pages → GitHub Actions**. The included workflow publishes `web/`.

## Important distinction from repository v0.1.0

The earlier attached repository was a standalone fixed-supply ERC-20 development
prototype. The live official Xiao-Coin was created through Base.meme at a different
contract address. The old prototype deployment tools are intentionally not presented
as the source or deployment path for the official token. See `docs/DEVELOPMENT_HISTORY.md`.
