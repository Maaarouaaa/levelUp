import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView } from "react-native";
import { StatusBar } from "expo-status-bar";
import { useRouter } from "expo-router";
import TodaysExperience from "@/components/TodaysExperience";

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
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerText}>Level up.</Text>
          <View style={styles.withPic}>
            <View style={styles.headerSubtitle}>
              <Text style={styles.headerText}>Welcome, Varsha!</Text>
              <Text style={styles.xp}>260 Xp</Text>
            </View>
            <Image
              source={require("@/assets/varshapic-profilepage.png")}
              style={styles.image}
            />
          </View>
        </View>

        <StatusBar style="light" />

        {/* Today's Experience Section */}
        <Text style={styles.miniTitle}>Today's experience</Text>
        <View style={styles.postButton} onTouchEnd={detailFromHome}>
          <TodaysExperience
            name="Solve a Rubik's Cube"
            xp="20"
            photo={require("@/assets/rubiks_cube.jpg")}
            description="Learn how to solve a Rubik’s Cube! Then, challenge your friends"
          />
        </View>

        {/* Skills Section */}
        <View style={styles.skillsContainer}>
          <Text style={styles.miniTitle}>My skills</Text>
          <View style={styles.pair}>
            <TouchableOpacity onPress={navigateToProblemSolving}>
              <Image
                source={require("@/assets/probIcon.png")}
                style={styles.skillIcon}
              />
            </TouchableOpacity>

            <TouchableOpacity onPress={navigateToCommunication}>
              <Image
                source={require("@/assets/commIcon.png")}
                style={styles.skillIcon}
              />
            </TouchableOpacity>
          </View>

          <View style={styles.pair}>
            <TouchableOpacity onPress={navigateToLeadership}>
              <Image
                source={require("@/assets/Leadicon.png")}
                style={styles.skillIcon}
              />
            </TouchableOpacity>

            <TouchableOpacity onPress={navigateToAdapt}>
              <Image
                source={require("@/assets/AdaptIcon.png")}
                style={styles.skillIcon}
              />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scrollContainer: {
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    paddingBottom: 50, // Extra padding for scrollable content
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
    alignSelf: "flex-start",
  },
  postButton: {
    flex: 1,
    width: "90%",
  },
  skillsContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 30,
    width: "100%",
  },
  pair: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "62%",
    marginVertical: 10,
  },
  skillIcon: {
    width: 60,
    height: 60,
    marginBottom: 4,
  },
  skillText: {
    fontSize: 16,
    textAlign: "center",
    color: "#333",
  },
});
