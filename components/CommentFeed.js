/*
import { useState } from "react";
import { StyleSheet, FlatList, RefreshControl } from "react-native";

import Theme from "@/assets/theme";
import Comment from "./Comment";
import Loading from "./Loading";

import timeAgo from "@/utils/timeAgo";

export default function CommentFeed({ postId }) {
  const [comments, setComments] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const fetchComments = async () => {
    setIsLoading(true);
    // TODO
    setIsLoading(false);
    setIsRefreshing(false);
  };

  if (isLoading && !isRefreshing) {
    return <Loading />;
  }

  return (
    <FlatList
      data={comments}
      renderItem={({ item }) => (
        <Comment
          username={item.username}
          timestamp={timeAgo(item.timestamp)}
          text={item.text}
        />
      )}
      contentContainerStyle={styles.posts}
      style={styles.postsContainer}
      refreshControl={
        <RefreshControl
          refreshing={isRefreshing}
          onRefresh={() => {
            setIsRefreshing(true);
            fetchComments();
          }}
          tintColor={Theme.colors.textPrimary} // only applies to iOS
        />
      }
    />
  );
}

const styles = StyleSheet.create({
  postsContainer: {
    marginTop: 24,
  },
  posts: {
    gap: 8,
  },
});
*/

import { useState, useEffect } from "react";
import { StyleSheet, FlatList, RefreshControl, View, Text } from "react-native";

import Theme from "@/assets/theme";
import Comment from "./Comment";
import Loading from "./Loading";
import db from "@/database/db"; // Supabase client

import timeAgo from "@/utils/timeAgo";

export default function CommentFeed({ postId }) {
  const [comments, setComments] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Function to fetch comments from Supabase
  const fetchComments = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await db
        .from("comments")
        .select("*")
        .eq("post_id", postId)
        .order("timestamp", { ascending: true });

      if (error) {
        console.error("Error fetching comments:", error);
      } else {
        setComments(data);
      }
    } catch (error) {
      console.error("Unexpected error:", error);
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  };

  // Fetch comments when the component mounts or when postId changes
  useEffect(() => {
    fetchComments();
  }, [postId]);

  if (isLoading && !isRefreshing) {
    return <Loading />;
  }

  if (!isLoading && comments && comments.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>
          No comments yet. Be the first to comment!
        </Text>
      </View>
    );
  }

  return (
    <FlatList
      data={comments}
      renderItem={({ item }) => (
        <Comment
          username={item.username}
          timestamp={timeAgo(item.timestamp)}
          text={item.text}
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
            fetchComments();
          }}
          tintColor={Theme.colors.textPrimary} // only applies to iOS
        />
      }
    />
  );
}

const styles = StyleSheet.create({
  postsContainer: {
    marginTop: 24,
  },
  posts: {
    gap: 8,
  },
  emptyContainer: {
    marginTop: 24,
    alignItems: "center",
  },
  emptyText: {
    fontSize: 16,
    color: Theme.colors.textSecondary,
  },
});
