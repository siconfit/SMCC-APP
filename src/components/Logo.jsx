import { Image } from 'react-native'

const Logo = () => {
    return (
        <Image
            style={{
                width: '100%',
                height: 100,
                alignSelf: 'center',
                resizeMode: 'stretch',
                marginBottom: 40
            }}
            source={
                require('../assets/logoSICONFIT.png')
            }
        />
    )
}

export default Logo