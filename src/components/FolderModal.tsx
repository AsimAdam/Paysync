import React from 'react';
import { Modal, View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const AddFolderModal = ({ visible, onClose, onAddFolder }: any) => {
    const [folderName, setFolderName] = React.useState('');

    const handleAddFolder = () => {
        onAddFolder(folderName);
        setFolderName('');
    };

    return (
        <Modal
            visible={visible}
            transparent={true}
            animationType="fade"
        >
            <View style={styles.backdrop}>
                <View style={styles.modalContainer}>
                    <Text style={styles.modalTitle}>Folder Name</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Enter folder name"
                        value={folderName}
                        onChangeText={setFolderName}
                    />
                    <TouchableOpacity style={styles.addButton} onPress={handleAddFolder}>
                        <Text style={styles.addButtonText}>Add to Calendar</Text>
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
