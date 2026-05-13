import { Bookmark } from "lucide-react-native";
import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface RecipeCardProps {
  recipe: {
    idMeal: string;
    strMeal: string;
    strMealThumb: string;
    strCategory?: string;
    strArea?: string;
    [key: string]: any;
  };
  onPress: () => void;
  isBookmarked?: boolean;
  onBookmarkPress?: () => void;
}

const RecipeCard: React.FC<RecipeCardProps> = ({
  recipe,
  onPress,
  isBookmarked = false,
  onBookmarkPress,
}) => {
  const categoryLabel = recipe.strCategory || recipe.strArea || "Resep";

  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Image source={{ uri: recipe.strMealThumb }} style={styles.image} />
      <View style={styles.content}>
        <View style={styles.titleRow}>
          <Text style={styles.title} numberOfLines={2}>
            {recipe.strMeal}
          </Text>
          <TouchableOpacity
            style={[
              styles.bookmarkButton,
              isBookmarked && styles.bookmarkButtonActive,
            ]}
            onPress={onBookmarkPress}
          >
            <Bookmark size={18} color={isBookmarked ? "#FFFFFF" : "#0D8065"} />
          </TouchableOpacity>
        </View>
        <View style={styles.metaRow}>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{categoryLabel}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoText}>Mudah</Text>
            <Text style={styles.dot}>•</Text>
            <Text style={styles.infoText}>45 Min</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    marginVertical: 8,
    marginHorizontal: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 3,
    overflow: "hidden",
  },
  image: {
    width: 100,
    height: 100,
  },
  content: {
    flex: 1,
    padding: 14,
    justifyContent: "space-between",
  },
  titleRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  title: {
    flex: 1,
    fontSize: 16,
    fontWeight: "700",
    color: "#1C2B29",
  },
  bookmarkButton: {
    marginLeft: 12,
    padding: 6,
    borderRadius: 12,
    backgroundColor: "#E8F7F2",
  },
  bookmarkButtonActive: {
    backgroundColor: "#0D8065",
  },
  metaRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  badge: {
    backgroundColor: "#E8F7F2",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 12,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: "700",
    color: "#0D8065",
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  infoText: {
    fontSize: 12,
    color: "#7C8B89",
  },
  dot: {
    marginHorizontal: 6,
    fontSize: 12,
    color: "#7C8B89",
  },
});

export default RecipeCard;
