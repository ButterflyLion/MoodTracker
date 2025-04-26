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
    width: "100%",
    right: "15%",
  },
  otterIllustrationWrapper: {
    position: "absolute",
    top: "15%",
    margin: 10,
    width: "100%",
  },
});
