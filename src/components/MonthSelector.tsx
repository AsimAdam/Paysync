import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const MonthSelector = ({ onMonthChange }: any) => {
    const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());

    const handleMonthPress = (index: number) => {
        setSelectedMonth(index);
        onMonthChange(index);
    };

    return (
        <View style={styles.container}>
            {months.map((month, index) => (
                <TouchableOpacity
                    key={month}
                    style={[
                        styles.monthButton,
                        selectedMonth === index && styles.selectedMonth,
                    ]}
                    onPress={() => handleMonthPress(index)}
                >
                    <Text style={styles.monthText}>{month}</Text>
                </TouchableOpacity>
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        marginVertical: hp('2%'),
    },
    monthButton: {
        width: wp('12%'),
        height: wp('12%'),
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: wp('6%'), // Circular shape
        backgroundColor: '#F0F0F0', // Default background
        marginVertical: hp('1%'),
    },
    selectedMonth: {
        backgroundColor: '#2575FC', // Highlighted color
    },
    monthText: {
        fontSize: wp('4%'),
        color: '#333',
    },
});

export default MonthSelector;
