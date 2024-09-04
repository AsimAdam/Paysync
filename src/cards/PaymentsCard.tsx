import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const PaymentsCard = ({ title, amount, dueDate, iconSource, paid }: any) => {
    return (
        <View style={styles.cardContainer}>
            <View style={styles.iconContainer}>
                <Image source={iconSource} style={styles.icon} />
            </View>
            <View style={styles.textContainer}>
                <Text style={styles.title}>{title}</Text>
                <Text style={styles.amount}>{amount}</Text>
                <Text style={styles.dueDate}>Due Date: {dueDate}</Text>
            </View>
            {paid && (
                <Text style={styles.paidTagText}>PAID</Text>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    cardContainer: {
        flexDirection: 'row',
        padding: wp('4%'),
        marginVertical: hp('1%'),
        backgroundColor: '#FFFFFF',
        borderRadius: wp('4%'),
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    iconContainer: {
        marginRight: wp('3%'),
    },
    icon: {
        width: wp('10%'),
        height: wp('10%'),
        resizeMode: 'contain',
    },
    textContainer: {
        flex: 1,
    },
    title: {
        fontSize: wp('4%'),
        color: '#717171',
    },
    amount: {
        fontSize: wp('5%'),
        color: '#000000',
    },
    dueDate: {
        fontSize: wp('3.5%'),
        color: '#717171',
    },
    paidTagText: {
        fontSize: wp('4%'),
        color: '#4CAF50', // Green color for the PAID text
        textAlign: 'right',
    },
});

export default PaymentsCard;
