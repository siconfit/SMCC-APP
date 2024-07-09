import { StyleSheet } from 'react-native'
import { Card, Avatar } from 'react-native-paper'

const PaymentCard = ({ fecha, valor, num_pago }) => {
    const fechaString = new Date(fecha)
    return (
        <Card style={styles.container}>
            <Card.Title title={fechaString.toLocaleDateString()} subtitle={`${valor} $`} left={() => (
                <Avatar.Text label={num_pago + 1} size={24} color={'#e0f2f1'} style={{ backgroundColor: '#009688' }} />
            )} />
        </Card>
    )
}

export default PaymentCard

const styles = StyleSheet.create({
    container: {
        margin: 5
    }
})