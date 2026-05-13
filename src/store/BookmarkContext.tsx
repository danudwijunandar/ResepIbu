import AsyncStorage from "@react-native-async-storage/async-storage";
import React, {
    createContext,
    ReactNode,
    useContext,
    useEffect,
    useState,
} from "react";

interface Bookmark {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
  strCategory: string;
  strArea?: string;
}

interface BookmarkContextType {
  bookmarks: Bookmark[];
  addBookmark: (recipe: Bookmark) => void;
  removeBookmark: (id: string) => void;
  isBookmarked: (id: string) => boolean;
}

const BookmarkContext = createContext<BookmarkContextType | undefined>(
  undefined,
);

export const useBookmarks = () => {
  const context = useContext(BookmarkContext);
  if (!context) {
    throw new Error("useBookmarks must be used within a BookmarkProvider");
  }
  return context;
};

interface BookmarkProviderProps {
  children: ReactNode;
}

export const BookmarkProvider: React.FC<BookmarkProviderProps> = ({
  children,
}) => {
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);

  useEffect(() => {
    loadBookmarks();
  }, []);

  const loadBookmarks = async () => {
    try {
      const stored = await AsyncStorage.getItem("bookmarks");
      if (stored) {
        setBookmarks(JSON.parse(stored));
      }
    } catch (error) {
      console.error("Error loading bookmarks:", error);
    }
  };

  const saveBookmarks = async (newBookmarks: Bookmark[]) => {
    try {
      await AsyncStorage.setItem("bookmarks", JSON.stringify(newBookmarks));
    } catch (error) {
      console.error("Error saving bookmarks:", error);
    }
  };

  const addBookmark = (recipe: Bookmark) => {
    if (!isBookmarked(recipe.idMeal)) {
      const newBookmarks = [...bookmarks, recipe];
      setBookmarks(newBookmarks);
      saveBookmarks(newBookmarks);
    }
  };

  const removeBookmark = (id: string) => {
    const newBookmarks = bookmarks.filter((b) => b.idMeal !== id);
    setBookmarks(newBookmarks);
    saveBookmarks(newBookmarks);
  };

  const isBookmarked = (id: string) => {
    return bookmarks.some((b) => b.idMeal === id);
  };

  return (
    <BookmarkContext.Provider
      value={{ bookmarks, addBookmark, removeBookmark, isBookmarked }}
    >
      {children}
    </BookmarkContext.Provider>
  );
};
