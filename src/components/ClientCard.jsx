import { StyleSheet } from 'react-native'
import { Card, Icon } from 'react-native-paper'

const LeftContent = () => <Icon source={'account'} color={'#009688'} size={30} />
const RightContent = () => <Icon source={'dots-vertical'} color={'#009688'} size={30} />

const ClientCard = ({ data, navigation }) => {

    return (
        <Card style={styles.container} onPress={() => navigation.navigate('ClientProfile', { data })}>
            <Card.Title title={data.nombre} subtitle={data.cedula} left={LeftContent} right={RightContent} />
        </Card>
    )
}

export default ClientCard

const styles = StyleSheet.create({
    container: {
        margin: 5
    }
})