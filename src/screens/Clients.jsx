import { useEffect, useState } from 'react'
import { Text, View, FlatList } from 'react-native'
import { getClients } from '../services/Clients'
import { globalStyle } from '../styles/globalStyle'
import { Button } from 'react-native-elements'

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
            <FlatList
                style={{ width: '100%', padding: 15 }}
                data={clients}
                ItemSeparatorComponent={
                    () => <View style={{ height: 1, backgroundColor: 'black' }} />
                }
                ListEmptyComponent={
                    <Text>No hay clientes</Text>
                }
                renderItem={({ item }) => (
                    <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginVertical: 15 }}>
                        <Text key={item.pru_id}>{item.pru_nombre}</Text>
                        <Button title="Ver" onPress={() => navigation.navigate('Payments', { client: item })} />
                    </View>
                )}
            />
        </View>
    )
}

export default Clients