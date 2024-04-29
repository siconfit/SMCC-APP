import { Button, StyleSheet, Text, View } from 'react-native'
import { globalStyle } from '../styles/globalStyle'

const Home = ({ navigation }) => {
    return (
        <View style={globalStyle.container}>
            <Text>Home</Text>
            <Button title='Go to Clients' onPress={() => navigation.navigate('Clients')} />
            <Button title='Go to Payments' onPress={() => navigation.navigate('Payments')} />
        </View>
    )
}

export default Home