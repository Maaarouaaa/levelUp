import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, FlatList } from "react-native";
import TodaysExperience from "@/components/TodaysExperience";
import ExperienceCard from "@/components/ExperienceCard";
import Profile from "@/components/Profile"; // Import the Profile component

export default function Three({ navigation }) {
  return (
    <FlatList
      // Replace the leaderboard with five Profile components
      ListFooterComponent={
        <View style={styles.profilesContainer}>
          <Profile id='1' ranking="1st" friends={true} />
          <Profile id='2' ranking="2nd" friends={true} />
          <Profile id='3' ranking="3rd" friends={true} />
          <Profile id='4' ranking="4th" friends={true} />
        </View>
      }
      contentContainerStyle={styles.listContainer}
    />
  );
}

const styles = StyleSheet.create({
  listContainer: {
    padding: 16,
    backgroundColor: "rgba(0,0,0,0)",
  },
  centerText: {
    fontSize: 18,
    color: "#000",
    marginBottom: 20,
  },
  profilesContainer: {
    marginTop: 20,
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
