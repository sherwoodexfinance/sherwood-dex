# 🏹 Sherwood DEX

A fully functional Uniswap V2-style Decentralized Exchange deployed on **Robinhood Chain Testnet** (Chain ID: 46630).

> *"Take from the whales, give to the community"*

## 🚀 Live Deployment

**Frontend**: Deploy on Netlify/Vercel from GitHub

**Network**: Robinhood Chain Testnet (Chain ID: 46630)

## 📦 Deployed Contracts

| Contract | Address |
|----------|---------|
| **Factory** | [`0xff6028E46364D8e691f5389C522F53133c0f1917`](https://explorer.testnet.chain.robinhood.com/address/0xff6028E46364D8e691f5389C522F53133c0f1917) |
| **Router** | [`0x0Cb47D1A9Fa3028eCC12Dd4688ABdE313A7a194e`](https://explorer.testnet.chain.robinhood.com/address/0x0Cb47D1A9Fa3028eCC12Dd4688ABdE313A7a194e) |
| **WETH** | [`0x948E15C33F3e32df7673464ad64DF3b649b928ce`](https://explorer.testnet.chain.robinhood.com/address/0x948E15C33F3e32df7673464ad64DF3b649b928ce) |
| **WOOD** | [`0x08F5FEeA797B3eAE564aAACeadDA36e4c123Ce5C`](https://explorer.testnet.chain.robinhood.com/address/0x08F5FEeA797B3eAE564aAACeadDA36e4c123Ce5C) |
| **WOOD/WETH Pair** | [`0x6686EF39a51e22271f75f53B525Dcd2a974d13CA`](https://explorer.testnet.chain.robinhood.com/address/0x6686EF39a51e22271f75f53B525Dcd2a974d13CA) |

### Pool Reserves
- **WOOD**: 1,000 WOOD
- **WETH**: 0.008 WETH
- **Price**: 1 WOOD ≈ 0.000008 ETH

## 🚀 Features

- **Uniswap V2-style AMM**: Constant product formula for token swaps
- **Liquidity Pools**: Add/remove liquidity to earn trading fees
- **EIP-2612 Permit**: Gasless token approvals via signatures
- **Slippage Protection**: Configurable slippage tolerance
- **Deadline Protection**: Transaction expiry for safety
- **Dark Theme UI**: Modern, responsive design with Tailwind CSS

## 🛠️ Tech Stack

### Smart Contracts
- Solidity ^0.8.20
- Hardhat
- OpenZeppelin
- Ethers.js v6

### Frontend
- React 18
- TypeScript
- Vite
- Tailwind CSS
- Wagmi v2
- Viem
- RainbowKit

## 🏃 Quick Start

### 1. Clone & Install

```bash
git clone https://github.com/sherwoodexfinance/sherwood-dex.git
cd sherwood-dex

# Install contracts
cd contracts && npm install

# Install frontend
cd ../frontend && npm install
```

### 2. Run Frontend

```bash
cd frontend
npm run dev
```

### 3. Build for Production

```bash
cd frontend
npm run build
```

## 🔗 Network Configuration

Add Robinhood Chain Testnet to your wallet:

| Parameter | Value |
|-----------|-------|
| Network Name | Robinhood Chain Testnet |
| RPC URL | https://rpc.testnet.chain.robinhood.com |
| Chain ID | 46630 |
| Currency Symbol | ETH |
| Block Explorer | https://explorer.testnet.chain.robinhood.com |

### Get Testnet ETH
Visit the [Robinhood Chain Faucet](https://faucet.testnet.chain.robinhood.com) to get testnet tokens.

## 📊 How It Works

### Swapping Tokens
1. Connect wallet
2. Select input/output tokens (WETH or WOOD)
3. Enter amount to swap
4. Approve token (if first time)
5. Confirm swap

### Adding Liquidity
1. Go to Pool tab
2. Enter amounts for both tokens
3. Approve both tokens (if first time)
4. Add liquidity to receive LP tokens

## 🔐 Security Features

- **Reentrancy Guard**: Protected against reentrancy attacks
- **Overflow Protection**: SafeMath for arithmetic operations
- **Deadline Protection**: Transactions expire after deadline
- **Slippage Protection**: Minimum output amount enforced
- **CREATE2**: Deterministic pair addresses

## 📜 License

MIT License

---

Built with ❤️ for Robinhood Chain Testnet

🏹 *"Take from the whales, give to the people"*
