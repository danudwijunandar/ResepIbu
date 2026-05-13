import { Search, X } from "lucide-react-native";
import React, { useEffect, useState } from "react";
import {
    FlatList,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";

import { searchRecipes } from "../api/theMealDB";
import RecipeCard from "../components/RecipeCard";

const popularSearches = [
  { label: "Beef", color: "#F7CC60" },
  { label: "Chicken", color: "#D88D2F" },
  { label: "Rice", color: "#F9E48B" },
  { label: "Seafood", color: "#E1B44B" },
];

interface Meal {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
  strCategory: string;
  [key: string]: any;
}

const SearchScreen = ({ navigation }: any) => {
  const [query, setQuery] = useState("Ayam");
  const [results, setResults] = useState<Meal[]>([]);

  useEffect(() => {
    handleSearch();
  }, []);

  const handleSearch = async () => {
    if (query.trim()) {
      try {
        const response = await searchRecipes(query);
        setResults(response.data.meals || []);
      } catch (error) {
        console.error("Error searching recipes:", error);
      }
    }
  };

  const clearSearch = () => {
    setQuery("");
    setResults([]);
  };

  const renderRecipeCard = ({ item }: any) => (
    <RecipeCard
      recipe={item}
      onPress={() => navigation.navigate("Detail", { id: item.idMeal })}
    />
  );

  const renderHeader = () => (
    <View style={styles.headerSection}>
      <Text style={styles.title}>Cari Resep</Text>
      <View style={styles.searchWrapper}>
        <View style={styles.searchInputContainer}>
          <Search size={18} color="#7C8B89" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Ayam"
            placeholderTextColor="#A3AEA8"
            value={query}
            onChangeText={setQuery}
            onSubmitEditing={handleSearch}
            returnKeyType="search"
          />
          {query.length > 0 && (
            <TouchableOpacity onPress={clearSearch} style={styles.clearButton}>
              <X size={18} color="#7C8B89" />
            </TouchableOpacity>
          )}
        </View>
      </View>

      <View style={styles.popularContainer}>
        <Text style={styles.sectionTitle}>Pencarian Populer</Text>
        <View style={styles.chipsContainer}>
          {popularSearches.map((item) => (
            <TouchableOpacity
              key={item.label}
              style={[styles.chip, { backgroundColor: item.color }]}
              onPress={() => {
                setQuery(item.label);
                setTimeout(handleSearch, 50);
              }}
            >
              <Text style={styles.chipText}>{item.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {query.trim().length > 0 && (
        <View style={[styles.resultsHeader, styles.headerSection]}>
          <Text style={styles.resultsTitle}>Hasil untuk "{query}"</Text>
        </View>
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={results}
        renderItem={renderRecipeCard}
        keyExtractor={(item) => item.idMeal}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentContainer}
        ListHeaderComponent={renderHeader}
        ListEmptyComponent={
          query.trim().length > 0 ? (
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>
                Tidak ada hasil untuk "{query}"
              </Text>
            </View>
          ) : null
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EEF6F1",
  },
  contentContainer: {
    paddingTop: 50,
    paddingBottom: 30,
  },
  headerSection: {
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "800",
    color: "#0D8065",
    marginBottom: 24,
  },
  searchWrapper: {
    marginBottom: 24,
  },
  searchInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    paddingHorizontal: 18,
    paddingVertical: 14,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 3,
  },
  searchIcon: {
    marginRight: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: "#1C2B29",
  },
  clearButton: {
    padding: 4,
  },
  popularContainer: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#1C2B29",
    marginBottom: 16,
  },
  chipsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  chip: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 999,
    marginRight: 10,
    marginBottom: 10,
  },
  chipText: {
    fontSize: 14,
    color: "#1C2B29",
    fontWeight: "700",
  },
  resultsHeader: {
    marginBottom: 16,
  },
  resultsTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#1C2B29",
  },
  emptyContainer: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  emptyText: {
    fontSize: 16,
    color: "#7C8B89",
  },
});

export default SearchScreen;
