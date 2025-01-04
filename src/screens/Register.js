import React, { useState, useEffect } from "react";
import { View } from "react-native";
import PhoneInput from "../components/PhoneInput";
import SendSmsButton from "../components/SendSmsButton";
import SmsInput from "../components/SmsInput";
import styles from '../styles/Styles';

const Register = ({ navigation }) => {
    const [smsInputEnable, setSmsInputEnable] = useState(false);
    const [phoneNumber, setPhoneNumber] = useState('');
    const [sms, setSms] = useState('');

    const handlePhoneChange = (number) => {
        setPhoneNumber(number);
    };

    const handleSendSmsPress = (state) => {
        setSmsInputEnable(state);
    };

    const handleSmsChange = (number) => {
        setSms(number);
    };

    useEffect(() => {
        const maxSmsLength = 5;
        if (sms.length === maxSmsLength) {
            // to do: проверка смс
            navigation.navigate('MainScreen')
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
            />

            <SmsInput 
                enable={smsInputEnable}
                onChange={handleSmsChange} 
            />

        </View>
    )
 }

export default Register;
