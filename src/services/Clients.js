const API_URL = 'https://smcc-api.vercel.app'
// export const getClients = async () => {
//     try {
//         const result = await fetch('http://192.168.1.9:3000/clients')
//         if (result.message) {
//             return []
//         }
//         return result.json()
//     } catch (error) {
//         return []
//     }

// }

export const getMyClients = async (id) => {
    try {
        const result = await fetch(API_URL + '/api/relations/user/' + id)
        return result.json()
    } catch (error) {
        return []
    }

}

export const createClient = async (values) => {
    try {
        const result = await fetch(API_URL + '/api/clients', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(values)
        })
        return result.json()
    } catch (error) {
        return JSON.stringify({
            status: 500,
            result: 'result'
        })
    }
}

export const linkClient = async (values) => {
    try {
        const result = await fetch(API_URL + '/api/relations', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(values)
        })
        return result.json()
    } catch (error) {
        return JSON.stringify({
            status: 500,
            result: 'result'
        })
    }
}