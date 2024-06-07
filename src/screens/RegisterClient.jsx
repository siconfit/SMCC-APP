import { View, Text, TextInput, ScrollView } from "react-native"
import { useEffect, useState } from "react"

import AsyncStorage from "@react-native-async-storage/async-storage"
import { Formik } from "formik"
import * as Yup from "yup"

import { createClient, linkClient } from "../services/Clients"
import { globalStyle } from "../styles/globalStyle"

import IrregularHeader from "../components/IrregularHeader"
import CustomButton from "../components/CustomButton"
import CustomAlert from "../components/CustomAlert"

export default function RegisterClient({ navigation }) {
    const [modalVisible, setModalVisible] = useState(false)
    const [user, setUser] = useState([])

    const validationSchema = Yup.object({
        nombre: Yup.string().required("Campo obligatorio"),
        cedula: Yup.string().min(10).max(10).required("Campo obligatorio"),
        direccion: Yup.string().required("Campo obligatorio"),
        telefono: Yup.string().min(10).max(10).required("Campo obligatorio"),
    })

    const onCretaClient = async (values) => {
        try {
            var msg = ""
            const firstRes = await createClient(values)
            msg += firstRes.message + '\n'
            const data = {
                cliente_id: firstRes.cliente_id,
                cuenta_secundaria_id: user.cuenta_secundaria_id,
            }
            const secondRes = await linkClient(data)
            msg += secondRes.message
            alert(msg, null, 2)
            navigation.goBack()
        } catch (error) { }
    }

    const restoreToken = async () => {
        try {
            const token = await AsyncStorage.getItem("userToken")
            if (token !== null) {
                var data = JSON.parse(token)
                setUser(data)
            }
        } catch (e) {
            console.log(e)
        }
    }

    useEffect(() => {
        restoreToken()
    }, [])

    return (
        <View style={globalStyle.container}>
            <IrregularHeader title={'Registrar clientes'} />
            <View style={{ flex: 1, width: '100%', paddingTop: 20 }}>
                <Formik
                    key={user}
                    initialValues={{
                        cuenta_principal_id: user.cuenta_principal_id,
                        nombre: "",
                        cedula: "",
                        direccion: "",
                        telefono: "",
                    }}
                    onSubmit={(values) => {
                        // onCretaClient({ ...values, cuenta_principal_id: Number(values.cuenta_principal_id) })
                        setModalVisible(true)
                        setTimeout(() => {
                            onCretaClient(values)
                        }, 2000)
                    }}
                    validationSchema={validationSchema}
                >
                    {({
                        handleChange,
                        handleBlur,
                        handleSubmit,
                        values,
                        errors,
                        touched,
                    }) => (
                        <ScrollView style={{ paddingHorizontal: 15 }} showsVerticalScrollIndicator={false}>
                            <Text>{values.cuenta_principal_id}</Text>
                            <TextInput
                                onChangeText={handleChange("nombre")}
                                onBlur={handleBlur("nombre")}
                                value={values.nombre}
                                placeholder="Nombre del cliente"
                                style={globalStyle.customInput}
                            />
                            {errors.nombre && touched.nombre ? (
                                <Text style={globalStyle.textError}>{errors.nombre}</Text>
                            ) : null}
                            <TextInput
                                onChangeText={handleChange("cedula")}
                                onBlur={handleBlur("cedula")}
                                value={values.cedula}
                                placeholder="Num. de cédula"
                                keyboardType="numeric"
                                style={globalStyle.customInput}
                            />
                            {errors.cedula && touched.cedula ? (
                                <Text style={globalStyle.textError}>{errors.cedula}</Text>
                            ) : null}
                            <TextInput
                                onChangeText={handleChange("direccion")}
                                onBlur={handleBlur("direccion")}
                                value={values.direccion}
                                placeholder="Dirección del cliente"
                                style={globalStyle.customInput}
                            />
                            {errors.direccion && touched.direccion ? (
                                <Text style={globalStyle.textError}>{errors.direccion}</Text>
                            ) : null}
                            <TextInput
                                onChangeText={handleChange("telefono")}
                                onBlur={handleBlur("telefono")}
                                value={values.telefono}
                                placeholder="Teléfono del cliente"
                                keyboardType="numeric"
                                style={globalStyle.customInput}
                            />
                            {errors.telefono && touched.telefono ? (
                                <Text style={globalStyle.textError}>{errors.telefono}</Text>
                            ) : null}
                            <CustomButton title={"REGISTRAR"} funcion={() => handleSubmit()} />
                        </ScrollView>
                    )}
                </Formik>
            </View>
        </View>
    )
}