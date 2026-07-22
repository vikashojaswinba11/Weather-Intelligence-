import React from 'react';
import { CurrentWeather } from '../types';
import { motion } from 'motion/react';
import { Lightbulb } from 'lucide-react';

interface Props {
  weather: CurrentWeather;
}

export const PlanningRecommendations: React.FC<Props> = ({ weather }) => {
  const getRecommendations = () => {
    const recs: string[] = [];
    
    // Temperature logic
    if (weather.temperature < 5) {
      recs.push("It's freezing! Wear a heavy coat, gloves, and a hat.");
    } else if (weather.temperature < 15) {
      recs.push("A bit chilly. A light jacket or sweater is recommended.");
    } else if (weather.temperature > 25) {
      recs.push("It's quite warm. Stay hydrated and wear light clothing.");
    } else {
      recs.push("Perfect temperature for outdoor activities.");
    }

    // Weather code logic
    if ([61, 63, 65, 66, 67, 80, 81, 82].includes(weather.weatherCode)) {
      recs.push("Rain expected. Don't forget to bring an umbrella!");
    } else if ([71, 73, 75, 77, 85, 86].includes(weather.weatherCode)) {
      recs.push("Snowy conditions. Wear appropriate boots and drive safely.");
    } else if ([95, 96, 99].includes(weather.weatherCode)) {
      recs.push("Thunderstorms in the area. Best to stay indoors if possible.");
    } else if (weather.weatherCode === 0 || weather.weatherCode === 1) {
      recs.push("Clear skies. Great day for a walk or outdoor plans.");
    }

    // Wind logic
    if (weather.windSpeed > 30) {
      recs.push("It's quite windy out there. Secure loose items.");
    }

    return recs;
  };

  const recommendations = getRecommendations();

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-3xl p-6 shadow-sm border border-amber-100/50 w-full"
    >
      <div className="flex items-center gap-3 mb-4 text-amber-700 font-medium">
        <Lightbulb className="h-5 w-5" />
        <h3>Smart Planning</h3>
      </div>
      <ul className="space-y-3">
        {recommendations.map((rec, idx) => (
          <li key={idx} className="flex items-start gap-2 text-slate-700 text-sm leading-relaxed">
            <span className="text-amber-400 mt-0.5">•</span>
            {rec}
          </li>
        ))}
      </ul>
    </motion.div>
  );
};
