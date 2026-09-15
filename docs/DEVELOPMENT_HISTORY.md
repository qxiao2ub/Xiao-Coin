# Development history

## Version 0.1.0 — standalone ERC-20 prototype

The attached predecessor repository described a custom fixed-supply ERC-20 contract,
Hardhat deployment tooling, Base Sepolia testing, and a prototype wallet dashboard.
It intentionally did not claim a mainnet launch.

## Version 1.0.0 — official Base.meme launch repository

The official Xiao-Coin now exists at:

`0xc62792b29E6aDbc179e47DAfCe159119bb918888`

It was created through Base.meme rather than by deploying the predecessor repository's
`XiaoCoin.sol`. Consequently:

- the old Solidity file is **not** presented as the official contract source;
- old Hardhat deployment scripts were removed to avoid creating a second conflicting XIAO;
- the web application now targets Base Mainnet and the official address;
- documentation now explains the Base.meme bonding curve, V4 path, canonical links,
  creator-allocation model, and meme-coin risks.

Historical prototype code should not be used to verify, recreate, migrate, or replace
the official token.
