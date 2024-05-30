import { Text, View, Pressable, Modal, ActivityIndicator } from 'react-native'
import { globalStyle } from '../styles/globalStyle';

const CustomModal = ({ modalVisible, setModalVisible }) => {
    return (
        <Modal
            animationType='fade'
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
                alert('Modal has been closed.');
                setModalVisible(!modalVisible);
            }}>
            <View style={globalStyle.containerModal}>
                <View style={{ backgroundColor: 'white', padding: 20, borderRadius: 10 }}>
                    {/* <Text >Usuario o contraseña incorrecta</Text>
                    <Pressable

                        onPress={() => setModalVisible(!modalVisible)}>
                        <Text >Cerrar modal</Text>
                    </Pressable> */}
                    <ActivityIndicator size="large" color="#009688" />
                </View>
            </View>
        </Modal>
    )
}

export default CustomModal