import React, { useState } from 'react';
import { Modal, View, Text, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native';
import { useDispatch } from 'react-redux';
import { addFolder } from '../redux/actions';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { CheckBox } from 'react-native-elements';
import { Ionicons } from '@expo/vector-icons';

const AddFolderModal = ({ visible, onClose }: any) => {
    const [folderName, setFolderName] = useState('');
    const [folderType, setFolderType] = useState<'payable' | 'receivable'>('payable');
    const dispatch = useDispatch();

    const handleAddFolder = () => {
        if (!folderName.trim()) {
            Alert.alert('Error', 'Please enter a folder name');
            return;
        }

        const newFolder = {
            id: Date.now().toString(),
            name: folderName,
            type: folderType,
            payments: [],
        };

        console.log('Adding new folder:', newFolder);
        dispatch(addFolder(newFolder));
        setFolderName('');
        onClose();
    };

    return (
        <Modal visible={visible} transparent={true} animationType="fade">
            <View style={styles.backdrop}>
                <View style={styles.modalContainer}>
                    {/* Cross Icon to Close the Modal */}
                    <TouchableOpacity style={styles.closeIcon} onPress={onClose}>
                        <Ionicons name="close" size={wp('6%')} color="#000" />
                    </TouchableOpacity>

                    <Text style={styles.modalTitle}>Folder Name</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Enter folder name"
                        value={folderName}
                        onChangeText={setFolderName}
                    />
                    {/* Folder Type Selector */}
                    <View style={styles.checkboxContainer}>
                        <CheckBox
                            title="Payable"
                            checked={folderType === 'payable'}
                            onPress={() => setFolderType('payable')}
                            containerStyle={styles.checkbox}
                        />
                        <CheckBox
                            title="Receivable"
                            checked={folderType === 'receivable'}
                            onPress={() => setFolderType('receivable')}
                            containerStyle={styles.checkbox}
                        />
                    </View>
                    <TouchableOpacity style={styles.addButton} onPress={handleAddFolder}>
                        <Text style={styles.addButtonText}>Add Folder</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    backdrop: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContainer: {
        width: wp('80%'),
        backgroundColor: '#FFFFFF',
        borderRadius: wp('4%'),
        padding: wp('5%'),
        alignItems: 'center',
        position: 'relative',
    },
    closeIcon: {
        position: 'absolute',
        top: wp('2%'),
        right: wp('2%'),
    },
    modalTitle: {
        fontSize: wp('5%'),
        fontWeight: 'bold',
        marginBottom: hp('2%'),
    },
    input: {
        width: wp('70%'),
        height: hp('6%'),
        borderColor: '#E0E0E0',
        borderWidth: 1,
        borderRadius: wp('2%'),
        paddingHorizontal: wp('4%'),
        marginBottom: hp('3%'),
    },
    checkboxContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: wp('70%'),
        marginBottom: hp('3%'),
    },
    checkbox: {
        backgroundColor: 'transparent',
        borderWidth: 0,
    },
    addButton: {
        backgroundColor: '#3D3EAA',
        width: wp('70%'),
        paddingVertical: hp('2%'),
        borderRadius: wp('3%'),
        alignItems: 'center',
    },
    addButtonText: {
        color: '#FFFFFF',
        fontSize: wp('4.5%'),
        fontWeight: 'bold',
    },
});

export default AddFolderModal;
