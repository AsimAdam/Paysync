import React from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView } from 'react-native';
import Slider from '../components/Slider';
import NavCard from '../cards/NavCard';
import PaymentsCard from '../cards/PaymentsCard';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';


const Main = ({ navigation }: any) => {
    

    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
                <Slider />
                <View style={styles.navContainer}>
                    <NavCard 
                        title="Calendar" 
                        iconSource={require('../assets/calendar.png')} 
                        onPress={() => navigation.navigate('CalendarScreen')}
                    />
                    <NavCard title="Dues" iconSource={require('../assets/dues.png')} onPress={() => {}} />
                    <NavCard title="Paid" iconSource={require('../assets/paid.png')} onPress={() => {}} />
                </View>
                <Text style={styles.upcomingTitle}>Upcoming Payments</Text>
                <View style={styles.paymentsContainer}>
                    <PaymentsCard title="Payments for credit card." amount="1500$" dueDate="13/2/2024" iconSource={require('../assets/icon-green.png')} />
                    <PaymentsCard title="School fee" amount="200$" dueDate="15/2/2024" iconSource={require('../assets/icon-red.png')} />
                    <PaymentsCard title="Friend have to pay" amount="450$" dueDate="13/2/2024" iconSource={require('../assets/icon-green.png')} />
                    <PaymentsCard title="Car payment" amount="9800$" dueDate="13/2/2024" />
                    <PaymentsCard title="Payments for credit card." amount="3500$" dueDate="13/2/2024" iconSource={require('../assets/icon-red.png')} />
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
        fontSize: wp('5%'),
        fontWeight: 'bold',
        marginHorizontal: wp('5%'),
        marginVertical: hp('2%'),
    },
    paymentsContainer: {
        marginHorizontal: wp('5%'),
    },
});

export default Main;
