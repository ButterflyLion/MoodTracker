import * as React from "react";
import { StyleSheet, Dimensions, View } from "react-native";
import OtterIllustration from "./OtterIllustration";

export default function OtterDisplay() {
  return (
    <View style={styles.otterDisplay}>
      <View style={styles.otterIllustrationWrapper}>
        <OtterIllustration />
      </View>
      <View style={styles.contentContainer} />
    </View>
  );
}

const styles = StyleSheet.create({
  otterDisplay: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
  },
  otterIllustrationWrapper: {
    marginBottom: 20,
  },
  contentContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    minHeight: Dimensions.get("window").height,
    backgroundColor: "#ffffff",
    padding: 20,
    width: "100%",
  },
});
