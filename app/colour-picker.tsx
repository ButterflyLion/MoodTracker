import React, { useState } from "react";
import { useRouter } from "expo-router";
import { View, Text, StyleSheet, ScrollView, Dimensions } from "react-native";
import * as colourUtils from "@/assets/utils/colour-utils";
import ColourPickerModal from "@/components/ColourPickerModal";
import ColourPickerButton from "@/components/ColourPickerButton";
import ModalButton from "@/components/ModalButton";

export default function MoodTrackerColourPicker() {
  const router = useRouter();

  const [colours, setColours] = useState<colourUtils.Colours>({
    highArousal: "#FFFFFF",
    lowArousal: "#FFFFFF",
    pleasant: "#FFFFFF",
    unpleasant: "#FFFFFF",
  });
  const [prevColour, setPrevColour] = useState<string>("#FFFFFF");
  const [showModal, setShowModal] = useState(false);
  const [activeKey, setActiveKey] =
    useState<keyof typeof colours>("highArousal");
  const [selectedColour, setSelectedColour] = useState<string>(
    colours[activeKey]
  );

  const useDefaultColours = () => {
    setColours({
      highArousal: "#E05300",
      lowArousal: "#9FBBCD",
      pleasant: "#E1DE47",
      unpleasant: "#8F53DD",
    });
  };

  const clearColours = () => {
    setColours({
      highArousal: "#FFFFFF",
      lowArousal: "#FFFFFF",
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

      <View style={styles.modalButtons}>
        <ModalButton
          type="other"
          colour="#ABA8A7"
          text="Clear selection"
          onPress={clearColours}
        />
        <ModalButton
          type="other"
          colour="#fff"
          text="Use default"
          onPress={useDefaultColours}
        />
        <ModalButton
          type="other"
          colour="##88d481"
          text="Save selection"
          onPress={() => {
            colourUtils.saveColoursToStorage(colours).then(() => {
              router.push({
                pathname: "/tabs/log-mood",
                params: {
                  moodTrackerColours: JSON.stringify(colours),
                },
              });
            });
          }}
        />
      </View>
    </ScrollView>
  );
}

const { width: screenWidth, height: screenHeight } = Dimensions.get("window");
const titleFontSize = Math.min(screenWidth * 0.06, 70);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    alignItems: "center",
  },
  title: {
    marginVertical: 20,
    fontFamily: "Jua",
    fontSize: titleFontSize,
    fontWeight: "bold",
    marginBottom: 5,
    color: "#000",
  },
  option: {
    display: "flex",
    position: "relative",
    marginVertical: 10,
    alignSelf: "center",
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 20,
  },
});
