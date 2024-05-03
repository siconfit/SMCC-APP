import { Button, StyleSheet, Text, View } from 'react-native'
import { globalStyle } from '../styles/globalStyle'

const Payments = ({ route, navigation }) => {
    const { client } = route.params
    return (
        <View style={globalStyle.container}>
            <Text>Payments of {client.pru_nombre}</Text>
            {/* <Button title='Go to Home' onPress={() => navigation.navigate('Home')} /> */}
        </View>
    )
}

export default Payments