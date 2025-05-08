import React from "react";
import { View, Text, Dimensions, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { getColours } from "@/assets/utils/colour-utils";
import OtterDisplay from "@/components/OtterDisplay";
import StartButton from "@/components/StartButton";

export default function HomeScreen() {
  const router = useRouter();

  const isSmallScreen = screenWidth < 400;

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
        router.push("/user-preferences");
      }
    });
  };

  return (
    <View style={styles.container}>
      <View
        style={[
          styles.greetings,
          isSmallScreen
            ? { left: "40%", top: "40%" }
            : { left: "45%", top: "45%" },
        ]}
      >
        <View style={styles.textWrapper}>
          <Text style={styles.title}>Hello there!</Text>
          <Text style={styles.subtitle}>What would you like to do?</Text>
        </View>
        <View>
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
              router.push("/tabs/menu");
            }}
          />
        </View>
      </View>
      <OtterDisplay screen="index" />
    </View>
  );
}

const { width: screenWidth } = Dimensions.get("window");
const maxWidth = screenWidth * 0.5;

const titleFontSize = Math.max(screenWidth * 0.05, 35);
const subtitleFontSize = Math.max(maxWidth * 0.075, 25);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#74D4E5",
  },
  greetings: {
    position: "absolute",
    zIndex: 1,
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
    color: "#25292E",
    maxWidth: maxWidth,
  },
  subtitle: {
    fontFamily: "Jua",
    fontSize: subtitleFontSize,
    color: "#25292E",
    maxWidth: maxWidth,
  },
});
