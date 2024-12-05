/*
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Image,
} from "react-native";

export default function Three() {
  const [searchText, setSearchText] = useState("");
  const [isToggled, setIsToggled] = useState(false); // Example data for Inbox items

  const handleToggle = () => {
    setIsToggled((prev) => !prev);
  };
  const inboxItems = [
    {
      id: 1,
      name: "Taralyn",
      date: "MM/DD/YY",
      //imageUri: require("./path_to_image1.png"),
    },
    {
      id: 2,
      name: "Taralyn",
      date: "MM/DD/YY",
      //imageUri: require("./path_to_image2.png"),
    },
    {
      id: 3,
      name: "Taralyn",
      date: "MM/DD/YY",
      //imageUri: require("./path_to_image3.png"),
    },
  ];

  return (
    <View style={styles.container}>
            
            
      <View style={styles.blueBackground}>
                <Text style={styles.headerText}>Challenge Log</Text>
              
      </View>
     
      
      <TextInput
        style={styles.searchBar}
        placeholder="Search experiences..."
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
          inboxItems.map((item) => (
            <View key={item.id} style={styles.inboxCard}>
              
              
              
              <View style={styles.inboxDetails}>
                
                <Text style={styles.inboxText}>FROM: {item.name}</Text>
                
                <Text style={styles.inboxDate}>Finished: {item.date}</Text>
                
              </View>
              
            </View>
          ))
        ) : (
          // Placeholder for Sent view
          <>
            <View style={styles.sentCard}>
              <Text style={styles.sentToText}>TO: Taralyn</Text>
              <Text style={styles.sentDateText}>Sent On: MM/DD/YY</Text>
              <View style={styles.avatarPlaceholder} />
            </View>
            <View style={styles.sentCard}>
              <Text style={styles.sentToText}>TO: Alex</Text>
              <Text style={styles.sentDateText}>Sent On: MM/DD/YY</Text>
              <View style={styles.avatarPlaceholder} />
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
  },
  blueBackground: {
    height: "18%",
    backgroundColor: "rgba(80, 155, 155, 0.27)",
    justifyContent: "center",
    alignItems: "center",
  },
  headerText: {
    fontSize: 40,
    color: "#509B9B",
    fontWeight: "700",
  },
  searchBar: {
    position: "absolute",
    top: "15%",
    alignSelf: "center",
    height: 40,
    width: "80%",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 20,
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
  },
  activeText: {
    color: "#fff",
    fontWeight: "bold",
  },
  cardsContainer: {
    paddingHorizontal: 15,
    paddingBottom: 20,
  },
  inboxCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 25,
    marginBottom: 10,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  inboxDetails: {
    marginLeft: 10,
  },
  inboxText: {
    fontSize: 20,
    fontWeight: "600",
  },
  inboxDate: {
    fontSize: 16,
    color: "#555",
  },
});
*/
////////////////////////////////////////////////////////////////////////////////////////////////////

import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  ScrollView,
  TouchableOpacity,
} from "react-native";

export default function Three() {
  const [searchText, setSearchText] = useState("");
  const [isToggled, setIsToggled] = useState(false);

  const handleToggle = () => {
    setIsToggled((prev) => !prev);
  };

  const inboxItems = [
    {
      id: 1,
      name: "Taralyn",
      date: "MM/DD/YY",
      //imageUri: require("./path_to_image1.png"),
    },
    {
      id: 2,
      name: "Taralyn",
      date: "MM/DD/YY",
      //imageUri: require("./path_to_image2.png"),
    },
    {
      id: 3,
      name: "Taralyn",
      date: "MM/DD/YY",
      //imageUri: require("./path_to_image3.png"),
    },
  ];

  // Filtered IDs for the Inbox state
  const remainingIds = [1, 5, 4, 12, 13, 2, 3, 11];

  return (
    <View style={styles.container}>
      <View style={styles.blueBackground}>
        <Text style={styles.headerText}>Challenge Log</Text>
      </View>

      <TextInput
        style={styles.searchBar}
        placeholder="Search experiences..."
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
            <View style={styles.sentCard}>
              <Text style={styles.sentToText}>FROM: Taralyn</Text>
              <Text style={styles.sentDateText}>Sent On: MM/DD/YY</Text>
              <View style={styles.avatarPlaceholder} />
            </View>
            <View style={styles.sentCard}>
              <Text style={styles.sentToText}>FROM: Alex</Text>
              <Text style={styles.sentDateText}>Finished On: MM/DD/YY</Text>
              <View style={styles.avatarPlaceholder} />
            </View>
          </>
        ) : (
          // Display "Sent" cards when Sent is active
          <>
            <View style={styles.sentCard}>
              <Text style={styles.sentToText}>TO: Taralyn</Text>
              <Text style={styles.sentDateText}>Sent On: MM/DD/YY</Text>
              <View style={styles.avatarPlaceholder} />
            </View>
            <View style={styles.sentCard}>
              <Text style={styles.sentToText}>TO: Alex</Text>
              <Text style={styles.sentDateText}>Finished On: MM/DD/YY</Text>
              <View style={styles.avatarPlaceholder} />
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
  },
  blueBackground: {
    height: "18%",
    backgroundColor: "rgba(80, 155, 155, 0.27)",
    justifyContent: "center",
    alignItems: "center",
  },
  headerText: {
    fontSize: 40,
    color: "#509B9B",
    fontWeight: "700",
  },
  searchBar: {
    position: "absolute",
    top: "15%",
    alignSelf: "center",
    height: 40,
    width: "80%",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 20,
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
  },
  activeText: {
    color: "#fff",
    fontWeight: "bold",
  },
  cardsContainer: {
    paddingHorizontal: 15,
    paddingBottom: 20,
  },
  cardWrapper: {
    marginBottom: 15,
  },
  experienceCard: {
    height: 150,
    backgroundColor: "#eee",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  cardText: {
    fontSize: 18,
    color: "#333",
  },
  sentCard: {
    height: 96,
    backgroundColor: "#fff",
    borderRadius: 25,
    marginBottom: 20,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
    justifyContent: "center",
  },
  sentToText: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 5,
  },
  sentDateText: {
    fontSize: 16,
    fontWeight: "400",
    color: "#555",
  },
  avatarPlaceholder: {
    position: "absolute",
    right: 20,
    top: 20,
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#FFAB45",
  },
});

/*
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import ExperienceCard from "@/components/ExperienceCard";
import { useRouter } from "expo-router";

export default function Three({ navigation }) {
  const [searchText, setSearchText] = useState("");
  const [isToggled, setIsToggled] = useState(false);

  const handleToggle = () => {
    setIsToggled((prev) => !prev);
  };

  // Filtered IDs for Remaining state
  const remainingIds = [1, 5, 4, 12, 13, 2, 3, 11];

  return (
    <View style={styles.container}>
      
      <View style={styles.blueBackground}>
        <Text style={styles.headerText}>Challenge Log</Text>
      </View>

      
        style={styles.searchBar}
        placeholder="Search experiences..."
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
        {!isToggled &&
          remainingIds.map((id) => (
            <View key={id} style={styles.cardWrapper}>
              <ExperienceCard
                id={id} // Set the ID for the experience
                navigate="experience" // Set the ID for the experience
                photo={require("@/assets/rubiks_cube.jpg")} // Example placeholder image
              />
            </View>
          ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  // Style definitions remain the same as your original code
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  blueBackground: {
    height: "18%",
    backgroundColor: "rgba(80, 155, 155, .27)",
    justifyContent: "center",
    alignItems: "center",
  },
  headerText: {
    fontSize: 40,
    color: "#509B9B",
    fontWeight: "bold",
  },
  searchBar: {
    position: "absolute",
    top: "15%",
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
    backgroundColor: "#fff", // White background
    borderRadius: 20,
    width: 200,
    height: 40,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    paddingHorizontal: 8,
    elevation: 3, // Drop shadow on Android
    shadowColor: "#000", // Drop shadow on iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  toggleIndicator: {
    position: "absolute",
    width: 100,
    height: 32,
    backgroundColor: "#509B9B", // Light blue toggle
    borderRadius: 16,
    elevation: 2, // Slight elevation for toggle
  },
  toggleLeft: {
    left: 4,
  },
  toggleRight: {
    right: 4,
  },
  toggleText: {
    fontSize: 16,
    color: "#509B9B", // Light blue text color when against white
    zIndex: 1,
  },
  activeText: {
    color: "#fff", // Blue text when against the light blue toggle
    fontWeight: "bold",
  },
  cardWrapper: {
    marginBottom: 15, // Adds padding between cards
  },
});
*/
