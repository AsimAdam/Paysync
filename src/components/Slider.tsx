import React from 'react';
import { View, Text, StyleSheet, ImageBackground } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const Slider = () => {
    return (
        <View style={styles.sliderContainer}>
            <ImageBackground 
                source={require('../assets/banner.png')} 
                style={styles.imageBackground}
                imageStyle={styles.imageStyle}
            >
               <Text style={styles.sliderText}>
                    Easily record and categorize{'\n'}
                    your daily spending{'\n'}
                    to see where your money goes.
                </Text>

            </ImageBackground>
        </View>
    );
};

const styles = StyleSheet.create({
    sliderContainer: {
        width: wp('95%'),
        height: hp('20%'),
        borderRadius: wp('4%'),
        overflow: 'hidden',
        alignSelf: 'center',
        marginVertical: hp('2%'),
    },
    imageBackground: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    imageStyle: {
        resizeMode: 'contain',
        borderRadius: wp('4%'),
    },
    sliderText: {
        color: '#FFFFFF',
        fontSize: wp('4%'),
        textAlign: 'center',
        paddingHorizontal: wp('5%'),
        marginTop: hp('-2%'),
    },
    
});

export default Slider;
