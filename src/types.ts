export interface Location {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  country: string;
  admin1?: string;
}

export interface CurrentWeather {
  temperature: number;
  weatherCode: number;
  isDay: boolean;
  windSpeed: number;
  humidity: number;
}

export interface DailyForecast {
  date: string;
  maxTemp: number;
  minTemp: number;
  weatherCode: number;
}

export interface WeatherData {
  location: Location;
  current: CurrentWeather;
  daily: DailyForecast[];
}
