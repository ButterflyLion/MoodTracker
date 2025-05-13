import React, { useState, useRef, useEffect } from "react";
import {
  View,
  StyleSheet,
  PanResponder,
  GestureResponderEvent,
  PanResponderGestureState,
} from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import { LinearGradient, Stop, Rect, Svg } from "react-native-svg";

interface SliderProps {
  sliderWidth: number;
  buttonHeight: number;
  value: number;
  onValueChange?: (value: number) => void;
  trackColours: [string, string, string];
  thumbColour?: string;
  thumbComponent: React.ReactNode;
  disabled?: boolean;
}

export default function Slider({
  sliderWidth,
  buttonHeight,
  value,
  onValueChange,
  trackColours,
  thumbColour = "#D9D9D9",
  thumbComponent,
  disabled = false,
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
      onPanResponderGrant: () => {
        initialThumbPosition.current = thumbPosition;
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

  const sliderTapGesture = Gesture.Tap().onEnd((event) => {
    const tappedX = Math.max(0, Math.min(event.x, sliderWidth));
    const newValue = tappedX / sliderWidth;
    setThumbPosition(tappedX);
    if (onValueChange) {
      onValueChange(newValue); // Notify the parent component that the value has changed
    }
  });

  const thumbContainerRatio = 44 / 34;
  const thumbHeight = buttonHeight;

  const [gradientId] = useState(
    `gradientTrack-${Math.random().toString(36).substr(2, 9)}`
  ); // Generate a unique id for every instance of the gradient

  if (disabled) {
    return (
      <>
        <View
          style={[
            styles.container,
            {
              width: sliderWidth + (thumbHeight / 7) * 2 - 2,
              height: sliderWidth * 0.03 + (thumbHeight / 7) * 2 - 2,
              borderWidth: thumbHeight / 7,
              borderColor: "#25292E",
              borderRadius: 20,
            },
          ]}
        >
          {/* Gradient Track */}
          <Svg
            width={sliderWidth}
            height={sliderWidth * 0.03}
            style={{ borderRadius: 20 }}
          >
            <LinearGradient id={gradientId} x1="0%" y1="50%" x2="100%" y2="50%">
              <Stop offset="0%" stopColor={trackColours[0]} />
              <Stop offset="70%" stopColor={trackColours[1]} />
              <Stop offset="100%" stopColor={trackColours[2]} />
            </LinearGradient>
            <Rect
              width={sliderWidth}
              height={sliderWidth * 0.03}
              rx={5}
              fill={`url(#${gradientId})`}
            />
          </Svg>

          {/* Thumb */}
          <View
            style={[
              styles.thumbContainer,
              {
                left: thumbPosition - (buttonHeight * thumbContainerRatio) / 2,
                backgroundColor: thumbColour,
                width: buttonHeight * thumbContainerRatio * 1.25,
                height: buttonHeight * 1.25,
              },
            ]}
          >
            {thumbComponent}
          </View>
        </View>
      </>
    );
  } else {
    return (
      <>
        <GestureDetector gesture={sliderTapGesture}>
          <View
            style={[
              styles.container,
              {
                width: sliderWidth + (thumbHeight / 7) * 2 - 2,
                height: sliderWidth * 0.03 + (thumbHeight / 7) * 2 - 2,
                borderWidth: thumbHeight / 7,
                borderColor: "#25292E",
                borderRadius: 20,
              },
            ]}
          >
            {/* Gradient Track */}
            <Svg
              width={sliderWidth}
              height={sliderWidth * 0.03}
              style={{ borderRadius: 20 }}
            >
              <LinearGradient
                id={gradientId}
                x1="0%"
                y1="50%"
                x2="100%"
                y2="50%"
              >
                <Stop offset="0%" stopColor={trackColours[0]} />
                <Stop offset="70%" stopColor={trackColours[1]} />
                <Stop offset="100%" stopColor={trackColours[2]} />
              </LinearGradient>
              <Rect
                width={sliderWidth}
                height={sliderWidth * 0.03}
                rx={5}
                fill={`url(#${gradientId})`}
              />
            </Svg>

            {/* Thumb */}
            <View
              {...panResponder.panHandlers}
              style={[
                styles.thumbContainer,
                {
                  left:
                    thumbPosition - (buttonHeight * thumbContainerRatio) / 2,
                  backgroundColor: thumbColour,
                  width: buttonHeight * thumbContainerRatio * 1.25,
                  height: buttonHeight * 1.25,
                },
              ]}
            >
              {thumbComponent}
            </View>
          </View>
        </GestureDetector>
      </>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    position: "relative",
    justifyContent: "center",
    overflow: "visible",
    marginVertical: 10,
  },
  thumbContainer: {
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
  },
});
