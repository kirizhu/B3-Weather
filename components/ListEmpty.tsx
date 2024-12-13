import React, { FC } from "react";
import { View, Text, ActivityIndicator, StyleSheet } from "react-native";

interface ListEmptyProps {
  isLoading: boolean;
}

const ListEmpty: FC<ListEmptyProps> = ({ isLoading }) => {
  return (
    <View style={styles.centeredContainer}>
      {isLoading ? (
        <>
          <ActivityIndicator size="large" color="#ffffff" />
          <Text style={styles.loadingText}>Loading weather data...</Text>
        </>
      ) : (
        <Text style={styles.centeredText}>No weather data available</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  centeredContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    color: "#ffffff",
    fontSize: 16,
    marginTop: 10,
  },
  centeredText: {
    color: "#ffffff",
    fontSize: 16,
  },
});

export default ListEmpty;
