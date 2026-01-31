
import React, { useState } from 'react';
import { Bounty, BountyStatus } from '../types';
import { getSharkAdvice } from '../geminiService';

interface BountyCardProps {
  bounty: Bounty;
  onClaim: (id: string) => void;
  onOpenDetails?: (bounty: Bounty) => void;
}

const BountyCard: React.FC<BountyCardProps> = ({ bounty, onClaim, onOpenDetails }) => {
  const [advice, setAdvice] = useState<string | null>(null);
  const [loadingAdvice, setLoadingAdvice] = useState(false);

  const handleAdvice = async (e: React.MouseEvent) => {
    e.stopPropagation();
    setLoadingAdvice(true);
    const text = await getSharkAdvice(bounty.title);
    setAdvice(text || null);
    setLoadingAdvice(false);
  };

  const isElite = bounty.status === BountyStatus.ELITE;
  const isUrgent = bounty.status === BountyStatus.URGENT;
  const isHot = bounty.status === BountyStatus.HOT;
  const isClaimed = bounty.status === BountyStatus.CLAIMED;
  const isCompleted = bounty.status === BountyStatus.COMPLETED;

  const borderColor = isCompleted ? 'border-primary shadow-[0_0_10px_rgba(255,107,0,0.2)]' : isElite ? 'border-gold' : isUrgent ? 'border-red-500' : 'border-primary';
  const glowClass = isElite ? 'gold-glow' : (isHot || isUrgent) ? 'neon-glow' : '';
  const labelText = isCompleted ? 'Extracted' : isElite ? 'Elite Request' : isUrgent ? 'Volatility Spike' : isHot ? 'Hot Bounty' : isClaimed ? 'In Progress' : null;
  const labelColor = isCompleted ? 'bg-primary' : isElite ? 'bg-gold' : isUrgent ? 'bg-red-500' : isClaimed ? 'bg-blue-500' : 'bg-primary';

  return (
    <div className={`bg-black/60 border-2 ${borderColor} ${glowClass} rounded-xl p-1 relative group hover:-translate-y-1 transition-all ${isCompleted ? 'opacity-80' : ''}`}>
      {labelText && (
        <div className={`absolute -top-3 left-4 ${labelColor} text-black text-[10px] font-black px-3 py-1 rounded uppercase italic z-10 ${!isCompleted ? 'animate-pulse' : ''}`}>
          {labelText}
        </div>
      )}
      <div className="bg-card-dark rounded-lg p-5 border border-primary/10 h-full flex flex-col">
        <div className="flex justify-between items-start mb-4">
          <span className={`text-[10px] ${isElite ? 'text-gold/60' : 'text-primary/60'} font-black uppercase tracking-tighter`}>
            PROJECT: {bounty.project}
          </span>
          {!isCompleted && (
            <button 
              onClick={handleAdvice}
              className="text-white/40 hover:text-primary transition-colors"
              title="Get Shark Advice"
            >
              {loadingAdvice ? '⌛' : '🦈'}
            </button>
          )}
        </div>

        <h4 className={`text-xl font-black uppercase leading-tight mb-2 italic ${isCompleted ? 'text-white/40' : ''}`}>
          {bounty.title}
        </h4>

        {advice && (
          <div className="mt-2 p-2 bg-black/40 border-l-2 border-primary rounded text-[10px] italic text-primary/80">
            "{advice}"
          </div>
        )}

        <div className="mt-auto pt-8">
          <div className="flex items-end justify-between">
            <div className="flex flex-col">
              <span className="text-[10px] text-white/40 uppercase font-black">Contract Value</span>
              <span className={`text-4xl font-black ${isCompleted ? 'text-primary/40' : isElite ? 'text-gold' : 'text-primary'}`}>
                ${bounty.value.toLocaleString()}
              </span>
            </div>
            <div className="text-right">
              <span className="text-[10px] text-white/40 uppercase font-black">{isCompleted ? 'Status' : 'Ends In'}</span>
              <p className={`text-sm font-bold ${isUrgent ? 'text-red-500' : isCompleted ? 'text-primary' : 'text-white'}`}>
                {isCompleted ? 'Vaulted' : bounty.endsIn}
              </p>
            </div>
          </div>

          <button 
            onClick={() => onOpenDetails?.(bounty)}
            className={`w-full mt-6 ${
              isCompleted 
                ? 'bg-primary/5 border-primary/30 text-primary' 
                : isClaimed 
                ? 'bg-white/5 border-white/20 hover:border-primary/50 text-white' 
                : `${isElite ? 'bg-gold' : 'bg-primary'} text-black`
            } border font-black uppercase italic py-4 rounded-lg text-lg text-center transition-all flex items-center justify-center gap-2 group-hover:bg-primary/10 group-hover:text-white transition-all`}
          >
            <span>{isCompleted ? '✅' : isClaimed ? '🖥️' : '🔭'}</span>
            {isCompleted ? 'Review Data' : isClaimed ? 'Command Center' : 'View Bounty'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default BountyCard;
