import { useState, useEffect } from "react"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { NavigationContainer } from "@react-navigation/native"
import ClientStack from "./src/navigation/ClientStack"
import LoginStack from "./src/navigation/LoginStack"
import { MiContexto } from "./src/navigation/AuthContext"
import Index from "./src/Index"

const App = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [userToken, setUserToken] = useState("")

  const restoreToken = async () => {
    try {
      const token = await AsyncStorage.getItem("userToken")
      setIsLoading(false)
      setUserToken(token)
    } catch (e) {
      // Restaurando el token falló
    }
  }

  useEffect(() => {
    restoreToken()
  }, [])

  return (
    <MiContexto.Provider value={restoreToken}>
      <NavigationContainer>
        {userToken !== null ? (
          <ClientStack />
        ) : (
          <LoginStack />
        )}
      </NavigationContainer>
    </MiContexto.Provider>
    // <Index />
  );
};

export default App
