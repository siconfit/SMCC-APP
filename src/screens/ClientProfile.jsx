import { View, StyleSheet, FlatList } from 'react-native'
import { Avatar, Text, FAB, Icon } from 'react-native-paper'
import { useEffect, useState } from 'react'

import IrregularHeader from '../components/IrregularHeader'
import CustomAlert from '../components/CustomAlert'
import { globalStyle } from '../styles/globalStyle'
import CreditCard from '../components/CreditCard'
import { getCreditsClient } from '../services/Credits'

// const creditsArray = [{ "credito_id": "66730d446e4d68486575c8d1", "valor_total": "$298.03", "fecha_emision": "2027-01-22", "duracion_dias": 50, "periodo_cobro": "mensual", "interes": 66, "estado": true }, { "credito_id": "66730d44d6dbc6e338c107f0", "valor_total": "$439.30", "fecha_emision": "2029-06-14", "duracion_dias": 29, "periodo_cobro": "quincenal", "interes": 66, "estado": false }, { "credito_id": "66730d44a103eca413b9bf82", "valor_total": "$114.76", "fecha_emision": "2028-02-21", "duracion_dias": 57, "periodo_cobro": "diario", "interes": 41, "estado": false }, { "credito_id": "66730d449111851db9fe9456", "valor_total": "$393.94", "fecha_emision": "2027-12-12", "duracion_dias": 51, "periodo_cobro": "diario", "interes": 54, "estado": true }, { "credito_id": "66730d444b2b3150f0cab026", "valor_total": "$552.21", "fecha_emision": "2024-06-26", "duracion_dias": 42, "periodo_cobro": "diario", "interes": 92, "estado": true }, { "credito_id": "66730d445a88916056982102", "valor_total": "$327.10", "fecha_emision": "2027-10-18", "duracion_dias": 58, "periodo_cobro": "mensual", "interes": 73, "estado": false }]

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