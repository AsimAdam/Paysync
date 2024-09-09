import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useSelector } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import PaymentsCard from '../cards/PaymentsCard';
import { SafeAreaView } from 'react-native-safe-area-context';

const FolderDetails = ({ navigation, route }: any) => {
    const { folderId, folderName } = route.params;
    const folders = useSelector((state: any) => state.folders.folders);
    const folder = folders.find((folder: any) => folder.id === folderId);
    const [payments, setPayments] = useState(folder ? folder.payments : []);
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

    useEffect(() => {
        if (folder) {
            setPayments(folder.payments);
        }
    }, [folders]);

    // Function to handle sorting payments by date
    const toggleSortOrder = () => {
        const sortedPayments = [...payments].sort((a: any, b: any) => {
            const dateA = new Date(a.dueDate).getTime();
            const dateB = new Date(b.dueDate).getTime();
            return sortOrder === 'asc' ? dateB - dateA : dateA - dateB;
        });

        setPayments(sortedPayments);
        setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    };

    const handlePaymentPress = (payment: any) => {
        if (folder.type === 'payable') {
            navigation.navigate('PayableDetails', {
                payment,
                folderId,
            });
        } else if (folder.type === 'receivable') {
            navigation.navigate('ReceivableDetails', {
                payment,
                folderId,
            });
        }
    };
    

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.headerContainer}>
            <TouchableOpacity
  onPress={() => {
    console.log('Back button pressed');
    navigation.goBack();
  }}
  style={styles.backIcon}
>
  <Ionicons name="arrow-back" size={wp('7%')} color="#3D3EAA" />
</TouchableOpacity>

                <View style={styles.titleContainer}>
                    <Text style={styles.headerTitle}>{folderName}</Text>
                </View>
            </View>

            {payments.length > 0 && (
                <TouchableOpacity style={styles.sortButton} onPress={toggleSortOrder}>
                    <Text style={styles.sortText}>
                        Sort
                    </Text>
                    <Image source={require('../assets/sort.png')} style={styles.sortIcon} />
                </TouchableOpacity>
            )}

            {payments.length > 0 ? (
                <View style={styles.paymentsContainer}>
                    {payments.map((payment: any) => (
                        <TouchableOpacity
                            key={payment.id}
                            onPress={() => handlePaymentPress(payment)}
                        >
                            <PaymentsCard
                                title={payment.title}
                                amount={payment.amount}
                                dueDate={payment.dueDate}
                                iconSource={require('../assets/icon-red.png')}
                                paid={payment.paid}
                            />
                        </TouchableOpacity>
                    ))}
                </View>
            ) : (
                <Text style={styles.noPaymentsText}>No Payments Added Yet</Text>
            )}

            <TouchableOpacity style={styles.fab} onPress={() => navigation.navigate('PaymentForm', { folderId, folderName })}>
                <Image source={require('../assets/plus.png')} style={styles.fabIcon} />
            </TouchableOpacity>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8F8F8',
    },
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: hp('3%'),
        paddingHorizontal: wp('4%'),
        position: 'relative',
        zIndex: 1, 
    },
    backIcon: {
        position: 'absolute',
        left: wp('4%'),
        zIndex: 10, 
        padding: 20, 
    },
    titleContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerTitle: {
        fontSize: wp('6%'),
        fontWeight: 'bold',
        color: '#000000',
        textAlign: 'center',
    },
    sortButton: {
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'flex-end',
        marginRight: wp('5%'),
        top: wp('3%'),
    },
    sortText: {
        fontSize: wp('4%'),
        color: '#000',
        marginRight: wp('1%'),
        fontWeight: '800'
    },
    sortIcon: {
        width: wp('5%'),
        height: wp('5%'),
        resizeMode: 'contain',
    },
    paymentsContainer: {
        marginTop: hp('2%'),
        paddingHorizontal: wp('4%'),
    },
    noPaymentsText: {
        fontSize: wp('5%'),
        color: '#717171',
        textAlign: 'center',
        marginTop: hp('10%'),
    },
    fab: {
        position: 'absolute',
        bottom: hp('3%'),
        right: wp('5%'),
        width: wp('15%'),
        height: wp('15%'),
        borderRadius: wp('7.5%'),
        backgroundColor: '#3D3EAA',
        justifyContent: 'center',
        alignItems: 'center',
    },
    fabIcon: {
        width: wp('7%'),
        height: wp('7%'),
        resizeMode: 'contain',
    },
});

export default FolderDetails;
