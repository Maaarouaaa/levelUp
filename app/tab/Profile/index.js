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
        <Text style={styles.memberInfo}>Member since November 2024</Text>
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
            number: 5,
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
    height: "22%", // Set header to 22% of screen height
    backgroundColor: "rgba(80, 155, 155, 0.27)",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  headerTitle: {
    fontFamily: "Poppins-Bold",
    fontSize: 40,
    color: "#509B9B",
  },
  profileSection: {
    alignItems: "center",
    marginTop: -50, // Pull the profile picture upwards to overlap the header
    marginBottom: -15,
    zIndex: 1, // Ensure the profile picture stays on top
  },
  profilePicture: {
    height: 120,
    width: 120,
    borderRadius: 60,
    marginBottom: 10,
  },
  profileName: {
    fontFamily: "Poppins",
    fontSize: 28,
    fontWeight: "700",
    color: "#509B9B",
  },
  memberInfo: {
    fontFamily: "Poppins",
    fontSize: 16,
    color: "#4B4B4B",
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 30,
    marginBottom: 20,
  },
  statBox: {
    alignItems: "center",
  },
  statNumber: {
    fontFamily: "Poppins",
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 3,
    marginTop: 3,
  },
  statLabel: {
    fontFamily: "Poppins",
    fontSize: 16,
    marginTop: -2,
  },
  skillsContainer: {
    marginBottom: 20,
    marginHorizontal: 30,
  },
  skillsHeading: {
    fontFamily: "Poppins-Regular",
    fontSize: 20,
    fontWeight: "600",
    marginTop: 5,
    fontColor: "rgba(0,0,0,0')",
  },
  skillsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  skillBox: {
    width: "48%",
    marginBottom: 10,
    marginTop: 10,
  },
  skillName: {
    fontFamily: "Poppins",
    fontSize: 14,
    fontWeight: "700",
    marginBottom: 5,
  },
  progressBar: {
    height: 25,
    backgroundColor: "#E0E0E0",
    borderRadius: 20,
    overflow: "hidden",
    shadowColor: "#000", // Color of the shadow
    shadowOffset: { width: 0, height: 2 }, // Offset for the shadow (horizontal, vertical)
    shadowOpacity: 0.8, // Opacity of the shadow
    shadowRadius: 4, // Blur radius of the shadow
    elevation: 5, // Elevation for Android shadow
  },  
  progress: {
    height: "100%",
  },
  xpText: {
    fontFamily: "Poppins",
    fontSize: 14,
    marginTop: 2,
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: -15,
    paddingVertical: 10,
    paddingHorizontal: 0,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    width: 160,
    height: 40,
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 8,
    borderColor: "#509B9B",
    borderWidth: 1,
    justifyContent: "center",
  },
  buttonText: {
    fontFamily: "Poppins",
    fontSize: 14,
    color: "#509B9B",
    fontWeight: "bold",
    marginLeft: 2,
  },
});


