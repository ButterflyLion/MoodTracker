import React from "react";
import { Text, View, StyleSheet, Dimensions } from "react-native";

const { width: width, height: height } = Dimensions.get("window");
const titleFontSize = Math.max(width * 0.04, 35);

export default function About() {
  return (
    <View style={styles.scrollContainer}>
      <Text style={styles.title}>About</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    paddingVertical: 20,
    backgroundColor: "#74D4E5",
  },
  title: {
    fontFamily: "Jua",
    fontSize: titleFontSize,
    fontWeight: "bold",
    color: "#25292E",
    marginVertical: height * 0.05,
    textAlign: "center",
    position: "relative",
    alignContent: "center",
  },
});
