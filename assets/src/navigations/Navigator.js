import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from '../screens/Login';
import Register from '../screens/Register';
import NewLogin from '../screens/NewLogin';
import MainScreen from '../screens/MainScreen';

const Stack = createNativeStackNavigator();

const AppNavigator = ({ screenname }) => {
    return (
        <NavigationContainer>
            <Stack.Navigator 
            initialRouteName={screenname}
            screenOptions={{ headerShown: false }}
            >
                <Stack.Screen name="Register" component={Register} />
                <Stack.Screen name="NewLogin" component={NewLogin} />
                <Stack.Screen name="Login" component={Login} />
                <Stack.Screen name="MainScreen" component={MainScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default AppNavigator;
