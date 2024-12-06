import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { useRouter } from "expo-router";
import db from "@/database/db";

export default function Three() {
  const [searchText, setSearchText] = useState("");
  const [isToggled, setIsToggled] = useState(false);
  const [completedTaskIds, setCompletedTaskIds] = useState([]);
  const router = useRouter();

  const handleToggle = () => {
    setIsToggled((prev) => !prev);
  };

  const fetchCompletedIds = async () => {
    try {
      const { data, error } = await db.from("tasks").select("id, done");

      if (error) {
        console.error("Error fetching tasks:", error.message);
        return [];
      }

      const completedIds = data.filter((task) => task.done).map((task) => task.id);
      setCompletedTaskIds(completedIds); // Store in state
    } catch (err) {
      console.error("Error fetching completed IDs:", err);
    }
  };

  useEffect(() => {
    fetchCompletedIds();
  }, []);

  const navigateToDetailsComplete = () => {
    if (!completedTaskIds || completedTaskIds.length === 0) {
      console.warn("No completed IDs available.");
      return;
    }

    const randomId =
      completedTaskIds[Math.floor(Math.random() * completedTaskIds.length)];
    console.log("Random completed ID:", randomId);

    router.push({ pathname: "/tab/Challenge/detailsC", params: { id: randomId } });
  };

  const navigateToDetails = () => {
    const getRandomId = () => {
      return Math.floor(Math.random() * 40) + 1;
    };

    const id = getRandomId();
    console.log(id);
    router.push({ pathname: "/tab/Challenge/detailsC", params: { id: id } });
  };

  const taskData = [
    { sentTo: "Varsha", date: "4 Hours Ago", type: "FROM" },
    { sentTo: "Paige", date: "9 Hours Ago", type: "FROM" },
    { sentTo: "Varsha", date: "2 Days Ago", type: "FROM" },
    { sentTo: "Nick", date: "3 Days Ago", type: "FROM", isComplete: true },
    { sentTo: "Maroua", date: "9 Days Ago", type: "FROM", isComplete: true },
  ];

  const filteredTasks = taskData.filter((task) =>
    task.sentTo.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <View style={styles.blueBackground}>
        <Text style={styles.headerText}>Challenge Log</Text>
      </View>

      <TextInput
  style={[styles.searchBar, { fontFamily: 'Poppins-Regular' }]} // Apply Poppins font
  placeholder="Search challenges..."
  placeholderTextColor="#aaa"
  value={searchText}
  onChangeText={setSearchText}
/>


      <View style={styles.toggleWrapper}>
        <TouchableOpacity style={styles.toggleContainer} onPress={handleToggle}>
          <View
            style={[
              styles.toggleIndicator,
              isToggled ? styles.toggleRight : styles.toggleLeft,
            ]}
          />
          <Text style={[styles.toggleText, !isToggled && styles.activeText]}>
            Inbox
          </Text>
          <Text style={[styles.toggleText, isToggled && styles.activeText]}>
            Sent
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.cardsContainer}>
        {!isToggled ? (
          <>
            {filteredTasks.map((task, index) => (
              <View key={index} style={styles.sentCard}>
                <View style={styles.cardContent}>
                  <Icon
                    name={
                      task.isComplete
                        ? "checkmark-circle-outline" // Green checkmark for Nick and Maroua
                        : "time-outline" // Yellow clock for others
                    }
                    size={30}
                    color={task.isComplete ? "#4CAF50" : "#FFAB45"}
                    style={styles.icon}
                  />
                  <View style={styles.cardText}>
                    <Text style={styles.sentToText}>
                      {task.type}: {task.sentTo}
                    </Text>
                    <Text style={styles.sentDateText}>Received: {task.date}</Text>
                  </View>
                  <TouchableOpacity
                    onPress={
                      task.isComplete
                        ? navigateToDetailsComplete // Use navigateToDetailsComplete for Nick and Maroua
                        : navigateToDetails // Use navigateToDetails for others
                    }
                    style={styles.viewTaskButton}
                  >
                    <Text style={styles.viewTaskText}>View Task</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </>
        ) : (
          <>
            <View style={styles.sentCard}>
              <View style={styles.cardContent}>
                <Icon
                  name="time-outline"
                  size={30}
                  color="#FFAB45"
                  style={styles.icon}
                />
                <View style={styles.cardText}>
                  <Text style={styles.sentToText}>TO: Maroua</Text>
                  <Text style={styles.sentDateText}>Sent: Just now</Text>
                </View>
                <TouchableOpacity
                  onPress={navigateToDetailsComplete}
                  style={styles.viewTaskButton}
                >
                  <Text style={styles.viewTaskText}>View Task</Text>
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.sentCard}>
              <View style={styles.cardContent}>
                <Icon
                  name="time-outline"
                  size={30}
                  color="#FFAB45"
                  style={styles.icon}
                />
                <View style={styles.cardText}>
                  <Text style={styles.sentToText}>TO: Nick</Text>
                  <Text style={styles.sentDateText}>Sent: 5 days ago</Text>
                </View>
                <TouchableOpacity
                  onPress={navigateToDetailsComplete}
                  style={styles.viewTaskButton}
                >
                  <Text style={styles.viewTaskText}>View Task</Text>
                </TouchableOpacity>
              </View>
            </View>
          </>
        )}
      </ScrollView>
    </View>
  );
}




const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: -20,
  },
  blueBackground: {
    height: "22%",
    backgroundColor: "rgba(80, 155, 155, 0.27)",
    justifyContent: "center",
    alignItems: "center",
  },
  headerText: {
    marginBottom: -42,
    fontFamily: "Poppins-Bold",
    fontSize: 40,
    color: "#509B9B",
    fontWeight: "700",
  },
  searchBar: {
    position: "absolute",
    top: "19.7%",
    alignSelf: "center",
    height: 40,
    width: "80%",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 10,
    backgroundColor: "#fff",
    color: "#000",
  },
  toggleWrapper: {
    alignItems: "center",
    marginVertical: 30,
  },
  toggleContainer: {
    position: "relative",
    backgroundColor: "#fff",
    borderRadius: 20,
    width: 200,
    height: 40,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  toggleIndicator: {
    position: "absolute",
    width: 100,
    height: 32,
    backgroundColor: "#509B9B",
    borderRadius: 16,
    elevation: 2,
  },
  toggleLeft: {
    left: 4,
  },
  toggleRight: {
    right: 4,
  },
  toggleText: {
    fontSize: 16,
    color: "#509B9B",
    zIndex: 1,
    fontFamily: "Poppins-SemiBold",
  },
  activeText: {
    color: "#fff",
    fontFamily: "Poppins-SemiBold",
  },
  cardsContainer: {
    paddingHorizontal: 15,
    paddingBottom: 20,
  },
  sentCard: {
    height: 96,
    backgroundColor: "rgba(0,0,0,0)",
    borderRadius: 25,
    marginBottom: -20,
    paddingVertical: 20,
    paddingHorizontal: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
    justifyContent: "center",
  },
  cardContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  cardText: {
    flex: 1,
    marginLeft: 15,
  },
  sentToText: {
    fontSize: 20,
    fontFamily: "Poppins-Regular",
    fontWeight: "600",
    marginBottom: 5,
  },
  sentDateText: {
    fontSize: 16,
    fontFamily: "Poppins-Regular",
    fontWeight: "400",
    color: "#555",
  },
  icon: {
    flex: 0,
  },
  viewTaskButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    borderColor: "#509B9B",
    borderWidth: 1,
    justifyContent: "center",
  },
  viewTaskText: {
    fontSize: 12,
    color: "#509B9B",
    marginLeft: 2,
    fontFamily: "Poppins-SemiBold",
  },
});

