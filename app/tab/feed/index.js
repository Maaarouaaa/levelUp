import { StyleSheet, Text, View, ScrollView, Image } from "react-native";
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
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Level up.</Text>
          <View style={styles.withPic}>
            <View style={styles.headerSubtitle}>
              <Text style={styles.headerText}>Welcome, Varsha!</Text>
              <Text style={styles.xp}>260 Xp</Text>
            </View>
            <Image
              source={require("@/assets/varsha.png")}
              style={styles.image}
            />
          </View>
        </View>
        {/*<ScrollView contentContainerStyle={styles.scrollContainer}>*/}
        <StatusBar style="light" />
        <Text style={styles.miniTitle}>Today's experience</Text>
        <View style={styles.postButton} onTouchEnd={navigateToDetails}>
          <TodaysExperience
            name="Solve a Rubik's Cube"
            xp="20"
            photo={require("@/assets/rubiks_cube.jpg")}
            description="Learn how to solve a Rubik’s Cube! Then, challenge your friends"
            //onPress={() => console.log("Go to Rubik's Cube Experience")}
            //onPress={() => console.log("Go to Rubik's Cube Experience")}
          />
        </View>
        <Text style={styles.miniTitle}>My skills</Text>
        <View style={styles.skillsContainer}>
          <View style={styles.pair}>
            <View style={styles.problemContainer}>
              <View style={styles.pIContainer}>
                <Octicons name="gear" size={24} color="black" />
              </View>
              <Text style={styles.problem}>Problem Solving</Text>
            </View>
            <View style={styles.commContainer}>
              <View style={styles.cIContainer}>
                <Ionicons name="chatbubbles-outline" size={24} color="black" />
              </View>
              <Text style={styles.comm}>Communication</Text>
            </View>
          </View>

          <View style={styles.pair}>
            <View style={styles.leadershipContainer}>
              <View style={styles.lIContainer}>
                <Octicons name="graph" size={24} color="black" />
              </View>
              <Text style={styles.leadership}>Leadership</Text>
            </View>
            <View style={styles.adaptContainer}>
              <View style={styles.aIContainer}>
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
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    //justifyContent: "center",
    justifyContent: "flex-start",
    backgroundColor: "#fff",
  },
  scrollContainer: {
    //flex: 1,
    paddingBottom: 50, // Add padding at the bottom if needed
    width: "100%",
  },
  header: {
    backgroundColor: "#D0E4E4",
    width: "100%",
    height: 150,
    justifyContent: "center",
    alignItems: "center",
    padding: 31,
  },
  headerText: {
    color: "#509B9B", // Set header text color
    fontSize: 24, // Font size for header text
    fontWeight: "bold",
    flexDirection: "column",
    marginTop: 15,
    //alignItems: "center",
    //justifyContent: "center",
  },
  headerSubtitle: {
    //alignItems: "center",
    justifyContent: "flex-start",
    marginRight: 25,
  },
  xp: {
    fontSize: 17,
  },
  image: {
    height: 75,
    width: 75,
    borderRadius: 75,
  },
  withPic: {
    padding: 7,
    flexDirection: "row",
    alignItems: "center", // Align items vertically centered
    justifyContent: "center",
  },
  miniTitle: {
    fontSize: 17,
    padding: 15,
  },
  postButton: {
    flex: 1,
  },
  skillsContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 15,
  },
  commContainer: {
    flex: 1, // Add this
    alignItems: "center",
    justifyContent: "center",
  },
  leadershipContainer: {
    flex: 1, // Ensure it takes equal space in the row
    alignItems: "center",
    justifyContent: "center",
  },
  adaptContainer: {
    flex: 1, // Add this to make it align in the same row
    alignItems: "center",
    justifyContent: "center",
  },
  problemContainer: {
    flex: 1, // Add this
    alignItems: "center",
    justifyContent: "center",
  },
  pair: {
    flexDirection: "row",
    justifyContent: "space-between",
    //justifyContent: "flex-start",
    width: "100%", // Ensure the pair takes full width
    margin: 5,
  },
  problem: {
    fontSize: 16, // Adjust as needed
    textAlign: "center",
    color: "#EE4B2B",
  },
  comm: {
    fontSize: 16, // Adjust as needed
    textAlign: "center",
    color: "#1F75FE",
  },
  leadership: {
    fontSize: 16, // Adjust as needed
    textAlign: "center",
    color: "#4F7942",
  },
  adaptability: {
    fontSize: 16, // Adjust as needed
    textAlign: "center",
    color: "#FFBF00",
  },
  pIContainer: {
    backgroundColor: "#FAA0A0",
    padding: 9,
    borderRadius: 25,
  },
  cIContainer: {
    backgroundColor: "#B9D9EB",
    padding: 9,
    borderRadius: 25,
  },
  lIContainer: {
    backgroundColor: "#AFE1AF",
    padding: 9,
    borderRadius: 25,
  },
  aIContainer: {
    backgroundColor: "#FFFF8F",
    padding: 9,
    borderRadius: 25,
  },
});
