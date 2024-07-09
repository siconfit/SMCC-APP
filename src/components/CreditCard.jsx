import { StyleSheet, View } from 'react-native'
import { Card, Icon, Text } from 'react-native-paper'

const CreditCard = ({ item, navigation }) => {
    const fecha = new Date(item.fecha_emision)
    return (
        <Card style={styles.card} onPress={() => navigation.navigate('Payments', { item })}>
            <Card.Content >
                <Text variant="titleLarge">{item.valor_total} $</Text>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 }}>
                    <View style={{ flexDirection: 'row', gap: 5 }}>
                        <Icon source="calendar-clock" size={20} />
                        <Text variant="bodyMedium">{fecha.toLocaleDateString()}</Text>
                    </View>
                    <View>
                        <Text>{item.numero_cuotas}</Text>
                    </View>
                </View>
            </Card.Content>
        </Card>
    )
}

export default CreditCard

const styles = StyleSheet.create({
    card: {
        margin: 5
    }
})