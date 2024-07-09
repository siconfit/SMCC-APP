import { useEffect, useState, useContext } from "react"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { View, TextInput } from "react-native"
import { Text, Avatar } from 'react-native-paper'
import { globalStyle } from "../styles/globalStyle"
import { MiContexto } from "../navigation/AuthContext"
import CustomButton from "../components/CustomButton"
import IrregularHeader from "../components/IrregularHeader"

export default function Home() {
  const cerrarSesion = useContext(MiContexto)
  const [user, setUser] = useState({})

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
        console.log(JSON.parse(token))
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
      <IrregularHeader>
        <Avatar.Icon size={100} icon={'account'} style={{ backgroundColor: '#009688', marginVertical: 25 }} />
        <Text variant="titleLarge" style={{ color: 'white', fontWeight: 'bold', textAlign: 'center', marginVertical: 25 }} >Bienvenido {user.nombre} </Text>
      </IrregularHeader>
      <View style={{ flex: 1 }}>
        <Text style={globalStyle.customInput}>{user.cedula} </Text>
        <Text style={globalStyle.customInput}>{user.telefono} </Text>
        <Text style={globalStyle.customInput}>{user.rol == 2 ? 'usuario' : 'administrador'} </Text>

        <CustomButton
          title={'Cerrar Sesion'}
          funcion={() => onLogout()}
        />
      </View>

    </View>
  )
}