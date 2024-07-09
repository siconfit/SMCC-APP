import { View, Text } from 'react-native'
import { useState, useEffect } from "react"

import { Picker } from '@react-native-picker/picker'
import { getPeriods } from '../services/Credits'

const PeriodPicker = ({ value, setFieldValue }) => {
    const [data, setData] = useState([])

    //funcion const para obtener periodos
    const getPeriodsData = async () => {
        const response = await getPeriods()
        setData(response)
    }

    //useEfect
    useEffect(() => {
        getPeriodsData()
    }, [])

    return (
        <View style={{
            backgroundColor: '#EDF2FA', borderRadius: 25, paddingHorizontal: 20, marginBottom: 10, elevation: 3, marginHorizontal: 10
        }}>
            <Picker
                mode="dropdown"
                numberOfLines={2}
                selectedValue={value}
                onValueChange={(itemValue) => { setFieldValue("periodo", itemValue) }}
            >
                <Picker.Item label="Seleccione el periodo de cobro" value={0} />
                {
                    data.map((item) => (
                        <Picker.Item key={item.periodo_id} label={item.nombre} value={item.periodo_id} />
                    ))
                }
            </Picker>
        </View>
    )
}

export default PeriodPicker