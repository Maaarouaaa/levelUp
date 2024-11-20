// back end director for tab navigation
import { Slot } from "expo-router";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Tabs } from "expo-router";
import Theme from "@/assets/theme";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { View, Text } from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";

export default function TabLayout() {
  return (
    <Tabs screenOptions={{ tabBarActiveTintColor: "#f4511e" }}>
      <Tabs.Screen
        name="feed"
        options={{
          title: "home",
          tabBarIcon: ({ size, color }) => (
            <MaterialCommunityIcons
              name="beehive-outline"
              size={24}
              color={color}
            />
          ),
          headerStyle: {
            backgroundColor: Theme.colors.backgroundPrimary,
          },
          tabBarStyle: {
            backgroundColor: "#fff", // Use tabBarColor for the tab bar itself
          },
          headerTintColor: "#fff",
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="experience"
        options={{
          title: "experience",
          tabBarIcon: ({ size, color }) => (
            <AntDesign name="staro" size={24} color={color} />
          ),
          headerStyle: {
            backgroundColor: Theme.colors.backgroundPrimary,
          },
          tabBarStyle: {
            backgroundColor: "#fff", // Use tabBarColor for the tab bar itself
          },
          headerTintColor: "#fff",
          headerShown: true,
        }}
      />
      <Tabs.Screen
        name="Experience"
        options={{
          title: "LevelUp", // default title
          href: null,
          headerStyle: {
            backgroundColor: Theme.colors.backgroundPrimary, // Customize the header background color
          },
        }}
      />
      <Tabs.Screen
        name="leaderB"
        options={{
          title: "leaderboard",
          tabBarIcon: ({ size, color }) => (
            <AntDesign name="smile-circle" size={24} color={color} />
          ),
          headerStyle: {
            backgroundColor: "#fff",
          },
          tabBarStyle: {
            backgroundColor: "#fff", // Use tabBarColor for the tab bar itself
          },
          headerTintColor: "#fff",
          headerShown: true,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "profile",
          tabBarIcon: ({ size, color }) => (
            <FontAwesome name="user" size={24} color={color} />
          ),
          headerStyle: {
            backgroundColor: Theme.colors.backgroundPrimary,
          },
          tabBarStyle: {
            backgroundColor: "#fff", // Use tabBarColor for the tab bar itself
          },
          headerTintColor: "#fff",
          headerShown: true,
        }}
      />
      <Tabs.Screen
        name="one"
        options={{
          title: "LevelUp", // default title
          href: null,
          headerStyle: {
            backgroundColor: Theme.colors.backgroundPrimary, // Customize the header background color
          },
          headerTintColor: "#fff", // Customize the color of the back button and header text
          /*headerTitle: () => (
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <MaterialCommunityIcons name="bee" size={31} color="#f4511e" />
              <Text
                style={{
                  color: "#fff",
                  marginLeft: 8,
                  fontSize: 18,
                  fontWeight: "bold",
                }}
              >
                Buzz
              </Text>
            </View>
          ), */
          tabBarStyle: {
            backgroundColor: "#fff", // Customize the tab bar itself
          },
          headerShown: true,
        }}
      />
    </Tabs>
  );
}
