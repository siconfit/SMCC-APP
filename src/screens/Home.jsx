import { useEffect, useState, useContext } from "react"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { Text, View, TextInput } from "react-native"
import { globalStyle } from "../styles/globalStyle"
import { MiContexto } from "../navigation/AuthContext"
import CustomButton from "../components/CustomButton"
import IrregularHeader from "../components/IrregularHeader"

export default function Home() {
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
  }


  useEffect(() => {
    restoreToken()
  }, [])

  return (
    <View style={globalStyle.container}>
      <IrregularHeader title={'Inicio'} />
      <View style={{ flex: 1, justifyContent: 'center' }}>

        <Text>Bienvenido {user.nombre} </Text>
        <CustomButton
          title={'Cerrar Sesion'}
          funcion={() => onLogout()}
        />
      </View>

    </View>
  )
}