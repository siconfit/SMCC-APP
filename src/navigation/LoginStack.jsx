import { createNativeStackNavigator } from "@react-navigation/native-stack"
import MainLogin from "../screens/MainLogin"
import SecondaryLogin from "../screens/SecondaryLogin"

const Stack = createNativeStackNavigator()

export default function LoginStack() {
  return (
    <Stack.Navigator initialRouteName="Login" screenOptions={{ headerTintColor: '#000', headerStyle: { backgroundColor: '#4FE7AF' } }}>
      <Stack.Screen name="MainLogin" component={MainLogin} options={{ headerTitle: 'Autorización principal' }} />
      <Stack.Screen name="SecondaryLogin" component={SecondaryLogin} options={{ headerTitle: 'Autorización secundaria' }} />
    </Stack.Navigator>
  )
}
