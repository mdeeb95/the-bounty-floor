
import React from 'react';
import { Bounty, BountyStatus } from '../types';
import BountyCard from './BountyCard';

interface MarketFloorProps {
  bounties: Bounty[];
  onClaim: (id: string) => void;
  onOpenDetails?: (bounty: Bounty) => void;
  hideStats?: boolean;
}

const MarketFloor: React.FC<MarketFloorProps> = ({ bounties, onClaim, onOpenDetails, hideStats = false }) => {
  return (
    <div className="flex flex-col gap-6 animate-in fade-in duration-700">
      {/* Market Stats Row */}
      {!hideStats && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-primary/10 border border-primary/40 rounded-xl p-6 relative overflow-hidden group hover:border-primary transition-colors cursor-default">
            <div className="absolute -right-4 -bottom-4 opacity-10 rotate-12 group-hover:rotate-0 transition-transform">
              <span className="text-8xl">💰</span>
            </div>
            <p className="text-primary text-[10px] font-black uppercase tracking-widest mb-1">Total Floor Payouts</p>
            <p className="text-3xl font-black text-white italic">$8,245,000</p>
            <p className="text-primary text-xs font-bold mt-2 flex items-center gap-1">
              📈 +12.5% vs Yesterday
            </p>
          </div>
          <div className="bg-card-dark border border-primary/20 rounded-xl p-6 group hover:border-primary transition-colors cursor-default">
            <p className="text-white/40 text-[10px] font-black uppercase tracking-widest mb-1">Active Bounties</p>
            <p className="text-3xl font-black text-white italic">{bounties.length}</p>
            <p className="text-primary text-xs font-bold mt-2">High Liquidity Phase</p>
          </div>
          <div className="bg-card-dark border border-primary/20 rounded-xl p-6 group hover:border-primary transition-colors cursor-default">
            <p className="text-white/40 text-[10px] font-black uppercase tracking-widest mb-1">Average Payout</p>
            <p className="text-3xl font-black text-white italic">$1,450</p>
            <div className="w-full bg-white/10 h-1 rounded-full mt-4 overflow-hidden">
              <div className="bg-primary h-full rounded-full w-[65%] shadow-[0_0_8px_#ff6b00] animate-pulse"></div>
            </div>
          </div>
        </div>
      )}

      {/* Grid Header */}
      {!hideStats && (
        <div className="flex items-center justify-between px-2">
          <h2 className="text-2xl font-black uppercase italic tracking-tighter flex items-center gap-3">
            <span className="size-3 bg-primary rounded-full animate-pulse shadow-[0_0_10px_#ff6b00]"></span>
            Live Bounty Floor
          </h2>
          <div className="hidden sm:flex gap-2">
            <button className="px-4 py-1.5 bg-primary text-black text-[10px] font-black uppercase rounded-full hover:scale-105 transition-transform">Most Liquid</button>
            <button className="px-4 py-1.5 bg-white/5 text-white/60 text-[10px] font-black uppercase rounded-full border border-white/10">High Volatility</button>
          </div>
        </div>
      )}

      {/* Bounty Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {bounties.map((bounty, i) => (
          <div key={bounty.id} className="animate-in fade-in slide-in-from-bottom-4 duration-500" style={{ animationDelay: `${i * 100}ms` }}>
            <BountyCard 
              bounty={bounty} 
              onClaim={onClaim} 
              onOpenDetails={onOpenDetails}
            />
          </div>
        ))}
        {bounties.length === 0 && (
          <div className="col-span-full py-20 border-2 border-dashed border-primary/10 rounded-3xl flex flex-col items-center justify-center grayscale opacity-20">
            <span className="text-6xl mb-4">💤</span>
            <p className="text-xl font-black uppercase italic">Market Idle</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MarketFloor;
