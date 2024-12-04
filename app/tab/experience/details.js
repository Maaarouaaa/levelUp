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
  const [isDone, setIsDone] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  const skillColors = {
    "problem solving": "#FF6030",
    leadership: "#37C9A5",
    communication: "#4CA8FF",
    adaptability: "#FFAB45",
  };

  const getSkillColor = (skillName) => {
    return skillColors[skillName] || "#000000";
  };

  const handleMarkAsDone = async () => {
    try {
      const { error } = await db
        .from("tasks")
        .update({ done: "TRUE" }) // Mark the task as done
        .eq("id", id);
  
      if (error) {
        console.error("Error marking task as done:", error.message);
        return;
      }
  
      const nSkill = skill.replace(/\s+/g, "").toLowerCase();
  
      // Fetch the current value of {skill}_last
      const { data: userData, error: userError } = await db
        .from("users")
        .select(`${nSkill}_last`) // Dynamically select the column
        .eq("id", 1)
        .single();
  
      if (userError) {
        console.error("Error fetching user's last task:", userError.message);
        return;
      }
  
      const currentLast = userData[`${nSkill}_last`];
      const nextTaskId = currentLast + 1;
  
      // Only unlock the next task if skill_last is not a multiple of 10
      if (currentLast % 10 !== 0) {
        const { error: unlockError } = await db
          .from("tasks")
          .update({ locked: false }) // Unlock the next task
          .eq("id", nextTaskId);
  
        if (unlockError) {
          console.error("Error unlocking the next task:", unlockError.message);
          return;
        }
      } else {
        console.log("Current skill_last is a milestone (multiple of 10); next task will not be unlocked.");
      }
  
      // Increment the {skill}_last column
      const { error: incrementError } = await db
        .from("users")
        .update({ [`${nSkill}_last`]: currentLast + 1 }) // Update dynamically
        .eq("id", 1);
  
      if (incrementError) {
        console.error("Error incrementing user's last task:", incrementError.message);
        return;
      }
  
      // Update XP using the RPC
      const { error: xpError } = await db.rpc("update_xp_for_user", {
        skill_name: skill, // Pass the skill name
        xp_value: xp, // XP value to add
        user_id: 1, // Hardcoded user ID
        mark_done: true, // Mark as done
      });
  
      if (xpError) {
        console.error("Error updating XP:", xpError.message);
        return;
      }
  
      // Update UI state
      setIsDone(true);
      setShowPopup(true);
  
      console.log("Task marked as done, XP updated, next task conditionally unlocked, and user's last task incremented.");
    } catch (err) {
      console.error("Error:", err);
    }
  };
  
  
  
  
  

  const handleMarkAsNotDone = async () => {
    try {
        const { error } = await db
            .from("tasks")
            .update({ done: 'FALSE' }) // Update the "done" column to FALSE
            .eq("id", id); // Filter for the specific task by its ID

        if (error) {
            console.error("Error marking task as not done:", error.message);
        } else {
            // Call RPC to update XP
            const { error: xpError } = await db.rpc('update_xp_for_user', {
                skill_name: `${skill}`,  // Pass the skill name (e.g., 'problem_solving')
                xp_value: xp,             // Pass the XP value
                user_id: 1,               // Hardcoded user_id as 1
                mark_done: false          // Mark as not done (to subtract XP)
            });

            if (xpError) {
                console.error("Error updating XP:", xpError.message);
            } else {
                setIsDone(false); // Update the local state
                console.log("Task marked as not done and XP updated.");
            }
        }
    } catch (err) {
        console.error("Error:", err);
    }
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
          .select("name, xp, skill, photo, description, done")
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
          setIsDone(data.done); // Set the initial done state
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






