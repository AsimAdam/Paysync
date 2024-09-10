import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import Main from '../screens/Main';
import CalendarScreen from '../screens/Calendar';
import Dues from '../screens/Dues';
import Paid from '../screens/Paid';
import FolderDetails from '../screens/FolderDetails';
import PaymentForm from '../screens/PaymentForm';
import Splash from '../screens/Splash';
import ReceivableDetails from '../screens/ReceivableDetails';
import PayableDetails from '../screens/PayableDetails';
import CreateProfile from '../screens/CreateProfile';
import Payments from '../screens/Payment';

const Stack = createStackNavigator();

const Nav = ({ initialRoute, decryptedNexaUrl }: any) => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName={initialRoute}>
                <Stack.Screen 
                    name="Splash" 
                    component={Splash} 
                    options={{ headerShown: false }} 
                />
                <Stack.Screen 
                    name="CreateProfile" 
                    component={CreateProfile} 
                    options={{ headerShown: false }} 
                />
                <Stack.Screen 
                    name="Main" 
                    component={Main} 
                    options={{ headerShown: false }} 
                />
                <Stack.Screen 
                    name="CalendarScreen" 
                    component={CalendarScreen} 
                    options={{ headerShown: false }}
                />
                <Stack.Screen 
                    name="Dues" 
                    component={Dues} 
                    options={{ headerShown: false }}
                />
                <Stack.Screen 
                    name="Paid" 
                    component={Paid} 
                    options={{ headerShown: false }}
                />
                <Stack.Screen 
                    name="FolderDetails" 
                    component={FolderDetails} 
                    options={{ headerShown: false }}
                />
                <Stack.Screen 
                    name="PayableDetails" 
                    component={PayableDetails} 
                    options={{ headerShown: false }}
                />
                <Stack.Screen 
                    name="ReceivableDetails" 
                    component={ReceivableDetails} 
                    options={{ headerShown: false }}
                />
                <Stack.Screen 
                    name="PaymentForm" 
                    component={PaymentForm} 
                    options={{ headerShown: false }}
                />
                <Stack.Screen 
                    name="Payments" 
                    component={Payments} 
                    options={{ headerShown: false }} 
                    initialParams={{ url: decryptedNexaUrl }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default Nav;
