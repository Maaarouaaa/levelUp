import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity, ActivityIndicator } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { useRouter } from "expo-router";

import db from "@/database/db";
//import { detailFromExperience } from "@/app/tab/experience/index"; // Import the function

export default function ExperienceCard({ id, navigate }) {
  const router = useRouter();
  const detailFromHome = () => {
    router.push({ pathname: "/tab/feed/details", params: { id: id } }); // Directly navigate to the screen
  };
  const detailFromExperience = () => {
    router.push({ pathname: "/tab/experience/details", params: { id: id } }); // Directly navigate to the screen
  };
  const [name, setName] = useState(null);
  const [xp, setXp] = useState(null);
  const [locked, setLocked] = useState(null);
  const [photo, setPhoto] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchExperienceData = async () => {
      try {
        setLoading(true);
        const { data, error } = await db.from("tasks").select("name, xp, locked, photo").eq("id", id).single();

        if (error) {
          console.error("Error fetching experience data:", error.message);
        } else if (data) {
          setName(data.name);
          setXp(data.xp);
          setLocked(data.locked)
          setPhoto(data.photo)
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

  const handleNavigation = () => {
    switch (navigate) {
      case "home":
        return detailFromHome();
      case "experience":
        return detailFromExperience(); // Use imported function
      case "challenge":
        return detailFromChallenge();
      case "leaderboard":
        return detailFromLeaderboard();
      default:
        return detailFromProfile();
    }
  };

  if (!locked){
    return (
      <TouchableOpacity style={styles.container} onPress={handleNavigation}>
        <View style={styles.content}>
          <View style={styles.details}>
            <Image source={{ uri: photo }} style={styles.image} />
          </View>
          <View style={styles.words}>
            <Text style={styles.name}>{name || "No Name"}</Text>
            <View style={styles.xpRow}>
              <Icon name="star" size={18} color="#509B9B" />
              <Text style={styles.xp}>{xp !== null ? `${xp} XP` : "No XP"}</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
  else{
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
    justifyContent: "center", // Ensures content is centered vertically
    alignItems: "center", // Ensures content is centered horizontally
    flexDirection: "row",
  },
  loadingContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    flexDirection: "row",
    justifyContent: "center", // Centers both the text and photo horizontally
    alignItems: "center", // Centers the content vertically
  },
  words: {
    flex: 1,
    justifyContent: "center", // Ensures vertical centering
    alignItems: "flex-start", // Aligns text to the left
    marginLeft: 12,
  },
  name: {
    fontSize: 22,
    color: "#000000",
    textAlign: "left",
    flexWrap: "wrap", // Allows the name to wrap to a second line if needed
    lineHeight: 24,
    paddingTop: 4,
    marginBottom: 1, // Adds spacing below the name
    fontFamily: 'Poppins-Regular',
  },
  xpRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 1, // Adds spacing above the XP row
  },
  xp: {
    fontSize: 18,
    color: "#000000",
    marginLeft: 4,
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
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  contentL: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: 'center',
    paddingTop: 14,
  },
});









