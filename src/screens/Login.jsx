import { useState } from 'react'
import { View, Text, TextInput, Button } from 'react-native'
import { globalStyle } from '../styles/globalStyle'
import { loginUser } from '../services/Users'
import CustomModal from '../components/CustomModal'
import AsyncStorage from '@react-native-async-storage/async-storage'

const Login = ({ navigation }) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [modalVisible, setModalVisible] = useState(false);

    const handleLogin = async () => {
        try {
            const result = loginUser(username, password)
            console.log(result.validate)
            // setModalVisible(true)
            if (result.validate == true) {
                await AsyncStorage.setItem('userToken', 'abc')
                navigation.navigate('ClientStack')
            } else {
                setModalVisible(true)
            }
        } catch (e) {
            // Guardando el token falló
        }
    }

    return (
        <View style={globalStyle.container}>

            <CustomModal modalVisible={modalVisible} setModalVisible={setModalVisible} />

            <Text>Login</Text>
            <TextInput
                placeholder='username'
                value={username}
                onChangeText={(text) => setUsername(text)}
            />
            <TextInput
                placeholder='password'
                value={password}
                secureTextEntry={true}
                onChangeText={(text) => setPassword(text)}
            />
            <Button title='Login' onPress={() => handleLogin()} />
        </View>
    )
}

export default Login