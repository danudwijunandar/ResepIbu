import React from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";

import RecipeCard from "../components/RecipeCard";
import { useBookmarks } from "../store/BookmarkContext";

const SavedScreen = ({ navigation }: any) => {
  const { bookmarks } = useBookmarks();

  const renderRecipeCard = ({ item }: any) => (
    <RecipeCard
      recipe={item}
      onPress={() => navigation.navigate("Detail", { id: item.idMeal })}
      isBookmarked={true}
    />
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Tersimpan</Text>
      </View>

      {bookmarks.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>Belum ada resep yang disimpan</Text>
        </View>
      ) : (
        <FlatList
          data={bookmarks}
          renderItem={renderRecipeCard}
          keyExtractor={(item) => item.idMeal}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContainer}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8FAFA",
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#1C2B29",
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyText: {
    fontSize: 16,
    color: "#7C8B89",
    textAlign: "center",
  },
  listContainer: {
    paddingBottom: 20,
  },
});

export default SavedScreen;
