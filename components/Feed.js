import { StyleSheet, View } from "react-native";

import FontAwesome from "@expo/vector-icons/FontAwesome";
import { StatusBar } from "expo-status-bar";
import { Link } from "expo-router";

import Theme from "@/assets/theme";

export default function Home() {
  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <Link href="/tab/feed/newpost" style={styles.postButtonContainer}>
        <View style={styles.postButton}>
          <FontAwesome size={32} name="plus" color={Theme.colors.textPrimary} />
        </View>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: Theme.colors.backgroundPrimary,
  },
  postButtonContainer: {
    position: "absolute",
    right: 8,
    bottom: 8,
  },
  postButton: {
    backgroundColor: Theme.colors.iconHighlighted,
    height: 48,
    width: 48,
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "center",
    // FontAwesome 'plus' icon is a bit off-center, so we manually center it by
    // tweaking the padding
    paddingTop: 2,
    paddingLeft: 1,
  },
});

/*
import { useState, useEffect } from "react";
import {
  StyleSheet,
  FlatList,
  RefreshControl,
  View,
  Text,
  TouchableOpacity,
} from "react-native";
import Theme from "@/assets/theme";
import Post from "@/components/Post";
import Loading from "@/components/Loading";
import timeAgo from "@/utils/timeAgo";
import { useNavigation } from "@react-navigation/native";
import db from "@/database/db"; // Import Supabase client

export default function Feed({
  shouldNavigateToComments = false,
  fetchUsersPostsOnly = false,
}) {
  const [posts, setPosts] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [user, setUser] = useState(null);
  const navigation = useNavigation();

  // Fetch authenticated user's session information
  const fetchAuthenticatedUser = async () => {
    try {
      const { data: session, error } = await db.auth.getSession();
      if (error) {
        console.error("Error fetching session:", error);
      } else if (session && session.user) {
        setUser(session.user);
      } else {
        setUser(null);
      }
    } catch (error) {
      console.error("Unexpected error fetching user:", error);
    }
  };

  // Fetch posts from Supabase
  const fetchPosts = async () => {
    if (fetchUsersPostsOnly && (!user || !user.id)) {
      console.error("User ID is missing, unable to fetch user-specific posts");
      setPosts([]);
      return;
    }

    setIsLoading(true);
    try {
      let query = db.from("posts_with_counts").select("*");

      if (fetchUsersPostsOnly && user && user.id) {
        query = query.eq("user_id", user.id);
      }

      const { data, error } = await query;

      if (error) {
        console.error("Error fetching posts:", error);
      } else {
        setPosts(data);
      }
    } catch (error) {
      console.error("Unexpected error:", error);
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  };

  // Fetch user session on component mount
  useEffect(() => {
    fetchAuthenticatedUser();
  }, []);

  // Fetch posts after user session has been retrieved
  useEffect(() => {
    if (user !== null || !fetchUsersPostsOnly) {
      fetchPosts();
    }
  }, [user]);

  // Handle navigation to post details
  /*
  const handlePostPress = (post) => {
    navigation.navigate("details", {
      id: post.id,
      username: post.username,
      timestamp: post.timestamp,
      text: post.text,
      score: post.like_count,
      commentCount: post.comment_count,
      vote: post.vote,
    });
  };
  

  // Loading state when waiting for data
  if (isLoading && !isRefreshing) {
    return <Loading />;
  }

  // Show no posts available message when there are no posts to display
  if (!isLoading && posts && posts.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>No posts available</Text>
      </View>
    );
  }

  // Render the posts with touchable navigation to details
  return (
    <FlatList
      data={posts}
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
      keyExtractor={(item) => item.id.toString()}
      contentContainerStyle={styles.posts}
      style={styles.postsContainer}
      refreshControl={
        <RefreshControl
          refreshing={isRefreshing}
          onRefresh={() => {
            setIsRefreshing(true);
            fetchPosts();
          }}
          tintColor={Theme.colors.textPrimary} // Applies to iOS
        />
      }
    />
  );
}

const styles = StyleSheet.create({
  postsContainer: {
    width: "100%",
  },
  posts: {
    gap: 8,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Theme.colors.backgroundPrimary,
  },
  emptyText: {
    fontSize: 18,
    color: Theme.colors.textSecondary,
  },
});
*/
