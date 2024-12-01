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
          .select("id, total_xp, friends") // Including 'friends' column
          .order("total_xp", { ascending: false });

        if (error) {
          console.error("Error fetching leaderboards:", error.message);
          return;
        }

        // Filter friends by 'friends' column being true
        const friendsList = users.filter((user) => user.friends === true);

        // Global list contains all users
        const globalList = users;

        console.log(friendsList)
        console.log(globalList)


        const addRankings = (list) =>
          list.map((user, index) => ({
            id: user.id.toString(),
            ranking: `${index + 1}${["st", "nd", "rd", "th"][Math.min(index, 3)]}`, // Ordinal suffix
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
      profile.id.toLowerCase().includes(searchText.toLowerCase())
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
        placeholder="Search members..."
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
            ranking={profile.ranking}
            totalXP={profile.totalXP}
            isFriend={profile.friends} // Pass 'friends' column value to Profile
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
    fontSize: 16,
    color: "#509B9B",
    zIndex: 1,
  },
  activeText: {
    color: "#fff",
    fontWeight: "bold",
  },
  profilesContainer: {
    padding: 16,
  },
});





/*
  return (
    <View style={styles.container}>
      <Text style={styles.centerText}>This is screen three</Text>
      <TodaysExperience
        name="Solve a Rubik's Cube"
        xp="20"
        photo={require("@/assets/rubiks_cube.jpg")}
        description="Learn how to solve a Rubik’s Cube! Then, challenge your friends"
        onPress={() =>
          navigation.navigate("Details", {
            name: "Solve a Rubik's Cube",
            xp: "20",
            photo: "@/assets/rubiks_cube.jpg",
            description:
              "Learn how to solve a Rubik’s Cube! Then, challenge your friends",
          })
        }
      />
      <View>
        <Text>placeholder</Text>
        {loading ? (
          <Text>Loading users...</Text>
        ) : (
          <FlatList
            data={users}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderItem}
          />
        )}
      </View>
      <ExperienceCard
        name="Solve a Rubik's Cube"
        xp="20"
        photo={require("@/assets/rubiks_cube.jpg")}
        onPress={() => console.log("Go to Rubik's Cube Experience")}
      />
    </View>
  );
*/

/*
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import TodaysExperience from "@/components/TodaysExperience"; 
import ExperienceCard from "@/components/ExperienceCard"; 
import LockedExperience from "@/components/LockedExperience"; 


export default function Three({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.centerText}>This is screen three</Text>
      <TodaysExperience
        name="Solve a Rubik's Cube"
        xp="20"
        photo={require("@/assets/rubiks_cube.jpg")} 
        description="Learn how to solve a Rubik’s Cube! Then, challenge your friends"
        onPress={() => navigation.navigate("Details", {
          name: "Solve a Rubik's Cube",
          xp: "20",
          photo: "@/assets/rubiks_cube.jpg",
          description: "Learn how to solve a Rubik’s Cube! Then, challenge your friends",
        })}
      />
      <View>
        <Text>placeholder</Text>
      </View>
      <ExperienceCard
        name="Solve a Rubik's Cube"
        xp="20"
        photo={require("@/assets/rubiks_cube.jpg")} 
        onPress={() => console.log("Go to Rubik's Cube Experience")}
      />
      <LockedExperience/>
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
    marginBottom: 20, // Add spacing between text and the button
  },
});
*/
