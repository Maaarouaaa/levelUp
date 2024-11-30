import React, { useEffect, useState } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity, ActivityIndicator } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import db from "@/database/db"; // Ensure this path points to your database setup

const Profile = ({ id, ranking, friends }) => {
  const [photo, setPhoto] = useState(null);
  const [name, setName] = useState(null);
  const [totalXp, setTotalXp] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setLoading(true);
        const { data, error } = await db
          .from("users")
          .select("photo, name, total_xp")
          .eq("id", id)
          .single();

        if (error) {
          console.error("Error fetching user data:", error.message);
        } else if (data) {
          setPhoto(data.photo);
          setName(data.name);
          setTotalXp(data.total_xp);
        }
      } catch (err) {
        console.error("Error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [id]);

  if (loading) {
    return (
      <View style={[styles.container, styles.loadingContainer]}>
        <ActivityIndicator size="large" color="#509B9B" />
      </View>
    );
  }

  return (
    <>
      <View style={styles.container}>
        {/* Ranking */}
        <Text style={styles.ranking}>{ranking}</Text>

        {/* Profile Picture */}
        <Image
          source={photo ? { uri: photo } : require("@/assets/rubiks_cube.jpg")} // Replace with your default profile pic
          style={styles.profilePicture}
        />

        {/* Name and XP */}
        <View style={styles.infoContainer}>
          <Text style={styles.name}>{name || "No Name"}</Text>
          <View style={styles.xpRow}>
            <Icon name="star" size={16} color="#509B9B" />
            <Text style={styles.xpText}>{totalXp !== null ? `${totalXp} XP` : "No XP"}</Text>
          </View>
        </View>

        {/* Dynamic Button */}
        <TouchableOpacity style={styles.button}>
          {friends ? (
            <>
              <Icon name="paper-plane-outline" size={14} color="#509B9B" style={styles.icon} />
              <Text style={styles.buttonText}>Challenge</Text>
            </>
          ) : (
            <>
              <Icon name="person-add-outline" size={14} color="#509B9B" style={styles.icon} />
              <Text style={styles.buttonText}>Add Friend</Text>
            </>
          )}
        </TouchableOpacity>
      </View>

      {/* Divider */}
      <View style={styles.divider} />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    padding: 5,
    marginVertical: 5,
    backgroundColor: "rgba(0,0,0,0)",
    borderRadius: 10,
    marginHorizontal: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  ranking: {
    fontSize: 20,
    color: "#333",
    paddingRight: 10,
    textAlign: "center",
    width: 50, // Fixed width to align profile photos
  },
  profilePicture: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 10,
  },
  infoContainer: {
    flex: 1,
    justifyContent: "center",
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  xpRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 4,
  },
  xpText: {
    fontSize: 14,
    color: "#000", // Changed to black
    marginLeft: 2,
  },
  button: {
    flexDirection: "row", // Added to align icon and text horizontally
    alignItems: "center",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    borderColor: "#509B9B",
    borderWidth: 1,
    justifyContent: "center",
  },
  buttonText: {
    fontSize: 12,
    color: "#509B9B",
    fontWeight: "bold",
    marginLeft: 2, // Spacing between icon and text
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  icon: {
    marginRight: 5, // Spacing between icon and text
  },
  divider: {
    height: 1,
    backgroundColor: "#509B9B",
    marginVertical: 8,
  },
});

export default Profile;





