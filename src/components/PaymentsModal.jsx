import { Modal, Portal, Text, Button, Card } from 'react-native-paper'
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
                        <Card style={styles.container}>
                            <Card.Title title={fechaString.toLocaleDateString()} subtitle={`${data.valor_pagado} $`}
                                left={() => (
                                    <Avatar.Text label={num_pago + 1} size={24} color={'#e0f2f1'} style={{ backgroundColor: '#009688' }} />
                                )}
                                right={() => (
                                    <Icon source={data.estado === 0 ? 'minus-circle' : data.estado === 1 ? 'check-circle' : 'close-circle'} color={data.estado === 0 ? '#9e9e9e' : data.estado === 1 ? '#4caf50' : '#f44336'} size={24} />
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