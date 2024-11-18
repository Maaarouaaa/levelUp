import { StyleSheet, Text, View } from "react-native";

export default function four() {
  return (
    <View style={styles.container}>
      <Text style={styles.centerText}>This is screen four</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff", // Neutral background color
  },
  centerText: {
    fontSize: 18, // Adjust font size as needed
    color: "#000", // Neutral text color
  },
});
