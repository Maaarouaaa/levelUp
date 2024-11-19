import { StyleSheet, Text, View } from "react-native";

export default function NewPost() {
  return (
    <View style={styles.container}>
      <Text style={styles.centerText}>This is the completed task list</Text>
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
