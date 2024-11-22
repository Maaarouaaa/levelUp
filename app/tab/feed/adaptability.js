import React, { useState } from "react";
import { StyleSheet, Text, View, TextInput, ScrollView, TouchableOpacity } from "react-native";
import ExperienceCard from "@/components/ExperienceCard";
import { useRouter } from "expo-router";


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

      {/* Oval Toggle */}
      <View style={styles.toggleWrapper}>
        <TouchableOpacity style={styles.toggleContainer} onPress={handleToggle}>
          <View
            style={[
              styles.toggleIndicator,
              isToggled ? styles.toggleRight : styles.toggleLeft,
            ]}
          />
          <Text style={[styles.toggleText, !isToggled && styles.activeText]}>
            Remaining
          </Text>
          <Text style={[styles.toggleText, isToggled && styles.activeText]}>
            Completed
          </Text>
        </TouchableOpacity>
      </View>

      {/* Scrollable Cards */}
      <ScrollView contentContainerStyle={styles.cardsContainer}>
        {[1, 2, 3, 4, 5].map((id) => (
          <View key={id} style={styles.cardWrapper}>
            <ExperienceCard
              id={id} // Set the ID for the experience
              navigate="home" // Set the ID for the experience
              photo={require("@/assets/rubiks_cube.jpg")} // Example placeholder image
            />
          </View>
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
    height: "18%",
    backgroundColor: "rgba(80, 155, 155, .27)",
    justifyContent: "center",
    alignItems: "center",
  },
  headerText: {
    fontSize: 40,
    color: "#509B9B",
    fontWeight: "bold",
  },
  searchBar: {
    position: "absolute",
    top: "15%",
    alignSelf: "center",
    height: 40,
    width: "80%",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 10,
    backgroundColor: "#fff",
    color: "#000",
  },
  toggleWrapper: {
    alignItems: "center",
    marginVertical: 30,
  },
  toggleContainer: {
    position: "relative",
    backgroundColor: "#fff", // White background
    borderRadius: 20,
    width: 200,
    height: 40,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 8,
    elevation: 3, // Drop shadow on Android
    shadowColor: "#000", // Drop shadow on iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  toggleIndicator: {
    position: "absolute",
    width: 100,
    height: 32,
    backgroundColor: "rgba(80, 155, 155, 0.27)", // Light blue toggle
    borderRadius: 16,
    elevation: 2, // Slight elevation for toggle
  },
  toggleLeft: {
    left: 4,
  },
  toggleRight: {
    right: 4,
  },
  toggleText: {
    fontSize: 16,
    color: "#509B9B", // Light blue text color when against white
    zIndex: 1,
  },
  activeText: {
    color: "#fff", // Blue text when against the light blue toggle
    fontWeight: "bold",
  },
  cardWrapper: {
    marginBottom: 15, // Adds padding between cards
  },
});
