import AsyncStorage from "@react-native-async-storage/async-storage";

export interface TrackerType {
  option: "graph" | "slider" | "both" | "none";
}

export async function getTrackerType() {
    try {
        const storedTrackerType = await AsyncStorage.getItem("trackerType");
        if (storedTrackerType) {
            return storedTrackerType;
        } else {
            console.log("No stored tracker type found.");
            return null;
        }
    } catch (error) {
        console.error("Error retrieving tracker type:", error);
    }
}

export async function saveTrackerTypeToStorage(trackerType: string): Promise<void> {
    try {
        await AsyncStorage.setItem("trackerType", JSON.stringify(trackerType));
        console.log("Tracker type saved to storage:", trackerType);
    } catch (error) {
        console.error("Error saving tracker type to storage:", error);
    }
}

export async function removeTrackerTypeFromStorage(): Promise<void> {
    try {
        await AsyncStorage.removeItem("trackerType");
        console.log("Tracker type removed from storage");
    } catch (error) {
        console.error("Error removing tracker type from storage:", error);
    }
}

export async function savePleasantnessAndEnergyToStorage(pleasantness: number, energy: number): Promise<void> {
    try {
        await AsyncStorage.setItem("pleasantness", JSON.stringify(pleasantness));
        await AsyncStorage.setItem("energy", JSON.stringify(energy));
        console.log("Pleasantness and energy saved to storage:", { pleasantness, energy });
    } catch (error) {
        console.error("Error saving pleasantness to storage:", error);
    }
}

export async function getPleasantnessAndEnergyFromStorage(): Promise<{ pleasantness: number; energy: number } | null> {
    try {
        const storedPleasantness = await AsyncStorage.getItem("pleasantness");
        const storedEnergy = await AsyncStorage.getItem("energy");
        if (storedPleasantness && storedEnergy) {
            const parsedPleasantness = JSON.parse(storedPleasantness);
            const parsedEnergy = JSON.parse(storedEnergy);
            return { pleasantness: parsedPleasantness, energy: parsedEnergy };
        } else {
            console.log("No stored pleasantness found.");
            return null;
        }
    } catch (error) {
        console.error("Error retrieving pleasantness from storage:", error);
        return null;
    }
}