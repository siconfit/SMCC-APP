import { Modal, Portal, Text, Button } from 'react-native-paper'
import { FlatList, View } from 'react-native'
import PaymentCard from './PaymentCard'

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
                        <PaymentCard key={index} fecha={item.fecha_pago} valor={item.valor_pagado} num_pago={index} />
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