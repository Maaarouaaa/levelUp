// import { useState } from "react";
// import {
//   StyleSheet,
//   Platform,
//   View,
//   TouchableOpacity,
//   TextInput,
//   KeyboardAvoidingView,
//   Keyboard,
// } from "react-native";
// import FontAwesome from "@expo/vector-icons/FontAwesome";
// import Theme from "@assets/theme";

// import { useRoute } from "@react-navigation/native";

// export default function Details() {
//   const route = useRoute();
//   const { id, username, timestamp, text, score, vote, commentCount } =
//     route.params;

//   const [inputText, setInputText] = useState("");
//   const [isLoading, setIsLoading] = useState(false);

//   const submitComment = async () => {
//     setIsLoading(true);

//     try {
//       const { data, error } = await db
//         .from("comments") // Make sure this matches your actual comments table name
//         .insert([
//           {
//             post_id: id,
//             username: username || "Anonymous",
//             text: inputText,
//             timestamp: new Date().toISOString(), // Assuming your DB can handle ISO format timestamps
//           },
//         ]);

//       if (error) {
//         console.error("Error submitting comment:", error);
//       } else {
//         console.log("Comment submitted:", data);
//       }
//     } catch (err) {
//       console.error("Unexpected error:", err);
//     } finally {
//       /////////////////////////////////////////////////////////////////////////////////////
//       setIsLoading(false);
//       setInputText("");
//       Keyboard.dismiss();
//     }
//   };

//   const submitDisabled = isLoading || inputText.length === 0;

//   return (
//     <View style={styles.container}>
//       <Post
//         id={id}
//         username={username}
//         timestamp={timestamp}
//         text={text}
//         score={score}
//         vote={vote}
//         commentCount={commentCount}
//       />

//       <KeyboardAvoidingView
//         behavior={Platform.OS === "ios" ? "padding" : undefined}
//         keyboardVerticalOffset={Platform.OS === "ios" ? 65 : 0}
//         style={styles.keyboardContainer}
//       >
//         <CommentFeed postId={id} />
//         <View style={styles.inputContainer}>
//           <TextInput
//             style={styles.input}
//             value={inputText}
//             onChangeText={setInputText}
//             placeholder={"Write a comment..."}
//             placeholderTextColor={Theme.colors.textSecondary}
//           />
//           <TouchableOpacity
//             style={styles.sendButton}
//             onPress={() => submitComment()}
//             disabled={submitDisabled}
//           >
//             <FontAwesome
//               size={24}
//               name="send"
//               color={
//                 submitDisabled
//                   ? Theme.colors.iconSecondary
//                   : Theme.colors.iconHighlighted
//               }
//             />
//           </TouchableOpacity>
//         </View>
//       </KeyboardAvoidingView>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: "center",
//     backgroundColor: Theme.colors.backgroundPrimary,
//   },
//   keyboardContainer: {
//     flex: 1,
//   },
//   inputContainer: {
//     flexDirection: "row",
//     width: "100%",
//     padding: 8,
//     alignItems: "center",
//   },
//   input: {
//     paddingLeft: 12,
//     marginRight: 8,
//     height: 48,
//     borderRadius: 24,
//     color: Theme.colors.textPrimary,
//     backgroundColor: Theme.colors.backgroundSecondary,
//     flex: 1,
//   },
//   sendButton: {
//     padding: 4,
//   },
// });
