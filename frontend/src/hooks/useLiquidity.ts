import { useWriteContract, useReadContract, useAccount } from 'wagmi';
import { ROUTER_ABI, ERC20_ABI } from '../abis';
import { ADDRESSES } from '../config/addresses';
import { useCallback, useState } from 'react';

export function useLiquidity() {
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

  const addLiquidity = useCallback(
    (
      tokenA: `0x${string}`,
      tokenB: `0x${string}`,
      amountADesired: bigint,
      amountBDesired: bigint,
      amountAMin: bigint,
      amountBMin: bigint,
      deadline: bigint
    ) => {
      writeContract({
        address: ADDRESSES.ROUTER as `0x${string}`,
        abi: ROUTER_ABI,
        functionName: 'addLiquidity',
        args: [
          tokenA,
          tokenB,
          amountADesired,
          amountBDesired,
          amountAMin,
          amountBMin,
          address!,
          deadline,
        ],
      });
    },
    [writeContract, address]
  );

  const addLiquidityETH = useCallback(
    (
      token: `0x${string}`,
      amountTokenDesired: bigint,
      amountTokenMin: bigint,
      amountETHMin: bigint,
      deadline: bigint,
      value: bigint
    ) => {
      writeContract({
        address: ADDRESSES.ROUTER as `0x${string}`,
        abi: ROUTER_ABI,
        functionName: 'addLiquidityETH',
        args: [
          token,
          amountTokenDesired,
          amountTokenMin,
          amountETHMin,
          address!,
          deadline,
        ],
        value,
      });
    },
    [writeContract, address]
  );

  return {
    approve,
    addLiquidity,
    addLiquidityETH,
    isPending: isPending || approvalPending,
    isSuccess,
    isError,
    error,
  };
}

export function useAllowance(tokenAddress: `0x${string}` | undefined, owner: `0x${string}` | undefined) {
  const { data, isLoading, refetch } = useReadContract({
    address: tokenAddress,
    abi: ERC20_ABI,
    functionName: 'allowance',
    args: [owner, ADDRESSES.ROUTER as `0x${string}`],
    query: {
      enabled: !!tokenAddress && !!owner,
    },
  });

  return {
    allowance: data,
    isLoading,
    refetch,
  };
}
