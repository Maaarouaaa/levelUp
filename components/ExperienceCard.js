import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity, ActivityIndicator } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import db from "@/database/db";

export default function ExperienceCard({ id, photo, onPress }) {
  const [name, setName] = useState(null);
  const [xp, setXp] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchExperienceData = async () => {
      try {
        setLoading(true);
        const { data, error } = await db.from("tasks").select("name, xp").eq("id", id).single();

        if (error) {
          console.error("Error fetching experience data:", error.message);
        } else if (data) {
          setName(data.name);
          setXp(data.xp);
        }
      } catch (err) {
        console.error("Error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchExperienceData();
  }, [id]);

  if (loading) {
    return (
      <View style={[styles.container, styles.loadingContainer]}>
        <ActivityIndicator size="large" color="#509B9B" />
      </View>
    );
  }

  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.content}>
        <View style={styles.details}>
          <Image source={photo} style={styles.image} />
        </View>
        <View style={styles.words}>
          <Text style={styles.name}>{name || "No Name"}</Text>
          <View style={styles.xpRow}>
            <Icon name="star" size={25} color="#509B9B" />
            <Text style={styles.xp}>{xp !== null ? `${xp} XP` : "No XP"}</Text>
          </View>
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
  loadingContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  words: {
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
    width: 76,
    height: 76,
    borderRadius: 12,
    marginRight: 8,
  },
});


