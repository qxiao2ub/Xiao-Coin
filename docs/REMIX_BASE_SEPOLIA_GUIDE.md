# Remix to Base Sepolia: detailed guide

This is the preferred first deployment method for a beginner because MetaMask
signs directly and the source repository never needs a private key.

## 1. Prepare a dedicated wallet

- Use a separate testnet account.
- Back up the wallet according to the wallet provider's guidance.
- Never enter a recovery phrase or private key into Remix, a faucet, a chat, or GitHub.

## 2. Confirm the correct network

Base Sepolia:

- Chain ID decimal: 84532.
- Chain ID hexadecimal: 0x14a34.
- Native gas token: test ETH.
- Public RPC: https://sepolia.base.org.

Ethereum Sepolia is a different test network with chain ID 11155111. A balance
on Ethereum Sepolia cannot pay Base Sepolia gas.

## 3. Obtain Base Sepolia test ETH

Use a faucet referenced by the current Base documentation. Faucet requirements
change. Some require account history or a small mainnet balance as anti-abuse
protection. Do not buy mainnet ETH solely because one faucet rejects your request;
try another listed provider.

Verify a faucet claim by checking the transaction hash and recipient address on
a Base Sepolia explorer. A website success message without an onchain transaction
is not proof of receipt.

## 4. Load the source into Remix

1. Open the official Remix website.
2. Create `contracts/XiaoCoin.sol`.
3. Copy the repository contract exactly.
4. Do not paste private keys or recovery phrases.

## 5. Compile

Recommended settings:

- Compiler: 0.8.34.
- Optimization: enabled.
- Runs: 200.
- EVM version: Cancun.

Compile `XiaoCoin.sol` and resolve every error before deployment.

## 6. Connect MetaMask

In Deploy & Run Transactions:

1. Set Environment to Browser Extension.
2. Select MetaMask.
3. Confirm Remix displays Base Sepolia and chain ID 84532.
4. Confirm the displayed account is the intended deployer.
5. Confirm the account has Base Sepolia test ETH.

Do not proceed when Remix shows:

- `Sepolia (11155111)`;
- Base mainnet `8453`;
- Ethereum mainnet `1`;
- Remix VM, when the intent is a public testnet deployment.

## 7. Constructor parameter

The single parameter is `treasury`.

- Enter a valid nonzero EVM address.
- For the simplest test, use the connected MetaMask account.
- Verify the full first and last characters, preferably on a second screen or device.
- Value must remain zero.
- Gas limit can remain automatic.

## 8. Review the wallet transaction

The transaction should be a contract deployment on Base Sepolia. A wallet may
show estimated changes as unavailable for a new contract. Read all warnings.
Insufficient funds means the wallet lacks Base Sepolia ETH, even if another network
shows a balance.

Do not force-send a transaction after gas simulation fails. Fix the network,
balance, compiler target, or constructor input first.

## 9. Record the result

After confirmation, save:

- chain ID;
- contract address;
- transaction hash;
- block number;
- deployer address;
- treasury address;
- compiler version and optimization settings;
- Git commit hash.

## 10. Verify and inspect

Verify the source on the explorer, then check:

- `name()` is `Xiao Coin`;
- `symbol()` is `XIAO`;
- `decimals()` is `18`;
- `totalSupply()` equals 1,000,000,000 times 10^18;
- `balanceOf(treasury)` initially equals the total supply;
- a small test transfer succeeds;
- total supply is unchanged by transfer.

## 11. Add the token to MetaMask

Use Import Token and the exact contract address. The symbol alone is not unique.
Adding an asset to the wallet changes only the display; it does not mint or transfer tokens.
