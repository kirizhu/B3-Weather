import React, { FC, useEffect, useState } from "react";
import {
  FlatList,
  StyleSheet,
  View,
  Text,
  ActivityIndicator,
} from "react-native";

import { GeoWeatherResponse } from "../types/types";
import CityItem from "../components/CityItem";
import { fetchCityCoordinates, fetchWeatherForGeoLocations } from "../api/api";

const staticData: string[] = [
  "Stockholm",
  "New York",
  "London",
  "Dubai",
  "Tokyo",
];

type ListScreenProps = {
  onLocationSelected: (response: GeoWeatherResponse) => void;
};

const ListScreen: FC<ListScreenProps> = ({ onLocationSelected }) => {
  const [staticWeather, setStaticWeather] = useState<
    GeoWeatherResponse[] | null
  >(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const getStaticWeather = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const geoData = await fetchCityCoordinates(staticData);
      const weatherData = await fetchWeatherForGeoLocations(geoData);

      setStaticWeather(weatherData);
    } catch (error) {
      setError(
        error instanceof Error ? error.message : "An unexpected error occurred"
      );
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getStaticWeather();
  }, []);

  if (error) {
    return (
      <View style={styles.centeredContainer}>
        <Text style={styles.centeredText}>{error}</Text>
        <Text style={styles.retryText} onPress={getStaticWeather}>
          Tap to Retry
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={staticWeather}
        keyExtractor={(item) => item.name + item.country}
        renderItem={({ item }) => (
          <CityItem item={item} onPress={onLocationSelected} />
        )}
        contentContainerStyle={styles.list}
        ListEmptyComponent={
          isLoading ? (
            <View style={styles.centeredContainer}>
              <ActivityIndicator size="large" color="#ffffff" />
              <Text style={styles.loadingText}>Loading weather data...</Text>
            </View>
          ) : (
            <Text style={styles.centeredText}>No weather data available</Text>
          )
        }
      />
    </View>
  );
};

export default ListScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    padding: 20,
    backgroundColor: "#161622",
  },
  centeredContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#161622",
  },
  list: {
    paddingTop: 10,
  },
  loadingText: {
    color: "#ffffff",
    marginTop: 10,
    fontSize: 16,
  },
  centeredText: {
    color: "#ffffff",
    fontSize: 16,
    textAlign: "center",
  },
  retryText: {
    color: "#ffffff",
    marginTop: 10,
    fontSize: 16,
    textDecorationLine: "underline",
  },
});
