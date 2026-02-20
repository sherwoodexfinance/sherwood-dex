// Deployed contract addresses on Robinhood Chain Testnet (Chain ID: 46630)
// DEPLOYED: 2026-02-20

export const ADDRESSES = {
  FACTORY: '0xff6028E46364D8e691f5389C522F53133c0f1917',
  ROUTER: '0x0Cb47D1A9Fa3028eCC12Dd4688ABdE313A7a194e',
  WETH: '0x948E15C33F3e32df7673464ad64DF3b649b928ce',
  WOOD: '0x08F5FEeA797B3eAE564aAACeadDA36e4c123Ce5C',
  PAIR: '0x6686EF39a51e22271f75f53B525Dcd2a974d13CA', // WOOD/WETH pair
};

// INIT_CODE_HASH for CREATE2 address derivation
export const INIT_CODE_HASH = '0x533f506a32c546c3ec712ddf66d70647dfb421e0fe45e325e3cce69455ae8a61';

export const CHAIN = {
  id: 46630,
  name: 'Robinhood Chain Testnet',
  nativeCurrency: {
    name: 'ETH',
    symbol: 'ETH',
    decimals: 18,
  },
  rpcUrls: {
    default: { http: ['https://rpc.testnet.chain.robinhood.com'] },
  },
  blockExplorers: {
    default: { name: 'Robinhood Explorer', url: 'https://explorer.testnet.chain.robinhood.com' },
  },
};
