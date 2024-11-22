import { StyleSheet, Text, View, ScrollView, Image } from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import Octicons from "@expo/vector-icons/Octicons";
import Ionicons from "@expo/vector-icons/Ionicons";
import { StatusBar } from "expo-status-bar";
import { useRouter } from "expo-router";
import TodaysExperience from "@/components/TodaysExperience";
import Theme from "@/assets/theme";
import { TouchableOpacity } from "react-native";

export default function Feed() {
  const router = useRouter();

  const detailFromHome = () => {
    router.push("/tab/feed/details");
  };

  const navigateToProblemSolving = () => {
    router.push("/tab/feed/problemS");
  };

  const navigateToCommunication = () => {
    router.push("/tab/feed/communication");
  };

  const navigateToLeadership = () => {
    router.push("/tab/feed/leadership");
  };

  const navigateToAdapt = () => {
    router.push("/tab/feed/adaptability");
  };

  return (
    <View style={styles.container}>
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

        <StatusBar style="light" />

        {/* Today's experience section */}
        <Text style={styles.miniTitle}>Today's experience</Text>
        <View style={styles.postButton} onTouchEnd={detailFromHome}>
          <TodaysExperience
            name="Solve a Rubik's Cube"
            xp="20"
            photo={require("@/assets/rubiks_cube.jpg")}
            description="Learn how to solve a Rubik’s Cube! Then, challenge your friends"
          />
        </View>

        {/* Skills section */}
        <View style={styles.skillsContainer}>
          <Text style={styles.miniTitle}>My skills</Text>
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
            <TouchableOpacity
              style={styles.adaptContainer}
              onPress={navigateToAdapt}
            >
              <View style={styles.aIContainer}>
                <Ionicons
                  name="extension-puzzle-outline"
                  size={24}
                  color="black"
                />
              </View>
              <Text style={styles.adaptability}>Adaptability</Text>
            </TouchableOpacity>
          </View>
        </View>
        
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    backgroundColor: "#fff",
  },
  scrollContainer: {
    flexGrow: 1,
    width: "100%", // Ensure the ScrollView container does not exceed screen width
    paddingBottom: 50, // Add padding at the bottom if needed
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
    color: "#509B9B",
    fontSize: 24,
    fontWeight: "bold",
    paddingTop: 20,
  },
  headerSubtitle: {
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
    alignItems: "center",
    justifyContent: "center",
  },
  miniTitle: {
    fontSize: 17,
    padding: 15,
    alignSelf: 'left',
  },
  postButton: {
    flex: 1,
  },
  skillsContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 80,
    width: "100%", // Ensure container fits the screen width
  },
  commContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  leadershipContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  adaptContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  problemContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  pair: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    margin: 5,
  },
  problem: {
    fontSize: 16,
    textAlign: "center",
    color: "#EE4B2B",
  },
  comm: {
    fontSize: 16,
    textAlign: "center",
    color: "#1F75FE",
  },
  leadership: {
    fontSize: 16,
    textAlign: "center",
    color: "#4F7942",
  },
  adaptability: {
    fontSize: 16,
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



