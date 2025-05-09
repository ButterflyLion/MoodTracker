import React, { useState } from "react";
import { ScrollView, StyleSheet } from "react-native";
import MultiStepForm from "@/components/MultiStepForm";
import MoodTrackerColourPicker from "../components/MoodTrackerColourPicker";
import MoodTrackerPicker from "../components/MoodTrackerPicker";
import * as colourUtils from "@/assets/utils/colour-utils";
import { useRouter } from "expo-router";

export default function UserPreferences() {
  const router = useRouter();
  const [colours, setColours] = useState<colourUtils.Colours>({
    highArousal: "#FFFFFF",
    lowArousal: "#FFFFFF",
    pleasant: "#FFFFFF",
    unpleasant: "#FFFFFF",
  });

  const handleDone = () => {
    console.log("Done button pressed");
    console.log("colours", colours);
    router.push({
      pathname: "/tabs/log-mood",
      params: {
        moodTrackerColours: JSON.stringify(colours),
      },
    });
    console.log("Navigating to log-mood");
  };

  return (
    <ScrollView style={styles.container}>
      <MultiStepForm
        steps={[
          <MoodTrackerColourPicker colours={colours} setColours={setColours} />,
          <MoodTrackerPicker colours={colours} />,
        ]}
        onFirstNextButtonPress={() => {
          colourUtils.saveColoursToStorage(colours);
        }}
        onDoneButtonPress={handleDone}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#C7F0FF",
  },
});
