import { StyleSheet, Text, View } from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import Octicons from "@expo/vector-icons/Octicons";
import Ionicons from "@expo/vector-icons/Ionicons";
import { StatusBar } from "expo-status-bar";
import { Link } from "expo-router";
import TodaysExperience from "@/components/TodaysExperience";
import { useRouter } from "expo-router";

import Theme from "@/assets/theme";

export default function Feed() {
  const router = useRouter();

  const navigateToDetails = () => {
    router.push("/tab/feed/details"); // Directly navigate to the screen
  };
  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <View style={styles.postButton} onTouchEnd={navigateToDetails}>
        {/*<FontAwesome size={32} name="plus" color="black" />*/}
        <TodaysExperience
          name="Solve a Rubik's Cube"
          xp="20"
          photo={require("@/assets/rubiks_cube.jpg")}
          description="Learn how to solve a Rubik’s Cube! Then, challenge your friends"
          //onPress={() => console.log("Go to Rubik's Cube Experience")}
          onPress={() => console.log("Go to Rubik's Cube Experience")}
        />
      </View>
      <View style={styles.skillsContainer}>
        <View style={styles.pair}>
          <View style={styles.problemContainer}>
            <View style={styles.IContainer}>
              <Octicons name="gear" size={24} color="black" />
            </View>
            <Text style={styles.problem}>Problem Solving</Text>
          </View>
          <View style={styles.commContainer}>
            <View style={styles.IContainer}>
              <Ionicons name="chatbubbles-outline" size={24} color="black" />
            </View>
            <Text style={styles.comm}>Communication</Text>
          </View>
        </View>

        <View style={styles.pair}>
          <View style={styles.leadershipContainer}>
            <View style={styles.IContainer}>
              <Octicons name="graph" size={24} color="black" />
            </View>
            <Text style={styles.leadership}>Leadership</Text>
          </View>
          <View style={styles.adaptContainer}>
            <View style={styles.IContainer}>
              <Ionicons
                name="extension-puzzle-outline"
                size={24}
                color="black"
              />
            </View>
            <Text style={styles.adaptability}>Adaptability</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  mainText: {
    color: Theme.colors.textSecondary,
    fontSize: Theme.sizes.textMedium,
  },
  postButtonContainer: {},
  skillsContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 50,
  },
  commContainer: {
    //flex: 1, // Add this
    alignItems: "center",
    justifyContent: "center",
  },
  leadershipContainer: {
    //flex: 1, // Ensure it takes equal space in the row
    alignItems: "center",
    justifyContent: "center",
  },
  adaptContainer: {
    //flex: 1, // Add this to make it align in the same row
    alignItems: "center",
    justifyContent: "center",
  },
  problemContainer: {
    //flex: 1, // Add this
    alignItems: "center",
    justifyContent: "center",
  },
  pair: {
    flexDirection: "row",
    justifyContent: "space-between",
    //justifyContent: "flex-start",
    width: "100%", // Ensure the pair takes full width
  },
  problem: {
    fontSize: 16, // Adjust as needed
    textAlign: "center",
  },
  comm: {
    fontSize: 16, // Adjust as needed
    textAlign: "center",
  },
  leadership: {
    fontSize: 16, // Adjust as needed
    textAlign: "center",
  },
  adaptability: {
    fontSize: 16, // Adjust as needed
    textAlign: "center",
  },
});
