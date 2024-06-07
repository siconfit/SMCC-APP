import { useState } from "react"
import { StatusBar } from "expo-status-bar"
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  Pressable,
  ScrollView,
} from "react-native"

const Index = () => {
  const [value, setValue] = useState("")
  const [days, setDays] = useState("")
  const [interes, setInteres] = useState("")
  const [message, setMessage] = useState("No hay datos")


  const myfunction = async () => {
    const fecha = new Date()
    const fecha_aux = fecha
    const valor_cuota = value / days
    const interesAux = interes
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

    var data = {
      fecha_emision: fecha.toLocaleDateString(),
      valor_total: value,
      interes: interesAux,
      num_cuotas_dias: cuotas,
      valor_cuota: valor_cuota.toFixed(2),
      cuota_final_parche: cuota_final,
      valor_ultima_cuota: cuota_aux.toFixed(2),
    }

    var tabla_pagos = ""
    for (let i = 0; i < days; i++) {
      fecha_aux.setDate(fecha_aux.getDate() + 1)
      if (fecha_aux.getDay() != 0) {
        tabla_pagos += fecha_aux.toLocaleDateString() + " - "

        if (cuota_final == true) {
          if (i != days - 1) {
            tabla_pagos += valor_cuota.toFixed(2) + "\n"
          } else {
            tabla_pagos += cuota_aux.toFixed(2)
          }
        } else {
          tabla_pagos += valor_cuota.toFixed(2) + "\n"
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
        style={{ backgroundColor: "white", width: 200, marginVertical: 10 }}
        value={value}
        onChangeText={(e) => setValue(e)}
        keyboardType="numeric"
        placeholder="Ingrese el valor"
      />
      <TextInput
        style={{ backgroundColor: "white", width: 200, marginVertical: 10 }}
        value={days}
        onChangeText={(e) => setDays(e)}
        keyboardType="numeric"
        placeholder="Ingrese los dias"
      />
      <TextInput
        style={{ backgroundColor: "white", width: 200, marginVertical: 10 }}
        value={interes}
        onChangeText={(e) => setInteres(e)}
        keyboardType="numeric"
        placeholder="Ingrese el interes"
      />

      <Pressable onPress={() => myfunction()} style={styles.button}>
        <Text style={styles.text}>CALCULAR</Text>
      </Pressable>

      <ScrollView
        style={{
          backgroundColor: "#80CBC4",
          flexGrow: 0,
          padding: 10,
          borderRadius: 5,
          marginBottom: 10,
        }}
      >
        <Text>{message}</Text>
      </ScrollView>
    </SafeAreaView>
  )
}

export default Index

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E0F2F1",
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    backgroundColor: "#009688",
    padding: 10,
    borderRadius: 5,
    marginVertical: 10,
    elevation: 10,
  },
  text: {
    color: "#EDF2FA",
  },
})
