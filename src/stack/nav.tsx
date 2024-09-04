import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import Main from '../screens/Main';
import CalendarScreen from '../screens/Calendar';
import Dues from '../screens/Dues';
import Paid from '../screens/Paid';

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
                    options={{ title: 'CalendarScreen' }}
                />
                <Stack.Screen 
                    name="Dues" 
                    component={Dues} 
                    options={{ title: 'Dues' }}
                />
                <Stack.Screen 
                    name="Paid" 
                    component={Paid} 
                    options={{ title: 'Paid' }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default Nav;


