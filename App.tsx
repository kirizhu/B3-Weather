import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ListScreen from "./screens/ListScreen";
import DetailsScreen from "./screens/DetailsScreen";
import { GeoWeatherResponse } from "./api";

export default function App() {
  const [selectedLocation, setSelectedLocation] =
    useState<GeoWeatherResponse | null>(null);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />
      {!selectedLocation ? (
        <ListScreen onLocationSelected={setSelectedLocation} />
      ) : (
        <DetailsScreen
          geoWeather={selectedLocation}
          goBack={() => setSelectedLocation(null)}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    backgroundColor: "#161622",
    alignItems: "center",
    justifyContent: "center",
  },
});
