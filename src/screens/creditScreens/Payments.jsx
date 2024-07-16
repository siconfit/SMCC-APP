import { useState, useEffect } from 'react'
import { Text, View, FlatList } from 'react-native'
import { globalStyle } from '../../styles/globalStyle'

import { getPayments, confirmPayments, postponePayments } from '../../services/Payments'

import IrregularHeader from '../../components/IrregularHeader'
import PaymentCard from '../../components/PaymentCard'
import CustomAlert from '../../components/CustomAlert'

const Payments = ({ route }) => {
    const { item } = route.params
    const [paymentsArray, setPayments] = useState([])
    const [alertVisible, setAlertVisible] = useState(false)
    const [msg, setMsg] = useState("")
    const showDialog = () => setAlertVisible(true)
    const hideDialog = () => setAlertVisible(false)

    const restorePayments = async () => {
        try {
            const result = await getPayments(item.credito_id)
            setPayments(result)
        } catch (e) {
            console.log(e)
        }
    }

    const confirm = async (id) => {
        try {
            const result = await confirmPayments(id)
            setMsg(result.message)
            showDialog()
            restorePayments()
        } catch (e) {
            console.log(e)
        }
    }

    const postpone = async (id, creditoID, valorPagado) => {
        try {
            const result = await postponePayments(id, creditoID, valorPagado)
            setMsg(result.message)
            showDialog()
            restorePayments()
        } catch (e) {
            console.log(e)
        }
    }

    useEffect(() => {
        restorePayments()
    }, [])

    return (
        <View style={globalStyle.container}>
            <IrregularHeader title={'TABLA DE PAGOS'} />
            <CustomAlert title={'Edicion de pago'} msg={msg} visible={alertVisible} hideDialog={hideDialog} />
            <FlatList
                style={{ width: '100%', paddingHorizontal: 15 }}
                data={paymentsArray}
                ItemSeparatorComponent={
                    () => <View style={{ marginVertical: 2 }} />
                }
                renderItem={({ item, index }) => (
                    <PaymentCard key={index} data={item} num_pago={index} pagar={confirm} aplazar={postpone} />
                )}
            />
        </View>
    )
}

export default Payments