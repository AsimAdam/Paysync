import { Text, StyleSheet, TouchableOpacity } from 'react-native';
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
            <Text style={styles.subtitle}>{subtitle}</Text>
        </LinearGradient>
    );
};

const styles = StyleSheet.create({
    headerContainer: {
        width: wp('100%'),
        paddingVertical: hp('3.5%'),
        paddingHorizontal: wp('5%'),
        borderBottomLeftRadius: wp('10%'),
        borderBottomRightRadius: wp('10%'),
        alignItems: 'center',
        position: 'relative',
    },
    backIcon: {
        position: 'absolute',
        left: wp('4%'), 
        top: hp('3%'),
        zIndex: 10, 
        padding: hp('1%'),
    },
    title: {
        color: 'white',
        fontSize: wp('6%'),
        textAlign: 'center',
        fontWeight: 'bold',
        marginTop: hp('0.5%'), 
    },
    subtitle: {
        color: '#CCCCFF',
        fontSize: wp('4%'),
        textAlign: 'center',
        marginTop: hp('0.2%'),
    },
});

export default Header;
