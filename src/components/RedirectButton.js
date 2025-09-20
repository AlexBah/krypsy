// RedirectButton.js
import React from "react";
import { TouchableOpacity, Text } from "react-native";
import styles from "../styles/Styles";

const RedirectButton = ({ title, screen }) => {

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate(screen)}
    >
      <Text style={styles.h2}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default RedirectButton;
