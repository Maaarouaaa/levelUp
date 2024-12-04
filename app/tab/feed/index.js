import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView } from "react-native";
import { StatusBar } from "expo-status-bar";
import { useRouter } from "expo-router";
import TodaysExperience from "@/components/TodaysExperience";
import Icon from "react-native-vector-icons/Ionicons";
import db from "@/database/db";

export default function Feed() {
  const id = 1;
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
        const { data, error } = await db
          .from("users")
          .select("total_xp")
          .eq("id", 1)
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
          <Image
            source={require("@/assets/level Up. (3).png")} 
            style={styles.headerLogo}
            resizeMode="contain"
          />
          <View style={styles.bottomHalf}>
            <View style={styles.headerSubtitle}>
              <Text style={styles.welcomeText}>Welcome, Taralyn!</Text>
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
        <Text style={styles.miniTitle}>Today's Experience</Text>
        <View style={styles.postButton}>
          <TodaysExperience id={id} onPress={navigateToDetails} />
        </View>

        {/* Skills Section */}
        <View style={styles.skillsContainer}>
          <Text style={styles.miniTitle}>My Skills</Text>
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
    paddingBottom: 50,
  },
  header: {
    backgroundColor: "#D0E4E4",
    width: "100%",
    height: "25%",
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
  },
  headerLogo: {
    paddingTop: 10,
    width: "50%",
    height: "50%",
  },
  bottomHalf: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "90%",
    paddingBottom: 10,
  },
  headerSubtitle: {
    flex: 1,
    justifyContent: "flex-start",
    marginRight: 20, 
  },
  welcomeText: {
    color: "#509B9B",
    fontSize: 24,
    fontWeight: "bold",
    fontFamily: "Poppins",
    marginBottom: 5, 
  },
  xpRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  xp: {
    fontSize: 17,
    fontFamily: "Poppins",
    marginLeft: 5, 
  },
  pair: {
    flexDirection: "row", 
    justifyContent: "space-between", 
    width: "70%", 
    marginVertical: 10, 
  },  
  image: {
    height: 55, 
    width: 55, 
    borderRadius: 50,
    marginLeft: 20, 
  },
  skillsContainer: {
    flex: 1,
    alignItems: "center",
    width: "100%",
  },
  miniTitle: {
    fontSize: 18,
    padding: 12,
    paddingLeft: 20,
    alignSelf: "flex-start",
    fontFamily: "Poppins",
  },
  skillIcon: {
    width: 80,
    height: 80,
    marginBottom: 4,
  },
});
