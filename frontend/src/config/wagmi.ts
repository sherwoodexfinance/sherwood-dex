import { http, createConfig } from 'wagmi';
import { robinhoodTestnet } from './chains';

export const config = createConfig({
  chains: [robinhoodTestnet],
  transports: {
    [robinhoodTestnet.id]: http(),
  },
});
