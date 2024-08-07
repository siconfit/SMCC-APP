import { View, TextInput, ScrollView } from "react-native"
import { useState } from "react"

import { Text } from "react-native-paper"
import { Formik } from "formik"
import * as Yup from "yup"

import { calcularCredito } from "../services/Credits"
import { globalStyle } from "../styles/globalStyle"

import IrregularHeader from "../components/IrregularHeader"
import PaymentsModal from "../components/PaymentsModal"
import PeriodPicker from "../components/PeriodPicker"
import CustomButton from "../components/CustomButton"
import LoadingModal from "../components/LoadingModal"
import CustomAlert from "../components/CustomAlert"

const ValidationSchema = Yup.object().shape({
    valor_inicial: Yup.number()
        .required('Campo obligatorio'),
    duracion: Yup.number()
        .required('Campo obligatorio'),
    interes: Yup.number()
        .required('Ingrese un valor de 0 a 100')
        .min(0, 'Valor minimo 0')
        .max(100, 'Valor maximo 100'),
    periodo: Yup.number()
        .min(1, 'Campo obligatorio')
})

const Calculator = () => {
    const [modalVisible, setModalVisible] = useState(false)
    const [visible, setVisible] = useState(false)
    const [data, setData] = useState([])
    const showDialog = () => setVisible(true)
    const hideDialog = () => setVisible(false)

    return (
        <View style={globalStyle.containerScroll}>
            <IrregularHeader title="Calculadora de Crédito" />
            <LoadingModal modalVisible={modalVisible} />
            <PaymentsModal visible={visible} hideModal={hideDialog} paymentsArray={data} />
            <ScrollView >
                <Formik
                    initialValues={{ valor_inicial: "", duracion: "", interes: "", periodo: 0 }}
                    onSubmit={(values) => {
                        setModalVisible(true)
                        setTimeout(async () => {
                            const result = await calcularCredito(values)
                            setData(result.lista_pagos)
                            setModalVisible(false)
                            showDialog()
                        }, 2000)
                    }}
                    validationSchema={ValidationSchema}
                >
                    {({ handleChange, handleBlur, handleSubmit, setFieldValue, values, errors, touched }) => (
                        <View style={{ padding: 25 }}>
                            <TextInput
                                onChangeText={handleChange("valor_inicial")}
                                onBlur={handleBlur("valor_inicial")}
                                value={values.valor_inicial}
                                placeholder="Valor del credito"
                                keyboardType="numeric"
                                style={globalStyle.customInput}
                            />
                            {errors.valor_inicial && touched.valor_inicial ? <Text style={globalStyle.textError}>{errors.valor_inicial}</Text> : null}
                            <TextInput
                                onChangeText={handleChange("duracion")}
                                onBlur={handleBlur("duracion")}
                                value={values.duracion}
                                placeholder="Número de cuotas"
                                keyboardType="numeric"
                                style={globalStyle.customInput}
                            />
                            {errors.duracion && touched.duracion ? <Text style={globalStyle.textError}>{errors.duracion}</Text> : null}
                            <TextInput
                                onChangeText={handleChange("interes")}
                                onBlur={handleBlur("interes")}
                                value={values.interes}
                                placeholder="Interes 0 - 100"
                                keyboardType="numeric"
                                style={globalStyle.customInput}
                            />
                            {errors.interes && touched.interes ? <Text style={globalStyle.textError}>{errors.interes}</Text> : null}
                            <PeriodPicker
                                value={values.periodo}
                                setFieldValue={setFieldValue} />
                            {errors.periodo && touched.periodo ? <Text style={globalStyle.textError}>{errors.periodo}</Text> : null}

                            <CustomButton
                                title={'SIMULAR'}
                                funcion={() => handleSubmit()}
                            />
                        </View>
                    )}
                </Formik>
            </ScrollView>
        </View>
    )
}

export default Calculator