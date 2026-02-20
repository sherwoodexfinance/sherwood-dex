import { ConnectButton } from '@rainbow-me/rainbowkit';

export function Header() {
  return (
    <header className="border-b border-zinc-800 bg-zinc-900/50 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center">
            <span className="text-2xl">🏹</span>
          </div>
          <div>
            <h1 className="text-xl font-bold text-white">Sherwood</h1>
            <p className="text-xs text-zinc-400">DEX</p>
          </div>
        </div>
        
        <ConnectButton />
      </div>
    </header>
  );
}
