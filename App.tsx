
import React, { useState, useEffect, useMemo } from 'react';
import { Bounty, BountyStatus, Shark, UserProfile } from './types';
import { INITIAL_BOUNTIES, INITIAL_SHARKS, INITIAL_USER } from './store';
import MarketFloor from './components/MarketFloor';
import SharkTank from './components/SharkTank';
import Vault from './components/Vault';
import MarketPulse from './components/MarketPulse';
import BountyDetailModal from './components/BountyDetailModal';

const App: React.FC = () => {
  const [view, setView] = useState<'market' | 'portfolio' | 'sharks' | 'vault'>('market');
  const [bounties, setBounties] = useState<Bounty[]>(INITIAL_BOUNTIES);
  const [user, setUser] = useState<UserProfile>(INITIAL_USER);
  const [notification, setNotification] = useState<string | null>(null);
  const [selectedBounty, setSelectedBounty] = useState<Bounty | null>(null);

  const claimBounty = (id: string) => {
    const bounty = bounties.find(b => b.id === id);
    if (!bounty) return;

    setBounties(prev => prev.map(b => 
      b.id === id ? { ...b, status: BountyStatus.CLAIMED } : b
    ));
    setNotification(`CONTRACT SIGNED: ${bounty.title} ($${bounty.value})`);
    
    setSelectedBounty(prev => prev && prev.id === id ? { ...prev, status: BountyStatus.CLAIMED } : prev);

    setTimeout(() => setNotification(null), 5000);
  };

  const completeBounty = (id: string) => {
    const bounty = bounties.find(b => b.id === id);
    if (!bounty || bounty.status !== BountyStatus.CLAIMED) return;

    setBounties(prev => prev.map(b => 
      b.id === id ? { ...b, status: BountyStatus.COMPLETED } : b
    ));
    
    setUser(prev => ({
      ...prev,
      netWorth: prev.netWorth + bounty.value,
      level: prev.level + 1
    }));

    setNotification(`EXTRACTION SUCCESS: +$${bounty.value.toLocaleString()} AWARDED`);
    setSelectedBounty(null);
    setTimeout(() => setNotification(null), 5000);
  };

  const activeClaimedCount = useMemo(() => 
    bounties.filter(b => b.status === BountyStatus.CLAIMED).length, 
  [bounties]);

  const completedCount = useMemo(() => 
    bounties.filter(b => b.status === BountyStatus.COMPLETED).length, 
  [bounties]);

  const navItems = [
    { id: 'market', label: 'Market', icon: '📡' },
    { id: 'portfolio', label: 'Portfolio', icon: '💼' },
    { id: 'sharks', label: 'Sharks', icon: '🦈' },
    { id: 'vault', label: 'Vault', icon: '🛡️' },
  ];

  return (
    <div className="flex flex-col min-h-screen digital-rain pb-20 lg:pb-0">
      {/* Detail Modal */}
      {selectedBounty && (
        <BountyDetailModal 
          bounty={selectedBounty} 
          onClose={() => setSelectedBounty(null)} 
          onComplete={completeBounty}
          onClaim={claimBounty}
        />
      )}

      {/* Top Ticker */}
      <div className="w-full bg-black/80 border-y border-primary/20 py-2 overflow-hidden z-50">
        <div className="animate-ticker flex whitespace-nowrap gap-12 text-primary font-bold text-sm tracking-widest uppercase">
          <span>NEW BOUNTY DROPPED: AUTH SYSTEM REDESIGN - $2,500</span>
          <span>•</span>
          <span>SHARK @APEX_PREDATOR JUST CLAIMED $1,200 (FIX: MEMORY LEAK)</span>
          <span>•</span>
          <span>MARKET VOLUME UP 15% IN LAST 2 HOURS</span>
          <span>•</span>
          <span>URGENT: CLOUD DEPLOYMENT STACK - $5,000 BOUNTY LIVE</span>
          <span>•</span>
          <span>SHARK @CODE_MUNCHER CLAIMED $800 (UI TWEAKS)</span>
        </div>
      </div>

      {/* Header */}
      <header className="flex items-center justify-between border-b border-primary/10 px-6 py-4 bg-background-dark/80 backdrop-blur-md sticky top-0 z-40">
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-3 text-primary cursor-pointer" onClick={() => setView('market')}>
            <div className="size-10 bg-primary/20 rounded-lg flex items-center justify-center border border-primary/40 shadow-[0_0_15px_rgba(255,107,0,0.2)]">
              <span className="text-2xl font-bold italic">B</span>
            </div>
            <h1 className="text-2xl font-black italic uppercase tracking-tighter">The Bounty Floor</h1>
          </div>
          <nav className="hidden lg:flex items-center gap-6">
            {navItems.map(item => (
              <button 
                key={item.id}
                onClick={() => setView(item.id as any)}
                className={`${view === item.id ? 'text-primary border-b-2 border-primary shadow-[0_5px_10px_-5px_#ff6b00]' : 'text-white/60'} hover:text-primary transition-all text-sm font-black uppercase tracking-wider py-1 flex items-center gap-2`}
              >
                <span>{item.icon}</span>
                {item.label}
              </button>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden md:flex flex-col items-end mr-4">
            <span className="text-[10px] text-primary/60 uppercase font-black">Floor Volume</span>
            <span className="text-lg font-bold text-white">$4,289,102.00</span>
          </div>
          <div className="relative">
            <button className="size-10 flex items-center justify-center rounded-full bg-primary/10 border border-primary/30 text-primary hover:bg-primary/20 transition-all">
              🔔
            </button>
            {notification && (
              <div className="absolute top-12 right-0 w-64 bg-primary text-black p-3 rounded-lg shadow-2xl text-xs font-black uppercase italic animate-bounce z-50 border-2 border-black">
                {notification}
              </div>
            )}
          </div>
          <div 
            onClick={() => setView('vault')}
            className="flex items-center gap-3 bg-primary/5 p-1 pr-4 rounded-full border border-primary/20 cursor-pointer hover:bg-primary/10 transition-all"
          >
            <div className="size-8 rounded-full bg-cover bg-center border-2 border-gold gold-glow" style={{ backgroundImage: `url('https://picsum.photos/seed/apex/100/100')` }}></div>
            <div className="flex flex-col">
              <span className="text-xs font-bold leading-none">@{user.username}</span>
              <span className="text-[10px] text-gold font-black uppercase">${(user.netWorth/1000).toFixed(1)}k Net</span>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Nav Bar */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-background-dark/95 border-t border-primary/20 backdrop-blur-xl z-[60] flex items-center justify-around py-4">
        {navItems.map(item => (
          <button 
            key={item.id}
            onClick={() => setView(item.id as any)}
            className={`flex flex-col items-center gap-1 ${view === item.id ? 'text-primary' : 'text-white/40'}`}
          >
            <span className="text-xl">{item.icon}</span>
            <span className="text-[10px] font-black uppercase tracking-tighter">{item.label}</span>
          </button>
        ))}
      </nav>

      {/* Main Grid */}
      <main className="flex-1 flex flex-col lg:flex-row p-4 md:p-6 gap-6 max-w-[1600px] mx-auto w-full">
        {/* Left Sidebar */}
        <aside className="w-full lg:w-72 flex flex-col gap-6 order-2 lg:order-1">
          <div className="bg-card-dark border border-primary/20 rounded-xl p-4">
             <h3 className="text-white/40 text-[10px] font-black uppercase mb-3">Floor Selector</h3>
             <div className="space-y-2">
                <button className="w-full text-left p-2 rounded border border-primary/40 bg-primary/10 flex items-center justify-between group">
                  <span className="text-primary text-xs font-black uppercase">Main Floor</span>
                  <span className="text-[10px] text-primary/60">ACTIVE</span>
                </button>
                <button className="w-full text-left p-2 rounded border border-white/5 hover:border-white/20 flex items-center justify-between grayscale opacity-50 cursor-not-allowed">
                  <span className="text-white/60 text-xs font-black uppercase italic">High Volatility (L40)</span>
                  <span>🔒</span>
                </button>
             </div>
          </div>
          <SharkTank sharks={INITIAL_SHARKS.slice(0, 3)} />
          <MarketPulse />
        </aside>

        {/* Center Content */}
        <section className="flex-1 flex flex-col gap-6 order-1 lg:order-2 min-w-0">
          {view === 'market' && (
            <MarketFloor 
              bounties={bounties.filter(b => b.status !== BountyStatus.CLAIMED && b.status !== BountyStatus.COMPLETED)} 
              onClaim={claimBounty} 
              onOpenDetails={setSelectedBounty}
            />
          )}
          {view === 'portfolio' && (
            <div className="flex flex-col gap-8 animate-in slide-in-from-bottom-4 duration-500">
              <div className="bg-primary/5 border-2 border-primary/20 rounded-3xl p-8 flex flex-col md:flex-row justify-between items-center gap-6 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
                  <span className="text-[120px]">📊</span>
                </div>
                <div>
                  <h2 className="text-4xl font-black italic text-primary uppercase leading-none tracking-tighter mb-2">Portfolio Hub</h2>
                  <p className="text-white/40 text-xs font-bold uppercase tracking-widest">Tracking assets & historical data</p>
                </div>
                <div className="flex gap-4">
                   <div className="bg-black/40 px-6 py-3 rounded-2xl border border-white/5 text-center">
                      <p className="text-white/40 text-[10px] font-black uppercase">Success Ratio</p>
                      <p className="text-2xl font-black text-white italic">100%</p>
                   </div>
                   <div className="bg-black/40 px-6 py-3 rounded-2xl border border-white/5 text-center">
                      <p className="text-white/40 text-[10px] font-black uppercase">Contracts</p>
                      <p className="text-2xl font-black text-white italic">{activeClaimedCount + completedCount}</p>
                   </div>
                </div>
              </div>

              <div className="space-y-12">
                <div className="animate-in fade-in slide-in-from-left-4 duration-700 delay-150">
                   <h3 className="text-sm font-black text-white/40 uppercase mb-4 tracking-widest flex items-center gap-3">
                    <span className="size-2 bg-blue-500 rounded-full animate-pulse"></span>
                    Active Operations ({activeClaimedCount})
                   </h3>
                   {activeClaimedCount === 0 ? (
                    <div className="bg-card-dark border border-white/5 p-12 text-center rounded-3xl flex flex-col items-center gap-4">
                      <span className="text-4xl grayscale opacity-20">📡</span>
                      <p className="text-white/20 font-bold uppercase italic text-sm">No active signal. Re-enter the floor to claim bounties.</p>
                      <button onClick={() => setView('market')} className="text-primary text-xs font-black uppercase border border-primary/20 px-6 py-2 rounded-full hover:bg-primary/10">Scout Market</button>
                    </div>
                  ) : (
                    <MarketFloor 
                      bounties={bounties.filter(b => b.status === BountyStatus.CLAIMED)} 
                      onClaim={() => {}} 
                      onOpenDetails={setSelectedBounty}
                      hideStats={true}
                    />
                  )}
                </div>

                <div className="animate-in fade-in slide-in-from-left-4 duration-700 delay-300">
                   <h3 className="text-sm font-black text-white/40 uppercase mb-4 tracking-widest flex items-center gap-3">
                    <span className="size-2 bg-gold rounded-full shadow-[0_0_8px_#FFD700]"></span>
                    Historical Extractions ({completedCount})
                   </h3>
                   {completedCount === 0 ? (
                    <div className="bg-card-dark border border-white/5 p-12 text-center rounded-3xl flex flex-col items-center gap-4 grayscale">
                      <span className="text-4xl opacity-20">🏆</span>
                      <p className="text-white/20 font-bold uppercase italic text-sm">Vault is empty. Execute your first contract to build history.</p>
                    </div>
                  ) : (
                    <MarketFloor 
                      bounties={bounties.filter(b => b.status === BountyStatus.COMPLETED)} 
                      onClaim={() => {}} 
                      onOpenDetails={setSelectedBounty}
                      hideStats={true}
                    />
                  )}
                </div>
              </div>
            </div>
          )}
          {view === 'vault' && <div className="animate-in slide-in-from-right-4 duration-500"><Vault user={user} /></div>}
          {view === 'sharks' && <div className="animate-in fade-in duration-500"><SharkTank sharks={INITIAL_SHARKS} expanded={true} /></div>}
        </section>
      </main>

      {/* Footer Status Bar */}
      <footer className="mt-auto border-t border-primary/20 bg-background-dark/95 backdrop-blur-xl p-3 flex flex-wrap justify-between items-center gap-4">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <span className="size-2 rounded-full bg-primary shadow-[0_0_5px_#ff6b00]"></span>
            <span className="text-[10px] font-black uppercase text-primary tracking-widest">Server: Floor #12</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-black uppercase text-white/40 tracking-widest">Ping: 12ms</span>
          </div>
        </div>
        <div className="hidden sm:flex items-center gap-4">
          <div className="flex items-center -space-x-2">
            {[1, 2, 3].map(i => (
              <div key={i} className="size-6 rounded-full border border-primary/40 bg-cover bg-center" style={{ backgroundImage: `url('https://picsum.photos/seed/online${i}/100/100')` }}></div>
            ))}
            <div className="size-6 rounded-full bg-primary/20 flex items-center justify-center text-[8px] font-bold text-primary border border-primary/40">+421</div>
          </div>
          <span className="text-[10px] font-black uppercase text-white/60 tracking-widest">Sharks Online</span>
        </div>
        <div className="flex items-center gap-4">
          <button className="text-xs font-black uppercase text-primary hover:underline italic">Connect Wallet</button>
        </div>
      </footer>
    </div>
  );
};

export default App;
