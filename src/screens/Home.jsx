import AsyncStorage from '@react-native-async-storage/async-storage'
import { Button, StyleSheet, Text, View } from 'react-native'
import { globalStyle } from '../styles/globalStyle'

const Home = ({ navigation }) => {

    const onLogout = async () => {
        // Aquí puedes manejar la lógica de cierre de sesión
        try {
            await AsyncStorage.removeItem('userToken')
            navigation.getParent().navigate('Login', {screen: 'Login'})
            // const res = navigation.getParent().getState()
            // console.log(res)
        } catch (e) {
            // Eliminando el token falló
        }
    }

    return (
        <View style={globalStyle.container}>
            <Text>Home</Text>
            <Button title='Go to Clients' onPress={() => navigation.navigate('Clients')} />
            <Button title='Cerrar Sesion' onPress={() => onLogout()} />
        </View>
    )
}

export default Home