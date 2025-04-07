import React, { useState, useEffect } from "react";
import { View, Text } from "react-native";
import PhoneInput from "../components/PhoneInput";
import SendSmsButton from "../components/SendSmsButton";
import SmsInput from "../components/SmsInput";
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

    const handleSendSmsPress = (state, value) => {
        setSmsCode(value);
        setSmsInputEnable(state);
    };

    const handleSmsChange = (number) => {
        setSms(number);
    };

    useEffect(() => {
        if (sms.length === (maxSmsLength*2-1)) {
            if (sms === smsCode) {
                navigation.navigate('NewLogin')
            } else {
            // to do: не верное смс
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
                maxSmsLength={maxSmsLength}                
                onPress={handleSendSmsPress} 
            />

            <SmsInput 
                enable={smsInputEnable}
                onChange={handleSmsChange} 
            />

        </View>
    )
 }

export default Register;
