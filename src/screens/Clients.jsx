import { Text, StyleSheet, View, Button } from 'react-native'
import { globalStyle } from '../styles/globalStyle'

const Clients = ({navigation}) => {
    return (
        <View style={globalStyle.container}>
            <Text>Clients</Text>
            <Button title="Go to Home" onPress={() => navigation.navigate('Home')} />
            <Button title="Go to Payments" onPress={() => navigation.navigate('Payments')} />
        </View>
    )
}

export default Clients