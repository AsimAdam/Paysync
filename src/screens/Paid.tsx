
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import Header from '../components/Header';
import PaymentsCard from '../cards/PaymentsCard';
import { useSelector } from 'react-redux';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const Paid = () => {
    const folders = useSelector((state: any) => state.folders.folders);
    
    // Filter paid payments from all folders
    const paidPayments = folders.reduce((acc: any[], folder: any) => {
        const folderPaidPayments = folder.payments.filter((payment: any) => payment.paid === true);
        return acc.concat(folderPaidPayments);
    }, []);

    return (
        <View style={styles.container}>
            {/* Header */}
            <Header
                title="Paid"
                subtitle="Your paid amount showcase to keep you updated"
                onBackPress={() => {}}
            />

            {/* Sort Button */}
            {paidPayments.length > 0 && (
                <TouchableOpacity style={styles.sortButton}>
                    <Text style={styles.sortText}>Sort</Text>
                    <Image source={require('../assets/sort.png')} style={styles.sortIcon} />
                </TouchableOpacity>
            )}
            
            {/* Paid Payments List */}
            <View style={styles.paymentsContainer}>
                {paidPayments.length > 0 ? (
                    paidPayments.map((payment: any) => (
                        <PaymentsCard 
                            key={payment.id}
                            title={payment.title} 
                            amount={`${payment.amount}$`} 
                            dueDate={payment.dueDate} 
                            iconSource={require('../assets/icon-green.png')} 
                            paid={true} 
                        />
                    ))
                ) : (
                    <Text style={styles.noPaymentsText}>No Paid Payments Yet</Text>
                )}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8F8F8',
    },
    sortButton: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        marginVertical: hp('2%'),
        paddingHorizontal: wp('4%'), // Adjusted padding
        top: '5%',
    },
    sortText: {
        fontSize: wp('4%'),
        color: '#000',
        marginRight: wp('1%'),
        fontWeight: '600',
    },
    sortIcon: {
        width: wp('5%'),
        height: wp('5%'),
        resizeMode: 'contain',
    },
    paymentsContainer: {
        marginTop: hp('1%'),
        paddingHorizontal: wp('4%'), // Adjusted padding for proper alignment
    },
    noPaymentsText: {
        color: '#717171',
        fontSize: wp('4%'),
        textAlign: 'center',
        marginTop: hp('5%'),
    },
});

export default Paid;
