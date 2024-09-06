import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, SafeAreaView, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import DateTimePicker from '@react-native-community/datetimepicker';
import CustomInput from '../components/CustomInput';
import CustomButton from '../components/CustomButton';
import DropDownPicker from 'react-native-dropdown-picker';
import { useDispatch } from 'react-redux';
import { addPayment } from '../redux/actions';

const PaymentForm = ({ navigation, route }: any) => {
    
    const { folderId, folderName } = route.params;

    const [title, setTitle] = useState('');
    const [amount, setAmount] = useState(''); 
    const [paymentType, setPaymentType] = useState('');
    const [paymentMethod, setPaymentMethod] = useState('');
    const [installments, setInstallments] = useState('');
    const [dueDate, setDueDate] = useState(new Date());
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [description, setDescription] = useState('');

    const dispatch = useDispatch();

    const [openPaymentType, setOpenPaymentType] = useState(false);
    const [openPaymentMethod, setOpenPaymentMethod] = useState(false);
    const [openInstallments, setOpenInstallments] = useState(false);

    const paymentTypeData = [
        { label: 'Payable', value: 'Payable' },
        { label: 'Receivable', value: 'Receivable' },
    ];

    const paymentMethodData = [
        { label: 'Onetime payment', value: 'Onetime' },
        { label: 'Installments', value: 'Installments' },
    ];

    const installmentMonthsData = [
        { label: '6 months', value: '6' },
        { label: '12 months', value: '12' },
        { label: '18 months', value: '18' },
    ];

    const onDateChange = (event: any, selectedDate: any) => {
        const currentDate = selectedDate || dueDate;
        setShowDatePicker(false);
        setDueDate(currentDate);
    };

    const handleSave = () => {
        if (!title || !paymentType || !paymentMethod || !dueDate || !amount) {
            Alert.alert('Error', 'Please fill in all required fields');
            return;
        }
    
        const newPayment: any = {
            id: Date.now().toString(),
            title,
            amount,
            dueDate: dueDate.toISOString().split('T')[0],
            description,
            type: paymentType,
            paid: false,
            installmentMonths: paymentMethod === 'Installments' ? installments : null,
            installmentsPaid: 0,
            createdDate: new Date().toISOString(),
        };
    
        // Dispatch the action to add the payment to the folder
        dispatch(addPayment(newPayment, folderId));
    
        console.log('Added payment:', newPayment);
    
        // Navigate back to the folder details screen after saving
        navigation.goBack();
    };
    
    

    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView contentContainerStyle={styles.container}>
                {/* Header */}
                <View style={styles.headerContainer}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backIcon}>
                        <Ionicons name="arrow-back" size={wp('7%')} color="#3D3EAA" />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>Input Due</Text>
                </View>

                {/* Title Input */}
                <CustomInput placeholder="Title" value={title} onChangeText={setTitle} />

                {/* Payment Type Dropdown */}
                <DropDownPicker
                    open={openPaymentType}
                    value={paymentType}
                    items={paymentTypeData}
                    setOpen={setOpenPaymentType}
                    setValue={setPaymentType}
                    placeholder="Select Payment Type"
                    style={styles.dropdown}
                    dropDownContainerStyle={styles.dropDownContainer}
                    zIndex={5000}
                />

                {/* Payment Method Dropdown */}
                <DropDownPicker
                    open={openPaymentMethod}
                    value={paymentMethod}
                    items={paymentMethodData}
                    setOpen={setOpenPaymentMethod}
                    setValue={setPaymentMethod}
                    placeholder="Select Payment Method"
                    style={styles.dropdown}
                    dropDownContainerStyle={styles.dropDownContainer}
                    zIndex={4000}
                />

                {/* Conditional Rendering based on Installments */}
                {paymentMethod === 'Installments' && (
                    <>
                        <DropDownPicker
                            open={openInstallments}
                            value={installments}
                            items={installmentMonthsData}
                            setOpen={setOpenInstallments}
                            setValue={setInstallments}
                            placeholder="Select Installment Months"
                            style={styles.dropdown}
                            dropDownContainerStyle={styles.dropDownContainer}
                            zIndex={3000}
                        />
                        <Text style={styles.label}>Per Installment</Text>
                        <CustomInput placeholder="Enter Installment Amount" value={amount} onChangeText={setAmount} />
                    </>
                )}

                {/* Amount Input */}
                {paymentMethod !== 'Installments' && (
                    <>
                        <Text style={styles.label}>Amount</Text>
                        <CustomInput placeholder="Enter Amount" value={amount} onChangeText={setAmount} />
                    </>
                )}

                {/* Due Date */}
                <View>
                    <Text style={styles.label}>Due date</Text>
                    <TouchableOpacity
                        onPress={() => setShowDatePicker(true)}
                        style={styles.dateInput}
                    >
                        <Text style={{ color: 'gray' }}>{dueDate.toLocaleDateString()}</Text>
                        <Ionicons name="calendar" size={wp('5%')} color="#797979" />
                    </TouchableOpacity>
                    {showDatePicker && (
                        <DateTimePicker
                            value={dueDate}
                            mode="date"
                            display="default"
                            onChange={onDateChange}
                        />
                    )}
                </View>

                {/* Description Input */}
                <Text style={styles.label}>Description</Text>
                <CustomInput
                    placeholder="Type here"
                    multiline={true}
                    numberOfLines={4}
                    style={styles.descriptionInput}
                    value={description}
                    onChangeText={setDescription}
                />

                {/* Save Button */}
                <CustomButton label="Save" onPress={handleSave} />
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#F8F8F8',
    },
    container: {
        paddingHorizontal: wp('5%'),
        paddingVertical: hp('2%'),
        backgroundColor: '#F8F8F8',
        flexGrow: 1,
    },
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: hp('2%'),
        position: 'relative',
    },
    backIcon: {
        position: 'absolute',
        left: wp('0%'),
    },
    headerTitle: {
        fontSize: wp('6%'),
        fontWeight: 'bold',
        color: '#000',
    },
    dropdown: {
        marginBottom: hp('2%'),
        borderRadius: wp('4%'),
        borderColor: '#E0E0E0',
        backgroundColor: '#FFFFFF',
    },
    dropDownContainer: {
        borderColor: '#E0E0E0',
        borderRadius: wp('4%'),
    },
    label: {
        fontSize: wp('4%'),
        color: '#000',
        fontWeight: 'bold',
        marginBottom: hp('1%'),
        alignSelf: 'center'
    },
    dateInput: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#E0E0E0',
        borderRadius: wp('4%'),
        padding: wp('4%'),
        backgroundColor: '#FFFFFF',
    },
    descriptionInput: {
        height: hp('20%'),
    },
});

export default PaymentForm;
