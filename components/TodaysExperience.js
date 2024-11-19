import React from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import Theme from "@/assets/theme";

export default function TodaysExperience({ name, xp, photo, description, onPress }) {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.content}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.xp}>{xp}</Text>
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
    backgroundColor: Theme.colors.backgroundPrimary,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: 150, // Square size
    height: 150, // Square size
    padding: 16,
    justifyContent: "space-between",
  },
  content: {
    flex: 1,
    justifyContent: "space-between",
  },
  name: {
    fontSize: Theme.sizes.textMedium,
    fontWeight: "bold",
    color: Theme.colors.textPrimary,
    textAlign: "left",
  },
  xp: {
    fontSize: Theme.sizes.textSmall,
    color: Theme.colors.textSecondary,
    textAlign: "left",
  },
  details: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 8,
  },
  image: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginRight: 8,
  },
  description: {
    fontSize: Theme.sizes.textSmall,
    color: Theme.colors.textPrimary,
    flexShrink: 1,
  },
  link: {
    fontSize: Theme.sizes.textSmall,
    color: Theme.colors.link,
    textAlign: "center",
    marginTop: 8,
  },
});

