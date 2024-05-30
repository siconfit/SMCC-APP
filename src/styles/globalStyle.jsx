import { StyleSheet } from "react-native"

export const globalStyle = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#E0F2F1',
        justifyContent: 'center',
        alignItems: 'center'
    },
    containerModal: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center'
    },
    header: {
        backgroundColor: '4FE7AF'
    },
    customInput: {
        backgroundColor: '#EDF2FA',
        borderRadius: 25,
        paddingHorizontal: 20,
        paddingVertical: 10,
        marginBottom: 10,
        elevation: 3
    },
    textError: {
        color: 'red',
        marginBottom: 20,
        textAlign: 'center'
    },
    button: {
        paddingVertical: 10,
        borderRadius: 25,
        elevation: 3
    },
})