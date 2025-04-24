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

const aspectRatio = 228 / 49;

const maxWidth = screenWidth * 0.5;
const maxHeight = screenHeight * 0.1;
const width = Math.min(maxWidth, maxHeight * aspectRatio);
const height = width / aspectRatio;

interface Props {
  onPress?: (event: GestureResponderEvent) => void;
  text: string;
}

export default function LogMoodButton({ onPress, text }: Props) {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <View style={styles.background} />
      <Text style={styles.text}>{text}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    borderWidth: screenWidth * 0.005,
    borderColor: "#000",
    backgroundColor: "#h",
    position: "relative",
    margin: screenHeight * 0.015,
    maxWidth: width,
    maxHeight: height,
  },
  background: {
    position: "absolute",
    width: "100%",
    height: "100%",
    borderRadius: 10,
    backgroundColor: "#C7F0FF",
  },
  text: {
    fontFamily: "Jua",
    fontSize: screenWidth * 0.04,
    color: "#000",
    textAlign: "center",
    position: "relative",
  },
});
