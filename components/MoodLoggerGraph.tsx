import { Dimensions } from "react-native";
import Svg, {
  Line,
  Text as SvgText,
  Defs,
  LinearGradient,
  Stop,
  Rect,
} from "react-native-svg";

interface ColourPickerModalProps {
  high_arousal: string;
  medium_high_arousal: string;
  neutral_arousal: string;
  medium_low_arousal: string;
  low_arousal: string;
  pleasant: string;
  medium_pleasantness: string;
  neutral_pleasantness: string;
  medium_unpleasantness: string;
  unpleasant: string;
  graphSize: number;
}

const { width: width, height: height } = Dimensions.get("window");
const fontSize = Math.min(width * 0.03, 50);

export default function MoodLoggerGraph({
  high_arousal,
  medium_high_arousal,
  neutral_arousal,
  medium_low_arousal,
  low_arousal,
  pleasant,
  medium_pleasantness,
  neutral_pleasantness,
  medium_unpleasantness,
  unpleasant,
  graphSize,
}: ColourPickerModalProps) {
  return (
    <Svg width={graphSize} height={graphSize}>
      {/* Quadrant-Based Gradients */}
      <Defs>
        {/* Top-Right Quadrant */}
        <LinearGradient
          id="topRightHorizontal"
          x1="0%"
          y1="50%"
          x2="100%"
          y2="50%"
        >
          <Stop offset="0%" stopColor={neutral_pleasantness} />
          <Stop offset="30%" stopColor={medium_pleasantness} />
          <Stop offset="100%" stopColor={pleasant} />
        </LinearGradient>
        <LinearGradient
          id="topRightVertical"
          x1="50%"
          y1="100%"
          x2="50%"
          y2="0%"
        >
          <Stop offset="0%" stopColor={neutral_arousal} />
          <Stop offset="30%" stopColor={medium_high_arousal} />
          <Stop offset="100%" stopColor={high_arousal} />
        </LinearGradient>

        {/* Top-Left Quadrant */}
        <LinearGradient
          id="topLeftHorizontal"
          x1="100%"
          y1="50%"
          x2="0%"
          y2="50%"
        >
          <Stop offset="0%" stopColor={neutral_pleasantness} />
          <Stop offset="30%" stopColor={medium_unpleasantness} />
          <Stop offset="100%" stopColor={unpleasant} />
        </LinearGradient>
        <LinearGradient
          id="topLeftVertical"
          x1="50%"
          y1="100%"
          x2="50%"
          y2="0%"
        >
          <Stop offset="0%" stopColor={neutral_arousal} />
          <Stop offset="30%" stopColor={medium_high_arousal} />
          <Stop offset="100%" stopColor={high_arousal} />
        </LinearGradient>

        {/* Bottom-Left Quadrant */}
        <LinearGradient
          id="bottomLeftHorizontal"
          x1="100%"
          y1="50%"
          x2="0%"
          y2="50%"
        >
          <Stop offset="0%" stopColor={neutral_pleasantness} />
          <Stop offset="30%" stopColor={medium_unpleasantness} />
          <Stop offset="100%" stopColor={unpleasant} />
        </LinearGradient>
        <LinearGradient
          id="bottomLeftVertical"
          x1="50%"
          y1="0%"
          x2="50%"
          y2="100%"
        >
          <Stop offset="0%" stopColor={neutral_arousal} />
          <Stop offset="30%" stopColor={medium_low_arousal} />
          <Stop offset="100%" stopColor={low_arousal} />
        </LinearGradient>

        {/* Bottom-Right Quadrant */}
        <LinearGradient
          id="bottomRightHorizontal"
          x1="0%"
          y1="50%"
          x2="100%"
          y2="50%"
        >
          <Stop offset="0%" stopColor={neutral_pleasantness} />
          <Stop offset="30%" stopColor={medium_pleasantness} />
          <Stop offset="100%" stopColor={pleasant} />
        </LinearGradient>
        <LinearGradient
          id="bottomRightVertical"
          x1="50%"
          y1="0%"
          x2="50%"
          y2="100%"
        >
          <Stop offset="0%" stopColor={neutral_arousal} />
          <Stop offset="30%" stopColor={medium_low_arousal} />
          <Stop offset="100%" stopColor={low_arousal} />
        </LinearGradient>
      </Defs>

      {/* Top-Right Quadrant */}
      <Rect
        x={graphSize / 2}
        y="0"
        width={graphSize / 2}
        height={graphSize / 2}
        fill="url(#topRightHorizontal)"
        fillOpacity="1"
      />
      <Rect
        x={graphSize / 2}
        y="0"
        width={graphSize / 2}
        height={graphSize / 2}
        fill="url(#topRightVertical)"
        fillOpacity="0.5"
      />

      {/* Top-Left Quadrant */}
      <Rect
        x="0"
        y="0"
        width={graphSize / 2}
        height={graphSize / 2}
        fill="url(#topLeftHorizontal)"
        fillOpacity="1"
      />
      <Rect
        x="0"
        y="0"
        width={graphSize / 2}
        height={graphSize / 2}
        fill="url(#topLeftVertical)"
        fillOpacity="0.5"
      />

      {/* Bottom-Left Quadrant */}
      <Rect
        x="0"
        y={graphSize / 2}
        width={graphSize / 2}
        height={graphSize / 2}
        fill="url(#bottomLeftHorizontal)"
        fillOpacity="1"
      />
      <Rect
        x="0"
        y={graphSize / 2}
        width={graphSize / 2}
        height={graphSize / 2}
        fill="url(#bottomLeftVertical)"
        fillOpacity="0.5"
      />
      {/* Bottom-Right Quadrant */}
      <Rect
        x={graphSize / 2}
        y={graphSize / 2}
        width={graphSize / 2}
        height={graphSize / 2}
        fill="url(#bottomRightHorizontal)"
        fillOpacity="1"
      />
      <Rect
        x={graphSize / 2}
        y={graphSize / 2}
        width={graphSize / 2}
        height={graphSize / 2}
        fill="url(#bottomRightVertical)"
        fillOpacity="0.5"
      />

      {/* X-Axis (Valence) */}
      <Line
        x1="0"
        y1={graphSize / 2}
        x2={graphSize}
        y2={graphSize / 2}
        stroke="black"
        strokeWidth="4"
      />
      {/* Y-Axis (Arousal) */}
      <Line
        x1={graphSize / 2}
        y1="0"
        x2={graphSize / 2}
        y2={graphSize}
        stroke="black"
        strokeWidth="4"
      />

      {/* Labels */}
      <SvgText
        x={Math.min(graphSize - fontSize * 5, graphSize - 150)} // Clamp to prevent going off the right edge
        y={graphSize / 2 - 10}
        fontFamily="Jua"
        fontSize={fontSize}
      >
        Positive
      </SvgText>
      <SvgText
        x={Math.max(fontSize, 20)} // Ensure it doesn't go off the left edge
        y={graphSize / 2 - 10}
        fontFamily="Jua"
        fontSize={fontSize}
      >
        Negative
      </SvgText>
      <SvgText
        x={graphSize / 2 + 10}
        y={Math.max(fontSize + 10, 30)} // Ensure it doesn't go off the top
        fontFamily="Jua"
        fontSize={fontSize}
      >
        High Arousal
      </SvgText>
      <SvgText
        x={graphSize / 2 + 10}
        y={graphSize - (fontSize / 2)} // Adjust based on font size to prevent overlap at the bottom
        fontFamily="Jua"
        fontSize={fontSize}
      >
        Low Arousal
      </SvgText>
    </Svg>
  );
}
