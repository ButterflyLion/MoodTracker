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
  high_energy: string;
  medium_high_energy: string;
  neutral_energy: string;
  medium_low_energy: string;
  low_energy: string;
  pleasant: string;
  medium_pleasantness: string;
  neutral_pleasantness: string;
  medium_unpleasantness: string;
  unpleasant: string;
  graphSize: number;
}

const { width: width, height: height } = Dimensions.get("window");
const fontSize =
  width < 400 ? Math.max(height * 0.02, 20) : Math.max(height * 0.025, 30);

export default function MoodLoggerGraph({
  high_energy,
  medium_high_energy,
  neutral_energy,
  medium_low_energy,
  low_energy,
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
          <Stop offset="0%" stopColor={neutral_energy} />
          <Stop offset="30%" stopColor={medium_high_energy} />
          <Stop offset="100%" stopColor={high_energy} />
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
          <Stop offset="0%" stopColor={neutral_energy} />
          <Stop offset="30%" stopColor={medium_high_energy} />
          <Stop offset="100%" stopColor={high_energy} />
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
          <Stop offset="0%" stopColor={neutral_energy} />
          <Stop offset="30%" stopColor={medium_low_energy} />
          <Stop offset="100%" stopColor={low_energy} />
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
          <Stop offset="0%" stopColor={neutral_energy} />
          <Stop offset="30%" stopColor={medium_low_energy} />
          <Stop offset="100%" stopColor={low_energy} />
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
        stroke="#25292E"
        strokeWidth="4"
      />
      {/* Y-Axis (Energy) */}
      <Line
        x1={graphSize / 2}
        y1="0"
        x2={graphSize / 2}
        y2={graphSize}
        stroke="#25292E"
        strokeWidth="4"
      />

      {/* Labels */}
      <SvgText
        x={
          width < 400
            ? Math.min(graphSize - fontSize * 2.5, graphSize - 80) // Smaller padding for narrow screens
            : Math.min(graphSize - fontSize * 3, graphSize - 120)
        }
        y={graphSize / 2 - 10}
        fontFamily="Jua"
        fontSize={fontSize}
        fill="#25292E"
      >
        Positive
      </SvgText>
      <SvgText
        x={width < 400 ? Math.max(fontSize * 0.5, 5) : Math.max(fontSize * 0.5, 20)}
        y={graphSize / 2 - 10}
        fontFamily="Jua"
        fontSize={fontSize}
        fill="#25292E"
      >
        Negative
      </SvgText>
      <SvgText
        x={graphSize / 2 + 10}
        y={Math.max(fontSize + 10, 30)} // Ensure it doesn't go off the top
        fontFamily="Jua"
        fontSize={fontSize}
        fill="#25292E"
      >
        High Energy
      </SvgText>
      <SvgText
        x={graphSize / 2 + 10}
        y={graphSize - fontSize / 2} // Adjust based on font size to prevent overlap at the bottom
        fontFamily="Jua"
        fontSize={fontSize}
        fill="#25292E"
      >
        Low Energy
      </SvgText>
    </Svg>
  );
}
