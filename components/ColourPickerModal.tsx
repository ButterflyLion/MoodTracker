import React from "react";
import { View, Text, Modal, StyleSheet, Dimensions } from "react-native";
import ColorPicker, {
  Panel1,
  Swatches,
  HueSlider,
} from "reanimated-color-picker";
import * as colourUtils from "@/assets/utils/colour-utils";
import ModalButton from "@/components/ModalButton";

export default function ColourPickerModal({
  showModal,
  setShowModal,
  activeKey,
  colours,
  setColours,
  selectedColour,
  setSelectedColour,
  prevColour,
}: {
  showModal: boolean;
  setShowModal: (value: boolean) => void;
  activeKey: keyof typeof colours;
  colours: colourUtils.Colours;
  setColours: (colours: colourUtils.Colours) => void;
  selectedColour: string;
  setSelectedColour: (colour: string) => void;
  prevColour: string;
}) {
  const readableTitles: Record<keyof colourUtils.Colours, string> = {
    pleasant: "Pleasant",
    unpleasant: "Unpleasant",
    highArousal: "High Energy",
    lowArousal: "Low Energy",
  };

  const saveColour = async (selectedColour: string) => {
    const updatedColours = {
      ...colours,
      [activeKey]: selectedColour,
    };
    setColours(updatedColours);
    console.log("Updated colours:", updatedColours);
    setShowModal(false);
  };

  const cancelColour = () => {
    const updatedColours = {
      ...colours,
      [activeKey]: prevColour,
    };
    setColours(updatedColours);
    setShowModal(false);
  };

  return (
    <Modal
      transparent={true}
      visible={showModal}
      animationType="slide"
      onRequestClose={() => {
        setShowModal(false);
      }}
    >
      <View style={styles.modalBackground}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>
            Pick a colour to represent {readableTitles[activeKey]}
          </Text>
          <ColorPicker
            value={colours[activeKey]}
            onChange={(colour) => setSelectedColour(colour.hex)}
          >
            <View style={styles.modalComponent}>
              <Panel1 />
            </View>
            <View style={styles.modalComponent}>
              <HueSlider />
            </View>
            <View style={styles.modalComponent}>
              <Swatches />
            </View>
          </ColorPicker>

          <View style={styles.modalButtons}>
            <ModalButton
              type="cancel"
              colour="#ABA8A7"
              onPress={() => {
                cancelColour();
              }}
            />
            <ModalButton
              type="select"
              colour={selectedColour}
              onPress={() => {
                saveColour(selectedColour);
              }}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
}

const { width: screenWidth, height: screenHeight } = Dimensions.get("window");
const maxWidth = screenWidth * 0.8;
const borderWidth = Math.min(maxWidth * 0.015, 7);
const borderRadius = Math.min(maxWidth * 0.05, 20);
const modatlTitleFontSize = Math.min(screenWidth * 0.06, 50);

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    borderRadius: borderRadius,
    borderWidth: borderWidth,
    borderColor: "#000",
  },
  modalContent: {
    backgroundColor: "#FFF",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
    boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.25)",
    elevation: 5, // For Android shadow
  },
  modalTitle: {
    fontFamily: "Jua",
    fontSize: modatlTitleFontSize,
    fontWeight: "bold",
    marginBottom: 10,
  },
  modalComponent: {
    padding: 15,
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 20,
  },
});
