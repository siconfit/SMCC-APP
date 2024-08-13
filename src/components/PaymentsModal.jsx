import { Modal, Portal, Text, Button, Card, Avatar } from 'react-native-paper'
import { FlatList, View } from 'react-native'

const PaymentsModal = ({ visible, hideModal, paymentsArray }) => {
    const containerStyle = { backgroundColor: 'white', padding: 20, margin: 20 }
    const opciones = { year: 'numeric', month: 'short', day: 'numeric', timeZone: 'UTC' }

    return (
        <Portal>
            <Modal visible={visible} onDismiss={() => hideModal()} contentContainerStyle={containerStyle} dismissable={false}>
                <FlatList
                    style={{ width: '100%', paddingHorizontal: 15 }}
                    data={paymentsArray}
                    ItemSeparatorComponent={
                        () => <View style={{ marginVertical: 2 }} />
                    }
                    renderItem={({ item, index }) => {
                        const fechaOriginal = item.fecha_pago
                        const año = fechaOriginal.substring(0, 4)
                        const mes = fechaOriginal.substring(4, 6)
                        const día = fechaOriginal.substring(6, 8)

                        const fechaFormateada = `${año}-${mes}-${día}`
                        const fechaPago = new Date(fechaFormateada)
                        return (
                            <Card style={{ margin: 10, borderRadius: 10, elevation: 3 }}>
                                <Card.Title title={fechaPago.toLocaleDateString('es-EC', opciones)} subtitle={`${item.valor_pagado} $`}
                                    left={() => (
                                        <Avatar.Text label={index} size={24} color={'#e0f2f1'} style={{ backgroundColor: '#009688' }} />
                                    )}
                                />
                            </Card>
                        )
                    }}
                />
                <Button style={{ marginTop: 30 }} onPress={() => hideModal()}>
                    Cerrar
                </Button>
            </Modal>
        </Portal>
    )
}

export default PaymentsModal