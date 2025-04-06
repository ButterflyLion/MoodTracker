import React from "react";
import { Text, StyleSheet, Dimensions } from "react-native";
import Svg, {
  Line,
  Text as SvgText,
  Defs,
  LinearGradient,
  Stop,
  Rect,
} from "react-native-svg";
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from "react-native-gesture-handler";
import Animated, {
  interpolateColor,
  useSharedValue,
  useAnimatedStyle,
} from "react-native-reanimated";

const { width, height } = Dimensions.get("window");
const GRAPH_SIZE = Math.min(width, height) * 0.8;

const PLEASANT = "#E1DE47";
const MEDIUM_PLEASANTNESS = "#D5D365";
const NEUTRAL_PLEASANTNESS = "#BCA5A1";
const MEDIUM_UNPLEASANTNESS = "#A377DD";
const UNPLEASANT = "#8F53DD";
const HIGH_AROUSAL = "#E05300";
const MEDIUM_HIGH_AROUSAL = "#DC6B2A";
const NEUTRAL_AROUSAL = "#A88E80";
const MEDIUM_LOW_AROUSAL = "#74B0D5";
const LOW_AROUSAL = "#9FBBCD";

export default function MoodTrackerScreen() {
  // Start dot in the middle of the graph
  const translateX = useSharedValue(GRAPH_SIZE / 2);
  const translateY = useSharedValue(GRAPH_SIZE / 2);

  const offsetX = useSharedValue(GRAPH_SIZE / 2);
  const offsetY = useSharedValue(GRAPH_SIZE / 2);

  const dragGesture = Gesture.Pan().onUpdate((event) => {
      translateX.value = Math.max(
        0,
        Math.min(offsetX.value + event.translationX, GRAPH_SIZE)
      );
      translateY.value = Math.max(
        0,
        Math.min(offsetY.value + event.translationY, GRAPH_SIZE)
      );
    })
    .onEnd(() => {
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
    // Normalize translateX and translateY to a range of 0 to 1
    const normalizedX = translateX.value / GRAPH_SIZE;
    const normalizedY = translateY.value / GRAPH_SIZE;

    const pleasantnessColour = interpolateColor(
      normalizedX,
      [0, 0.25, 0.5, 0.75, 1],
      [
        UNPLEASANT,
        MEDIUM_UNPLEASANTNESS,
        NEUTRAL_PLEASANTNESS,
        MEDIUM_PLEASANTNESS,
        PLEASANT,
      ]
    );

    const arousalColour = interpolateColor(
      normalizedY,
      [0, 0.25, 0.5, 0.75, 1],
      [
        HIGH_AROUSAL,
        MEDIUM_HIGH_AROUSAL,
        NEUTRAL_AROUSAL,
        MEDIUM_LOW_AROUSAL,
        LOW_AROUSAL,
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

  return (
    <GestureHandlerRootView style={styles.container}>
      <Text style={styles.title}>Mood Tracker</Text>

      {/* Graph */}
      <Animated.View style={styles.graphContainer}>
        <Svg width={GRAPH_SIZE} height={GRAPH_SIZE}>
          {/* Quadrant-Based Gradients */}
          <Defs>
            {/* Top-Right Quadrant */}
            <LinearGradient
              id="topRightHorizontal"
              x1="0%"
              y1="50%"
              x2="100%"
              y2="50%"
            >
              <Stop offset="0%" stopColor={NEUTRAL_PLEASANTNESS} />
              <Stop offset="50%" stopColor={MEDIUM_PLEASANTNESS} />
              <Stop offset="100%" stopColor={PLEASANT} />
            </LinearGradient>
            <LinearGradient
              id="topRightVertical"
              x1="50%"
              y1="100%"
              x2="50%"
              y2="0%"
            >
              <Stop offset="0%" stopColor={NEUTRAL_AROUSAL} />
              <Stop offset="50%" stopColor={MEDIUM_HIGH_AROUSAL} />
              <Stop offset="100%" stopColor={HIGH_AROUSAL} />
            </LinearGradient>

            {/* Top-Left Quadrant */}
            <LinearGradient
              id="topLeftHorizontal"
              x1="100%"
              y1="50%"
              x2="0%"
              y2="50%"
            >
              <Stop offset="0%" stopColor={NEUTRAL_PLEASANTNESS} />
              <Stop offset="50%" stopColor={MEDIUM_UNPLEASANTNESS} />
              <Stop offset="100%" stopColor={UNPLEASANT} />
            </LinearGradient>
            <LinearGradient
              id="topLeftVertical"
              x1="50%"
              y1="100%"
              x2="50%"
              y2="0%"
            >
              <Stop offset="0%" stopColor={NEUTRAL_AROUSAL} />
              <Stop offset="50%" stopColor={MEDIUM_HIGH_AROUSAL} />
              <Stop offset="100%" stopColor={HIGH_AROUSAL} />
            </LinearGradient>

            {/* Bottom-Left Quadrant */}
            <LinearGradient
              id="bottomLeftHorizontal"
              x1="100%"
              y1="50%"
              x2="0%"
              y2="50%"
            >
              <Stop offset="0%" stopColor={NEUTRAL_PLEASANTNESS} />
              <Stop offset="50%" stopColor={MEDIUM_UNPLEASANTNESS} />
              <Stop offset="100%" stopColor={UNPLEASANT} />
            </LinearGradient>
            <LinearGradient
              id="bottomLeftVertical"
              x1="50%"
              y1="0%"
              x2="50%"
              y2="100%"
            >
              <Stop offset="0%" stopColor={NEUTRAL_AROUSAL} />
              <Stop offset="50%" stopColor={MEDIUM_LOW_AROUSAL} />
              <Stop offset="100%" stopColor={LOW_AROUSAL} />
            </LinearGradient>

            {/* Bottom-Right Quadrant */}
            <LinearGradient
              id="bottomRightHorizontal"
              x1="0%"
              y1="50%"
              x2="100%"
              y2="50%"
            >
              <Stop offset="0%" stopColor={NEUTRAL_PLEASANTNESS} />
              <Stop offset="50%" stopColor={MEDIUM_PLEASANTNESS} />
              <Stop offset="100%" stopColor={PLEASANT} />
            </LinearGradient>
            <LinearGradient
              id="bottomRightVertical"
              x1="50%"
              y1="0%"
              x2="50%"
              y2="100%"
            >
              <Stop offset="0%" stopColor={NEUTRAL_AROUSAL} />
              <Stop offset="50%" stopColor={MEDIUM_LOW_AROUSAL} />
              <Stop offset="100%" stopColor={LOW_AROUSAL} />
            </LinearGradient>
          </Defs>

          {/* Top-Right Quadrant */}
          <Rect
            x={GRAPH_SIZE / 2}
            y="0"
            width={GRAPH_SIZE / 2}
            height={GRAPH_SIZE / 2}
            fill="url(#topRightHorizontal)"
            fillOpacity="1"
          />
          <Rect
            x={GRAPH_SIZE / 2}
            y="0"
            width={GRAPH_SIZE / 2}
            height={GRAPH_SIZE / 2}
            fill="url(#topRightVertical)"
            fillOpacity="0.5"
          />

          {/* Top-Left Quadrant */}
          <Rect
            x="0"
            y="0"
            width={GRAPH_SIZE / 2}
            height={GRAPH_SIZE / 2}
            fill="url(#topLeftHorizontal)"
            fillOpacity="1"
          />
          <Rect
            x="0"
            y="0"
            width={GRAPH_SIZE / 2}
            height={GRAPH_SIZE / 2}
            fill="url(#topLeftVertical)"
            fillOpacity="0.5"
          />

          {/* Bottom-Left Quadrant */}
          <Rect
            x="0"
            y={GRAPH_SIZE / 2}
            width={GRAPH_SIZE / 2}
            height={GRAPH_SIZE / 2}
            fill="url(#bottomLeftHorizontal)"
            fillOpacity="1"
          />
          <Rect
            x="0"
            y={GRAPH_SIZE / 2}
            width={GRAPH_SIZE / 2}
            height={GRAPH_SIZE / 2}
            fill="url(#bottomLeftVertical)"
            fillOpacity="0.5"
          />
          {/* Bottom-Right Quadrant */}
          <Rect
            x={GRAPH_SIZE / 2}
            y={GRAPH_SIZE / 2}
            width={GRAPH_SIZE / 2}
            height={GRAPH_SIZE / 2}
            fill="url(#bottomRightHorizontal)"
            fillOpacity="1"
          />
          <Rect
            x={GRAPH_SIZE / 2}
            y={GRAPH_SIZE / 2}
            width={GRAPH_SIZE / 2}
            height={GRAPH_SIZE / 2}
            fill="url(#bottomRightVertical)"
            fillOpacity="0.5"
          />

          {/* X-Axis (Valence) */}
          <Line
            x1="0"
            y1={GRAPH_SIZE / 2}
            x2={GRAPH_SIZE}
            y2={GRAPH_SIZE / 2}
            stroke="black"
            strokeWidth="2"
          />
          {/* Y-Axis (Arousal) */}
          <Line
            x1={GRAPH_SIZE / 2}
            y1="0"
            x2={GRAPH_SIZE / 2}
            y2={GRAPH_SIZE}
            stroke="black"
            strokeWidth="2"
          />

          {/* Labels */}
          <SvgText x={GRAPH_SIZE - 70} y={GRAPH_SIZE / 2 - 10} fontSize="16">
            Positive
          </SvgText>
          <SvgText x={10} y={GRAPH_SIZE / 2 - 10} fontSize="16">
            Negative
          </SvgText>
          <SvgText x={GRAPH_SIZE / 2 + 10} y={20} fontSize="16">
            High Arousal
          </SvgText>
          <SvgText x={GRAPH_SIZE / 2 + 10} y={GRAPH_SIZE - 10} fontSize="16">
            Low Arousal
          </SvgText>
        </Svg>

        {/* Draggable Point */}
        <GestureDetector gesture={dragGesture}>
          <Animated.View
            style={[styles.draggablePoint, animatedStyle, dotColour]}
          />
        </GestureDetector>
      </Animated.View>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f0f0f0",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  graphContainer: {
    width: GRAPH_SIZE,
    height: GRAPH_SIZE,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ccc",
    alignItems: "center",
    justifyContent: "center",
  },
  draggablePoint: {
    width: 30,
    height: 30,
    borderRadius: 15,
    borderColor: "#000",
    borderWidth: 3,
    backgroundColor: "red",
    position: "absolute",
  },
});
