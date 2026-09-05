# Frequently asked questions

## Is XIAO a cryptocurrency?

Broadly, it is a crypto asset or crypto token. Technically, version 0.1.0 is an
ERC-20 token on an existing EVM chain, not a native coin with its own blockchain.

## Is XIAO a stablecoin?

No. It has no dollar peg, reserve, redemption promise, or stabilization mechanism.

## Does one billion tokens cost one billion dollars to create?

No. Supply is an integer in contract state. Deployment cost depends on gas, not
the number's claimed market value. Creating supply also does not create economic value.

## Can more XIAO be minted later?

Not by this contract. There is no public or privileged mint function after the
constructor. Anyone could deploy a separate counterfeit contract, which is why
the canonical address matters.

## Can the project freeze an address or reverse a transfer?

No. There is no blacklist, pause, clawback, or admin function.

## Why mint everything to a treasury?

It separates fixed supply creation from later distribution policy. For production,
the treasury should be a reviewed multisignature with transparent controls.

## Why use Base Sepolia first?

It is a public test environment for Base-compatible applications. Test ETH is
used for gas and is not intended to have monetary value.

## Can I deploy from Remix?

Yes. The detailed guide uses MetaMask Browser Extension so the private key stays
inside the wallet.

## Can I deploy from Hardhat?

Yes. Use a dedicated testnet key stored in Hardhat's encrypted keystore and run
the preflight first.

## Is the repository audited?

No independent audit is included. Use of OpenZeppelin and tests does not replace
an audit or guarantee safety.
