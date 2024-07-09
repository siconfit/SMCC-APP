const API_URL = 'http://192.168.1.9:3000'

export const getPeriods = async () => {
    try {
        const result = await fetch(API_URL + '/api/periods')
        if (result.message) {
            return []
        }
        return result.json()
    } catch (error) {
        return []
    }

}

const getPeriod = async (id) => {
    try {
        const result = await fetch(API_URL + '/api/periods/' + id)
        if (result.message) {
            return null
        }
        return result.json()
    } catch (error) {
        return null
    }

}

export const getCreditsClient = async (id) => {
    try {
        const result = await fetch(API_URL + '/api/credits/client/' + id)
        return result.json()
    } catch (error) {
        return []
    }

}

export const createCredit = async (values) => {
    try {
        const result = await fetch(API_URL + '/api/credits', {
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

export const registerPayments = async (values) => {
    try {
        const result = await fetch(API_URL + '/api/credits', {
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

const calcularValorTotal = async (valor_inicial, interes) => {
    let multiplicadorInteres = (parseInt(interes) + 100) / 100
    return (valor_inicial * multiplicadorInteres).toFixed(2)
}
const calcularResiduo = async (valor_final, duracion, valor_cuota) => {
    let dividendo = duracion * valor_cuota
    return (dividendo - valor_final).toFixed(2)
}
const formatDate = (date = new Date()) => {
    const year = date.toLocaleString('default', { year: 'numeric' })
    const month = date.toLocaleString('default', {
        month: '2-digit',
    })
    const day = date.toLocaleString('default', { day: '2-digit' })

    return [year, month, day].join('')
}


export const calcularCredito = async (values) => {
    const fecha = new Date()
    const fecha_aux = fecha
    const valor_final = await calcularValorTotal(values.valor_inicial, values.interes)
    const valor_cuota = valor_final / values.duracion
    const res = await calcularResiduo(valor_final, values.duracion, valor_cuota.toFixed(2))
    var cuota_aux = 0
    var cuota_final = false
    const periodoData = await getPeriod(values.periodo)

    if (res != 0) {
        cuota_aux = valor_cuota.toFixed(2) - res
        cuota_final = true
    }

    var data = {
        cliente_id: values.cliente_id,
        valor_total: valor_final,
        fecha_emision: formatDate(fecha),
        numero_cuotas: values.duracion,
        periodo_id: values.periodo,
        interes: values.interes,
        cuota_final: cuota_final,
        cuota_aux: cuota_aux.toFixed(2),
        valor_cuota: valor_cuota.toFixed(2)
    }

    let lista_pagos = []
    for (let i = 0; i < values.duracion; i++) {
        var atributoFecha
        var atributoValor
        fecha_aux.setDate(fecha_aux.getDate() + periodoData.intervalo)
        atributoFecha = fecha_aux.toLocaleDateString()

        if (periodoData.fin_semana) {
            if (i == values.duracion - 1 && cuota_final == true) {
                atributoValor = cuota_aux.toFixed(2)
            } else {
                atributoValor = valor_cuota.toFixed(2)
            }
            let nuevoObjeto = {
                fecha_pago: atributoFecha,
                valor_pagado: atributoValor
            }
            lista_pagos.push(nuevoObjeto)
        } else {
            if (fecha_aux.getDay() != 0 && fecha_aux.getDay() != 6) {
                if (i == values.duracion - 1 && cuota_final == true) {
                    atributoValor = cuota_aux.toFixed(2)
                } else {
                    atributoValor = valor_cuota.toFixed(2)
                }
                let nuevoObjeto = {
                    fecha_pago: atributoFecha,
                    valor_pagado: atributoValor
                }
                lista_pagos.push(nuevoObjeto)
            } else {
                i--
            }
        }

    }
    // alert(JSON.stringify(data, null, 2))
    return { lista_pagos, data }
}