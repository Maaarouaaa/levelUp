import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import db from "@/database/db"; // Ensure this points to your database setup
import Profile from "@/components/Profile";

export default function Three() {
  const [searchText, setSearchText] = useState("");
  const [isToggled, setIsToggled] = useState(false);
  const [friendsProfiles, setFriendsProfiles] = useState([]);
  const [globalProfiles, setGlobalProfiles] = useState([]);

  const handleToggle = () => {
    setIsToggled((prev) => !prev);
  };

  useEffect(() => {
    const fetchLeaderboards = async () => {
      try {
        // Fetch all users ordered by total_xp in descending order, including 'friends' column
        const { data: users, error } = await db
          .from("users")
          .select("id, name, total_xp, friends") // Including 'name' column for search
          .order("total_xp", { ascending: false });

        if (error) {
          console.error("Error fetching leaderboards:", error.message);
          return;
        }

        // Filter friends by 'friends' column being true
        const friendsList = users.filter((user) => user.friends === true);

        // Global list contains all users
        const globalList = users;

        const addRankings = (list) =>
          list.map((user, index) => ({
            id: user.id.toString(),
            name: user.name || "Unknown", // Use 'name' for display
            ranking: `${index + 1}${["st", "nd", "rd", "th"][Math.min(index, 3)]}`, // Ordinal suffix
            totalXP: user.total_xp,
            friends: user.friends, // Pass 'friends' value to the Profile
          }));

        setFriendsProfiles(addRankings(friendsList));
        setGlobalProfiles(addRankings(globalList));
      } catch (error) {
        console.error("Unexpected error fetching leaderboards:", error.message);
      }
    };

    fetchLeaderboards();
  }, []);

 // Filter profiles by search text
const filteredProfiles = (profiles) =>
profiles.filter((profile) =>
  profile.name?.toLowerCase().includes(searchText.toLowerCase())
);


  // Profiles to display based on toggle
  const profilesToDisplay = isToggled
    ? filteredProfiles(globalProfiles)
    : filteredProfiles(friendsProfiles);

  return (
    <View style={styles.container}>
      {/* Blue Background */}
      <View style={styles.blueBackground}>
        <Text style={styles.headerText}>Leaderboard</Text>
      </View>

      {/* Search Bar */}
      <TextInput
        style={styles.searchBar}
        placeholder="Search members by name..."
        placeholderTextColor="#aaa"
        value={searchText}
        onChangeText={setSearchText}
      />

      {/* Toggle */}
      <View style={styles.toggleWrapper}>
        <TouchableOpacity style={styles.toggleContainer} onPress={handleToggle}>
          <View
            style={[
              styles.toggleIndicator,
              isToggled ? styles.toggleRight : styles.toggleLeft,
            ]}
          />
          <Text style={[styles.toggleText, !isToggled && styles.activeText]}>
            Friends
          </Text>
          <Text style={[styles.toggleText, isToggled && styles.activeText]}>
            Global
          </Text>
        </TouchableOpacity>
      </View>

      {/* Profiles */}
      <ScrollView contentContainerStyle={styles.profilesContainer}>
        {profilesToDisplay.map((profile) => (
          <Profile
            key={profile.id}
            id={profile.id}
            name={profile.name}
            ranking={profile.ranking}
            totalXP={profile.totalXP}
            friends={friendsProfiles.some((friend) => friend.id === profile.id)} // Use friendsProfiles state for the check
          />
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  blueBackground: {
    height: "18%",
    backgroundColor: "rgba(80, 155, 155, .27)",
    justifyContent: "center",
    alignItems: "center",
  },
  headerText: {
    fontFamily: "Poppins-Bold",
    fontSize: 40,
    color: "#509B9B",
    fontWeight: "bold",
  },
  searchBar: {
    position: "absolute",
    top: "15%",
    alignSelf: "center",
    height: 40,
    width: "80%",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 10,
    backgroundColor: "#fff",
    color: "#000",
    fontFamily: "Poppins-Regular",
  },
  toggleWrapper: {
    alignItems: "center",
    marginVertical: 30,
  },
  toggleContainer: {
    position: "relative",
    backgroundColor: "#fff",
    borderRadius: 20,
    width: 200,
    height: 40,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 8,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  toggleIndicator: {
    position: "absolute",
    width: 100,
    height: 32,
    backgroundColor: "#509B9B",
    borderRadius: 16,
    elevation: 2,
  },
  toggleLeft: {
    left: 4,
  },
  toggleRight: {
    right: 4,
  },
  toggleText: {
    fontFamily: "Poppins-SemiBold",
    fontSize: 15,
    color: "#509B9B",
    zIndex: 1,
    paddingHorizontal: 18,
  },
  activeText: {
    color: "#fff",
    fontFamily: "Poppins-SemiBold",
    fontWeight: "bold",
  },
  profilesContainer: {
    padding: 16,
  },
});
