import React, { FC } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { GeoWeatherResponse } from "../api";
import CurrentWeather from "../components/CurrentWeather";
import HourlyForecast from "../components/HourlyForecast";
import DailyForecast from "../components/DailyForecast";

type DetailsScreenProps = {
  geoWeather: GeoWeatherResponse;
  goBack: () => void;
};

const DetailsScreen: FC<DetailsScreenProps> = ({ geoWeather, goBack }) => {
  const { name, weather } = geoWeather;

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={goBack}>
        <Ionicons
          name="arrow-back"
          size={24}
          color="#fff"
          style={styles.buttonIcon}
        />
        <Text style={styles.text}>Go Back</Text>
      </TouchableOpacity>
      <ScrollView>
        <CurrentWeather name={name} current={weather.current} />
        <HourlyForecast hourly={weather.hourly} />
        <DailyForecast daily={weather.daily} />
      </ScrollView>
    </View>
  );
};

export default DetailsScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#161622",
    flex: 1,
    width: "100%",
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  buttonIcon: {
    marginRight: 10,
  },
  text: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "500",
  },
});
