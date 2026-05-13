import { ArrowLeft, Bookmark, Play } from "lucide-react-native";
import React, { useEffect, useState } from "react";
import {
    Image,
    Linking,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

import { getRecipeDetails } from "../api/theMealDB";
import { useBookmarks } from "../store/BookmarkContext";
import { parseIngredients } from "../utils/ingredients";

const DetailScreen = ({ route, navigation }: any) => {
  const { id } = route.params;
  const [recipe, setRecipe] = useState<any>(null);
  const [activeTab, setActiveTab] = useState("ingredients");
  const { addBookmark, removeBookmark, isBookmarked } = useBookmarks();

  useEffect(() => {
    fetchRecipeDetails();
  }, [id]);

  const fetchRecipeDetails = async () => {
    try {
      const response = await getRecipeDetails(id);
      setRecipe(response.data.meals[0]);
    } catch (error) {
      console.error("Error fetching recipe details:", error);
    }
  };

  const handleBookmark = () => {
    if (!recipe) return;
    const bookmarkData = {
      idMeal: recipe.idMeal,
      strMeal: recipe.strMeal,
      strMealThumb: recipe.strMealThumb,
      strCategory: recipe.strCategory,
      strArea: recipe.strArea,
    };
    if (isBookmarked(recipe.idMeal)) {
      removeBookmark(recipe.idMeal);
    } else {
      addBookmark(bookmarkData);
    }
  };

  const handleStartCooking = () => {
    if (recipe?.strYoutube) {
      Linking.openURL(recipe.strYoutube);
    }
  };

  if (!recipe) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Loading...</Text>
      </View>
    );
  }

  const ingredients = parseIngredients(recipe);

  return (
    <View style={styles.container}>
      {/* Header Image */}
      <View style={styles.imageContainer}>
        <Image source={{ uri: recipe.strMealThumb }} style={styles.image} />
        <View style={styles.overlay}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <ArrowLeft size={24} color="#FFFFFF" />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.bookmarkButton}
            onPress={handleBookmark}
          >
            <Bookmark
              size={24}
              color={isBookmarked(recipe.idMeal) ? "#0D8065" : "#FFFFFF"}
              fill={isBookmarked(recipe.idMeal) ? "#0D8065" : "transparent"}
            />
          </TouchableOpacity>
        </View>
      </View>

      {/* Content Sheet */}
      <View style={styles.contentContainer}>
        <ScrollView showsVerticalScrollIndicator={false}>
          {/* Info */}
          <View style={styles.infoContainer}>
            <Text style={styles.title}>{recipe.strMeal}</Text>
            <View style={styles.chipsContainer}>
              <View style={styles.categoryChip}>
                <Text style={styles.categoryText}>{recipe.strCategory}</Text>
              </View>
              <View style={styles.areaChip}>
                <Text style={styles.areaText}>{recipe.strArea}</Text>
              </View>
            </View>
          </View>

          {/* Tabs */}
          <View style={styles.tabsContainer}>
            <TouchableOpacity
              style={[
                styles.tab,
                activeTab === "ingredients" && styles.activeTab,
              ]}
              onPress={() => setActiveTab("ingredients")}
            >
              <Text
                style={[
                  styles.tabText,
                  activeTab === "ingredients" && styles.activeTabText,
                ]}
              >
                Bahan-bahan
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.tab,
                activeTab === "instructions" && styles.activeTab,
              ]}
              onPress={() => setActiveTab("instructions")}
            >
              <Text
                style={[
                  styles.tabText,
                  activeTab === "instructions" && styles.activeTabText,
                ]}
              >
                Cara Masak
              </Text>
            </TouchableOpacity>
          </View>

          {/* Tab Content */}
          {activeTab === "ingredients" ? (
            <View style={styles.ingredientsContainer}>
              {ingredients.map((item, index) => (
                <View key={index} style={styles.ingredientRow}>
                  <Text style={styles.ingredient}>{item.ingredient}</Text>
                  <Text style={styles.measure}>{item.measure}</Text>
                </View>
              ))}
            </View>
          ) : (
            <View style={styles.instructionsContainer}>
              <Text style={styles.instructions}>{recipe.strInstructions}</Text>
            </View>
          )}
        </ScrollView>

        {/* Action Button */}
        <TouchableOpacity
          style={styles.actionButton}
          onPress={handleStartCooking}
        >
          <Play size={20} color="#FFFFFF" />
          <Text style={styles.actionButtonText}>Mulai Memasak</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8FAFA",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  imageContainer: {
    height: "35%",
    position: "relative",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    paddingTop: 50,
    paddingHorizontal: 20,
  },
  backButton: {
    backgroundColor: "rgba(0,0,0,0.5)",
    borderRadius: 20,
    padding: 8,
  },
  bookmarkButton: {
    backgroundColor: "rgba(0,0,0,0.5)",
    borderRadius: 20,
    padding: 8,
  },
  contentContainer: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    marginTop: -30,
    paddingTop: 30,
    paddingHorizontal: 20,
  },
  infoContainer: {
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#1C2B29",
    marginBottom: 12,
  },
  chipsContainer: {
    flexDirection: "row",
  },
  categoryChip: {
    backgroundColor: "#0D8065",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    marginRight: 8,
  },
  categoryText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "500",
  },
  areaChip: {
    backgroundColor: "#E0E0E0",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  areaText: {
    color: "#1C2B29",
    fontSize: 14,
    fontWeight: "500",
  },
  tabsContainer: {
    flexDirection: "row",
    backgroundColor: "#F8FAFA",
    borderRadius: 12,
    padding: 4,
    marginBottom: 20,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: "center",
    borderRadius: 8,
  },
  activeTab: {
    backgroundColor: "#FFFFFF",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  tabText: {
    fontSize: 16,
    color: "#7C8B89",
  },
  activeTabText: {
    color: "#1C2B29",
    fontWeight: "600",
  },
  ingredientsContainer: {
    marginBottom: 100,
  },
  ingredientRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0",
  },
  ingredient: {
    fontSize: 16,
    color: "#1C2B29",
    flex: 2,
  },
  measure: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#0D8065",
    flex: 1,
    textAlign: "right",
  },
  instructionsContainer: {
    marginBottom: 100,
  },
  instructions: {
    fontSize: 16,
    color: "#1C2B29",
    lineHeight: 24,
  },
  actionButton: {
    position: "absolute",
    bottom: 20,
    left: 20,
    right: 20,
    backgroundColor: "#0D8065",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 16,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  actionButtonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 8,
  },
});

export default DetailScreen;
