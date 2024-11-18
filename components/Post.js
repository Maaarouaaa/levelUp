/*
import { useState, useEffect } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";

import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Link } from "expo-router";

import Theme from "@/assets/theme";
import db from "@/database/db";

export default function Post({
  shouldNavigateOnPress = false,
  id,
  username,
  timestamp,
  text,
  score,
  vote,
  commentCount,
}) {
  const [isLoading, setIsLoading] = useState(false);
  ///
  const [currentVote, setCurrentVote] = useState(vote);
  const [currentScore, setCurrentScore] = useState(score);

  ////////////////////////////////////////////////////////////////////////////////////
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    // Fetch the current user's ID
    const fetchUserId = async () => {
      const {
        data: { user },
        error,
      } = await db.auth.getUser();
      if (user) {
        setUserId(user.id); // Set the user ID in state
      } else if (error) {
        console.error("Error fetching user ID:", error);
      }
    };

    fetchUserId();
  }, []);

  const submitVote = async (newVote) => {
    if (!userId) {
      console.error("User is not logged in");
      return;
    }

    setIsLoading(true);

    // Optimistically calculate new score
    let updatedScore = currentScore;
    if (currentVote === 0) {
      // No existing vote from this user, just add the newVote
      updatedScore += newVote;
    } else if (currentVote !== newVote) {
      // Change of vote: remove previous vote and add the new one
      updatedScore += newVote - currentVote;
    }

    // Optimistically update UI
    setCurrentVote(newVote);
    setCurrentScore(updatedScore);

    try {
      // Check if the vote already exists
      const { data: existingVote, error: fetchError } = await db
        .from("likes")
        .select("*")
        .eq("post_id", id)
        .eq("user_id", userId)
        .single();

      if (fetchError && fetchError.code !== "PGRST116") {
        console.error("Error fetching existing vote:", fetchError);
        // Revert optimistic update if an error occurs
        setCurrentVote(vote);
        setCurrentScore(score);
        return;
      }

      if (existingVote) {
        // Update existing vote
        const { error: updateError } = await db
          .from("likes")
          .update({ vote: newVote })
          .eq("post_id", id)
          .eq("user_id", userId);

        if (updateError) {
          console.error("Error updating vote:", updateError);
          // Revert optimistic update if an error occurs
          setCurrentVote(vote);
          setCurrentScore(score);
        }
      } else {
        // Insert new vote if no existing vote is found
        const { error: insertError } = await db.from("likes").insert({
          post_id: id,
          user_id: userId,
          vote: newVote,
        });

        if (insertError) {
          console.error("Error inserting vote:", insertError);
          // Revert optimistic update if an error occurs
          setCurrentVote(vote);
          setCurrentScore(score);
        }
      }
    } catch (err) {
      console.error("Unexpected error:", err);
      // Revert optimistic update in case of an unexpected error
      setCurrentVote(vote);
      setCurrentScore(score);
    } finally {
      setIsLoading(false);
    }
  };

  ////////////////////////////////////////////////////////////////////////////////////

  /*
  const submitVote = async (vote) => {
    setIsLoading(true);
    // TODO
      setIsLoading(false);
  };
  */

let post = (
  <TouchableOpacity style={styles.content} disabled={!shouldNavigateOnPress}>
    <View style={styles.header}>
      <FontAwesome
        size={Theme.sizes.iconSmall}
        name="user"
        color={Theme.colors.iconSecondary}
      />
      <Text style={styles.username}>{username}</Text>
    </View>
    <View style={styles.body}>
      <Text style={styles.text}>{text}</Text>
    </View>
    <View style={styles.footer}>
      <Text style={styles.timestamp}>{timestamp}</Text>
      <View style={styles.comment}>
        <FontAwesome
          size={Theme.sizes.iconSmall}
          name="comment"
          color={Theme.colors.iconSecondary}
        />
        <Text style={styles.commentCount}>{commentCount}</Text>
      </View>
    </View>
  </TouchableOpacity>
);

if (shouldNavigateOnPress) {
  post = (
    <Link
      href={{
        pathname: "/tab/feed/details",
        params: {
          id: id,
          username: username,
          timestamp: timestamp,
          text: text,
          score: score,
          commentCount: commentCount,
          vote: vote,
        },
      }}
      asChild={true}
      style={styles.content}
    >
      {post}
    </Link>
  );
}

/*
  const upvoteButton = (
    <TouchableOpacity
      onPress={() => (vote > 0 ? submitVote(0) : submitVote(1))}
      style={styles.upvoteButton}
      disabled={isLoading}
    >
      <FontAwesome
        size={16}
        name="chevron-up"
        color={
          vote > 0 ? Theme.colors.iconHighlighted : Theme.colors.iconSecondary
        }
      />
    </TouchableOpacity>
  );
  */
const upvoteButton = (
  <TouchableOpacity
    onPress={() => submitVote(currentVote > 0 ? 0 : 1)} // Toggle upvote
    style={styles.upvoteButton}
    disabled={isLoading}
  >
    <FontAwesome
      size={16}
      name="chevron-up"
      color={
        currentVote > 0
          ? Theme.colors.iconHighlighted
          : Theme.colors.iconSecondary
      }
    />
  </TouchableOpacity>
);

const downvoteButton = (
  <TouchableOpacity
    onPress={() => submitVote(currentVote < 0 ? 0 : -1)} // Toggle downvote
    style={styles.downvoteButton}
    disabled={isLoading}
  >
    <FontAwesome
      size={16}
      name="chevron-down"
      color={
        currentVote < 0
          ? Theme.colors.iconHighlighted
          : Theme.colors.iconSecondary
      }
    />
  </TouchableOpacity>
);
/*
  const downvoteButton = (
    <TouchableOpacity
      onPress={() => (vote < 0 ? submitVote(0) : submitVote(-1))}
      style={styles.downvoteButton}
      disabled={isLoading}
    >
      <FontAwesome
        size={16}
        name="chevron-down"
        color={
          vote < 0 ? Theme.colors.iconHighlighted : Theme.colors.iconSecondary
        }
      />
    </TouchableOpacity>
  );
*/
/*
  return (
    <View style={styles.container}>
      {post}
      <View style={styles.scoreContainer}>
        {upvoteButton}
        <Text style={styles.score}>{score}</Text>
        {downvoteButton}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    alignItems: "center",
    // padding: 24,
    paddingVertical: 12,
    paddingLeft: 20,
    paddingRight: 8,
    backgroundColor: Theme.colors.backgroundSecondary,
    flexDirection: "row",
  },
  content: {
    flex: 1,
    gap: 8,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
  },
  body: {
    width: "100%",
  },
  footer: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
  },
  scoreContainer: {
    alignItems: "center",
    marginLeft: 16,
  },
  text: {
    color: Theme.colors.textPrimary,
    fontWeight: "bold",
    fontSize: Theme.sizes.textMedium,
  },
  username: {
    color: Theme.colors.textSecondary,
    fontWeight: "bold",
    marginLeft: 8,
  },
  timestamp: {
    color: Theme.colors.textSecondary,
    flex: 2,
  },
  comment: {
    flexDirection: "row",
    flex: 3,
  },
  commentCount: {
    color: Theme.colors.textSecondary,
    marginLeft: 8,
  },
  score: {
    color: Theme.colors.textHighlighted,
    fontWeight: "bold",
    fontSize: Theme.sizes.textLarge,
  },
  // Make sure the buttons have a lot of padding to increase the area of the touch target.
  upvoteButton: {
    paddingHorizontal: 12,
    paddingTop: 8,
    paddingBottom: 6,
  },
  downvoteButton: {
    paddingHorizontal: 12,
    paddingTop: 6,
    paddingBottom: 8,
  },
});
*/

/*
import { useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";

import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Link } from "expo-router";

import Theme from "@/assets/theme";

export default function Post({
  shouldNavigateOnPress = false,
  id,
  username,
  timestamp,
  text,
  score,
  vote,
  commentCount,
}) {
  const [isLoading, setIsLoading] = useState(false);

  const submitVote = async (vote) => {
    setIsLoading(true);
    // TODO: Add logic for submitting a vote
    setIsLoading(false);
  };

  let postContent = (
    <View style={styles.content}>
      <View style={styles.header}>
        <FontAwesome
          size={Theme.sizes.iconSmall}
          name="user"
          color={Theme.colors.iconSecondary}
        />
        <Text style={styles.username}>{username}</Text>
      </View>
      <View style={styles.body}>
        <Text style={styles.text}>{text}</Text>
      </View>
      <View style={styles.footer}>
        <Text style={styles.timestamp}>{timestamp}</Text>
        <View style={styles.comment}>
          <FontAwesome
            size={Theme.sizes.iconSmall}
            name="comment"
            color={Theme.colors.iconSecondary}
          />
          <Text style={styles.commentCount}>{commentCount}</Text>
        </View>
      </View>
    </View>
  );

  let post = (
    <TouchableOpacity
      style={styles.contentContainer}
      disabled={!shouldNavigateOnPress}
    >
      {postContent}
    </TouchableOpacity>
  );

  // Add navigation logic if shouldNavigateOnPress is true
  if (shouldNavigateOnPress) {
    post = (
      <Link
        href={{
          pathname: "/tab/feed/details",
          params: {
            postId: id, // Make sure to use `postId` as the key
            username: username,
            timestamp: timestamp,
            text: text,
            score: score,
            commentCount: commentCount,
            vote: vote,
          },
        }}
        asChild
      >
        {postContent}
      </Link>
    );
  }

  const upvoteButton = (
    <TouchableOpacity
      onPress={() => (vote > 0 ? submitVote(0) : submitVote(1))}
      style={styles.upvoteButton}
      disabled={isLoading}
    >
      <FontAwesome
        size={16}
        name="chevron-up"
        color={
          vote > 0 ? Theme.colors.iconHighlighted : Theme.colors.iconSecondary
        }
      />
    </TouchableOpacity>
  );

  const downvoteButton = (
    <TouchableOpacity
      onPress={() => (vote < 0 ? submitVote(0) : submitVote(-1))}
      style={styles.downvoteButton}
      disabled={isLoading}
    >
      <FontAwesome
        size={16}
        name="chevron-down"
        color={
          vote < 0 ? Theme.colors.iconHighlighted : Theme.colors.iconSecondary
        }
      />
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {post}
      <View style={styles.scoreContainer}>
        {upvoteButton}
        <Text style={styles.score}>{score}</Text>
        {downvoteButton}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    alignItems: "center",
    paddingVertical: 12,
    paddingLeft: 20,
    paddingRight: 8,
    backgroundColor: Theme.colors.backgroundSecondary,
    flexDirection: "row",
  },
  contentContainer: {
    flex: 1,
  },
  content: {
    flex: 1,
    gap: 8,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
  },
  body: {
    width: "100%",
  },
  footer: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
  },
  scoreContainer: {
    alignItems: "center",
    marginLeft: 16,
  },
  text: {
    color: Theme.colors.textPrimary,
    fontWeight: "bold",
    fontSize: Theme.sizes.textMedium,
  },
  username: {
    color: Theme.colors.textSecondary,
    fontWeight: "bold",
    marginLeft: 8,
  },
  timestamp: {
    color: Theme.colors.textSecondary,
    flex: 2,
  },
  comment: {
    flexDirection: "row",
    flex: 3,
  },
  commentCount: {
    color: Theme.colors.textSecondary,
    marginLeft: 8,
  },
  score: {
    color: Theme.colors.textHighlighted,
    fontWeight: "bold",
    fontSize: Theme.sizes.textLarge,
  },
  upvoteButton: {
    paddingHorizontal: 12,
    paddingTop: 8,
    paddingBottom: 6,
  },
  downvoteButton: {
    paddingHorizontal: 12,
    paddingTop: 6,
    paddingBottom: 8,
  },
});
*/
