// NewLogin.js
import React, { useState, useEffect } from "react";
import { Text, View } from "react-native";
import CodeIndicator from "../components/CodeIndicator";
import ButtonGrid from "../components/ButtonGrid";
import styles from "../styles/Styles";
import RegistrService from "../services/registrService";
import LoginService from "../services/loginService";

const NewLogin = ({ navigation, route }) => {
  const maxCodeLength = 4;
  const { phoneNumber } = route.params || {};
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
      // Register to server
      RegistrService.completeRegistration(phoneNumber, code).then((result) => {
        if (result.success) {
          // Login to server
          LoginService.completeLogin(code).then((result) => {
            if (result.success) {
              navigation.navigate("MainScreen");
            } else {
              console.error("Login failed:", result.error);
            }
          });
        } else {
          console.error("Registration failed:", result.error);
        }
      });
    }
  }, [code]);
  
  return (
    <View style={styles.background}>
      <CodeIndicator codeLength={code.length} maxCodeLength={maxCodeLength} />

      <Text style={styles.h2}>new code</Text>

      <ButtonGrid onChange={handleCodeChange} />
    </View>
  );
};

export default NewLogin;
