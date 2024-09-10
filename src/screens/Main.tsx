import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView, TouchableOpacity, Image } from 'react-native';
import { useSelector } from 'react-redux';
import Slider from '../components/Slider';
import NavCard from '../cards/NavCard';
import PaymentsCard from '../cards/PaymentsCard';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { avatars } from '../controllers/avatars';

const Main = ({ navigation }: any) => {

    const [userName, setUserName] = useState<any>(null);
    const [userAvatar, setUserAvatar] = useState<any>(null);

    // Fetching the saved user profile data from AsyncStorage
    useEffect(() => {
        const fetchProfileData = async () => {
            try {
                const name = await AsyncStorage.getItem('userName');
                const avatarIndex = await AsyncStorage.getItem('selectedAvatar');
                if (name) setUserName(name);
                if (avatarIndex) setUserAvatar(avatars[parseInt(avatarIndex)]);
            } catch (error) {
                console.error('Error fetching profile data:', error);
            }
        };
        fetchProfileData();
    }, []);

    // Accessing the folders and payments from Redux store
    const folders = useSelector((state: any) => state.folders.folders);

    // Extracting recent unpaid payments from all folders
    const recentPayments = folders.reduce((acc: any[], folder: any) => {
        const folderPayments = folder.payments
            .filter((payment: any) => !payment.paid)
            .map((payment: any) => ({
                ...payment,
                folderId: folder.id,
                folderType: folder.type,
            }));
        return acc.concat(folderPayments);
    }, []);

    // Sort recent payments by due date
    const sortedPayments = recentPayments
        .sort((a: any, b: any) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime())
        .slice(0, 5); 

    // Handle payment card press - based on folder type (payable or receivable)
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
        <SafeAreaView style={styles.safeArea}>
            {/* Profile Section */}
            <View style={styles.profileContainer}>
                {userAvatar && (
                    <Image source={userAvatar} style={styles.avatar} />
                )}
                {userName && (
                    <Text style={styles.userName}>Hello, {userName}</Text>
                )}
            </View>

            <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
                <Slider />
                <View style={styles.navContainer}>
                    <NavCard 
                        title="Calendar" 
                        iconSource={require('../assets/calendar.png')} 
                        onPress={() => navigation.navigate('CalendarScreen')}
                    />
                    <NavCard 
                        title="Dues" 
                        iconSource={require('../assets/dues.png')} 
                        onPress={() => navigation.navigate('Dues')} 
                    />
                    <NavCard 
                        title="Paid" 
                        iconSource={require('../assets/paid.png')} 
                        onPress={() => navigation.navigate('Paid')} 
                    />
                </View>

                <Text style={styles.upcomingTitle}>Upcoming Payments</Text>

                <View style={styles.paymentsContainer}>
                    {sortedPayments.length > 0 ? (
                        sortedPayments.map((payment: any) => (
                            <TouchableOpacity
                                key={payment.id}
                                onPress={() => handlePaymentPress(payment)}
                            >
                                <PaymentsCard
                                    title={payment.title}
                                    amount={`${payment.amount}$`}
                                    dueDate={payment.dueDate}
                                    iconSource={require('../assets/icon-red.png')}
                                />
                            </TouchableOpacity>
                        ))
                    ) : (
                        <Text style={styles.noPaymentsText}>No payments yet</Text>
                    )}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#F8F8F8',
    },
    profileContainer: {
        position: 'absolute',
        top: hp('2%'),
        right: wp('5%'),
        flexDirection: 'column',
        alignItems: 'center',
        zIndex: 100
    },
    avatar: {
        width: wp('15%'),
        height: wp('15%'),
        borderRadius: wp('7.5%'),
        marginBottom: hp('1%'),
    },
    userName: {
        fontSize: wp('4%'),
        color: '#000',
        fontWeight: 'bold',
    },
    container: {
        flex: 1,
    },
    navContainer: {
        width: wp('80%'),
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginVertical: hp('2%'),
        backgroundColor: '#FFFFFF',
        borderRadius: wp('3%'),
        padding: wp('2%'),
        alignSelf: 'center',
        marginTop: hp('-8%'),
        zIndex: 1,
    },
    upcomingTitle: {
        fontSize: wp('4%'),
        fontWeight: 'bold',
        marginHorizontal: wp('5%'),
        marginVertical: hp('2%'),
    },
    paymentsContainer: {
        marginHorizontal: wp('5%'),
    },
    noPaymentsText: {
        fontSize: wp('4.5%'),
        color: '#717171',
        textAlign: 'center',
        marginTop: hp('2%'),
    },
});

export default Main;
