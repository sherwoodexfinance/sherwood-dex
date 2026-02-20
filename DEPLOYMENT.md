# 🏹 Sherwood DEX - Deployment Summary

## ✅ Smart Contracts Deployed

**Network:** Robinhood Chain Testnet (Chain ID: 46630)

| Contract | Address |
|----------|---------|
| SherwoodFactory | `0x75181dD85c7F2beBA5e
[truncated]b38` |
| SherwoodRouter02 | `0xaC8697137a742733A
[truncated]0e8a61` |
| WOOD Token | `0xd2c95208d856B6
[truncated]D2D1` |
| WETH | `0x3Fe1D93f8C8c09
[truncated]f93` |

## 📁 Project Structure

```
sherwood/
├── contracts/          # Hardhat project
│   ├── contracts/      # Solidity contracts
│   ├── scripts/        # Deployment scripts
│   └── test/           # Test files
├── frontend/           # React + Vite + TypeScript
│   ├── src/
│   │   ├── components/ # SwapCard, PoolCard, Header
│   │   ├── hooks/      # useSwap, useLiquidity, usePairs
│   │   ├── config/     # Chain config, addresses
│   │   └── abis/       # Contract ABIs
│   └── dist/           # Built frontend
└── README.md
```

## 🚀 Deploy Frontend

### Option 1: Vercel (Recommended)
1. Go to https://vercel.com
2. Click "New Project"
3. Import: `https://github.com/sherwoodexfinance/sherwood-dex`
4. Framework Preset: Vite
5. Root Directory: `frontend`
6. Build Command: `npm run build`
7. Output Directory: `dist`
8. Click Deploy

### Option 2: Netlify
1. Go to https://netlify.com
2. Click "Add new site" → "Import an existing project"
3. Connect GitHub and select `sherwood-dex`
4. Build command: `cd frontend && npm install && npm run build`
5. Publish directory: `frontend/dist`
6. Click Deploy

## 🧪 Testing

```bash
cd contracts
npx hardhat test
```

## 📝 Get Testnet ETH

Use the Robinhood Chain Testnet Faucet:
https://faucet.testnet.chain.robinhood.com

## 🔗 Links

- **GitHub:** https://github.com/sherwoodexfinance/sherwood-dex
- **Explorer:** https://explorer.testnet.chain.robinhood.com

## 🎯 Features

- ✅ Swap tokens (Uniswap V2-style AMM)
- ✅ Add/Remove liquidity
- ✅ View all trading pairs
- ✅ Wallet connection (RainbowKit)
- ✅ Dark theme UI
- ✅ Responsive design

---
🏹 "Take from the whales, give to the people"
