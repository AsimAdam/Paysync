import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const NavCard = ({ title, iconSource, onPress }: any) => {
    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.card} onPress={onPress}>
                <Image source={iconSource} style={styles.icon} />
            </TouchableOpacity>
            <Text style={styles.cardText}>{title}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        marginHorizontal: wp('1%'),
    },
    card: {
        width: wp('20%'), 
        height: wp('20%'),
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: wp('3%'),
        backgroundColor: '#F0F0F0',
        padding: wp('2%'),
    },
    icon: {
        width: wp('10%'),
        height: wp('10%'),
        resizeMode: 'contain',
    },
    cardText: {
        fontSize: wp('3.5%'),
        color: '#8A8A8A', // Gray color for text
        marginTop: hp('1%'), // Space between the button and text
    },
});

export default NavCard;
