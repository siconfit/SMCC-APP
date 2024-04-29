import { Button, StyleSheet, Text, View } from 'react-native'
import { globalStyle } from '../styles/globalStyle'

const Payments = ({navigation}) => {
    return (
        <View style={globalStyle.container}>
            <Text>Payments</Text>
            <Button title='Go to Home' onPress={() => navigation.navigate('Home')} />
            <Button title='Go to Clients' onPress={() => navigation.navigate('Clients')} />
        </View>
    )
}

export default Payments