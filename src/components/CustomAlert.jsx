import { Portal, Dialog, Button, Text } from "react-native-paper"

const CustomAlert = ({ visible, hideDialog, title, msg }) => {
    return (
        <Portal>
            <Dialog visible={visible} onDismiss={() => hideDialog()} dismissable={false}>
                <Dialog.Title>{title}</Dialog.Title>
                <Dialog.Content>
                    <Text variant="bodyMedium">{msg}</Text>
                </Dialog.Content>
                <Dialog.Actions>
                    <Button onPress={() => hideDialog()}>Entendido</Button>
                </Dialog.Actions>
            </Dialog>
        </Portal>
    )
}

export default CustomAlert