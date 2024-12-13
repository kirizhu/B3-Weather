import {
  GeoResponse,
  GeoWeatherResponse,
  WeatherResponse,
} from "../types/types";

const OPEN_WEATHER_API_KEY = process.env.EXPO_PUBLIC_API_KEY;
const OPEN_WEATHER_BASE_URL = process.env.EXPO_PUBLIC_BASE_URL;

export async function fetchCityCoordinates(
  cities: string[]
): Promise<(GeoResponse | { error: string })[]> {
  const results = await Promise.all(
    cities.map(async (city) => {
      try {
        const geoUrl = `${OPEN_WEATHER_BASE_URL}/geo/1.0/direct?q=${city}&limit=5&appid=${OPEN_WEATHER_API_KEY}`;
        const response = await fetch(geoUrl);

        if (!response.ok) {
          throw new Error(`Failed to fetch weather data for ${city}`);
        }

        const geoLocation: GeoResponse[] = await response.json();
        return geoLocation[0];
      } catch (error) {
        return {
          error: error instanceof Error ? error.message : String(error),
        };
      }
    })
  );

  return results;
}

export async function fetchWeatherForGeoLocations(
  geoLocations: GeoResponse[]
): Promise<(GeoWeatherResponse | { error: string })[]> {
  const weatherData = await Promise.all(
    geoLocations.map(async ({ name, state, country, lat, lon }) => {
      try {
        const weatherUrl = `${OPEN_WEATHER_BASE_URL}/data/3.0/onecall?lat=${lat}&lon=${lon}&exclude=minutely,alerts&units=metric&appid=${OPEN_WEATHER_API_KEY}`;
        const response = await fetch(weatherUrl);

        if (!response.ok) {
          throw new Error(`Failed to fetch weather data for ${name}`);
        }

        const weather: WeatherResponse = await response.json();
        return {
          name,
          state,
          country,
          weather,
        };
      } catch (error) {
        return {
          error: error instanceof Error ? error.message : String(error),
        };
      }
    })
  );

  return weatherData;
}
