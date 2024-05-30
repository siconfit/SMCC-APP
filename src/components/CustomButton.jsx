import { Pressable, Text } from "react-native"
import { globalStyle } from "../styles/globalStyle"

export default function CustomButton({ title, funcion }) {
    return (
        <Pressable
            onPress={() => {
                funcion()
            }}
            style={({ pressed }) => [
                {
                    backgroundColor: pressed ? '#4FE7AF' : '#009688',
                },
                globalStyle.button
            ]}>
            {({ pressed }) => (
                <Text style={{
                    color: pressed ? 'black' : 'white',
                    textAlign: 'center'
                }}>
                    {title || 'submit'}
                </Text>
            )}
        </Pressable>
    )
}
