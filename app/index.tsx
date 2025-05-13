import React from "react";
import { View, Text, Dimensions, StyleSheet, ScrollView } from "react-native";
import { useRouter } from "expo-router";
import { getColours } from "@/assets/utils/colour-utils";
import { getTrackerType } from "@/assets/utils/tracker-utils";
import OtterDisplay from "@/components/OtterDisplay";
import StartButton from "@/components/StartButton";

export default function HomeScreen() {
  const router = useRouter();

  const isSmallScreen = screenWidth < 400;

  const handleLogMoodPress = async () => {
    try {
      const trackerColours = await getColours();
      console.log("Tracker colours:", trackerColours);
      const trackerType = await getTrackerType();
      console.log("Tracker type:", trackerType);

      if (trackerColours !== null && trackerType !== null) {
        router.push({
          pathname: "/tabs/log-mood",
          params: {
            moodTrackerColours: JSON.stringify(trackerColours),
            trackerType: JSON.stringify(trackerType),
          },
        });
      } else {
        router.push("/user-preferences");
      }
    } catch (error) {
      console.error("Error retrieving tracker colours:", error);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <View
          style={[
            styles.greetings,
            isSmallScreen
              ? { left: "40%", top: "40%" }
              : { left: "45%", top: "40%" },
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
                router.push("/tabs/journal");
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
    </ScrollView>
  );
}

const { width: screenWidth } = Dimensions.get("window");
const maxWidth = screenWidth * 0.5;

const titleFontSize = Math.max(screenWidth * 0.05, 35);
const subtitleFontSize = Math.max(maxWidth * 0.075, 25);

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    backgroundColor: "#74D4E5",
    justifyContent: "center",
  },
  container: {
    flex: 1,
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
