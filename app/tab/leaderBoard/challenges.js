import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { useRouter } from "expo-router";
import Icon from "react-native-vector-icons/Ionicons";
import ExperienceCard from "@/components/ExperienceCard";
import db from "@/database/db"; // Ensure this points to your database setup

export default function Three({ navigation }) {
  const [searchText, setSearchText] = useState("");
  const [isToggled, setIsToggled] = useState(false);
  const [toSend, setToSend] = useState(false);
  const [selectedCards, setSelectedCards] = useState([]);
  const [completed, setCompleted] = useState([]);
  const [allTasks, setAllTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);

  useEffect(() => {
    // Fetch all tasks and completed tasks from the 'tasks' table
    const fetchTasks = async () => {
      try {
        const { data, error } = await db.from("tasks").select("*");
        if (error) {
          console.error("Error fetching tasks:", error.message);
          return;
        }
        setAllTasks(data);

        // Filter completed tasks based on 'done' column
        const completedIds = data.filter((task) => task.done).map((task) => task.id);
        setCompleted(completedIds);
      } catch (error) {
        console.error("Unexpected error fetching tasks:", error);
      }
    };

    fetchTasks();
  }, []);

  useEffect(() => {
    // Apply search filter
    const filterTasks = () => {
      const filtered = allTasks.filter((task) => {
        const name = task.name || "";
        const description = task.description || "";
        return (
          name.toLowerCase().includes(searchText.toLowerCase()) ||
          description.toLowerCase().includes(searchText.toLowerCase())
        );
      });

      setFilteredTasks(filtered);
    };

    filterTasks();
  }, [searchText, allTasks]);

  const router = useRouter();

  const navigateBack = () => {
    router.push("/tab/leaderB");
  };

  const handlePress = (id) => {
    console.log("Card pressed!", id);
    setToSend(true); // Set to true to show the Send button
    setSelectedCards((prev) => [...prev, id]); // Add the selected card's ID
  };

  const handleSend = async () => {
    console.log("one", selectedCards);
    try {
      const currentDate = new Date().toISOString(); // Get the current date in ISO format

      const { data, error } = await db
        .from("Sent") // The table name in Supabase
        .insert(
          selectedCards.map((card) => ({
            userName: "DummyName", // User's name
            cardId: card, // Card ID
            date: currentDate, // Current date
          }))
        );

      if (error) {
        console.error("Error inserting data:", error.message);
      } else {
        console.log("Data inserted successfully:", data);
        setSelectedCards([]); // Clear selected cards after successful submission
        setToSend(false); // Hide send button
        router.back(); // Navigate to challenges screen
      }
    } catch (error) {
      console.error("Unexpected error:", error);
    }
    console.log("two", selectedCards);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => navigateBack()}
        style={{
          position: "absolute",
          top: 50, // Adjust the vertical position to sit right above the header
          left: 16,
          zIndex: 2, // Ensure it appears above other elements
        }}
      >
        <Icon name="arrow-back" size={24} color="#838383" />
      </TouchableOpacity>
      {/* Blue Background */}
      <View style={styles.blueBackground}>
        <Text style={styles.headerText}>Challenge</Text>
      </View>
      {/* Search Bar */}
      <TextInput
        style={styles.searchBar}
        placeholder="Search experiences..."
        placeholderTextColor="#aaa"
        value={searchText}
        onChangeText={setSearchText}
      />
      {/* Scrollable Cards */}
      <ScrollView contentContainerStyle={styles.cardsContainer}>
        {filteredTasks.map((task) => (
          <TouchableOpacity
            key={task.id}
            style={styles.cardWrapper}
            onPress={() => handlePress(task.id)}
          >
            <ExperienceCard
              id={task.id} // Set the ID for the experience
              name={task.name || "No Name"} // Display name
              description={task.description || "No Description"} // Display description
              navigate="experience" // Navigate to experience screen
              bool={completed.includes(task.id)} // Mark if completed
            />
          </TouchableOpacity>
        ))}
      </ScrollView>
      {/* Send button */}
      {toSend && (
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
            <Text style={styles.buttonText}>Send Experiences?</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    pointerEvents: "box-none",
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
    fontFamily: "Poppins-Bold",
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
  cardsContainer: {
    marginTop: 41,
    paddingBottom: 80, // Add padding to create space at the bottom
  },
  cardWrapper: {
    marginBottom: 15, // Adds padding between cards
  },
  buttonContainer: {
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    bottom: 5, // Distance from the bottom edge of the screen
    width: "100%",
  },
  sendButton: {
    width: "60%", // Adjust the button width as necessary
    padding: 15,
    borderRadius: 25,
    backgroundColor: "#509B9B",
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontFamily: "Poppins-Regular",
    fontWeight: "bold",
    fontSize: 16,
  },
});
