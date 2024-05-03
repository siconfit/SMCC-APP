export const getClients = async () => {
    try {
        const result = await fetch('http://192.168.1.9:3000/pruebas')
        if (result.message) {
            return []
        }
        return result.json()
    } catch (error) {
        return []
    }

}