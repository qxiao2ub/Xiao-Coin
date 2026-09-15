window.XIAO_CONFIG = Object.freeze({
  network: Object.freeze({
    name: "Base Mainnet",
    shortName: "Base",
    chainId: 8453,
    chainIdHex: "0x2105",
    rpcUrl: "https://mainnet.base.org",
    explorerUrl: "https://basescan.org",
    nativeCurrency: Object.freeze({ name: "Ether", symbol: "ETH", decimals: 18 }),
  }),
  token: Object.freeze({
    name: "Xiao-Coin",
    symbol: "XIAO",
    decimals: 18,
    totalSupply: "1000000000",
    contractAddress: "0xc62792b29E6aDbc179e47DAfCe159119bb918888",
    taxAtLaunch: "0%",
  }),
  links: Object.freeze({
    baseMeme: "https://base.meme/coin/base:0xc62792b29E6aDbc179e47DAfCe159119bb918888",
    baseScanToken: "https://basescan.org/token/0xc62792b29E6aDbc179e47DAfCe159119bb918888",
    baseScanAddress: "https://basescan.org/address/0xc62792b29E6aDbc179e47DAfCe159119bb918888",
  }),
  copy: Object.freeze({
    description: "Xiao-Coin ($XIAO) is a community-driven meme coin built on Base, bringing together internet culture, creativity, humor, and community participation. Small ideas, big community. XIAO is created for entertainment and community engagement, with no promise of profit or guaranteed value.",
    descriptionZh: "肖币（XIAO）是构建于 Base 网络、由社区驱动的 Meme Coin，汇聚互联网文化、创意、幽默和社区参与。小创意，大社区。XIAO 用于娱乐和社区互动，不承诺利润或任何保证价值。",
  }),
});
