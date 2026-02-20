import { useState, useCallback, useEffect } from 'react';
import { useAccount, useBalance } from 'wagmi';
import { parseUnits, formatUnits } from 'viem';
import { useSwap, useAmountsOut } from '../hooks/useSwap';
import { useAllowance } from '../hooks/useLiquidity';
import { useTokenInfo, useTokenBalance } from '../hooks/usePairs';
import { ADDRESSES } from '../config/addresses';

const COMMON_TOKENS = [
  { address: ADDRESSES.WETH as `0x${string}`, symbol: 'WETH', name: 'Wrapped ETH' },
  { address: ADDRESSES.WOOD as `0x${string}`, symbol: 'WOOD', name: 'Sherwood Token' },
];

export function SwapCard() {
  const { address } = useAccount();
  const [tokenIn, setTokenIn] = useState<(typeof COMMON_TOKENS)[0]>(COMMON_TOKENS[0]);
  const [tokenOut, setTokenOut] = useState<(typeof COMMON_TOKENS)[1]>(COMMON_TOKENS[1]);
  const [amountIn, setAmountIn] = useState('');
  const [slippage, setSlippage] = useState('0.5');

  const amountInBigInt = amountIn ? parseUnits(amountIn, 18) : 0n;

  const { data: ethBalance } = useBalance({ address });
  const { balance: tokenInBalance } = useTokenBalance(tokenIn.address, address);

  const { allowance, refetch: refetchAllowance } = useAllowance(tokenIn.address, address);
  const { amountOut, isLoading: isLoadingQuote } = useAmountsOut(amountInBigInt, [tokenIn.address, tokenOut.address]);
  const { approve, swapExactTokensForTokens, isPending, isSuccess } = useSwap();

  const needsApproval = allowance !== undefined && amountInBigInt > allowance;

  const handleSwap = useCallback(async () => {
    if (!amountOut || !address) return;

    const amountOutMin = (amountOut * BigInt(Math.floor((1 - parseFloat(slippage) / 100) * 10000))) / 10000n;
    const deadline = BigInt(Math.floor(Date.now() / 1000) + 60 * 20); // 20 minutes

    swapExactTokensForTokens(amountInBigInt, amountOutMin, [tokenIn.address, tokenOut.address], deadline);
  }, [amountOut, address, amountInBigInt, slippage, swapExactTokensForTokens, tokenIn.address, tokenOut.address]);

  const handleApprove = useCallback(async () => {
    await approve(tokenIn.address, amountInBigInt);
    setTimeout(() => refetchAllowance(), 2000);
  }, [approve, tokenIn.address, amountInBigInt, refetchAllowance]);

  useEffect(() => {
    if (isSuccess) {
      setAmountIn('');
    }
  }, [isSuccess]);

  return (
    <div className="space-y-4">
      {/* From Section */}
      <div className="bg-zinc-800 rounded-xl p-4">
        <div className="flex justify-between text-sm text-zinc-400 mb-2">
          <span>From</span>
          <span>
            Balance: {tokenIn.symbol === 'WETH' 
              ? ethBalance ? formatUnits(ethBalance.value, 18) : '0'
              : tokenInBalance ? formatUnits(tokenInBalance, 18) : '0'
            }
          </span>
        </div>
        <div className="flex gap-3">
          <input
            type="number"
            placeholder="0.0"
            value={amountIn}
            onChange={(e) => setAmountIn(e.target.value)}
            className="flex-1 bg-transparent text-2xl font-bold outline-none text-white placeholder-zinc-500"
          />
          <select
            value={tokenIn.address}
            onChange={(e) => {
              const selected = COMMON_TOKENS.find(t => t.address === e.target.value);
              if (selected) setTokenIn(selected);
            }}
            className="bg-zinc-700 rounded-lg px-3 py-2 text-white font-medium outline-none cursor-pointer"
          >
            {COMMON_TOKENS.map((token) => (
              <option key={token.address} value={token.address}>
                {token.symbol}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Arrow */}
      <div className="flex justify-center -my-2 relative z-10">
        <div className="bg-zinc-700 rounded-full p-2 hover:bg-zinc-600 cursor-pointer transition-colors">
          <svg className="w-5 h-5 text-zinc-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </div>

      {/* To Section */}
      <div className="bg-zinc-800 rounded-xl p-4">
        <div className="flex justify-between text-sm text-zinc-400 mb-2">
          <span>To</span>
          <span>
            {isLoadingQuote ? 'Loading...' : amountOut ? `≈ ${formatUnits(amountOut, 18)} ${tokenOut.symbol}` : ''}
          </span>
        </div>
        <div className="flex gap-3">
          <input
            type="text"
            placeholder="0.0"
            value={amountOut ? formatUnits(amountOut, 18) : ''}
            readOnly
            className="flex-1 bg-transparent text-2xl font-bold outline-none text-white placeholder-zinc-500"
          />
          <select
            value={tokenOut.address}
            onChange={(e) => {
              const selected = COMMON_TOKENS.find(t => t.address === e.target.value);
              if (selected) setTokenOut(selected);
            }}
            className="bg-zinc-700 rounded-lg px-3 py-2 text-white font-medium outline-none cursor-pointer"
          >
            {COMMON_TOKENS.map((token) => (
              <option key={token.address} value={token.address}>
                {token.symbol}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Slippage Settings */}
      <div className="flex items-center gap-2 text-sm">
        <span className="text-zinc-400">Slippage:</span>
        <input
          type="number"
          value={slippage}
          onChange={(e) => setSlippage(e.target.value)}
          className="bg-zinc-800 rounded px-2 py-1 w-16 text-white outline-none"
          step="0.1"
          min="0.1"
          max="50"
        />
        <span className="text-zinc-400">%</span>
      </div>

      {/* Action Button */}
      {needsApproval ? (
        <button
          onClick={handleApprove}
          disabled={isPending || !amountIn}
          className="w-full py-4 bg-green-600 hover:bg-green-500 disabled:bg-zinc-700 disabled:text-zinc-400 rounded-xl font-bold text-white transition-colors"
        >
          {isPending ? 'Approving...' : `Approve ${tokenIn.symbol}`}
        </button>
      ) : (
        <button
          onClick={handleSwap}
          disabled={isPending || !amountIn || !amountOut}
          className="w-full py-4 bg-green-600 hover:bg-green-500 disabled:bg-zinc-700 disabled:text-zinc-400 rounded-xl font-bold text-white transition-colors"
        >
          {isPending ? 'Swapping...' : 'Swap'}
        </button>
      )}

      {/* Rate Info */}
      {amountOut && amountIn && (
        <div className="text-center text-sm text-zinc-400">
          1 {tokenIn.symbol} ≈ {formatUnits(amountOut / amountInBigInt, 18)} {tokenOut.symbol}
        </div>
      )}
    </div>
  );
}
