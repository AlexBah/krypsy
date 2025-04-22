import React, { useState, useEffect } from 'react';
import { TouchableOpacity, Text } from 'react-native';
import styles from '../styles/Styles';

const SendSmsButton = ({ phoneNumber, onPress, onSend }) => {
    const [buttonEnable, setButtonEnable] = useState(false);
    const [buttonTitle, setButtonTitle] = useState('wait phone');
    const [intervalId, setIntervalId] = useState(null);

    useEffect(() => {
        const phoneRegex = /^\+\d{1}-\d{3}-\d{3}-\d{2}-\d{2}$/;

        if (phoneRegex.test(phoneNumber)) {
            setButtonTitle('send sms');
            setButtonEnable(true);
        } else {
            setButtonEnable(false);
            setButtonTitle('invalid phone');
            // state smsInputEnable
            if (onPress) { onPress(false); }
            if (intervalId) {
                clearInterval(intervalId);
                setIntervalId(null);
            }
        }
      }, [phoneNumber]); 
    
    const handlePress = async () => {
        const timeout = 10;
        let countdown = timeout;

        if (onSend) { onSend(); }

        setButtonEnable(false);
        setButtonTitle(`new sms (${countdown})`);
        // state smsInputEnable
        if (onPress) { onPress(true); }

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
