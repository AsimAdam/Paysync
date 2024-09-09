import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const Header = ({ title, subtitle, onBackPress }: any) => {
    return (
        <LinearGradient 
            colors={['#78C4FA', '#3D3EAA']} 
            style={styles.headerContainer}
        >
            <TouchableOpacity 
              onPress={() => {
                console.log("Back pressed");
                onBackPress && onBackPress();
              }} 
              style={styles.backIcon}
            >
                <Ionicons name="arrow-back" size={wp('7%')} color="white" />
            </TouchableOpacity>
            <Text style={styles.title}>{title}</Text>
            {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
        </LinearGradient>
    );
};

const styles = StyleSheet.create({
    headerContainer: {
        width: wp('100%'),
        paddingVertical: hp('3%'),
        paddingHorizontal: wp('5%'),
        borderBottomLeftRadius: wp('10%'),
        borderBottomRightRadius: wp('10%'),
        position: 'relative',
    },
    backIcon: {
        position: 'absolute',
        zIndex: 10, 
        padding: 10,
    },
    title: {
        color: 'white',
        fontSize: wp('6%'),
        textAlign: 'center',
        fontWeight: 'bold',
        bottom: hp('1%')
    },
    subtitle: {
        color: '#CCCCFF',
        fontSize: wp('4%'),
        textAlign: 'center',
        marginTop: hp('1%'), 
    },
});

export default Header;

