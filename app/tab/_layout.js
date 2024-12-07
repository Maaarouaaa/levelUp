import { Slot } from "expo-router";
import React from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Tabs } from "expo-router";
import Theme from "@/assets/theme";
import Ionicons from "@expo/vector-icons/Ionicons"; // Import Ionicons
import AntDesign from "@expo/vector-icons/AntDesign";
import Feather from "@expo/vector-icons/Feather";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";

export default function TabLayout() {
  return (
    <NavigationContainer>
      <Tabs screenOptions={{ tabBarActiveTintColor: "#005E5E" }}>
        <Tabs.Screen
          name="feed"
          options={{
            tabBarLabel: () => null,
            tabBarIcon: ({ size, color }) => (
              <Ionicons name="home-outline" size={size} color={color} /> // Updated to use home-outline
            ),
            headerStyle: {
              backgroundColor: Theme.colors.backgroundPrimary,
            },
            tabBarStyle: {
              backgroundColor: "#D0E4E4",
            },
            headerTintColor: "#fff",
            headerShown: false,
          }}
        />
        <Tabs.Screen
          name="experience"
          options={{
            tabBarLabel: () => null,
            tabBarIcon: ({ size, color }) => (
              <AntDesign name="staro" size={size} color={color} />
            ),
            headerStyle: {
              backgroundColor: Theme.colors.backgroundPrimary,
              height: 71,
            },
            tabBarStyle: {
              backgroundColor: "#D0E4E4",
            },
            headerTintColor: "#fff",
            headerShown: false,
          }}
        />
        <Tabs.Screen
          name="Experience"
          options={{
            title: "LevelUp",
            href: null,
            headerStyle: {
              backgroundColor: Theme.colors.backgroundPrimary,
            },
          }}
        />
        <Tabs.Screen
          name="Challenge"
          options={{
            tabBarLabel: () => null,
            tabBarIcon: ({ size, color }) => (
              <Feather name="send" size={size} color={color} />
            ),
            headerStyle: {
              backgroundColor: Theme.colors.backgroundPrimary,
              height: 71,
            },
            tabBarStyle: {
              backgroundColor: "#D0E4E4",
            },
            headerTintColor: "#fff",
            headerShown: false,
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            title: "LevelUp",
            href: null,
            headerStyle: {
              backgroundColor: Theme.colors.backgroundPrimary,
            },
          }}
        />
        <Tabs.Screen
          name="leaderBoard"
          options={{
            tabBarLabel: () => null,
            tabBarIcon: ({ size, color }) => (
              <Ionicons name="podium-outline" size={size} color={color} />
            ),
            headerStyle: {
              backgroundColor: "#D0E4E4",
              height: 300,
            },
            tabBarStyle: {
              backgroundColor: "#D0E4E4",
            },
            headerTintColor: "#fff",
            headerShown: false,
          }}
        />
        <Tabs.Screen
          name="Profile"
          options={{
            tabBarLabel: () => null,
            tabBarIcon: ({ size, color }) => (
              <Ionicons name="person-outline" size={size} color={color} />
            ),
            headerStyle: {
              backgroundColor: Theme.colors.backgroundPrimary,
            },
            tabBarStyle: {
              backgroundColor: "#D0E4E4",
            },
            headerTintColor: "#fff",
            headerShown: false,
          }}
        />
        <Tabs.Screen
          name="one"
          options={{
            title: "LevelUp",
            href: null,
            headerStyle: {
              backgroundColor: Theme.colors.backgroundPrimary,
            },
            headerTintColor: "#fff",
            tabBarStyle: {
              backgroundColor: "#D0E4E4",
            },
            headerShown: true,
          }}
        />
      </Tabs>
    </NavigationContainer>
  );
}
