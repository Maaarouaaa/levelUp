import { Stack } from "expo-router";
import Theme from "@/assets/theme";

export default function FeedStackLayout() {
  return (
    <Stack>
      {/* Main Feed Screen */}
      <Stack.Screen
        name="index" // Matches "feed/index.js"
        options={{
          title: "home",
          headerStyle: {
            backgroundColor: Theme.colors.backgroundPrimary,
          },
          headerTintColor: "#fff",
          headerShown: false,
        }}
      />

      {/* New Post Screen */}
      <Stack.Screen
        name="problemS" // Matches "feed/problemS.js"
        options={{
          headerShown: false,
          animation: "slide_from_right", // Slides in from the right
          headerStyle: {
            backgroundColor: "#fff",
          },
          headerTintColor: "#fff",
        }}
      />

      <Stack.Screen
        name="communication" // Matches "feed/communication.js"
        options={{
          headerShown: false,
          animation: "slide_from_right", // Slides in from the right
          headerStyle: {
            backgroundColor: "#fff",
          },
          headerTintColor: "#fff",
        }}
      />

      <Stack.Screen
        name="leadership" // Matches "feed/leadership.js"
        options={{
          headerShown: false,
          animation: "slide_from_right", // Slides in from the right
          headerStyle: {
            backgroundColor: "#fff",
          },
          headerTintColor: "#fff",
        }}
      />

      <Stack.Screen
        name="adaptability" // Matches "feed/adaptability.js"
        options={{
          headerShown: false,
          animation: "slide_from_right", // Slides in from the right
          headerStyle: {
            backgroundColor: "#fff",
          },
          headerTintColor: "#fff",
        }}
      />

      <Stack.Screen
        name="details" // Matches "feed/adaptability.js"
        options={{
          headerShown: false,
          animation: "slide_from_right", // Slides in from the right
          headerStyle: {
            backgroundColor: "#fff",
          },
          headerTintColor: "#fff",
        }}
      />
    </Stack>
  );
}

