import { Bell, User } from "lucide-react-native";
import React, { useEffect, useState } from "react";
import {
    FlatList,
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

import { filterByCategory, getRandomRecipe } from "../api/theMealDB";
import RecipeCard from "../components/RecipeCard";

const categories = ["Seafood", "Beef", "Chicken", "Vegetarian"];

interface Meal {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
  strCategory: string;
  [key: string]: any;
}

const HomeScreen = ({ navigation }: any) => {
  const [selectedCategory, setSelectedCategory] = useState("Seafood");
  const [recipes, setRecipes] = useState<Meal[]>([]);
  const [heroRecipe, setHeroRecipe] = useState<Meal | null>(null);

  useEffect(() => {
    fetchHeroRecipe();
    fetchRecipes(selectedCategory);
  }, []);

  useEffect(() => {
    fetchRecipes(selectedCategory);
  }, [selectedCategory]);

  const fetchHeroRecipe = async () => {
    try {
      const response = await getRandomRecipe();
      setHeroRecipe(response.data.meals[0]);
    } catch (error) {
      console.error("Error fetching hero recipe:", error);
    }
  };

  const fetchRecipes = async (category: string) => {
    try {
      const response = await filterByCategory(category);
      setRecipes(response.data.meals || []);
    } catch (error) {
      console.error("Error fetching recipes:", error);
    }
  };

  const renderRecipeCard = ({ item }: any) => (
    <RecipeCard
      recipe={item}
      onPress={() => navigation.navigate("Detail", { id: item.idMeal })}
    />
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <View style={styles.avatar}>
            <User size={24} color="#FFFFFF" />
          </View>
          <View>
            <Text style={styles.appName}>Dapur Segar</Text>
            <Text style={styles.greeting}>Halo, Mau Masak Apa Hari Ini?</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.bellButton}>
          <Bell size={24} color="#1C2B29" />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Hero Section */}
        {heroRecipe && (
          <View style={styles.heroContainer}>
            <Image
              source={{ uri: heroRecipe.strMealThumb }}
              style={styles.heroImage}
            />
            <View style={styles.heroOverlay}>
              <Text style={styles.heroTitle}>{heroRecipe.strMeal}</Text>
              <TouchableOpacity
                style={styles.heroButton}
                onPress={() =>
                  navigation.navigate("Detail", { id: heroRecipe.idMeal })
                }
              >
                <Text style={styles.heroButtonText}>Lihat Resep</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}

        {/* Categories */}
        <View style={styles.categoriesContainer}>
          <Text style={styles.sectionTitle}>Kategori</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.categoriesScroll}
          >
            {categories.map((category) => (
              <TouchableOpacity
                key={category}
                style={[
                  styles.categoryButton,
                  selectedCategory === category && styles.selectedCategory,
                ]}
                onPress={() => setSelectedCategory(category)}
              >
                <Text
                  style={[
                    styles.categoryText,
                    selectedCategory === category &&
                      styles.selectedCategoryText,
                  ]}
                >
                  {category}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Recipes List */}
        <View style={styles.recipesContainer}>
          <Text style={styles.sectionTitle}>Resep Terbaru</Text>
          <FlatList
            data={recipes}
            renderItem={renderRecipeCard}
            keyExtractor={(item) => item.idMeal}
            showsVerticalScrollIndicator={false}
            scrollEnabled={false}
          />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8FAFA",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 20,
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#0D8065",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  appName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1C2B29",
  },
  greeting: {
    fontSize: 14,
    color: "#7C8B89",
  },
  bellButton: {
    padding: 8,
  },
  heroContainer: {
    marginHorizontal: 20,
    marginBottom: 20,
    borderRadius: 16,
    overflow: "hidden",
    height: 200,
  },
  heroImage: {
    width: "100%",
    height: "100%",
  },
  heroOverlay: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    padding: 20,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  heroTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginBottom: 12,
  },
  heroButton: {
    backgroundColor: "#0D8065",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    alignSelf: "flex-start",
  },
  heroButtonText: {
    color: "#FFFFFF",
    fontWeight: "600",
  },
  categoriesContainer: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1C2B29",
    marginHorizontal: 20,
    marginBottom: 12,
  },
  categoriesScroll: {
    paddingHorizontal: 20,
  },
  categoryButton: {
    backgroundColor: "#FFFFFF",
    borderRadius: 25,
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginRight: 12,
    borderWidth: 1,
    borderColor: "#E0E0E0",
  },
  selectedCategory: {
    backgroundColor: "#0D8065",
    borderColor: "#0D8065",
  },
  categoryText: {
    fontSize: 14,
    color: "#1C2B29",
  },
  selectedCategoryText: {
    color: "#FFFFFF",
  },
  recipesContainer: {
    flex: 1,
  },
});

export default HomeScreen;
