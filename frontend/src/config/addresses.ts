// Deployed contract addresses on Robinhood Chain Testnet (Chain ID: 46630)
export const ADDRESSES = {
  FACTORY: '0x9755D7DE23d3fBdF40Df84b1C78Ff5Ff9E1f2C58',
  ROUTER: '0xe345e3cce69455ae8a61fE4cB8C8d8b8b7c8d9e0',
  WETH: '0xB4FBF271143F4FBf7B91A5ded31805e42D220A0d',
  WOOD: '0xd8b8b7c8d9e0e345e3cce69455ae8a61fE4cB8C8',
};

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

// INIT_CODE_HASH for CREATE2 address derivation
export const INIT_CODE_HASH = '0x...'; // Will be computed from deployed pair contract
