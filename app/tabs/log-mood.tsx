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
import * as colourUtils from "@/assets/utils/colour-utils";
import { getTrackerType, TrackerType } from "@/assets/utils/tracker-utils";
import Fontisto from "@expo/vector-icons/Fontisto";
import SimpleLineIcons from "@expo/vector-icons/SimpleLineIcons";
import { get } from "react-native/Libraries/TurboModule/TurboModuleRegistry";

const { width: width, height: height } = Dimensions.get("window");
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
  const energy = useDerivedValue(() => translateY.value / GRAPH_SIZE);

  const [pleasantnessState, setPleasantnessState] = useState(0.5);
  const [energyState, setEnergyState] = useState(0.5);

  const [moodTrackerColours, setMoodTrackerColours] = useState({
    pleasant: colourUtils.PLEASANT,
    unpleasant: colourUtils.UNPLEASANT,
    highEnergy: colourUtils.HIGH_ENERGY,
    lowEnergy: colourUtils.LOW_ENERGY,
  });
  const [trackerType, setTrackerType] = useState("none");

  useEffect(() => {
    const fetchData = async () => {
      const coloursString = await colourUtils.getColours();
      const typeString = await getTrackerType();

      const colours = coloursString ? JSON.parse(coloursString) : null;
      console.log("colours", colours);
      const type = typeString ? JSON.parse(typeString) : null;
      console.log("type", type);
      setMoodTrackerColours(colours);
      setTrackerType(type);
    };
    fetchData();
  }, []);

  const {
    pleasant,
    mediumPleasantness,
    neutralPleasantness,
    mediumUnpleasantness,
    unpleasant,
    highEnergy,
    mediumHighEnergy,
    neutralEnergy,
    mediumLowEnergy,
    lowEnergy,
  } = colourUtils.generateMoodColors({
    pleasant: moodTrackerColours?.pleasant || colourUtils.PLEASANT, // Default PLEASANT
    unpleasant: moodTrackerColours?.unpleasant || colourUtils.UNPLEASANT, // Default UNPLEASANT
    highEnergy: moodTrackerColours?.highEnergy || colourUtils.HIGH_ENERGY, // Default HIGH_ENERGY
    lowEnergy: moodTrackerColours?.lowEnergy || colourUtils.LOW_ENERGY, // Default LOW_ENERGY
  });

  useAnimatedReaction(
    () => pleasantness.value,
    (pleasantnessValue) => {
      runOnJS(setPleasantnessState)(pleasantnessValue);
    }
  );

  useAnimatedReaction(
    () => energy.value,
    (energyValue) => {
      runOnJS(setEnergyState)(energyValue);
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

    const energyColour = interpolateColor(
      energy.value,
      [0, 0.3, 0.5, 0.7, 1],
      [
        highEnergy,
        mediumHighEnergy,
        neutralEnergy,
        mediumLowEnergy,
        lowEnergy,
      ]
    );

    const colour = interpolateColor(
      0.5,
      [0, 1],
      [pleasantnessColour, energyColour]
    );

    return {
      backgroundColor: colour,
    };
  });

  const updateGraphFromSliders = (
    newPleasantness: number,
    newEnergy: number
  ) => {
    const newX = newPleasantness * GRAPH_SIZE;
    const newY = newEnergy * GRAPH_SIZE;

    translateX.value = newX;
    translateY.value = newY;

    offsetX.value = newX;
    offsetY.value = newY;
  };

  const renderSelectedTracker = () => {
    switch (trackerType) {
      case "graph":
        console.log("Graph selected");
        return (
          <>
            {/* Graph */}
            <GestureDetector
              gesture={Gesture.Exclusive(dragGesture, graphTapGesture)}
            >
              <Animated.View style={styles.graphContainer}>
                <MoodLoggerGraph
                  pleasant={pleasant}
                  medium_pleasantness={mediumPleasantness}
                  neutral_pleasantness={neutralPleasantness}
                  medium_unpleasantness={mediumUnpleasantness}
                  unpleasant={unpleasant}
                  high_energy={highEnergy}
                  medium_high_energy={mediumHighEnergy}
                  neutral_energy={neutralEnergy}
                  medium_low_energy={mediumLowEnergy}
                  low_energy={lowEnergy}
                  graphSize={GRAPH_SIZE}
                />

                {/* Draggable Point */}
                <Animated.View
                  style={[styles.draggablePoint, animatedStyle, dotColour]}
                />
              </Animated.View>
            </GestureDetector>
          </>
        );
      case "slider":
        console.log("Slider selected");
        return (
          <>
            {/* Sliders */}
            <View style={styles.slidersContainer}>
              <Text style={styles.sliderLabel}>Pleasantness</Text>
              <Slider
                sliderWidth={GRAPH_SIZE}
                buttonHeight={GRAPH_SIZE / 20}
                value={pleasantnessState}
                onValueChange={(value) => {
                  translateX.value = value * GRAPH_SIZE;
                  updateGraphFromSliders(value, energy.value);
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
              <Text style={styles.sliderLabel}>Energy</Text>
              <Slider
                sliderWidth={GRAPH_SIZE}
                buttonHeight={GRAPH_SIZE / 20}
                value={1 - energyState}
                onValueChange={(value) => {
                  const invertedValue = 1 - value;
                  translateY.value = invertedValue * GRAPH_SIZE;
                  updateGraphFromSliders(pleasantness.value, invertedValue);
                }}
                trackColours={[lowEnergy, neutralEnergy, highEnergy]}
                thumbComponent={
                  <SimpleLineIcons
                    name="energy"
                    size={(GRAPH_SIZE / 20) * (44 / 34) * 0.9}
                    color="#25292E"
                  />
                }
              />
            </View>
          </>
        );
      case "both":
        console.log("Both selected");
        return (
          <>
            {/* Graph */}
            <GestureDetector
              gesture={Gesture.Exclusive(dragGesture, graphTapGesture)}
            >
              <Animated.View style={styles.graphContainer}>
                <MoodLoggerGraph
                  pleasant={pleasant}
                  medium_pleasantness={mediumPleasantness}
                  neutral_pleasantness={neutralPleasantness}
                  medium_unpleasantness={mediumUnpleasantness}
                  unpleasant={unpleasant}
                  high_energy={highEnergy}
                  medium_high_energy={mediumHighEnergy}
                  neutral_energy={neutralEnergy}
                  medium_low_energy={mediumLowEnergy}
                  low_energy={lowEnergy}
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
                  updateGraphFromSliders(value, energy.value);
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
              <Text style={styles.sliderLabel}>Energy</Text>
              <Slider
                sliderWidth={GRAPH_SIZE}
                buttonHeight={GRAPH_SIZE / 20}
                value={1 - energyState}
                onValueChange={(value) => {
                  const invertedValue = 1 - value;
                  translateY.value = invertedValue * GRAPH_SIZE;
                  updateGraphFromSliders(pleasantness.value, invertedValue);
                }}
                trackColours={[lowEnergy, neutralEnergy, highEnergy]}
                thumbComponent={
                  <SimpleLineIcons
                    name="energy"
                    size={(GRAPH_SIZE / 20) * (44 / 34) * 0.9}
                    color="#25292E"
                  />
                }
              />
            </View>
          </>
        );
      default:
        console.log("Invalid tracker selected");
        console.log(trackerType);
        return <Text>Invalid tracker selected</Text>;
    }
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
        {renderSelectedTracker()}
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
