import React, { createContext, useContext, useState, useEffect } from "react";
import {
  View,
  Text,
  Button,
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
import AsyncStorage from "@react-native-async-storage/async-storage";
import ColourPickerButton from "@/components/ColourPickerButton";
import ModalButton from "@/components/ModalButton";

export default function MoodTrackerColourPicker() {
  const [colors, setColors] = useState({
    highArousal: "",
    lowArousal: "",
    pleasant: "",
    unpleasant: "",
  });

  const [showModal, setShowModal] = useState(false);

  const handleColorChange = (color: string) => {
    setColors((prev) => ({
      ...prev,
      [activeKey]: color,
    }));
  };

  const onSelectColor = ({ hex }: { hex: string }) => {
    "worklet";
    handleColorChange(hex);
    console.log(hex);
  };

  const [activeKey, setActiveKey] =
    useState<keyof typeof colors>("highArousal");

  const saveColor = async () => {
    await AsyncStorage.setItem("themeColors", JSON.stringify(colors));
  };

  const cancelColour = () => {
    // TODO: clear button colour
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Customize Your Mood Colours</Text>

      {Object.entries(colors).map(([key, value]) => (
        <View key={key} style={styles.option}>
          <ColourPickerButton
            title={`${key}`}
            onPress={() => {
              setActiveKey(key as keyof typeof colors);
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
            <Text style={styles.modalTitle}>Pick a colour</Text>
            <ColorPicker value={colors[activeKey]} onComplete={onSelectColor}>
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
                  setShowModal(false);
                }}
              />
              <ModalButton
                type="select"
                colour={colors[activeKey]}
                onPress={() => {
                  saveColor();
                  setShowModal(false);
                }}
              />
            </View>
          </View>
        </View>
      </Modal>
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
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
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
