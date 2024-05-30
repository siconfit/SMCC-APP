import AsyncStorage from '@react-native-async-storage/async-storage'
import { View, Text, TextInput, Button } from 'react-native'
import { globalStyle } from '../styles/globalStyle'
import CustomButton from '../components/CustomButton'
import { createClient } from '../services/Clients'
import { Formik } from 'formik'
import * as Yup from 'yup'
import { useEffect, useState } from 'react'

export default function RegisterClient() {
    const [user, setUser] = useState(null)

    const validationSchema = Yup.object({
        nombre: Yup.string()
            .required('El nombre es requerido'),
        cedula: Yup.string().min(10).max(10)
            .required('La cédula es requerida'),

    })

    const onCretaClient = async (values, id) => {
        try {
            // const firstRes = await createClient(values)
            // const secondRed = await createClient(id)

        } catch (error) {

        }
    }

    const restoreToken = async () => {
        try {
            const token = await AsyncStorage.getItem('userToken')
            if (token !== null) {
                setUser(JSON.parse(token))
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
            <Formik
                initialValues={{ id: '1', nombre: '', cedula: '', direccion: '', telefono: '' }}
                onSubmit={values => onCretaClient(values, user.usuario_id)}
                validationSchema={validationSchema}
            >
                {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                    <View style={{ width: '100%', paddingHorizontal: 15 }}>
                        <TextInput
                            onChangeText={handleChange('id')}
                            onBlur={handleBlur('id')}
                            value={values.id}
                            editable={false}
                            style={globalStyle.customInput}
                        />
                        <TextInput
                            onChangeText={handleChange('nombre')}
                            onBlur={handleBlur('nombre')}
                            value={values.nombre}
                            placeholder='Nombre del cliente'
                            style={globalStyle.customInput}
                        />
                        {errors.nombre && touched.nombre ? <Text style={globalStyle.textError}>{errors.nombre}</Text> : null}
                        <TextInput
                            onChangeText={handleChange('cedula')}
                            onBlur={handleBlur('cedula')}
                            value={values.cedula}
                            placeholder='Num. de cédula'
                            style={globalStyle.customInput}
                        />
                        {errors.cedula && touched.cedula ? <Text style={globalStyle.textError}>{errors.cedula}</Text> : null}
                        <TextInput
                            onChangeText={handleChange('direccion')}
                            onBlur={handleBlur('direccion')}
                            value={values.direccion}
                            placeholder='Dirección del cliente'
                            style={globalStyle.customInput}
                        />
                        {errors.direccion && touched.direccion ? <Text style={globalStyle.textError}>{errors.direccion}</Text> : null}
                        <TextInput
                            onChangeText={handleChange('telefono')}
                            onBlur={handleBlur('telefono')}
                            value={values.telefono}
                            placeholder='Teléfono del cliente'
                            style={globalStyle.customInput}
                        />
                        {errors.telefono && touched.telefono ? <Text style={globalStyle.textError}>{errors.telefono}</Text> : null}
                        {/* <Button onPress={() => handleSubmit()} title="Submit" /> */}
                        <CustomButton
                            title={'REGISTRAR'}
                            funcion={() => console.log('registrando')}
                        />
                    </View>
                )}
            </Formik>
        </View>
    )
}