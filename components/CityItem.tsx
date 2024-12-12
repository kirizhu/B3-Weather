import React, { FC } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { GeoWeatherResponse } from "../api";

type CityItemProps = {
  item: GeoWeatherResponse;
  onPress: (item: GeoWeatherResponse) => void;
};

const CityItem: FC<CityItemProps> = ({ item, onPress }) => (
  <TouchableOpacity style={styles.container} onPress={() => onPress(item)}>
    <View style={{ flex: 1 }}>
      <View style={{ flexDirection: "row" }}>
        <Text style={styles.cityText}>{item.name}, </Text>
        {item.state && <Text style={styles.cityText}>{item.state}, </Text>}
      </View>
      <Text style={styles.cityText}>{item.country}</Text>
    </View>
    <Text style={styles.temp}>{item.weather.current.temp}°C</Text>
  </TouchableOpacity>
);

export default CityItem;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    padding: 15,
    backgroundColor: "#CDCDE0",
    borderRadius: 8,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  cityText: {
    fontSize: 18,
    fontWeight: "600",
  },
  temp: {
    fontWeight: "700",
    textAlign: "right",
    alignSelf: "center",
    marginLeft: 10,
  },
});
