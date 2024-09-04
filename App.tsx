import React from 'react';
import Nav from './src/stack/nav';
import CalendarScreen from './src/screens/Calendar';
import Dues from './src/screens/Dues';
import Paid from './src/screens/Paid';
import FolderDetails from './src/screens/FolderDetails';
import { Calendar } from 'react-native-calendars';
import PaymentDetails from './src/screens/PaymentDetails';
import PaymentForm from './src/screens/PaymentForm';

export default function App() {
    return <PaymentForm />;
}
