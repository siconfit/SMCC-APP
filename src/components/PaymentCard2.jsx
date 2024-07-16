import { StyleSheet } from 'react-native'
import { Card, Avatar, Icon } from 'react-native-paper'

const PaymentCard2 = ({ data, num_pago }) => {
    return (
        <Card style={styles.container}>
            <Card.Title title={data.nombre} subtitle={`${data.valor_pagado} $`}
                left={() => (
                    <Avatar.Text label={num_pago + 1} size={24} color={'#e0f2f1'} style={{ backgroundColor: '#009688' }} />
                )}
                right={() => (
                    <Icon source={data.estado === 0 ? 'minus-circle' : data.estado === 1 ? 'check-circle' : 'close-circle'} color={data.estado === 0 ? '#9e9e9e' : data.estado === 1 ? '#4caf50' : '#f44336'} size={24} />
                )}
                style={{ paddingRight: 10 }}
            />
        </Card>
    )
}

export default PaymentCard2

const styles = StyleSheet.create({
    container: {
        margin: 5
    }
})