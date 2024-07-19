const API_URL = 'https://smcc-api.vercel.app'

export const authUser = async (values) => {
    try {
        const result = await fetch(API_URL + '/api/users/mainAuth', {
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
        const result = await fetch(API_URL + '/api/users/secondaryAuth', {
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

export const subscription = async (id) => {
    try {
        const result = await fetch(API_URL + '/api/users/subscription/' + id)
        return result.json()
    } catch (error) {
        console.log("error aqui")
    }
}