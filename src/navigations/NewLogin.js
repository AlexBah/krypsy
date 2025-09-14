import React, {useState, useEffect } from "react";
import { Text, View } from "react-native";
import CodeIndicator from "../components/CodeIndicator";
import ButtonGrid from "../components/ButtonGrid";
import styles from '../styles/Styles';
import { RegistrationService } from '../services/registrationService';

const NewLogin = ({ navigation, route }) => {
    const maxCodeLength = 4;
    const { phoneNumber } = route.params || {};
    const [code, setCode] = useState('');

    const handleCodeChange = (number) => {
        switch (number) {
            case '<X':
                if (code.length > 0) { setCode(code.slice(0, -1)) };
                break;
            default:
                if (code.length < maxCodeLength) { setCode(code + number) };
        };
    };

    useEffect(() => {
        if (code.length === maxCodeLength) {
            // Register to server
            RegistrationService.completeRegistration(phoneNumber, code)
            .then(result => {
              if (result.success) {
                navigation.navigate('MainScreen');
              } else {
                console.error('Registration failed:', result.error);
              }
            });
            // to do: save User to realm{userserverid}
            // to do: reqwest Login to server
            // to do: save JWT to realm
            navigation.navigate('MainScreen')
        };
    }, [code]); 

    return (
        <View style={styles.background}>

            <CodeIndicator codeLength={code.length} maxCodeLength={maxCodeLength} />
            <Text style={styles.h2}>new code</Text>
            <ButtonGrid onChange={handleCodeChange} />

        </View>
    );
}

export default NewLogin;
