import React from "react";
import { View, Text, Dimensions, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { getColours } from "@/assets/utils/colour-utils";
import { getTrackerType } from "@/assets/utils/tracker-utils";
import MenuButton from "@/components/MenuButton";
import OtterDisplay from "@/components/OtterDisplay";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import Entypo from "@expo/vector-icons/Entypo";

const { width: screenWidth, height: screenHeight } = Dimensions.get("window");
const iconSize = Math.max(screenWidth * 0.03, 20);

const titleFontSize = Math.max(screenWidth * 0.06, 50);

export default function MenuScreen() {
  const router = useRouter();

  const isSmallScreen = screenWidth < 400;
  const iconSizeAdjusted = isSmallScreen ? iconSize : iconSize * 0.75;

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
    <View style={styles.container}>
      <Text style={styles.title}>Menu</Text>
      <View
        style={[
          styles.buttonWrapper,
          isSmallScreen
            ? { left: "40%", top: "40%" }
            : { left: "45%", top: "35%" },
        ]}
      >
        <MenuButton
          text="New mood log"
          onPress={handleLogMoodPress}
          icon={
            <FontAwesome6 name="add" size={iconSizeAdjusted} color="#25292E" />
          }
          iconSize={iconSizeAdjusted}
        />
        <MenuButton
          text="New journal entry"
          onPress={() => {
            // TODO: Navigate to the tracking screen
          }}
          icon={
            <FontAwesome6 name="add" size={iconSizeAdjusted} color="#25292E" />
          }
          iconSize={iconSizeAdjusted}
        />
        <MenuButton
          text="View mood history"
          onPress={() => {
            // TODO: Navigate to the history screen
          }}
          icon={
            <Entypo name="bar-graph" size={iconSizeAdjusted} color="#25292E" />
          }
          iconSize={iconSizeAdjusted}
        />
      </View>
      <View style={{ position: "absolute", top: "25%", left: "30%" }}>
        <OtterDisplay screen="menu" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#C7F0FF",
  },
  buttonWrapper: {
    position: "absolute",
    zIndex: 1,
  },
  title: {
    marginVertical: screenHeight * 0.05,
    fontFamily: "Jua",
    fontSize: titleFontSize,
    fontWeight: "bold",
    marginBottom: screenHeight * 0.01,
    color: "#25292E",
    textAlign: "center",
    position: "relative",
    top: "5%",
  },
});
