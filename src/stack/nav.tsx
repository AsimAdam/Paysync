import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import Main from '../screens/Main';
import CalendarScreen from '../screens/Calendar';
import Dues from '../screens/Dues';
import Paid from '../screens/Paid';
import FolderDetails from '../screens/FolderDetails';
import PaymentDetails from '../screens/PaymentDetails';
import PaymentForm from '../screens/PaymentForm';

const Stack = createStackNavigator();

const Nav = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Main">
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
                    name="PaymentDetails" 
                    component={PaymentDetails} 
                    options={{ headerShown: false }}
                />
                  <Stack.Screen 
                    name="PaymentForm" 
                    component={PaymentForm} 
                    options={{ headerShown: false }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default Nav;


