import { StyleSheet, Text, View } from "react-native";

export default function NewPost() {
  return (
    <View style={styles.container}>
      <Text style={styles.centerText}>Button leads to this screen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff", // Neutral background color
  },
  centerText: {
    fontSize: 18, // Adjust font size as needed
    color: "#000", // Neutral text color
  },
});

/*
import { useState, useLayoutEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Keyboard,
} from "react-native";

import Theme from "@/assets/theme";
import { useNavigation, useRouter } from "expo-router";
import db from "@/database/db";

export default function NewPost() {
  const [username, setUsername] = useState("");
  const [inputText, setInputText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigation(); // Use useNavigation to get navigation prop
  const router = useRouter();

  // Function to submit the post to the database
  const submitPost = async () => {
    if (!inputText) {
      return;
    }

    setIsLoading(true);

    try {
      // Insert post into the "posts" table
      const { error } = await db.from("posts").insert({
        username: username.length > 0 ? username : "Anonymous", // Default to Anonymous if no username
        text: inputText,
      });

      if (error) {
        console.error("Error submitting post:", error);
      } else {
        // Reset input fields after a successful post
        setUsername("");
        setInputText("");
        Keyboard.dismiss();
        navigation.navigate("index"); // Navigate back after submission
      }
    } catch (err) {
      console.error("Unexpected error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const submitDisabled = isLoading || inputText.length === 0;

  // Use useLayoutEffect to customize the header buttons when the component mounts
  useLayoutEffect(() => {
    navigation.setOptions({
      title: "New Post",
      headerLeft: () => (
        <TouchableOpacity
          onPress={() => navigation.navigate("index")}
          style={styles.headerButton}
        >
          <Text style={styles.headerButtonTextSecondary}>Cancel</Text>
        </TouchableOpacity>
      ),
      headerRight: () => (
        <TouchableOpacity
          onPress={submitPost}
          disabled={submitDisabled}
          style={[styles.headerButton, submitDisabled && styles.disabledButton]}
        >
          <Text style={styles.headerButtonTextPrimary}>Submit</Text>
        </TouchableOpacity>
      ),
    });
  }, [navigation, submitDisabled, inputText]);

  return (
    <View style={styles.container}>
      // Post as Section 
      <View style={styles.nameInputContainer}>
        <Text style={styles.nameInputPrompt}>Post as:</Text>
        <TextInput
          style={styles.nameInput}
          value={username}
          onChangeText={setUsername}
          placeholder={"Anonymous"}
          placeholderTextColor={Theme.colors.textTertiary}
        />
      </View>

      // Text Input for Post Content 
      <TextInput
        style={styles.input}
        value={inputText}
        onChangeText={setInputText}
        placeholder={"What do you want to share?"}
        placeholderTextColor={Theme.colors.textSecondary}
        multiline
        textAlignVertical="top"
        autoFocus
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.colors.backgroundPrimary,
  },
  headerButton: {
    marginHorizontal: 10,
  },
  headerButtonTextPrimary: {
    fontSize: 18,
    color: Theme.colors.textHighlighted,
  },
  headerButtonTextSecondary: {
    fontSize: 18,
    color: Theme.colors.textSecondary,
  },
  disabledButton: {
    opacity: 0.5,
  },
  nameInputContainer: {
    paddingHorizontal: 16,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: Theme.colors.textSecondary,
  },
  nameInputPrompt: {
    color: Theme.colors.textSecondary,
    marginBottom: 4,
  },
  nameInput: {
    color: Theme.colors.textPrimary,
    borderBottomWidth: 1,
    borderBottomColor: Theme.colors.textTertiary,
    paddingBottom: 8,
  },
  input: {
    color: Theme.colors.textPrimary,
    backgroundColor: Theme.colors.backgroundSecondary,
    flex: 1,
    padding: 16,
    margin: 16,
    borderRadius: 8,
    fontSize: 16,
  },
});
*/
