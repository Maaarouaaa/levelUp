import React from "react";
import { StyleSheet, Text, View } from "react-native";
import ExperienceButton from "@/components/TodaysExperience"; 

export default function Three() {
  return (
    <View style={styles.container}>
      <Text style={styles.centerText}>This is screen three</Text>
      <ExperienceButton
        name="Solve a Rubik's Cube"
        xp="20"
        photo={require("@/assets/rubiks_cube.jpg")} 
        description="Learn how to solve a Rubik’s Cube! Then, challenge your friends"
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
