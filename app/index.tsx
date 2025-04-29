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
      console.log("Tracker colours:", trackerColours);
      if (trackerColours !== null) {
        router.push({
          pathname: "/tabs/log-mood",
          params: {
            moodTrackerColours: JSON.stringify(trackerColours),
          },
        });
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
const maxWidth = screenWidth * 0.5;

const titleFontSize = Math.min(maxWidth * 0.1, 75);
const subtitleFontSize = Math.min(maxWidth * 0.075, 50);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#74D4E5",
  },
  greetings: {
    position: "absolute",
    top: "45%",
    zIndex: 1,
    left: "45%",
  },
  textWrapper: {
    padding: 10,
    zIndex: -1,
  },
  title: {
    fontFamily: "Jua",
    fontSize: titleFontSize,
    fontWeight: "bold",
    marginBottom: 5,
    color: "#000",
  },
  subtitle: {
    fontFamily: "Jua",
    fontSize: subtitleFontSize,
    color: "#555",
  },
});
