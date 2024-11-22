// detail from experience
import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

export default function Details() {
  return (
    <View style={styles.container}>
      {/* Image on the top 20% */}
      <View style={styles.imageContainer}>
        <Image
          source={require("@/assets/rubiks_cube.jpg")}
          style={styles.photo}
          resizeMode="cover"
        />
      </View>

      {/* Content in the bottom 80% */}
      <View style={styles.contentContainer}>
        {/* Skill Tag */}
        <View style={styles.skillTag}>
          <Text style={styles.skillTagText}>Problem Solving</Text>
        </View>

        {/* Name of the task */}
        <Text style={styles.taskName}>Solve a Rubik's Cube</Text>

        {/* XP subtitle */}
        <View style={styles.xpRow}>
          <Icon name="star" size={16} color="#509B9B" />
          <Text style={styles.xpText}>{20} XP</Text>
        </View>

        {/* Description */}
        <Text style={styles.description}>
          Solve the Rubik's Cube by aligning all the colors so that each face is a
          single, solid color. Use logic, strategy, and focus to crack the code of
          this classic puzzle. Time yourself or challenge a friend if you’re
          feeling competitive—can you beat your personal best?
        </Text>

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
  imageContainer: {
    height: "33%", // Explicit height for top 20%
  },
  photo: {
    width: "100%",
    height: "100%", // Fill the image container
    borderRadius: 0,
  },
  contentContainer: {
    flex: 1, // This will take up the remaining space
    padding: 16,
    height: "67%", // Explicit height for bottom 80%
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
    color: "#509B9B",
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
