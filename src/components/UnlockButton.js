import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

const UnlockButton = ({ isWithinRange, onUnlock }) => {
  return (
    <TouchableOpacity
      style={[styles.button, !isWithinRange && styles.disabledButton]}
      onPress={onUnlock}
      disabled={!isWithinRange}
    >
      <Text style={styles.buttonText}>
        {isWithinRange ? "🔓 Unlock Home" : "🚫 Move closer to unlock"}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#007AFF",
    padding: 12,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 20,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  disabledButton: {
    backgroundColor: "#A9A9A9",
  },
});

export default UnlockButton;
