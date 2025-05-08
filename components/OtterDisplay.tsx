import * as React from "react";
import { StyleSheet, Dimensions, View } from "react-native";
import PuddleSvg from "@/components/Puddle";
import OtterIllustration from "./OtterIllustration";
import SittingOtterIllustration from "./SittingOtterIllustration";

interface Props {
  screen: string;
}

const { width: screenWidth, height: screenHeight } = Dimensions.get("window");

export default function OtterDisplay({ screen }: Props) {
  const maxWidth = screenWidth * 0.8;
  const maxHeight = screenHeight * 0.7;

  return (
    <View style={styles.otterDisplay}>
      {screen === "index" ? (
        <View style={styles.puddleDisplay}>
          <PuddleSvg maxWidth={maxWidth} maxHeight={maxHeight} />
        </View>
      ) : null}

      <View style={styles.otterIllustrationWrapper}>
        {screen === "index" ? (
          <OtterIllustration maxWidth={maxWidth} maxHeight={maxHeight} />
        ) : (
          <SittingOtterIllustration maxWidth={maxWidth} maxHeight={maxHeight} />
        )}
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
    right: "14%",
  },
  puddleDisplay: {
    position: "absolute",
    top: "15%",
    right: "12%",
    width: "100%",
  },
});
