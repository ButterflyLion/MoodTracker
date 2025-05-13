import React from "react";
import {
  View,
  Dimensions,
  TouchableOpacity,
  Text,
  StyleSheet,
  GestureResponderEvent,
} from "react-native";

const { width: screenWidth } = Dimensions.get("window");
const maxWidth = screenWidth * 0.5;
const maxHeight = Math.max(screenWidth * 0.1, 50);

interface Props {
  onPress?: (event: GestureResponderEvent) => void;
  text: string;
  icon: React.ReactNode;
  iconSize: number;
}

export default function MenuButton({ onPress, text, icon, iconSize }: Props) {
  const isSmallScreen = screenWidth < 400;
  const buttonWidth = isSmallScreen ? maxWidth : maxWidth * 0.55;
  const buttonHeight = isSmallScreen ? maxHeight : maxHeight * 0.55;
  const fontSize = iconSize * 0.85;

  const borderWidth = isSmallScreen
    ? Math.min(maxWidth * 0.015, 7)
    : Math.min(maxWidth * 0.01, 5);
  const borderRadius = isSmallScreen
    ? Math.min(maxWidth * 0.05, 20)
    : Math.min(maxWidth * 0.025, 10);

  return (
    <TouchableOpacity
      style={[
        styles.container,
        {
          width: buttonWidth,
          maxWidth: buttonWidth,
          height: buttonHeight,
          maxHeight: buttonHeight,
          borderWidth: borderWidth,
          borderRadius: borderRadius,
        },
      ]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <View style={styles.content}>
        <View
          style={[
            styles.iconContainer,
            {
              width: iconSize * 1.5,
              height: iconSize * 1.5,
              borderWidth: borderWidth,
              borderRadius: borderRadius,
            },
          ]}
        >
          {icon}
        </View>
        <Text style={[styles.text, { fontSize: fontSize }]}>{text}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "center",
    borderColor: "#25292E",
    position: "relative",
    margin: 10,
    backgroundColor: "#74D4E5",
  },
  content: {
    paddingHorizontal: maxWidth * 0.025,
    paddingVertical: 5,
    flexDirection: "row",
    alignItems: "center",
  },
  iconContainer: {
    backgroundColor: "#20B8D2",
    borderColor: "#25292E",
    position: "relative",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontFamily: "Jua",
    color: "#25292E",
    textAlign: "center",
    position: "relative",
    paddingLeft: maxWidth * 0.035,
    paddingRight: maxWidth * 0.035,
  },
});
