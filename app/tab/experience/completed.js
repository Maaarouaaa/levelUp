import React, { useState } from "react";
import { StyleSheet, Text, View, TextInput, ScrollView, TouchableOpacity } from "react-native";
import ExperienceCard from "@/components/ExperienceCard";

export default function Three({ navigation }) {
  const [searchText, setSearchText] = useState("");
  const [isToggled, setIsToggled] = useState(false);

  const handleToggle = () => {
    setIsToggled((prev) => !prev);
  };

  return (
    <View style={styles.container}>
      {/* Blue Background */}
      <View style={styles.blueBackground}>
        <Text style={styles.headerText}>[My Experiences]</Text>
      </View>

      {/* Search Bar */}
      <TextInput
        style={styles.searchBar}
        placeholder="Search experiences..."
        placeholderTextColor="#aaa"
        value={searchText}
        onChangeText={setSearchText}
      />

      {/* Large Toggle */}
      <View style={styles.toggleContainer}>
        <TouchableOpacity
          style={[
            styles.toggleButton,
            { backgroundColor: !isToggled ? "#2196F3" : "#ccc" },
          ]}
          onPress={() => !isToggled && handleToggle()}
        >
          <Text style={styles.toggleText}>Remaining</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.toggleButton,
            { backgroundColor: isToggled ? "#2196F3" : "#ccc" },
          ]}
          onPress={() => isToggled && handleToggle()}
        >
          <Text style={styles.toggleText}>Completed</Text>
        </TouchableOpacity>
      </View>

      {/* Scrollable Cards */}
      <ScrollView contentContainerStyle={styles.cardsContainer}>
        {[...Array(5)].map((_, index) => (
          <ExperienceCard
            key={index}
            name="Solve a Rubik's Cube"
            xp="20"
            photo={require("@/assets/rubiks_cube.jpg")}
            onPress={() => console.log("Go to Rubik's Cube Experience")}
          />
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  blueBackground: {
    height: "25%", // 1/4 of the screen
    backgroundColor: 'rgba(80, 155, 155, 1)', 
    justifyContent: "center",
    alignItems: "center",
  },
  headerText: {
    fontSize: 40,
    color: "#fff",
    fontWeight: "bold",
  },
  searchBar: {
    position: "absolute",
    top: "22%", // Positioned slightly below the center of the blue background
    alignSelf: "center",
    height: 40,
    width: "80%", // Adjust width as needed
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 10,
    backgroundColor: "#fff", // White background for the search bar
    color: "#000",
  },
  toggleContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 20,
    paddingHorizontal: 10,
  },
  toggleButton: {
    flex: 1,
    paddingVertical: 15,
    borderRadius: 25,
    marginHorizontal: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  toggleText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
  },
  cardsContainer: {
    paddingHorizontal: 10,
    paddingBottom: 20,
  },
});


