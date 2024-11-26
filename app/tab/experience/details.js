import React, { useEffect, useState } from "react";
import { useLocalSearchParams } from "expo-router";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  Modal,
  Dimensions,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import db from "@/database/db";

export default function Details() {
  const param = useLocalSearchParams();
  const id = param.id;

  const [name, setName] = useState(null);
  const [xp, setXp] = useState(null);
  const [skill, setSkill] = useState(null);
  const [photo, setPhoto] = useState(null);
  const [description, setDescription] = useState(null);
  const [loading, setLoading] = useState(true);

  const skillColors = {
    "problem solving": "#FF6030",
    leadership: "#37C9A5",
    communication: "#4CA8FF",
    adaptability: "#FFAB45",
  };

  const getSkillColor = (skillName) => {
    return skillColors[skillName] || "#000000";
  };

  const [isDone, setIsDone] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  const handleMarkAsDone = () => {
    setIsDone(true);
    setShowPopup(true); // Show the popup
    console.log("Task marked as done.");
  };

  const handleMarkAsNotDone = () => {
    setIsDone(false);
    console.log("Task marked as not done.");
  };

  const closePopup = () => {
    setShowPopup(false); // Close the popup
  };

  useEffect(() => {
    const fetchExperienceData = async () => {
      try {
        setLoading(true);
        const { data, error } = await db
          .from("tasks")
          .select("name, xp, skill, photo, description")
          .eq("id", id)
          .single();

        if (error) {
          console.error("Error fetching experience data:", error.message);
        } else if (data) {
          setName(data.name);
          setXp(data.xp);
          setSkill(data.skill);
          setPhoto(data.photo);
          setDescription(data.description);
        }
      } catch (err) {
        console.error("Error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchExperienceData();
  }, [id]);

  if (loading) {
    return (
      <View style={[styles.container, styles.loadingContainer]}>
        <ActivityIndicator size="large" color="#509B9B" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={{ uri: photo }} style={styles.image} />
      </View>

      {isDone && (
        <View style={styles.doneIndicator}>
          <View style={styles.blueDot}>
            <Icon name="checkmark" size={40} color="#fff" />
          </View>
        </View>
      )}

      <View style={styles.contentContainer}>
        <View style={styles.skillTag}>
          <Text style={[styles.skillTagText, { color: getSkillColor(skill) }]}>
            {skill || "No Name"}
          </Text>
        </View>

        <Text style={styles.taskName}>{name || "No Name"}</Text>
        <View style={styles.xpRow}>
          <Icon name="star" size={16} color="#509B9B" />
          <Text style={styles.xpText}>
            {xp !== null ? `${xp} XP` : "No XP"}
          </Text>
        </View>

        <Text style={styles.description}>
          {description || "No Description"}
        </Text>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Reflection</Text>
          <TextInput
            style={styles.textInput}
            placeholder="Start typing..."
            placeholderTextColor="#777"
            multiline={true}
            textAlignVertical="top"
          />
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[
              styles.button,
              { backgroundColor: isDone ? "#509B9B" : "#fff" },
            ]}
            onPress={isDone ? handleMarkAsNotDone : handleMarkAsDone}
          >
            <Icon
              name="checkmark"
              size={20}
              color={isDone ? "#fff" : "#509B9B"}
              style={styles.icon}
            />
            <Text
              style={[
                styles.buttonText,
                { color: isDone ? "#fff" : "#509B9B" },
              ]}
            >
              {isDone ? "Done!" : "Mark as Done"}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.button}
            onPress={() => console.log("Challenge Friend functionality")}
          >
            <Icon
              name="paper-plane"
              size={20}
              color="#509B9B"
              style={styles.icon}
            />
            <Text style={styles.buttonText}>Challenge Friend</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Popup Modal */}
      <Modal visible={showPopup} transparent={true} animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.popup}>
            <Text style={styles.popupTitle}>Congratulations on Completing this Experience!</Text>
            <Text style={styles.popupMessage}>
              You earned {xp} XP.
            </Text>
            <TouchableOpacity style={styles.okayButton} onPress={closePopup}>
              <Text style={styles.okayButtonText}>Okay</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  loadingContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  imageContainer: {
    height: screenHeight * 0.25, // 33% of the screen height
  },
  image: {
    width: "100%",
    height: "100%", // Fill the image container
    borderRadius: 0,
  },
  doneIndicator: {
    position: "absolute",
    width: 50, // Size of the outer blue dot
    height: 50,
    borderRadius: 25, // Ensure this matches half the width/height for a perfect circle
    backgroundColor: "#509B9B",
    justifyContent: "center",
    alignItems: "center",
    top: screenHeight * 0.25 - 25, // Center the dot at 33% of the screen height
    left: screenWidth * 0.85 - 25, // Center the dot at 85% of the screen width
  },
  blueDot: {
    width: 50, // Size matches the parent `doneIndicator`
    height: 50,
    borderRadius: 25,
    backgroundColor: "#509B9B", // Same color as `doneIndicator` to maintain consistency
    justifyContent: "center",
    alignItems: "center",
  },  
  contentContainer: {
    flex: 1, // This will take up the remaining space
    padding: 16,
  },
  skillTag: {
    alignSelf: "flex-start",
    backgroundColor: "#E0E0E0",
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 8,
    marginBottom: 8,
  },
  skillTagText: {
    fontSize: 14,
    fontWeight: "600",
  },
  taskName: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "left",
    paddingVertical: 4,
  },
  xpText: {
    fontSize: 16,
    color: "#777",
    textAlign: "center",
  },
  xpRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 4,
  },
  description: {
    fontSize: 14,
    color: "#555",
    marginBottom: 24,
    textAlign: "left",
    paddingTop: 6,
  },
  inputContainer: {
    marginTop: 10,
    marginHorizontal: 6,
  },
  label: {
    position: "absolute",
    top: -12,
    left: 20,
    backgroundColor: "white",
    paddingHorizontal: 5,
    zIndex: 100,
    fontSize: 12,
    color: "#509B9B",
  },
  textInput: {
    borderWidth: 1,
    borderColor: "#509B9B",
    borderRadius: 10,
    padding: 16,
    fontSize: 14,
    color: "#000",
    height: 80, // Adjusted height
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 16,
  },
  button: {
    flex: 1,
    marginHorizontal: 8,
    paddingVertical: 8, // Reduced button height
    borderRadius: 8,
    borderColor: "#509B9B",
    borderWidth: 1,
    flexDirection: "row", // Align text and icon
    alignItems: "center", // Center both icon and text
    justifyContent: "center", // Center content
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    marginLeft: 10, // Spacing between icon and text
  },
  icon: {
    marginLeft: 10, // Spacing between icon and text
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  popup: {
    width: 412,
    height: 274,
    backgroundColor: "#FFFFFF",
    borderRadius: 5,
    boxShadow: "0px 4px 9px 4px rgba(147, 151, 184, 0.15)",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  popupTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: 'center',
    alignSelf: 'center',
  },
  popupMessage: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 20,
  },
  okayButton: {
    backgroundColor: "#509B9B",
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 5,
  },
  okayButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});






