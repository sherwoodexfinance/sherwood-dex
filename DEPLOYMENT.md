# 🏹 Sherwood DEX - Deployment Summary

## ✅ Deployment Status: COMPLETE

**Deployed on**: February 20, 2026
**Network**: Robinhood Chain Testnet (Chain ID: 46630)
**Deployer**: `0x27d4BEE1c424BD2CFBa98e2A73464ad64DF3b649`

---

## 📋 Contract Addresses

| Contract | Address |
|----------|---------|
| **Factory** | `0xff6028E46364D8e691f5389C522F53133c0f1917` |
| **Router** | `0x0Cb47D1A9Fa3028eCC12Dd4688ABdE313A7a194e` |
| **WETH** | `0x948E15C33F3e32df7673464ad64DF3b649b928ce` |
| **WOOD** | `0x08F5FEeA797B3eAE564aAACeadDA36e4c123Ce5C` |
| **WOOD/WETH Pair** | `0x6686EF39a51e22271f75f53B525Dcd2a974d13CA` |

**INIT_CODE_HASH**: `0x533f506a32c546c3ec712ddf66d70647dfb421e0fe45e325e3cce69455ae8a61`

---

## 📊 Initial Pool

**WOOD/WETH Pool**:
- WOOD Reserve: 1,000 WOOD
- WETH Reserve: 0.008 WETH
- Initial Price: 1 WOOD = 0.000008 ETH

---

## 🔗 Explorer Links

- [Factory Contract](https://explorer.testnet.chain.robinhood.com/address/0xff6028E46364D8e691f5389C522F53133c0f1917)
- [Router Contract](https://explorer.testnet.chain.robinhood.com/address/0x0Cb47D1A9Fa3028eCC12Dd4688ABdE313A7a194e)
- [WETH Contract](https://explorer.testnet.chain.robinhood.com/address/0x948E15C33F3e32df7673464ad64DF3b649b928ce)
- [WOOD Token](https://explorer.testnet.chain.robinhood.com/address/0x08F5FEeA797B3eAE564aAACeadDA36e4c123Ce5C)
- [WOOD/WETH Pair](https://explorer.testnet.chain.robinhood.com/address/0x6686EF39a51e22271f75f53B525Dcd2a974d13CA)

---

## 🚀 Deploy Frontend

### Option 1: Netlify (Recommended)
1. Go to [netlify.com](https://netlify.com)
2. Click "Add new site" → "Import an existing project"
3. Connect GitHub → Select `sherwood-dex`
4. **Root Directory**: `frontend`
5. **Build Command**: `npm run build`
6. **Publish Directory**: `dist`
7. Click Deploy

### Option 2: Vercel
1. Go to [vercel.com](https://vercel.com)
2. Import GitHub project `sherwood-dex`
3. **Root Directory**: `frontend`
4. Deploy

---

## 🔧 Local Development

```bash
# Clone repo
git clone https://github.com/sherwoodexfinance/sherwood-dex.git
cd sherwood-dex

# Install frontend
cd frontend && npm install

# Run dev server
npm run dev
```

---

## 📝 Notes

- Pool is active with initial liquidity
- WOOD token has 100M total supply
- 0.3% trading fee on all swaps
- Testnet ETH available from faucet

---

🏹 *"Take from the whales, give to the people"*
