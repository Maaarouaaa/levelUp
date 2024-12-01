import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import ExperienceCard from "@/components/ExperienceCard";
import db from "@/database/db";

export default function Three() {
  const [searchText, setSearchText] = useState("");
  const [isToggled, setIsToggled] = useState(false);
  const [allTasks, setAllTasks] = useState([]); 
  const [filteredTasks, setFilteredTasks] = useState([]); 
  const [loading, setLoading] = useState(true);

  const handleToggle = () => {
    setIsToggled((prev) => !prev);
  };

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        setLoading(true);
        const { data, error } = await db
          .from("tasks")
          .select("id, name, description, locked, done");

        if (error) {
          console.error("Error fetching tasks:", error.message);
        } else if (data) {
          setAllTasks(data);
          setFilteredTasks(data.filter((task) => !task.locked)); 
        }
      } catch (err) {
        console.error("Error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  // Apply search logic
  useEffect(() => {
    if (searchText === "") {
      // Show filtered tasks based on toggle state
      setFilteredTasks(
        allTasks.filter(
          (task) => !task.locked && (isToggled ? task.done : !task.done)
        )
      );
    } else {
      // Search by name and description in unlocked tasks
      const filtered = allTasks.filter((task) => {
        const name = task.name || ""; // Fallback to empty string
        const description = task.description || ""; // Fallback to empty string
        return (
          !task.locked &&
          (name.toLowerCase().includes(searchText.toLowerCase()) ||
            description.toLowerCase().includes(searchText.toLowerCase())) &&
          (isToggled ? task.done : !task.done) // Respect toggle state
        );
      });
      setFilteredTasks(filtered);
    }
  }, [searchText, isToggled, allTasks]);

  if (loading) {
    return (
      <View style={[styles.container, styles.loadingContainer]}>
        <ActivityIndicator size="large" color="#509B9B" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Blue Background */}
      <View style={styles.blueBackground}>
        <Text style={styles.headerText}>My Experiences</Text>
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
        {filteredTasks.map((task) => (
          <View key={task.id} style={styles.cardWrapper}>
            <ExperienceCard
              id={task.id}
              name={task.name || "No Name"}
              description={task.description || "No Description"}
              navigate="experience"
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
    backgroundColor: "#fff",
    borderRadius: 20,
    width: 200,
    height: 40,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 8,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  toggleIndicator: {
    position: "absolute",
    width: 100,
    height: 32,
    backgroundColor: "#509B9B",
    borderRadius: 16,
    elevation: 2,
  },
  toggleLeft: {
    left: 4,
  },
  toggleRight: {
    right: 4,
  },
  toggleText: {
    fontSize: 16,
    color: "#509B9B",
    zIndex: 1,
    paddingHorizontal: 5,
  },
  activeText: {
    color: "#fff",
    fontWeight: "bold",
  },
  cardWrapper: {
    marginBottom: 15,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
