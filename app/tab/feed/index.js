import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView } from "react-native";
import { StatusBar } from "expo-status-bar";
import { useRouter } from "expo-router";
import TodaysExperience from "@/components/TodaysExperience";
import Icon from "react-native-vector-icons/Ionicons";
import db from "@/database/db";

export default function Feed() {
  //const id = Math.floor(Math.random() * 41)
  const id = 1
  const router = useRouter();
  const navigateToDetails = () => {
    router.push({ pathname: "/tab/feed/details", params: { id: id } });
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


  const [total_xp, set_total_xp] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch_total_xp = async () => {
      try {
        setLoading(true);
        // Query the database for total XP
        const { data, error } = await db
          .from("users")
          .select("total_xp")
          .eq("id", 1) // Replace with your logic for user ID
          .single();

        if (error) {
          console.error("Error fetching total xp:", error.message);
        } else if (data) {
          set_total_xp(data.total_xp);
        }
      } catch (err) {
        console.error("Error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetch_total_xp();
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerText}>Level up.</Text>
          <View style={styles.withPic}>
            <View style={styles.headerSubtitle}>
              <Text style={styles.headerText}>Welcome, Taralyn!</Text>
              <View style={styles.xpRow}>
                <Icon name="star" size={20} color="#509B9B" />
                <Text style={styles.xp}>
                  {loading ? "Loading..." : total_xp !== null ? total_xp : "No Data"} XP
                </Text>
              </View>

            </View>
            <Image
              source={require("@/assets/taralyn-profilepic.jpeg")}
              style={styles.image}
            />
          </View>
        </View>

        <StatusBar style="light" />

        {/* Today's Experience Section */}
        <Text style={styles.miniTitle}>Today's experience</Text>
        <View style={styles.postButton}>
          <TodaysExperience
            id= {id}
            onPress= {navigateToDetails}
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
  xpRow: {
    flexDirection: "row",
    alignItems: "center",
  },
});
