import AsyncStorage from '@react-native-async-storage/async-storage'
import { useEffect, useState } from 'react'
import { Text, View, FlatList } from 'react-native'
import { getMyClients } from '../services/Clients'
import { globalStyle } from '../styles/globalStyle'
import ClientCard from '../components/ClientCard'
import IrregularHeader from '../components/IrregularHeader'
import { Icon } from "react-native-elements"

const Clients = ({ navigation }) => {
    const [clients, setClients] = useState([])
    const [refresh, setRefresh] = useState(false)

    const restoreToken = async () => {
        try {
            setRefresh(true)
            const token = await AsyncStorage.getItem('userToken')
            if (token !== null) {
                const { cuenta_secundaria_id } = JSON.parse(token)
                const result = await getMyClients(cuenta_secundaria_id)
                setClients(result)
            }
            setRefresh(false)
        } catch (e) {
            console.log(e)
        }
    }

    useEffect(() => {
        restoreToken()
    }, [])

    return (
        <View style={globalStyle.container}>
            <IrregularHeader title={'Clientes'}>
                <View style={{
                    position: 'absolute',
                    bottom: -60,
                    right: 40,
                }}>
                    <Icon name="add" type="material" color={'#009688'} reverse onPress={() => navigation.navigate('RegisterClient')} />
                </View>
            </IrregularHeader>
            <FlatList
                style={{ width: '100%', paddingHorizontal: 15 }}
                data={clients}
                ItemSeparatorComponent={
                    () => <View style={{ marginVertical: 2 }} />
                }
                ListEmptyComponent={
                    <Text>No hay clientes para mostrar</Text>
                }
                renderItem={({ item, index }) => (
                    <ClientCard key={index} nombre={item.nombre} cedula={item.cedula} />
                )}
                onRefresh={() => restoreToken()}
                refreshing={refresh}
            />
        </View>
    )
}

export default Clients