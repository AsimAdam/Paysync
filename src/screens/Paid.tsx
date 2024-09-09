import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, SafeAreaView } from 'react-native';
import Header from '../components/Header';
import PaymentsCard from '../cards/PaymentsCard';
import { useSelector } from 'react-redux';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const Paid = ({ navigation }: any) => {
    const folders = useSelector((state: any) => state.folders.folders);
    const [paidPayments, setPaidPayments] = useState<any[]>([]);
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc'); 

    useEffect(() => {
        // Filter paid payments from all folders
        const filteredPayments = folders.reduce((acc: any[], folder: any) => {
            const folderPaidPayments = folder.payments.filter((payment: any) => payment.paid === true);
            return acc.concat(folderPaidPayments);
        }, []);
        setPaidPayments(filteredPayments);
    }, [folders]);

    // Function to handle sorting payments by date
    const toggleSortOrder = () => {
        const sortedPayments = [...paidPayments].sort((a: any, b: any) => {
            const dateA = new Date(a.dueDate).getTime();
            const dateB = new Date(b.dueDate).getTime();
            return sortOrder === 'asc' ? dateB - dateA : dateA - dateB;
        });

        setPaidPayments(sortedPayments);
        setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    };

    const handlePaymentPress = (payment: any) => {
        const folder = folders.find((folder: any) =>
            folder.payments.some((folderPayment: any) => folderPayment.id === payment.id)
        );
        if (folder) {
            if (folder.type === 'payable') {
                navigation.navigate('PayableDetails', { payment, folderId: folder.id });
            } else if (folder.type === 'receivable') {
                navigation.navigate('ReceivableDetails', { payment, folderId: folder.id });
            }
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            {/* Header */}
            <Header
                title="Paid"
                subtitle="Your paid amount showcase to keep you updated"
                onBackPress={() => {
                    if (navigation.canGoBack()) {
                        navigation.goBack();
                    } else {
                        navigation.navigate('Main');
                    }
                }}
            />

            {/* Sort Button */}
            {paidPayments.length > 0 && (
                <TouchableOpacity style={styles.sortButton} onPress={toggleSortOrder}>
                    <Text style={styles.sortText}>Sort</Text>
                    <Image source={require('../assets/sort.png')} style={styles.sortIcon} />
                </TouchableOpacity>
            )}
            
            {/* Paid Payments List */}
            <View style={styles.paymentsContainer}>
                {paidPayments.length > 0 ? (
                    paidPayments.map((payment: any) => (
                        <TouchableOpacity
                            key={payment.id}
                            onPress={() => handlePaymentPress(payment)}
                        >
                            <PaymentsCard 
                                title={payment.title} 
                                amount={`${payment.amount}$`} 
                                dueDate={payment.dueDate} 
                                iconSource={require('../assets/icon-green.png')} 
                                paid={true} 
                            />
                        </TouchableOpacity>
                    ))
                ) : (
                    <Text style={styles.noPaymentsText}>No Paid Payments Yet</Text>
                )}
            </View>
        </SafeAreaView>
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
        paddingHorizontal: wp('4%'),
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
        paddingHorizontal: wp('4%'),
    },
    noPaymentsText: {
        color: '#717171',
        fontSize: wp('4%'),
        textAlign: 'center',
        marginTop: hp('5%'),
    },
});

export default Paid;
