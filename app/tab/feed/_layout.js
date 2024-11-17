// back end director for feed stack navigation
import { Stack } from "expo-router";
import Theme from "@/assets/theme";
import { View, Text } from "react-native";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

export default function FeedStackLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index" // This matches the "index.js" in the folder
        options={{
          title: "Feed",
          headerShown: false,
          headerStyle: {
            //backgroundColor: Theme.colors.backgroundPrimary,
          },
          headerStyle: {
            backgroundColor: Theme.colors.backgroundPrimary, // Customize the header background color
          },
          headerTintColor: "#fff", // Customize the color of the back button and header text
          headerTitle: () => (
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              /*
              <MaterialCommunityIcons name="bee" size={31} color="#f4511e" />
              */
              <Text
                style={{
                  color: "#fff",
                  marginLeft: 8,
                  fontSize: 18,
                  fontWeight: "bold",
                }}
              >
                LevelUp
              </Text>
            </View>
          ),
        }}
      />

      <Stack.Screen
        name="details" // This matches "details.js" in the folder
        options={{ title: "Post Details", headerShown: false }}
      />
      <Stack.Screen
        name="newpost" // This matches "details.js" in the folder
        options={{
          title: "screen 2",
          headerShown: true,
          presentation: "modal",
          headerTintColor: "#fff",
          headerStyle: {
            backgroundColor: Theme.colors.backgroundPrimary,
          },
        }}
      />
    </Stack>
  );
}
