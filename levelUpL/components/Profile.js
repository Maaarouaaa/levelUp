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

const Profile = ({ id, ranking, friends: initialFriends }) => {
  const [photo, setPhoto] = useState(null);
  const [name, setName] = useState(null);
  const [totalXp, setTotalXp] = useState(null);
  const [loading, setLoading] = useState(true);
  const [friends, setFriends] = useState(initialFriends ? "challenge" : false);
  const [undoAvailable, setUndoAvailable] = useState(false);
  const [countdown, setCountdown] = useState(4); // Countdown state
  const [timer, setTimer] = useState(null);

  const navigation = useNavigation();
  const router = useRouter();

  const handlePress = () => {
    if (friends === "challenge") {
      router.push({ pathname: "/tab/leaderBoard/challenges" });
    } else {
      setFriends(true); // Temporary state
      setUndoAvailable(true);
      setCountdown(4);

      // Update the database to set friends = true for this user
      db.from("users")
        .update({ friends: true })
        .eq("id", id)
        .then(({ error }) => {
          if (error) console.error("Error updating friends status:", error);
        });

      // Start a countdown timer
      const newTimer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(newTimer);
            setUndoAvailable(false);
            setFriends("challenge"); // Final state
          }
          return prev - 1;
        });
      }, 1000);

      setTimer(newTimer);
    }
  };

  const handleUndo = () => {
    clearInterval(timer);
    setFriends(false);
    setUndoAvailable(false);
    setCountdown(4); // Reset countdown

    // Revert the database change
    db.from("users")
      .update({ friends: false })
      .eq("id", id)
      .then(({ error }) => {
        if (error) console.error("Error reverting friends status:", error);
      });
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
      <View style={[styles.container]}>
        <Text style={styles.ranking}>{ranking}</Text>

        <Image
          source={photo ? { uri: photo } : require("@/assets/rubiks_cube.jpg")}
          style={styles.profilePicture}
        />

        <View style={styles.infoContainer}>
          <Text style={styles.name}>{name || "No Name"}</Text>
          <View style={styles.xpRow}>
            <Icon name="star" size={16} color="#509B9B" />
            <Text style={styles.xpText}>
              {totalXp !== null ? `${totalXp} XP` : "No XP"}
            </Text>
          </View>
        </View>

        <TouchableOpacity
          style={[
            styles.button,
            friends === true && styles.friendsButton,
          ]}
          onPress={friends === true ? handleUndo : handlePress}
        >
          {friends === true ? (
            <>
              <Icon
                name="checkmark-outline"
                size={14}
                color="white"
                style={styles.icon}
              />
              <Text style={[styles.buttonText, { color: "white" }]}>Friends</Text>
            </>
          ) : friends === "challenge" ? (
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

      {undoAvailable && (
        <TouchableOpacity style={styles.undoButton} onPress={handleUndo}>
          <Text style={styles.undoText}>
            Undo ({countdown})
          </Text>
        </TouchableOpacity>
      )}

      <View style={styles.divider} />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0)",
    width: "100%",
    paddingVertical: 12,
    paddingRight: 6,
  },
  ranking: {
    fontSize: 20,
    color: "#333",
    paddingRight: 10,
    textAlign: "center",
    width: 50,
    fontFamily: "Poppins-Regular",
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
    fontSize: 18,
    color: "#333",
    fontFamily: "Poppins-SemiBold",
  },
  xpRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 4,
  },
  xpText: {
    fontSize: 14,
    color: "#000",
    marginLeft: 2,
    fontFamily: "Poppins-Regular",
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
  friendsButton: {
    backgroundColor: "#509B9B",
    borderColor: "#509B9B",
  },
  buttonText: {
    fontSize: 12,
    color: "#509B9B",
    fontWeight: "bold",
    marginLeft: 2,
    fontFamily: "Poppins-SemiBold",
  },
  undoButton: {
    width: 180,
    alignItems: "center",
    alignSelf: "center",
    marginVertical: 4,
    marginTop: -4,
    padding: 4,
    borderRadius: 5,
    backgroundColor: "#f2f2f2",
    borderColor: "#509B9B",
    borderWidth: 1,
  },
  undoText: {
    color: "#509B9B",
    fontSize: 14,
    fontFamily: "Poppins-SemiBold",
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
    width: "100%",
  },
});

export default Profile;



