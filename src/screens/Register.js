import React, { useState, useEffect } from "react";
import { View, Text } from "react-native";
import PhoneInput from "../components/PhoneInput";
import SendSmsButton from "../components/SendSmsButton";
import SmsInput from "../components/SmsInput";
import GenerateRandomSms from '../cmd/GenerateRandomSms';
import SendSmsMtsExolve from "../cmd/SendSmsMtsExolve";
import styles from '../styles/Styles';

const Register = ({ navigation }) => {
    const [smsInputEnable, setSmsInputEnable] = useState(false);
    const [phoneNumber, setPhoneNumber] = useState('');
    const [sms, setSms] = useState('');
    const [smsCode, setSmsCode] = useState('A A A');
    const maxSmsLength = 3;

    const handlePhoneChange = (number) => {
        setPhoneNumber(number);
    };

    const handleSendSmsPress = (state) => {
        console.log('handleSendSmsPress');
        setSmsInputEnable(state);
    };

    const handleSend = async () => {
        console.log('handleSend');
        let value;
        value = GenerateRandomSms(maxSmsLength);
        setSmsCode(value);
        try {
            await SendSmsMtsExolve(value.replace(/\D/g, ''), phoneNumber.replace(/\D/g, ''))
        } catch (error) {
            console.error(error);
        }
    };

    const handleSmsChange = (number) => {
        setSms(number);
    };

    useEffect(() => {
        if (sms.length === (maxSmsLength*2-1)) {
            if (sms === smsCode) {
                navigation.navigate('NewLogin', { phoneNumber });
            } else {
            // to do: wrong SMS
            }
        };
    }, [sms]); 

    return(
        <View style={styles.background}>

            <PhoneInput 
                onChange={handlePhoneChange} 
            />

            <SendSmsButton 
                phoneNumber={phoneNumber}
                onPress={handleSendSmsPress} 
                onSend={handleSend}
            />

            <SmsInput 
                enable={smsInputEnable}
                onChange={handleSmsChange} 
            />

        </View>
    )
 }

export default Register;
