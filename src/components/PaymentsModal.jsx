import { Modal, Portal, Text, Button, Card, Avatar } from 'react-native-paper'
import { FlatList, View } from 'react-native'

const PaymentsModal = ({ visible, hideModal, paymentsArray }) => {
    const containerStyle = { backgroundColor: 'white', padding: 20, margin: 20 }
    return (
        <Portal>
            <Modal visible={visible} onDismiss={() => hideModal()} contentContainerStyle={containerStyle} dismissable={false}>
                <FlatList
                    style={{ width: '100%', paddingHorizontal: 15 }}
                    data={paymentsArray}
                    ItemSeparatorComponent={
                        () => <View style={{ marginVertical: 2 }} />
                    }
                    renderItem={({ item, index }) => (
                        <Card style={{}}>
                            <Card.Title title={item.fecha_pago} subtitle={`${item.valor_pagado} $`}
                                left={() => (
                                    <Avatar.Text label={index} size={24} color={'#e0f2f1'} style={{ backgroundColor: '#009688' }} />
                                )}
                                style={{ paddingRight: 10 }}
                            />
                        </Card>
                    )}
                />
                <Button style={{ marginTop: 30 }} onPress={() => hideModal()}>
                    Cerrar
                </Button>
            </Modal>
        </Portal>
    )
}

export default PaymentsModal