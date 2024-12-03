import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import { useRouter } from "expo-router";
import db from "@/database/db"; // Ensure this path points to your database setup

const Profile = ({ id, ranking, friends }) => {
  console.log(friends);
  const [photo, setPhoto] = useState(null);
  const [name, setName] = useState(null);
  const [totalXp, setTotalXp] = useState(null);
  const [loading, setLoading] = useState(true);

  const navigation = useNavigation(); // Get navigation object
  const router = useRouter();

  const handlePress = () => {
    if (friends) {
      router.push({ pathname: "/tab/Challenge/challenges" });
    }
  };

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
      <View
        style={[
          styles.container,
          name === "Taralyn" && { backgroundColor: "#f2f2f2" }, // Light grey for id === 1
        ]}
      >
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
            <Text style={styles.xpText}>
              {totalXp !== null ? `${totalXp} XP` : "No XP"}
            </Text>
          </View>
        </View>

        {/* Dynamic Button */}
        <TouchableOpacity style={styles.button} onPress={handlePress}>
          {friends ? (
            <>
              <Icon
                name="paper-plane-outline"
                size={14}
                color="#509B9B"
                style={styles.icon}
              />
              <Text style={styles.buttonText}>Challenge</Text>
            </>
          ) : (
            <>
              <Icon
                name="person-add-outline"
                size={14}
                color="#509B9B"
                style={styles.icon}
              />
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
    backgroundColor: "rgba(0,0,0,0)", // Default background
    width: "100%", // Ensures the container spans the full width
    paddingVertical: 12, // Optional: Add padding for better spacing
    paddingRight: 6, // Add padding to the right of the container
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
    flexDirection: "row",
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
    marginLeft: 2,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  icon: {
    marginRight: 5,
  },
  divider: {
    height: 1,
    backgroundColor: "#509B9B",
    width: "100%", // Ensures the divider spans the full width
  },
});

export default Profile;
