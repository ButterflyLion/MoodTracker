import React from "react";
import {
  Dimensions,
  TouchableOpacity,
  Text,
  StyleSheet,
  GestureResponderEvent,
} from "react-native";

const { width: screenWidth, height: screenHeight } = Dimensions.get("window");
const maxWidth = screenWidth * 0.4;
const maxHeight = screenHeight * 0.1;

const fontSize = Math.min(maxWidth * 0.1, 50);
const borderWidth = Math.min(maxWidth * 0.015, 7);
const borderRadius = Math.min(maxWidth * 0.05, 20);

interface Props {
  onPress?: (event: GestureResponderEvent) => void;
  text: string;
}

export default function StartButton({ onPress, text }: Props) {
  console.log("Max width: ", maxWidth);
  return (
    <TouchableOpacity
      style={styles.container}
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
    borderColor: "#000",
    position: "relative",
    margin: 10,
    maxWidth: maxWidth,
    maxHeight: maxHeight,
    backgroundColor: "#C7F0FF",
  },
  text: {
    fontFamily: "Jua",
    fontSize: fontSize,
    color: "#000",
    textAlign: "center",
    position: "relative",
  },
});
