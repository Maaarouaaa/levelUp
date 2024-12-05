import { Stack } from "expo-router";
import { Slot } from "expo-router";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Tabs } from "expo-router";
export default function ChallengeStackLayout() {
  return (
    <Stack>
      {/* Main challenge log Screen */}
      <Stack.Screen
        name="index"
        options={{
          title: "idk",
          headerTintColor: "#fff",
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="detailsC"
        options={{
          title: "idk",

          headerTintColor: "#fff",
          headerShown: false,
        }}
      />
    </Stack>
  );
}
