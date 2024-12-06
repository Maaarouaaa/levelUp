import React, { useEffect, useState } from "react";
import { useLocalSearchParams } from "expo-router";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
  FlatList,
  ActivityIndicator,
  Modal,
  Dimensions,
} from "react-native";
import { useRouter } from "expo-router";
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
  const [showFriendPopup, setShowFriendPopup] = useState(false);
  const [users, setUsers] = useState([]);
  const [selectedFriends, setSelectedFriends] = useState([]);
  const [loadingUsers, setLoadingUsers] = useState(true);
  const [sendButtonText, setSendButtonText] = useState("Send");

  const router = useRouter();

  const navigateBack = () => {
    router.back();
  };

  const handleSend = () => {
    console.log("Selected Friends:", selectedFriends); // Log selected friends
    setSendButtonText("Sent"); // Temporarily set the button text to "Sent"

    // Close the modal after 1 second
    setTimeout(() => {
      setSendButtonText("Send"); // Reset the button text to "Send"
      closeFriendPopup(); // Close the modal
    }, 1000); // 1000ms = 1 second
  };

  const skillColors = {
    "problem solving": "#FF6030",
    leadership: "#37C9A5",
    communication: "#4CA8FF",
    adaptability: "#FFAB45",
  };

  const skillBackgroundColors = {
    "problem solving": "#FFD4C7",
    communication: "#CFE8FF",
    leadership: "#D7F9F0",
    adaptability: "#FFE8CD",
  };

  const getSkillColor = (skillName) => skillColors[skillName] || "#000000";
  const getSkillBackgroundColor = (skillName) =>
    skillBackgroundColors[skillName] || "#E0E0E0";

  const updateGraphData = async (id, skillName, updates) => {
    try {
      // Fetch the current row for the given ID
      const { data: currentData, error: fetchError } = await db
        .from("graph_data")
        .select("*")
        .eq("id", id)
        .single();

      if (fetchError) {
        console.error("Error fetching current data:", fetchError.message);
        return;
      }

      // Dynamically construct the skill-specific field
      const skillXpField = `${skillName}_xp`; // e.g., problem_solving_xp, adaptability_xp

      // Increment the fields dynamically
      const updatedData = {
        total_xp: (currentData.total_xp || 0) + (updates.total_xp || 0), // Increment total_xp
        [skillXpField]: (currentData[skillXpField] || 0) + (updates.xp || 0), // Increment specific skill XP
      };

      // Update the table with the incremented values
      const { error: updateError } = await db
        .from("graph_data")
        .update(updatedData)
        .eq("id", id);

      if (updateError) {
        console.error("Error updating graph_data:", updateError.message);
        return;
      }

      console.log(`Graph data for ID ${id} updated successfully:`, updatedData);
    } catch (err) {
      console.error("Error in updateGraphData:", err);
    }
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

      // Only unlock the next task if the current task ID is not a multiple of 10
      if (id % 10 !== 0) {
        const { error: unlockError } = await db
          .from("tasks")
          .update({ locked: false }) // Unlock the next task
          .eq("id", nextTaskId);

        if (unlockError) {
          console.error("Error unlocking the next task:", unlockError.message);
          return;
        }
      } else {
        console.log(
          "Current task is a milestone (multiple of 10); next task will not be unlocked."
        );
      }

      // Increment the {skill}_last column
      const { error: incrementError } = await db
        .from("users")
        .update({ [`${nSkill}_last`]: currentLast + 1 }) // Update dynamically
        .eq("id", 1);

      if (incrementError) {
        console.error(
          "Error incrementing user's last task:",
          incrementError.message
        );
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

      console.log(
        "Task marked as done, XP updated, next task unlocked (if applicable), and user's last task incremented."
      );
    } catch (err) {
      console.error("Error:", err);
    }
    updateGraphData(5, skill, { total_xp: xp, xp: xp });
  };

  const handleMarkAsNotDone = async () => {
    try {
      const { error } = await db
        .from("tasks")
        .update({ done: "FALSE" }) // Update the "done" column to FALSE
        .eq("id", id); // Filter for the specific task by its ID

      if (error) {
        console.error("Error marking task as not done:", error.message);
      } else {
        // Call RPC to update XP
        const { error: xpError } = await db.rpc("update_xp_for_user", {
          skill_name: `${skill}`, // Pass the skill name (e.g., 'problem_solving')
          xp_value: xp, // Pass the XP value
          user_id: 1, // Hardcoded user_id as 1
          mark_done: false, // Mark as not done (to subtract XP)
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
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  const openFriendPopup = () => setShowFriendPopup(true);
  const closeFriendPopup = () => setShowFriendPopup(false);

  //const closePopup = () => setShowPopup(false);

  const toggleFriendSelection = (name) => {
    setSelectedFriends((prev) =>
      prev.includes(name)
        ? prev.filter((friend) => friend !== name)
        : [...prev, name]
    );
  };

  const fetchUsers = async () => {
    try {
      setLoadingUsers(true);
      const { data, error } = await db
        .from("users")
        .select("name, photo")
        .eq("friends", true) // Filter for friends = TRUE
        .neq("id", 1); // Exclude user with id = 1

      if (error) throw error;

      setUsers(data || []);
    } catch (err) {
      console.error("Error fetching users:", err);
    } finally {
      setLoadingUsers(false);
    }
  };

  useEffect(() => {
    if (showFriendPopup) {
      fetchUsers();
    }
  }, [showFriendPopup]);
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////
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
      <TouchableOpacity
        onPress={() => navigateBack()}
        style={{
          position: "absolute",
          top: 50, // Adjust the vertical position
          left: 16,
          zIndex: 2, // Ensure it appears above other elements
        }}
      >
        <View
          style={{
            width: 40,
            height: 40,
            backgroundColor: "rgba(255,255,255,.8)", // Background color of the circle
            borderRadius: 20, // Half of width/height for a perfect circle
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Icon name="arrow-back" size={24} color="#000000" />
        </View>
      </TouchableOpacity>

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
      {/*
      <View style={styles.contentContainer}>
        <View style={styles.skillTag}>
          <Text style={[styles.skillTagText, { color: getSkillColor(skill) }]}>
            {skill || "No Name"}
          </Text>
        </View>
        */}
      <View style={styles.contentContainer}>
        <View
          style={[
            styles.skillTag,
            { backgroundColor: getSkillBackgroundColor(skill) },
          ]}
        >
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

          <TouchableOpacity style={styles.button} onPress={openFriendPopup}>
            <Icon
              name="paper-plane"
              size={16}
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
            <Text style={styles.popupTitle}>
              Congratulations on Completing this Experience!
            </Text>
            <Text style={styles.popupMessage}>You earned {xp} XP!</Text>
            <TouchableOpacity style={styles.okayButton} onPress={closePopup}>
              <Text style={styles.okayButtonText}>Okay</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <Modal visible={showFriendPopup} transparent={true} animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TouchableOpacity
              style={styles.closeIconButton}
              onPress={closeFriendPopup}
            >
              <Icon name="close" size={24} color="#000" />
            </TouchableOpacity>

            {loadingUsers ? (
              <ActivityIndicator size="large" color="#509B9B" />
            ) : (
              <FlatList
                data={users}
                keyExtractor={(item, index) => index.toString()}
                numColumns={3}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={styles.friendItem}
                    onPress={() => toggleFriendSelection(item.name)}
                  >
                    <Image
                      source={{ uri: item.photo }}
                      style={styles.friendImage}
                    />
                    <Text style={styles.friendName}>{item.name}</Text>
                    {selectedFriends.includes(item.name) && (
                      <View style={styles.checkIconContainer}>
                        <Icon
                          name="checkmark-circle"
                          size={24}
                          color="#509B9B"
                        />
                      </View>
                    )}
                  </TouchableOpacity>
                )}
              />
            )}
            <TouchableOpacity
              style={[
                styles.submitButton,
                sendButtonText === "Sent" && styles.sentButton, // Apply a gray style when button is "Sent"
              ]}
              onPress={handleSend}
              disabled={sendButtonText === "Sent"} // Optional: Disable button after it's clicked
            >
              <Text
                style={[
                  styles.submitButtonText,
                  sendButtonText === "Sent" && styles.sentButtonText, // Change text color to gray
                ]}
              >
                {sendButtonText}
              </Text>
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
  backButton: {
    position: "absolute",
    top: 50,
    left: 16,
    zIndex: 2,
  },
  backIconWrapper: {
    width: 40,
    height: 40,
    backgroundColor: "rgba(255,255,255,.8)",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  imageContainer: {
    height: screenHeight * 0.33, // 33% of the screen height
  },
  image: {
    width: "100%",
    height: "100%", // Fill the image container
    borderRadius: 0,
  },
  sentButton: {
    backgroundColor: "#ccc", // Gray background for "Sent"
    borderColor: "#aaa", // Optional: Gray border for "Sent"
  },

  sentButtonText: {
    color: "#777", // Gray text color for "Sent"
  },
  doneIndicator: {
    position: "absolute",
    width: 50, // Size of the outer blue dot
    height: 50,
    borderRadius: 25, // Ensure this matches half the width/height for a perfect circle
    backgroundColor: "#509B9B",
    justifyContent: "center",
    alignItems: "center",
    top: screenHeight * 0.25 + 38, // Center the dot at 33% of the screen height
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
    padding: 14,
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
    fontFamily: "Poppins-SemiBold",
  },
  taskName: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "left",
    paddingVertical: 4,
    fontFamily: "Poppins-SemiBold",
  },
  xpText: {
    fontSize: 16,
    color: "#000",
    textAlign: "center",
  },
  xpRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 4,
  },
  description: {
    fontSize: 15,
    lineHeight: 22,
    color: "#555",
    marginBottom: 24,
    textAlign: "left",
    paddingTop: 6,
    fontFamily: "Poppins-Regular",
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
    fontFamily: "Poppins-Regular",
  },
  textInput: {
    borderWidth: 1,
    borderColor: "#509B9B",
    borderRadius: 10,
    padding: 16,
    fontSize: 14,
    color: "#000",
    height: 80, // Adjusted height
    fontFamily: "Poppins-Regular",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 16,
  },
  closeIconButton: {
    position: "absolute",
    top: 10, // Adjust this value to control vertical position
    right: 10, // Adjust this value to control horizontal position
    zIndex: 10, // Ensure it appears on top of all other content
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
    fontSize: 14,
    fontWeight: "bold",
    textAlign: "center",
    marginLeft: 2, // Spacing between icon and text
    fontFamily: "Poppins-SemiBold",
    color: "#509B9B",
  },
  disabledButton: {
    backgroundColor: "#ccc", // Gray background for disabled button
    borderColor: "#aaa", // Optional: Change border color
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
    textAlign: "center",
    alignSelf: "center",
    fontFamily: "Poppins-SemiBold",
  },
  popupMessage: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 20,
    fontFamily: "Poppins-Regular",
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
    fontFamily: "Poppins-SemiBold",
  },
  closeButton: {
    backgroundColor: "#509B9B",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 5,
    alignSelf: "center",
    marginTop: 16,
  },
  closeButtonText: {
    color: "#fff",
    fontFamily: "Poppins-SemiBold",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0, 0, 0, 0)",
  },
  modalContent: {
    backgroundColor: "#fff",
    height: Dimensions.get("window").height * 0.45,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 16,
    alignItems: "center",
  },
  friendItem: {
    alignItems: "center",
    margin: 8,
    width: 80,
  },
  friendImage: {
    width: 85,
    height: 85,
    borderRadius: 40,
  },
  friendName: {
    fontSize: 12,
    fontFamily: "Poppins-Regular",
    textAlign: "center",
    marginTop: 4,
  },
  checkIconContainer: {
    position: "absolute",
    top: 5,
    right: 5,
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    borderRadius: 12,
  },
  submitButton: {
    backgroundColor: "#509B9B",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignSelf: "center",
    marginTop: 16,
  },
  submitButtonText: {
    color: "#fff",
    fontFamily: "Poppins-SemiBold",
  },
});
