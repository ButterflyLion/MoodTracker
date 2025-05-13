import { Dimensions } from "react-native";
import { Tabs } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import AntDesign from "@expo/vector-icons/AntDesign";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

const { width: screenWidth, height: screenHeight } = Dimensions.get("window");
const tabBarHeight = Math.max(screenHeight * 0.08, 60);
const iconSize = Math.max(screenWidth * 0.025, 30);

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarActiveTintColor: "#20B8D2",
        tabBarInactiveTintColor: "#C7F0FF",
        tabBarStyle: {
          backgroundColor: "#25292E",
          height: tabBarHeight,
        },
      }}
    >
      <Tabs.Screen
        name="log-mood"
        options={{
          tabBarIcon: ({ color, focused }) => (
            <AntDesign
              name={focused ? "pluscircle" : "pluscircleo"}
              size={iconSize}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="menu"
        options={{
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? "home-sharp" : "home-outline"}
              size={iconSize}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="journal"
        options={{
          tabBarIcon: ({ color, focused }) => (
            <MaterialCommunityIcons
              name={
                focused ? "pencil-circle" : "pencil-circle-outline"
              }
              size={iconSize}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="index"
        options={{
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={
                focused ? "bar-chart-sharp" : "bar-chart-outline"
              }
              size={iconSize}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
}
