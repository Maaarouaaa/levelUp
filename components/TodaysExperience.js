import React from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import Theme from "@/assets/theme";

export default function TodaysExperience({ name, xp, photo, description, onPress }) {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.content}>
        <Text style={styles.name}>{name}</Text>
        <FontAwesomeIcon icon="fa-solid fa-star" />
        <Text style={styles.xp}>{xp} XP</Text>
        <View style={styles.details}>
          <Image source={photo} style={styles.image} />
          <Text style={styles.description}>{description}</Text>
        </View>
        <Text style={styles.link}>Go to Experience</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: 364, // Square size
    height: 320, // Square size
    padding: 16,
    justifyContent: "space-between",
  },
  content: {
    flex: 1,
    justifyContent: "space-between",
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    color: '#000000',
    textAlign: "left",
  },
  xp: {
    fontSize: 20,
    color: '#000000',
    textAlign: "left",
  },
  details: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 8,
  },
  image: {
    width: 140, // Increased size
    height: 140, // Increased size
    borderRadius: 12, // Adjusted for larger size
    borderLeft: 20,
    marginRight: 8,
  },
  description: {
    fontSize: 16, // Reduced size
    color: '#4B4B4B',
    flexShrink: 1,
    borderRightWidth: 20,
    borderLeftWidth: 20,
    borderRightColor: '#FFFFFF',
    borderLeftColor: '#FFFFFF',
  },
  link: {
    fontSize: Theme.sizes.textSmall,
    color: Theme.colors.link,
    textAlign: "center",
    marginTop: 8,
  },
});


