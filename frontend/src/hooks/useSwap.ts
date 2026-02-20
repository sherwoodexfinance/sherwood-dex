import { useWriteContract, useReadContract, useAccount } from 'wagmi';
import { ROUTER_ABI, ERC20_ABI, PAIR_ABI } from '../abis';
import { ADDRESSES } from '../config/addresses';
import { useState, useCallback } from 'react';

export function useSwap() {
  const { address } = useAccount();
  const { writeContract, isPending, isSuccess, isError, error } = useWriteContract();
  const [approvalPending, setApprovalPending] = useState(false);

  const approve = useCallback(
    async (tokenAddress: `0x${string}`, amount: bigint) => {
      setApprovalPending(true);
      try {
        writeContract({
          address: tokenAddress,
          abi: ERC20_ABI,
          functionName: 'approve',
          args: [ADDRESSES.ROUTER as `0x${string}`, amount],
        });
      } finally {
        setApprovalPending(false);
      }
    },
    [writeContract]
  );

  const swapExactTokensForTokens = useCallback(
    (
      amountIn: bigint,
      amountOutMin: bigint,
      path: `0x${string}`[],
      deadline: bigint
    ) => {
      writeContract({
        address: ADDRESSES.ROUTER as `0x${string}`,
        abi: ROUTER_ABI,
        functionName: 'swapExactTokensForTokens',
        args: [amountIn, amountOutMin, path, address!, deadline],
      });
    },
    [writeContract, address]
  );

  const swapExactETHForTokens = useCallback(
    (
      amountOutMin: bigint,
      path: `0x${string}`[],
      deadline: bigint,
      value: bigint
    ) => {
      writeContract({
        address: ADDRESSES.ROUTER as `0x${string}`,
        abi: ROUTER_ABI,
        functionName: 'swapExactETHForTokens',
        args: [amountOutMin, path, address!, deadline],
        value,
      });
    },
    [writeContract, address]
  );

  const swapExactTokensForETH = useCallback(
    (
      amountIn: bigint,
      amountOutMin: bigint,
      path: `0x${string}`,
      deadline: bigint
    ) => {
      writeContract({
        address: ADDRESSES.ROUTER as `0x${string}`,
        abi: ROUTER_ABI,
        functionName: 'swapExactTokensForETH',
        args: [amountIn, amountOutMin, [path, ADDRESSES.WETH as `0x${string}`], address!, deadline],
      });
    },
    [writeContract, address]
  );

  return {
    approve,
    swapExactTokensForTokens,
    swapExactETHForTokens,
    swapExactTokensForETH,
    isPending: isPending || approvalPending,
    isSuccess,
    isError,
    error,
  };
}

export function useAmountsOut(amountIn: bigint, path: `0x${string}`[]) {
  const { data, isLoading, refetch } = useReadContract({
    address: ADDRESSES.ROUTER as `0x${string}`,
    abi: ROUTER_ABI,
    functionName: 'getAmountsOut',
    args: [amountIn, path],
    query: {
      enabled: amountIn > 0n && path.length >= 2,
    },
  });

  return {
    amounts: data,
    amountOut: data ? (data as bigint[])[data.length - 1] : undefined,
    isLoading,
    refetch,
  };
}
