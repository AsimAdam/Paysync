import React, { useEffect, useState } from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react'; 
import { store, persistor } from './src/redux/store';
import Nav from './src/stack/nav';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function App() {
    const [initialRoute, setInitialRoute] = useState<string | null>(null);
    const [path, setPath] = useState<string | null>(null);

    useEffect(() => {
        const checkPath = async () => {
            try {
                const storedUrl = await AsyncStorage.getItem('decryptedNexaUrl');
                if (storedUrl) {
                    console.log('Stored Nexa URL found:', storedUrl);
                    setPath(storedUrl);
                    setInitialRoute('Payments');
                } else {
                    setInitialRoute('Splash'); 
                }
            } catch (error) {
                console.error('Error checking stored Nexa URL:', error);
                setInitialRoute('Splash'); 
            }
        };

        checkPath();
    }, []);

    if (!initialRoute) {
        // Render a loading state until the initial route is determined
        return null;
    }

    return (
        <Provider store={store}> 
            <PersistGate loading={null} persistor={persistor}> 
                <Nav initialRoute={initialRoute} decryptedNexaUrl={path} />
            </PersistGate>
        </Provider>
    );
}
