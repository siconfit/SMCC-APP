import { StyleSheet } from 'react-native'
import { Button, Card, Text, Dialog, Portal } from 'react-native-paper'
import { useState } from 'react'
import { Icon } from "react-native-elements"

const LeftContent = () => <Icon name="person" type="material" color={'#009688'} />
const RightContent = () => <Icon name="more-vert" type="material" color={'#009688'} />

const ClientCard = ({ nombre, cedula }) => {
    const [visible, setVisible] = useState(false);

    const showDialog = () => setVisible(true);

    const hideDialog = () => setVisible(false);

    return (
        <>
            <Portal>
                <Dialog visible={visible} onDismiss={hideDialog}>
                    <Dialog.Title>Alert</Dialog.Title>
                    <Dialog.Content>
                        <Text variant="bodyMedium">This is simple dialog</Text>
                    </Dialog.Content>
                    <Dialog.Actions>
                        <Button onPress={() => hideDialog()}>Done</Button>
                    </Dialog.Actions>
                </Dialog>
            </Portal>
            <Card style={styles.container} onPress={() => showDialog()}>
                <Card.Title title={nombre} subtitle={cedula} left={LeftContent} right={RightContent} />
            </Card>
        </>
    )
}

export default ClientCard

const styles = StyleSheet.create({
    container: {
        margin: 5
    }
})