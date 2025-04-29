import React, { useState } from "react";
import { useRouter } from "expo-router";
import {
  View,
  Text,
  Modal,
  StyleSheet,
  ScrollView,
  Dimensions,
} from "react-native";
import ColorPicker, {
  Panel1,
  Swatches,
  HueSlider,
} from "reanimated-color-picker";
import * as colourUtils from "@/assets/utils/colour-utils";
import ColourPickerButton from "@/components/ColourPickerButton";
import ModalButton from "@/components/ModalButton";

export default function MoodTrackerColourPicker() {
  const router = useRouter();

  const readableTitles: Record<keyof colourUtils.Colours, string> = {
    pleasant: "Pleasant",
    unpleasant: "Unpleasant",
    highArousal: "High Energy",
    lowArousal: "Low Energy",
  };

  const [colours, setColours] = useState<colourUtils.Colours>({
    highArousal: "#FFFFFF",
    lowArousal: "#FFFFFF",
    pleasant: "#FFFFFF",
    unpleasant: "#FFFFFF",
  });
  const [prevColour, setPrevColour] = useState<string>("#FFFFFF");

  const [showModal, setShowModal] = useState(false);
  const [activeKey, setActiveKey] = useState<keyof typeof colours>("highArousal");
  const [selectedColour, setSelectedColour] = useState<string>(colours[activeKey]);

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
const maxWidth = screenWidth * 0.8;
const borderWidth = Math.min(maxWidth * 0.015, 7);
const borderRadius = Math.min(maxWidth * 0.05, 20);

const titleFontSize = Math.min(screenWidth * 0.06, 70);
const modatlTitleFontSize = Math.min(screenWidth * 0.06, 50);

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
