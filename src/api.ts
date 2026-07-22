import { Location } from './types';

export const searchCity = async (query: string): Promise<Location[]> => {
  const url = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(query)}&count=5&language=en&format=json`;
  const response = await fetch(url);
  if (!response.ok) throw new Error('Failed to fetch city data');
  const data = await response.json();
  return data.results || [];
};

export const fetchWeather = async (lat: number, lon: number): Promise<any> => {
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,is_day,weather_code,wind_speed_10m&daily=weather_code,temperature_2m_max,temperature_2m_min&timezone=auto`;
  const response = await fetch(url);
  if (!response.ok) throw new Error('Failed to fetch weather data');
  const data = await response.json();
  return data;
};
