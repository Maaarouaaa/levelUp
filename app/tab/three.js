import React from "react";
import { StyleSheet, Text, View } from "react-native";
import ExperienceButton from "@/components/TodaysExperience"; // Update the path if it's located elsewhere

export default function Three() {
  return (
    <View style={styles.container}>
      <Text style={styles.centerText}>This is screen three</Text>
      <ExperienceButton
        name="Solve a Rubik's Cube"
        xp="XP: 20"
        photo={require("@/assets/rubiks_cube.jpg")} // Ensure the path to rubiks.jpg is correct
        description="Solve a Rubik's Cube description"
        onPress={() => console.log("Go to Rubik's Cube Experience")}
      />
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
    marginBottom: 20, // Add spacing between text and the button
  },
});
