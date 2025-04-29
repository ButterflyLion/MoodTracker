import React, { useEffect, useState } from "react";
import {
  Text,
  StyleSheet,
  Dimensions,
  View,
  Platform,
  ScrollView,
} from "react-native";
import Slider from "@react-native-community/slider";
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from "react-native-gesture-handler";
import Animated, {
  interpolateColor,
  useSharedValue,
  useAnimatedStyle,
  useDerivedValue,
  useAnimatedReaction,
  runOnJS,
} from "react-native-reanimated";
import MoodLoggerGraph from "@/components/MoodLoggerGraph";
import { useSearchParams } from "expo-router/build/hooks";
import * as colourUtils from "@/assets/utils/colour-utils";

const { width, height } = Dimensions.get("window");
const GRAPH_SCALE = 0.8;
const GRAPH_CONTAINER_WIDTH = width * GRAPH_SCALE;
const GRAPH_CONTAINER_HEIGHT = height * GRAPH_SCALE;
const GRAPH_SIZE = Math.min(GRAPH_CONTAINER_WIDTH, GRAPH_CONTAINER_HEIGHT) - 40;

const PLEASANT = "#E1DE47";
const UNPLEASANT = "#8F53DD";
const HIGH_AROUSAL = "#E05300";
const LOW_AROUSAL = "#9FBBCD";

export default function MoodTrackerScreen() {
  const [isClient, setIsClient] = useState(false);
  // Start dot in the middle of the graph
  const translateX = useSharedValue(GRAPH_SIZE / 2);
  const translateY = useSharedValue(GRAPH_SIZE / 2);

  const offsetX = useSharedValue(GRAPH_SIZE / 2);
  const offsetY = useSharedValue(GRAPH_SIZE / 2);

  const pleasantness = useDerivedValue(() => translateX.value / GRAPH_SIZE);
  const arousal = useDerivedValue(() => translateY.value / GRAPH_SIZE);

  const [pleasantnessState, setPleasantnessState] = useState(0.5);
  const [arousalState, setArousalState] = useState(0.5);

  const searchParams = useSearchParams();
  const moodTrackerColours = searchParams.get("moodTrackerColours")
    ? JSON.parse(searchParams.get("moodTrackerColours")!)
    : null;

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
  } = colourUtils.generateMoodColors({
    pleasant: moodTrackerColours?.pleasant || PLEASANT, // Default PLEASANT
    unpleasant: moodTrackerColours?.unpleasant || UNPLEASANT, // Default UNPLEASANT
    highArousal: moodTrackerColours?.highArousal || HIGH_AROUSAL, // Default HIGH_AROUSAL
    lowArousal: moodTrackerColours?.lowArousal || LOW_AROUSAL, // Default LOW_AROUSAL
  });

  useAnimatedReaction(
    () => pleasantness.value,
    (pleasantnessValue) => {
      runOnJS(setPleasantnessState)(pleasantnessValue);
    }
  );

  useAnimatedReaction(
    () => arousal.value,
    (arousalValue) => {
      runOnJS(setArousalState)(arousalValue);
    }
  );

  const isDragging = useSharedValue(false);

  const dragGesture = Gesture.Pan()
    .onStart(() => {
      isDragging.value = true;
      offsetX.value = translateX.value;
      offsetY.value = translateY.value;
    })
    .onUpdate((event) => {
      const newX = Math.max(
        0,
        Math.min(offsetX.value + event.translationX, GRAPH_SIZE)
      );
      const newY = Math.max(
        0,
        Math.min(offsetY.value + event.translationY, GRAPH_SIZE)
      );

      translateX.value = newX;
      translateY.value = newY;
    })
    .onEnd(() => {
      isDragging.value = false;
      offsetX.value = translateX.value;
      offsetY.value = translateY.value;
    });

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: translateX.value - GRAPH_SIZE / 2,
        },
        {
          translateY: translateY.value - GRAPH_SIZE / 2,
        },
      ],
    };
  });

  const dotColour = useAnimatedStyle(() => {
    const pleasantnessColour = interpolateColor(
      pleasantness.value,
      [0, 0.25, 0.5, 0.75, 1],
      [
        unpleasant,
        mediumUnpleasantness,
        neutralPleasantness,
        mediumPleasantness,
        pleasant,
      ]
    );

    const arousalColour = interpolateColor(
      arousal.value,
      [0, 0.25, 0.5, 0.75, 1],
      [
        highArousal,
        mediumHighArousal,
        neutralArousal,
        mediumLowArousal,
        lowArousal,
      ]
    );

    const colour = interpolateColor(
      0.5,
      [0, 1],
      [pleasantnessColour, arousalColour]
    );

    return {
      backgroundColor: colour,
    };
  });

  const updateGraphFromSliders = (
    newPleasantness: number,
    newArousal: number
  ) => {
    const newX = newPleasantness * GRAPH_SIZE;
    const newY = newArousal * GRAPH_SIZE;

    translateX.value = newX;
    translateY.value = newY;

    offsetX.value = newX;
    offsetY.value = newY;
  };

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (Platform.OS === "web" && !isClient) {
    return null; // Prevents server-side rendering issues on web
  }

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <GestureHandlerRootView style={styles.container}>
        {/* Graph */}
        <Animated.View style={styles.graphContainer}>
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

          {/* Draggable Point */}
          <GestureDetector gesture={dragGesture}>
            <Animated.View
              style={[styles.draggablePoint, animatedStyle, dotColour]}
            />
          </GestureDetector>
        </Animated.View>

        {/* Sliders */}
        <View style={styles.slidersContainer}>
          <Text style={styles.sliderLabel}>Pleasantness</Text>
          <Slider
            style={styles.slider}
            minimumValue={0}
            maximumValue={1}
            value={pleasantnessState}
            minimumTrackTintColor={unpleasant}
            maximumTrackTintColor={pleasant}
            onValueChange={(value) => {
              translateX.value = value * GRAPH_SIZE;
              updateGraphFromSliders(value, arousal.value);
            }}
          />

          <Text style={styles.sliderLabel}>Arousal</Text>
          <Slider
            style={styles.slider}
            minimumValue={0}
            maximumValue={1}
            value={1 - arousalState}
            minimumTrackTintColor={lowArousal}
            maximumTrackTintColor={highArousal}
            onValueChange={(value) => {
              const invertedValue = 1 - value;
              translateY.value = invertedValue * GRAPH_SIZE;
              updateGraphFromSliders(pleasantness.value, invertedValue);
            }}
          />
        </View>
      </GestureHandlerRootView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  scrollContainer: {
    flexGrow: 1,
    paddingVertical: 20,
    backgroundColor: "#74D4E5",
  },
  graphContainer: {
    width: GRAPH_SIZE,
    height: GRAPH_SIZE,
    alignItems: "center",
    justifyContent: "center",
  },
  draggablePoint: {
    width: 30,
    height: 30,
    borderRadius: 15,
    borderColor: "#000",
    borderWidth: 3,
    position: "absolute",
  },
  slidersContainer: {
    width: GRAPH_SIZE,
    marginTop: 20,
  },
  slider: {
    height: 40,
    marginBottom: 20,
  },
  sliderLabel: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },
});
