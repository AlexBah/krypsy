import React from 'react';
import { View } from 'react-native';
import styles from '../styles/Styles';

const Circle = ({ filled }) => {
    return (
        <View style={[styles.circle, filled ? styles.circleFilled : styles.circleEmpty]}>
        </View>

    );
};

export default Circle;
