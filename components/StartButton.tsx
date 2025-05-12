import React from "react";
import {
  Dimensions,
  TouchableOpacity,
  Text,
  StyleSheet,
  GestureResponderEvent,
} from "react-native";

const { width: screenWidth, height: screenHeight } = Dimensions.get("window");
const maxWidth = screenWidth * 0.5;
const maxHeight = screenHeight * 0.105;

const fontSize = Math.max(maxWidth * 0.07, 25);
const borderWidth = Math.min(maxWidth * 0.015, 7);
const borderRadius = Math.min(maxWidth * 0.05, 20);

interface Props {
  onPress?: (event: GestureResponderEvent) => void;
  text: string;
}

export default function StartButton({ onPress, text }: Props) {
  const isSmallScreen = screenWidth < 400;
  const buttonWidth = isSmallScreen ? maxWidth : maxWidth * 0.8;
  const buttonHeight = isSmallScreen ? maxHeight : maxHeight * 0.8;

  return (
    <TouchableOpacity
      style={[
        styles.container,
        { width: buttonWidth, maxHeight: buttonHeight },
      ]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <Text style={styles.text}>{text}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: borderRadius,
    borderWidth: borderWidth,
    borderColor: "#25292E",
    position: "relative",
    margin: 10,
    backgroundColor: "#C7F0FF",
  },
  text: {
    fontFamily: "Jua",
    fontSize: fontSize,
    color: "#25292E",
    textAlign: "center",
    position: "relative",
  },
});
