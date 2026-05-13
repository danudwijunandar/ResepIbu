import { Search, X } from "lucide-react-native";
import React, { useState } from "react";
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
  "Rendang",
  "Nasi Goreng",
  "Sate",
  "Gado-gado",
  "Bakso",
];

interface Meal {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
  strCategory: string;
  [key: string]: any;
}

const SearchScreen = ({ navigation }: any) => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Meal[]>([]);

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

  return (
    <View style={styles.container}>
      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <View style={styles.searchInputContainer}>
          <Search size={20} color="#7C8B89" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Cari resep..."
            value={query}
            onChangeText={setQuery}
            onSubmitEditing={handleSearch}
            returnKeyType="search"
          />
          {query.length > 0 && (
            <TouchableOpacity onPress={clearSearch}>
              <X size={20} color="#7C8B89" />
            </TouchableOpacity>
          )}
        </View>
      </View>

      {results.length === 0 ? (
        <>
          {/* Popular Searches */}
          <View style={styles.popularContainer}>
            <Text style={styles.sectionTitle}>Pencarian Populer</Text>
            <View style={styles.chipsContainer}>
              {popularSearches.map((search) => (
                <TouchableOpacity
                  key={search}
                  style={styles.chip}
                  onPress={() => {
                    setQuery(search);
                    handleSearch();
                  }}
                >
                  <Text style={styles.chipText}>{search}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </>
      ) : (
        <>
          {/* Search Results */}
          <View style={styles.resultsContainer}>
            <Text style={styles.sectionTitle}>Hasil Pencarian</Text>
            <FlatList
              data={results}
              renderItem={renderRecipeCard}
              keyExtractor={(item) => item.idMeal}
              showsVerticalScrollIndicator={false}
            />
          </View>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8FAFA",
  },
  searchContainer: {
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 20,
  },
  searchInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
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
  popularContainer: {
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1C2B29",
    marginBottom: 16,
  },
  chipsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  chip: {
    backgroundColor: "#F4C553",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
    marginBottom: 8,
  },
  chipText: {
    fontSize: 14,
    color: "#1C2B29",
    fontWeight: "500",
  },
  resultsContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
});

export default SearchScreen;
