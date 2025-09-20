// Entrance.js
import React, { useState, useEffect } from "react";
import { View, Text, Button } from "react-native";
import PhoneInput from "../components/PhoneInput";
import SendSmsButton from "../components/SendSmsButton";
import SmsInput from "../components/SmsInput";
import GenerateRandomSms from "../cmd/GenerateRandomSms";
import SendSmsMtsExolve from "../cmd/SendSmsMtsExolve";
import styles from "../styles/Styles";

const Entrance = ({ navigation }) => {
  const [smsInputEnable, setSmsInputEnable] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [sms, setSms] = useState("");
  const [smsCode, setSmsCode] = useState("A A A");
  const maxSmsLength = 3;
  const [hasError, setHasError] = useState(false);

  const handlePhoneChange = (number) => {
    setPhoneNumber(number);
  };

  const handleSendSmsPress = (state) => {
    console.log("handleSendSmsPress");
    setSmsInputEnable(state);
  };

  const handleSend = async () => {
    console.log("handleSend");
    let value;
    value = GenerateRandomSms(maxSmsLength);
    setSmsCode(value);
    try {
      await SendSmsMtsExolve(
        value.replace(/\D/g, ""),
        phoneNumber.replace(/\D/g, ""),
      );
    } catch (error) {
      console.error(error);
    }
  };

  const handleSmsChange = (number) => {
    setSms(number);
  };

  useEffect(() => {
    if (sms.length === maxSmsLength * 2 - 1) {
      if (sms === smsCode) {
        navigation.navigate("NewLogin", { phoneNumber });
      } else {
        setSmsInputEnable(false);
        setHasError(true);

        setTimeout(() => {
          setHasError(false);
          setSmsInputEnable(true);
        }, 1000);
      }
    }
  }, [sms]);

  return (
    <View style={styles.background}>
      <PhoneInput onChange={handlePhoneChange} />

      <SendSmsButton
        phoneNumber={phoneNumber}
        onPress={handleSendSmsPress}
        onSend={handleSend}
      />

      <SmsInput
        enable={smsInputEnable}
        onChange={handleSmsChange}
        style={hasError ? styles.errorSign : null}
      />

      <RedirectButton
        title = 'I have an account.\nLogin...'
        screen = "Entrance"
      />
    </View>
  );
};

export default Entrance;
