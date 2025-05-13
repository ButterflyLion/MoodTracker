import React, { useState } from "react";
import { ScrollView, StyleSheet } from "react-native";
import MultiStepForm from "@/components/MultiStepForm";
import MoodTrackerColourPicker from "../components/MoodTrackerColourPicker";
import MoodTrackerPicker from "../components/MoodTrackerPicker";
import { Colours, saveColoursToStorage } from "@/assets/utils/colour-utils";
import { TrackerType, saveTrackerTypeToStorage } from "@/assets/utils/tracker-utils";
import { useRouter } from "expo-router";

export default function UserPreferences() {
  const router = useRouter();
  const [colours, setColours] = useState<Colours>({
    highEnergy: "#FFFFFF",
    lowEnergy: "#FFFFFF",
    pleasant: "#FFFFFF",
    unpleasant: "#FFFFFF",
  });
  const [trackerType, setTrackerType] = useState<TrackerType>({option: "none"});

  const handleDone = () => {
    console.log("Done button pressed");
    console.log("colours", colours);
    console.log("trackerType", trackerType);
    router.push({
      pathname: "/tabs/log-mood",
      params: {
        moodTrackerColours: JSON.stringify(colours),
        trackerType: trackerType.option,
      },
    });
    console.log("Navigating to log-mood");
  };

  return (
    <ScrollView style={styles.container}>
      <MultiStepForm
        steps={[
          <MoodTrackerColourPicker colours={colours} setColours={setColours} />,
          <MoodTrackerPicker colours={colours} trackerType={trackerType} setTrackerType={setTrackerType} />,
        ]}
        onFirstNextButtonPress={() => {
          saveColoursToStorage(colours);
        }}
        onSecondNextButtonPress={() => {
          saveTrackerTypeToStorage(trackerType.option);
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
