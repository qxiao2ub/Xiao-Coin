# Security and scam prevention

## Never disclose

- seed phrase / recovery phrase;
- private key;
- wallet password;
- one-time verification codes;
- remote-access control of your computer.

## Common Xiao-Coin impersonation methods

- a different contract using the same name, ticker, or logo;
- fake Base.meme, BaseScan, airdrop, support, or claim pages;
- direct messages offering guaranteed returns or paid listing assistance;
- malicious token approvals or Permit signatures;
- fake “wallet validation” forms asking for recovery words;
- QR codes pointing to a different contract or network.

## Safe interaction sequence

1. Start from a saved official link.
2. Confirm the browser domain.
3. Confirm Base Mainnet / chain ID 8453.
4. Compare `0xc62792b29E6aDbc179e47DAfCe159119bb918888` character by character.
5. Read the wallet simulation and calldata summary.
6. Reject unexpected unlimited approvals, transfers, or network changes.
7. Check the transaction receipt on BaseScan.

## Website trust boundary

The included GitHub Pages site can read public chain data and optionally connect a
wallet to read its XIAO balance. It does not execute a buy or sell. The trade button
opens Base.meme in a new tab so the user can independently review the platform.
