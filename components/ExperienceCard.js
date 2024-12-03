import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { useRouter } from "expo-router";

import db from "@/database/db";

export default function ExperienceCard({ id, photo, navigate, bool }) {
  const router = useRouter();

  const detailFromHome = () => {
    router.push("/tab/feed/details"); // Navigate to home details
  };
  const detailFromExperience = () => {
    router.push({ pathname: "/tab/experience/details", params: { id: id } }); // Navigate to experience details
  };

  const [name, setName] = useState(null);
  const [xp, setXp] = useState(null);
  const [locked, setLocked] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isSelected, setIsSelected] = useState(false); // Track if card is selected (clicked)

  useEffect(() => {
    const fetchExperienceData = async () => {
      try {
        setLoading(true);
        const { data, error } = await db
          .from("tasks")
          .select("name, xp, locked")
          .eq("id", id)
          .single();

        if (error) {
          console.error("Error fetching experience data:", error.message);
        } else if (data) {
          setName(data.name);
          setXp(data.xp);
          setLocked(data.locked);
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

  // Handle navigation when the card is clicked (for 'bool' true)
  const handleNavigation = () => {
    if (bool) {
      switch (navigate) {
        case "home":
          return detailFromHome();
        case "experience":
          return detailFromExperience();
        // Add other cases for "challenge", "leaderboard", etc.
        default:
          return;
      }
    } else {
      // For 'bool' false, set the card as selected
      setIsSelected(true);
    }
  };

  // If the card is locked, display a lock icon
  if (locked) {
    return (
      <TouchableOpacity style={styles.containerL}>
        <View style={styles.contentL}>
          <Icon name="lock-closed" size={30} color="#000000" />
        </View>
      </TouchableOpacity>
    );
  }

  // Render the card based on 'bool'
  return (
    <TouchableOpacity
      style={[
        styles.container,
        isSelected && styles.selectedContainer, // Apply blue color if selected
      ]}
      onPress={handleNavigation}
    >
      <View style={styles.content}>
        <View style={styles.details}>
          <Image source={photo} style={styles.image} />
        </View>
        <View style={styles.words}>
          <Text style={styles.name}>{name || "No Name"}</Text>
          <View style={styles.xpRow}>
            <Icon name="star" size={25} color="#509B9B" />
            <Text style={styles.xp}>{xp !== null ? `${xp} XP` : "No XP"}</Text>
          </View>
        </View>
      </View>

      {/* Conditionally render the selected text when isSelected is true */}
      {isSelected && <Text style={styles.selectedText}>SELECTED</Text>}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFFFFF", // Default background color
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: 364,
    height: 96,
    padding: 16,
    justifyContent: "space-between",
  },
  loadingContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  words: {
    flex: 1,
    justifyContent: "space-between",
  },
  name: {
    fontSize: 24,
    color: "#000000",
    textAlign: "left",
  },
  xpRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  xp: {
    fontSize: 20,
    color: "#000000",
    marginLeft: 8,
  },
  details: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 8,
  },
  image: {
    width: 76,
    height: 76,
    borderRadius: 12,
    marginRight: 8,
  },
  selectedContainer: {
    backgroundColor: "#509B9B", // Blue background when selected
  },
  selectedText: {
    fontSize: 26,
    color: "#FFFFFF", // White text color when selected
    fontWeight: "bold",
    textAlign: "center",
    //marginBottom: 19,
  },
  containerL: {
    backgroundColor: "#A3A3A3", // Gray background for locked state
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: 364,
    height: 96,
    padding: 16,
    justifyContent: "space-between",
  },
  contentL: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignSelf: "center",
    paddingTop: 14,
  },
});

/*
import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { useRouter } from "expo-router";

import db from "@/database/db";
//import { detailFromExperience } from "@/app/tab/experience/index"; // Import the function

export default function ExperienceCard({ id, photo, navigate, bool }) {
  const router = useRouter();
  const detailFromHome = () => {
    router.push("/tab/feed/details"); // Directly navigate to the screen
  };
  const detailFromExperience = () => {
    router.push({ pathname: "/tab/experience/details", params: { id: id } }); // Directly navigate to the screen
  };
  const [name, setName] = useState(null);
  const [xp, setXp] = useState(null);
  const [locked, setLocked] = useState(null);
  const [loading, setLoading] = useState(true);

  //console.log("EXPERIENCECARD ID", { id });

  useEffect(() => {
    const fetchExperienceData = async () => {
      try {
        setLoading(true);
        const { data, error } = await db
          .from("tasks")
          .select("name, xp, locked")
          .eq("id", id)
          .single();

        if (error) {
          console.error("Error fetching experience data:", error.message);
        } else if (data) {
          setName(data.name);
          setXp(data.xp);
          setLocked(data.locked);
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

  const handleNavigation = (params) => {
    switch (navigate) {
      case "home":
        return detailFromHome(params);
      case "experience":
        return detailFromExperience(params); // Use imported function
      case "challenge":
        return detailFromChallenge(params);
      case "leaderboard":
        return detailFromLeaderboard(params);
      default:
        return detailFromProfile(params);
    }
  };

  if (!locked) {
    return (
      <TouchableOpacity style={styles.container} onPress={handleNavigation}>
        <View style={styles.content}>
          <View style={styles.details}>
            <Image source={photo} style={styles.image} />
          </View>
          <View style={styles.words}>
            <Text style={styles.name}>{name || "No Name"}</Text>
            <View style={styles.xpRow}>
              <Icon name="star" size={25} color="#509B9B" />
              <Text style={styles.xp}>
                {xp !== null ? `${xp} XP` : "No XP"}
              </Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  } else {
    return (
      <TouchableOpacity style={styles.containerL}>
        <View style={styles.contentL}>
          <Icon name="lock-closed" size={30} color="#000000" />
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: 364,
    height: 96,
    padding: 16,
    justifyContent: "space-between",
  },
  loadingContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  words: {
    flex: 1,
    justifyContent: "space-between",
  },
  name: {
    fontSize: 24,
    color: "#000000",
    textAlign: "left",
  },
  xpRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  xp: {
    fontSize: 20,
    color: "#000000",
    marginLeft: 8,
  },
  details: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 8,
  },
  image: {
    width: 76,
    height: 76,
    borderRadius: 12,
    marginRight: 8,
  },
  containerL: {
    backgroundColor: "#A3A3A3",
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: 364,
    height: 96,
    padding: 16,
    justifyContent: "space-between",
  },
  contentL: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignSelf: "center",
    paddingTop: 14,
  },
});
*/
