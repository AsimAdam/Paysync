import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native';
import Header from '../components/Header';
import AddFolderModal from '../components/FolderModal';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const Dues = () => {
    const [isModalVisible, setModalVisible] = useState(false);

    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };

    const handleAddFolder = (folderName: string) => {
        console.log('New folder added:', folderName);
        toggleModal(); // Close modal after adding
    };

    return (
        <SafeAreaView style={styles.container}>
            <Header
                title="Dues"
                subtitle="Keep a clear record of all your payments, with detailed histories for easy reference."
                onBackPress={() => {}}
            />
            <ScrollView contentContainerStyle={styles.content}>
                {/* Payable Section */}
                <View style={styles.section}>
                    <View style={styles.sectionHeader}>
                        <View style={styles.line} />
                        <Text style={styles.sectionTitle}>Payable:</Text>
                        <View style={styles.line} />
                    </View>
                    <View style={styles.iconRow}>
                        {/* Folder Icon 1 */}
                        <TouchableOpacity style={styles.iconWrapper}>
                            <Image source={require('../assets/folder.png')} style={styles.icon} />
                            <Text style={styles.iconText}>Bank</Text>
                        </TouchableOpacity>
                        {/* Folder Icon 2 */}
                        <TouchableOpacity style={styles.iconWrapper}>
                            <Image source={require('../assets/folder.png')} style={styles.icon} />
                            <Text style={styles.iconText}>Utilities</Text>
                        </TouchableOpacity>
                        {/* Folder Icon 3 */}
                        <TouchableOpacity style={styles.iconWrapper}>
                            <Image source={require('../assets/folder.png')} style={styles.icon} />
                            <Text style={styles.iconText}>Bank</Text>
                        </TouchableOpacity>
                    </View>
                    {/* Add New Plus Icon */}
                    <TouchableOpacity style={styles.addNewIconWrapper} onPress={toggleModal}>
                        <Image source={require('../assets/plus.png')} style={styles.plusIcon} />
                    </TouchableOpacity>
                </View>

                {/* Receivable Section */}
                <View style={styles.section}>
                    <View style={styles.sectionHeader}>
                        <View style={styles.line} />
                        <Text style={styles.sectionTitle}>Receivable:</Text>
                        <View style={styles.line} />
                    </View>
                    <View style={styles.iconRow}>
                        {/* Folder Icon 1 */}
                        <TouchableOpacity style={styles.iconWrapper}>
                            <Image source={require('../assets/folder.png')} style={styles.icon} />
                            <Text style={styles.iconText}>Friends</Text>
                        </TouchableOpacity>
                        {/* Folder Icon 2 */}
                        <TouchableOpacity style={styles.iconWrapper}>
                            <Image source={require('../assets/folder.png')} style={styles.icon} />
                            <Text style={styles.iconText}>Relatives</Text>
                        </TouchableOpacity>
                        {/* Folder Icon 3 */}
                        <TouchableOpacity style={styles.iconWrapper}>
                            <Image source={require('../assets/folder.png')} style={styles.icon} />
                            <Text style={styles.iconText}>Others</Text>
                        </TouchableOpacity>
                    </View>
                    {/* Add New Plus Icon */}
                    <TouchableOpacity style={styles.addNewIconWrapper} onPress={toggleModal}>
                        <Image source={require('../assets/plus.png')} style={styles.plusIcon} />
                    </TouchableOpacity>
                </View>
            </ScrollView>

            {/* Modal for adding a new folder */}
            <AddFolderModal 
                visible={isModalVisible} 
                onClose={toggleModal} 
                onAddFolder={handleAddFolder} 
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8F8F8',
    },
    content: {
        paddingHorizontal: wp('5%'),
        paddingVertical: hp('2%'),
    },
    section: {
        marginVertical: hp('2%'),
    },
    sectionHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: hp('1%'),
    },
    line: {
        height: 1,
        flex: 1,
        backgroundColor: '#E0E0E0',
        marginHorizontal: wp('2%'),
    },
    sectionTitle: {
        fontSize: wp('4.5%'),
        fontWeight: 'bold',
        color: '#000000',
    },
    iconRow: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: hp('2%'),
        marginTop: hp('5%'),
    },
    iconWrapper: {
        alignItems: 'center',
    },
    icon: {
        width: wp('15%'),
        height: wp('15%'),
        resizeMode: 'contain',
    },
    iconText: {
        marginTop: hp('0.5%'),
        fontSize: wp('4%'),
        color: '#333333',
    },
    addNewIconWrapper: {
        alignSelf: 'flex-start',
        marginTop: hp('2%'),
        left: '8%',
    },
    plusIcon: {
        width: wp('15%'),
        height: wp('15%'),
        resizeMode: 'contain',
    },
});

export default Dues;
