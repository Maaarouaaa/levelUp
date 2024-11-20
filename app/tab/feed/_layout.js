// back end director for feed stack navigation
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
          //title: "Feed",
          //headerShown: false, // No header for this screen
          title: "home",

          headerStyle: {
            backgroundColor: Theme.colors.backgroundPrimary,
          },

          headerTintColor: "#fff",
          headerShown: false,
          // Uncomment this if a header is needed:
          /*
          headerStyle: {
            backgroundColor: Theme.colors.backgroundPrimary,
          },
          headerTintColor: "#fff",
          headerTitle: () => (
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
                LevelUp
              </Text>
            </View>
          ),
          */
        }}
      />

      {/* New Post Screen */}
      {/*We can talk about it, if removed, there is the extra button and idk why, I can ask in OH*/}
      <Stack.Screen
        name="newpost" // Matches "feed/newpost.js"
        options={{
          title: "New Post",
          headerShown: true, // Show header for this screen
          presentation: "modal", // Modal presentation for this screen
          headerStyle: {
            backgroundColor: Theme.colors.backgroundPrimary,
          },
          headerTintColor: "#fff",
        }}
      />
    </Stack>
  );
}
