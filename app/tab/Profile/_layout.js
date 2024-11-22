import { Stack } from "expo-router";
import { View, Text } from "react-native";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import Theme from "@/assets/theme";

export default function FeedStackLayout() {
  return (
    <Stack>
      {/* Main stack Screen: profile */}
      <Stack.Screen
        name="index" // Matches "Profile/index.js"
        options={{
          title: "progress",
          headerShown: false,
        }}
      />

      {/* New Post Screen */}
      {/*We can talk about it, if removed, there is the extra button and idk why, I can ask in OH*/}
      <Stack.Screen
        name="myFriends" // Matches "feed/newpost.js"
        options={{
          title: "My Friends",
          headerShown: true, // Show header for this screen
          presentation: "modal", // Modal presentation for this screen
          headerStyle: {
            backgroundColor: Theme.colors.backgroundPrimary,
          },
          headerTintColor: "#fff",
        }}
      />
      {/*}
      <Stack.Screen
        name="myProgress" // Matches "feed/newpost.js"
        options={{
          title: "My Progress",
          headerShown: true, // Show header for this screen
          presentation: "modal", // Modal presentation for this screen
          headerStyle: {
            backgroundColor: Theme.colors.backgroundPrimary,
          },
          headerTintColor: "#fff",
        }}
      /> */}
    </Stack>
  );
}
