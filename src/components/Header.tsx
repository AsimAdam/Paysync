import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ViewStyle, Platform } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

interface HeaderProps {
    title: string;
    subtitle?: string;
    onBackPress?: () => void;
    containerStyle?: ViewStyle;
}

const Header: React.FC<HeaderProps> = ({ 
    title, 
    subtitle, 
    onBackPress,
    containerStyle 
}) => {
    return (
        <LinearGradient 
            colors={['#78C4FA', '#3D3EAA']} 
            style={[styles.headerContainer, containerStyle]}
        >
            <View style={styles.contentContainer}>
                {onBackPress && (
                    <TouchableOpacity 
                        onPress={onBackPress}
                        style={styles.backButton}
                        hitSlop={{ top: 15, bottom: 15, left: 15, right: 15 }}
                    >
                        <Ionicons 
                            name="arrow-back" 
                            size={wp('7%')} 
                            color="white" 
                        />
                    </TouchableOpacity>
                )}
                <View style={styles.titleContainer}>
                    <Text style={styles.title}>{title}</Text>
                    {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
                </View>
            </View>
        </LinearGradient>
    );
};

const styles = StyleSheet.create({
    headerContainer: {
        width: wp('100%'),
        paddingTop: Platform.OS === 'ios' ? hp('1%') : hp('3%'),
        paddingBottom: hp('5%'),
        borderBottomLeftRadius: wp('10%'),
        borderBottomRightRadius: wp('10%'),
    },
    contentContainer: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        paddingHorizontal: wp('4%'),
        marginTop: hp('1%'),
    },
    backButton: {
        padding: wp('0.5%'),
        marginRight: wp('10%'),
        marginLeft: -15,
        marginTop: -12,
        marginBottom: hp('0.10%'),
    },
    titleContainer: {
        flex: 1,
        alignItems: 'flex-start',
        justifyContent: 'center',
        // marginTop: hp('0.5%'),
    },
    title: {
        color: 'white',
        fontSize: wp('5.5%'),
        fontWeight: 'bold',
        textAlign: 'left',
        marginTop: -10,
        marginBottom: hp('0.5%'),
    },
    subtitle: {
        color: '#CCCCFF',
        fontSize: wp('3.8%'),
        textAlign: 'left',
        marginTop: hp('0.3%'),
    },
});

export default Header;

