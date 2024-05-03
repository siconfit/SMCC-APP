import { useState, useEffect } from 'react'
import AsyncStorage from "@react-native-async-storage/async-storage"
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Index from "./src/Index"
import ClientStack from "./src/navigation/ClientStack"
import Login from "./src/screens/Login"

const App = () => {

  const [isLoading, setIsLoading] = useState(true);
  const [userToken, setUserToken] = useState(null);

  const restoreToken = async () => {
    let token;
    try {
      token = await AsyncStorage.getItem('userToken');
    } catch (e) {
      // Restaurando el token falló
    }
    setIsLoading(false);
    setUserToken(token);
  };

  useEffect(() => {
    restoreToken();
  }, []);

  // if (isLoading) {
  //   // Puedes mostrar un splash screen
  //   return null;
  // }

  const Stack = createNativeStackNavigator()

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={userToken === null ? 'Login' : 'ClientStack'}>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="ClientStack" component={ClientStack} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
    // <Index/>
  )
}

export default App