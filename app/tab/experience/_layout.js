import { Stack } from "expo-router";
import { View, Text } from "react-native";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import Theme from "@/assets/theme";

export default function FeedStackLayout() {
  return (
    <Stack>
      {/* Main Feed Screen */}
      <Stack.Screen
        name="index" // Matches "feed/index.js"
        options={{
          title: "experience",
          headerShown: false,
        }}
      />

      {/* New Post Screen */}
      {/*We can talk about it, if removed, there is the extra button and idk why, I can ask in OH*/}
      <Stack.Screen
        name="completed" // Matches "feed/newpost.js"
        options={{
          title: "Completed tasks",
          headerShown: false, // Show header for this screen
          presentation: "modal", // Modal presentation for this screen
          headerStyle: {
            backgroundColor: Theme.colors.backgroundPrimary,
          },
          headerTintColor: "#fff",
        }}
      />
      <Stack.Screen
        name="remaining" // Matches "feed/newpost.js"
        options={{
          title: "Remaining Tasks",
          headerShown: false, // Show header for this screen
          presentation: "modal", // Modal presentation for this screen
          headerStyle: {
            backgroundColor: Theme.colors.backgroundPrimary,
          },
          headerTintColor: "#fff",
        }}
      />

      <Stack.Screen
        name="details" // Matches "feed/newpost.js"
        options={{
          title: "Completed tasks",
          headerShown: false, // Show header for this screen
          presentation: "absolute", // Modal presentation for this screen
          animation: "slide_from_right", // Slides in from the right
          headerStyle: {
            backgroundColor: Theme.colors.backgroundPrimary,
          },
          headerTintColor: "#fff",
        }}
      />
    </Stack>
  );
}

