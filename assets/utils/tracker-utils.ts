import AsyncStorage from "@react-native-async-storage/async-storage";

export interface TrackerType {
  option: "graph" | "slider" | "both";
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
        await AsyncStorage.setItem("trackerType", trackerType);
        console.log("Tracker type saved to storage:", trackerType);
    } catch (error) {
        console.error("Error saving tracker type to storage:", error);
    }
}