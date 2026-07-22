import React from 'react';
import { DailyForecast } from '../types';
import { getWeatherIcon } from '../weatherUtils';
import { motion } from 'motion/react';

interface Props {
  forecast: DailyForecast[];
}

export const ForecastCards: React.FC<Props> = ({ forecast }) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-3">
      {forecast.map((day, index) => {
        const Icon = getWeatherIcon(day.weatherCode, true);
        const date = new Date(day.date);
        const dayName = new Intl.DateTimeFormat('en-US', { weekday: 'short', timeZone: 'UTC' }).format(date);
        
        return (
          <motion.div
            key={day.date}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="bg-white rounded-2xl p-4 flex flex-col items-center justify-center shadow-sm border border-slate-100"
          >
            <div className="text-slate-500 text-sm font-medium mb-3">{dayName}</div>
            <Icon className="h-8 w-8 text-blue-400 mb-3" strokeWidth={1.5} />
            <div className="flex gap-2 text-sm">
              <span className="font-medium text-slate-800">{Math.round(day.maxTemp)}°</span>
              <span className="text-slate-400">{Math.round(day.minTemp)}°</span>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};
