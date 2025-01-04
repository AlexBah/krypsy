import React from 'react';
import { View } from "react-native";
import styles from '../styles/Styles';
import Circle from './Circle';

const CodeIndicator = ({ codeLength , maxCodeLength}) => {
    const validCount = typeof codeLength === 'number' && codeLength >= 0;
      
    return (
        <View style={styles.circleContainer}>
            {validCount ? (
                Array.from({ length: maxCodeLength }).map((_, index) => {
                    return <Circle key={index} filled={index < codeLength} />
                })
            ) : (
                Array.from({ length: maxCodeLength }).map((_, index) => {
                    return <Circle key={index} filled={false} />
                })
            )}
        </View>
    );
};

export default CodeIndicator;
