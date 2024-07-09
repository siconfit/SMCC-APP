import { View, TextInput, ScrollView } from "react-native"
import { useState } from "react"

import { Text, Portal, Dialog, Button } from "react-native-paper"
import { Formik } from "formik"
import * as Yup from "yup"

import { calcularCredito, createCredit } from "../../services/Credits"
import { globalStyle } from "../../styles/globalStyle"

import IrregularHeader from "../../components/IrregularHeader"
import PeriodPicker from "../../components/PeriodPicker"
import CustomButton from "../../components/CustomButton"
import LoadingModal from "../../components/LoadingModal"

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

const RegisterCredit = ({ route, navigation }) => {
    const { data, setMessage } = route.params
    const [modalVisible, setModalVisible] = useState(false)
    const [visible, setVisible] = useState(false)
    const [creditData, setCreditData] = useState([])
    const [cuotas, setCuotas] = useState([])
    const showDialog = () => setVisible(true)
    const hideDialog = () => setVisible(false)

    const confirmCredit = async () => {
        const response = await createCredit(creditData)
        setMessage(response.message)
    }

    return (
        <View style={globalStyle.containerScroll}>
            <IrregularHeader title="Registar Crédito" />
            <LoadingModal modalVisible={modalVisible} />
            <Portal>
                <Dialog visible={visible} onDismiss={hideDialog}>
                    <Dialog.Title>¿Seguro que quiere registrar el crédito?</Dialog.Title>
                    <Dialog.Content>
                        <Text variant="bodyMedium">
                            Credito de {creditData.valor_total}$ con un interes de {creditData.interes}%,{
                                creditData.cuota_final ?
                                    ` a pagar en ${creditData.numero_cuotas - 1} cuotas de ${creditData.valor_cuota}$ y una cuota final de ${creditData.cuota_aux}$`
                                    :
                                    ` a pagar en ${creditData.numero_cuotas} cuotas de ${creditData.valor_cuota}$`
                            }
                        </Text>
                    </Dialog.Content>
                    <Dialog.Actions>
                        <Button onPress={() => {
                            confirmCredit()
                            navigation.goBack()
                        }}>Si</Button>
                        <Button onPress={hideDialog}>No</Button>
                    </Dialog.Actions>
                </Dialog>
            </Portal>
            <Text variant="labelSmall" style={{ textAlign: 'center' }}>Asegurarse de ingresar correctamente los datos</Text>
            <ScrollView >
                <Formik
                    initialValues={{ cliente_id: data.cliente_id, valor_inicial: "", duracion: "", interes: "", periodo: 0 }}
                    onSubmit={(values) => {
                        setModalVisible(true)
                        setTimeout(async () => {
                            const result = await calcularCredito(values)
                            setCreditData(result.data)
                            setCuotas(result.lista_pagos)
                            setModalVisible(false)
                            showDialog()
                        }, 2000)
                    }}
                    validationSchema={ValidationSchema}>
                    {({ handleChange, handleBlur, handleSubmit, setFieldValue, values, errors, touched }) => (
                        <View style={{ padding: 25 }}>
                            <Text>{values.cliente_id}</Text>
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
                                title={'REGISTRAR'}
                                funcion={() => handleSubmit()}
                            />
                        </View>
                    )}
                </Formik>
            </ScrollView>
        </View>
    )
}

export default RegisterCredit