import React, { FC } from "react";
import { StyleSheet, Text, View } from "react-native";

type CurrentWeatherProps = {
  name: string;
  current: {
    temp: number;
    humidity: number;
    wind_speed: number;
  };
};

const CurrentWeather: FC<CurrentWeatherProps> = ({ name, current }) => (
  <View style={styles.section}>
    <Text style={styles.title}>{name} Current Weather</Text>
    <Text>Temperature: {current.temp}°C</Text>
    <Text>Humidity: {current.humidity}%</Text>
    <Text>Wind Speed: {current.wind_speed} m/s</Text>
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
});
