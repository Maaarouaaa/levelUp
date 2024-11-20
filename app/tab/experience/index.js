import { StyleSheet, Text, View } from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { StatusBar } from "expo-status-bar";
import { Link } from "expo-router";

import Theme from "@/assets/theme";

export default function Exp() {
  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <Link href="/tab/experience/completed" style={styles.postButtonContainer}>
        <View style={styles.postButton}>
          <FontAwesome
            name="search-plus"
            size={24}
            color={Theme.colors.backgroundPrimary}
          />
        </View>
      </Link>
      <Link href="/tab/experience/remaining" style={styles.postButtonContainer}>
        <View style={styles.postButton}>
          <FontAwesome
            name="signal"
            size={24}
            color={Theme.colors.backgroundPrimary}
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
    backgroundColor: "#fff",
  },
  mainText: {
    color: Theme.colors.textSecondary,
    fontSize: Theme.sizes.textMedium,
  },
  postButtonContainer: {},
});
