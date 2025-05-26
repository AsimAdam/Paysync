import React, { useEffect, useState } from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react'; 
import { store, persistor } from './src/global/store';
import Nav from './src/stack/nav';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';
import { avatars } from './src/assets/avatars';

export default function App() {
    const [initialRoute, setInitialRoute] = useState<string | null>(null);

    useEffect(() => {
        const checkProfile = async () => {
            try {
                const userName = await AsyncStorage.getItem('userName');
                const userAvatar = await AsyncStorage.getItem('selectedAvatar');
                const idx = userAvatar !== null ? parseInt(userAvatar, 10) : NaN;
                if (userName && !isNaN(idx) && idx >= 0 && idx < avatars.length) {
                    setInitialRoute('Main');
                } else {
                    setInitialRoute('CreateProfile');
                }
            } catch (error) {
                console.error('Error checking profile:', error);
                Alert.alert('Error', 'Something went wrong while checking your profile.');
                setInitialRoute('CreateProfile');
            }
        };

        checkProfile();
    }, []);

    if (!initialRoute) {
        return null;
    }

    return (
        <Provider store={store}> 
            <PersistGate loading={null} persistor={persistor}> 
                <Nav initialRoute={initialRoute} />
            </PersistGate>
        </Provider>
    );
}
