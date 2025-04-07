import React, { useState, useEffect } from 'react';
import { TouchableOpacity, Text } from 'react-native';
import styles from '../styles/Styles';
import GenerateRandomSms from '../cmd/GenerateRandomSms';
import SendSmsMtsExolve from "../cmd/SendSmsMtsExolve";


const SendSmsButton = ({ phoneNumber, maxSmsLength, onPress }) => {
    const [buttonEnable, setButtonEnable] = useState(false);
    const [buttonTitle, setButtonTitle] = useState('wait phone');
    const [intervalId, setIntervalId] = useState(null);
    let smsCode = 'A A A'

    useEffect(() => {
        const phoneRegex = /^\+\d{1}-\d{3}-\d{3}-\d{2}-\d{2}$/;

        if (phoneRegex.test(phoneNumber)) {
            setButtonTitle('send sms');
            setButtonEnable(true);
        } else {
            setButtonEnable(false);
            setButtonTitle('invalid phone');
            onPress(false, smsCode); // state smsInputEnable
            if (intervalId) {
                clearInterval(intervalId);
                setIntervalId(null);
            }
        }
      }, [phoneNumber]); 
    
    const handlePress = async () => {
        const timeout = 10;
        let countdown = timeout;

        smsCode = GenerateRandomSms(maxSmsLength);
        try {
            await SendSmsMtsExolve(smsCode.replace(/\D/g, ''), phoneNumber.replace(/\D/g, ''))
        } catch (error) {
            console.error(error);
        }

        setButtonEnable(false);
        setButtonTitle(`new sms (${countdown})`);
        onPress(true, smsCode); // state smsInputEnable

        const Id = setInterval(() => {
            countdown -= 1;
            setButtonTitle(`new sms (${countdown})`);
            if (countdown <= 0) {
                clearInterval(intervalId);
                setButtonEnable(true);
                setButtonTitle('send sms');
            }
        }, 1000);
        setIntervalId(Id);
        return () => clearInterval(Id);
    };

    return (
        <TouchableOpacity 
            disabled={!buttonEnable}
            style={styles.button}
            onPress={handlePress}
        >
            <Text style={styles.inputText}>
                {buttonTitle}
            </Text>
        </TouchableOpacity>
    );
};

export default SendSmsButton;
