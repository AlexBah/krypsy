// MainScreen.js
import React from "react";
import { Text, View } from "react-native";
import styles from "../styles/Styles";
import RedirectButton from "../components/RedirectButton";

const MainScreen = ({ navigation }) => {
  return (
    <View style={styles.background}>
      <Text style={styles.h2}>MainScreen{"\n\n"}</Text>

      <RedirectButton
        title = 'Register'
        screen = "Register"
      />
      <RedirectButton
        title = 'Entrance'
        screen = "Entrance"
      />
      <RedirectButton
        title = 'NewLogin'
        screen = "NewLogin"
      />
      <RedirectButton
        title = 'Login'
        screen = "Login"
      />
      
    </View>
  );
};

export default MainScreen;
