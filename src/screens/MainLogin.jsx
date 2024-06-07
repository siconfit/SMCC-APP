import { View, Text, TextInput } from "react-native"
import { useState } from "react"

import { Formik } from "formik"
import * as Yup from "yup"

import { globalStyle } from "../styles/globalStyle"
import { authUser } from "../services/Users"

import IrregularHeader from "../components/IrregularHeader"
import CustomButton from "../components/CustomButton"
import CustomAlert from "../components/CustomAlert"
import LoadingModal from "../components/LoadingModal"
import Logo from "../components/Logo"

const SignupSchema = Yup.object().shape({
  usuario: Yup.string()
    .required('Campo obligatorio'),
})

export default function MainLogin({ navigation }) {
  const [modalVisible, setModalVisible] = useState(false)
  const [visible, setVisible] = useState(false)
  const [msg, setMsg] = useState("")
  const showDialog = () => setVisible(true)
  const hideDialog = () => setVisible(false)

  const handleLogin = async (values) => {
    try {
      const result = await authUser(values)
      setModalVisible(false)
      if (result.message) {
        setMsg(result.message)
        showDialog()
      } else {
        navigation.navigate('SecondaryLogin', {
          mainUser: result
        })
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
      <View style={{ flex: 1, width: '90%', paddingTop: 80 }}>
        <Formik
          initialValues={{ usuario: "" }}
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
              <TextInput
                onChangeText={handleChange("usuario")}
                onBlur={handleBlur("usuario")}
                value={values.usuario}
                placeholder="Usuario de ingreso"
                style={globalStyle.customInput}
              />
              {errors.usuario && touched.usuario ? <Text style={globalStyle.textError}>{errors.usuario}</Text> : null}
              <CustomButton
                title={'ACCEDER'}
                funcion={() => handleSubmit()}
              />
            </View>
          )}
        </Formik>
      </View>
    </View>
  )
}