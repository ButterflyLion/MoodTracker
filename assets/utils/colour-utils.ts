import AsyncStorage from "@react-native-async-storage/async-storage";

type RGB = { r: number; g: number; b: number };

export interface Colours {
  highArousal: string;
  lowArousal: string;
  pleasant: string;
  unpleasant: string;
}

export async function getColours() {
  try {
    const storedColors = await AsyncStorage.getItem("moodTrackerColours");
    if (storedColors) {
      return JSON.parse(storedColors);
    }
    else {
      console.log("No stored colors found.");
      return null;
    }
  } catch (error) {
    console.error("Error retrieving tracker colors:", error);
  }
}

export async function saveColoursToStorage(colours: Colours): Promise<void> {
  try {
    await AsyncStorage.setItem("moodTrackerColours", JSON.stringify(colours));
    console.log("Colours saved to storage:", colours);
  } catch (error) {
    console.error("Error saving colours to storage:", error);
  }
};

export function hexToRgb(hex: string): RGB {
  const sanitized = hex.replace("#", "");
  const bigint = parseInt(sanitized, 16);
  return {
    r: (bigint >> 16) & 255,
    g: (bigint >> 8) & 255,
    b: bigint & 255,
  };
}

export function rgbToHex({ r, g, b }: RGB): string {
  return (
    "#" +
    [r, g, b]
      .map((x) => {
        const hex = x.toString(16);
        return hex.length === 1 ? "0" + hex : hex;
      })
      .join("")
  );
}

export function lerpColor(hex1: string, hex2: string, t: number): string {
  const c1 = hexToRgb(hex1);
  const c2 = hexToRgb(hex2);

  return rgbToHex({
    r: Math.round(c1.r + (c2.r - c1.r) * t),
    g: Math.round(c1.g + (c2.g - c1.g) * t),
    b: Math.round(c1.b + (c2.b - c1.b) * t),
  });
}

export function generateMoodColors({
  pleasant,
  unpleasant,
  highArousal,
  lowArousal,
}: {
  pleasant: string;
  unpleasant: string;
  highArousal: string;
  lowArousal: string;
}) {
  // Pleasantness Axis
  const neutralPleasantness = lerpColor(pleasant, unpleasant, 0.5);
  const mediumPleasantness = lerpColor(pleasant, neutralPleasantness, 0.5);
  const mediumUnpleasantness = lerpColor(unpleasant, neutralPleasantness, 0.5);

  // Arousal Axis
  const neutralArousal = lerpColor(highArousal, lowArousal, 0.5);
  const mediumHighArousal = lerpColor(highArousal, neutralArousal, 0.5);
  const mediumLowArousal = lerpColor(lowArousal, neutralArousal, 0.5);

  return {
    pleasant,
    mediumPleasantness,
    neutralPleasantness,
    mediumUnpleasantness,
    unpleasant,

    highArousal,
    mediumHighArousal,
    neutralArousal,
    mediumLowArousal,
    lowArousal,
  };
}
