import { View, Text, StyleSheet, Image } from 'react-native'

const IrregularHeader = ({ title, children }) => {
    return (
        <>
            <View style={[styles.headerContainer]}>
                <Text style={styles.headerText}>{title}</Text>
                {children}
            </View>
            <Image
                style={{
                    width: '100%',
                    height: 70,
                    alignSelf: 'center',
                    resizeMode: 'stretch',
                    zIndex: -1
                }}
                source={
                    require('../assets/wave.png')
                }
            />
        </>
    )
}

const styles = StyleSheet.create({
    headerContainer: {
        backgroundColor: '#4FE7AF',
        alignItems: 'center',
        width: '100%',
        position: 'relative',
        minHeight: 75,
        height: 'auto',
        justifyContent: 'flex-end',
    },
    headerText: {
        fontSize: 24,
        color: '#009688',
        fontWeight: 'bold',
    },
})

export default IrregularHeader
