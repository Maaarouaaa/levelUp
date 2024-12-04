import { Stack } from "expo-router";
import { View, Text } from "react-native";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import Theme from "@/assets/theme";

export default function ExperienceStackLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="experience" 
        options={{
          headerShown: false,
        }}
      />

    </Stack>
  );
}
