import * as React from "react";
import { StyleSheet, Dimensions, View } from "react-native";
import PuddleSvg from "@/components/Puddle";
import OtterIllustration from "./OtterIllustration";

const { width: screenWidth, height: screenHeight } = Dimensions.get("window");

export default function OtterDisplay() {
  const aspectRatio = 290 / 399;
  
    const maxWidth = screenWidth * 0.8;
    const maxHeight = screenHeight * 0.7;
    const otterWidth = Math.min(maxWidth, maxHeight * aspectRatio);
    const otterHeight = otterWidth / aspectRatio;

  return (
    <View style={styles.otterDisplay}>
      <View style={styles.puddleDisplay}>
        <PuddleSvg otterWidth={otterWidth} otterHeight={otterHeight} />
      </View>
      
      <View style={styles.otterIllustrationWrapper}>
        <OtterIllustration otterWidth={otterWidth} otterHeight={otterHeight} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  otterDisplay: {
    flex: 1,
    width: "100%",
  },
  otterIllustrationWrapper: {
    position: "absolute",
    top: "15%",
    width: "100%",
    right: "15%",
  },
  puddleDisplay: {
    position: "absolute",
    top: "15%",
    right: "10%",
    width: "100%",
  }
});
