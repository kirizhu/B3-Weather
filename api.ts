const OPEN_WEATHER_API_KEY = process.env.EXPO_PUBLIC_API_KEY;
const OPEN_WEATHER_BASE_URL = process.env.EXPO_PUBLIC_BASE_URL;

export type GeoResponse = {
  name: string;
  local_names?: {
    [key: string]: string;
  };
  lat: number;
  lon: number;
  country: string;
  state?: string;
};

export type WeatherResponse = {
  lat: number;
  lon: number;
  timezone: string;
  timezone_offset: number;
  current: {
    dt: number;
    sunrise: number;
    sunset: number;
    temp: number;
    feels_like: number;
    pressure: number;
    humidity: number;
    dew_point: number;
    uvi: number;
    clouds: number;
    visibility: number;
    wind_speed: number;
    wind_deg: number;
    wind_gust: number;
    weather: {
      id: number;
      main: string;
      description: string;
      icon: string;
    }[];
  };
  hourly?: {
    dt: number;
    temp: number;
    feels_like: number;
    pressure: number;
    humidity: number;
    dew_point: number;
    uvi: number;
    clouds: number;
    visibility: number;
    wind_speed: number;
    wind_deg: number;
    wind_gust: number;
    weather: {
      id: number;
      main: string;
      description: string;
      icon: string;
    }[];
    pop: number;
  }[];
  daily?: {
    dt: number;
    sunrise: number;
    sunset: number;
    moonrise: number;
    moonset: number;
    moon_phase: number;
    summary: string;
    temp: {
      day: number;
      min: number;
      max: number;
      night: number;
      eve: number;
      morn: number;
    };
    feels_like: {
      day: number;
      night: number;
      eve: number;
      morn: number;
    };
    pressure: number;
    humidity: number;
    dew_point: number;
    wind_speed: number;
    wind_deg: number;
    wind_gust: number;
    weather: {
      id: number;
      main: string;
      description: string;
      icon: string;
    }[];
    clouds: number;
    pop: number;
    rain?: number;
    uvi: number;
  }[];
};

export type GeoWeatherResponse = {
  name: string;
  state?: string;
  country: string;
  weather: WeatherResponse;
};

export async function fetchCityCoordinates(
  cities: string[]
): Promise<GeoResponse[]> {
  try {
    const geoLocationsData = await Promise.all(
      cities.map(async (city) => {
        const geoUrl = `${OPEN_WEATHER_BASE_URL}/geo/1.0/direct?q=${city}&limit=5&appid=${OPEN_WEATHER_API_KEY}`;
        const response = await fetch(geoUrl);

        if (!response.ok) {
          throw new Error(`Failed to fetch weather data for ${city}`);
        }
        const geoLocation: GeoResponse[] = await response.json();
        return geoLocation[0];
      })
    );
    return geoLocationsData;
  } catch (error) {
    throw new Error(
      `Error ${error instanceof Error ? error.message : String(error)}`
    );
  }
}

export async function fetchWeatherForGeoLocations(
  geoLocations: GeoResponse[]
): Promise<GeoWeatherResponse[]> {
  try {
    const weatherData = await Promise.all(
      geoLocations.map(async ({ name, state, country, lat, lon }) => {
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
      })
    );

    return weatherData;
  } catch (error) {
    throw new Error(
      `Error ${error instanceof Error ? error.message : String(error)}`
    );
  }
}
