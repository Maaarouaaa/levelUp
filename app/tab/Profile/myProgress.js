import React, { useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

export default function MyProgress() {
  const [selectedFilters, setSelectedFilters] = useState([]);

  // Toggle filter selection
  const toggleFilter = (filter) => {
    setSelectedFilters((prev) =>
      prev.includes(filter)
        ? prev.filter((item) => item !== filter)
        : [...prev, filter]
    );
  };

  return (
    <View style={styles.container}>
      {/* Header Background */}
      <View style={styles.headerBackground}></View>

      {/* Back Arrow */}
      <Icon name="arrow-back" size={24} style={styles.backArrow} color="#838383" />

      {/* Header Title */}
      <Text style={styles.headerTitle}>My Progress</Text>

      {/* Filter Section */}
      <Text style={styles.filterText}>Filter by</Text>
      <View style={styles.filterContainer}>
        <View style={styles.row}>
          <TouchableOpacity
            style={[
              styles.filterButton,
              selectedFilters.includes("Problem Solving") && styles.selectedFilterButton,
            ]}
            onPress={() => toggleFilter("Problem Solving")}
          >
            <Text
              style={[
                styles.filterTextLabel,
                { color: "#FF8460" }, // Orange color for Problem Solving
                selectedFilters.includes("Problem Solving") && styles.selectedFilterText,
              ]}
            >
              Problem Solving
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.filterButton,
              selectedFilters.includes("Communication") && styles.selectedFilterButton,
            ]}
            onPress={() => toggleFilter("Communication")}
          >
            <Text
              style={[
                styles.filterTextLabel,
                { color: "#4CA8FF" }, // Blue color for Communication
                selectedFilters.includes("Communication") && styles.selectedFilterText,
              ]}
            >
              Communication
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.row}>
          <TouchableOpacity
            style={[
              styles.filterButton,
              selectedFilters.includes("Adaptability") && styles.selectedFilterButton,
            ]}
            onPress={() => toggleFilter("Adaptability")}
          >
            <Text
              style={[
                styles.filterTextLabel,
                { color: "#FFAB45" }, // Yellow-Orange color for Adaptability
                selectedFilters.includes("Adaptability") && styles.selectedFilterText,
              ]}
            >
              Adaptability
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.filterButton,
              selectedFilters.includes("Leadership") && styles.selectedFilterButton,
            ]}
            onPress={() => toggleFilter("Leadership")}
          >
            <Text
              style={[
                styles.filterTextLabel,
                { color: "#6CE7C9" }, // Green color for Leadership
                selectedFilters.includes("Leadership") && styles.selectedFilterText,
              ]}
            >
              Leadership
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <Text style={styles.graphTitle}>Skill Progress</Text>

      {/* Graph Background */}
      <View style={styles.graphContainer}>
        <Image
          source={require("@/assets/graph.png")} // Adjust path if necessary
          style={styles.graphImage}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    position: "relative",
  },
  headerBackground: {
    position: "absolute",
    width: "100%",
    height: "24.5%", // Matches the height of the header background
    backgroundColor: "rgba(80, 155, 155, 0.27)",
  },
  backArrow: {
    position: "absolute",
    top: 40,
    left: 16,
  },
  headerTitle: {
    position: "absolute",
    top: 30,
    left: "28%", // Center the header title
    fontFamily: "Poppins",
    fontWeight: "700",
    fontSize: 30,
    color: "#509B9B",
  },
  filterText: {
    marginTop: "22%",
    marginBottom: 0,
    marginLeft: 45,
    fontFamily: "Poppins",
    fontWeight: "300",
    fontSize: 13,
    color: "#000000",
  },
  filterContainer: {
    marginTop: 0,
    alignItems: "center",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "80%",
    marginBottom: 4,
  },
  filterButton: {
    alignItems: "center",
    justifyContent: "center",
    width: "45%", // Each button takes 40% of the row width
    height: 23, // Adjust button height
    borderRadius: 15, // Rounded corners
    borderWidth: 2, // Outline border
    borderColor: "#E0E0E0", // Default border color
    backgroundColor: "#FFFFFF",
  },
  selectedFilterButton: {
    borderColor: "#509B9B", // Highlighted border when selected
  },
  filterTextLabel: {
    fontFamily: "Poppins",
    fontWeight: "600",
    fontSize: 12,
    textAlign: "center",
  },
  selectedFilterText: {
    fontWeight: "800", // Bolder text when selected
  },
  graphContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  graphImage: {
    width: "180%", // Adjust width as necessary
    height: "90%", // Adjust height as necessary
    resizeMode: "contain",
  },
  graphTitle: {
    fontSize: 14,
    fontWeight: "500",
    textAlign: "center",
    color: "black",
    marginTop: 10, // Adjust this value to move the title down
    marginBottom: -20, // Keep this to control spacing between the title and the graph
    fontFamily: "Poppins",
  }
});
