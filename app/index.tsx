import React from "react";
import { View, Text, Dimensions, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { getColours } from "@/assets/utils/colour-utils";
import OtterDisplay from "@/components/OtterDisplay";
import StartButton from "@/components/StartButton";

export default function HomeScreen() {
  const router = useRouter();

  const handleLogMoodPress = () => {
    getColours().then((trackerColours) => {
      if (trackerColours !== null) {
        router.push("/tabs/log-mood");
        console.log(trackerColours);
      } else {
        router.push("/colour-picker");
      }
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.greetings}>
        <View style={styles.textWrapper}>
          <Text style={styles.title}>Hello there!</Text>
          <Text style={styles.subtitle}>What would you like to do?</Text>
        </View>
        <StartButton text="Log my mood" onPress={handleLogMoodPress} />
        <StartButton
          text="Journal"
          onPress={() => {
            // TODO: Navigate to the tracking screen
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
