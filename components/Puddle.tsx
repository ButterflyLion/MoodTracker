import React from "react";
import { Dimensions, View, StyleSheet } from "react-native";
import Svg, { Path } from "react-native-svg";

const { width: screenWidth, height: screenHeight } = Dimensions.get("window");

export default function PuddleSvg({otterWidth, otterHeight,}: {otterWidth: number; otterHeight: number;}) {
  const aspectRatio = 485 / 385;

  const maxWidth = screenWidth * 0.8;
  const maxHeight = screenHeight * 0.7;
  const width = Math.min(maxWidth, maxHeight * aspectRatio);
  const strokeWidth = Math.max(width / 70, 5);

  const puddleWidth = otterWidth * 2;
  const puddleHeight = puddleWidth / aspectRatio;

  return (
    <View style={styles.puddleContainer}>
      <Svg
        style={styles.puddleSVG}
        width={puddleWidth}
        height={puddleHeight}
        viewBox="0 0 386 492"
        fill="none"
        preserveAspectRatio="xMidYMid meet"
      >
        <Path
          d="M233 226.5C228 246.5 213.552 280.908 188.5 288.5C172 293.5 172 299.5 165 310M240.5 265.5C223.5 293.5 218 300.5 188.5 307.5"
          stroke="#20B8D2"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
        />
        <Path
          d="M162 11C144.5 28 133.586 34.0082 98 41.5C79 45.5 60.5 65 45 87M56.5 41.5C69.5 29.5 81.5 18.5 110.5 17C120.569 16.4792 129.5 11 135.5 5"
          stroke="#20B8D2"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
        />
        <Path
          d="M58.5 419.5C80 448 116 468 150 468M64 453.5C90 477.5 105 484 130 487"
          stroke="#20B8D2"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
        />
        <Path
          d="M164.5 438.5C144.698 469.303 56.4993 416.5 19 355C-30.5002 311 7.77904 166.141 40.5 118C83.9999 54 135.5 63 180.5 23.9999C229.412 -18.3903 308.5 2.50006 327.5 65.9999C346.536 129.621 330 181.5 250 187.5C216.889 189.983 209.5 239.5 196.5 255C178.887 276 129.5 287 134 333.5C136.866 363.115 187 403.5 164.5 438.5Z"
          fill="#20B8D2"
        />
        <Path
          d="M330 18C356 49.5 367 76 356 121M365.5 34C385 60.5 381 71.5 378 95.5"
          stroke="#20B8D2"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
        />
      </Svg>
    </View>
  );
}

const styles = StyleSheet.create({
  puddleContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  puddleSVG: {
    flexShrink: 0,
    overflow: "visible",
  },
});
