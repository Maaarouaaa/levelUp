import React, { useState, useEffect, useCallback } from "react";
import { StyleSheet, Text, View, TextInput, ScrollView, TouchableWithoutFeedback, Keyboard, TouchableOpacity } from "react-native";
import ExperienceCard from "@/components/ExperienceCard";
import { useRouter } from "expo-router";
import Icon from "react-native-vector-icons/Ionicons";
import db from "@/database/db";
import { useFocusEffect } from "@react-navigation/native";

export default function Three() {
  const [searchText, setSearchText] = useState("");
  const [allTasks, setAllTasks] = useState([]); // All tasks including locked ones
  const [filteredTasks, setFilteredTasks] = useState([]); // Tasks to display (filtered)
  const [refresh, setRefresh] = useState(false); // Tracks manual refresh trigger

  const router = useRouter();

  const fetchTasks = async () => {
    try {
      const { data, error } = await db
        .from("tasks")
        .select("id, name, description, done, locked")
        .gte("id", 1)
        .lte("id", 10)
        .order("id", { ascending: true }); // Fetch all tasks, both locked and unlocked

      if (error) {
        console.error("Error fetching tasks:", error.message);
      } else {
        console.log("Fetched tasks:", data); // Debug log
        setAllTasks(data); // Store all tasks
        setFilteredTasks(data); // Initially display all tasks
      }
    } catch (err) {
      console.error("Error:", err);
    }
  };

  // Refetch tasks when the component mounts or when refresh is toggled
  useEffect(() => {
    fetchTasks();
  }, [refresh]);

  // Refetch tasks when the screen gains focus
  useFocusEffect(
    useCallback(() => {
      fetchTasks();
    }, [])
  );

  useEffect(() => {
    if (searchText === "") {
      setFilteredTasks(allTasks); // Reset to show all tasks when search is cleared
    } else {
      const filtered = allTasks.filter((task) => {
        const name = task.name || ""; // Fallback to empty string
        const description = task.description || ""; // Fallback to empty string
        // Only search through unlocked tasks
        if (!task.locked) {
          return (
            name.toLowerCase().includes(searchText.toLowerCase()) ||
            description.toLowerCase().includes(searchText.toLowerCase())
          );
        }
        return false; // Exclude locked tasks from the filtered results
      });
      setFilteredTasks(filtered);
    }
  }, [searchText, allTasks]);

  const handleBack = () => {
    setRefresh((prev) => !prev); // Toggle refresh to trigger refetch
    router.back();
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        {/* Blue Background */}
        <TouchableOpacity
          onPress={handleBack}
          style={{
            position: "absolute",
            top: 50, // Adjust the vertical position to sit right above the header
            left: 16,
            zIndex: 2, // Ensure it appears above other elements
          }}
        >
          <Icon name="arrow-back" size={24} color="#838383" />
        </TouchableOpacity>

        <View style={styles.blueBackground}>
          <Text style={styles.headerText}>Problem Solving</Text>
        </View>

        {/* Search Bar */}
        <View style={styles.searchBarWrapper}>
          <TextInput
            style={styles.searchBar}
            placeholder="Search experiences..."
            placeholderTextColor="#aaa"
            value={searchText}
            onChangeText={setSearchText}
          />
        </View>

        {/* Scrollable Cards */}
        <ScrollView
          contentContainerStyle={[styles.cardsContainer, { paddingTop: 10 }]} // Ensure proper spacing
          style={{ marginTop: 40 }} // Add margin to avoid overlap with sticky search bar
        >
          {filteredTasks.map((task) => (
            <View key={task.id} style={styles.cardWrapper}>
              <ExperienceCard
                id={task.id}
                name={task.name || "No Name"}
                description={task.description || "No Description"}
                navigate="home" // Explicitly pass navigate
              />
            </View>
          ))}
        </ScrollView>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  blueBackground: {
    height: "22%",
    backgroundColor: "#FFD4C7",
    alignItems: "center",
  },
  headerText: {
    paddingVertical: 80,
    fontSize: 36,
    color: "#FF8460",
    fontWeight: "bold",
    fontFamily: "Poppins-Bold",
  },
  searchBarWrapper: {
    position: "absolute",
    top: "19%",
    alignSelf: "center",
    width: "80%",
    backgroundColor: "#fff",
    borderRadius: 8,
    elevation: 3,
    zIndex: 1, // Ensure it stays above the cards
  },
  searchBar: {
    height: 40,
    width: "100%",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 10,
    backgroundColor: "#fff",
    color: "#000",
    fontFamily: "Poppins-Regular",
  },
  cardWrapper: {
    marginBottom: 15,
  },
  cardsContainer: {
    paddingTop: 10, // Add padding to prevent overlap with the search bar
    alignItems: "center",
  },
});

