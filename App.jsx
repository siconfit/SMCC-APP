import { useState, useEffect } from "react"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { NavigationContainer } from "@react-navigation/native"
import PrincipalStack from "./src/navigation/PrincipalStack"
import LoginStack from "./src/navigation/LoginStack"
import { MiContexto } from "./src/navigation/AuthContext"
import { PaperProvider } from "react-native-paper"
import { SafeAreaView } from "react-native"
import NoAccess from "./src/screens/NoAccess"
import { subscription } from "./src/services/Users"

const App = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [userToken, setUserToken] = useState("")

  const restoreToken = async () => {
    try {
      const token = await AsyncStorage.getItem("userToken")
      setIsLoading(false)
      setUserToken(JSON.parse(token))
      if (JSON.parse(token)) {
        const id = JSON.parse(token).estado
        const result = await subscription(id)
        if (!result.estado) {
          await AsyncStorage.removeItem("userToken")
          restoreToken()
        }
      } else {
        console.log("no hay token")
      }
    } catch (e) {
      // Restaurando el token falló
    }
  }

  useEffect(() => {
    restoreToken()
  }, [])

  return (
    <MiContexto.Provider value={restoreToken}>
      <PaperProvider>
        <SafeAreaView style={{ flex: 1 }}>
          <NavigationContainer>
            {userToken !== null ?
              <PrincipalStack />
              :
              <LoginStack />
            }
          </NavigationContainer>
        </SafeAreaView>
      </PaperProvider>
    </MiContexto.Provider>
  )
}

export default App
