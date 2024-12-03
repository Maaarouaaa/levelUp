// back end director for tab navigation
import { Slot } from "expo-router";
import React, { useState } from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Tabs } from "expo-router";
import Theme from "@/assets/theme";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import Feather from "@expo/vector-icons/Feather";

export default function TabLayout() {
  return (
    <Tabs screenOptions={{ tabBarActiveTintColor: "#f4511e" }}>
      <Tabs.Screen
        name="feed"
        options={{
          title: "",
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
          title: "",
          tabBarIcon: ({ size, color }) => (
            <AntDesign name="staro" size={24} color={color} />
          ),
          headerStyle: {
            backgroundColor: Theme.colors.backgroundPrimary,
            height: 71,
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
        name="Challenge"
        options={{
          title: "",
          tabBarIcon: ({ size, color }) => (
            <Feather name="send" size={24} color={color} />
          ),
          headerStyle: {
            backgroundColor: Theme.colors.backgroundPrimary,
            height: 71,
          },
          tabBarStyle: {
            backgroundColor: "#D0E4E4", // Use tabBarColor for the tab bar itself
          },
          headerTintColor: "#fff",
          headerShown: false,
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
          title: "",
          tabBarIcon: ({ size, color }) => (
            <AntDesign name="smile-circle" size={24} color={color} />
          ),
          headerStyle: {
            backgroundColor: "#D0E4E4",
            height: 300,
          },
          tabBarStyle: {
            backgroundColor: "#D0E4E4", // Use tabBarColor for the tab bar itself
          },
          headerTintColor: "#509B9B",
          headerTitleStyle: {
            fontSize: 24, // Adjust the font size
            fontWeight: "bold", // Set the font weight to bold
          },
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="Profile"
        options={{
          title: "",
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
          headerShown: true,
        }}
      />
    </Tabs>
  );
}
