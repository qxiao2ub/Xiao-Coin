# Troubleshooting

## MetaMask shows Base but not Base Sepolia

Enable test networks and add Base Sepolia if necessary. Verify chain ID 84532.
The account/address selector is not always the network selector in newer wallet UI.

## Faucet says success but the wallet shows zero

Check the transaction hash on the Base Sepolia explorer. Confirm recipient address,
chain ID, and transaction status. A balance on Ethereum Sepolia is separate from
Base Sepolia even though the wallet address is identical.

## Faucet requires 0.001 mainnet ETH

That is a provider anti-abuse rule, not a Base protocol requirement. Use another
currently listed Base Sepolia faucet rather than buying mainnet ETH only to satisfy
one faucet.

## Remix displays `Sepolia (11155111)`

That is Ethereum Sepolia. Cancel if the intended network is Base Sepolia. The
correct Base Sepolia chain ID is 84532.

## Remix transfer reverts with ERC20InsufficientBalance

The caller has no XIAO or less than the requested base-unit amount. Check
`balanceOf(caller)`. In Remix VM, a MetaMask address is not automatically one of
Remix VM's signing accounts.

## Remix VM treasury cannot send

If tokens were minted to a MetaMask address while deploying inside Remix VM,
Remix knows the balance but does not have that MetaMask private key. Redeploy in
Remix VM with one of the listed Remix accounts as treasury, or deploy through the
MetaMask Browser Extension environment on Base Sepolia.

## Gas estimation fails

Do not force-send. Check:

- correct chain and gas-token balance;
- valid nonzero treasury;
- compiler and EVM target;
- current RPC status;
- whether the exact bytecode deploys locally;
- wallet and RPC simulation details.

## MetaMask says insufficient funds

The connected account lacks the native gas token on the selected network. For
Base Sepolia, it needs Base Sepolia test ETH. XIAO cannot pay deployment gas.

## npm install fails

Check Node and npm versions, internet access, proxy settings, and the public npm
registry. Delete a partially created `node_modules` directory only after preserving
any local changes, then retry. Do not disable TLS verification.

## Hardhat asks for a configuration variable

Store it in the encrypted keystore:

```bash
npx hardhat keystore set BASE_SEPOLIA_DEPLOYER_PRIVATE_KEY
```

## Dashboard says no bytecode

The contract address may be wrong, or the wallet/RPC may be on the wrong network.
Confirm the address on the Base Sepolia explorer.
