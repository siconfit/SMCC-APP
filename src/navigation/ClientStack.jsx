import { createMaterialBottomTabNavigator } from "react-native-paper/react-navigation"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import Home from "../screens/Home"
import Clients from "../screens/Clients"
import Calculator from "../screens/Calculator"
import RegisterClient from "../screens/RegisterClient"
import { Icon } from "react-native-elements"

const Tab = createMaterialBottomTabNavigator()
const Stack = createNativeStackNavigator()

const Clientes = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Clients" component={Clients} />
            <Stack.Screen name="RegisterClient" component={RegisterClient} />
        </Stack.Navigator>
    )
}

export default function ClientStacks(props) {
    return (
        <Tab.Navigator initialRouteName="Home" shifting compact activeColor="#009688" inactiveColor="#fff" barStyle={{ backgroundColor: "#4FE7AF" }} screenOptions={{ headerShown: false }}>
            <Tab.Screen name="Home" component={Home} options={{
                tabBarLabel: 'Inicio',
                tabBarIcon: ({ color }) => {
                    return <Icon name="home" type="material" color={color} />
                },
            }} />
            <Tab.Screen name="Clientes" component={Clientes}
                options={{
                    tabBarLabel: 'Clientes',
                    tabBarIcon: ({ color }) => {
                        return <Icon name="group" type="material" color={color} />
                    },
                }}
            />
            <Tab.Screen name="Calculator" component={Calculator} options={{
                tabBarLabel: 'Calculadora',
                tabBarIcon: ({ color }) => {
                    return <Icon name="calculate" type="material" color={color} />
                },
            }} />
        </Tab.Navigator>
    )
}