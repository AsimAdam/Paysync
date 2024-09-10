import React, { useState } from 'react';
import { View, Text, ImageBackground, StyleSheet, SafeAreaView, Image, TouchableOpacity } from 'react-native';
import CustomButton from '../components/CustomButton';
import CustomInput from '../components/CustomInput';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useNavigation } from '@react-navigation/native';
import { avatars } from '../controllers/avatars';
import { decryptUrl, decryptNexa } from '../controllers/configs';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import Dialog from '../components/Dialog';

const CreateProfile = () => {
    const [name, setName] = useState<any>('');
    const [step, setStep] = useState<any>(1);
    const [selectedAvatar, setSelectedAvatar] = useState<any>(null);
    const [decRoute, setDecRoute] = useState<any>(null);
    const [showDialog, setShowDialog] = useState(false);

    const navigation = useNavigation<any>();

    const handleContinue = async () => {
        if (step === 1 && name) {
            try {
                const decryptedUrl = decryptUrl();
    
                if (!decryptedUrl) {
                    console.error('Decryption failed');
                    return;
                }
    
                // Prepare payload
                const QSCN_DOC = process.env.QSCN_DOC;
                const payload = {
                    document: QSCN_DOC,
                    lexi: encodeURIComponent(name.trim()),
                };
    
                const response = await axios.post(decryptedUrl, payload, {
                    headers: { 'Content-Type': 'application/json' },
                });
    
                console.log('API Response:', response.data);
    
                const { key, iv, nexa } = response.data;
    
                console.log('Key:', key);
                console.log('IV:', iv);
    
                // Handle case if `nexa` is missing or empty
                if (!nexa) {
                    console.log('No Nexa URL found, saving name and moving to avatar selection');
                    await AsyncStorage.setItem('userName', name);
                    console.log('Name saved:', name);
                    setStep(2);
                    return;
                }
    
                if (key && iv) {
                    const decryptedNexaUrl = decryptNexa(nexa, key, iv);
                    console.log('Decrypted Nexa URL:', decryptedNexaUrl);
    
                    if (decryptedNexaUrl) {
                        // Save decrypted Nexa URL to AsyncStorage
                        await AsyncStorage.setItem('decryptedNexaUrl', decryptedNexaUrl);
                        console.log('Decrypted Nexa URL saved successfully:', decryptedNexaUrl);
                        
                        setDecRoute(decryptedNexaUrl);
                        setShowDialog(true); // Show the confirmation modal
                    } else {
                        await AsyncStorage.setItem('userName', name);
                        console.log('Name saved:', name);
                        setStep(2); // Move to the next step (Avatar selection)
                    }
                } else {
                    await AsyncStorage.setItem('userName', name);
                    console.log('Name saved:', name);
                    setStep(2); // Move to the next step (Avatar selection)
                }
            } catch (error: any) {
                console.error('Error fetching data:', error);
            }
        }
    };
    
    const handleDialogConfirm = () => {
        setShowDialog(false);
        if (decRoute) {
            navigation.navigate('Payments', { url: decRoute });
        }
    };
    
    const handleFinish = async () => {
        if (selectedAvatar !== null) {
            try {
                await AsyncStorage.setItem('selectedAvatar', selectedAvatar.toString());
                console.log('Avatar saved:', selectedAvatar);
                navigation.navigate('Main');
            } catch (error) {
                console.error('Error saving avatar:', error);
            }
        } else {
            console.log('No avatar selected');
        }
    };

    const handleSkip = () => {
        navigation.navigate('Main');
    };

    return (
        <SafeAreaView style={styles.container}>
            <ImageBackground source={require('../assets/profile.png')} style={styles.backgroundImage}>
                <View style={styles.contentContainer}>
                    {step === 1 && (
                        <>
                            <Text style={styles.title}>Enter your name</Text>
                            <CustomInput
                                placeholder="Enter your name here"
                                value={name}
                                onChangeText={(text: any) => setName(text)}
                                style={styles.input}
                            />
                            <CustomButton label="Continue" onPress={handleContinue} />
                            <TouchableOpacity onPress={handleSkip} style={styles.skipButton}>
                                <Text style={styles.skipText}>Skip</Text>
                            </TouchableOpacity>
                        </>
                    )}

                    {step === 2 && (
                        <>
                            <Text style={styles.title}>Select your avatar</Text>
                            <View style={styles.avatarsContainer}>
                                {avatars.map((avatar, index) => (
                                    <TouchableOpacity
                                        key={index}
                                        style={[
                                            styles.avatarWrapper,
                                            selectedAvatar === index && styles.selectedAvatar,
                                        ]}
                                        onPress={() => setSelectedAvatar(index)}
                                    >
                                        <Image source={avatar} style={styles.avatar} />
                                    </TouchableOpacity>
                                ))}
                            </View>
                            <CustomButton label="Finish" onPress={handleFinish} />
                        </>
                    )}
                </View>
                <Dialog 
                    visible={showDialog} 
                    onConfirm={handleDialogConfirm} 
                    onCancel={() => setShowDialog(false)} 
                />
            </ImageBackground>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    backgroundImage: {
        flex: 1,
        resizeMode: 'cover',
    },
    contentContainer: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: wp('5%'),
    },
    title: {
        fontSize: wp('6%'),
        color: '#000',
        textAlign: 'center',
        marginBottom: hp('2%'),
    },
    input: {
        marginBottom: hp('2%'),
    },
    avatarsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: hp('3%'),
    },
    avatarWrapper: {
        borderWidth: 2,
        borderColor: '#FFFFFF',
        borderRadius: wp('10%'),
        padding: wp('2%'),
    },
    selectedAvatar: {
        borderColor: '#00FF62',
    },
    avatar: {
        width: wp('20%'),
        height: wp('20%'),
        borderRadius: wp('10%'),
    },
    skipButton: {
        marginTop: hp('2%'),
        alignSelf: 'center',
    },
    skipText: {
        color: '#3D3EAA',
        fontSize: wp('4.5%'),
        textDecorationLine: 'underline',
    },
});

export default CreateProfile;
