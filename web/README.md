# Static XIAO dashboard

This folder is deployable directly with GitHub Pages. It has no backend and no
custodial key storage. It uses the wallet provider injected by MetaMask and the
Ethers browser bundle loaded from a pinned CDN URL.

## Configure after a Base Sepolia deployment

```bash
npm run web:configure -- --address 0xYOUR_DEPLOYED_CONTRACT
```

Commit the updated `web/config.js`, then enable GitHub Pages with GitHub Actions
as the source. The included workflow publishes only this folder.

The dashboard intentionally supports a narrow set of actions:

- connect an injected wallet;
- switch/add Base Sepolia;
- confirm deployed bytecode exists;
- read ERC-20 metadata, supply, and balance;
- request that the wallet display XIAO;
- send a standard `transfer` transaction after a second human confirmation.

It contains no swap, sale, staking, yield, price, or investment-return feature.
