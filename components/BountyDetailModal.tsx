
import React, { useEffect, useState } from 'react';
import { Bounty, BountyStatus } from '../types';
import { generateBountyBriefing } from '../geminiService';

interface BountyDetailModalProps {
  bounty: Bounty;
  onClose: () => void;
  onComplete: (id: string) => void;
  onClaim: (id: string) => void;
}

const BountyDetailModal: React.FC<BountyDetailModalProps> = ({ bounty, onClose, onComplete, onClaim }) => {
  const [briefing, setBriefing] = useState<{ steps: string[] } | null>(null);
  const [loading, setLoading] = useState(true);
  const [isCommitting, setIsCommitting] = useState(false);
  const [isClaiming, setIsClaiming] = useState(false);

  useEffect(() => {
    const fetchBriefing = async () => {
      setLoading(true);
      const data = await generateBountyBriefing(bounty.title);
      setBriefing(data);
      setLoading(false);
    };
    fetchBriefing();
  }, [bounty.title]);

  const handleCommit = () => {
    setIsCommitting(true);
    setTimeout(() => {
      onComplete(bounty.id);
      setIsCommitting(false);
    }, 1500);
  };

  const handleClaim = () => {
    setIsClaiming(true);
    setTimeout(() => {
      onClaim(bounty.id);
      setIsClaiming(false);
    }, 800);
  };

  const isCompleted = bounty.status === BountyStatus.COMPLETED;
  const isClaimed = bounty.status === BountyStatus.CLAIMED;
  const isAvailable = !isClaimed && !isCompleted;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8 bg-black/90 backdrop-blur-xl">
      <div className="w-full max-w-6xl h-full max-h-[90vh] bg-card-dark border-2 border-primary/40 rounded-3xl overflow-hidden flex flex-col shadow-[0_0_100px_rgba(255,107,0,0.15)] animate-in fade-in zoom-in duration-300">
        {/* Header Terminal */}
        <div className="bg-primary/10 border-b border-primary/20 px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="px-3 py-1 bg-primary text-black text-[10px] font-black rounded uppercase italic">
              {isAvailable ? 'MISSION_PREVIEW_v1.0' : 'COMMAND_CENTER_v4.2'}
            </div>
            <div className="text-primary/60 text-[10px] font-bold tracking-widest font-mono">
              CONTRACT_ID: {bounty.id.padStart(6, '0')} // NODE: {bounty.project}
            </div>
          </div>
          <button 
            onClick={onClose}
            className="text-primary hover:text-white transition-colors text-2xl font-black"
          >
            ✕
          </button>
        </div>

        <div className="flex-1 overflow-y-auto flex flex-col lg:flex-row">
          {/* Main Content Area */}
          <div className="flex-1 p-8 border-r border-primary/10">
            <div className="flex flex-col gap-6">
              <div className="flex items-start justify-between gap-4">
                <h2 className="text-4xl md:text-5xl font-black italic uppercase text-white tracking-tighter leading-none">
                  {bounty.title}
                </h2>
                <div className="text-right">
                  <p className="text-[10px] text-white/40 uppercase font-black">Difficulty</p>
                  <p className={`text-xl font-black italic ${bounty.difficulty === 'CRITICAL' ? 'text-red-500' : 'text-primary'}`}>
                    {bounty.difficulty}
                  </p>
                </div>
              </div>

              <div className="flex gap-2">
                {bounty.tags.map(tag => (
                  <span key={tag} className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-[10px] font-bold text-white/60">
                    #{tag}
                  </span>
                ))}
              </div>

              <div className="mt-6 space-y-4">
                <h3 className="text-primary text-xs font-black uppercase tracking-widest flex items-center gap-2">
                  <span className="size-2 bg-primary rounded-full"></span>
                  The Mission Brief
                </h3>
                <div className="bg-black/40 p-6 rounded-2xl border border-white/5 text-lg text-white/80 leading-relaxed italic">
                  "{bounty.description}"
                </div>
              </div>

              <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Jira Requirements Checklist */}
                <div className="space-y-4">
                  <h3 className="text-primary text-xs font-black uppercase tracking-widest flex items-center gap-2">
                    <span className="size-2 bg-primary rounded-full"></span>
                    Terminal Requirements
                  </h3>
                  <div className="space-y-3 font-mono">
                    {bounty.requirements.map((req, i) => (
                      <div key={i} className="flex items-start gap-4 p-3 rounded-xl hover:bg-white/5 transition-all cursor-pointer group">
                        <div className={`size-5 rounded border ${isCompleted ? 'border-primary bg-primary/20' : 'border-primary/40'} flex items-center justify-center mt-0.5 group-hover:border-primary transition-colors`}>
                          <div className={`size-2 bg-primary rounded-sm ${isCompleted ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'} transition-opacity shadow-[0_0_8px_#ff6b00]`}></div>
                        </div>
                        <span className={`text-sm ${isCompleted ? 'text-white/40 line-through italic' : 'text-white/70 group-hover:text-white'} transition-colors`}>
                          {req}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* AI Intel Briefing */}
                <div className="space-y-4">
                  <h3 className="text-gold text-xs font-black uppercase tracking-widest flex items-center gap-2">
                    <span className="size-2 bg-gold rounded-full shadow-[0_0_8px_#FFD700]"></span>
                    Live Intel (AI-Briefing)
                  </h3>
                  <div className="bg-primary/5 p-6 rounded-2xl border border-primary/20 space-y-4 relative overflow-hidden min-h-[200px]">
                    <div className="absolute top-0 right-0 p-2 opacity-10">
                      <span className="text-4xl">🤖</span>
                    </div>
                    {loading ? (
                      <div className="flex flex-col gap-4 animate-pulse">
                        <div className="h-4 bg-primary/20 rounded w-3/4"></div>
                        <div className="h-4 bg-primary/20 rounded w-1/2"></div>
                        <div className="h-4 bg-primary/20 rounded w-2/3"></div>
                      </div>
                    ) : (
                      <div className="space-y-3 font-mono">
                        {briefing?.steps.map((step, i) => (
                          <div key={i} className="flex gap-3 text-sm text-primary/90 font-bold italic">
                            <span>{i + 1}.</span>
                            <p className={isCompleted ? 'line-through opacity-40' : ''}>{step}</p>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar Stats */}
          <div className="w-full lg:w-80 bg-black/40 p-8 flex flex-col gap-8">
            <div>
              <p className="text-[10px] text-white/40 uppercase font-black mb-1">Contract Value</p>
              <p className={`text-5xl font-black ${isCompleted ? 'text-gold italic' : 'text-primary italic'} tracking-tighter`}>
                ${bounty.value.toLocaleString()}
              </p>
            </div>

            <div className="space-y-6">
              <div className="bg-white/5 p-4 rounded-xl border border-white/10">
                <p className="text-[10px] text-white/40 uppercase font-black mb-2">Extraction Window</p>
                <div className="flex justify-between items-end">
                  <p className="text-xl font-bold text-white tracking-widest">{isCompleted ? 'TERMINATED' : bounty.endsIn}</p>
                  {!isCompleted && <p className="text-red-500 text-[10px] font-black animate-pulse uppercase">Critical</p>}
                </div>
                <div className="w-full h-1 bg-white/10 rounded-full mt-3 overflow-hidden">
                  <div className={`h-full ${isCompleted ? 'bg-primary w-full' : 'bg-red-500 w-3/4 shadow-[0_0_8px_#ef4444]'}`}></div>
                </div>
              </div>

              <div className="bg-white/5 p-4 rounded-xl border border-white/10">
                <p className="text-[10px] text-white/40 uppercase font-black mb-1">Executor Status</p>
                <div className="flex -space-x-2 mt-2">
                   {isAvailable ? (
                     <div className="size-8 rounded-full border-2 border-white/10 bg-black/40 flex items-center justify-center text-xs text-white/20">?</div>
                   ) : (
                    <div className="size-8 rounded-full border-2 border-gold bg-cover bg-center" style={{ backgroundImage: `url('https://picsum.photos/seed/you/100/100')` }}></div>
                   )}
                </div>
                <p className="text-[10px] text-primary font-black mt-2 uppercase">
                  {isCompleted ? 'Extraction Completed' : isClaimed ? 'You are sole executor' : 'Awaiting Assignment'}
                </p>
              </div>
            </div>

            <div className="mt-auto pt-8 border-t border-primary/10">
              {isAvailable && (
                <button 
                  onClick={handleClaim}
                  disabled={isClaiming}
                  className="w-full bg-primary hover:bg-white text-black font-black uppercase italic py-4 rounded-xl transition-all shadow-[0_0_20px_rgba(255,107,0,0.3)] mb-4 disabled:opacity-50 animate-pulse"
                >
                  {isClaiming ? '⚡ Signing...' : '🎯 Accept Mission'}
                </button>
              )}

              {isClaimed && (
                <button 
                  onClick={handleCommit}
                  disabled={isCommitting}
                  className="w-full bg-primary hover:bg-white text-black font-black uppercase italic py-4 rounded-xl transition-all shadow-[0_0_20px_rgba(255,107,0,0.3)] mb-4 disabled:opacity-50 disabled:cursor-wait"
                >
                  {isCommitting ? '📡 Committing...' : '🚀 Commit Patch'}
                </button>
              )}

              {isCompleted && (
                <div className="w-full bg-gold/20 border border-gold text-gold font-black uppercase italic py-4 rounded-xl text-center mb-4 shadow-[0_0_20px_rgba(255,215,0,0.2)]">
                  💰 Vaulted
                </div>
              )}

              <button 
                onClick={onClose}
                className="w-full bg-white/5 hover:bg-white/10 text-white/60 font-black uppercase italic py-4 rounded-xl border border-white/10 transition-all text-xs"
              >
                Return to Floor
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BountyDetailModal;
