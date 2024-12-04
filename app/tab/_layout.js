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
            backgroundColor: "#D0E4E4", // Use tabBarColor for the tab bar itself
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
            backgroundColor: "#D0E4E4", // Use tabBarColor for the tab bar itself
          },
          headerTintColor: "#fff",
          headerShown: false,
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
        name="profile"
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
            backgroundColor: "#D0E4E4", // Use tabBarColor for the tab bar itself
          },
          headerTintColor: "#fff",
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="Profile"
        options={{
          title: "profile",
          tabBarIcon: ({ size, color }) => (
            <FontAwesome name="user" size={24} color={color} />
          ),
          headerStyle: {
            backgroundColor: Theme.colors.backgroundPrimary,
          },
          tabBarStyle: {
            backgroundColor: "#D0E4E4", // Use tabBarColor for the tab bar itself
          },
          headerTintColor: "#fff",
          headerShown: false,
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

          tabBarStyle: {
            backgroundColor: "#D0E4E4", // Customize the tab bar itself
          },
          headerShown: false,
        }}
      />
    </Tabs>
  );
}
