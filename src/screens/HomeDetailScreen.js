import React, { useState, useEffect } from "react";
import { View, Text, Image, Alert, StyleSheet } from "react-native";
import * as Location from "expo-location";
import UnlockButton from "../components/UnlockButton";

const DetailsScreen = ({ route }) => {
  const { home } = route.params;
  const [location, setLocation] = useState(null);
  const [unlock, setUnlock] = useState(false);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("Permission Denied", "Enable location to unlock homes");
        return;
      }
      let loc = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Highest,
      });
      setLocation(loc.coords);
    })();
  }, []);

  const isWithinRange = () => {
    if (!location) return false;
    const distance = Math.sqrt(
      Math.pow(parseFloat(home.latitude) - location.latitude, 2) +
        Math.pow(parseFloat(home.longitude) - location.longitude, 2)
    );
    console.log("Current location:", location);
    console.log("Home location:", home.latitude, home.longitude);
    console.log("Calculated distance:", distance);
    return distance < 0.0003; // Approx. 30m
  };

  const handleUnlock = () => {
    if (isWithinRange()) {
      setUnlock(true);
      Alert.alert("Success", "Home Unlocked!");
    } else {
      Alert.alert("Error", "You must be within 30m to unlock the home.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{home.address}</Text>
      <Image source={{ uri: home.imagerUrl }} style={styles.image} />
      <Text style={styles.description}>{home.description}</Text>
      {isWithinRange() && !unlock && (
        <UnlockButton isWithinRange={isWithinRange()} onUnlock={handleUnlock} />
      )}
      {unlock && <Text style={styles.unlockedText}>✅ Home is Unlocked!</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: "center",
    backgroundColor: "#f8f9fa",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  image: {
    width: 300,
    height: 200,
    borderRadius: 10,
    marginBottom: 15,
  },
  description: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 20,
  },
  unlockedText: {
    fontSize: 18,
    color: "green",
    fontWeight: "bold",
  },
});

export default DetailsScreen;
