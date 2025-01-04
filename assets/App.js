import React from 'react';
import AppNavigator from './src/navigations/Navigator';
import * as Font from 'expo-font';
import {AppLoading} from 'expo';
import { getRealm, User, CryptoWallet } from './src/storage/RealmModels';

export default class App extends React.Component {
    state = {
        isFontLoaded:false,
        isUserLoaded:false,
        screenName:'Register',
    }

    async componentDidMount() {
        await this.loadFonts();
        await this.initializeRealm();
    }

    loadFonts = async () => {
        await Font.loadAsync({
            'SemiBold': require('./src/fonts/Montserrat-SemiBold.ttf'),
            'Medium': require('./src/fonts/Montserrat-Medium.ttf'),
            'Regular': require('./src/fonts/Montserrat-Regular.ttf'),
        });
        this.setState({ isFontLoaded: true });
    }

    initializeRealm = async () => {
        try {
            const realm = await getRealm();
            const users = realm.objects(User);
            if (users.length > 0) {
                this.setState({ isUserLoaded: true });
                this.setState({ screenName: 'Login' });
            } else {
                this.setState({ isUserLoaded: true });
                this.setState({ screenName: 'Register' });
            }
        } catch (error) {
            console.error("Realm initialization error: ", error);
        }
    }

    render(){
        return (
            this.state.isFontLoaded && this.state.isUserLoaded ? 
            <AppNavigator screenname={this.state.screenName}/> : 
            <AppLoading />
        );
    }

}