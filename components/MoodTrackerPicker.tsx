import React, { useMemo, useState } from "react";
import {
  Text,
  StyleSheet,
  View,
  ScrollView,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import * as colourUtils from "@/assets/utils/colour-utils";
import MoodLoggerGraph from "@/components/MoodLoggerGraph";
import Slider from "@/components/Slider";
import Fontisto from "@expo/vector-icons/Fontisto";
import SimpleLineIcons from "@expo/vector-icons/SimpleLineIcons";
import AsyncStorage from "@react-native-async-storage/async-storage";

const { width: screenWidth, height: screenHeight } = Dimensions.get("window");
const titleFontSize = Math.min(screenWidth * 0.08, 70);
const fontSize = Math.max(screenHeight * 0.025, 40);
const maxWidth = screenWidth * 0.8;
const borderWidth = Math.min(maxWidth * 0.015, 7);
const borderRadius = Math.min(maxWidth * 0.05, 20);

const GRAPH_CONTAINER_WIDTH = screenWidth * 0.85;
const GRAPH_CONTAINER_HEIGHT = screenHeight * 0.55;
const GRAPH_SIZE = Math.min(GRAPH_CONTAINER_WIDTH, GRAPH_CONTAINER_HEIGHT);

interface SelectedOptionParams {
  option: "graph" | "slider" | "both";
}

interface Props {
  colours: colourUtils.Colours;
}

export default function MoodTrackerPicker({ colours }: Props) {
  const [selectedOption, setSelectedOption] =
    useState<SelectedOptionParams | null>(null);
  const {
    pleasant,
    mediumPleasantness,
    neutralPleasantness,
    mediumUnpleasantness,
    unpleasant,
    highArousal,
    mediumHighArousal,
    neutralArousal,
    mediumLowArousal,
    lowArousal,
  } = useMemo(() => {
    return colourUtils.generateMoodColors({
      pleasant: colours.pleasant,
      unpleasant: colours.unpleasant,
      highArousal: colours.highArousal,
      lowArousal: colours.lowArousal,
    });
  }, [colours]);

  async function saveSelectedOptionToStorage(
    option: SelectedOptionParams
  ): Promise<void> {
    try {
      await AsyncStorage.setItem("selectedTracker", JSON.stringify(option));
      console.log("Option saved to storage:", option);
    } catch (error) {
      console.error("Error saving selectedTracker to storage:", error);
    }
  }

  const handleOptionSelect = (option: SelectedOptionParams) => {
    setSelectedOption(option);
    saveSelectedOptionToStorage(option);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Pick Your Mood Tracker</Text>

      {/* Both Option */}
      <TouchableOpacity
        style={[
          styles.optionButton,
          selectedOption?.option === "both" && styles.selectedOption,
        ]}
        onPress={() => handleOptionSelect({ option: "both" })}
        activeOpacity={0.8}
      >
        <MoodLoggerGraph
          pleasant={pleasant}
          medium_pleasantness={mediumPleasantness}
          neutral_pleasantness={neutralPleasantness}
          medium_unpleasantness={mediumUnpleasantness}
          unpleasant={unpleasant}
          high_arousal={highArousal}
          medium_high_arousal={mediumHighArousal}
          neutral_arousal={neutralArousal}
          medium_low_arousal={mediumLowArousal}
          low_arousal={lowArousal}
          graphSize={GRAPH_SIZE}
        />
        <View style={{ padding: screenHeight * 0.01 }}>
          <Text style={styles.sliderLabel}>Pleasantness</Text>
          <Slider
            sliderWidth={GRAPH_SIZE}
            buttonHeight={GRAPH_SIZE / 20}
            value={0.5}
            trackColours={[unpleasant, neutralPleasantness, pleasant]}
            thumbComponent={
              <Fontisto
                name="smiley"
                size={(GRAPH_SIZE / 20) * (44 / 34) * 0.9}
                color="#25292E"
              />
            }
            disabled={true}
          />
          <Text style={styles.sliderLabel}>Arousal</Text>
          <Slider
            sliderWidth={GRAPH_SIZE}
            buttonHeight={GRAPH_SIZE / 20}
            value={1 - 0.5}
            trackColours={[lowArousal, neutralArousal, highArousal]}
            thumbComponent={
              <SimpleLineIcons
                name="energy"
                size={(GRAPH_SIZE / 20) * (44 / 34) * 0.9}
                color="#25292E"
              />
            }
            disabled={true}
          />
        </View>
      </TouchableOpacity>

      <Text style={styles.title}>Or</Text>

      {/* Graph Option */}
      <TouchableOpacity
        style={[
          styles.optionButton,
          selectedOption?.option === "graph" && styles.selectedOption,
        ]}
        onPress={() => handleOptionSelect({ option: "graph" })}
        activeOpacity={0.8}
      >
        <MoodLoggerGraph
          pleasant={pleasant}
          medium_pleasantness={mediumPleasantness}
          neutral_pleasantness={neutralPleasantness}
          medium_unpleasantness={mediumUnpleasantness}
          unpleasant={unpleasant}
          high_arousal={highArousal}
          medium_high_arousal={mediumHighArousal}
          neutral_arousal={neutralArousal}
          medium_low_arousal={mediumLowArousal}
          low_arousal={lowArousal}
          graphSize={GRAPH_SIZE}
        />
      </TouchableOpacity>

      <Text style={styles.title}>Or</Text>

      {/* Slider Option */}
      <TouchableOpacity
        style={[
          styles.optionButton,
          selectedOption?.option === "slider" && styles.selectedOption,
        ]}
        onPress={() => handleOptionSelect({ option: "slider" })}
        activeOpacity={0.8}
      >
        <View style={{ padding: screenHeight * 0.01 }}>
          <Text style={styles.sliderLabel}>Pleasantness</Text>
          <Slider
            sliderWidth={GRAPH_SIZE}
            buttonHeight={GRAPH_SIZE / 20}
            value={0.5}
            trackColours={[unpleasant, neutralPleasantness, pleasant]}
            thumbComponent={
              <Fontisto
                name="smiley"
                size={(GRAPH_SIZE / 20) * (44 / 34) * 0.9}
                color="#25292E"
              />
            }
            disabled={true}
          />
          <Text style={styles.sliderLabel}>Arousal</Text>
          <Slider
            sliderWidth={GRAPH_SIZE}
            buttonHeight={GRAPH_SIZE / 20}
            value={1 - 0.5}
            trackColours={[lowArousal, neutralArousal, highArousal]}
            thumbComponent={
              <SimpleLineIcons
                name="energy"
                size={(GRAPH_SIZE / 20) * (44 / 34) * 0.9}
                color="#25292E"
              />
            }
            disabled={true}
          />
        </View>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
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
  },
  optionButton: {
    width: GRAPH_CONTAINER_WIDTH,
    padding: screenHeight * 0.02,
    marginVertical: screenHeight * 0.02,
    borderRadius: borderRadius,
    borderWidth: borderWidth / 2,
    borderColor: "#25292E",
    backgroundColor: "#C7F0FF",
    alignItems: "center",
    justifyContent: "center",
  },
  selectedOption: {
    borderWidth: borderWidth,
    borderColor: "#25292E",
    backgroundColor: "#4AA655",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
    elevation: 5, // For Android shadow
  },
  sliderLabel: {
    fontFamily: "Jua",
    fontSize: fontSize,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#25292E",
  },
});
