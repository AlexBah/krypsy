// Navigator.js
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Register from "./Register";
import Entrance from "./Entrance";
import NewLogin from "./NewLogin";
import Login from "./Login";
import MainScreen from "./MainScreen";

const Stack = createNativeStackNavigator();

const AppNavigator = ({ screenname }) => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={screenname}
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="Entrance" component={Entrance} />
        <Stack.Screen name="NewLogin" component={NewLogin} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="MainScreen" component={MainScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
