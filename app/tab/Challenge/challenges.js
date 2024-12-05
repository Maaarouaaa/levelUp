import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import ExperienceCard from "@/components/ExperienceCard";
import db from "@/database/db";

export default function Three({ navigation }) {
  const [searchText, setSearchText] = useState("");
  const [isToggled, setIsToggled] = useState(false);
  const [toSend, setToSend] = useState(false);
  const [selectedCards, setSelectedCards] = useState([]);
  userName = "DummyName";
  const handlePress = () => {
    console.log("Card pressed!");
    setToSend(true); // Set to true to show the Send button
  };

  const handleToggle = () => {
    setToSend(false); // Hide the Send button after action
  };

  // Filtered IDs for Remaining state
  const remainingIds = [1, 5, 4, 12, 13, 2, 3, 11];

  const handleSend = async () => {
    console.log("one", selectedCards);
    try {
      const currentDate = new Date().toISOString(); // Get the current date in ISO format

      const { data, error } = await db
        .from("Sent") // The table name in Supabase
        .insert(
          selectedCards.map((card) => ({
            userName: "DummyName", // User's name
            //cardId: 3, // Card ID
            //date: currentDate, // Current date
          }))
        );

      if (error) {
        console.error("Error inserting data:", error.message);
      } else {
        console.log("Data inserted successfully:", data);
        setSelectedCards([]); // Clear selected cards after successful submission
        setToSend(false); // Hide send button
      }
    } catch (error) {
      console.error("Unexpected error:", error);
    }
    console.log("two", selectedCards);
  };

  return (
    <View style={styles.container}>
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
        {!isToggled &&
          remainingIds.map((id) => (
            <TouchableOpacity
              key={id}
              style={styles.cardWrapper}
              onPress={handlePress}
            >
              <ExperienceCard
                id={id} // Set the ID for the experience
                navigate="experience" // Navigate to experience screen
                bool={true} // Example prop
              />
            </TouchableOpacity>
          ))}
      </ScrollView>
      {/* Send button */}

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
          <Text style={styles.buttonText}>Send experiences?</Text>
        </TouchableOpacity>
      </View>
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
    //backgroundColor: "red",
  },
  cardWrapper: {
    marginBottom: 15, // Adds padding between cards
    pointerEvents: "box-none",
  },
  buttonContainer: {
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    bottom: 20, // Distance from the bottom edge of the screen
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
    fontWeight: "bold",
    fontSize: 16,
  },
});

/*
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import ExperienceCard from "@/components/ExperienceCard";
import { useRouter } from "expo-router";

export default function Three({ navigation }) {
  const [searchText, setSearchText] = useState("");
  const [isToggled, setIsToggled] = useState(false);
  const [toSend, setToSend] = useState(false);
  const handlePress = () => {
    setToSend((prevState) => !prevState); // Toggles between true and false
  };

  const handleToggle = () => {
    setIsToggled((prev) => !prev);
  };

  // Filtered IDs for Remaining state
  const remainingIds = [1, 5, 4, 12, 13, 2, 3, 11];

  return (
    <View style={styles.container}>
      {/* Blue Background 
      <View style={styles.blueBackground}>
        <Text style={styles.headerText}>Challenge</Text>
      </View>
      {/* Search Bar 
      <TextInput
        style={styles.searchBar}
        placeholder="Search experiences..."
        placeholderTextColor="#aaa"
        value={searchText}
        onChangeText={setSearchText}
      />
      {/* Scrollable Cards 
      <ScrollView contentContainerStyle={styles.cardsContainer}>
        {!isToggled &&
          remainingIds.map((id) => (
            <View key={id} style={styles.cardWrapper} onPress={handlePress}>
              <ExperienceCard
                id={id} // Set the ID for the experience
                navigate="experience" // Set the ID for the experience
                //photo={require("@/assets/rubiks_cube.jpg")} // Example placeholder image
                bool={true}
              />
            </View>
          ))}
      </ScrollView>
      {/* Send button 
      {toSend && (
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.sendButton} onPress={handleToggle}>
            <Text style={styles.buttonText}>Send experiences?</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  // Style definitions remain the same as your original code
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
    justifyContent: "space-around",
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
    backgroundColor: "#509B9B", // Light blue toggle
    borderRadius: 16,
    elevation: 2, // Slight elevation for toggle
  },
  cardsContainer: {
    marginTop: 41,
  },
  activeText: {
    color: "#fff", // Blue text when against the light blue toggle
    fontWeight: "bold",
  },
  cardWrapper: {
    marginBottom: 15, // Adds padding between cards
  },
  buttonContainer: {
    backgroundColor: "red",
  },
  sendButton: {
    position: "absolute",
    bottom: 15, // Distance from the bottom edge of the screen
    left: "35%", // Position the button horizontally at the center
    //right: "50%",
    //transform: [translateX: -50% ], // Offsetting by 50% of the button's width to truly center it
    padding: 15,
    borderRadius: 50,
    backgroundColor: "#509B9B",
  },
  buttonText: {
    color: "#fff", // Blue text when against the light blue toggle
    fontWeight: "bold",
    size: 31,
  },
});
*/
