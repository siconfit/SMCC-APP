export const authUser = async (values) => {
    try {
        const result = await fetch('http://192.168.1.9:3000/api/users/mainAuth', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(values)
        })
        return result.json()
    } catch (error) {
        console.log("error aqui")
    }
}

export const authSecondary = async (values) => {
    try {
        const result = await fetch('http://192.168.1.9:3000/api/users/secondaryAuth', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(values)
        })
        return result.json()
    } catch (error) {
        console.log("error aqui")
    }
}