import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, View, Image } from "react-native";
import db from "@/database/db"; // Import your initialized Supabase client

export default function UserList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsers();
  }, []);

  // Fetch users from Supabase
  const fetchUsers = async () => {
    setLoading(true);
    const { data, error } = await db.from("users").select("*");

    if (error) {
      console.error("Error fetching users:", error.message);
    } else {
      setUsers(data);
    }
    setLoading(false);
  };

  // Render a user item
  const renderItem = ({ item }) => (
    <View style={styles.item}>
      {/* Display image if available */}
      {item.ProfilePic ? (
        <Image source={{ uri: item.ProfilePic }} style={styles.image} />
      ) : (
        <View style={styles.placeholderImage} />
      )}
      <View style={styles.textContainer}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.xp}>{item.xp} XP</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {loading ? (
        <Text>Loading...</Text>
      ) : (
        <FlatList
          data={users}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 25, // Makes the image circular
    marginRight: 15,
  },
  placeholderImage: {
    width: 50,
    height: 50,
    borderRadius: 25, // Placeholder as a circle
    backgroundColor: "#ddd",
    marginRight: 15,
  },
  textContainer: {
    flex: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
  },
  xp: {
    fontSize: 16,
    color: "#888",
  },
});

/*import { StyleSheet, Text, View } from "react-native";

export default function NewPost() {
  return (
    <View style={styles.container}>
      <Text style={styles.centerText}>This is the remaining task list</Text>
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
});*/

/*import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, FlatList, ScrollView } from "react-native";
import db from "@/database/db";
//import { supabase } from "@/database/db";
import TodaysExperience from "@/components/TodaysExperience";
import ExperienceCard from "@/components/ExperienceCard";

export default function Three({ navigation }) {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsers();
  }, []);

  // Fetch users from Supabase
  const fetchUsers = async () => {
    setLoading(true);
    const { data, error } = await db.from("users").select("*");

    if (error) {
      console.error("Error fetching users:", error.message);
    } else {
      setUsers(data);
    }
    setLoading(false);
  };
  // Render a user item
  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Text style={styles.name}>{item.name}</Text>
      <Text style={styles.xp}>{item.xp} XP</Text>
    </View>
  );

  return (
    <FlatList
      ListHeaderComponent={
        <>
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
          <Text>placeholder</Text>
        </>
      }
      data={users}
      keyExtractor={(item) => item.id.toString()}
      renderItem={renderItem}
      ListFooterComponent={
        <ExperienceCard
          name="Solve a Rubik's Cube"
          xp="20"
          photo={require("@/assets/rubiks_cube.jpg")}
          onPress={() => console.log("Go to Rubik's Cube Experience")}
        />
      }
      contentContainerStyle={styles.listContainer}
    />
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
  item: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    width: "100%",
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
  },
  xp: {
    fontSize: 16,
    color: "#888",
  },
});
*/

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
