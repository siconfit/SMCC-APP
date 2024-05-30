import { useState } from "react"
import { View, Text, TextInput, Button, Image } from "react-native"
import CustomButton from "../components/CustomButton"
import { globalStyle } from "../styles/globalStyle"
import { authUser } from "../services/Users"
import CustomModal from "../components/CustomModal"
import { Formik } from "formik"
import * as Yup from "yup"

const SignupSchema = Yup.object().shape({
  usuario: Yup.string()
    .required('Campo obligatorio'),
})

export default function MainLogin({ navigation }) {
  const [modalVisible, setModalVisible] = useState(false)

  const handleLogin = async (values) => {
    try {
      const result = await authUser(values)
      setModalVisible(false)
      if (result.message) {
        alert(result.message, null, 2)
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
      <CustomModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
      />
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
          <View style={{ width: "90%", paddingHorizontal: 15 }}>
            <Image
              style={{
                width: '100%',
                height: 100,
                alignSelf: 'center',
                resizeMode: 'stretch',
                marginBottom: 40
              }}
              source={
                require('../assets/logoSICONFIT.png')
              }
            />
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
  )
}