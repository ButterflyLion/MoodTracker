import React from "react";
import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { useFonts } from "expo-font";
import OtterDisplay from "@/components/OtterDisplay";
import StartButton from "@/components/StartButton";

export default function HomeScreen() {
  const [fontsLoaded] = useFonts({
    Jua: require("@/assets/fonts/Jua-Regular.ttf"),
  });

  return (
    <View style={styles.container}>
      {!fontsLoaded && (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      )}
      <View style={styles.greetings}>
        <View style={styles.textWrapper}>
          <Text style={styles.title}>Hello there!</Text>
          <Text style={styles.subtitle}>What would you like to do?</Text>
        </View>
        <StartButton
          text="Log my mood"
          onPress={() => {
            // TODO: Navigate to the mood tracking screen
          }}
        />
        <StartButton
          text="Journal"
          onPress={() => {
            // TODO: Navigate to the journaling screen
          }}
        />
        <StartButton
          text="Go to menu"
          onPress={() => {
            // TODO: Navigate to the menu screen
          }}
        />
      </View>

      <OtterDisplay />
    </View>
  );
}

const { width: screenWidth, height: screenHeight } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  greetings: {
    position: "absolute",
    right: screenWidth * 0.15,
    top: "50%",
    zIndex: 1,
    padding: 10,
  },
  textWrapper: {
    padding: 10,
    zIndex: -1,
  },
  title: {
    fontFamily: "Jua",
    fontSize: screenWidth * 0.07,
    fontWeight: "bold",
    marginBottom: 5,
    color: "#000",
  },
  subtitle: {
    fontFamily: "Jua",
    fontSize: screenWidth * 0.04,
    color: "#555",
  },
  button: {
    marginTop: 20,
    padding: 10,
    backgroundColor: "#007BFF",
    borderRadius: 5,
  },
});
