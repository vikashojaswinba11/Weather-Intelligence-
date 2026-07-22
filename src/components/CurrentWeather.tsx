import React from 'react';
import { CurrentWeather as CurrentWeatherType, Location } from '../types';
import { getWeatherDescription, getWeatherIcon } from '../weatherUtils';
import { Droplets, Wind, MapPin } from 'lucide-react';
import { motion } from 'motion/react';

interface Props {
  weather: CurrentWeatherType;
  location: Location;
}

export const CurrentWeather: React.FC<Props> = ({ weather, location }) => {
  const Icon = getWeatherIcon(weather.weatherCode, weather.isDay);
  const description = getWeatherDescription(weather.weatherCode);

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100 flex flex-col items-center text-center w-full"
    >
      <div className="flex items-center gap-2 text-slate-500 mb-6">
        <MapPin className="h-5 w-5" />
        <h2 className="text-xl font-medium text-slate-700">
          {location.name}, {location.country}
        </h2>
      </div>

      <Icon className="h-24 w-24 text-blue-500 mb-4" strokeWidth={1.5} />
      
      <div className="text-6xl font-light text-slate-800 mb-2">
        {Math.round(weather.temperature)}°
      </div>
      
      <div className="text-xl text-slate-500 font-medium mb-8">
        {description}
      </div>

      <div className="grid grid-cols-2 gap-4 w-full max-w-xs">
        <div className="flex items-center justify-center gap-3 bg-slate-50 p-4 rounded-2xl">
          <Wind className="h-5 w-5 text-slate-400" />
          <div className="text-left">
            <div className="text-sm text-slate-500">Wind</div>
            <div className="font-medium text-slate-700">{weather.windSpeed} km/h</div>
          </div>
        </div>
        <div className="flex items-center justify-center gap-3 bg-slate-50 p-4 rounded-2xl">
          <Droplets className="h-5 w-5 text-slate-400" />
          <div className="text-left">
            <div className="text-sm text-slate-500">Humidity</div>
            <div className="font-medium text-slate-700">{weather.humidity}%</div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
