import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';
import Header from '../components/Header';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Calendar } from 'react-native-calendars';

const CalendarScreen = () => {
    return (
        <SafeAreaView style={styles.container}>
            <Header
                title="Calendar"
                subtitle="Select the date you want to get a reminder, and you can see your upcoming payment"
                onBackPress={() => {}}
            />
            <View style={styles.calendarContainer}>
               
                <Calendar
                    // Example props
                    onDayPress={(day) => {
                        console.log('selected day', day);
                    }}
                    theme={{
                        arrowColor: '#2575FC',
                        selectedDayBackgroundColor: '#6A11CB',
                        selectedDayTextColor: '#FFFFFF',
                    }}
                />
            </View>
            <TouchableOpacity style={styles.addButton}>
                <Text style={styles.addButtonText}>Add to Calendar</Text>
            </TouchableOpacity>
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
    addButton: {
        backgroundColor: '#2575FC',
        width: wp('80%'),
        paddingVertical: hp('2%'),
        borderRadius: wp('4%'),
        alignItems: 'center',
        alignSelf: 'center',
        marginVertical: hp('5%'),
    },
    addButtonText: {
        color: 'white',
        fontSize: wp('4.5%'),
        fontWeight: 'bold',
    },
});

export default CalendarScreen;


