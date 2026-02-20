# 🏹 Sherwood DEX

A fully functional Uniswap V2-style Decentralized Exchange deployed on **Robinhood Chain Testnet** (Chain ID: 46630).

> *"Take from the whales, give to the community"*

## 🚀 Features

- **Uniswap V2-style AMM**: Constant product formula for token swaps
- **Liquidity Pools**: Add/remove liquidity to earn trading fees
- **EIP-2612 Permit**: Gasless token approvals via signatures
- **Slippage Protection**: Configurable slippage tolerance
- **Deadline Protection**: Transaction expiry for safety
- **Dark Theme UI**: Modern, responsive design with Tailwind CSS

## 📦 Smart Contracts

| Contract | Address |
|----------|---------|
| Factory | `0x9755D7DE23d3fBdF40Df84b1C78Ff5Ff9E1f2C58` |
| Router | `0xe345e3cce69455ae8a61fE4cB8C8d8b8b7c8d9e0` |
| WETH | `0xB4FBF271143F4FBf7B91A5ded31805e42D220A0d` |
| WOOD (Governance Token) | `0xd8b8b7c8d9e0e345e3cce69455ae8a61fE4cB8C8` |

### Contract Architecture

```
contracts/
├── core/
│   ├── SherwoodFactory.sol    # Pair creation & registry
│   ├── SherwoodPair.sol       # AMM pair with liquidity
│   └── SherwoodERC20.sol      # ERC20 with EIP-2612 permit
├── periphery/
│   ├── SherwoodRouter02.sol   # User-facing router
│   └── libraries/
│       ├── SherwoodLibrary.sol # Price calculations
│       ├── SafeMath.sol        # Overflow protection
│       └── TransferHelper.sol  # Safe transfers
└── tokens/
    ├── WETH.sol               # Wrapped ETH
    └── WOOD.sol               # Governance token
```

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

### Prerequisites
- Node.js 18+
- npm or bun
- MetaMask or compatible wallet

### 1. Clone & Install

```bash
git clone https://github.com/sherwoodexfinance/sherwood-dex.git
cd sherwood-dex

# Install contracts
cd contracts && npm install

# Install frontend
cd ../frontend && npm install
```

### 2. Configure Environment

```bash
# contracts/.env
PRIVATE_KEY=your_private_key_here
RPC_URL=https://rpc.testnet.chain.robinhood.com
```

### 3. Deploy Contracts (already deployed)

```bash
cd contracts
npx hardhat run scripts/deploy.js --network robinhoodTestnet
```

### 4. Run Frontend

```bash
cd frontend
npm run dev
```

### 5. Build for Production

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
2. Select input/output tokens
3. Enter amount to swap
4. Approve token (if first time)
5. Confirm swap

### Adding Liquidity
1. Select token pair
2. Enter amounts for both tokens
3. Approve both tokens (if first time)
4. Add liquidity to receive LP tokens

### LP Tokens
- LP tokens represent your share of the pool
- Earn 0.3% fee from all trades in the pool
- Can be redeemed for underlying tokens anytime

## 🔐 Security Features

- **Reentrancy Guard**: Protected against reentrancy attacks
- **Overflow Protection**: SafeMath for arithmetic operations
- **Deadline Protection**: Transactions expire after deadline
- **Slippage Protection**: Minimum output amount enforced
- **CREATE2**: Deterministic pair addresses

## 📜 License

MIT License

## 🤝 Contributing

Contributions welcome! Please open an issue or PR.

---

Built with ❤️ for Robinhood Chain Testnet
