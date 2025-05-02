import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Image,
  Text,
  StyleSheet,
  PanResponder,
  GestureResponderEvent,
  PanResponderGestureState,
} from "react-native";
import { LinearGradient, Stop, Rect, Svg } from "react-native-svg";

interface SliderProps {
  sliderWidth: number;
  buttonHeight: number;
  value: number;
  onValueChange?: (value: number) => void;
  sliderImageUrl: string;
  trackColours: [string, string];
  thumbColour?: string;
}

export default function Slider({
  sliderWidth,
  buttonHeight,
  value,
  onValueChange,
  sliderImageUrl,
  trackColours,
  thumbColour = "#D9D9D9",
}: SliderProps) {
  const [thumbPosition, setThumbPosition] = useState<number>(
    sliderWidth * value
  );
  const initialThumbPosition = useRef<number>(thumbPosition);

  useEffect(() => {
    setThumbPosition(sliderWidth * value);
  }, [value, sliderWidth]);

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: (_, gestureState) => {
        // Store the initial thumb position when dragging starts
        const cursorOffset =
          gestureState.x0 - (thumbPosition + thumbContainerWidth / 2);
        initialThumbPosition.current = thumbPosition - cursorOffset;
      },
      onPanResponderMove: (
        _: GestureResponderEvent,
        gestureState: PanResponderGestureState
      ) => {
        // Calculate the new thumb position based on the gesture movement
        let newPosition = initialThumbPosition.current + gestureState.dx;
        newPosition = Math.max(0, Math.min(newPosition, sliderWidth));
        setThumbPosition(newPosition);

        const value = newPosition / sliderWidth;

        if (onValueChange) {
          onValueChange(value);
        }
      },
    })
  ).current;

  const thumbContainerRatio = 44 / 34;
  const thumbContainerWidth = buttonHeight * thumbContainerRatio;
  const thumbContainerHeight = buttonHeight;
  const thumbImageRatio = 34 / 26;
  const thumbWidth = buttonHeight * thumbImageRatio;
  const thumbHeight = buttonHeight;

  const [gradientId] = useState(
    `gradientTrack-${Math.random().toString(36).substr(2, 9)}`
  ); // Generate a unique id for every instance of the gradient

  return (
    <>
      <Text style={styles.value}>Value: {Math.round(value * 100)}%</Text>{" "}
      {/* TODO: Dynamically size the fonts in this component */}
      <View style={styles.container}>
        {/* Gradient Track */}
        <Svg
          width={sliderWidth}
          height={sliderWidth * 0.03}
          style={{ borderRadius: 15 }}
        >
          <LinearGradient id={gradientId} x1="0%" y1="50%" x2="100%" y2="50%">
            <Stop offset="0%" stopColor={trackColours[0]} />
            <Stop offset="100%" stopColor={trackColours[1]} />
          </LinearGradient>
          <Rect
            width={sliderWidth}
            height={sliderWidth * 0.03}
            rx={15}
            fill={`url(#${gradientId})`}
          />
        </Svg>

        {/* Thumb */}
        <View
          {...panResponder.panHandlers}
          style={[
            styles.thumbContainer,
            {
              left: thumbPosition - thumbContainerWidth / 2,
              backgroundColor: thumbColour,
              width: thumbContainerWidth,
              height: thumbContainerHeight,
            },
          ]}
        >
          <Image
            source={
              typeof sliderImageUrl === "string"
                ? { uri: sliderImageUrl }
                : sliderImageUrl
            }
            style={{
              ...styles.thumbImage,
              width: thumbWidth * 0.9,
              height: thumbHeight * 0.9,
            }}
            resizeMode="contain"
          />
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  thumbContainer: {
    position: "absolute",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
  },
  thumbImage: {
    position: "relative",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  value: {
    fontSize: 18,
    marginBottom: 20,
  },
});
