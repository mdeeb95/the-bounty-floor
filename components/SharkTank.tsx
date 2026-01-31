
import React from 'react';
import { Shark } from '../types';

interface SharkTankProps {
  sharks: Shark[];
  expanded?: boolean;
}

const SharkTank: React.FC<SharkTankProps> = ({ sharks, expanded = false }) => {
  const recentActivity = [
    { user: 'CODE_PREDATOR', action: 'EXTRACTED $4,500', time: '2m ago' },
    { user: 'LIQUIDATOR_X', action: 'CLAIMED ELITE CONTRACT', time: '12m ago' },
    { user: 'ZERO_DAY', action: 'PATCHED CRITICAL VULN', time: '15m ago' },
  ];

  return (
    <div className={`bg-card-dark border border-primary/20 rounded-xl p-5 relative overflow-hidden flex flex-col gap-6 ${expanded ? 'min-h-[600px] w-full max-w-5xl mx-auto p-8 border-2 shadow-[0_0_50px_rgba(13,242,89,0.05)]' : ''}`}>
      <div className="absolute top-0 right-0 p-2 opacity-5 pointer-events-none">
        <span className={expanded ? "text-9xl" : "text-6xl"}>🏆</span>
      </div>
      
      <div>
        <h3 className="text-primary text-xs font-black uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
          <span>🥇</span>
          Leaderboard of Sharks
        </h3>
        <div className="flex flex-col gap-4">
          {sharks.map((shark, index) => (
            <div key={shark.id} className="flex items-center gap-3 group cursor-pointer hover:bg-white/5 p-2 rounded-lg transition-all border border-transparent hover:border-primary/10">
              <div className="relative">
                <div 
                  className={`size-12 rounded-full border-2 ${index === 0 ? 'border-gold gold-glow' : index === 1 ? 'border-gray-400' : 'border-orange-700'} bg-cover bg-center`}
                  style={{ backgroundImage: `url('${shark.avatar}')` }}
                ></div>
                <div className={`absolute -top-1 -right-1 size-5 ${index === 0 ? 'bg-gold' : index === 1 ? 'bg-gray-400' : 'bg-orange-700'} rounded-full flex items-center justify-center text-[10px] text-black font-black`}>
                  {shark.rank}
                </div>
              </div>
              <div className="flex-1">
                <p className="text-sm font-bold group-hover:text-primary transition-colors italic uppercase">{shark.name}</p>
                <div className="flex items-center justify-between">
                  <p className="text-[10px] text-primary/60 font-bold">${(shark.earned/1000000).toFixed(1)}M EARNED</p>
                  {expanded && (
                    <div className="flex items-center gap-4">
                      <span className="text-[10px] text-white/40 uppercase font-black">Success: 98%</span>
                      <span className="text-[10px] text-primary font-black uppercase">Level: {50 - index * 5}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {expanded && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8 border-t border-primary/10">
           <div className="space-y-4">
              <h4 className="text-white/40 text-[10px] font-black uppercase tracking-widest">Global Statistics</h4>
              <div className="grid grid-cols-2 gap-4">
                 <div className="bg-black/40 p-4 rounded-xl border border-white/5">
                    <p className="text-primary text-2xl font-black">4,281</p>
                    <p className="text-white/40 text-[8px] font-bold uppercase">Total Sharks</p>
                 </div>
                 <div className="bg-black/40 p-4 rounded-xl border border-white/5">
                    <p className="text-primary text-2xl font-black">$12.4M</p>
                    <p className="text-white/40 text-[8px] font-bold uppercase">Community Payout</p>
                 </div>
              </div>
           </div>
           <div className="space-y-4">
              <h4 className="text-white/40 text-[10px] font-black uppercase tracking-widest">Recent Activity</h4>
              <div className="space-y-3">
                 {recentActivity.map((act, i) => (
                   <div key={i} className="flex justify-between items-center text-[10px] bg-white/5 p-2 rounded-lg border border-white/5">
                      <span className="font-black text-primary italic">@{act.user}</span>
                      <span className="text-white/60 uppercase font-bold">{act.action}</span>
                      <span className="text-white/20 font-mono">{act.time}</span>
                   </div>
                 ))}
              </div>
           </div>
        </div>
      )}

      {!expanded && (
        <button className="w-full mt-2 py-3 text-[10px] font-black text-center uppercase border border-primary/20 rounded-xl hover:bg-primary/10 transition-colors flex items-center justify-center gap-2">
          <span>🏆</span> Full Leaderboard
        </button>
      )}
    </div>
  );
};

export default SharkTank;
