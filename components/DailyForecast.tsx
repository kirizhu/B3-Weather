import React, { FC } from "react";
import { StyleSheet, Text, View, Image } from "react-native";

type DailyForecastProps = {
  daily?: Array<{
    dt: number;
    temp: {
      day: number;
    };
    weather: Array<{ icon: string; description: string }>;
  }>;
};

const DailyForecast: FC<DailyForecastProps> = ({ daily }) => {
  if (!daily || daily.length === 0) {
    return (
      <View style={styles.section}>
        <Text style={styles.title}>Tomorrow's Forecast</Text>
        <Text>No daily forecast available.</Text>
      </View>
    );
  }

  return (
    <View style={styles.section}>
      <Text style={styles.title}>Tomorrow's Forecast</Text>
      {daily.slice(1, 2).map((day, index) => (
        <View key={index}>
          <Text>Temperature: {day.temp.day}°C</Text>
          <Image
            source={{
              uri: `https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`,
            }}
            style={styles.icon}
          />
          <Text>Weather: {day.weather[0].description}</Text>
        </View>
      ))}
    </View>
  );
};

export default DailyForecast;

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
  icon: {
    width: 40,
    height: 40,
    marginHorizontal: 10,
  },
});
