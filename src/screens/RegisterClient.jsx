import { View, Text, TextInput } from 'react-native'
import { globalStyle } from '../styles/globalStyle'
import { useState } from 'react'

const RegisterClient = () => {
    const [name, setName] = useState('')

    return (
        <View style={globalStyle.container}>
            <Text>RegisterClient</Text>
            <TextInput
                placeholder='Nombre de prueba'
                value={name}
                onChangeText={(e) => setName(e)}
                style={{borderBottomWidth: 2, borderBottomColor: '#0C4E8C', paddingHorizontal: 10}}
            />
        </View>
    )
}

export default RegisterClient