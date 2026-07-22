import React from 'react';
import { DailyForecast } from '../types';
import { AreaChart, Area, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { motion } from 'motion/react';

interface Props {
  forecast: DailyForecast[];
}

export const ForecastChart: React.FC<Props> = ({ forecast }) => {
  const data = forecast.map(day => ({
    name: new Intl.DateTimeFormat('en-US', { weekday: 'short', timeZone: 'UTC' }).format(new Date(day.date)),
    max: Math.round(day.maxTemp),
    min: Math.round(day.minTemp),
  }));

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 w-full h-[320px] flex flex-col"
    >
      <h3 className="text-slate-700 font-medium mb-6">Temperature Trend</h3>
      <div className="flex-1 min-h-0">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="colorMax" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.2}/>
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <XAxis 
              dataKey="name" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: '#94a3b8', fontSize: 12 }} 
              dy={10} 
            />
            <YAxis 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: '#94a3b8', fontSize: 12 }} 
            />
            <Tooltip 
              contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
              labelStyle={{ color: '#64748b', marginBottom: '4px' }}
            />
            <Area 
              type="monotone" 
              dataKey="max" 
              stroke="#3b82f6" 
              strokeWidth={3} 
              fillOpacity={1} 
              fill="url(#colorMax)" 
              name="High (°C)" 
            />
            <Line 
              type="monotone" 
              dataKey="min" 
              stroke="#94a3b8" 
              strokeWidth={2} 
              dot={false} 
              name="Low (°C)" 
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
};
