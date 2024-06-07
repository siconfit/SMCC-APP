import { ActivityIndicator } from 'react-native'
import { Portal, Dialog } from "react-native-paper"

const LoadingModal = ({ modalVisible }) => {
    return (
        <Portal>
            <Dialog visible={modalVisible} dismissable={false} dismissableBackButton={false}>
                <Dialog.Content>
                    <ActivityIndicator size="large" color="#009688" />
                </Dialog.Content>
            </Dialog>
        </Portal>
    )
}

export default LoadingModal