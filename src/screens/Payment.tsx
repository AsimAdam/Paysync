import React from 'react';
import { WebView } from 'react-native-webview';
import { SafeAreaView, StyleSheet } from 'react-native';

const Payments = ({ route }: any) => {
    const { url } = route.params;

    return (
        <SafeAreaView style={styles.container}>
            <WebView 
            source={{ uri: url }} 
            bounces={false} 
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

export default Payments;