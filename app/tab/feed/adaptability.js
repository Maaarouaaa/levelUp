import React, { useState, useEffect, useCallback } from "react";
import { StyleSheet, Text, View, TextInput, ScrollView, TouchableWithoutFeedback, Keyboard } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import ExperienceCard from "@/components/ExperienceCard";
import db from "@/database/db";

export default function Three() {
  const [searchText, setSearchText] = useState("");
  const [allTasks, setAllTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);

  const fetchTasks = async () => {
    try {
      const { data, error } = await db
        .from("tasks")
        .select("id, name, description, done, locked")
        .gte("id", 31)
        .lte("id", 40)
        .order("id", { ascending: true });

      if (error) {
        console.error("Error fetching tasks:", error.message);
      } else {
        console.log("Fetched tasks:", data);
        setAllTasks(data);
        setFilteredTasks(data);
      }
    } catch (err) {
      console.error("Error:", err);
    }
  };

  // Refetch tasks when the screen is focused
  useFocusEffect(
    useCallback(() => {
      fetchTasks();
    }, [])
  );

  useEffect(() => {
    if (searchText === "") {
      setFilteredTasks(allTasks);
    } else {
      const filtered = allTasks.filter((task) => {
        const name = task.name || "";
        const description = task.description || "";

        if (!task.locked) {
          return (
            name.toLowerCase().includes(searchText.toLowerCase()) ||
            description.toLowerCase().includes(searchText.toLowerCase())
          );
        }
        return false;
      });
      setFilteredTasks(filtered);
    }
  }, [searchText, allTasks]);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        {/* Blue Background */}
        <View style={styles.blueBackground}>
          <Text style={styles.headerText}>Adaptability</Text>
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
          contentContainerStyle={[styles.cardsContainer, { paddingTop: 10 }]}
          style={{ marginTop: 40 }}
        >
          {filteredTasks.map((task) => (
            <View key={task.id} style={styles.cardWrapper}>
              <ExperienceCard
                id={task.id}
                name={task.name || "No Name"}
                description={task.description || "No Description"}
                navigate="home"
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
    backgroundColor: "#FFE8CD",
    justifyContent: "center",
    alignItems: "center",
  },
  headerText: {
    fontSize: 38,
    color: "#FFAB45",
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
    zIndex: 1, 
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
    paddingTop: 10, 
  },
});
