import { Text, View, Pressable, Modal } from 'react-native'
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
                <View style={{backgroundColor : 'white', padding: 20, borderRadius: 10}}>
                    <Text >Hello World!</Text>
                    <Pressable

                        onPress={() => setModalVisible(!modalVisible)}>
                        <Text >Hide Modal</Text>
                    </Pressable>
                </View>
            </View>
        </Modal>
    )
}

export default CustomModal