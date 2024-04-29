import { useState, useEffect } from 'react'
import { StatusBar } from 'expo-status-bar'
import { SafeAreaView, StyleSheet, Text, TextInput, Pressable, FlatList, View, ScrollView } from 'react-native'

const Index = () => {

    const [value, setValue] = useState('')
    const [days, setDays] = useState('')
    const [pruebas, setPruebas] = useState([])
    const [message, setMessage] = useState('No hay datos')

    useEffect(() => {
        getPruebas()
    }, [])

    const getPruebas = async () => {
        try {
            await fetch('http://192.168.1.9:3000/pruebas')
                .then(response => response.json())
                .then(json =>
                    // alert(JSON.stringify(json), null, 2)
                    setPruebas(json)
                )
        } catch (error) {

        }
    }

    const myfunction = async () => {
        const fecha = new Date()
        const fecha_aux = fecha
        const valor_cuota = value / days
        const res = value % days
        var cuota_aux = 0
        var cuotas = days
        var cuota_final = false

        if (res != 0) {
            const valor_aux = valor_cuota.toFixed(2) * days
            const res_aux = valor_aux.toFixed(2) - value
            cuota_aux = valor_cuota.toFixed(2) - res_aux.toFixed(2)
            cuotas--
            cuota_final = true
        }

        const data = {
            fecha_emision: fecha.toLocaleDateString(),
            valor_total: value,
            num_cuotas_dias: cuotas,
            valor_cuota: valor_cuota.toFixed(2),
            cuota_final_parche: cuota_final,
            valor_ultima_cuota: cuota_aux.toFixed(2)
        }

        var tabla_pagos = ""
        for (let i = 0; i < days; i++) {
            fecha_aux.setDate(fecha_aux.getDate() + 1)
            if (fecha_aux.getDay() != 0) {
                tabla_pagos += fecha_aux.toLocaleDateString() + " - "

                if (cuota_final == true) {
                    if (i != days - 1) {
                        tabla_pagos += valor_cuota.toFixed(2) + '\n'
                    } else {
                        tabla_pagos += cuota_aux.toFixed(2)
                    }
                } else {
                    tabla_pagos += valor_cuota.toFixed(2) + '\n'
                }
            } else {
                i--
            }
        }

        setMessage(tabla_pagos)
        alert(JSON.stringify(data, null, 2))
    }

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar style="auto" hidden={true} />
            <Text>CALCULADORA DE PAGOS</Text>
            <TextInput
                style={{ backgroundColor: 'white', width: 200, marginVertical: 10 }}
                value={value}
                onChangeText={(e) => setValue(e)}
                keyboardType='numeric'
                placeholder='Ingrese el valor'
            />
            <TextInput
                style={{ backgroundColor: 'white', width: 200, marginVertical: 10 }}
                value={days}
                onChangeText={(e) => setDays(e)}
                keyboardType='numeric'
                placeholder='Ingrese los dias'
            />

            <Pressable onPress={() => myfunction()} style={styles.button} >
                <Text style={styles.text}>CALCULAR</Text>
            </Pressable>

            {/* <FlatList
        style={{ backgroundColor: '#80CBC4', flexGrow: 0, padding: 10, borderRadius: 5, marginBottom: 10 }}
        data={pruebas}
        initialNumToRender={2}
        ListEmptyComponent={(
          <Text>No hay datos</Text>
        )}
        renderItem={({ item }) =>
          <Text>{item.pru_nombre}</Text>} /> */}

            <ScrollView style={{ backgroundColor: '#80CBC4', flexGrow: 0, padding: 10, borderRadius: 5, marginBottom: 10 }}>
                <Text>
                    {message}
                </Text>
            </ScrollView>

        </SafeAreaView>
    )
}

export default Index

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#E0F2F1',
        alignItems: 'center',
        justifyContent: 'center',
    },
    button: {
        backgroundColor: '#009688',
        padding: 10,
        borderRadius: 5,
        marginVertical: 10,
        elevation: 10,
    },
    text: {
        color: '#EDF2FA'
    }
})
