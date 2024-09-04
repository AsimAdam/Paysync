import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import PaymentsCard from '../cards/PaymentsCard';
import { Ionicons } from '@expo/vector-icons';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const FolderDetails = ({ navigation }: any) => {
    const folderTitle = "Utilities"; // Folder title can be passed via props or hardcoded

    return (
        <View style={styles.container}>
            {/* Local Header */}
            <View style={styles.headerContainer}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backIcon}>
                    <Ionicons name="arrow-back" size={wp('7%')} color="#3D3EAA" />
                </TouchableOpacity>
                <View style={styles.titleContainer}>
                    <Text style={styles.headerTitle}>{folderTitle}</Text>
                </View>
            </View>

            {/* Sort Button */}
            <TouchableOpacity style={styles.sortButton}>
                <Text style={styles.sortText}>Sort</Text>
                <Image source={require('../assets/sort.png')} style={styles.sortIcon} />
            </TouchableOpacity>
            
            {/* Payments List */}
            <View style={styles.paymentsContainer}>
                <PaymentsCard 
                    title="Electricity bill" 
                    amount="1500$" 
                    dueDate="13/2/2024" 
                    iconSource={require('../assets/icon-red.png')}
                    paid={false} 
                />
                <PaymentsCard 
                    title="Gas" 
                    amount="200$" 
                    dueDate="15/2/2024" 
                    iconSource={require('../assets/icon-red.png')}
                    paid={false} 
                />
            </View>

            {/* Floating Add Button */}
            <TouchableOpacity style={styles.fab}>
                <Image source={require('../assets/plus.png')} style={styles.fabIcon} />
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8F8F8',
    },
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: hp('3%'),
        paddingHorizontal: wp('4%'),
        position: 'relative', // Ensures title is centrally aligned
    },
    backIcon: {
        position: 'absolute',
        left: wp('4%'), // Ensures it stays on the left side
    },
    titleContainer: {
        flex: 1,
        justifyContent: 'center', // Centers the title
        alignItems: 'center',
    },
    headerTitle: {
        fontSize: wp('6%'),
        fontWeight: 'bold',
        color: '#000000',
        textAlign: 'center',
    },
    sortButton: {
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'flex-end',
        marginRight: wp('4%'), // Position the sort button properly
    },
    sortText: {
        fontSize: wp('4%'),
        color: '#717171',
        marginRight: wp('1%'),
    },
    sortIcon: {
        width: wp('5%'),
        height: wp('5%'),
        resizeMode: 'contain',
    },
    paymentsContainer: {
        marginTop: hp('2%'),
        paddingHorizontal: wp('4%'),
    },
    fab: {
        position: 'absolute',
        bottom: hp('3%'),
        right: wp('5%'),
        width: wp('15%'),
        height: wp('15%'),
        borderRadius: wp('7.5%'),
        backgroundColor: '#3D3EAA',
        justifyContent: 'center',
        alignItems: 'center',
    },
    fabIcon: {
        width: wp('7%'),
        height: wp('7%'),
        resizeMode: 'contain',
    },
});

export default FolderDetails;
