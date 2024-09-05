
import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native';
import { useSelector } from 'react-redux';
import Header from '../components/Header';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const Dues = ({ navigation }: any) => {
    const folders = useSelector((state: any) => state.folders.folders);

    const payableFolders = folders.filter((folder: any) => folder.type === 'payable');
    const receivableFolders = folders.filter((folder: any) => folder.type === 'receivable');

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
                        {payableFolders.length > 0 ? (
                            payableFolders.map((folder: any) => (
                                <TouchableOpacity 
                                    key={folder.id} 
                                    style={styles.iconWrapper}
                                    onPress={() => navigation.navigate('FolderDetails', { folderId: folder.id, folderName: folder.name })}
                                >
                                    <Image source={require('../assets/folder.png')} style={styles.icon} />
                                    <Text style={styles.iconText}>{folder.name}</Text>
                                </TouchableOpacity>
                            ))
                        ) : (
                            <Text style={styles.noFoldersText}>No Payable Folders</Text>
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
                                    onPress={() => navigation.navigate('FolderDetails', { folderId: folder.id, folderName: folder.name })}
                                >
                                    <Image source={require('../assets/folder.png')} style={styles.icon} />
                                    <Text style={styles.iconText}>{folder.name}</Text>
                                </TouchableOpacity>
                            ))
                        ) : (
                            <Text style={styles.noFoldersText}>No Receivable Folders</Text>
                        )}
                    </View>
                </View>
            </ScrollView>
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
    noFoldersText: {
        color: '#717171',
        fontSize: wp('4%'),
        textAlign: 'center',
    },
});

export default Dues;
