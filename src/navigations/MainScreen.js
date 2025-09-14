import React from "react";
import { Text, View, TouchableOpacity } from "react-native";
import styles from '../styles/Styles';

const MainScreen = ({ navigation }) => {

    return (
        <View style={styles.background}>

            <Text style={styles.h2}>MainScreen{"\n\n"}</Text>

            <TouchableOpacity  onPress={() => navigation.navigate('Login')}>
                <Text style={styles.h2}>Login</Text>
            </TouchableOpacity>
            <TouchableOpacity  onPress={() => navigation.navigate('Register')}>
                <Text style={styles.h2}>Register</Text>
            </TouchableOpacity>
            <TouchableOpacity  onPress={() => navigation.navigate('NewLogin')}>
                <Text style={styles.h2}>NewLogin</Text>
            </TouchableOpacity>

        </View>
    );
}

export default MainScreen;
