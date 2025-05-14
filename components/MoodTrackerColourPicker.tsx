import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView, Dimensions } from "react-native";
import * as colourUtils from "@/assets/utils/colour-utils";
import ColourPickerModal from "@/components/ColourPickerModal";
import ColourPickerButton from "@/components/buttons/ColourPickerButton";
import ModalButton from "@/components/buttons/ModalButton";

interface Props {
  colours: colourUtils.Colours;
  setColours: React.Dispatch<React.SetStateAction<colourUtils.Colours>>;
}

export default function MoodTrackerColourPicker({
  colours,
  setColours,
}: Props) {
  const isSmallScreen = screenWidth < 400;

  const [prevColour, setPrevColour] = useState<string>("#FFFFFF");
  const [showModal, setShowModal] = useState(false);
  const [activeKey, setActiveKey] =
    useState<keyof typeof colours>("highEnergy");
  const [selectedColour, setSelectedColour] = useState<string>(
    colours[activeKey]
  );

  const useDefaultColours = () => {
    setColours({
      highEnergy: "#E05300",
      lowEnergy: "#9FBBCD",
      pleasant: "#E1DE47",
      unpleasant: "#8F53DD",
    });
  };

  const clearColours = () => {
    setColours({
      highEnergy: "#FFFFFF",
      lowEnergy: "#FFFFFF",
      pleasant: "#FFFFFF",
      unpleasant: "#FFFFFF",
    });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Customize Your Mood Colours</Text>

      {Object.entries(colours).map(([key, value]) => (
        <View key={key} style={styles.option}>
          <ColourPickerButton
            title={`${key}`}
            onPress={() => {
              setActiveKey(key as keyof typeof colours);
              setPrevColour(colours[key as keyof typeof colours]);
              setShowModal(true);
            }}
            colour={value}
          />
        </View>
      ))}

      <ColourPickerModal
        showModal={showModal}
        setShowModal={setShowModal}
        activeKey={activeKey}
        colours={colours}
        setColours={setColours}
        selectedColour={selectedColour}
        setSelectedColour={setSelectedColour}
        prevColour={prevColour}
      />

      <View
        style={[
          styles.modalButtons,
          isSmallScreen
            ? { flexDirection: "column", justifyContent: "center" }
            : { flexDirection: "row", justifyContent: "space-around" },
        ]}
      >
        <ModalButton
          type="other"
          colour="#ABA8A7"
          text="Clear selection"
          onPress={clearColours}
        />
        <ModalButton
          type="other"
          colour="white"
          text="Use default"
          onPress={useDefaultColours}
        />
      </View>
    </ScrollView>
  );
}

const { width: screenWidth, height: screenHeight } = Dimensions.get("window");
const titleFontSize = Math.min(screenWidth * 0.08, 70);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    marginVertical: screenHeight * 0.05,
    fontFamily: "Jua",
    fontSize: titleFontSize,
    fontWeight: "bold",
    marginBottom: screenHeight * 0.01,
    color: "#25292E",
    textAlign: "center",
    position: "relative",
  },
  option: {
    display: "flex",
    position: "relative",
    marginVertical: screenHeight * 0.01,
    alignSelf: "center",
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: screenHeight * 0.025,
  },
});
