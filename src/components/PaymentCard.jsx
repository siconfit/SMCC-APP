import { useState } from 'react'
import { StyleSheet } from 'react-native'
import { Card, Avatar, Icon, Portal, Button, Modal } from 'react-native-paper'

const PaymentCard = ({ data, num_pago, pagar, aplazar }) => {
    const fechaString = new Date(data.fecha_pago)
    const opciones = { year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC' }
    const [visible, setVisible] = useState(false)
    const showModal = () => setVisible(true)
    const hideModal = () => setVisible(false)
    const containerStyle = { backgroundColor: 'white', padding: 20, marginHorizontal: 20, gap: 10, borderRadius: 10 }

    return (
        <>
            <Portal>
                <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={containerStyle} >
                    <Button style={{ backgroundColor: '#009688' }} mode="contained" onPress={() => {
                        setVisible(false)
                        pagar(data.pago_id)
                    }}>
                        Pagar cuota
                    </Button>
                    <Button style={{ backgroundColor: '#f44336' }} mode="contained" onPress={() => {
                        setVisible(false)
                        aplazar(data.pago_id, data.credito_id, data.valor_pagado)
                    }}>
                        Aplazar cuota
                    </Button>
                </Modal>
            </Portal>
            <Card style={styles.container} onPress={() => showModal()} disabled={data.estado !== 0}>
                <Card.Title title={fechaString.toLocaleDateString('es-EC', opciones) || 'SF'} subtitle={`${data.valor_pagado} $`}
                    left={() => (
                        <Avatar.Text label={num_pago + 1} size={24} color={'#e0f2f1'} style={{ backgroundColor: '#009688' }} />
                    )}
                    right={() => (
                        <Icon source={data.estado === 0 ? 'minus-circle' : data.estado === 1 ? 'check-circle' : 'close-circle'} color={data.estado === 0 ? '#9e9e9e' : data.estado === 1 ? '#4caf50' : '#f44336'} size={24} />
                    )}
                    style={{ paddingRight: 10 }}
                />
            </Card>
        </>
    )
}

export default PaymentCard

const styles = StyleSheet.create({
    container: {
        margin: 5
    }
})