import React from "react";
import { StyleSheet, View, Text, Image, ScrollView } from "react-native";

const TaskScreen = () => {
  return (
    <ScrollView contentContainerStyle={styles.contentContainer}>
      {/* Header */}
      <View style={styles.headerBackground}>
        <Text style={styles.headerText}>Adaptability</Text>
      </View>

      {/* Search Bar */}
      <View style={styles.searchBar}>
        <Text style={styles.searchText}>Search tasks</Text>
      </View>

      {/* Task Cards */}
      <View style={styles.card}>
        <Image
          style={styles.taskImage}
          source={require("@/assets/rubiks_cube.jpg")}
        />
        <Text style={styles.taskTitle}>Solve a Rubik’s Cube</Text>
        <Text style={styles.xpText}>20 XP</Text>
        <View style={styles.star}></View>
      </View>

      <View style={styles.card}>
        <Image
          style={styles.taskImage}
          source={require("@/assets/rubiks_cube.jpg")}
        />
        <Text style={styles.taskTitle}>Task 2</Text>
        <Text style={styles.xpText}>20 XP</Text>
        <View style={styles.star}></View>
      </View>

      <View style={styles.card}>
        <Image
          style={styles.taskImage}
          source={require("@/assets/rubiks_cube.jpg")}
        />
        <Text style={styles.taskTitle}>Task 3</Text>
        <Text style={styles.xpText}>20 XP</Text>
        <View style={styles.star}></View>
      </View>

      <View style={styles.cardLocked}>
        <Image
          style={styles.taskImage}
          source={require("@/assets/rubiks_cube.jpg")}
        />
        <Text style={styles.taskTitle}>Locked Task</Text>
        <Text style={styles.xpText}>20 XP</Text>
        <View style={styles.star}></View>
      </View>

      {/* Bottom Navigation */}
      <View style={styles.bottomBar}></View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  contentContainer: {
    alignItems: "center", // Moves all children of ScrollView to the center horizontally
    paddingBottom: 80, // Adds spacing at the bottom for proper scrolling
  },
  headerBackground: {
    width: "100%",
    height: 146,
    backgroundColor: "rgba(255, 171, 69, 0.27)",
    alignItems: "center",
    justifyContent: "center",
  },
  headerText: {
    fontFamily: "Poppins",
    fontSize: 40,
    fontWeight: "700",
    color: "#FFAB45",
  },
  searchBar: {
    width: 342,
    height: 50,
    backgroundColor: "#FFFFFF",
    borderRadius: 100,
    marginVertical: 20,
    shadowColor: "#B7B7B7",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    alignItems: "center",
    justifyContent: "center",
  },
  searchText: {
    fontFamily: "Montserrat",
    fontSize: 16,
    color: "#000000",
  },
  card: {
    width: 366,
    height: 96,
    backgroundColor: "#FFFFFF",
    borderRadius: 25,
    marginVertical: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    position: "relative",
    padding: 10,
  },
  cardLocked: {
    width: 366,
    height: 96,
    backgroundColor: "rgba(131, 131, 131, 0.5)",
    borderRadius: 25,
    marginVertical: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    position: "relative",
    padding: 10,
  },
  taskImage: {
    width: 67,
    height: 76,
    borderRadius: 25,
    position: "absolute",
    left: 10,
    top: 10,
  },
  taskTitle: {
    fontFamily: "Poppins",
    fontSize: 20,
    color: "#000000",
    position: "absolute",
    left: 90,
    top: 15,
  },
  xpText: {
    fontFamily: "Poppins",
    fontSize: 20,
    color: "#000000",
    position: "absolute",
    left: "50%",
    transform: [{ translateX: -70 }],
    top: 50,
  },
  star: {
    width: 20,
    height: 20,
    backgroundColor: "#000",
    borderRadius: 10,
    position: "absolute",
    left: 122,
    top: 65,
  },
  bottomBar: {
    width: "100%",
    height: 63,
    backgroundColor: "#BFCBC2",
    position: "absolute",
    bottom: 0,
  },
});

export default TaskScreen;
