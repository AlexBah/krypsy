// SendSmsButton.js
import React, { useState, useEffect, useRef } from "react";
import { TouchableOpacity, Text } from "react-native";
import styles from "../styles/Styles";

const SendSmsButton = ({ phoneNumber, onPress, onSend }) => {
  const [buttonEnable, setButtonEnable] = useState(false);
  const [buttonTitle, setButtonTitle] = useState("wait phone");
  const intervalRef = useRef(null);

  useEffect(() => {
    const phoneRegex = /^\+\d{1}-\d{3}-\d{3}-\d{2}-\d{2}$/;

    if (phoneRegex.test(phoneNumber)) {
      setButtonTitle("send sms");
      setButtonEnable(true);
    } else {
      setButtonEnable(false);
      setButtonTitle("invalid phone");
      // state smsInputEnable
      if (onPress) {
        onPress(false);
      }
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }
  }, [phoneNumber]);

  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, []);

  const handlePress = () => {
    console.log("handlePress");
    const timeout = 10;
    let countdown = timeout;

    if (onSend) {
      onSend();
    }

    setButtonEnable(false);
    setButtonTitle(`new sms (${countdown})`);
    if (onPress) {
      onPress(true);
    }

    intervalRef.current = setInterval(() => {
      countdown -= 1;
      if (countdown > 0) {
        setButtonTitle(`new sms (${countdown})`);
      } else {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
        setButtonEnable(true);
        setButtonTitle("send sms");
      }
    }, 1000);
  };

  return (
    <TouchableOpacity
      disabled={!buttonEnable}
      style={styles.button}
      onPress={handlePress}
    >
      <Text style={styles.inputText}>{buttonTitle}</Text>
    </TouchableOpacity>
  );
};

export default SendSmsButton;
