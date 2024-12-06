import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity, ActivityIndicator } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import db from "@/database/db";

export default function TodaysExperience({ id, onPress }) {
  const [name, setName] = useState(null);
  const [xp, setXp] = useState(null);
  const [photo, setPhoto] = useState(null);
  const [description, setDescription] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchExperienceData = async () => {
      try {
        setLoading(true);
        const { data, error } = await db
          .from("tasks")
          .select("name, xp, photo, description")
          .eq("id", id)
          .single();

        if (error) {
          console.error("Error fetching experience data:", error.message);
        } else if (data) {
          setName(data.name);
          setXp(data.xp);
          setPhoto(data.photo);
          setDescription(data.description);
        }
      } catch (err) {
        console.error("Error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchExperienceData();
  }, [id]);

  const truncateDescription = (text) => {
    if (text && text.length > 110) {
      return text.slice(0, 110) + "...";
    }
    return text;
  };

  if (loading) {
    return (
      <View style={[styles.container, styles.loadingContainer]}>
        <ActivityIndicator size="large" color="#509B9B" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text
          style={styles.name}
          numberOfLines={1}
          adjustsFontSizeToFit
          minimumFontScale={0.5} // Adjusts down to 50% of original size
        >
          {name}
        </Text>
        <View style={styles.xpRow}>
          <Icon name="star" size={20} color="#509B9B" />
          <Text style={styles.xp}>{xp} XP</Text>
        </View>
        <View style={styles.details}>
          <Image source={{ uri: photo }} style={styles.image} />
          <Text style={styles.description}>
            {truncateDescription(description)}
          </Text>
        </View>
        <TouchableOpacity style={styles.button} onPress={onPress}>
          <Text style={styles.buttonText}>Go to Experience</Text>
        </TouchableOpacity>
      </View>
    </View>
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
    width: 340,
    height: 270,
    padding: 16,
    justifyContent: "space-between",
  },
  loadingContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    flex: 1,
    justifyContent: "space-between",
  },
  name: {
    fontSize: 22,
    fontFamily: "Poppins-SemiBold",
    color: "#000000",
    textAlign: "left",
  },
  xpRow: {
    flexDirection: "row",
    alignItems: "center",
    fontFamily: "Poppins",
    marginVertical: 1,
  },
  xp: {
    fontSize: 18,
    fontFamily: "Poppins-Regular",
    color: "#000000",
    marginLeft: 4,
  },
  details: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 8,
  },
  image: {
    width: 120,
    height: 120,
    borderRadius: 12,
    marginRight: 8,
  },
  description: {
    fontSize: 14,
    fontFamily: "Poppins",
    color: "#4B4B4B",
    flexShrink: 1,
    borderRightWidth: 8,
    borderLeftWidth: 10,
    borderRightColor: "#FFFFFF",
    borderLeftColor: "#FFFFFF",
  },
  button: {
    backgroundColor: "#509B9B",
    paddingVertical: 0,
    height: 30,
    width: 230,
    paddingHorizontal: 20,
    borderRadius: 16,
    alignItems: "center",
    alignSelf: "center",
    marginTop: 8,
  },
  buttonText: {
    fontSize: 16,
    fontFamily: "Poppins-Semibold",
    color: "#FFFFFF",
    marginTop: 4,
  },
});





