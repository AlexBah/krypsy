import React, {useState, useEffect } from "react";
import { Text, View } from "react-native";
import CodeIndicator from "../components/CodeIndicator";
import ButtonGrid from "../components/ButtonGrid";
import registerUser from "../cmd/grpc/grpcHandlers";
import styles from '../styles/Styles';

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
            // to do: gRPCs reqwest Register to server
            registerUser(phoneNumber, code)
                .then(response => {
                    if ( response.getUserId() == '0' ) {
                        throw new Error('The server was unable to record the user');
                    } else {
                        console.log('User registered, ID:', response.getUserId());
                    }
                })
                .catch(error => {
                    console.error('Error registering:', error);
                });

            // to do: save User to realm
            // to do: gRPCs reqwest Login to server
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
