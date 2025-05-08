import React, { useEffect, useState } from "react";
import {
  Text,
  StyleSheet,
  Dimensions,
  View,
  Platform,
  ScrollView,
} from "react-native";
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
import Slider from "@/components/Slider";
import { useSearchParams } from "expo-router/build/hooks";
import * as colourUtils from "@/assets/utils/colour-utils";
import Fontisto from "@expo/vector-icons/Fontisto";
import SimpleLineIcons from "@expo/vector-icons/SimpleLineIcons";

const { width: width, height: height } = Dimensions.get("window");
const maxWidth = width * 0.5;
const titleFontSize = Math.max(width * 0.04, 35);
const fontSize = Math.max(height * 0.025, 40);

const GRAPH_CONTAINER_WIDTH = width * 0.85;
const GRAPH_CONTAINER_HEIGHT = height * 0.55;
const GRAPH_SIZE = Math.min(GRAPH_CONTAINER_WIDTH, GRAPH_CONTAINER_HEIGHT);

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
    pleasant: moodTrackerColours?.pleasant || colourUtils.PLEASANT, // Default PLEASANT
    unpleasant: moodTrackerColours?.unpleasant || colourUtils.UNPLEASANT, // Default UNPLEASANT
    highArousal: moodTrackerColours?.highArousal || colourUtils.HIGH_AROUSAL, // Default HIGH_AROUSAL
    lowArousal: moodTrackerColours?.lowArousal || colourUtils.LOW_AROUSAL, // Default LOW_AROUSAL
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

  const graphTapGesture = Gesture.Tap().onEnd((event) => {
    const tappedX = Math.max(0, Math.min(event.x, GRAPH_SIZE)); // Clamp within graph bounds
    const tappedY = Math.max(0, Math.min(event.y, GRAPH_SIZE)); // Clamp within graph bounds

    translateX.value = tappedX;
    translateY.value = tappedY;

    offsetX.value = tappedX;
    offsetY.value = tappedY;
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
      [0, 0.3, 0.5, 0.7, 1],
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
      [0, 0.3, 0.5, 0.7, 1],
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
      <Text style={styles.title}>How are you feeling?</Text>
      <GestureHandlerRootView style={styles.container}>
        {/* Graph */}
        <GestureDetector gesture={Gesture.Exclusive(dragGesture, graphTapGesture)}>
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

            <Animated.View
              style={[styles.draggablePoint, animatedStyle, dotColour]}
            />
          </Animated.View>
        </GestureDetector>

        {/* Sliders */}
        <View style={styles.slidersContainer}>
          <Text style={styles.sliderLabel}>Pleasantness</Text>
          <Slider
            sliderWidth={GRAPH_SIZE}
            buttonHeight={GRAPH_SIZE / 20}
            value={pleasantnessState}
            onValueChange={(value) => {
              translateX.value = value * GRAPH_SIZE;
              updateGraphFromSliders(value, arousal.value);
            }}
            trackColours={[unpleasant, neutralPleasantness, pleasant]}
            thumbComponent={
              <Fontisto
                name="smiley"
                size={(GRAPH_SIZE / 20) * (44 / 34) * 0.9}
                color="#25292E"
              />
            }
          />
          <Text style={styles.sliderLabel}>Arousal</Text>
          <Slider
            sliderWidth={GRAPH_SIZE}
            buttonHeight={GRAPH_SIZE / 20}
            value={1 - arousalState}
            onValueChange={(value) => {
              const invertedValue = 1 - value;
              translateY.value = invertedValue * GRAPH_SIZE;
              updateGraphFromSliders(pleasantness.value, invertedValue);
            }}
            trackColours={[lowArousal, neutralArousal, highArousal]}
            thumbComponent={
              <SimpleLineIcons
                name="energy"
                size={(GRAPH_SIZE / 20) * (44 / 34) * 0.9}
                color="#25292E"
              />
            }
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
  title: {
    fontFamily: "Jua",
    fontSize: titleFontSize,
    fontWeight: "bold",
    color: "#25292E",
    marginVertical: height * 0.05,
    textAlign: "center",
    position: "relative",
    alignContent: "center",
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
    width: GRAPH_SIZE / 20,
    height: GRAPH_SIZE / 20,
    borderRadius: GRAPH_SIZE / 40,
    borderColor: "#25292E",
    borderWidth: 5,
    position: "absolute",
  },
  slidersContainer: {
    width: GRAPH_SIZE,
    marginTop: 20,
  },
  sliderLabel: {
    fontFamily: "Jua",
    fontSize: fontSize,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#25292E",
  },
});
