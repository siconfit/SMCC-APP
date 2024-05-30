import { createNativeStackNavigator } from "@react-navigation/native-stack"
import Home from "../screens/Home"
import Clients from "../screens/Clients"
import RegisterClient from "../screens/RegisterClient"
import Payments from "../screens/Payments"
import { Icon, Button } from "react-native-elements"

const Stack = createNativeStackNavigator()

export default function ClientStacks(props) {
    return (
        <Stack.Navigator initialRouteName="Home" screenOptions={{ headerTintColor: '#000', headerStyle: { backgroundColor: '#4FE7AF' } }}>
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="Clients" component={Clients} options={({ navigation }) => ({
                headerRight: () => {
                    return (
                        <>
                            <Button
                                title="Nuevo Cliente"
                                icon={<Icon name="add" type="material" color="white" />}
                                onPress={() => {
                                    navigation.navigate("RegisterClient")
                                }}
                                buttonStyle={{ backgroundColor: '#009688' }}
                            />
                        </>
                    )
                },
            })} />
            <Stack.Screen name="RegisterClient" component={RegisterClient} />
            <Stack.Screen name="Payments" component={Payments} options={{ presentation: 'modal' }} />
        </Stack.Navigator>
    )
}