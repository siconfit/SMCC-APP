import { View, TextInput } from "react-native"
import { useState } from "react"

import { Card, Text } from "react-native-paper"
import { Formik } from "formik"
import * as Yup from "yup"

import { calcularCredito } from "../services/Payments"
import { globalStyle } from "../styles/globalStyle"

import IrregularHeader from "../components/IrregularHeader"
import PaymentsModal from "../components/PaymentsModal"
import CustomButton from "../components/CustomButton"
import LoadingModal from "../components/LoadingModal"
import CustomAlert from "../components/CustomAlert"

const ValidationSchema = Yup.object().shape({
    valor_total: Yup.number()
        .required('Campo obligatorio'),
    duracion_dias: Yup.number()
        .required('Campo obligatorio'),
    interes: Yup.number()
        .required('Campo obligatorio'),
})

const Calculator = () => {
    const [modalVisible, setModalVisible] = useState(false)
    const [visible, setVisible] = useState(false)
    const [msg, setMsg] = useState([])
    const showDialog = () => setVisible(true)
    const hideDialog = () => setVisible(false)

    return (
        <View style={globalStyle.container}>
            <IrregularHeader title="Calculadora de Crédito" />
            <LoadingModal modalVisible={modalVisible} />
            <PaymentsModal visible={visible} hideModal={hideDialog} title={'Alerta'} msg={msg} />
            <View style={{ flex: 1, paddingTop: 50, width: '90%' }}>
                <Formik
                    initialValues={{ valor_total: "", duracion_dias: "", interes: "" }}
                    onSubmit={(values) => {
                        setModalVisible(true)
                        setTimeout(async () => {
                            const result = await calcularCredito(values)
                            setMsg(result)
                            setModalVisible(false)
                            showDialog()
                        }, 2000)
                    }}
                    validationSchema={ValidationSchema}
                >
                    {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                        <View style={{ paddingHorizontal: 15 }}>
                            <TextInput
                                onChangeText={handleChange("valor_total")}
                                onBlur={handleBlur("valor_total")}
                                value={values.valor_total}
                                placeholder="Valor del credito"
                                keyboardType="numeric"
                                style={globalStyle.customInput}
                            />
                            {errors.valor_total && touched.valor_total ? <Text style={globalStyle.textError}>{errors.valor_total}</Text> : null}
                            <TextInput
                                onChangeText={handleChange("duracion_dias")}
                                onBlur={handleBlur("duracion_dias")}
                                value={values.duracion_dias}
                                placeholder="Duración en días"
                                keyboardType="numeric"
                                style={globalStyle.customInput}
                            />
                            {errors.duracion_dias && touched.duracion_dias ? <Text style={globalStyle.textError}>{errors.duracion_dias}</Text> : null}
                            <TextInput
                                onChangeText={handleChange("interes")}
                                onBlur={handleBlur("interes")}
                                value={values.interes}
                                placeholder="Interes"
                                keyboardType="numeric"
                                style={globalStyle.customInput}
                            />
                            {errors.interes && touched.interes ? <Text style={globalStyle.textError}>{errors.interes}</Text> : null}
                            <CustomButton
                                title={'SIMULAR'}
                                funcion={() => handleSubmit()}
                            />
                        </View>
                    )}
                </Formik>
            </View>
        </View>
    )
}

export default Calculator