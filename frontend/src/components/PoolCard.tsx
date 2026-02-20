import { useState, useCallback, useEffect } from 'react';
import { useAccount, useBalance } from 'wagmi';
import { parseUnits, formatUnits } from 'viem';
import { useLiquidity, useAllowance } from '../hooks/useLiquidity';
import { usePair, useReserves, useTokenBalance } from '../hooks/usePairs';
import { ADDRESSES } from '../config/addresses';

export function PoolCard() {
  const { address } = useAccount();
  const [tokenA, setTokenA] = useState(ADDRESSES.WETH as `0x${string}`);
  const [tokenB, setTokenB] = useState(ADDRESSES.WOOD as `0x${string}`);
  const [amountA, setAmountA] = useState('');
  const [amountB, setAmountB] = useState('');
  const [mode, setMode] = useState<'add' | 'remove'>('add');

  const amountABigInt = amountA ? parseUnits(amountA, 18) : 0n;
  const amountBBigInt = amountB ? parseUnits(amountB, 18) : 0n;

  const { pairAddress } = usePair(tokenA, tokenB);
  const { reserve0, reserve1 } = useReserves(pairAddress);
  const { allowance: allowanceA, refetch: refetchAllowanceA } = useAllowance(tokenA, address);
  const { allowance: allowanceB, refetch: refetchAllowanceB } = useAllowance(tokenB, address);
  const { balance: lpBalance } = useTokenBalance(pairAddress as `0x${string}`, address);

  const { approve, addLiquidity, isPending, isSuccess } = useLiquidity();

  const needsApprovalA = allowanceA !== undefined && amountABigInt > allowanceA;
  const needsApprovalB = allowanceB !== undefined && amountBBigInt > allowanceB;

  const handleApprove = useCallback(async (token: `0x${string}`, amount: bigint) => {
    await approve(token, amount);
    setTimeout(() => {
      refetchAllowanceA();
      refetchAllowanceB();
    }, 2000);
  }, [approve, refetchAllowanceA, refetchAllowanceB]);

  const handleAddLiquidity = useCallback(async () => {
    if (!address) return;

    const amountAMin = (amountABigInt * 95n) / 100n; // 5% slippage
    const amountBMin = (amountBBigInt * 95n) / 100n;
    const deadline = BigInt(Math.floor(Date.now() / 1000) + 60 * 20);

    addLiquidity(tokenA, tokenB, amountABigInt, amountBBigInt, amountAMin, amountBMin, deadline);
  }, [address, tokenA, tokenB, amountABigInt, amountBBigInt, addLiquidity]);

  useEffect(() => {
    if (isSuccess) {
      setAmountA('');
      setAmountB('');
    }
  }, [isSuccess]);

  return (
    <div className="space-y-4">
      {/* Mode Toggle */}
      <div className="flex bg-zinc-800 rounded-lg p-1">
        <button
          onClick={() => setMode('add')}
          className={`flex-1 py-2 rounded-lg font-medium transition-colors ${
            mode === 'add' ? 'bg-green-600 text-white' : 'text-zinc-400'
          }`}
        >
          Add Liquidity
        </button>
        <button
          onClick={() => setMode('remove')}
          className={`flex-1 py-2 rounded-lg font-medium transition-colors ${
            mode === 'remove' ? 'bg-green-600 text-white' : 'text-zinc-400'
          }`}
        >
          Remove Liquidity
        </button>
      </div>

      {mode === 'add' ? (
        <>
          {/* Token A Input */}
          <div className="bg-zinc-800 rounded-xl p-4">
            <div className="flex justify-between text-sm text-zinc-400 mb-2">
              <span>Token A</span>
              <span>Token: {tokenA === ADDRESSES.WETH ? 'WETH' : 'WOOD'}</span>
            </div>
            <div className="flex gap-3">
              <input
                type="number"
                placeholder="0.0"
                value={amountA}
                onChange={(e) => setAmountA(e.target.value)}
                className="flex-1 bg-transparent text-xl font-bold outline-none text-white placeholder-zinc-500"
              />
              <button
                onClick={() => setTokenA(tokenA === ADDRESSES.WETH as `0x${string}` ? ADDRESSES.WOOD as `0x${string}` : ADDRESSES.WETH as `0x${string}`)}
                className="bg-zinc-700 rounded-lg px-3 py-2 text-white font-medium"
              >
                {tokenA === ADDRESSES.WETH ? 'WETH' : 'WOOD'}
              </button>
            </div>
          </div>

          {/* Token B Input */}
          <div className="bg-zinc-800 rounded-xl p-4">
            <div className="flex justify-between text-sm text-zinc-400 mb-2">
              <span>Token B</span>
              <span>Token: {tokenB === ADDRESSES.WETH ? 'WETH' : 'WOOD'}</span>
            </div>
            <div className="flex gap-3">
              <input
                type="number"
                placeholder="0.0"
                value={amountB}
                onChange={(e) => setAmountB(e.target.value)}
                className="flex-1 bg-transparent text-xl font-bold outline-none text-white placeholder-zinc-500"
              />
              <button
                onClick={() => setTokenB(tokenB === ADDRESSES.WETH as `0x${string}` ? ADDRESSES.WOOD as `0x${string}` : ADDRESSES.WETH as `0x${string}`)}
                className="bg-zinc-700 rounded-lg px-3 py-2 text-white font-medium"
              >
                {tokenB === ADDRESSES.WETH ? 'WETH' : 'WOOD'}
              </button>
            </div>
          </div>

          {/* Pool Info */}
          {reserve0 && reserve1 && (
            <div className="bg-zinc-800/50 rounded-lg p-3 text-sm">
              <p className="text-zinc-400">
                Pool Reserves: {formatUnits(reserve0, 18)} / {formatUnits(reserve1, 18)}
              </p>
            </div>
          )}

          {/* Action Buttons */}
          {needsApprovalA && (
            <button
              onClick={() => handleApprove(tokenA, amountABigInt)}
              disabled={isPending}
              className="w-full py-4 bg-zinc-700 hover:bg-zinc-600 rounded-xl font-bold text-white transition-colors"
            >
              {isPending ? 'Approving...' : 'Approve Token A'}
            </button>
          )}

          {needsApprovalB && (
            <button
              onClick={() => handleApprove(tokenB, amountBBigInt)}
              disabled={isPending}
              className="w-full py-4 bg-zinc-700 hover:bg-zinc-600 rounded-xl font-bold text-white transition-colors"
            >
              {isPending ? 'Approving...' : 'Approve Token B'}
            </button>
          )}

          {!needsApprovalA && !needsApprovalB && (
            <button
              onClick={handleAddLiquidity}
              disabled={isPending || !amountA || !amountB}
              className="w-full py-4 bg-green-600 hover:bg-green-500 disabled:bg-zinc-700 disabled:text-zinc-400 rounded-xl font-bold text-white transition-colors"
            >
              {isPending ? 'Adding...' : 'Add Liquidity'}
            </button>
          )}
        </>
      ) : (
        <>
          {/* Remove Liquidity */}
          <div className="bg-zinc-800 rounded-xl p-4">
            <div className="flex justify-between text-sm text-zinc-400 mb-2">
              <span>Your LP Tokens</span>
              <span>{lpBalance ? formatUnits(lpBalance, 18) : '0'}</span>
            </div>
            <p className="text-zinc-300 text-sm">
              Remove liquidity functionality coming soon. Use the explorer to interact with the pair contract directly.
            </p>
          </div>

          <button
            disabled
            className="w-full py-4 bg-zinc-700 rounded-xl font-bold text-zinc-400 cursor-not-allowed"
          >
            Remove Liquidity (Coming Soon)
          </button>
        </>
      )}

      {/* LP Balance */}
      {lpBalance && lpBalance > 0n && (
        <div className="text-center text-sm text-zinc-400">
          Your LP Tokens: {formatUnits(lpBalance, 18)}
        </div>
      )}
    </div>
  );
}
