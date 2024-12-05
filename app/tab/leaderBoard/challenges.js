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
  const [filteredTasks, setFilteredTasks] = useState([]);

  const router = useRouter();

  useEffect(() => {
    // Fetch unlocked and completed tasks from the 'tasks' table
    const fetchTasks = async () => {
      try {
        const { data, error } = await db
          .from("tasks")
          .select("*")
          .eq("locked", false)
          .eq("done", true);

        if (error) {
          console.error("Error fetching tasks:", error.message);
          return;
        }

        setFilteredTasks(data); // Set filtered tasks directly as they are already filtered
        setCompleted(data.map((task) => task.id)); // Track completed task IDs
      } catch (error) {
        console.error("Unexpected error fetching tasks:", error);
      }
    };

    fetchTasks();
  }, []);

  const handleSearch = (text) => {
    setSearchText(text);

    // Update filtered tasks based on search text
    setFilteredTasks((prevTasks) =>
      prevTasks.filter((task) => {
        const name = task.name || "";
        const description = task.description || "";
        return (
          name.toLowerCase().includes(text.toLowerCase()) ||
          description.toLowerCase().includes(text.toLowerCase())
        );
      })
    );
  };

  const handlePress = (id) => {
    console.log("Card pressed!", id);
    setToSend(true); // Show the Send button
    setSelectedCards((prev) => [...prev, id]); // Add the selected card's ID
  };

  const handleSend = async () => {
    console.log("Selected Cards:", selectedCards);
    try {
      const currentDate = new Date().toISOString();

      const { data, error } = await db
        .from("Sent")
        .insert(
          selectedCards.map((card) => ({
            userName: "DummyName",
            cardId: card,
            date: currentDate,
          }))
        );

      if (error) {
        console.error("Error inserting data:", error.message);
      } else {
        console.log("Data inserted successfully:", data);
        setSelectedCards([]); // Clear selected cards
        setToSend(true); // Hide send button
        router.back(); // Navigate back

      }
    } catch (error) {
      console.error("Unexpected error:", error);
    }
  };

  const navigateBack = () => {
    router.back();
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={navigateBack}
        style={{
          position: "absolute",
          top: 50,
          left: 16,
          zIndex: 2,
        }}
      >
        <Icon name="arrow-back" size={24} color="#838383" />
      </TouchableOpacity>
      <View style={styles.blueBackground}>
        <Text style={styles.headerText}>Challenge</Text>
      </View>
      <TextInput
        style={styles.searchBar}
        placeholder="Search experiences..."
        placeholderTextColor="#aaa"
        value={searchText}
        onChangeText={handleSearch}
      />
      <ScrollView contentContainerStyle={styles.cardsContainer}>
        {filteredTasks.map((task) => (
          <TouchableOpacity
            key={task.id}
            style={styles.cardWrapper}
            onPress={() => handlePress(task.id)}
          >
            <ExperienceCard
              id={task.id}
              name={task.name || "No Name"}
              description={task.description || "No Description"}
              navigate="experience"
              bool={completed.includes(task.id)}
            />
          </TouchableOpacity>
        ))}
      </ScrollView>
      
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
            <Text style={styles.buttonText}>Send Experiences?</Text>
          </TouchableOpacity>
        </View>
      
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
    paddingBottom: 80,
  },
  cardWrapper: {
    marginBottom: 15,
  },
  buttonContainer: {
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    bottom: 5,
    width: "100%",
  },
  sendButton: {
    width: "60%",
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