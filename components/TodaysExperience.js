import React from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import Theme from "@/assets/theme";
import Icon from "react-native-vector-icons/Ionicons";

export default function TodaysExperience({
  name,
  xp,
  photo,
  description,
  onPress,
}) {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.content}>
        <Text style={styles.name}>{name}</Text>
        <View style={styles.xpRow}>
          <Icon name="star" size={25} color="#509B9B" />
          <Text style={styles.xp}>{xp} XP</Text>
        </View>
        <View style={styles.details}>
          <Image source={photo} style={styles.image} />
          <Text style={styles.description}>{description}</Text>
        </View>
        <TouchableOpacity style={styles.button} onPress={onPress}>
          <Text style={styles.buttonText}>Go to Experience</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: 364,
    height: 320,
    padding: 16,
    justifyContent: "space-between",
  },
  content: {
    flex: 1,
    justifyContent: "space-between",
  },
  name: {
    fontSize: 24,
    color: "#000000",
    textAlign: "left",
  },
  xpRow: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 1,
  },
  xp: {
    fontSize: 20,
    color: "#000000",
    marginLeft: 8,
  },
  details: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 8,
  },
  image: {
    width: 140,
    height: 140,
    borderRadius: 12,
    marginRight: 8,
  },
  description: {
    fontSize: 16,
    color: "#4B4B4B",
    flexShrink: 1,
    borderRightWidth: 20,
    borderLeftWidth: 20,
    borderRightColor: "#FFFFFF",
    borderLeftColor: "#FFFFFF",
  },
  button: {
    backgroundColor: "#509B9B",
    paddingVertical: 10,
    height: 40,
    width: 250,
    paddingHorizontal: 20,
    borderRadius: 20,
    alignItems: "center",
    alignSelf: "center",
    marginTop: 8,
  },
  buttonText: {
    fontSize: 16,
    color: "#FFFFFF",
    fontWeight: "semibold",
  },
});
