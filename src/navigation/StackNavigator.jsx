import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { NavigationContainer } from "@react-navigation/native"
import Home from "../screens/Home"
import Clients from "../screens/Clients"
import RegisterClient from "../screens/RegisterClient"
import Payments from "../screens/Payments"
import { Text } from "react-native"
import { Icon, Button } from "react-native-elements"

const Stack = createNativeStackNavigator()

export default function StackNavigator() {
    return (
        <NavigationContainer >
            <Stack.Navigator screenOptions={{headerTintColor: '#000', headerStyle: {backgroundColor:'#4FE7AF'}}}>
                <Stack.Screen name="Home" component={Home} />
                <Stack.Screen name="Clients" component={Clients} options={({ navigation, route }) => ({
                    headerRight: () => {
                        return (
                            <>
                                {/* <Icon name="add" type="material" color="black" />
                                <Button title="Nueno Cliente" onPress={() => {
                                    navigation.navigate("RegisterClient")
                                }} /> */}
                                <Button
                                    title="Nuevo Cliente"
                                    icon={<Icon name="add" type="material" color="white" />}
                                    onPress={() => {
                                        navigation.navigate("RegisterClient")
                                    }} 
                                    buttonStyle={{backgroundColor: '#0C81E4'}}
                                    />
                            </>
                        )
                    },
                })} />
                <Stack.Screen name="RegisterClient" component={RegisterClient} />
                <Stack.Screen name="Payments" component={Payments} />
            </Stack.Navigator>
        </NavigationContainer >
    )
}