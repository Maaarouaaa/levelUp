import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { useRouter } from "expo-router";
import TodaysExperience from "@/components/TodaysExperience";
import Icon from "react-native-vector-icons/Ionicons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import db from "@/database/db";

export default function Feed() {
  const router = useRouter();
  const [todaysExperience, setTodaysExperience] = useState(null);
  const [totalXp, setTotalXp] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchTodaysExperience = async () => {
    try {
      setLoading(true);

      // Retrieve the stored experience and timestamp
      const storedExperience = await AsyncStorage.getItem("todaysExperience");
      const storedTimestamp = await AsyncStorage.getItem(
        "todaysExperienceTimestamp"
      );

      const currentTimestamp = Date.now(); // Current time in milliseconds

      if (storedExperience && storedTimestamp) {
        const elapsedSeconds =
          (currentTimestamp - parseInt(storedTimestamp)) / 1000;

        if (elapsedSeconds < 1) {
          // If less than 1 second has passed, use the stored experience
          setTodaysExperience(JSON.parse(storedExperience));
          setLoading(false);
          return;
        }
      }

      // Fetch a new task if more than 1 second has passed
      const { data, error } = await db
        .from("tasks")
        .select("id, name, description, skill, locked, done")
        .eq("locked", false)
        .eq("done", false);

      if (error) {
        console.error("Error fetching experience:", error.message);
      } else if (data && data.length > 0) {
        // Pick a random task
        const randomIndex = Math.floor(Math.random() * data.length);
        const experience = data[randomIndex];
        setTodaysExperience(experience);

        // Save the experience and current timestamp
        await AsyncStorage.setItem(
          "todaysExperience",
          JSON.stringify(experience)
        );
        await AsyncStorage.setItem(
          "todaysExperienceTimestamp",
          currentTimestamp.toString()
        );
      } else {
        setTodaysExperience(null); // No matching experiences found
      }
    } catch (err) {
      console.error("Error:", err);
    } finally {
      setLoading(false);
    }
  };

  const fetchTotalXp = async () => {
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
        setTotalXp(data.total_xp);
      }
    } catch (err) {
      console.error("Error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTotalXp();
    fetchTodaysExperience();
  }, []);

  const navigateToDetails = () => {
    if (todaysExperience) {
      router.push({
        pathname: "/tab/feed/details",
        params: { id: todaysExperience.id },
      });
    }
  };

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
                  {loading
                    ? "Loading..."
                    : totalXp !== null
                    ? totalXp
                    : "No Data"}{" "}
                  XP
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
          {loading ? (
            <Text>Loading...</Text>
          ) : todaysExperience ? (
            <TodaysExperience
              id={todaysExperience.id}
              name={todaysExperience.name}
              description={todaysExperience.description}
              onPress={navigateToDetails}
            />
          ) : (
            <Text>No experience available for today.</Text>
          )}
        </View>

        {/* Skills Section */}
        <View style={styles.skillsContainer}>
          <Text style={styles.miniTitle}>My Skills</Text>
          <View style={styles.pair}>
            <TouchableOpacity onPress={() => router.push("/tab/feed/problemS")}>
              <Image
                source={require("@/assets/probIcon.png")}
                style={styles.skillIcon}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => router.push("/tab/feed/communication")}
            >
              <Image
                source={require("@/assets/commIcon.png")}
                style={styles.skillIcon}
              />
            </TouchableOpacity>
          </View>

          <View style={styles.pair}>
            <TouchableOpacity
              onPress={() => router.push("/tab/feed/leadership")}
            >
              <Image
                source={require("@/assets/Leadicon.png")}
                style={styles.skillIcon}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => router.push("/tab/feed/adaptability")}
            >
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
    height: "30%",
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
  },
  headerLogo: {
    marginTop: 45,
    width: "45%",
    height: "45%",
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
    width: 500,
    fontWeight: 200,
    fontFamily: "Poppins-SemiBold",
    marginBottom: 5,
    marginTop: -12,
  },
  xpRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: -8,
  },
  xp: {
    fontSize: 16,
    fontFamily: "Poppins-Regular",
    marginLeft: 5,
    marginTop: 2,
  },
  pair: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "70%",
    marginVertical: 10,
    marginTop: 5,
  },
  image: {
    height: 55,
    width: 55,
    borderRadius: 50,
    marginLeft: 20,
    marginTop: -10,
  },
  skillsContainer: {
    flex: 1,
    alignItems: "center",
    width: "100%",
  },
  miniTitle: {
    fontSize: 18,
    padding: 12,
    paddingBottom: 8,
    paddingLeft: 20,
    alignSelf: "flex-start",
    fontFamily: "Poppins-Regular",
  },
  skillIcon: {
    width: 80,
    height: 80,
    marginBottom: 4,
  },
});
