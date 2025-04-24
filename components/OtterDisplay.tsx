import * as React from "react";
import { StyleSheet, Dimensions, View } from "react-native";
import OtterIllustration from "./OtterIllustration";

export default function OtterDisplay() {
  return (
    <View style={styles.otterDisplay}>
      <View style={styles.otterIllustrationWrapper}>
        <OtterIllustration />
      </View>
    </View>
  );
}

const { width: screenWidth, height: screenHeight } = Dimensions.get("window");

const styles = StyleSheet.create({
  otterDisplay: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
    right: screenWidth * 0.2,
  },
  otterIllustrationWrapper: {
    justifyContent: "center",
    alignItems: "center",
    height: screenHeight,
    margin: 10,
    width: "100%",
  },
});
