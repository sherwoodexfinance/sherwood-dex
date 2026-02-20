import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useAccount } from 'wagmi';
import { SwapCard } from './components/SwapCard';
import { PoolCard } from './components/PoolCard';
import { Header } from './components/Header';
import { useState } from 'react';

function App() {
  const { isConnected } = useAccount();
  const [activeTab, setActiveTab] = useState<'swap' | 'pool'>('swap');

  return (
    <div className="min-h-screen bg-zinc-950">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-md mx-auto">
          {/* Tab Selector */}
          <div className="flex mb-4 bg-zinc-900 rounded-lg p-1">
            <button
              onClick={() => setActiveTab('swap')}
              className={`flex-1 py-2 px-4 rounded-lg font-medium transition-all ${
                activeTab === 'swap'
                  ? 'bg-green-600 text-white'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              Swap
            </button>
            <button
              onClick={() => setActiveTab('pool')}
              className={`flex-1 py-2 px-4 rounded-lg font-medium transition-all ${
                activeTab === 'pool'
                  ? 'bg-green-600 text-white'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              Pool
            </button>
          </div>

          {/* Content */}
          <div className="bg-zinc-900 rounded-2xl p-4 border border-zinc-800">
            {!isConnected ? (
              <div className="text-center py-8">
                <h2 className="text-xl font-bold text-white mb-4">Welcome to Sherwood DEX</h2>
                <p className="text-zinc-400 mb-6">Connect your wallet to start trading</p>
                <ConnectButton />
              </div>
            ) : activeTab === 'swap' ? (
              <SwapCard />
            ) : (
              <PoolCard />
            )}
          </div>

          {/* Footer */}
          <div className="text-center mt-6 text-zinc-500 text-sm">
            <p>🏹 Take from the whales, give to the community</p>
            <p className="mt-1">Robinhood Chain Testnet (Chain ID: 46630)</p>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
