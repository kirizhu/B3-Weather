import { StyleSheet, Text, View } from "react-native";
import React, { FC } from "react";

type ErrorProps = {
  error: string | null;
  errors: { error: string }[];
  onPress: () => Promise<void>;
};

const ErrorComponent: FC<ErrorProps> = ({ error, errors, onPress }) => {
  return (
    <View style={styles.centeredContainer}>
      {error && <Text style={styles.centeredText}>{error}</Text>}
      {errors.length > 0 &&
        errors.map((err, index) => (
          <Text key={index} style={styles.centeredText}>
            {err.error}
          </Text>
        ))}
      <Text style={styles.retryText} onPress={onPress}>
        Tap to Retry
      </Text>
    </View>
  );
};

export default ErrorComponent;

const styles = StyleSheet.create({
  centeredContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#161622",
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
