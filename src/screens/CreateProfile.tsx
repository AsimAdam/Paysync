import React, { useState, useCallback } from 'react';
import { View, Text, ImageBackground, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useNavigation } from '@react-navigation/native';
import { avatars } from '../assets/avatars';
import CustomButton from '../components/CustomButton';
import CustomInput from '../components/CustomInput';
import AvatarSelector from '../components/AvatarSelector';
import storageService from '../services/storageService';
import { validateName, handleError, AppError } from '../utils/errorHandling';
import { StackNavigationProp } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';

type RootStackParamList = {
    Main: undefined;
    CreateProfile: undefined;
};

type NavigationProp = StackNavigationProp<RootStackParamList, 'CreateProfile'>;

const CreateProfile: React.FC = () => {
    const [name, setName] = useState('');
    const [step, setStep] = useState(1);
    const [selectedAvatar, setSelectedAvatar] = useState<number | null>(null);
    const [error, setError] = useState<string | null>(null);
    const navigation = useNavigation<NavigationProp>();

    const handleContinue = useCallback(async () => {
        try {
            setError(null);
            validateName(name);
            await storageService.saveUserProfile({ name: name.trim(), avatarIndex: -1 });
            setStep(2);
        } catch (error) {
            const appError = handleError(error);
            setError(appError.message);
        }
    }, [name]);

    const handleFinish = useCallback(async () => {
        try {
            setError(null);
            if (selectedAvatar === null) {
                throw new AppError('Please select an avatar', 'VALIDATION_ERROR');
            }
            await storageService.saveUserProfile({ name: name.trim(), avatarIndex: selectedAvatar });
            await AsyncStorage.setItem('userName', name.trim());
            await AsyncStorage.setItem('selectedAvatar', selectedAvatar.toString());
            navigation.navigate('Main');
        } catch (error) {
            const appError = handleError(error);
            setError(appError.message);
        }
    }, [name, selectedAvatar, navigation]);

    const handleSkip = useCallback(() => {
        navigation.navigate('Main');
    }, [navigation]);

    return (
        <SafeAreaView style={styles.container}>
            <ImageBackground source={require('../assets/profile.png')} style={styles.backgroundImage}>
                <View style={styles.contentContainer}>
                    {error && (
                        <Text style={styles.errorText}>{error}</Text>
                    )}
                    
                    {step === 1 && (
                        <>
                            <Text style={styles.title}>Choose a name for your profile</Text>
                            <CustomInput
                                placeholder="Enter your name here"
                                value={name}
                                onChangeText={(text: string) => {
                                    setName(text);
                                    setError(null);
                                }}
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
                            <AvatarSelector
                                avatars={avatars}
                                selectedAvatar={selectedAvatar}
                                onSelectAvatar={(index) => {
                                    setSelectedAvatar(index);
                                    setError(null);
                                }}
                                containerStyle={styles.avatarsContainer}
                            />
                            <CustomButton label="Finish" onPress={handleFinish} />
                        </>
                    )}
                </View>
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
        color: '#3D3EAA',
        textAlign: 'center',
        marginBottom: hp('2%'),
    },
    input: {
        marginBottom: hp('2%'),
    },
    avatarsContainer: {
        marginBottom: hp('3%'),
    },
    skipButton: {
        marginTop: hp('2%'),
        alignItems: 'center',
    },
    skipText: {
        color: '#3D3EAA',
        fontSize: wp('4%'),
    },
    errorText: {
        color: '#FF3B30',
        textAlign: 'center',
        marginBottom: hp('2%'),
        fontSize: wp('4%'),
    },
});

export default CreateProfile;
