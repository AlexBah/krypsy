// Entrance.js
import React, { useState, useEffect } from "react";
import { View, Text } from "react-native";
import PhoneInput from "../components/PhoneInput";
import SendSmsButton from "../components/SendSmsButton";
import SmsInput from "../components/SmsInput";
import RedirectButton from "../components/RedirectButton";
import GenerateRandomSms from "../cmd/MTSExolve/GenerateRandomSms";
import SendSmsMtsExolve from "../cmd//MTSExolve/SendSmsMtsExolve";
import styles from "../styles/Styles";
import EntranceService from "../services/entranceService";

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
        EntranceService.completeEntrance(phoneNumber).then((result) => {
          if (result.success) {
            navigation.navigate("Login");
          } else {
            console.error("Entrance failed:", result.error);
          }
        });
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
      <Text style={styles.h2}>{'Entrance\n'}</Text>

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

      <Text style={styles.h2}>{'\n\n\n\nI have not an account.'}</Text>

      <RedirectButton
        title = {' Registration... '}
        screen = "Register"
      />
    </View>
  );
};

export default Entrance;
