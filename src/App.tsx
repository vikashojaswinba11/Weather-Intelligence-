/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { SearchBar } from './components/SearchBar';
import { CurrentWeather } from './components/CurrentWeather';
import { ForecastCards } from './components/ForecastCards';
import { ForecastChart } from './components/ForecastChart';
import { PlanningRecommendations } from './components/PlanningRecommendations';
import { Location, WeatherData } from './types';
import { fetchWeather } from './api';
import { Cloud, Loader2 } from 'lucide-react';

export default function App() {
  const [location, setLocation] = useState<Location | null>(null);
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Default to a city on load
  useEffect(() => {
    handleSelectLocation({
      id: 2643743,
      name: "London",
      latitude: 51.5085,
      longitude: -0.1257,
      country: "United Kingdom",
      admin1: "England"
    });
  }, []);

  const handleSelectLocation = async (loc: Location) => {
    setLocation(loc);
    setLoading(true);
    setError('');
    
    try {
      const data = await fetchWeather(loc.latitude, loc.longitude);
      
      const current = {
        temperature: data.current.temperature_2m,
        weatherCode: data.current.weather_code,
        isDay: data.current.is_day === 1,
        windSpeed: data.current.wind_speed_10m,
        humidity: data.current.relative_humidity_2m
      };

      const daily = data.daily.time.map((time: string, index: number) => ({
        date: time,
        maxTemp: data.daily.temperature_2m_max[index],
        minTemp: data.daily.temperature_2m_min[index],
        weatherCode: data.daily.weather_code[index]
      }));

      setWeatherData({
        location: loc,
        current,
        daily
      });
    } catch (err) {
      setError('Failed to fetch weather data for this location.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans selection:bg-blue-100 p-4 md:p-8">
      <div className="max-w-5xl mx-auto space-y-8">
        
        {/* Header */}
        <header className="flex flex-col md:flex-row items-center justify-between gap-6 pt-4 pb-2">
          <div className="flex items-center gap-3 w-full md:w-auto justify-center md:justify-start">
            <div className="bg-blue-500 p-2.5 rounded-xl text-white shadow-sm">
              <Cloud className="h-6 w-6" />
            </div>
            <div>
              <h1 className="text-2xl font-semibold tracking-tight text-slate-900">Weather</h1>
              <p className="text-sm text-slate-500 font-medium">Intelligence Dashboard</p>
            </div>
          </div>
          
          <div className="w-full md:w-auto md:min-w-[320px]">
            <SearchBar onSelect={handleSelectLocation} />
          </div>
        </header>

        {/* Content */}
        {loading && !weatherData ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="h-8 w-8 text-blue-500 animate-spin" />
          </div>
        ) : error ? (
          <div className="bg-red-50 text-red-600 p-6 rounded-2xl text-center border border-red-100 max-w-md mx-auto">
            {error}
          </div>
        ) : weatherData && location ? (
          <main className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Left Column: Current & Recs */}
              <div className="lg:col-span-1 flex flex-col gap-6">
                <CurrentWeather weather={weatherData.current} location={location} />
                <PlanningRecommendations weather={weatherData.current} />
              </div>
              
              {/* Right Column: Chart */}
              <div className="lg:col-span-2">
                <ForecastChart forecast={weatherData.daily} />
              </div>
            </div>

            {/* Bottom Row: Daily Cards */}
            <div>
              <h3 className="text-slate-700 font-medium mb-4 px-1">7-Day Forecast</h3>
              <ForecastCards forecast={weatherData.daily} />
            </div>
          </main>
        ) : null}
      </div>
    </div>
  );
}
