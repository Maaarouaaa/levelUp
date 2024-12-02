import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Dimensions } from "react-native";
import Svg, { Line, Circle, Text as SvgText } from "react-native-svg";
import Icon from "react-native-vector-icons/Ionicons";
import db from "@/database/db";

export default function MyProgress() {
  const [chartData, setChartData] = useState(null);
  const [selectedFilters, setSelectedFilters] = useState([]);
  const screenWidth = Dimensions.get("window").width * 0.9; // Scaled width for better fit
  const graphHeight = 250;

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
        const { data, error } = await db
          .from("users")
          .select("day1, day2, day3, day4, day5")
          .eq("id", 1); // Fetch only for ID 1

        if (error) {
          console.error("Error fetching data:", error.message);
        } else if (data.length > 0) {
          console.log("Database response:", data);

          const user = data[0]; // Get data for the user with ID 1
          const cumulativePoints = [];
          let cumulativeSum = 0;

          ["day1", "day2", "day3", "day4", "day5"].forEach((day) => {
            if (user[day] !== null) {
              cumulativeSum += user[day];
              cumulativePoints.push(cumulativeSum);
            } else {
              cumulativePoints.push(cumulativeSum);
            }
          });

          console.log("Cumulative points:", cumulativePoints);
          setChartData(cumulativePoints);
        } else {
          console.error("No data found for user with ID 1");
        }
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };

    fetchData();
  }, []);

  if (!chartData) {
    return <Text style={styles.loadingText}>Loading...</Text>;
  }

  const maxValue = Math.max(...chartData); // Maximum value for scaling
  const scaledData = chartData.map((value) => (value / maxValue) * graphHeight);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.headerBackground}></View>
      <Icon name="arrow-back" size={24} style={styles.backArrow} color="#838383" />
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

      <View style={styles.graphContainer}>

  <Svg
  width={screenWidth} // Use the full available width
  height={graphHeight + 70} // Maintain space for the x-axis labels
  style={{ marginHorizontal: 10 }} // Add margin to center the graph
>

    {/* Draw Lines */}
    {chartData.map((_, index) => {
      if (index < chartData.length - 1) {
        return (
          <Line
            key={`line-${index}`}
            x1={(index / (chartData.length - 1)) * screenWidth * 0.8}
            y1={graphHeight - scaledData[index]}
            x2={((index + 1) / (chartData.length - 1)) * screenWidth * 0.8}
            y2={graphHeight - scaledData[index + 1]}
            stroke="#509B9B"
            strokeWidth={2}
          />
        );
      }
      return null;
    })}

    {/* Draw Circles */}
    {chartData.map((value, index) => (
      <Circle
        key={`circle-${index}`}
        cx={(index / (chartData.length - 1)) * screenWidth * 0.8}
        cy={graphHeight - scaledData[index]}
        r={4}
        fill="#FF8460"
      />
    ))}

    {/* X-Axis Labels */}
    {chartData.map((_, index) => (
      <SvgText
        key={`label-${index}`}
        x={(index / (chartData.length - 1)) * screenWidth * 0.8} // Current scaling
        y={graphHeight + 40} // Adjusted position for visibility
        fontSize="12"
        fill="black"
        textAnchor="middle"
      >
        Day {index + 1}
      </SvgText>
    ))}
  </Svg>
</View>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
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
    fontSize: 16,
    fontWeight: "500",
    textAlign: "center",
    color: "black",
    marginTop: 30, // Adjusted position
    marginBottom: 20, // Added space below
  },
  graphContainer: {
    marginTop: 20, // Adjusted margin for more space
    alignItems: "center",
  },
  loadingText: {
    fontSize: 16,
    color: "#509B9B",
    textAlign: "center",
    marginTop: 20,
  },
});
