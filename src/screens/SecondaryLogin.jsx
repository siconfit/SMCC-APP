import { useState, useContext } from "react"
import { MiContexto } from "../navigation/AuthContext"
import { View, Text, TextInput, Button, Image } from "react-native"
import CustomButton from "../components/CustomButton"
import { globalStyle } from "../styles/globalStyle"
import { authSecondary } from "../services/Users"
import CustomModal from "../components/CustomModal"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { Formik } from "formik"
import * as Yup from "yup"

const SignupSchema = Yup.object().shape({
    usuario: Yup.string()
        .required('Campo obligatorio'),
    contrasena: Yup.string()
        .required('Campo obligatorio')
})

export default function SecondaryLogin({ route }) {
    const { mainUser } = route.params
    const iniciarSesion = useContext(MiContexto)
    const [modalVisible, setModalVisible] = useState(false)

    const handleLogin = async (values) => {
        try {
            const result = await authSecondary(values)
            setModalVisible(false)
            if (result.message) {
                alert(result.message, null, 2)
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
            <CustomModal
                modalVisible={modalVisible}
                setModalVisible={setModalVisible}
            />
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
                    <View style={{ width: "90%", paddingHorizontal: 15 }}>
                        <Image
                            style={{
                                width: '100%',
                                height: 100,
                                alignSelf: 'center',
                                resizeMode: 'stretch',
                                marginBottom: 20
                            }}
                            source={
                                require('../assets/logoSICONFIT.png')
                            }
                        />
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
    )
}
