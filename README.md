# 🍲 ResepIbu - Modern Mobile Recipe Discovery

A beautifully crafted, highly performant mobile application built with **React Native (Expo)** and **TypeScript**. Designed to help homemakers discover, search, and save recipes seamlessly. The app consumes the public **TheMealDB API** and emphasizes a clean, modern UI/UX without the friction of user authentication.

---

## 🚀 Key Features
*   **Dynamic Data Fetching:** Real-time recipe generation and categorization using Axios with centralized API configuration.
*   **Intelligent Search:** Quick search functionality with localized popular search chips.
*   **Offline Bookmarks:** Persistent local storage implementation allowing users to save favorite recipes using `@react-native-async-storage/async-storage` and React Context API.
*   **Custom UI Components:** Fully custom floating bottom tab navigation and reusable recipe cards for a premium user feel.
*   **Data Transformation Utility:** Includes a robust custom parser to clean and merge highly fragmented JSON API responses (20 separate ingredient/measure keys) into a unified, iterable structure.

---

## 🛠️ Tech Stack & Architecture

This project strictly follows Clean Architecture principles, ensuring modularity, scalability, and maintainability.

*   **Framework:** React Native (Expo)
*   **Language:** TypeScript (Strict typing with explicit Interfaces)
*   **Networking:** Axios (Configured with custom instances)
*   **State Management:** React Context API + Custom Hooks (`useBookmarks`)
*   **Local Storage:** AsyncStorage
*   **Navigation:** React Navigation (`@react-navigation/bottom-tabs`, Custom Tab Bar)
*   **Icons:** Lucide React Native

### 📂 Directory Structure Highlights
```text
src/
├── api/          # Centralized Axios instances and API endpoint definitions
├── components/   # Reusable UI components (e.g., RecipeCard)
├── navigation/   # AppNavigator and custom Floating Tab Bar implementation
├── screens/      # Main application views (Home, Detail, Search, Saved)
├── store/        # BookmarkContext for global state management
└── utils/        # Helper functions (e.g., ingredients payload parser)
