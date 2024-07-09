import { View, Button, FlatList } from 'react-native'
import { useState, useEffect } from 'react'

import DatePicker from '@react-native-community/datetimepicker'
import { Text, IconButton, Icon } from 'react-native-paper'

import { searchPayments } from '../services/Payments'
import { globalStyle } from '../styles/globalStyle'
import IrregularHeader from '../components/IrregularHeader'
import PaymentCard2 from '../components/PaymentCard2'

const Filter = () => {
    const [payments, setPayments] = useState([])
    const [date, setDate] = useState(new Date())
    const [open, setOpen] = useState(false)

    const onChangeDate = (event, selectedDate) => {
        setOpen(false)
        if (event.type === 'set') {
            setDate(selectedDate)
        }
    }

    const onSearch = async () => {
        const result = await searchPayments(date)
        setPayments(result)
    }

    useEffect(() => {
        onSearch()
    }, [date])

    return (
        <View style={globalStyle.container}>
            <IrregularHeader>
                <View style={{ margin: 15, flexDirection: 'row', width: '80%', justifyContent: 'space-evenly', alignItems: 'center' }}>
                    <Text variant='headlineMedium'>{date.toLocaleDateString()}</Text>
                    <IconButton icon="magnify" mode='contained' size={25} onPress={() => setOpen(true)} />
                </View>
                {
                    open &&
                    <DatePicker
                        mode='date'
                        value={date}
                        onChange={onChangeDate} />
                }
            </IrregularHeader>
            <FlatList
                style={{ width: '100%', paddingHorizontal: 25 }}
                data={payments}
                ItemSeparatorComponent={
                    () => <View style={{ marginVertical: 2 }} />
                }
                ListEmptyComponent={
                    <View style={{ marginTop: 20, alignItems: 'center' }}>
                        <Icon source={'cash-remove'} size={40} />
                        <Text variant='labelSmall'>{payments.message}</Text>
                    </View>
                }
                renderItem={({ item, index }) => (
                    <PaymentCard2 key={item.credito_id} data={item} num_pago={index} />
                )}
            />
        </View>
    )
}

export default Filter