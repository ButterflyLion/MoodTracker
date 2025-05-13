import React from "react";
import { Text, View, StyleSheet, Dimensions } from "react-native";
import { getPleasantnessAndEnergyFromStorage } from "@/assets/utils/tracker-utils";

const { width: width, height: height } = Dimensions.get("window");
const titleFontSize = Math.max(width * 0.04, 35);

export default function MoodHistory() {
  const [pleasantness, setPleasantness] = React.useState<number | null>(null);
  const [energy, setEnergy] = React.useState<number | null>(null);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    setIsLoading(true);
    const fetchPleasantnessAndEnergy = async () => {
      try {
        const data = await getPleasantnessAndEnergyFromStorage();
        if (data) {
          setPleasantness(data.pleasantness);
          setEnergy(data.energy);
          console.log("Fetched pleasantness and energy:", data);
        }
      } catch (error) {
        console.error("Error fetching pleasantness and energy:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPleasantnessAndEnergy();
  }, [pleasantness, energy]);

  if (isLoading) {
    return (
      <View style={styles.scrollContainer}>
        <Text style={styles.title}>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.scrollContainer}>
      <Text style={styles.title}>Mood History</Text>
      {(pleasantness === null || energy === null) && (
        <>
          <Text style={styles.title}>No data available</Text>
          <Text style={styles.title}>Pleasantness: 0</Text>
          <Text style={styles.title}>Energy: 0</Text>
        </>
      )}
      {(pleasantness && energy) && (
        <>
          <Text style={styles.title}>Pleasantness: {Math.round(pleasantness * 100)}%</Text>
          <Text style={styles.title}>Energy: {Math.round(energy * 100)}%</Text>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    paddingVertical: 20,
    backgroundColor: "#74D4E5",
  },
  title: {
    fontFamily: "Jua",
    fontSize: titleFontSize,
    fontWeight: "bold",
    color: "#25292E",
    marginVertical: height * 0.05,
    textAlign: "center",
    position: "relative",
    alignContent: "center",
  },
});
