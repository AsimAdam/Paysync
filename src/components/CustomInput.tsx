import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const CustomInput = ({ placeholder, label, style, ...props }: any) => (
    <View style={[styles.inputContainer, style]}>
        {label && <Text style={styles.label}>{label}</Text>}
        <TextInput
            placeholder={placeholder}
            style={styles.input}
            {...props}
        />
    </View>
);

const styles = StyleSheet.create({
    inputContainer: {
        marginBottom: hp('2%'),
    },
    input: {
        borderWidth: 1,
        borderColor: '#E0E0E0',
        borderRadius: wp('2%'),
        padding: wp('4%'),
        backgroundColor: '#FFFFFF',
    },
    label: {
        fontSize: wp('4%'),
        color: '#000',
        fontWeight: 'bold',
        marginBottom: hp('1%'),
    },
});

export default CustomInput;
