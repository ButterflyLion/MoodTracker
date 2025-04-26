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

const ColoursContext = createContext(null);

export const ColoursProvider = ({ children }) => {
  const [colors, setColors] = useState({
    highArousal: "",
    lowArousal: "",
    pleasant: "",
    unpleasant: "",
  });

  const getColours = async () => {
    const storedColors = await AsyncStorage.getItem("trackerColors");
    if (storedColors !== null) {
      setColors(JSON.parse(storedColors));
    }
  };

  useEffect(() => {
    getColours();
  }, []);

  return (
    <ColoursContext.Provider value={{ colors, setColors }}>
      {children}
    </ColoursContext.Provider>
  );
};

export const useColours = () => {
  const context = useContext(ColoursContext);
  if (!context) {
    throw new Error("useColours must be used within a ColoursProvider");
  }
  return context;
};

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

  const saveColors = async () => {
    await AsyncStorage.setItem("themeColors", JSON.stringify(colors));
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Customize Your Mood Theme</Text>

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

      {showModal && (
        <Modal
          style={styles.modalBackground}
          animationType="slide"
          accessible={true}
          transparent={true}
        >
          <ColorPicker
            style={{ width: "70%" }}
            value={colors[activeKey]}
            onComplete={onSelectColor}
          >
            <Panel1 />
            <HueSlider />
            <Swatches />
          </ColorPicker>

          <Button
            title="Select"
            color={colors[activeKey]}
            onPress={() => {
              saveColors();
              setShowModal(false);
            }}
          />
        </Modal>
      )}
    </ScrollView>
  );
}

const { width: screenWidth, height: screenHeight } = Dimensions.get("window");

const fontSize = Math.min(screenWidth * 0.06, 70);

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
    fontSize: fontSize,
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
  buttonContainer: {
    marginTop: 30,
    width: "100%",
  },
  modalBackground: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
});
