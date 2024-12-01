import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { useRouter } from "expo-router";
import db from "@/database/db";

export default function Profile() {
  const router = useRouter();

  const navigateToProgress = () => {
    router.push("/tab/Profile/myProgress");
  };

  const [skillData, setSkillData] = useState({
    problem_solving_xp: 0,
    communication_xp: 0,
    leadership_xp: 0,
    adaptability_xp: 0,
    total_xp: 0,
  });

  const [completedExperiences, setCompletedExperiences] = useState(0); // State for experiences
  const [loading, setLoading] = useState(true);

  const fetchCompletedExperiences = async () => {
    try {
      const { data, error } = await db
        .from("tasks") // Use the tasks table
        .select("done") // Select the `done` column
        .eq("done", true); // Filter for tasks where `done` is TRUE

      if (error) {
        console.error("Error fetching completed experiences:", error.message);
      } else {
        // Update the experience counter with the number of completed tasks
        setCompletedExperiences(data.length);
      }
    } catch (err) {
      console.error("Error:", err);
    }
  };

  useEffect(() => {
    const fetchSkillData = async () => {
      try {
        setLoading(true);

        const { data, error } = await db
          .from("users")
          .select(
            `"problem solving_xp", communication_xp, leadership_xp, adaptability_xp, total_xp`
          )
          .eq("id", 1) // Replace with the correct user ID
          .single();

        if (error) {
          console.error("Error fetching skill data:", error.message);
        } else if (data) {
          setSkillData({
            problem_solving_xp: data["problem solving_xp"],
            communication_xp: data.communication_xp,
            leadership_xp: data.leadership_xp,
            adaptability_xp: data.adaptability_xp,
            total_xp: data.total_xp,
          });
        }
      } catch (err) {
        console.error("Error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchSkillData();
    fetchCompletedExperiences(); // Fetch completed experiences
  }, []);

  return (
    <View style={styles.container}>
      {/* Header Background */}
      <View style={styles.headerBackground}></View>

      {/* Back Arrow */}
      <Icon name="arrow-back" size={24} style={styles.backArrow} color="#838383" />

      {/* Header Title */}
      <Text style={styles.headerTitle}>Profile</Text>

      {/* Profile Picture */}
      <View style={styles.profilePictureContainer}>
        <Image
          source={require("@/assets/taralyn-profilepic.jpeg")}
          style={styles.profilePicture}
        />
      </View>

      {/* Name and Member Info */}
      <Text style={styles.profileName}>Taralyn Nguyen</Text>
      <Text style={styles.memberInfo}>Member since June 2024</Text>

      {/* XP and Stats */}
      <View style={styles.statsContainer}>
        {/* Lifetime XP */}
        <View style={styles.statBox}>
          <Image
            source={require("@/assets/star-profilepage.png")}
            style={styles.statIcon}
          />
          <Text style={styles.statNumber}>
            {loading ? "Loading..." : skillData.total_xp !== null ? skillData.total_xp : "No Data"}
          </Text>
          <Text style={styles.statLabel}>Total XP</Text>
        </View>

        {/* Friends */}
        <View style={styles.statBox}>
          <Image
            source={require("@/assets/user-profilepage.png")}
            style={styles.statIcon}
          />
          <Text style={styles.statNumber}>13</Text>
          <Text style={styles.statLabel}>Friends</Text>
        </View>

        {/* Experiences */}
        <View style={styles.statBox}>
          <Image
            source={require("@/assets/completed-profilepage.png")}
            style={styles.statIcon}
          />
          <Text style={styles.statNumber}>
            {loading ? "Loading..." : completedExperiences}
          </Text>
          <Text style={styles.statLabel}>Experiences</Text>
        </View>
      </View>

      {/* Skills Section */}
      <View style={styles.skillsContainer}>
        <Text style={styles.skillsHeading}>My skills</Text>
        <View style={styles.skillsRow}>
          <SkillBar
            skillName="Problem Solving"
            currentXP={skillData.problem_solving_xp}
            maxXP={500}
            color="#FF8460"
          />
          <SkillBar
            skillName="Communication"
            currentXP={skillData.communication_xp}
            maxXP={500}
            color="#4CA8FF"
          />
        </View>
        <View style={styles.skillsRow}>
          <SkillBar
            skillName="Adaptability"
            currentXP={skillData.adaptability_xp}
            maxXP={500}
            color="#FFAB45"
          />
          <SkillBar
            skillName="Leadership"
            currentXP={skillData.leadership_xp}
            maxXP={500}
            color="#6CE7C9"
          />
        </View>
      </View>

      {/* Buttons Section */}
      <View style={styles.buttonsContainer}>
        {/* My Progress Button */}
        <TouchableOpacity style={styles.button} onPress={navigateToProgress}>
          <Image
            source={require("@/assets/Myprogress-profilepage.png")}
            style={styles.buttonImage}
          />
        </TouchableOpacity>

        {/* My Friends Button */}
        <TouchableOpacity style={styles.button}>
          <Image
            source={require("@/assets/Myfriends-profilepage.png")}
            style={styles.buttonImage}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

// SkillBar Component
const SkillBar = ({ skillName, currentXP, maxXP, color }) => {
  const barWidth = `${(currentXP / maxXP) * 100}%`; // Dynamically calculate bar width based on XP

  return (
    <View style={styles.skillContainer}>
      <Text style={[styles.skillName, { color }]}>{skillName}</Text>
      <View style={styles.progressBar}>
        <View
          style={[styles.progress, { width: barWidth, backgroundColor: color }]}
        />
      </View>
      <Text
        style={[styles.xpText, { color }]}
      >{`${currentXP}/${maxXP} XP`}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  // Keep all your original styles intact here...
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    position: "relative",
  },
  headerBackground: {
    position: "absolute",
    width: "100%",
    height: "24.5%",
    backgroundColor: "rgba(80, 155, 155, 0.27)",
  },
  backArrow: {
    position: "absolute",
    top: 40,
    left: 16,
  },
  headerTitle: {
    position: "absolute",
    top: 40,
    left: "37%",
    fontFamily: "Poppins",
    fontWeight: "700",
    fontSize: 30,
    color: "#509B9B",
  },
  profilePictureContainer: {
    position: "absolute",
    top: "14%",
    left: "30%",
    width: 130,
    height: 130,
    borderRadius: 100,
    overflow: "hidden",
    backgroundColor: "#E0E0E0",
  },
  profilePicture: {
    width: "100%",
    height: "100%",
    borderRadius: 60,
  },
  profileName: {
    position: "absolute",
    top: "38%",
    width: "100%",
    textAlign: "center",
    fontFamily: "Poppins",
    fontWeight: "700",
    fontSize: 22,
    color: "#509B9B",
  },
  memberInfo: {
    position: "absolute",
    top: "42.5%",
    width: "100%",
    textAlign: "center",
    fontFamily: "Poppins",
    fontWeight: "400",
    fontSize: 14,
    color: "rgba(75, 75, 75, 0.8)",
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    position: "absolute",
    top: "48%",
    width: "100%",
    paddingHorizontal: 20,
  },
  statBox: {
    alignItems: "center",
  },
  statIcon: {
    marginBottom: 5,
  },
  statNumber: {
    fontFamily: "Poppins",
    fontWeight: "400",
    fontSize: 18,
    color: "#000000",
  },
  statLabel: {
    fontFamily: "Poppins",
    fontSize: 12,
    fontWeight: "400",
    color: "#000000",
  },
  skillsHeading: {
    marginTop: "100%",
    fontFamily: "Poppins",
    fontWeight: "400",
    fontSize: 16,
    color: "#000000",
    marginVertical: 10,
    textAlign: "left",
    paddingLeft: 25,
  },
  skillsRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    flexWrap: "wrap",
    paddingHorizontal: 20,
  },
  skillContainer: {
    marginVertical: 7,
    width: "43%",
  },
  skillName: {
    fontFamily: "Poppins",
    fontWeight: "700",
    fontSize: 12,
    marginBottom: 5,
  },
  progressBar: {
    height: 15,
    width: "100%",
    backgroundColor: "#E0E0E0",
    borderRadius: 10,
    overflow: "hidden",
  },
  progress: {
    height: "100%",
    borderRadius: 10,
  },
  xpText: {
    fontFamily: "Poppins",
    fontWeight: "400",
    fontSize: 12,
    marginTop: 5,
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 15,
  },
  button: {
    width: 200,
    height: 50,
  },
  buttonImage: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },
});
