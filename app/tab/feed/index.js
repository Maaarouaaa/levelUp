import { StyleSheet, Text, View } from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { StatusBar } from "expo-status-bar";
import { Link } from "expo-router";

import Theme from "@/assets/theme";

export default function Feed() {
  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <Link href="/tab/feed/newpost" style={styles.postButtonContainer}>
        <View style={styles.postButton}>
          <FontAwesome size={32} name="plus" color={Theme.colors.textPrimary} />
        </View>
      </Link>
      <Link href="/tab/feed/details" style={styles.postButtonContainer}>
        <View style={styles.postButton}>
          <FontAwesome size={32} name="cog" color={Theme.colors.textPrimary} />
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

/*
import { useState, useEffect } from "react";
import { StyleSheet, FlatList, RefreshControl, Text, View } from "react-native";

import Theme from "@/assets/theme";
import Post from "@/components/Post";
import Loading from "@/components/Loading";

import db from "@/database/db";
import timeAgo from "@/utils/timeAgo";
import useSession from "@/utils/useSession";

export default function Feed({
  shouldNavigateToComments = false,
  fetchUsersPostsOnly = false,
}) {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const session = useSession();

  useEffect(() => {
    // Fetch posts only if session is available and user is logged in
    if (session && session.user && session.user.id) {
      fetchPosts();
    }
  }, [fetchUsersPostsOnly, session]);

  const fetchPosts = async () => {
    setIsLoading(true);
    try {
      if (!session || !session.user || !session.user.id) {
        console.error("Session is not available or user ID is missing.");
        setPosts([]);
        setIsLoading(false);
        return;
      }

      let query = db
        .from("posts")
        .select("*")
        .order("timestamp", { ascending: false });

      if (fetchUsersPostsOnly) {
        query = query.eq("user_id", session.user.id);
      }

      const { data, error } = await query;

      if (error) {
        console.error("Error fetching posts:", error);
      } else {
        setPosts(data);
      }
    } catch (err) {
      console.error("Unexpected error fetching posts:", err);
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  };

  if (isLoading && !isRefreshing) {
    return <Loading />;
  }

  if (!session) {
    // Show a loading indicator or message until the session is loaded
    return (
      <View style={styles.noPostsContainer}>
        <Text style={styles.noPostsText}>Loading session...</Text>
      </View>
    );
  }

  return (
    <View style={styles.noPostsContainer}>
      <Text style={styles.noPostsText}>This is the main screen</Text>
    </View>
  );

  return (
    <FlatList
      data={posts}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <Post
          shouldNavigateOnPress={shouldNavigateToComments}
          id={item.id}
          username={item.username}
          timestamp={timeAgo(item.timestamp)}
          text={item.text}
          score={item.like_count}
          vote={item.vote}
          commentCount={item.comment_count}
        />
      )}
      contentContainerStyle={styles.posts}
      style={styles.postsContainer}
      refreshControl={
        <RefreshControl
          refreshing={isRefreshing}
          onRefresh={() => {
            setIsRefreshing(true);
            fetchPosts();
          }}
          tintColor={Theme.colors.textPrimary}
        />
      }
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: Theme.colors.backgroundPrimary,
  },
  postsContainer: {
    width: "100%",
  },
  posts: {
    gap: 8,
  },
  noPostsContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  noPostsText: {
    color: Theme.colors.textSecondary,
    fontSize: Theme.sizes.textMedium,
  },
});
*/
