import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const PaymentDetails = ({ navigation }: any) => {
    return (
        <View style={styles.container}>
            {/* Header with Gradient */}
            <LinearGradient 
                colors={['#78C4FA', '#3D3EAA']} 
                style={styles.headerContainer}
            >
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backIcon}>
                    <Ionicons name="arrow-back" size={wp('7%')} color="white" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Utilities</Text>
                <Text style={styles.amount}>1500$</Text>
                <Image source={require('../assets/money.png')} style={styles.icon} />

                {/* Static Button for Payable */}
                <TouchableOpacity style={styles.payableButton}>
                    <Text style={styles.statusText}>Payable</Text>
                    <Ionicons name="chevron-down" size={wp('4%')} color="white" />
                </TouchableOpacity>
            </LinearGradient>

            {/* Installment Tags */}
            <View style={styles.installmentContainer}>
                <TouchableOpacity style={styles.installmentTag}>
                    <Text style={styles.installmentText}>1 year</Text>
                    <Text style={styles.installmentSubText}>Installments</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.installmentTagPaid}>
                    <Text style={styles.installmentText}>2 installments</Text>
                    <Text style={styles.installmentSubText}>Paid</Text>
                </TouchableOpacity>
            </View>

            {/* Static Description */}
            <Text style={styles.description}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed diam nonummy nibh euismod tincidunt ut nibh aliquam erat volutpat.
            </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8F8F8',
    },
    headerContainer: {
        width: wp('100%'),
        paddingVertical: hp('5%'),
        paddingHorizontal: wp('5%'),
        borderBottomLeftRadius: wp('10%'),
        borderBottomRightRadius: wp('10%'),
        alignItems: 'center',
    },
    backIcon: {
        position: 'absolute',
        left: wp('5%'),
        top: hp('4%'),
    },
    headerTitle: {
        color: 'white',
        fontSize: wp('6%'),
        fontWeight: 'bold',
        marginTop: hp('1%'),
    },
    amount: {
        color: 'white',
        fontSize: wp('10%'),
        fontWeight: 'bold',
        marginTop: hp('1%'),
    },
    icon: {
        width: wp('25%'),
        height: wp('25%'),
        marginTop: hp('2%'),
        resizeMode: 'contain',
        tintColor: 'rgba(255,255,255,0.3)',
    },
    payableButton: {
        backgroundColor: '#32C5FF', // Blue for Payable
        borderRadius: wp('3%'),
        paddingVertical: hp('0.8%'),
        paddingHorizontal: wp('4%'),
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: hp('2%'),
    },
    statusText: {
        color: 'white',
        fontSize: wp('4%'),
        fontWeight: 'bold',
        marginRight: wp('1%'),
    },
    installmentContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        marginVertical: hp('2%'),
        paddingHorizontal: wp('5%'),
    },
    installmentTag: {
        backgroundColor: '#5E5EFC',
        borderRadius: wp('3%'),
        paddingHorizontal: wp('4%'),
        paddingVertical: hp('1%'),
        marginRight: wp('2%'),
    },
    installmentTagPaid: {
        backgroundColor: '#7AD1F7',
        borderRadius: wp('3%'),
        paddingHorizontal: wp('4%'),
        paddingVertical: hp('1%'),
    },
    installmentText: {
        color: 'white',
        fontSize: wp('3.8%'),
        fontWeight: 'bold',
    },
    installmentSubText: {
        color: 'white',
        fontSize: wp('3.2%'),
    },
    description: {
        fontSize: wp('4%'),
        color: '#717171',
        marginTop: hp('2%'),
        paddingHorizontal: wp('5%'),
    },
});

export default PaymentDetails;
