import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import Header from '../components/Header';
import PaymentsCard from '../cards/PaymentsCard';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const Paid = () => {
    return (
        <View style={styles.container}>
            {/* Header */}
            <Header
                title="Paid"
                subtitle="Your paid amount showcase to keep you updated"
                onBackPress={() => {}}
            />
            
            {/* Sort Button */}
            <TouchableOpacity style={styles.sortButton}>
                <Text style={styles.sortText}>Sort</Text>
                <Image source={require('../assets/sort.png')} style={styles.sortIcon} />
            </TouchableOpacity>
            
            {/* Paid Payments List */}
            <View style={styles.paymentsContainer}>
                <PaymentsCard 
                    title="Payments for credit card." 
                    amount="1500$" 
                    dueDate="13/2/2024" 
                    iconSource={require('../assets/icon-red.png')}
                    paid={true} 
                />
                <PaymentsCard 
                    title="Friend have to pay" 
                    amount="450$" 
                    dueDate="13/2/2024" 
                    iconSource={require('../assets/icon-green.png')}
                    paid={true} 
                />
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
        top: '5%'
    },
    sortText: {
        fontSize: wp('4%'),
        color: '#000',
        marginRight: wp('1%'),
        fontWeight: '600'
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
});

export default Paid;
