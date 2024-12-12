import React, { FC } from "react";
import { StyleSheet, Text, View, Image } from "react-native";

type HourlyForecastProps = {
  hourly?: Array<{
    dt: number;
    temp: number;
    weather: Array<{ icon: string }>;
  }>;
};

const HourlyForecast: FC<HourlyForecastProps> = ({ hourly }) => {
  if (!hourly || hourly.length === 0) {
    return (
      <View style={styles.section}>
        <Text style={styles.title}>Today's Forecast</Text>
        <Text>No hourly forecast available.</Text>
      </View>
    );
  }

  return (
    <View style={styles.section}>
      <Text style={styles.title}>Today's Forecast</Text>
      {hourly.slice(0, 12).map((hour, index) => (
        <View key={index} style={styles.row}>
          <Text>{new Date(hour.dt * 1000).toLocaleTimeString()}</Text>
          <Image
            source={{
              uri: `https://openweathermap.org/img/wn/${hour.weather[0].icon}@2x.png`,
            }}
            style={styles.icon}
          />
          <Text>{hour.temp}°C</Text>
        </View>
      ))}
    </View>
  );
};

export default HourlyForecast;

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
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
  },
  icon: {
    width: 40,
    height: 40,
    marginHorizontal: 10,
  },
});
