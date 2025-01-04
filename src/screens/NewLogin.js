import React, {useState, useEffect } from "react";
import { Text, View } from "react-native";
import styles from '../styles/Styles';
import CodeIndicator from "../components/CodeIndicator";
import ButtonGrid from "../components/ButtonGrid";

const NewLogin = ({ navigation }) => {
    const maxCodeLength = 4;
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
            // to do: запомнить код
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
