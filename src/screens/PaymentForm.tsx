import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, SafeAreaView, Alert, KeyboardAvoidingView, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import DateTimePicker from '@react-native-community/datetimepicker';
import CustomInput from '../components/CustomInput';
import CustomButton from '../components/CustomButton';
import DropDownPicker from 'react-native-dropdown-picker';
import { useDispatch } from 'react-redux';
import { addPayment } from '../global/actions';

interface PaymentFormProps {
    navigation: any;
    route: any;
}

const PaymentForm: React.FC<PaymentFormProps> = ({ navigation, route }) => {
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
        try {
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
            dispatch(addPayment(newPayment, folderId));
            navigation.goBack();
        } catch (error) {
            Alert.alert('Error', 'Something went wrong while saving the payment.');
        }
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            {/* Custom Header restored */}
            <View style={styles.headerContainer}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backIcon}>
                    <Ionicons name="arrow-back" size={wp('7%')} color="#3D3EAA" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Input Due</Text>
            </View>
            <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={Platform.OS === 'ios' ? 'padding' : undefined}
                keyboardVerticalOffset={Platform.OS === 'ios' ? hp('2%') : 0}
            >
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={[styles.container, { paddingBottom: hp('8%') }]}
                    keyboardShouldPersistTaps="handled"
                >
                    {/* Title Input */}
                    <Text style={styles.labelLeft}>Title</Text>
                    <CustomInput placeholder="Title" value={title} onChangeText={setTitle} />

                    {/* Payment Type Dropdown */}
                    <Text style={styles.labelLeft}>Type</Text>
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
                    <Text style={styles.labelLeft}>Payment Method</Text>
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
                            <Text style={styles.labelLeft}>Installment Months</Text>
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
                            <Text style={styles.labelLeft}>Per Installment</Text>
                            <CustomInput placeholder="Enter Installment Amount" value={amount} onChangeText={setAmount} />
                        </>
                    )}

                    {/* Amount Input */}
                    {paymentMethod !== 'Installments' && (
                        <>
                            <Text style={styles.labelLeft}>Amount</Text>
                            <CustomInput placeholder="Enter Amount" value={amount} onChangeText={setAmount} />
                        </>
                    )}

                    {/* Due Date */}
                    <Text style={styles.labelLeft}>Due Date</Text>
                    <View>
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
                    <Text style={styles.labelLeft}>Description</Text>
                    <CustomInput
                        placeholder="Type here"
                        multiline={true}
                        numberOfLines={4}
                        style={styles.descriptionInput}
                        value={description}
                        onChangeText={setDescription}
                    />
                    <CustomButton label="Save" onPress={handleSave} />
                
                </ScrollView>
            </KeyboardAvoidingView>
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
        marginLeft: wp('5%'),
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
        margin: hp('2%'),
    },
    labelLeft: {
        fontSize: wp('4%'),
        color: '#000',
        fontWeight: 'bold',
        marginTop: hp('2%'),
        marginBottom: hp('0.5%'),
        textAlign: 'left',
        marginLeft: 0,
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
