import { useReadContract, useReadContracts } from 'wagmi';
import { FACTORY_ABI, PAIR_ABI, ERC20_ABI } from '../abis';
import { ADDRESSES } from '../config/addresses';

export function usePairs() {
  const { data: pairsLength, isLoading } = useReadContract({
    address: ADDRESSES.FACTORY as `0x${string}`,
    abi: FACTORY_ABI,
    functionName: 'allPairsLength',
  });

  const pairCount = pairsLength ? Number(pairsLength) : 0;

  // Note: In production, you'd fetch all pairs using multicall
  // For now, we return the count and individual pair fetching is done separately

  return {
    pairCount,
    isLoading,
  };
}

export function usePair(tokenA: `0x${string}`, tokenB: `0x${string}`) {
  const { data: pairAddress, isLoading } = useReadContract({
    address: ADDRESSES.FACTORY as `0x${string}`,
    abi: FACTORY_ABI,
    functionName: 'getPair',
    args: [tokenA, tokenB],
  });

  return {
    pairAddress: pairAddress as `0x${string}` | undefined,
    isLoading,
  };
}

export function useReserves(pairAddress: `0x${string}` | undefined) {
  const { data, isLoading, refetch } = useReadContract({
    address: pairAddress,
    abi: PAIR_ABI,
    functionName: 'getReserves',
    query: {
      enabled: !!pairAddress && pairAddress !== '0x0000000000000000000000000000000000000000',
    },
  });

  return {
    reserve0: data?.[0],
    reserve1: data?.[1],
    timestamp: data?.[2],
    isLoading,
    refetch,
  };
}

export function useTokenInfo(tokenAddress: `0x${string}` | undefined) {
  const { data, isLoading } = useReadContracts({
    contracts: [
      {
        address: tokenAddress,
        abi: ERC20_ABI,
        functionName: 'symbol',
      },
      {
        address: tokenAddress,
        abi: ERC20_ABI,
        functionName: 'name',
      },
      {
        address: tokenAddress,
        abi: ERC20_ABI,
        functionName: 'decimals',
      },
      {
        address: tokenAddress,
        abi: ERC20_ABI,
        functionName: 'totalSupply',
      },
    ],
    query: {
      enabled: !!tokenAddress,
    },
  });

  return {
    symbol: data?.[0]?.result as string | undefined,
    name: data?.[1]?.result as string | undefined,
    decimals: data?.[2]?.result as number | undefined,
    totalSupply: data?.[3]?.result as bigint | undefined,
    isLoading,
  };
}

export function useTokenBalance(tokenAddress: `0x${string}`, userAddress: `0x${string}` | undefined) {
  const { data, isLoading, refetch } = useReadContract({
    address: tokenAddress,
    abi: ERC20_ABI,
    functionName: 'balanceOf',
    args: [userAddress],
    query: {
      enabled: !!userAddress,
    },
  });

  return {
    balance: data,
    isLoading,
    refetch,
  };
}
