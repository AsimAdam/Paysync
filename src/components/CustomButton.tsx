import React from 'react';
import { TouchableOpacity, Text, StyleSheet, Dimensions } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const screenWidth = Dimensions.get('window').width;

const CustomButton = ({ label, onPress }: any) => (
    <TouchableOpacity style={styles.button} onPress={onPress}>
        <Text style={styles.buttonText}>{label}</Text>
    </TouchableOpacity>
);

const styles = StyleSheet.create({
    button: {
        backgroundColor: '#3D3EAA',
        paddingVertical: hp('1.5%'),
        borderRadius: wp('2%'),
        alignItems: 'center',
        width: screenWidth * 0.9,
        alignSelf: 'center', 
    },
    buttonText: {
        color: 'white',
        fontSize: wp('5%'),
        fontWeight: 'bold',
    },
});

export default CustomButton;
