import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, TextInput, ScrollView, TouchableWithoutFeedback, Keyboard } from "react-native";
import ExperienceCard from "@/components/ExperienceCard";
import db from "@/database/db";

export default function Three() {
  const [searchText, setSearchText] = useState("");
  const [allTasks, setAllTasks] = useState([]); // All tasks including locked ones
  const [filteredTasks, setFilteredTasks] = useState([]); // Tasks to display (filtered)

  useEffect(() => {
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

    fetchTasks();
  }, []);

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

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        {/* Blue Background */}
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
    height: "18%",
    backgroundColor: "#FFD4C7",
    justifyContent: "center",
    alignItems: "center",
  },
  headerText: {
    fontSize: 38,
    color: "#FF8460",
    fontWeight: "bold",
    fontFamily: 'Poppins-Bold',
  },
  searchBarWrapper: {
    position: "absolute",
    top: "15%",
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
    fontFamily: 'Poppins-Regular',
  },
  cardWrapper: {
    marginBottom: 15,
  },
  cardsContainer: {
    paddingTop: 10, // Add padding to prevent overlap with the search bar
  },
});
