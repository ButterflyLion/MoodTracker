import React, { useState } from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import ModalButton from "./ModalButton";

interface Props {
  steps: React.ReactNode[];
  onFirstNextButtonPress?: () => void;
  onDoneButtonPress: () => void;
}

export default function MultiStepForm({
  steps,
  onFirstNextButtonPress,
  onDoneButtonPress,
}: Props) {
  const totalSteps = steps.length;
  const [step, setStep] = useState(1);

  const handleNext = () => {
    if (step === 1 && onFirstNextButtonPress) {
      onFirstNextButtonPress();
    }
    setStep((prevStep) => Math.min(prevStep + 1, totalSteps));
  };

  const handlePrevious = () => {
    setStep((prevStep) => Math.max(prevStep - 1, 1));
  };

  const renderStepIndicator = () => {
    const indicators = [];
    for (let i = 1; i <= totalSteps; i++) {
      indicators.push(
        <View key={i} style={styles.stepContainer}>
          <View style={[styles.stepIndicator, i <= step && styles.activeStep]}>
            <Text style={[styles.stepText, i <= step && styles.activeStepText]}>
              {i}
            </Text>
          </View>
          {i < totalSteps && (
            <View style={[styles.line, i < step && styles.activeLine]} />
          )}
        </View>
      );
    }
    return <View style={styles.indicatorContainer}>{indicators}</View>;
  };

  return (
    <View style={styles.container}>
      {renderStepIndicator()}

      <View style={styles.contentContainer}>{steps[step - 1]}</View>

      <View style={styles.buttonContainer}>
        {step > 1 && (
          <ModalButton
            type="other"
            text="Back"
            onPress={handlePrevious}
            colour="white"
          />
        )}
        {step < totalSteps ? (
          <ModalButton
            type="other"
            text="Next"
            onPress={handleNext}
            colour="#4AA655"
          />
        ) : (
          <ModalButton
            type="other"
            text="Done"
            onPress={onDoneButtonPress}
            colour="#4AA655"
          />
        )}
      </View>
    </View>
  );
}

const { height: screenHeight } = Dimensions.get("window");
const fontSize = Math.max(screenHeight * 0.02, 20);
const stepIndicator = Math.max(screenHeight * 0.045, 35);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    paddingTop: screenHeight * 0.02,
    backgroundColor: "#20B8D2",
    margin: screenHeight * 0.025,
    borderRadius: screenHeight * 0.02,
  },
  indicatorContainer: {
    flexDirection: "row",
    marginTop: screenHeight * 0.02,
  },
  stepContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  stepIndicator: {
    width: stepIndicator,
    height: stepIndicator,
    borderRadius: stepIndicator / 2,
    borderWidth: stepIndicator / 10,
    borderColor: "#C7F0FF",
    backgroundColor: "#C7F0FF",
    justifyContent: "center",
    alignItems: "center",
  },
  activeStep: {
    borderColor: "#25292E",
    backgroundColor: "#4AA655",
  },
  stepText: {
    color: "white",
    fontWeight: "bold",
    fontSize: fontSize,
  },
  activeStepText: {
    color: "#25292E",
  },
  line: {
    width: screenHeight * 0.1,
    height: screenHeight * 0.015,
    backgroundColor: "#C7F0FF",
    marginHorizontal: screenHeight * 0.01,
    borderRadius: screenHeight * 0.01,
  },
  activeLine: {
    backgroundColor: "#4AA655",
    borderWidth: stepIndicator / 10,
  },
  contentContainer: {
    flex: 1,
    justifyContent: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    marginBottom: screenHeight * 0.02,
  },
});
