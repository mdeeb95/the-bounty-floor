
import React, { useState } from 'react';
import { UserProfile } from '../types';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';

interface VaultProps {
  user: UserProfile;
}

const reportData = [
  { name: 'Security', value: 45, color: '#ff6b00' },
  { name: 'Database', value: 25, color: '#ff8533' },
  { name: 'AI/ML', value: 15, color: '#ffa366' },
  { name: 'Frontend', value: 10, color: '#ffc299' },
  { name: 'Audits', value: 5, color: '#ffe0cc' },
];

const Vault: React.FC<VaultProps> = ({ user }) => {
  const [isExtracting, setIsExtracting] = useState(false);
  const [extractionStep, setExtractionStep] = useState(0);
  const [showReport, setShowReport] = useState(false);

  const steps = [
    "INITIALIZING SECURE TUNNEL...",
    "VERIFYING BIOMETRIC SIGNATURE...",
    "HANDSHAKING WITH COLD STORAGE...",
    "ENCRYPTING PAYLOAD...",
    "EXTRACTION SUCCESSFUL. FUNDS MOVED."
  ];

  const handleExtraction = () => {
    setIsExtracting(true);
    setExtractionStep(0);
    
    const interval = setInterval(() => {
      setExtractionStep(prev => {
        if (prev >= steps.length - 1) {
          clearInterval(interval);
          setTimeout(() => setIsExtracting(false), 2000);
          return prev;
        }
        return prev + 1;
      });
    }, 1200);
  };

  return (
    <div className="flex flex-col gap-8 w-full max-w-5xl mx-auto pb-12">
      {/* Massive Vault Card */}
      <div className="relative w-full rounded-2xl overflow-hidden border border-primary/20 bg-card-dark shadow-2xl p-6 md:p-12 flex flex-col items-center min-h-[500px]">
        {isExtracting ? (
          <div className="absolute inset-0 bg-black/90 z-50 flex flex-col items-center justify-center p-8 text-center animate-in fade-in duration-300">
            <div className="size-20 border-4 border-primary border-t-transparent rounded-full animate-spin mb-8 shadow-[0_0_20px_#ff6b00]"></div>
            <h3 className="text-primary text-xl font-black italic uppercase tracking-tighter mb-4">Tactical Extraction in Progress</h3>
            <div className="font-mono text-primary/80 text-sm space-y-2">
              {steps.slice(0, extractionStep + 1).map((step, i) => (
                <p key={i} className={i === extractionStep ? "animate-pulse" : "opacity-40"}>
                  {i === extractionStep ? "> " : "✓ "} {step}
                </p>
              ))}
            </div>
          </div>
        ) : null}

        <div className="absolute inset-0 opacity-5 pointer-events-none flex items-center justify-center">
          <span className="text-[300px]">🛡️</span>
        </div>

        <div className="relative z-10 flex flex-col items-center justify-center text-center w-full">
          <div className="mb-4 inline-flex items-center gap-2 bg-primary/20 border border-primary/40 px-4 py-1 rounded-full">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            <span className="text-primary text-[10px] font-black tracking-widest uppercase">Vault Security Level: Omega</span>
          </div>

          <h2 className="text-white/60 text-sm font-medium tracking-widest uppercase mb-2">Total Extracted</h2>
          <div className="text-primary text-6xl md:text-8xl font-black mb-12 tracking-tighter italic">
            ${(user.netWorth * 6.7).toLocaleString()}<span className="text-3xl">.00</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full bg-black/60 backdrop-blur-md rounded-2xl p-8 border border-primary/10">
            <div className="flex flex-col gap-2 md:border-r border-primary/10 md:pr-8">
              <p className="text-white/40 text-xs font-bold uppercase tracking-widest text-left">Liquid Assets</p>
              <p className="text-white text-4xl font-black text-left">${user.netWorth.toLocaleString()}.50</p>
              <p className="text-primary text-sm font-medium flex items-center gap-1">
                📈 +12.4% this month
              </p>
            </div>
            <div className="flex flex-col gap-2 md:pl-8">
              <p className="text-white/40 text-xs font-bold uppercase tracking-widest text-left">Digital Ounces</p>
              <p className="text-white text-4xl font-black text-left">124.8 <span className="text-xl text-primary font-medium">oz</span></p>
              <p className="text-primary text-sm font-medium flex items-center gap-1">
                🪙 18 Unspent Tokens
              </p>
            </div>
          </div>

          <div className="mt-10 flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <button 
              onClick={handleExtraction}
              className="bg-primary hover:bg-white text-black font-black px-10 py-4 rounded-xl transition-all shadow-lg flex items-center justify-center gap-2 uppercase tracking-widest text-sm"
            >
              💵 Initiate Extraction
            </button>
            <button 
              onClick={() => setShowReport(!showReport)}
              className={`bg-white/5 hover:bg-white/10 text-white border border-white/10 font-black px-10 py-4 rounded-xl transition-all flex items-center justify-center gap-2 uppercase tracking-widest text-sm ${showReport ? 'border-primary text-primary' : ''}`}
            >
              📊 {showReport ? 'Hide Report' : 'Financial Report'}
            </button>
          </div>
        </div>

        {showReport && (
          <div className="w-full mt-12 animate-in slide-in-from-top-4 duration-500">
            <div className="bg-black/40 rounded-2xl p-6 border border-primary/20">
               <div className="flex justify-between items-center mb-8">
                  <h3 className="text-primary font-black uppercase italic tracking-widest">Quarterly Performance Breakdown</h3>
                  <span className="text-[10px] text-white/40 uppercase font-bold tracking-widest italic">Unit: % of Total Revenue</span>
               </div>
               <div className="h-64 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={reportData}>
                      <XAxis 
                        dataKey="name" 
                        axisLine={false} 
                        tickLine={false} 
                        tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 10, fontWeight: 'bold' }} 
                      />
                      <YAxis hide />
                      <Tooltip 
                        cursor={{ fill: 'rgba(255,107,0,0.05)' }}
                        contentStyle={{ backgroundColor: '#1a100a', border: '1px solid #ff6b00', borderRadius: '8px' }}
                        itemStyle={{ color: '#ff6b00', fontWeight: 'bold' }}
                      />
                      <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                        {reportData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
               </div>
               <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mt-8">
                  {reportData.map((item) => (
                    <div key={item.name} className="flex flex-col">
                      <span className="text-[8px] text-white/40 uppercase font-black">{item.name}</span>
                      <span className="text-white font-bold">{item.value}%</span>
                    </div>
                  ))}
               </div>
            </div>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Arsenal */}
        <div className="bg-card-dark border border-primary/20 rounded-xl p-6">
          <h3 className="text-primary text-lg font-black uppercase tracking-wider mb-6">Arsenal</h3>
          <div className="flex flex-col gap-4">
            {['Bounty Radar', 'Task Shield', 'Double XP'].map((item) => (
              <div key={item} className="group flex items-center justify-between p-4 rounded-xl border border-white/5 bg-black/20 hover:border-primary/50 transition-all cursor-pointer">
                <div className="flex items-center gap-4">
                  <div className="bg-primary/10 p-2 rounded-lg text-primary text-xl">
                    {item === 'Bounty Radar' ? '📡' : item === 'Task Shield' ? '🛡️' : '⚡'}
                  </div>
                  <div>
                    <p className="text-white text-sm font-bold">{item}</p>
                    <p className="text-white/40 text-[10px] uppercase font-bold">Active Tactical Advantage</p>
                  </div>
                </div>
                <button className="px-3 py-1 bg-primary text-black text-[10px] font-black rounded uppercase">Equipped</button>
              </div>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="bg-card-dark border border-primary/20 rounded-xl p-6">
          <h3 className="text-primary text-lg font-black uppercase tracking-wider mb-6">Extraction Stats</h3>
          <div className="space-y-6">
            <div>
              <div className="flex justify-between text-xs mb-2">
                <span className="text-white/40 font-bold uppercase">Success Rate</span>
                <span className="text-primary font-black">98.2%</span>
              </div>
              <div className="w-full h-1.5 bg-black rounded-full overflow-hidden">
                <div className="h-full bg-primary" style={{ width: '98.2%' }}></div>
              </div>
            </div>
            <div className="pt-4 grid grid-cols-2 gap-4 border-t border-primary/10">
              <div>
                <p className="text-white/20 text-[10px] font-bold uppercase">Bounties Won</p>
                <p className="text-2xl font-black italic">152</p>
              </div>
              <div>
                <p className="text-white/20 text-[10px] font-bold uppercase">Hours Logged</p>
                <p className="text-2xl font-black italic">1,840</p>
              </div>
            </div>
            <div className="bg-primary/5 p-4 rounded-xl border border-primary/20">
              <p className="text-primary text-xs font-black uppercase tracking-widest mb-1">Current Rank</p>
              <p className="text-3xl font-black text-white italic tracking-tighter">TOP 0.5%</p>
              <p className="text-white/40 text-[10px] mt-1 font-bold">OUTRANKING 12,450 DEVELOPERS</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Vault;
