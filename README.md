# Weather Intelligence App

A modern, responsive React web application that provides real-time weather data, a 7-day forecast, interactive chart visualizations, and smart planning recommendations based on the current weather conditions.

## Features

- **City Search:** Search for any city worldwide using the Open-Meteo Geocoding API.
- **Current Weather:** View the current temperature, weather conditions, wind speed, and humidity.
- **7-Day Forecast:** Detailed daily forecast cards showing minimum and maximum temperatures and expected weather conditions.
- **Interactive Chart:** A responsive area chart visualizing the temperature trend for the upcoming week.
- **Smart Planning Recommendations:** Context-aware suggestions based on the current weather (e.g., "Bring an umbrella", "Wear a heavy coat").
- **Error Handling:** Graceful fallbacks for "City not found" or API failures.
- **Responsive Design:** A polished, mobile-first design using Tailwind CSS.

## Tech Stack

- **Framework:** React 19 with Vite
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Icons:** Lucide React
- **Animations:** Motion
- **Charts:** Recharts
- **APIs:** [Open-Meteo](https://open-meteo.com/) (Geocoding & Forecast APIs)

## Getting Started

1. Install the dependencies:
   ```bash
   npm install
   ```

2. Run the development server:
   ```bash
   npm run dev
   ```

3. Build for production:
   ```bash
   npm run build
   ```

## License

This project is licensed under the MIT License.
