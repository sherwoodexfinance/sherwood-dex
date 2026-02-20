# 🏹 Sherwood DEX - Deployment Summary

## Deployed Contracts (Robinhood Chain Testnet - Chain ID: 46630)

| Contract | Address |
|----------|---------|
| **Factory** | `0xff6028E46364D8e691f5389C522F53133c0f1917` |
| **Router** | `0x0Cb47D1A9Fa3028eCC12Dd4688ABdE313A7a194e` |
| **WETH** | `0x948E15C33F3e32df7673464ad64DF3b649b928ce` |
| **WOOD** | `0x08F5FEeA797B3eAE564aAACeadDA36e4c123Ce5C` |
| **WOOD/WETH Pair** | `0x6686EF39a51e22271f75f53B525Dcd2a974d13CA` |

**INIT_CODE_HASH:** `0x533f506a32c546c3ec712ddf66d70647dfb421e0fe45e325e3cce69455ae8a61`

## Pool Status

| Pool | Token0 | Token1 | Reserve0 | Reserve1 |
|------|--------|--------|----------|----------|
| WOOD/WETH | 1000 WOOD | 0.008 WETH | 1000.0 | 0.008 |

## Deploy Scripts

```bash
# Deploy contracts
cd contracts
npx hardhat run scripts/deploy.js --network robinhoodTestnet

# Setup pool (if needed)
npx hardhat run scripts/debug-pair.js --network robinhoodTestnet
```

## How to Add More Liquidity

1. Connect wallet to Robinhood Chain Testnet
2. Get testnet ETH from faucet
3. Use the Pool tab in the UI to add liquidity

## Network Config

```
Network: Robinhood Chain Testnet
Chain ID: 46630
RPC: https://rpc.testnet.chain.robinhood.com
Explorer: https://explorer.testnet.chain.robinhood.com
```

---

🏹 **"Take from the whales, give to the people"**
