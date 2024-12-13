import React, { FC, useEffect, useState } from "react";
import {
  FlatList,
  StyleSheet,
  View,
  Text,
  ActivityIndicator,
} from "react-native";

import { GeoResponse, GeoWeatherResponse } from "../types/types";
import CityItem from "../components/CityItem";
import { fetchCityCoordinates, fetchWeatherForGeoLocations } from "../api/api";
import ErrorComponent from "../components/ErrorComponent";
import ListEmpty from "../components/ListEmpty";

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
  const [staticWeather, setStaticWeather] = useState<GeoWeatherResponse[]>([]);
  const [errors, setErrors] = useState<{ error: string }[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const getStaticWeather = async () => {
    try {
      setIsLoading(true);
      setError(null);
      setErrors([]);

      const geoData: (GeoResponse | { error: string } | null)[] =
        await fetchCityCoordinates(staticData);

      const validGeoData = geoData.filter(
        (item): item is GeoResponse => !!item
      );

      if (validGeoData.length === 0) {
        throw new Error("No valid locations found");
      }
      const weatherResults = await fetchWeatherForGeoLocations(validGeoData);
      const successfulWeather = weatherResults.filter(
        (result): result is GeoWeatherResponse => !("error" in result)
      );
      const errorResults = weatherResults.filter(
        (result): result is { error: string } => "error" in result
      );

      setStaticWeather(successfulWeather);
      setErrors(errorResults);
    } catch (error) {
      error instanceof Error
        ? setError(error.message)
        : setError("An unexpected error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getStaticWeather();
  }, []);

  if (error || errors.length > 0) {
    return (
      <ErrorComponent
        error={error}
        errors={errors}
        onPress={getStaticWeather}
      />
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
        ListEmptyComponent={<ListEmpty isLoading={isLoading} />}
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
  list: {
    paddingTop: 10,
  },
});
