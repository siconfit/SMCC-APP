import { useEffect, useState } from 'react'
import { Text, StyleSheet, View, Button } from 'react-native'
import { getClients } from '../services/Clients'
import { globalStyle } from '../styles/globalStyle'

const Clients = ({ navigation }) => {
    const [clients, setClients] = useState([])

    useEffect(() => {
        getClients()
            .then(res => {
                setClients(res)
            })
            .catch(err => {
                console.log(err)
            })
    }, [])

    return (
        <View style={globalStyle.container}>
            <Text>Clients</Text>
            {
                clients.length === 0 ?
                    <Text>No hay clientes</Text>
                    :
                    clients.map((client, index) => (
                        <Text key={client.pru_id}>{client.pru_nombre}</Text>
                    ))
            }
            <Button title="Go to Home" onPress={() => navigation.navigate('Home')} />
        </View>
    )
}

export default Clients