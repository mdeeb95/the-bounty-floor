
import React from 'react';
import { LineChart, Line, ResponsiveContainer, YAxis, XAxis, Tooltip } from 'recharts';

const data = [
  { value: 20 }, { value: 35 }, { value: 25 }, { value: 50 }, 
  { value: 30 }, { value: 65 }, { value: 45 }, { value: 80 },
  { value: 60 }, { value: 90 }, { value: 75 }, { value: 100 }
];

const MarketPulse: React.FC = () => {
  return (
    <div className="bg-card-dark border border-primary/20 rounded-xl p-5">
      <h3 className="text-primary text-xs font-black uppercase tracking-[0.2em] mb-4">Market Pulse</h3>
      <div className="flex flex-col gap-4">
        <div className="flex justify-between items-end">
          <div>
            <p className="text-[10px] text-white/40 uppercase font-bold">Payout Volatility</p>
            <p className="text-xl font-black text-primary uppercase italic">Extreme</p>
          </div>
          <div className="h-16 w-32">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data}>
                <Line 
                  type="monotone" 
                  dataKey="value" 
                  stroke="#ff6b00" 
                  strokeWidth={2} 
                  dot={false}
                  animationDuration={2000}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-2 mt-2">
          <div className="bg-black/40 p-2 rounded border border-white/5">
            <p className="text-[8px] text-white/40 uppercase">Open Trades</p>
            <p className="text-sm font-bold text-white">1,242</p>
          </div>
          <div className="bg-black/40 p-2 rounded border border-white/5">
            <p className="text-[8px] text-white/40 uppercase">Success Rate</p>
            <p className="text-sm font-bold text-primary">94.2%</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarketPulse;
