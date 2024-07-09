import { useState, useEffect } from 'react'
import { Text, View, FlatList } from 'react-native'
import { globalStyle } from '../../styles/globalStyle'

import { getPayments } from '../../services/Payments'

import IrregularHeader from '../../components/IrregularHeader'
import PaymentCard from '../../components/PaymentCard'

const Payments = ({ route }) => {
    const { item } = route.params
    const [paymentsArray, setPayments] = useState([])

    const restorePayments = async () => {
        try {
            // setRefresh(true)
            const result = await getPayments(item.credito_id)
            setPayments(result)
            // setRefresh(false)
        } catch (e) {
            console.log(e)
            // setRefresh(false)
        }
    }

    useEffect(() => {
        restorePayments()
    }, [])

    return (
        <View style={globalStyle.container}>
            <IrregularHeader title={'TABLA DE PAGOS'} />
            <FlatList
                style={{ width: '100%', paddingHorizontal: 15 }}
                data={paymentsArray}
                ItemSeparatorComponent={
                    () => <View style={{ marginVertical: 2 }} />
                }
                renderItem={({ item, index }) => (
                    <PaymentCard key={index} fecha={item.fecha_pago} valor={item.valor_pagado} num_pago={index} />
                )}
            />
        </View>
    )
}

export default Payments