import React from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { useRouter } from "expo-router";

export default function Profile() {
  const router = useRouter();

  const navigateToProgress = () => {
    router.push("/tab/Profile/myProgress"); // Directly navigate to the screen
  };
  return (
    <View style={styles.container}>
      {/* Header Background */}
      <View style={styles.headerBackground}></View>

      {/* Back Arrow */}
      <Icon
        name="arrow-back"
        size={24}
        style={styles.backArrow}
        color="#838383"
      />

      {/* Header Title */}
      <Text style={styles.headerTitle}>Profile</Text>

      {/* Profile Picture */}
      <View style={styles.profilePictureContainer}>
        <Image
          source={require("@/assets/varshapic-profilepage.png")}
          style={styles.profilePicture}
        />
      </View>

      {/* Name and Member Info */}
      <Text style={styles.profileName}>Varsha Saravanan</Text>
      <Text style={styles.memberInfo}>Member since June 2024</Text>

      {/* XP and Stats */}
      <View style={styles.statsContainer}>
        {/* Lifetime XP */}
        <View style={styles.statBox}>
          <Image
            source={require("@/assets/star-profilepage.png")}
            style={styles.statIcon}
          />
          <Text style={styles.statNumber}>260</Text>
          <Text style={styles.statLabel}>Lifetime XP</Text>
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
          <Text style={styles.statNumber}>29</Text>
          <Text style={styles.statLabel}>Experiences</Text>
        </View>
      </View>

      {/* Skills Section */}
      <Text style={styles.skillsHeading}>My skills</Text>
      <View style={styles.skillsRow}>
        <SkillBar
          skillName="Problem Solving"
          currentXP={60}
          maxXP={100}
          color="#FF8460"
        />
        <SkillBar
          skillName="Communication"
          currentXP={80}
          maxXP={100}
          color="#4CA8FF"
        />
      </View>
      <View style={styles.skillsRow}>
        <SkillBar
          skillName="Adaptability"
          currentXP={40}
          maxXP={100}
          color="#FFAB45"
        />
        <SkillBar
          skillName="Leadership"
          currentXP={60}
          maxXP={100}
          color="#6CE7C9"
        />
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
  const barWidth = `${(currentXP / maxXP) * 100}%`; // Calculate bar width dynamically

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
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    position: "relative",
  },
  headerBackground: {
    position: "absolute",
    width: "100%",
    height: "24.5%", // Adjusted height to give more space for content
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
    left: "37%", // Center the header title
    fontFamily: "Poppins",
    fontWeight: "700",
    fontSize: 30,
    color: "#509B9B",
  },
  profilePictureContainer: {
    position: "absolute",
    top: "14%", // Adjusted to move image down
    left: "30%", // Center horizontally
    width: 130, // Reduced size
    height: 130,
    borderRadius: 100,
    overflow: "hidden",
    backgroundColor: "#E0E0E0", // Placeholder background
  },
  profilePicture: {
    width: "100%",
    height: "100%",
    borderRadius: 60,
  },
  profileName: {
    position: "absolute",
    top: "38%", // Adjusted to move name text down
    width: "100%",
    textAlign: "center",
    fontFamily: "Poppins",
    fontWeight: "700",
    fontSize: 22,
    color: "#509B9B",
  },
  memberInfo: {
    position: "absolute",
    top: "42.5%", // Adjusted to move member info down
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
    top: "48%", // Adjusted to move stats row down
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
    marginTop: "100%", // Push My skills below stats
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
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
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
    marginTop: 15, // Space above buttons
    marginBottom: 20, // Space below buttons
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