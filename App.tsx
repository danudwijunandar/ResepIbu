import React from "react";
import { AppRegistry, StatusBar } from "react-native";

import AppNavigator from "./src/navigation/AppNavigator";
import { BookmarkProvider } from "./src/store/BookmarkContext";

function App() {
  return (
    <BookmarkProvider>
      <AppNavigator />
      <StatusBar style="auto" />
    </BookmarkProvider>
  );
}

AppRegistry.registerComponent("main", () => App);

export default App;
