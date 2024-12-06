import React, { useEffect, useState, useCallback } from "react";
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
import { useFocusEffect } from "@react-navigation/native";

const categories = ["All", "problem solving", "adaptability", "leadership", "communication"];

export default function Three() {
  const [searchText, setSearchText] = useState("");
  const [isToggled, setIsToggled] = useState(false);
  const [allTasks, setAllTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [showDropdown, setShowDropdown] = useState(false);

  const handleToggle = () => {
    setIsToggled((prev) => !prev);
  };

  // Fetch tasks
  const fetchTasks = async () => {
    try {
      setLoading(true);
      const { data, error } = await db
        .from("tasks")
        .select("id, name, description, skill, locked, done");

      if (error) {
        console.error("Error fetching tasks:", error.message);
      } else if (data) {
        const unlockedTasks = data.filter((task) => !task.locked);
        setAllTasks(unlockedTasks);
        setFilteredTasks(unlockedTasks);
      }
    } catch (err) {
      console.error("Error:", err);
    } finally {
      setLoading(false);
    }
  };

  // Refetch data when the screen is focused
  useFocusEffect(
    useCallback(() => {
      fetchTasks();
    }, [])
  );

  // Apply filtering logic
  useEffect(() => {
    const filterTasks = () => {
      let tasks = allTasks;

      if (selectedCategory !== "All") {
        tasks = tasks.filter((task) => task.skill === selectedCategory);
      }

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

      tasks = tasks.filter((task) => (isToggled ? task.done : !task.done));

      tasks = tasks.sort((a, b) => (a.locked ? 1 : -1));

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
      <View style={styles.blueBackground}>
        <Text style={styles.headerText}>My Experiences</Text>
      </View>

      <View style={styles.searchFilterContainer}>
        <View style={styles.searchBarContainer}>
          {/* Dropdown Button */}
          <TouchableOpacity
            style={styles.dropdownInsideSearchBar}
            onPress={() => setShowDropdown(!showDropdown)}
          >
            <Text style={styles.dropdownText}>{selectedCategory}</Text>
            <Icon name="chevron-down" size={16} color="#fff" />
          </TouchableOpacity>

          <TextInput
            style={styles.searchBar}
            placeholder="Search experiences..."
            placeholderTextColor="#aaa"
            value={searchText}
            onChangeText={setSearchText}
          />
        </View>

        {/* Dropdown List */}
        {showDropdown && (
          <View style={styles.dropdownList}>
            {categories.map((category) => (
              <TouchableOpacity
                key={category}
                style={styles.dropdownItem}
                onPress={() => {
                  setSelectedCategory(category);
                  setShowDropdown(false);
                }}
              >
                <Text style={styles.dropdownItemText}>{category}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </View>

      {/* Toggle Button */}
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

      <ScrollView
        contentContainerStyle={styles.cardsContainer}
        keyboardShouldPersistTaps="handled" // Ensures dropdown remains tappable
      >
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
    height: "22%",
    backgroundColor: "rgba(80, 155, 155, .27)",
    justifyContent: "center",
    alignItems: "center",
  },
  headerText: {
    fontSize: 40,
    color: "#509B9B",
    fontWeight: "bold",
    fontFamily: "Poppins-Bold",
    marginTop: 40,
  },
  searchFilterContainer: {
    zIndex: 10, // Ensure dropdown stays above other components
    position: "relative",
  },
  searchBarContainer: {
    marginTop: -20,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    backgroundColor: "#fff",
    width: "80%",
    position: "relative",
    overflow: "hidden",
    alignSelf: "center",
  },
  dropdownInsideSearchBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#509B9B",
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    height: "100%",
    paddingHorizontal: 10,
  },
  dropdownText: {
    fontSize: 14,
    color: "#fff",
    fontFamily: "Poppins-Regular",
    marginRight: 4,
  },
  dropdownList: {
    position: "absolute",
    top: 50,
    left: 0,
    backgroundColor: "#fff",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    width: "50%",
    zIndex: 100, // Ensure dropdown list appears on top
    elevation: 5,
  },
  dropdownItem: {
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  dropdownItemText: {
    fontSize: 14,
    color: "#000",
    fontFamily: "Poppins-Regular",
  },
  searchBar: {
    flex: 1,
    height: 40,
    backgroundColor: "#fff",
    color: "#000",
    fontFamily: "Poppins-Regular",
    paddingHorizontal: 10,
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
  },
  toggleWrapper: {
    alignItems: "center",
    marginVertical: 10,
    zIndex: 5, // Stays above task cards but below dropdown
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
    fontSize: 14,
    color: "#509B9B",
    zIndex: 1,
    paddingHorizontal: 5,
    fontFamily: "Poppins-SemiBold",
  },
  activeText: {
    color: "#fff",
    fontWeight: "bold",
    fontFamily: "Poppins-SemiBold",
  },
  cardsContainer: {
    paddingTop: 10,
    paddingHorizontal: 16,
    alignItems: "center",
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



