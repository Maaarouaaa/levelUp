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
import Icon from "react-native-vector-icons/Ionicons";
import ExperienceCard from "@/components/ExperienceCard";
import db from "@/database/db";

const categories = ["All", "problem solving", "adaptability", "leadership", "communication"];

export default function Three() {
  const [searchText, setSearchText] = useState("");
  const [isToggled, setIsToggled] = useState(false);
  const [allTasks, setAllTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("All"); // Default category
  const [showDropdown, setShowDropdown] = useState(false); // Dropdown visibility state

  const handleToggle = () => {
    setIsToggled((prev) => !prev);
  };

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        setLoading(true);
        const { data, error } = await db
          .from("tasks")
          .select("id, name, description, skill, locked, done");

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

  // Apply filtering logic
  useEffect(() => {
    const filterTasks = () => {
      let tasks = allTasks;

      // Step 1: Apply category filter
      if (selectedCategory !== "All") {
        tasks = tasks.filter((task) => task.skill === selectedCategory);
      }

      // Step 2: Apply search filter
      if (searchText) {
        tasks = tasks.filter((task) => {
          const name = task.name || "";
          const description = task.description || "";
          return (
            name.toLowerCase().includes(searchText.toLowerCase()) ||
            description.toLowerCase().includes(searchText.toLowerCase())
          );
        });
      }

      // Step 3: Apply toggle filter for Remaining/Completed
      tasks = tasks.filter((task) => (isToggled ? task.done : !task.done));

      // Step 4: Sort tasks (unlocked first, then locked)
      tasks = tasks.sort((a, b) => {
        if (a.locked === b.locked) return 0; // No change if both are the same
        return a.locked ? 1 : -1; // Unlocked (false) tasks come first
      });

      setFilteredTasks(tasks);
    };

    filterTasks();
  }, [searchText, selectedCategory, isToggled, allTasks]);

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

      {/* Search Bar and Dropdown */}
      <View style={styles.searchFilterContainer}>
        {/* Dropdown */}
        <TouchableOpacity
          style={styles.dropdown}
          onPress={() => setShowDropdown(!showDropdown)}
        >
          <Text style={styles.dropdownText}>{selectedCategory}</Text>
          <Icon name="chevron-down" size={20} color="#000" />
        </TouchableOpacity>

        {showDropdown && (
          <View style={styles.dropdownList}>
            {categories.map((category) => (
              <TouchableOpacity
                key={category}
                style={styles.dropdownItem}
                onPress={() => {
                  setSelectedCategory(category); // Update selected category
                  setShowDropdown(false); // Close dropdown
                }}
              >
                <Text style={styles.dropdownItemText}>{category}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}

        {/* Search Bar */}
        <TextInput
          style={styles.searchBar}
          placeholder="Search experiences..."
          placeholderTextColor="#aaa"
          value={searchText}
          onChangeText={setSearchText}
        />
      </View>

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
  searchFilterContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    paddingHorizontal: 20,
    position: "relative", // Ensures the dropdown list aligns correctly
  },

  dropdown: {
    position: "Absolute",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    backgroundColor: "#fff",
    width: "20%",
    height: 40,
    marginRight: 10,
  },
  dropdownText: {
    fontSize: 16,
    color: "#000",
  },
  dropdownList: {
    position: "absolute", // Makes it float above other content
    top: 50, // Adjust this value to position below the dropdown button
    left: 20, // Align it properly based on your layout
    width: "40%", // Keep the same width as the dropdown
    backgroundColor: "#fff",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    zIndex: 100, // Ensure it appears above other components
    elevation: 5, // For shadow on Android  
  },

  dropdownItem: {
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  dropdownItemText: {
    fontSize: 16,
    color: "#000",
  },
  searchBar: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
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
    fontSize: 15,
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
  cardsContainer: {
    paddingTop: 10,
    paddingHorizontal: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
