import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import Svg, { Line, Circle, Text as SvgText } from "react-native-svg";
import { useRouter } from "expo-router";
import Icon from "react-native-vector-icons/Ionicons";
import db from "@/database/db";

export default function MyProgress() {
  const [chartData, setChartData] = useState(null);
  const [selectedFilters, setSelectedFilters] = useState(["total_xp"]); // Default filter is total_xp
  const screenWidth = Dimensions.get("window").width * 0.9;
  const graphHeight = 300;
  const topMargin = 50; // Adjusted for better spacing
  const bottomPadding = 100;

  const toggleFilter = (filter) => {
    setSelectedFilters((prev) =>
      prev.includes(filter)
        ? prev.filter((item) => item !== filter)
        : [...prev, filter]
    );
  };

  const router = useRouter();

  const navigateBack = () => {
    router.back();
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("Fetching data from the database...");
        const { data, error } = await db
          .from("graph_data")
          .select('total_xp, \"problem solving_xp\", communication_xp, leadership_xp, adaptability_xp')
          .order("id", { ascending: true }); // Add ordering by 'id'

        if (error) {
          console.error("Error fetching data:", error.message);
        } else {
          console.log("Raw data from the database:", data);

          const cumulativeData = [];
          let cumulativeSums = {
            total_xp: 0,
            "problem solving_xp": 0,
            communication_xp: 0,
            leadership_xp: 0,
            adaptability_xp: 0,
          };

          data.forEach((row) => {
            const cumulativeRow = {};
            for (let key in cumulativeSums) {
              cumulativeSums[key] += row[key] || 0;
              cumulativeRow[key] = cumulativeSums[key];
            }
            cumulativeData.push(cumulativeRow);
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

    // Dynamically determine the Y-axis interval
    const interval = maxValue >= 1000 ? 200 : maxValue >= 500 ? 100 : 50;


    const scaledData = selectedFilters.map((filter) => ({
      filter,
      data: chartData.map(
        (row) => (row[filter] / maxValue) * (graphHeight - topMargin)
      ),
    }));

    const yAxisPoints = Array.from(
      { length: Math.ceil(maxValue / interval) + 1 },
      (_, i) => i * interval
    );

    const xSpacingFactor = 0.5; // Smaller value to reduce the spacing between X-axis labels
    const yOffset = 10; // Offset to move the graph and labels down

    return (
      <View style={styles.cardContainer}>
        <Svg
          width={screenWidth * 0.95} // Adjusted width for more space
          height={graphHeight + bottomPadding + yOffset}
          style={{ marginHorizontal: 10 }}
        >
          {/* Draw Y-Axis Labels */}
          {yAxisPoints.map((point, index) => (
            <SvgText
              key={`y-axis-${index}`}
              x={30} // Positioned to the left
              y={
                graphHeight -
                (point / maxValue) * (graphHeight - topMargin) +
                yOffset
              } // Added yOffset
              style={styles.graphAxisText} // Use style for font
            >
              {point}
            </SvgText>
          ))}

          {/* Y-Axis Title */}
          <SvgText
            x={10} // Adjusted for better alignment
            y={graphHeight / 2 + yOffset} // Added yOffset
            transform={`rotate(-90, 10, ${graphHeight / 2 + yOffset})`} // Adjusted rotation with yOffset
            style={styles.graphAxisTitle} // Use style for font
          >
            XP
          </SvgText>

          {/* Draw Graphs for Selected Filters */}
          {scaledData.map(({ filter, data }) => (
            <React.Fragment key={filter}>
              {data.map((_, index) => {
                if (index < data.length - 1) {
                  return (
                    <Line
                      key={`line-${filter}-${index}`}
                      x1={index * xSpacingFactor * screenWidth * 0.35 + 50} // Reduced spacing between points
                      y1={graphHeight - data[index] + yOffset} // Added yOffset
                      x2={
                        (index + 1) * xSpacingFactor * screenWidth * 0.35 + 50
                      } // Reduced spacing between points
                      y2={graphHeight - data[index + 1] + yOffset} // Added yOffset
                      stroke={
                        {
                          total_xp: "#509B9B",
                          "problem solving_xp": "#FF8460",
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

              {data.map((value, index) => (
                <Circle
                  key={`circle-${filter}-${index}`}
                  cx={index * xSpacingFactor * screenWidth * 0.35 + 50} // Reduced spacing between points
                  cy={graphHeight - value + yOffset} // Added yOffset
                  r={4}
                  fill={
                    {
                      total_xp: "#509B9B",
                      "problem solving_xp": "#FF8460",
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
              x={index * xSpacingFactor * screenWidth * 0.35 + 50} // Reduced spacing between points
              y={graphHeight + 50 + yOffset} // Added yOffset
              style={styles.graphAxisText} // Use style for font
            >
              {index + 1}
            </SvgText>
          ))}

          {/* X-Axis Title */}
          <SvgText
            x={(screenWidth / 2 - 20)} 
            y={graphHeight + 80 + yOffset} // Added yOffset
            style={styles.graphAxisTitle} // Use style for font
          >
            Weeks
          </SvgText>
        </Svg>
      </View>
    );
  };

  return (
    <ScrollView
      style={styles.scrollView}
      contentContainerStyle={styles.contentContainer}
    >
      <View style={styles.headerBackground}></View>
      <TouchableOpacity
        onPress={() => navigateBack()}
        style={{ position: "absolute", top: 40, left: 16 }}
      >
        <Icon name="arrow-back" size={24} color="#838383" onPress={navigateBack} />
      </TouchableOpacity>

      <Text style={styles.headerTitle}>My Progress</Text>
      <Text style={styles.filterText}>Filter by</Text>
      <View style={styles.filterContainer}>
        <View style={styles.row}>
          {/* Problem Solving Filter */}
          <TouchableOpacity
            style={[
              styles.filterButton,
              selectedFilters.includes("problem solving_xp") &&
                styles.selectedFilterButton,
            ]}
            onPress={() => toggleFilter("problem solving_xp")}
          >
            <Text
              style={[
                styles.filterTextLabel,
                { color: "#FF8460" }, // Same color as the graph for Problem Solving
                selectedFilters.includes("problem solving_xp") &&
                  styles.selectedFilterText,
              ]}
            >
              Problem Solving
            </Text>
          </TouchableOpacity>

          {/* Communication Filter */}
          <TouchableOpacity
            style={[
              styles.filterButton,
              selectedFilters.includes("communication_xp") &&
                styles.selectedFilterButton,
            ]}
            onPress={() => toggleFilter("communication_xp")}
          >
            <Text
              style={[
                styles.filterTextLabel,
                { color: "#4CA8FF" }, // Same color as the graph for Communication
                selectedFilters.includes("communication_xp") &&
                  styles.selectedFilterText,
              ]}
            >
              Communication
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.row}>
          {/* Adaptability Filter */}
          <TouchableOpacity
            style={[
              styles.filterButton,
              selectedFilters.includes("adaptability_xp") &&
                styles.selectedFilterButton,
            ]}
            onPress={() => toggleFilter("adaptability_xp")}
          >
            <Text
              style={[
                styles.filterTextLabel,
                { color: "#FFAB45" }, // Same color as the graph for Adaptability
                selectedFilters.includes("adaptability_xp") &&
                  styles.selectedFilterText,
              ]}
            >
              Adaptability
            </Text>
          </TouchableOpacity>

          {/* Leadership Filter */}
          <TouchableOpacity
            style={[
              styles.filterButton,
              selectedFilters.includes("leadership_xp") &&
                styles.selectedFilterButton,
            ]}
            onPress={() => toggleFilter("leadership_xp")}
          >
            <Text
              style={[
                styles.filterTextLabel,
                { color: "#58CDB0" }, // Same color as the graph for Leadership
                selectedFilters.includes("leadership_xp") &&
                  styles.selectedFilterText,
              ]}
            >
              Leadership
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <Text style={styles.graphTitle}>Skill Progress</Text>
      <View style={styles.graphContainer}>
        {/* Legend Positioned in Top Right */}
        <View style={styles.legendContainer}>
          <View style={[styles.legendCircle, { backgroundColor: "#509B9B" }]} />
          <Text style={styles.legendText}>Total XP</Text>
        </View>

        {/* Render the Graph */}
        {renderGraphs()}
      </View>
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
    width: "95%", // Increase percentage or use fixed width
    height: "75%",
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
    height: "30%",
    backgroundColor: "rgba(80, 155, 155, 0.27)",
  },
  backArrow: {
    position: "absolute",
    top: 40,
    left: 16,
  },
  headerTitle: {
    position: "absolute",
    top: 50,
    left: "22%",
    fontFamily: "Poppins-Bold",
    fontSize: 34,
    color: "#509B9B",
  },
  filterText: {
    marginTop: "28%",
    marginBottom: "1%",
    marginLeft: 45,
    fontFamily: "Poppins-SemiBold",
    fontSize: 16,
    color: "#000000",
  },
  filterContainer: {
    alignItems: "center",
    paddingTop: 4,
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
    width: "47%",
    height: 30,
    borderRadius: 15,
    borderWidth: 2,
    borderColor: "#E0E0E0",
    backgroundColor: "#FFFFFF",
  },
  selectedFilterButton: {
    borderColor: "#509B9B",
  },
  filterTextLabel: {
    fontFamily: "Poppins-SemiBold",
    fontSize: 12,
  },
  selectedFilterText: {
    fontWeight: "800",
  },
  graphTitle: {
    fontSize: 18,
    fontWeight: "500",
    textAlign: "center",
    color: "black",
    marginTop: 30,
    fontFamily: "Poppins-SemiBold",
  },
  graphContainer: {
    marginTop: 4,
    alignItems: "center",
    padding: 16, // Add padding to the container if needed
    position: "relative", // Ensure relative positioning for the legend to align correctly
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
  legendContainer: {
    position: "absolute",
    top: 35, // Adjust as needed for vertical alignment
    right: 35, // Adjust as needed for horizontal alignment
    flexDirection: "row",
    alignItems: "center",
    zIndex: 1, // Ensure it stays above the graph
  },
  graphAxisText: {
    fontSize: 12,
    fill: "black",
    marginBottom: 10,
    fontFamily: "Poppins-Regular", // Set font family to Poppins
    textAnchor: "middle", // Align text
  },
  graphAxisTitle: {
    fontSize: 14,
    fill: "black",
    fontFamily: "Poppins-Bold", // Set font family to Poppins
    textAnchor: "middle", // Align text
  },
  defaultGraphText: {
    marginTop: 5,
    fontSize: 12,
    fontFamily: "Poppins-Regular",
    color: "#838383",
    textAlign: "center",
  },
  defaultGraphLegend: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "left",
    marginLeft: 48,
    marginTop: 4,
    marginBottom: 5,
  },
  legendCircle: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 6,
  },
  legendText: {
    fontSize: 12,
    fontFamily: "Poppins-Regular",
    color: "#838383",
  },
  defaultGraphText: {
    fontSize: 12,
    fontFamily: "Poppins-Regular",
    color: "#838383",
    textAlign: "center",
  },
});
