import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Dimensions } from "react-native";
import Svg, { Line, Circle, Text as SvgText } from "react-native-svg";
import Icon from "react-native-vector-icons/Ionicons";
import db from "@/database/db";

export default function MyProgress() {
  const [chartData, setChartData] = useState(null);
  const [selectedFilters, setSelectedFilters] = useState(["total_xp"]); // Default filter is total_xp
  const screenWidth = Dimensions.get("window").width * 0.9;
  const graphHeight = 300; // Increased height for dynamic growth
  const topMargin = 50; // Add margin to the top of the graph
  const bottomPadding = 100; // Extra padding for future growth below X-axis

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
        console.log("Fetching data from the database...");
        const { data, error } = await db
          .from("graph_data")
          .select("total_xp, problem_solving_xp, communication_xp, leadership_xp, adaptability_xp");

        if (error) {
          console.error("Error fetching data:", error.message);
        } else {
          console.log("Raw data from the database:", data);

          // Calculate cumulative data for each key
          const cumulativeData = [];
          let cumulativeSums = {
            total_xp: 0,
            problem_solving_xp: 0,
            communication_xp: 0,
            leadership_xp: 0,
            adaptability_xp: 0,
          };

          data.forEach((row, index) => {
            const cumulativeRow = {};
            for (let key in cumulativeSums) {
              cumulativeSums[key] += row[key] || 0; // Add current value or 0 if null
              cumulativeRow[key] = cumulativeSums[key];
            }
            cumulativeData.push(cumulativeRow);
            console.log(`Cumulative data for row ${index + 1}:`, cumulativeRow);
          });

          setChartData(cumulativeData);
        }
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };

    fetchData();
  }, []);

  if (!chartData) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  const renderGraphs = () => {
    const maxValue = Math.max(
      ...chartData.flatMap((row) =>
        selectedFilters.map((filter) => row[filter])
      )
    );
  
    const scaledData = selectedFilters.map((filter) => ({
      filter,
      data: chartData.map((row) => (row[filter] / maxValue) * (graphHeight - topMargin)),
    }));
  
    return (
      <View style={styles.cardContainer}>
        <Svg
          width={screenWidth * 0.85} // Slightly reduced width to fit within the card
          height={graphHeight + bottomPadding - 40} // Adjusted bottom padding for a smaller card
          style={{ marginHorizontal: 10 }}
        >
          {/* Draw Graphs for Selected Filters */}
          {scaledData.map(({ filter, data }) => (
            <React.Fragment key={filter}>
              {/* Draw Lines */}
              {data.map((_, index) => {
                if (index < data.length - 1) {
                  return (
                    <Line
                      key={`line-${filter}-${index}`}
                      x1={(index / (data.length - 1)) * screenWidth * 0.7 + screenWidth * 0.1}
                      y1={graphHeight - data[index]}
                      x2={((index + 1) / (data.length - 1)) * screenWidth * 0.7 + screenWidth * 0.1}
                      y2={graphHeight - data[index + 1]}
                      stroke={
                        {
                          total_xp: "#509B9B",
                          problem_solving_xp: "#FF8460",
                          communication_xp: "#4CA8FF",
                          adaptability_xp: "#FFAB45",
                          leadership_xp: "#58CDB0",
                        }[filter]
                      }
                      strokeWidth={2}
                    />
                  );
                }
                return null;
              })}
  
              {/* Draw Circles */}
              {data.map((value, index) => (
                <Circle
                  key={`circle-${filter}-${index}`}
                  cx={(index / (data.length - 1)) * screenWidth * 0.7 + screenWidth * 0.1}
                  cy={graphHeight - value}
                  r={4}
                  fill={
                    {
                      total_xp: "#509B9B",
                      problem_solving_xp: "#FF8460",
                      communication_xp: "#4CA8FF",
                      adaptability_xp: "#FFAB45",
                      leadership_xp: "#58CDB0",
                    }[filter]
                  }
                />
              ))}
            </React.Fragment>
          ))}
  
          {/* X-Axis Labels */}
          {chartData.map((_, index) => (
            <SvgText
              key={`label-${index}`}
              x={(index / (chartData.length - 1)) * screenWidth * 0.7 + screenWidth * 0.1}
              y={graphHeight + 30} // Adjusted for a smaller card
              fontSize="12"
              fill="black"
              textAnchor="middle"
            >
              {index + 1}
            </SvgText>
          ))}
  
          {/* X-Axis Title */}
          <SvgText
            x={screenWidth / 2} // Centered horizontally
            y={graphHeight + 50} // Adjusted for a smaller card
            fontSize="14"
            fill="black"
            textAnchor="middle"
          >
            Days
          </SvgText>
        </Svg>
      </View>
    );
  };  

  return (
    <ScrollView style={styles.scrollView} contentContainerStyle={styles.contentContainer}>
      {/* Header */}
      <View style={styles.headerBackground}></View>
      <Icon name="arrow-back" size={24} style={styles.backArrow} color="#838383" />
      <Text style={styles.headerTitle}>My Progress</Text>

      {/* Filters */}
      <Text style={styles.filterText}>Filter by</Text>
      <View style={styles.filterContainer}>
        <View style={styles.row}>
          <TouchableOpacity
            style={[
              styles.filterButton,
              selectedFilters.includes("problem_solving_xp") && styles.selectedFilterButton,
            ]}
            onPress={() => toggleFilter("problem_solving_xp")}
          >
            <Text
              style={[
                styles.filterTextLabel,
                { color: "#FF8460" },
                selectedFilters.includes("problem_solving_xp") && styles.selectedFilterText,
              ]}
            >
              Problem Solving
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.filterButton,
              selectedFilters.includes("communication_xp") && styles.selectedFilterButton,
            ]}
            onPress={() => toggleFilter("communication_xp")}
          >
            <Text
              style={[
                styles.filterTextLabel,
                { color: "#4CA8FF" },
                selectedFilters.includes("communication_xp") && styles.selectedFilterText,
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
              selectedFilters.includes("adaptability_xp") && styles.selectedFilterButton,
            ]}
            onPress={() => toggleFilter("adaptability_xp")}
          >
            <Text
              style={[
                styles.filterTextLabel,
                { color: "#FFAB45" },
                selectedFilters.includes("adaptability_xp") && styles.selectedFilterText,
              ]}
            >
              Adaptability
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.filterButton,
              selectedFilters.includes("leadership_xp") && styles.selectedFilterButton,
            ]}
            onPress={() => toggleFilter("leadership_xp")}
          >
            <Text
              style={[
                styles.filterTextLabel,
                { color: "#58CDB0" },
                selectedFilters.includes("leadership_xp") && styles.selectedFilterText,
              ]}
            >
              Leadership
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Graph Section */}
      <Text style={styles.graphTitle}>Skill Progress</Text>
      <View style={styles.graphContainer}>{renderGraphs()}</View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, // Enable flexbox layout
    backgroundColor: "#FFFFFF",
  },
  scrollView: {
    flexGrow: 1, // Allow content to grow and scroll dynamically
  },
  contentContainer: {
    flexGrow: 1, // Ensure the content container takes up available space
    paddingBottom: 20, // Add extra space at the bottom to prevent cutoff
  },
  cardContainer: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12, // Rounded edges
    elevation: 4, // Android shadow
    shadowColor: "black", // iOS shadow
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    padding: 10,
    marginVertical: 10, // Adjusted margins
    marginHorizontal: 15, // Smaller horizontal margin
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
    fontFamily: "Poppins-Regular",
    fontWeight: "bold",
    fontSize: 30,
    color: "#509B9B",
  },
  filterText: {
    marginTop: "22%",
    marginLeft: 45,
    fontFamily: "Poppins-Regular",
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
    fontFamily: "Poppins-Regular",
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
    marginTop: 30,
  },
  graphContainer: {
    marginTop: 20,
    alignItems: "center",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
  },
  loadingText: {
    fontSize: 16,
    color: "#509B9B",
  },
});
