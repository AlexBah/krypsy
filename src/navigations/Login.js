// Login.js
import React, { useState, useEffect } from "react";
import { View } from "react-native";
import styles from "../styles/Styles";
import CodeIndicator from "../components/CodeIndicator";
import ButtonGrid from "../components/ButtonGrid";

const Login = ({ navigation }) => {
  const maxCodeLength = 4;
  const [code, setCode] = useState("");

  const handleCodeChange = (number) => {
    switch (number) {
      case "<X":
        if (code.length > 0) {
          setCode(code.slice(0, -1));
        }
        break;
      default:
        if (code.length < maxCodeLength) {
          setCode(code + number);
        }
    }
  };

  useEffect(() => {
    if (code.length === maxCodeLength) {
      // Login to server
      LoginService.completeLogin(code).then((result) => {
        if (result.success) {
          navigation.navigate("MainScreen");
        } else {
          console.error("Login failed:", result.error);
        }
      });
    }
  }, [code]);

  return (
    <View style={styles.background}>
      <CodeIndicator codeLength={code.length} maxCodeLength={maxCodeLength} />
      <ButtonGrid onChange={handleCodeChange} />
    </View>
  );
};

export default Login;
