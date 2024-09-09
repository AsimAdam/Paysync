import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useDispatch } from 'react-redux';
import { updatePaymentStatus } from '../redux/actions';
import { SafeAreaView } from 'react-native-safe-area-context';

const ReceivableDetails = ({ navigation, route }: any) => {
    const { payment, folderId } = route.params;
    const [isPaid, setIsPaid] = useState(payment.paid);
    const [installmentsPaid, setInstallmentsPaid] = useState(payment.installmentsPaid || 1); 
    const dispatch = useDispatch();

    useEffect(() => {
        const calculateInstallmentsPaid = () => {
            if (payment.installmentMonths) {
                const today = new Date();
                const dueDate = new Date(payment.dueDate);
                const monthsPassed = Math.floor(
                    (today.getTime() - dueDate.getTime()) / (1000 * 60 * 60 * 24 * 30)
                );

                // Ensure installmentsPaid doesn't go below 0
                const installmentsPaid = Math.max(0, Math.min(monthsPassed, payment.installmentMonths)); 
                setInstallmentsPaid(installmentsPaid);
            }
        };

        calculateInstallmentsPaid();
    }, [payment]);

    const toggleStatus = () => {
        const updatedPayment = { ...payment, paid: !isPaid, installmentsPaid };
        dispatch(updatePaymentStatus(folderId, updatedPayment));
        setIsPaid(!isPaid);
        navigation.goBack();
    };

    return (
        <SafeAreaView style={styles.container}>
            <LinearGradient colors={['#78C4FA', '#3D3EAA']} style={styles.headerContainer}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backIcon}>
                    <Ionicons name="arrow-back" size={wp('7%')} color="white" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>{payment.title}</Text>
                <Text style={styles.amount}>{payment.amount}$</Text>
                <Image source={require('../assets/money.png')} style={styles.icon} />

                <TouchableOpacity
                            style={[
                                styles.payableButton,
                                {
                                    backgroundColor: isPaid ? '#097969' : '#32C5FF',
                                }
                            ]}
                            onPress={toggleStatus}
                        >
                            <Text style={styles.statusText}>
                                {isPaid ? 'Received' : 'Receivable'}
                            </Text>
                            <Ionicons name="chevron-down" size={wp('4%')} color="white" />
                        </TouchableOpacity>

                                        
            </LinearGradient>

            <View style={styles.installmentContainer}>
                <TouchableOpacity style={styles.installmentTag}>
                    <Text style={styles.installmentText}>{payment.installmentMonths} months</Text>
                    <Text style={styles.installmentSubText}>Installments</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.installmentTagPaid}>
                    <Text style={styles.installmentText}>{installmentsPaid} installments</Text>
                    <Text style={styles.installmentSubText}>Paid</Text>
                </TouchableOpacity>
            </View>

            <Text style={styles.description}>{payment.description}</Text>
        </SafeAreaView>
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
        left: wp('3%'),
        top: hp('2%'),
    },
    headerTitle: {
        color: 'white',
        fontSize: wp('6%'),
        fontWeight: 'bold',
        marginTop: hp('1%'),
        bottom: hp('4%'),
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
        backgroundColor: '#32C5FF',
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

export default ReceivableDetails;
