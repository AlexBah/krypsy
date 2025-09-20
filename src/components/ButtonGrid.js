// ButtonGrid.js
import React from "react";
import { View } from "react-native";
import styles from "../styles/Styles";
import CodeButton from "./CodeButton";

const values = [
  ["1", "2", "3"],
  ["4", "5", "6"],
  ["7", "8", "9"],
  ["", "0", "<X"],
];

const ButtonGrid = ({ onChange }) => {
  const handleCodeChange = (number) => {
    if (onChange) {
      onChange(number);
    }
  };

  return (
    <View style={styles.gridContainer}>
      {values.map((row, rowIndex) => (
        <View key={rowIndex} style={styles.gridRow}>
          {row.map((value, colIndex) => (
            <CodeButton
              key={colIndex}
              value={value}
              onPress={handleCodeChange}
            />
          ))}
        </View>
      ))}
    </View>
  );
};

export default ButtonGrid;
