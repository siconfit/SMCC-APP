import { useEffect, useState, useContext } from "react"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { Button, Text, View } from "react-native"
import { globalStyle } from "../styles/globalStyle"
import { MiContexto } from "../navigation/AuthContext"
import CustomButton from "../components/CustomButton"

const Home = ({ route, navigation }) => {
  const cerrarSesion = useContext(MiContexto)
  const [user, setUser] = useState("")

  const onLogout = async () => {
    try {
      await AsyncStorage.removeItem("userToken")
      cerrarSesion()
    } catch (e) {
      // Eliminando el token falló
    }
  };

  const restoreToken = async () => {
    try {
      const token = await AsyncStorage.getItem("userToken")
      if (token !== null) {
        setUser(JSON.parse(token))
        // console.log(JSON.parse(token))
      }
    } catch (e) {
      console.log(e)
    }
  };

  useEffect(() => {
    restoreToken()
  }, [])

  return (
    <View style={globalStyle.container}>
      <Text>Bienvenido {user.nombre} </Text>
      <CustomButton
        title={'goto clients'}
        funcion={() => navigation.navigate("Clients")}
      />
      <CustomButton
        title={'Cerrar Sesion'}
        funcion={() => onLogout()}
      />
      {/* <Button
        color={'#009688'}
        title="Go to Clients"
        onPress={() => navigation.navigate("Clients")}
      />
      <Button color={'#009688'} title="Cerrar Sesion" onPress={() => onLogout()} /> */}
    </View>
  )
}

export default Home
