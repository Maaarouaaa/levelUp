import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Dimensions } from "react-native";
import Svg, { Line, Circle, Text as SvgText } from "react-native-svg";
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

          const cumulativeData = [];
          let cumulativeSums = {
            total_xp: 0,
            problem_solving_xp: 0,
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

    const scaledData = selectedFilters.map((filter) => ({
      filter,
      data: chartData.map((row) => (row[filter] / maxValue) * (graphHeight - topMargin)),
    }));

    const yAxisPoints = Array.from({ length: Math.ceil(maxValue / 50) + 1 }, (_, i) => i * 50);


    return (
      <View style={styles.cardContainer}>
        <Svg
          width={screenWidth * 0.85}
          height={graphHeight + bottomPadding}
          style={styles.graphSvg}
        >
          {yAxisPoints.map((point, index) => (
            <SvgText
              key={`y-axis-${index}`}
              x={34}
              y={graphHeight - (point / maxValue) * (graphHeight - topMargin)}
              {...styles.yAxisLabel} // Applying style
            >
              {point}
            </SvgText>
          ))}

          <SvgText
            x={28}
            y={graphHeight / 2 + topMargin}
            transform={`rotate(-90, 10, ${graphHeight / 2 + topMargin})`}
            {...styles.yAxisTitle} // Applying style
          >
            Total XP
          </SvgText>

          {scaledData.map(({ filter, data }) => (
            <React.Fragment key={filter}>
              {data.map((_, index) => {
                if (index < data.length - 1) {
                  return (
                    <Line
                      key={`line-${filter}-${index}`}
                      x1={(index / (data.length - 1)) * screenWidth * 0.7 + screenWidth * 0.08}
                      y1={graphHeight - data[index]}
                      x2={((index + 1) / (data.length - 1)) * screenWidth * 0.7 + screenWidth * 0.08}
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
                      {...styles.graphLine} // Applying style
                    />
                  );
                }
                return null;
              })}

              {data.map((value, index) => (
                <Circle
                  key={`circle-${filter}-${index}`}
                  cx={(index / (data.length - 1)) * screenWidth * 0.7 + screenWidth * 0.08}
                  cy={graphHeight - value}
                  fill={
                    {
                      total_xp: "#509B9B",
                      problem_solving_xp: "#FF8460",
                      communication_xp: "#4CA8FF",
                      adaptability_xp: "#FFAB45",
                      leadership_xp: "#58CDB0",
                    }[filter]
                  }
                  {...styles.graphCircle} // Applying style
                />
              ))}
            </React.Fragment>
          ))}

          {chartData.map((_, index) => (
            <SvgText
              key={`label-${index}`}
              x={(index / (chartData.length - 1)) * screenWidth * 0.7 + screenWidth * 0.08}
              y={graphHeight + 25}
              {...styles.xAxisLabel} // Applying style
            >
              {index + 1}
            </SvgText>
          ))}

          <SvgText
            x={screenWidth / 2 -42}
            y={graphHeight + 50}
            {...styles.xAxisTitle} // Applying style
          >
            Week
          </SvgText>
        </Svg>



      </View>
    );
  };

  return (
    <ScrollView style={styles.scrollView} contentContainerStyle={styles.contentContainer}>
      <View style={styles.headerBackground}>
        <Text style={styles.headerTitle}>My Progress</Text>
      </View>

      <View style = {styles.filterSection}>
        <Text style={styles.filterBy}>Filter by</Text>
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
      

      </View>

      <View style = {styles.graphSection}>
        <Text style={styles.graphTitle}>Skill Progress</Text>
        <View style={styles.graphContainer}>{renderGraphs()}</View>
      </View>
 
      
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  // General Styles
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  scrollView: {
    flexGrow: 1,
  },
  contentContainer: {
    paddingBottom: 20,
  },
  cardContainer: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    elevation: 4,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    marginVertical: 10,
    marginTop: 20,
  },
  headerBackground: {
    position: "absolute",
    width: "100%",
    height: 200,
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
    alignSelf: 'center',
    fontFamily: "Poppins-Bold",
    fontWeight: "bold",
    fontSize: 38,
    color: "#509B9B",
  },
  filterText: {
    marginTop: "22%",
    marginBottom: "1%",
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
    width: "47%",
    height: 28,
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
    fontSize: 20,
    fontWeight: "500",
    textAlign: "center",
    color: "black",
    marginTop: 10,
    fontFamily: "Poppins-SemiBold",
  },
  graphContainer: {
    marginTop: -8,
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

  // Graph-Specific Styles
  graphSvg: {
    marginHorizontal: 10,
  },
  yAxisLabel: {
    fontSize: 12,
    fill: "#979494",
    textAnchor: "end",
    fontFamily: "Poppins-Regular",
  },
  yAxisTitle: {
    fontSize: 14,
    fill: "black",
    textAnchor: "middle",
    fontFamily: "Poppins-Regular",
  },
  graphLine: {
    strokeWidth: 2,
  },
  graphCircle: {
    r: 4,
  },
  xAxisLabel: {
    fontSize: 12,
    color: "#979494",
    textAnchor: "middle",
    fontFamily: "Poppins-Regular",
  },
  xAxisTitle: {
    fontSize: 14,
    fill: "black",
    alignSelf: "center",
    fontFamily: "Poppins-Regular",
  },
  filterSection: {
    paddingTop: 20,
  },
  graphSection: {
    paddingTop: 20,
  },
  filterBy: {
    marginTop: "20%",
    marginLeft: 45,
    paddingBottom: 5,
    fontFamily: "Poppins-Regular",
    color: "#000000",
    fontSize: 16,
  }
});

