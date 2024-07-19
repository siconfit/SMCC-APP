import { View, StyleSheet, FlatList } from 'react-native'
import { Avatar, Text, FAB, Icon } from 'react-native-paper'
import { useEffect, useState } from 'react'

import IrregularHeader from '../components/IrregularHeader'
import CustomAlert from '../components/CustomAlert'
import { globalStyle } from '../styles/globalStyle'
import CreditCard from '../components/CreditCard'
import { getCreditsClient } from '../services/Credits'

export default function ClientProfile({ route, navigation }) {
    const { data } = route.params
    const [credits, setCredits] = useState([])
    const [refresh, setRefresh] = useState(false)
    const [visible, setVisible] = useState(false)
    const [msg, setMsg] = useState("")
    const showDialog = () => setVisible(true)
    const hideDialog = () => setVisible(false)

    const getCredits = async () => {
        try {
            setRefresh(true)
            const result = await getCreditsClient(data.cliente_id)
            setCredits(result)
            setRefresh(false)
        } catch (e) {
            console.log(e)
            setRefresh(false)
        }
    }

    const setMessage = (value) => {
        setMsg(value)
        showDialog()
        getCredits()
    }

    useEffect(() => {
        getCredits()
    }, [])

    return (
        <View style={globalStyle.container}>
            <IrregularHeader>
                <View style={{ flexDirection: 'row', width: '100%' }}>
                    <View style={{ height: 'auto', width: 'auto', justifyContent: 'center', alignItems: 'center', padding: 10 }}>
                        <Avatar.Icon size={100} icon="card-account-details" color='#e0f2f1' style={{ backgroundColor: '#009688' }} />
                    </View>
                    <View style={{ height: 'auto', width: '100%', justifyContent: 'center', paddingLeft: 20 }}>
                        <Text variant={'headlineMedium'} style={{ color: '#e0f2f1', fontWeight: 'bold' }}>{data.nombre}</Text>
                        <Text variant={'headlineSmall'} style={{ color: '#e0f2f1' }}>{data.cedula}</Text>
                    </View>
                </View>
            </IrregularHeader>
            <CustomAlert visible={visible} hideDialog={hideDialog} title={'Registro de cliente'} msg={msg} />

            <Text variant='labelSmall'>Deslice hacia abajo para actualizar</Text>

            <FlatList
                style={{ width: '100%', paddingHorizontal: '20%' }}
                data={credits}
                ListEmptyComponent={
                    <View style={{ marginTop: 20, alignItems: 'center' }}>
                        <Icon source={'credit-card-remove'} size={40} />
                        <Text variant='labelSmall'>{credits.message}</Text>
                    </View>
                }
                renderItem={({ item, index }) => (
                    <CreditCard key={item.credito_id} item={item} navigation={navigation} />
                )}
                onRefresh={() => getCredits()}
                refreshing={refresh}
            />

            <FAB
                icon="credit-card-plus"
                style={styles.fab}
                color='#009688'
                variant='surface'
                onPress={() => navigation.navigate('RegisterCredit', { data, setMessage })} />
        </View>
    )
}

const styles = StyleSheet.create({
    fab: {
        position: 'absolute',
        margin: 16,
        right: 0,
        bottom: 0,
    }
})