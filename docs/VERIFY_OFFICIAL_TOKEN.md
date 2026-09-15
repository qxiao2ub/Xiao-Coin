# Verify the official token

## Canonical values

```text
Network: Base Mainnet
Chain ID: 8453
Contract: 0xc62792b29E6aDbc179e47DAfCe159119bb918888
Name: Xiao-Coin
Symbol: XIAO
```

## Verification checklist

- Open the official Base.meme page from a trusted bookmark.
- Open the BaseScan token page and compare all 42 address characters.
- Confirm deployed bytecode exists at the address.
- Read the onchain name, symbol, decimals, and total supply.
- Review holders and transfers independently.
- Confirm the wallet is on Base, not Base Sepolia, Ethereum, or Ethereum Sepolia.
- Never identify a token only from a logo, symbol, search result, or QR code.

## Machine-readable files

The canonical address is repeated in:

- `CONTRACT_ADDRESS.txt`
- `metadata/token.json`
- `metadata/project.json`
- `web/config.js`

`npm run check` fails when these values disagree.
