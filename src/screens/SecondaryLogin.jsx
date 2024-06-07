import { View, Text, TextInput } from "react-native"
import { useState, useContext } from "react"

import AsyncStorage from "@react-native-async-storage/async-storage"
import { Formik } from "formik"
import * as Yup from "yup"

import { MiContexto } from "../navigation/AuthContext"
import { globalStyle } from "../styles/globalStyle"
import { authSecondary } from "../services/Users"

import IrregularHeader from "../components/IrregularHeader"
import CustomButton from "../components/CustomButton"
import CustomAlert from "../components/CustomAlert"
import LoadingModal from "../components/LoadingModal"
import Logo from "../components/Logo"

const SignupSchema = Yup.object().shape({
    usuario: Yup.string()
        .required('Campo obligatorio'),
    contrasena: Yup.string()
        .required('Campo obligatorio')
})

export default function SecondaryLogin({ route, navigation }) {
    const { mainUser } = route.params
    const iniciarSesion = useContext(MiContexto)
    const [modalVisible, setModalVisible] = useState(false)
    const [visible, setVisible] = useState(false)
    const [msg, setMsg] = useState("")
    const showDialog = () => setVisible(true)
    const hideDialog = () => setVisible(false)

    const handleLogin = async (values) => {
        try {
            const result = await authSecondary(values)
            setModalVisible(false)
            if (result.message) {
                setMsg(result.message)
                showDialog()
            } else {
                let user = JSON.stringify(result)
                await AsyncStorage.setItem("userToken", user)
                iniciarSesion()
            }
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <View style={globalStyle.container}>
            <IrregularHeader />
            <LoadingModal modalVisible={modalVisible} />
            <CustomAlert visible={visible} hideDialog={hideDialog} title={'Alerta'} msg={msg} />

            <View style={{ flex: 1, width: '90%', paddingTop: 20 }}>
                <Formik
                    initialValues={{ usuario: "", contrasena: "" }}
                    onSubmit={(values) => {
                        setModalVisible(true)
                        setTimeout(() => {
                            handleLogin(values)
                        }, 2000)
                    }}
                    validationSchema={SignupSchema}
                >
                    {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                        <View style={{ paddingHorizontal: 15 }}>
                            <Logo />
                            <Text style={{ textAlign: 'center', marginBottom: 20 }}>BIENVENIDO {mainUser.nombre_empresa}</Text>
                            <TextInput
                                onChangeText={handleChange("usuario")}
                                onBlur={handleBlur("usuario")}
                                value={values.usuario}
                                placeholder="Usuario"
                                style={globalStyle.customInput}
                            />
                            {errors.usuario && touched.usuario ? <Text style={globalStyle.textError}>{errors.usuario}</Text> : null}
                            <TextInput
                                onChangeText={handleChange("contrasena")}
                                onBlur={handleBlur("contrasena")}
                                value={values.contrasena}
                                placeholder="Contraseña"
                                style={globalStyle.customInput}
                            />
                            {errors.contrasena && touched.contrasena ? <Text style={globalStyle.textError}>{errors.contrasena}</Text> : null}
                            <CustomButton
                                title={'INICIAR SESION'}
                                funcion={() => handleSubmit()}
                            />
                        </View>
                    )}
                </Formik>
            </View>
        </View>
    )
}