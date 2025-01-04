import React, { useState } from 'react';
import { View, TextInput } from 'react-native';
import Icon from '@expo/vector-icons/AntDesign';
import styles from '../styles/Styles';


const PhoneInput = ({ onChange }) => {
    const [phoneNumber, setPhoneNumber] = useState('');

    const formatPhoneNumber = (number) => {
        const cleaned = ('' + number).replace(/\D/g, '');
      
        const match = cleaned.match(/^(\d{0,1})(\d{0,3})(\d{0,3})(\d{0,2})(\d{0,2})$/);
        
        if (match) {
          return [
            match[1] ? `+${match[1]}` : '',
            match[2] ? `-${match[2]}` : '',
            match[3] ? `-${match[3]}` : '',
            match[4] ? `-${match[4]}` : '',
            match[5] ? `-${match[5]}` : ''
          ].join('');
        }
      
        return '';
    };
      
    const handleChange = (text) => {
        const formattedNumber = formatPhoneNumber(text);
        setPhoneNumber(formattedNumber);
        if (onChange) {
            onChange(formattedNumber);
        }
    };
      
    return (
        <View style={styles.inputBorder}>
            <Icon name="phone" size={23} style={styles.inputIcon} />
            <TextInput
                style={styles.inputText}
                value={phoneNumber}
                onChangeText={handleChange}
                keyboardType="phone-pad"
                placeholder="+7-000-000-00-00"
                placeholderTextColor={styles.inputText.color} 
                maxLength={16}
            />
        </View>

    );
};

export default PhoneInput;
