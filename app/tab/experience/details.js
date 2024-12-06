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
  FlatList,
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
  const [sendButtonText, setSendButtonText] = useState("Send"); // State for the button text


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

  const handleMarkAsDone = async () => {
    try {
      const { error } = await db
        .from("tasks")
        .update({ done: "TRUE" })
        .eq("id", id);
      if (error) throw new Error(error.message);

      setIsDone(true);
      setShowPopup(true);
    } catch (err) {
      console.error("Error:", err);
    }
  };

  const handleMarkAsNotDone = async () => {
    try {
      const { error } = await db
        .from("tasks")
        .update({ done: "FALSE" })
        .eq("id", id);
      if (error) throw new Error(error.message);

      setIsDone(false);
    } catch (err) {
      console.error("Error:", err);
    }
  };

  const openFriendPopup = () => setShowFriendPopup(true);
  const closeFriendPopup = () => setShowFriendPopup(false);

  const closePopup = () => setShowPopup(false);

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

  useEffect(() => {
    const fetchExperienceData = async () => {
      try {
        setLoading(true);
        const { data, error } = await db
          .from("tasks")
          .select("name, xp, skill, photo, description, done")
          .eq("id", id)
          .single();

        if (error) throw new Error(error.message);

        if (data) {
          setName(data.name);
          setXp(data.xp);
          setSkill(data.skill);
          setPhoto(data.photo);
          setDescription(data.description);
          setIsDone(data.done);
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
      <TouchableOpacity onPress={navigateBack} style={styles.backButton}>
        <View style={styles.backIconWrapper}>
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
          <Text style={styles.xpText}>{xp !== null ? `${xp} XP` : "No XP"}</Text>
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
              <Image source={{ uri: item.photo }} style={styles.friendImage} />
              <Text style={styles.friendName}>{item.name}</Text>
              {selectedFriends.includes(item.name) && (
                <View style={styles.checkIconContainer}>
                  <Icon name="checkmark-circle" size={24} color="#509B9B" />
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
  imageContainer: {
    height: screenHeight * 0.33,
  },
  image: {
    width: "100%",
    height: "100%",
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
    top: screenHeight * 0.25 + 38,
    left: screenWidth * 0.85 - 25,
  },
  blueDot: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#509B9B",
    justifyContent: "center",
    alignItems: "center",
  },
  contentContainer: {
    flex: 1,
    padding: 14,
  },
  skillTag: {
    alignSelf: "flex-start",
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 8,
    marginBottom: 8,
  },
  skillTagText: {
    fontSize: 14,
    fontFamily: "Poppins-SemiBold",
  },
  taskName: {
    fontSize: 24,
    fontFamily: "Poppins-SemiBold",
  },
  xpRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  xpText: {
    marginLeft: 6,
    fontSize: 16,
    fontFamily: "Poppins-Regular",
  },
  description: {
    fontSize: 14,
    fontFamily: "Poppins-Regular",
    color: "#555",
    marginBottom: 20,
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    marginBottom: 4,
    fontSize: 12,
    fontFamily: "Poppins-Regular",
    color: "#509B9B",
  },
  textInput: {
    borderWidth: 1,
    borderColor: "#509B9B",
    borderRadius: 10,
    padding: 10,
    fontSize: 14,
    height: 80,
  },
  closeIconButton: {
    position: "absolute",
    top: 10, // Adjust this value to control vertical position
    right: 10, // Adjust this value to control horizontal position
    zIndex: 10, // Ensure it appears on top of all other content
  },  
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  button: {
    flex: 1,
    marginHorizontal: 8,
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#509B9B",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  disabledButton: {
    backgroundColor: "#ccc", // Gray background for disabled button
    borderColor: "#aaa", // Optional: Change border color
  },
  
  buttonText: {
    fontSize: 14,
    fontWeight: "Poppins-SemiBold",
    marginLeft: 8,
    color: "#509B9B",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "transparent",
    justifyContent: "center",
    alignItems: "center",
  },
  popup: {
    width: 300,
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 10,
    alignItems: "center",
  },
  popupTitle: {
    fontSize: 20,
    fontFamily: "Poppins-SemiBold",
    fontWeight: "bold",
    marginBottom: 10,
  },
  popupMessage: {
    fontSize: 16,
    fontFamily: "Poppins-Regular",
    textAlign: "center",
    marginBottom: 20,
  },
  okayButton: {
    backgroundColor: "#509B9B",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 5,
  },
  okayButtonText: {
    color: "#fff",
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
