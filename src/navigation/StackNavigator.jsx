import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { NavigationContainer } from "@react-navigation/native"
import Home from "../screens/Home"
import Clients from "../screens/Clients"
import Payments from "../screens/Payments"

const Stack = createNativeStackNavigator()

export default function StackNavigator() {
    return (
        <NavigationContainer >
            <Stack.Navigator screenOptions={{headerBackTitle: 'ATRAS'}}>
                <Stack.Screen name="Home" component={Home} />
                <Stack.Screen name="Clients" component={Clients} />
                <Stack.Screen name="Payments" component={Payments} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}