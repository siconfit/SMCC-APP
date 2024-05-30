import AsyncStorage from '@react-native-async-storage/async-storage'
import { useEffect, useState } from 'react'
import { Text, View, FlatList } from 'react-native'
import { getMyClients } from '../services/Clients'
import { globalStyle } from '../styles/globalStyle'
import { Button } from 'react-native-elements'

const Clients = ({ navigation }) => {
    const [clients, setClients] = useState([])

    const restoreToken = async () => {
        try {
            const token = await AsyncStorage.getItem('userToken')
            if (token !== null) {
                const { usuario_id } = JSON.parse(token)
                const result = await getMyClients(usuario_id)
                setClients(result)
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
            <FlatList
                style={{ width: '100%', padding: 15 }}
                data={clients}
                ItemSeparatorComponent={
                    () => <View style={{ height: 1, backgroundColor: 'black' }} />
                }
                ListEmptyComponent={
                    <Text>No hay clientes para mostrar</Text>
                }
                renderItem={({ item, index }) => (
                    <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', marginVertical: 15 }}>
                        <View>
                            <Text key={'txtName' + index}>{item.cuenta_secundaria_id}</Text>
                            <Text key={'txtPhone' + index}>{item.cliente_id}</Text>
                        </View>
                        <Button title="Ver" onPress={() => navigation.navigate('Payments', { client: item })} />
                    </View>
                )}
            />
        </View>
    )
}

export default Clients