import React from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import Theme from "@/assets/theme";
import Icon from "react-native-vector-icons/Ionicons";

export default function Skills({ name, icon, color1, onPress }) {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.content}>
        <View style={styles.details}>
          <Image source={icon} style={styles.icon} />
          <Text style={styles.name}>{name}</Text>
        </View>
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
    height: 96,
    padding: 16,
    justifyContent: "space-between",
  },
  content: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  name: {
    fontSize: 24,
    color: "#000000",
    textAlign: "left",
  },
  image: {
    width: 76,
    height: 76,
    borderRadius: 12,
    marginRight: 8,
  },
});
