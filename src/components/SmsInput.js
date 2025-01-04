import React, { useState } from 'react';
import { View, TextInput } from 'react-native';
import styles from '../styles/Styles';

const SmsInput = ({ enable, onChange }) => {
    const [sms, setSms] = useState('');

    const formatSms = (number) => {
        const cleaned = ('' + number).replace(/\D/g, '');
        const match = cleaned.match(/^(\d{0,3})$/);
        if (match) {
            return match[1].split('').join(' ');
        }
        return '';
    };
      
    const handleChange = (text) => {
        const formattedSms = formatSms(text);
        setSms(formattedSms);
        if (onChange) {
            onChange(formattedSms);
        }
    };
      
    return (
        <View style={styles.inputBorder}>
            <TextInput
                editable={enable} 
                style={styles.inputText}
                value={sms}
                onChangeText={handleChange}
                keyboardType="phone-pad"
                placeholder="_ _ _"
                placeholderTextColor={styles.inputText.color} 
                maxLength={5}
            />
        </View>
    );
};

export default SmsInput;
