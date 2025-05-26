import React from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView, TouchableOpacity, Image } from 'react-native';
import { useSelector } from 'react-redux';
import Slider from '../components/Slider';
import NavCard from '../cards/NavCard';
import PaymentsCard from '../cards/PaymentsCard';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useUserProfile } from '../hooks/useUserProfile';
import { Folder, Payment, getRecentUnpaidPayments } from '../utils/paymentUtils';
import { RootState } from '../global/store';
import NoUpcomingImage from '../assets/no-upcoming.png';

const Main = ({ navigation }: any) => {
    const { userName, userAvatar } = useUserProfile();

    // Accessing the folders and payments from Redux store
    const folders: Folder[] = useSelector((state: RootState) => state.folders.folders);

    // Extracting recent unpaid payments from all folders using utility
    const sortedPayments: Payment[] = getRecentUnpaidPayments(folders, 5);

    // Handle payment card press - based on folder type (payable or receivable)
    const handlePaymentPress = (payment: Payment) => {
        const folder = folders.find((folder) =>
            folder.payments.some((folderPayment) => folderPayment.id === payment.id)
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
                <View style={styles.profileTextContainer}>
                    {userName && (
                        <Text style={styles.welcomeText}>Welcome <Text style={styles.boldName}>{userName}!</Text></Text>
                    )}
                </View>
                {userAvatar && (
                    <View style={styles.avatarContainer}>
                        <Image source={userAvatar} style={styles.avatar} />
                        <Text style={styles.avatarName}>{userName}</Text>
                    </View>
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
                        sortedPayments.map((payment) => (
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
                        <View style={styles.emptyStateContainer}>
                            <Image source={NoUpcomingImage} style={styles.emptyStateImage} resizeMode="contain" />
                            <Text style={styles.noPaymentsText}>No payments yet</Text>
                        </View>
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
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: wp('5%'),
        marginTop: hp('3%'),
        marginBottom: hp('-2%')
    },
    profileTextContainer: {
        flexDirection: 'column',
        justifyContent: 'center',
    },
    welcomeText: {
        fontSize: wp('5%'),
        color: '#595959',
    },
    boldName: {
        fontWeight: 'bold',
        color: '#595959'
    },
    avatarContainer: {
        alignItems: 'center',
    },
    avatar: {
        width: wp('12%'),
        height: wp('12%'),
        borderRadius: wp('6%'),
        marginBottom: hp('0.5%'),
    },
    avatarName: {
        fontSize: wp('3.5%'),
        color: '#595959',
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
        marginTop: hp('-6%'),
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
    emptyStateContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: hp('4%'),
    },
    emptyStateImage: {
        width: wp('40%'),
        height: wp('40%'),
        marginBottom: hp('2%'),
        opacity: 0.7,
    },
});

export default Main;
