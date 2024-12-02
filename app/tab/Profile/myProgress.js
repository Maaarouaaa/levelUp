import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from "react-native";
import { LineChart } from "react-native-chart-kit";
import { Dimensions } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import db from "@/database/db";

export default function MyProgress() {
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [chartData, setChartData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Toggle filter selection
  const toggleFilter = (filter) => {
    setSelectedFilters((prev) =>
      prev.includes(filter)
        ? prev.filter((item) => item !== filter)
        : [...prev, filter]
    );
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        // Fetch data for user with id = 1
        const { data, error } = await db
          .from("users")
          .select("day1, day2, day3, day4, day5")
          .eq("id", 1); // Only fetch data for the user with id = 1
  
        // Debugging log for database response
        console.log("Database response:", data);
  
        if (error) {
          console.error("Error fetching data:", error.message);
        } else if (data && data.length > 0) {
          console.log("Fetched data:", data);
  
          const user = data[0]; // Since it's for one user
          const points = [];
          let cumulativeSum = 0;
  
          // Calculate cumulative sum for the user's data
          ["day1", "day2", "day3", "day4", "day5"].forEach((day) => {
            const value = user[day] || 0; // Use 0 if the value is null
            cumulativeSum += value;
            points.push(cumulativeSum);
          });
  
          console.log("Cumulative points:", points);
          setChartData(points);
        } else {
          console.log("No data found for the user with id = 1");
        }
      } catch (err) {
        console.error("Error fetching data:", err);
      } finally {
        setLoading(false);
      }
    };
  
    fetchData();
  }, []);
  

  return (
    <ScrollView style={styles.container}>
      {/* Header Background */}
      <View style={styles.headerBackground}></View>

      {/* Back Arrow */}
      <Icon name="arrow-back" size={24} style={styles.backArrow} color="#838383" />

      {/* Header Title */}
      <Text style={styles.headerTitle}>My Progress</Text>

      {/* Filter Section */}
      <Text style={styles.filterText}>Filter by</Text>
      <View style={styles.filterContainer}>
        <View style={styles.row}>
          <TouchableOpacity
            style={[
              styles.filterButton,
              selectedFilters.includes("Problem Solving") && styles.selectedFilterButton,
            ]}
            onPress={() => toggleFilter("Problem Solving")}
          >
            <Text
              style={[
                styles.filterTextLabel,
                { color: "#FF8460" },
                selectedFilters.includes("Problem Solving") && styles.selectedFilterText,
              ]}
            >
              Problem Solving
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.filterButton,
              selectedFilters.includes("Communication") && styles.selectedFilterButton,
            ]}
            onPress={() => toggleFilter("Communication")}
          >
            <Text
              style={[
                styles.filterTextLabel,
                { color: "#4CA8FF" },
                selectedFilters.includes("Communication") && styles.selectedFilterText,
              ]}
            >
              Communication
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.row}>
          <TouchableOpacity
            style={[
              styles.filterButton,
              selectedFilters.includes("Adaptability") && styles.selectedFilterButton,
            ]}
            onPress={() => toggleFilter("Adaptability")}
          >
            <Text
              style={[
                styles.filterTextLabel,
                { color: "#FFAB45" },
                selectedFilters.includes("Adaptability") && styles.selectedFilterText,
              ]}
            >
              Adaptability
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.filterButton,
              selectedFilters.includes("Leadership") && styles.selectedFilterButton,
            ]}
            onPress={() => toggleFilter("Leadership")}
          >
            <Text
              style={[
                styles.filterTextLabel,
                { color: "#6CE7C9" },
                selectedFilters.includes("Leadership") && styles.selectedFilterText,
              ]}
            >
              Leadership
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <Text style={styles.graphTitle}>Skill Progress</Text>

      {/* Graph Section */}
      {loading ? (
        <Text style={styles.loadingText}>Loading...</Text>
      ) : chartData ? (
        <LineChart
          data={{
            labels: ["Day 1", "Day 2", "Day 3", "Day 4", "Day 5"],
            datasets: [
              {
                data: chartData,
                color: () => "#509B9B",
              },
            ],
          }}
          width={Dimensions.get("window").width * 0.9} // Adjust width
          height={300} // Adjust height
          chartConfig={{
            backgroundGradientFrom: "#fff",
            backgroundGradientTo: "#fff",
            color: (opacity = 1) => `rgba(80, 155, 155, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            style: {
              borderRadius: 16,
            },
          }}
          style={{
            marginVertical: 8,
            borderRadius: 16,
          }}
        />
      ) : (
        <Text style={styles.errorText}>No data available</Text>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    position: "relative",
  },
  headerBackground: {
    position: "absolute",
    width: "100%",
    height: "32%",
    backgroundColor: "rgba(80, 155, 155, 0.27)",
  },
  backArrow: {
    position: "absolute",
    top: 40,
    left: 16,
  },
  headerTitle: {
    position: "absolute",
    top: 30,
    left: "28%",
    fontFamily: "Poppins",
    fontWeight: "700",
    fontSize: 30,
    color: "#509B9B",
  },
  filterText: {
    marginTop: "22%",
    marginLeft: 45,
    fontFamily: "Poppins",
    fontWeight: "300",
    fontSize: 13,
    color: "#000000",
  },
  filterContainer: {
    alignItems: "center",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "80%",
    marginBottom: 4,
  },
  filterButton: {
    alignItems: "center",
    justifyContent: "center",
    width: "45%",
    height: 23,
    borderRadius: 15,
    borderWidth: 2,
    borderColor: "#E0E0E0",
    backgroundColor: "#FFFFFF",
  },
  selectedFilterButton: {
    borderColor: "#509B9B",
  },
  filterTextLabel: {
    fontFamily: "Poppins",
    fontWeight: "600",
    fontSize: 12,
  },
  selectedFilterText: {
    fontWeight: "800",
  },
  graphTitle: {
    fontSize: 14,
    fontWeight: "500",
    textAlign: "center",
    color: "black",
    marginTop: 20,
  },
  loadingText: {
    textAlign: "center",
    marginTop: 20,
    color: "#509B9B",
  },
  errorText: {
    textAlign: "center",
    marginTop: 20,
    color: "red",
  },
});
