import { useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
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

  // Define the color mapping for skills
  const skillColors = {
    "problem solving": "#FF6030",
    leadership: "#37C9A5",
    communication: "#4CA8FF",
    adaptability: "#FFAB45",
  };

  // Determine the color based on the current skill
  const getSkillColor = (skillName) => {
    return skillColors[skillName] || "#000000"; // Default to black if skill not found
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
      {/* Image on the top 33% */}
      <View style={styles.imageContainer}>
        <Image source={{ uri: photo }} style={styles.image} />
      </View>

      {/* Content in the bottom 67% */}
      <View style={styles.contentContainer}>
        {/* Skill Tag */}
        <View style={styles.skillTag}>
          <Text style={[styles.skillTagText, { color: getSkillColor(skill) }]}>
            {skill || "No Name"}
          </Text>
        </View>

        {/* Name of the task */}
        <Text style={styles.taskName}>{name || "No Name"}</Text>

        {/* XP subtitle */}
        <View style={styles.xpRow}>
          <Icon name="star" size={16} color="#509B9B" />
          <Text style={styles.xpText}>
            {xp !== null ? `${xp} XP` : "No XP"}
          </Text>
        </View>

        {/* Description */}
        <Text style={styles.description}>{description || "No Description"}</Text>

        {/* Custom Text Input */}
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

        {/* Buttons */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button}>
            <Icon name="checkmark" size={20} color="#fff" style={styles.icon} />
            <Text style={styles.buttonText}>Mark as Done</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}>
            <Icon name="paper-plane" size={20} color="#fff" style={styles.icon} />
            <Text style={styles.buttonText}>Challenge Friend</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

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
    height: "33%", // Explicit height for top 33%
  },
  image: {
    width: "100%",
    height: "100%", // Fill the image container
    borderRadius: 0,
  },
  contentContainer: {
    flex: 1, // This will take up the remaining space
    padding: 16,
    // height: "67%", // Removed explicit height to let flex handle sizing
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
    // color is now dynamically set, so you can remove or keep a default color
    // color: "#509B9B",
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
    backgroundColor: "#509B9B",
    paddingVertical: 8, // Reduced button height
    borderRadius: 8,
    borderColor: "#509B9B",
    borderWidth: 1,
    flexDirection: "row", // Align text and icon
    alignItems: "center", // Vertically center the text and icon
    shadowColor: "#000", // Add shadow for both platforms
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    shadowOffset: { width: 0, height: 3 }, // Shift the shadow down
    elevation: 5, // Add elevation for Android shadow
  },
  buttonText: {
    textAlign: "center",
    color: "#fff",
    fontWeight: "600",
    fontSize: 14,
  },
  icon: {
    marginRight: 8, // Space between icon and text
  },
});
