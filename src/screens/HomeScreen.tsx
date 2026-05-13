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

const categories = [
  { id: "Seafood", label: "Seafood", icon: "🐟" },
  { id: "Beef", label: "Sapi", icon: "🥩" },
  { id: "Chicken", label: "Ayam", icon: "🍗" },
  { id: "Vegetarian", label: "Sayur", icon: "🥦" },
];

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
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
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

        {heroRecipe && (
          <View style={styles.heroContainer}>
            <Image
              source={{ uri: heroRecipe.strMealThumb }}
              style={styles.heroImage}
            />
            <View style={styles.heroOverlay}>
              <Text style={styles.heroLabel}>RESEP PILIHAN HARI INI</Text>
              <Text style={styles.heroTitle} numberOfLines={2}>
                {heroRecipe.strMeal}
              </Text>
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

        <View style={styles.categoriesSection}>
          <Text style={styles.sectionTitle}>Kategori</Text>
          <View style={styles.categoryCards}>
            {categories.map((category) => {
              const isSelected = selectedCategory === category.id;
              return (
                <TouchableOpacity
                  key={category.id}
                  style={[
                    styles.categoryCard,
                    isSelected && styles.categoryCardSelected,
                  ]}
                  onPress={() => setSelectedCategory(category.id)}
                >
                  <View
                    style={[
                      styles.categoryIcon,
                      isSelected && styles.categoryIconSelected,
                    ]}
                  >
                    <Text style={styles.categoryIconText}>{category.icon}</Text>
                  </View>
                  <Text
                    style={[
                      styles.categoryLabel,
                      isSelected && styles.categoryLabelSelected,
                    ]}
                  >
                    {category.label}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        <View style={styles.recipesHeader}>
          <Text style={styles.sectionTitle}>Resep Terbaru</Text>
          <TouchableOpacity>
            <Text style={styles.seeAllText}>Lihat Semua</Text>
          </TouchableOpacity>
        </View>

        <FlatList
          data={recipes}
          renderItem={renderRecipeCard}
          keyExtractor={(item) => item.idMeal}
          showsVerticalScrollIndicator={false}
          scrollEnabled={false}
          contentContainerStyle={styles.recipesContainer}
        />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8FAFA",
  },
  scrollContent: {
    paddingBottom: 30,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 10,
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 16,
    backgroundColor: "#0D8065",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  appName: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#1C2B29",
  },
  greeting: {
    fontSize: 14,
    color: "#7C8B89",
    marginTop: 2,
  },
  bellButton: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  heroContainer: {
    marginHorizontal: 20,
    borderRadius: 22,
    overflow: "hidden",
    height: 220,
    marginBottom: 24,
    backgroundColor: "#E6F2EF",
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
    backgroundColor: "rgba(0,0,0,0.35)",
  },
  heroLabel: {
    fontSize: 12,
    fontWeight: "700",
    color: "#FFFFFF",
    letterSpacing: 0.8,
    marginBottom: 8,
  },
  heroTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginBottom: 16,
  },
  heroButton: {
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 24,
    alignSelf: "flex-start",
  },
  heroButtonText: {
    color: "#0D8065",
    fontWeight: "700",
    fontSize: 14,
  },
  categoriesSection: {
    marginBottom: 24,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1C2B29",
  },
  categoryCards: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 16,
  },
  categoryCard: {
    width: 76,
    borderRadius: 18,
    backgroundColor: "#FFFFFF",
    paddingTop: 14,
    paddingBottom: 16,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 3,
  },
  categoryCardSelected: {
    backgroundColor: "#0D8065",
  },
  categoryIcon: {
    width: 44,
    height: 44,
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#EFF7F5",
    marginBottom: 10,
  },
  categoryIconSelected: {
    backgroundColor: "#FFFFFF",
  },
  categoryIconText: {
    fontSize: 20,
  },
  categoryLabel: {
    fontSize: 13,
    color: "#1C2B29",
    fontWeight: "600",
  },
  categoryLabelSelected: {
    color: "#FFFFFF",
  },
  recipesHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  seeAllText: {
    color: "#0D8065",
    fontWeight: "700",
  },
  recipesContainer: {
    paddingBottom: 20,
  },
});

export default HomeScreen;
