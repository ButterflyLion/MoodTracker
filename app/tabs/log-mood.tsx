import React from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import Svg, { Line, Text as SvgText } from "react-native-svg";
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from "react-native-gesture-handler";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from "react-native-reanimated";

const { width, height } = Dimensions.get("window");
const GRAPH_SIZE = Math.min(width, height) * 0.8;
const CENTER_X = width / 2;
const CENTER_Y = height / 2;

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

  return (
    <GestureHandlerRootView style={styles.container}>
      <Text style={styles.title}>Mood Tracker</Text>

      {/* Graph */}
      <Animated.View style={styles.graphContainer}>
        <Svg width={GRAPH_SIZE} height={GRAPH_SIZE}>
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
          <Animated.View style={[styles.draggablePoint, animatedStyle]} />
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
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: "red",
    position: "absolute",
  },
});
