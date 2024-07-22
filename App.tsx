import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import Router from "./src/router";

function App(): React.JSX.Element {
  return (
    <NavigationContainer>
      <Router />
    </NavigationContainer>
  );
}

export default App;
