import React, { useState, useMemo } from 'react';
import { View, Text, SafeAreaView, Alert, Modal, TouchableOpacity, StyleSheet } from 'react-native';
import Header from '../components/Header';
import { Calendar } from 'react-native-calendars';
import { useSelector } from 'react-redux';
import moment from 'moment';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const CalendarScreen = ({ navigation }: any) => {
    const folders = useSelector((state: any) => state.folders.folders);

    // State for the modal popup
    const [selectedPayments, setSelectedPayments] = useState<any[]>([]);
    const [modalVisible, setModalVisible] = useState(false);

    // Fetch and format upcoming payments
    const upcomingPayments = useMemo(() => {
        return folders.reduce((acc: any[], folder: any) => {
            const folderPayments = folder.payments
                .filter((payment: any) => !payment.paid)
                .map((payment: any) => ({
                    dueDate: moment(payment.dueDate).format('YYYY-MM-DD'),
                    title: payment.title,
                    amount: payment.amount,
                }));
            return acc.concat(folderPayments);
        }, []);
    }, [folders]);

    console.log('Upcoming Payments:', upcomingPayments);

    // Format for marking the dates in Calendar
    const markedDates = useMemo(() => {
        const marked: any = {};
        upcomingPayments.forEach((payment: any) => {
            marked[payment.dueDate] = {
                selected: true,
                selectedColor: '#6A11CB',
                selectedTextColor: '#FFFFFF',
            };
        });
        return marked;
    }, [upcomingPayments]);

    // Show a modal when a day with payments is pressed
    const handleDayPress = (day: any) => {
        const selectedDayPayments = upcomingPayments.filter(
            (payment: any) => payment.dueDate === day.dateString
        );

        if (selectedDayPayments.length > 0) {
            setSelectedPayments(selectedDayPayments);
            setModalVisible(true);
        } else {
            setSelectedPayments([]);
            setModalVisible(false);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
          <Header
                title="Calendar"
                subtitle="Select the date you want to get a reminder, and you can see your upcoming payment"
                onBackPress={() => navigation.goBack()}
            />


            <View style={styles.calendarContainer}>
                <Calendar
                    markedDates={markedDates}
                    onDayPress={handleDayPress}
                    theme={{
                        arrowColor: '#2575FC',
                        selectedDayBackgroundColor: '#6A11CB',
                        selectedDayTextColor: '#FFFFFF',
                    }}
                />
            </View>

            {/* Modal for showing payment details */}
            <Modal
                visible={modalVisible}
                animationType="slide"
                transparent={true}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalBackground}>
                    <View style={styles.modalContainer}>
                        <Text style={styles.modalTitle}>Payment Details</Text>
                        {selectedPayments.map((payment: any, index: number) => (
                            <View key={index} style={styles.paymentDetail}>
                                <Text style={styles.paymentText}>
                                    {payment.title} - {payment.amount}$
                                </Text>
                            </View>
                        ))}
                        <TouchableOpacity
                            style={styles.closeButton}
                            onPress={() => setModalVisible(false)}
                        >
                            <Text style={styles.closeButtonText}>Close</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8F8F8',
    },
    calendarContainer: {
        marginTop: hp('2%'),
        paddingHorizontal: wp('5%'),
    },
    modalBackground: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    modalContainer: {
        width: wp('80%'),
        padding: wp('5%'),
        backgroundColor: '#fff',
        borderRadius: wp('5%'),
        alignItems: 'center',
    },
    modalTitle: {
        fontSize: wp('6%'),
        fontWeight: 'bold',
        marginBottom: hp('2%'),
    },
    paymentDetail: {
        marginBottom: hp('1%'),
    },
    paymentText: {
        fontSize: wp('4.5%'),
        color: '#333',
    },
    closeButton: {
        marginTop: hp('2%'),
        backgroundColor: '#3D3EAA',
        paddingHorizontal: wp('6%'),
        paddingVertical: hp('1.5%'),
        borderRadius: wp('4%'),
    },
    closeButtonText: {
        color: '#fff',
        fontSize: wp('4.5%'),
    },
});

export default CalendarScreen;
