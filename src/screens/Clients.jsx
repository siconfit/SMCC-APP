import AsyncStorage from '@react-native-async-storage/async-storage'
import { useEffect, useState } from 'react'
import { View, FlatList } from 'react-native'
import { IconButton, Text, Icon } from 'react-native-paper'

import { getMyClients } from '../services/Clients'
import { globalStyle } from '../styles/globalStyle'
import ClientCard from '../components/ClientCard'
import IrregularHeader from '../components/IrregularHeader'
import CustomAlert from '../components/CustomAlert'

const Clients = ({ navigation }) => {
    const [clients, setClients] = useState([])
    const [refresh, setRefresh] = useState(false)
    const [visible, setVisible] = useState(false)
    const [msg, setMsg] = useState("")
    const showDialog = () => setVisible(true)
    const hideDialog = () => setVisible(false)

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
            setRefresh(false)
        }
    }

    const setMessage = (value) => {
        setMsg(value)
        showDialog()
        restoreToken()
    }

    useEffect(() => {
        restoreToken()
    }, [])

    return (
        <View style={globalStyle.container}>
            <IrregularHeader title={'Clientes'}>
                <View style={{ position: 'absolute', bottom: -60, right: 40 }}>
                    <IconButton
                        icon="account-plus"
                        iconColor={'#009688'}
                        mode='contained'
                        size={30}
                        onPress={() => navigation.navigate('RegisterClient', { setMessage })} />
                </View>
            </IrregularHeader>
            <CustomAlert visible={visible} hideDialog={hideDialog} title={'Registro de cliente'} msg={msg} />
            <Text variant='labelSmall'>Deslice hacia abajo para actualizar</Text>
            <FlatList
                style={{ width: '100%', paddingHorizontal: 25 }}
                data={clients}
                ItemSeparatorComponent={
                    () => <View style={{ marginVertical: 2 }} />
                }
                ListEmptyComponent={
                    <View style={{ marginTop: 20, alignItems: 'center' }}>
                        <Icon source={'account-remove'} size={40} />
                        <Text variant='labelSmall'>{clients.message}</Text>
                    </View>
                }
                renderItem={({ item, index }) => (
                    <ClientCard key={index} data={item} navigation={navigation} />
                )}
                onRefresh={() => restoreToken()}
                refreshing={refresh}
            />
        </View>
    )
}

export default Clients