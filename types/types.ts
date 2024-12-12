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
    temp: number;
    humidity: number;
    wind_speed: number;
  };
  hourly?: {
    dt: number;
    temp: number;
    weather: { icon: string }[];
  }[];
  daily?: {
    dt: number;
    temp: { day: number };
    weather: { icon: string; description: string }[];
  }[];
};

export type GeoWeatherResponse = {
  name: string;
  state?: string;
  country: string;
  weather: WeatherResponse;
};
