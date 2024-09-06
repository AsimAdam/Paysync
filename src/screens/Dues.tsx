import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import Header from '../components/Header';
import AddFolderModal from '../components/FolderModal';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { addFolder } from '../redux/actions';

const Dues = ({ navigation }: any) => {
    const [isModalVisible, setModalVisible] = useState(false);

    const folders = useSelector((state: any) => state.folders.folders);
    const dispatch = useDispatch();

    const payableFolders = folders.filter((folder: any) => folder.type === 'payable');
    const receivableFolders = folders.filter((folder: any) => folder.type === 'receivable');

    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };

    const handleAddFolder = (folderName: string, folderType: 'payable' | 'receivable') => {
        const newFolder = {
            id: Date.now().toString(),
            name: folderName,
            type: folderType,
            payments: [],
        };
        dispatch(addFolder(newFolder));
        toggleModal();
    };

    return (
        <SafeAreaView style={styles.container}>
            <Header
                title="Dues"
                subtitle="Keep a clear record of all your payments, with detailed histories for easy reference."
                onBackPress={() => navigation.goBack()}
            />
            <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
                {/* Payable Section */}
                <View style={styles.section}>
                    <View style={styles.sectionHeader}>
                        <View style={styles.line} />
                        <Text style={styles.sectionTitle}>Payable:</Text>
                        <View style={styles.line} />
                    </View>
                    <View style={styles.iconRow}>
                        {payableFolders.length > 0 ? (
                            payableFolders.map((folder: any) => (
                                <TouchableOpacity
                                    key={folder.id}
                                    style={styles.iconWrapper}
                                    // Navigate to FolderDetails and pass folder id and name
                                    onPress={() => navigation.navigate('FolderDetails', { folderId: folder.id, folderName: folder.name })}
                                >
                                    <Image source={require('../assets/folder.png')} style={styles.icon} />
                                    <Text style={styles.iconText}>{folder.name}</Text>
                                </TouchableOpacity>
                            ))
                        ) : (
                            <Text style={styles.iconText}>No Payable Folders</Text>
                        )}
                    </View>
                </View>

                {/* Receivable Section */}
                <View style={styles.section}>
                    <View style={styles.sectionHeader}>
                        <View style={styles.line} />
                        <Text style={styles.sectionTitle}>Receivable:</Text>
                        <View style={styles.line} />
                    </View>
                    <View style={styles.iconRow}>
                        {receivableFolders.length > 0 ? (
                            receivableFolders.map((folder: any) => (
                                <TouchableOpacity
                                    key={folder.id}
                                    style={styles.iconWrapper}
                                    // Navigate to FolderDetails and pass folder id and name
                                    onPress={() => navigation.navigate('FolderDetails', { folderId: folder.id, folderName: folder.name })}
                                >
                                    <Image source={require('../assets/folder.png')} style={styles.icon} />
                                    <Text style={styles.iconText}>{folder.name}</Text>
                                </TouchableOpacity>
                            ))
                        ) : (
                            <Text style={styles.iconText}>No Receivable Folders</Text>
                        )}
                    </View>
                </View>
            </ScrollView>

            {/* Floating Action Button (FAB) for adding a new folder */}
            <TouchableOpacity style={styles.fab} onPress={toggleModal}>
                <Image source={require('../assets/plus.png')} style={styles.fabIcon} />
            </TouchableOpacity>

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
        flexWrap: 'wrap',
        justifyContent: 'flex-start',
        marginBottom: hp('2%'),
    },
    iconWrapper: {
        width: wp('25%'),
        alignItems: 'center',
        marginHorizontal: wp('1.5%'),
        marginBottom: hp('2%'),
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

export default Dues;
