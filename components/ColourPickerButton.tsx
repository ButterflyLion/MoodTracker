import React from "react";
import {
  Dimensions,
  TouchableOpacity,
  Text,
  View,
  StyleSheet,
  GestureResponderEvent,
} from "react-native";

const { width: screenWidth, height: screenHeight } = Dimensions.get("window");
const maxWidth = screenWidth * 0.8;
const maxHeight = screenHeight * 0.1;

const fontSize = Math.min(screenWidth * 0.05, 50);
const borderWidth = Math.min(maxWidth * 0.015, 7);
const borderRadius = Math.min(maxWidth * 0.05, 20);

interface Props {
  title: string;
  onPress?: (event: GestureResponderEvent) => void;
  colour: string;
}

export default function ColourPickerButton({ onPress, title, colour }: Props) {
  switch (title) {
    case "pleasant":
      title = "Pleasant";
      break;
    case "unpleasant":
      title = "Unpleasant";
      break;
    case "highArousal":
      title = "High Energy";
      break;
    case "lowArousal":
      title = "Low Energy";
      break;
    default:
      title = title;
      break;
  }

  return (
    <TouchableOpacity
      style={[styles.container, { backgroundColor: colour }]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <Text style={styles.text}>{"Choose colour for " + title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: borderRadius,
    borderWidth: borderWidth,
    borderColor: "#000",
    position: "relative",
    margin: 10,
    width: "100%",
    maxWidth: maxWidth,
    maxHeight: maxHeight,
    alignSelf: "flex-start",
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  text: {
    fontFamily: "Jua",
    fontSize: fontSize,
    color: "#000",
    textAlign: "center",
    position: "relative",
  },
});
