// RedirectButton.js
import React from "react";
import { TouchableOpacity, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import styles from "../styles/Styles";

const RedirectButton = ({ title, screen }) => {
  const navigation = useNavigation(); 

  return (
    <TouchableOpacity
      style={styles.button}
      onPress={() => navigation.navigate(screen)}
    >
      <Text style={styles.h2}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default RedirectButton;
