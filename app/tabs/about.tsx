import { Text, View, StyleSheet } from "react-native";
import OtterDisplay from "../../components/OtterDisplay";

export default function About() {
  return (
    <View style={styles.container}>
      <OtterDisplay />
      <Text style={styles.text}>About</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#25292e",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: "#fff",
  },
});
