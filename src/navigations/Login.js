// Login.js
import React, { useState, useEffect } from "react";
import { View, Text } from "react-native";
import styles from "../styles/Styles";
import CodeIndicator from "../components/CodeIndicator";
import ButtonGrid from "../components/ButtonGrid";
import LoginService from "../services/loginService";

const Login = ({ navigation }) => {
  const op = "Login: "
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
          console.error(op + "Login failed:", result.error);
        }
      });
    }
  }, [code]);

  return (
    <View style={styles.background}>
      <CodeIndicator codeLength={code.length} maxCodeLength={maxCodeLength} />

      <Text style={styles.h2}>code</Text>
 
      <ButtonGrid onChange={handleCodeChange} />
    </View>
  );
};

export default Login;
