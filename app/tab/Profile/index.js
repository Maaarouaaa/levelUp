import React, { useState, useCallback } from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity, Dimensions } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { useRouter } from "expo-router";
import { useFocusEffect } from "@react-navigation/native"; // Import useFocusEffect
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

  const [completedExperiences, setCompletedExperiences] = useState(0);
  const [loading, setLoading] = useState(true);

  useFocusEffect(
    useCallback(() => {
      const fetchSkillData = async () => {
        try {
          setLoading(true);
          const { data, error } = await db
            .from("users")
            .select(
              `"problem solving_xp", communication_xp, leadership_xp, adaptability_xp, total_xp`
            )
            .eq("id", 1) // Replace with correct user ID
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

      const fetchCompletedExperiences = async () => {
        try {
          const { data, error } = await db
            .from("tasks")
            .select("done")
            .eq("done", true);

          if (error) {
            console.error("Error fetching completed experiences:", error.message);
          } else {
            setCompletedExperiences(data.length);
          }
        } catch (err) {
          console.error("Error:", err);
        }
      };

      fetchSkillData();
      fetchCompletedExperiences();
    }, []) // Empty dependency array ensures this runs only on focus
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Profile</Text>
      </View>

      {/* Profile Section */}
      <View style={styles.profileSection}>
        <Image
          source={require("@/assets/taralyn-profilepic.jpeg")}
          style={styles.profilePicture}
        />
        <Text style={styles.profileName}>Taralyn Nguyen</Text>
        <Text style={styles.memberInfo}>Member since December 2024</Text>
      </View>

      {/* Stats Section */}
      <View style={styles.statsContainer}>
        {[
          {
            icon: <Icon name="star" size={24} color="#509B9B" />,
            number: loading ? "..." : skillData.total_xp || "No Data",
            label: "Total XP",
          },
          {
            icon: <Icon name="checkmark-done-circle" size={24} color="#509B9B" />,
            number: loading ? "..." : completedExperiences,
            label: "Experiences",
          },
          {
            icon: <Icon name="people" size={24} color="#509B9B" />,
            number: 13,
            label: "Friends",
          },
        ].map((stat, index) => (
          <View key={index} style={styles.statBox}>
            {stat.icon}
            <Text style={styles.statNumber}>{stat.number}</Text>
            <Text style={styles.statLabel}>{stat.label}</Text>
          </View>
        ))}
      </View>

      {/* Skills Section */}
      <View style={styles.skillsContainer}>
        <Text style={styles.skillsHeading}>My Skills</Text>
        <View style={styles.skillsGrid}>
          {[
            {
              skillName: "Problem Solving",
              currentXP: skillData.problem_solving_xp,
              maxXP: 500,
              color: "#FF8460",
            },
            {
              skillName: "Communication",
              currentXP: skillData.communication_xp,
              maxXP: 500,
              color: "#4CA8FF",
            },
            {
              skillName: "Adaptability",
              currentXP: skillData.adaptability_xp,
              maxXP: 500,
              color: "#FFAB45",
            },
            {
              skillName: "Leadership",
              currentXP: skillData.leadership_xp,
              maxXP: 500,
              color: "#6CE7C9",
            },
          ].map((skill, index) => (
            <SkillBar key={index} {...skill} />
          ))}
        </View>
      </View>

      {/* Buttons Section */}
      <View style={styles.buttonsContainer}>
        <TouchableOpacity style={styles.button} onPress={navigateToProgress}>
          <Icon name="stats-chart" size={16} color="#509B9B" />
          <Text style={styles.buttonText}>My Progress</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Icon name="people-circle" size={18} color="#509B9B" />
          <Text style={styles.buttonText}>My Friends</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

// SkillBar Component
const SkillBar = ({ skillName, currentXP, maxXP, color }) => {
  const barWidth = `${(currentXP / maxXP) * 100}%`;

  return (
    <View style={styles.skillBox}>
      <Text style={[styles.skillName, { color }]}>{skillName}</Text>
      <View style={styles.progressBar}>
        <View
          style={[styles.progress, { width: barWidth, backgroundColor: color }]}
        />
      </View>
      <Text style={[styles.xpText, { color }]}>
        {`${currentXP}/${maxXP} XP`}
      </Text>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  header: {
    height: "20%", // Header height as 20% of the screen height
    backgroundColor: "rgba(80, 155, 155, 0.27)",
    justifyContent: "center",
    alignItems: "center",
  },
  headerTitle: {
    fontFamily: "Poppins",
    fontSize: Dimensions.get("window").width * 0.08, // Font size relative to screen width
    fontWeight: "700",
    color: "#509B9B",
  },
  profileSection: {
    alignItems: "center",
    marginTop: "-10%", // Pull profile picture upwards relative to header
    marginBottom: "-3%", 
    zIndex: 1, 
  },
  profilePicture: {
    height: Dimensions.get("window").width * 0.3, // Profile picture as 30% of screen width
    width: Dimensions.get("window").width * 0.3,
    borderRadius: Dimensions.get("window").width * 0.15, // Circular profile picture
    marginBottom: "3%",
  },
  profileName: {
    fontFamily: "Poppins",
    fontSize: Dimensions.get("window").width * 0.07, // Relative font size
    fontWeight: "700",
    color: "#509B9B",
  },
  memberInfo: {
    fontFamily: "Poppins",
    fontSize: Dimensions.get("window").width * 0.04,
    color: "#4B4B4B",
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: "5%",
    marginBottom: "5%",
  },
  statBox: {
    alignItems: "center",
  },
  statNumber: {
    fontFamily: "Poppins",
    fontSize: Dimensions.get("window").width * 0.05,
    fontWeight: "600",
    marginVertical: "2%",
  },
  statLabel: {
    fontFamily: "Poppins",
    fontSize: Dimensions.get("window").width * 0.035,
  },
  skillsContainer: {
    marginBottom: "5%",
    marginHorizontal: "5%",
  },
  skillsHeading: {
    fontFamily: "Poppins",
    fontSize: Dimensions.get("window").width * 0.045,
    fontWeight: "600",
    marginBottom: "2%",
  },
  skillsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  skillBox: {
    width: "48%", // Skill box takes 48% of the row width
    marginBottom: "5%",
  },
  skillName: {
    fontFamily: "Poppins",
    fontSize: Dimensions.get("window").width * 0.035,
    fontWeight: "700",
    marginBottom: "2%",
  },
  progressBar: {
    height: Dimensions.get("window").height * 0.01,
    backgroundColor: "#E0E0E0",
    borderRadius: 20,
    overflow: "hidden",
    elevation: 5,
  },
  progress: {
    height: "100%",
  },
  xpText: {
    fontFamily: "Poppins",
    fontSize: Dimensions.get("window").width * 0.035,
    marginTop: "2%",
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: "2%",
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    width: "40%", // Button width is 40% of the row width
    height: Dimensions.get("window").height * 0.05,
    paddingVertical: "1%",
    paddingHorizontal: "3%",
    borderRadius: 8,
    borderColor: "#509B9B",
    borderWidth: 1,
    justifyContent: "center",
  },
  buttonText: {
    fontFamily: "Poppins",
    fontSize: Dimensions.get("window").width * 0.035,
    color: "#509B9B",
    fontWeight: "bold",
    marginLeft: "2%",
  },
});
