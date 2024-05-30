export const getClients = async () => {
    try {
        const result = await fetch('http://192.168.1.9:3000/clients')
        if (result.message) {
            return []
        }
        return result.json()
    } catch (error) {
        return []
    }

}

export const getMyClients = async (id) => {
    try {
        const result = await fetch('http://192.168.1.9:3000/relations/user/' + id)
        return result.json()
    } catch (error) {
        return []
    }

}

export const createClient = async (values) => {
    try {
        await fetch('http://192.168.1.9:3000/clients', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(values)
        })
            .then(res => res.json())
            .then(json => {
                return json
            })
    } catch (error) {
        return JSON.stringify({
            status: 500,
            result: 'result'
        })
    }
}

export const linkClient = async (values) => {
    try {
        await fetch('http://192.168.1.9:3000/ralations/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(values)
        })
            .then(res => res.json())
            .then(json => {
                return json
            })
    } catch (error) {
        return JSON.stringify({
            status: 500,
            result: 'result'
        })
    }
}