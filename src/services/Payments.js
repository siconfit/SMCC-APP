export const getPayments = async (id) => {
    try {
        const result = await fetch('http://192.168.1.9:3000/api/payments/credit/' + id)
        return result.json()
    } catch (error) {
        return []
    }

}

const formatDate = (date = new Date()) => {
    const year = date.toLocaleString('default', { year: 'numeric' })
    const month = date.toLocaleString('default', {
        month: '2-digit',
    })
    const day = date.toLocaleString('default', { day: '2-digit' })

    return [year, month, day].join('')
}


export const searchPayments = async (value) => {
    try {
        const fecha = formatDate(value)
        console.log(fecha)
        const result = await fetch('http://192.168.1.9:3000/api/payments/search', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "fecha": fecha
            })
        })
        return result.json()
    } catch (error) {
        return JSON.stringify({
            status: 500,
            result: 'result'
        })
    }
}