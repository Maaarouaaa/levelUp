import { StyleSheet, Text, View } from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { StatusBar } from "expo-status-bar";
import { Link } from "expo-router";

import Theme from "@/assets/theme";

export default function Exp() {
  return (
    <View style={styles.container}>
      <Text>hello</Text>
      <StatusBar style="light" />
      <Link href="/tab/experience/completed" style={styles.postButtonContainer}>
        <View style={styles.postButton}>
          <FontAwesome
            name="search-plus"
            size={24}
            color={Theme.colors.textPrimary}
          />
        </View>
      </Link>
      <Link href="/tab/experience/remaining" style={styles.postButtonContainer}>
        <View style={styles.postButton}>
          <FontAwesome
            name="signal"
            size={24}
            color={Theme.colors.textPrimary}
          />
        </View>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Theme.colors.backgroundPrimary,
  },
  mainText: {
    color: Theme.colors.textSecondary,
    fontSize: Theme.sizes.textMedium,
  },
  postButtonContainer: {},
});

/*import { StyleSheet, Text, View } from "react-native";

export default function Profile() {
  return (
    <View style={styles.container}>
      <Text style={styles.centerText}>This is the second screen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff", // Neutral background color
  },
  centerText: {
    fontSize: 18, // Adjust font size as needed
    color: "#000", // Neutral text color
  },
});
*/
