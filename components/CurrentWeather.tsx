import React, { FC } from "react";
import { StyleSheet, Text, View } from "react-native";
import { WeatherResponse } from "../types/types";

type CurrentWeatherProps = {
  name: string;
  current: WeatherResponse["current"];
};

const CurrentWeather: FC<CurrentWeatherProps> = ({ name, current }) => (
  <View style={styles.section}>
    <Text style={styles.title}>{name} Current Weather</Text>
    <Text style={styles.text}>Temperature: {current.temp}°C</Text>
    <Text style={styles.text}>Humidity: {current.humidity}%</Text>
    <Text style={styles.text}>Wind Speed: {current.wind_speed} m/s</Text>
  </View>
);

export default CurrentWeather;

const styles = StyleSheet.create({
  section: {
    margin: 10,
    padding: 10,
    backgroundColor: "#CDCDE0",
    borderRadius: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  text: {
    fontSize: 18,
  },
});
