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

const fontSize = Math.min(maxWidth * 0.08, 50);
const borderWidth = Math.min(maxWidth * 0.015, 7);
const borderRadius = Math.min(maxWidth * 0.05, 20);

interface Props {
  type: "select" | "cancel" | string;
  text?: string;
  onPress?: (event: GestureResponderEvent) => void;
  colour: string;
}

export default function StartButton({ type, onPress, text, colour }: Props) {
  switch (type) {
    case "select":
      return (
        <TouchableOpacity
          style={[styles.selectContainer, { backgroundColor: colour }]}
          onPress={onPress}
          activeOpacity={0.8}
        >
          <Text style={styles.text}>Select</Text>
        </TouchableOpacity>
      );
    case "cancel":
      return (
        <TouchableOpacity
          style={[styles.cancelContainer, { backgroundColor: colour }]}
          onPress={onPress}
          activeOpacity={0.8}
        >
          <Text style={styles.text}>Cancel</Text>
        </TouchableOpacity>
      );
    default:
      return (
        <TouchableOpacity
          style={[styles.selectContainer, { backgroundColor: colour }]}
          onPress={onPress}
          activeOpacity={0.8}
        >
          <Text style={styles.text}>{text}</Text>
        </TouchableOpacity>
      );
  }
}

const styles = StyleSheet.create({
  selectContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: borderRadius,
    borderWidth: borderWidth,
    borderColor: "#000",
    position: "relative",
    margin: 10,
    maxWidth: maxWidth,
    maxHeight: maxHeight,
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  cancelContainer: {
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
