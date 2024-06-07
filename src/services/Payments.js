export const calcularCredito = async (values) => {
    const fecha = new Date()
    const fecha_aux = fecha
    const valor_cuota = values.valor_total / values.duracion_dias
    const res = values.valor_total % values.duracion_dias
    const interesAux = values.interes
    var cuota_aux = 0
    var cuotas = values.duracion_dias
    var cuota_final = false

    if (res != 0) {
        const valor_aux = valor_cuota.toFixed(2) * values.duracion_dias
        const res_aux = valor_aux.toFixed(2) - values.valor_total
        cuota_aux = valor_cuota.toFixed(2) - res_aux.toFixed(2)
        cuotas--
        cuota_final = true
    }

    var data = {
        fecha_emision: fecha.toLocaleDateString(),
        valor_total: values.valor_total,
        interes: interesAux,
        num_cuotas_dias: cuotas,
        valor_cuota: valor_cuota.toFixed(2),
        cuota_final_parche: cuota_final,
        valor_ultima_cuota: cuota_aux.toFixed(2),
    }

    let lista_pagos = []
    for (let i = 0; i < values.duracion_dias; i++) {
        var atributoFecha
        var atributoValor
        fecha_aux.setDate(fecha_aux.getDate() + 1)
        if (fecha_aux.getDay() != 0) {
            atributoFecha = fecha_aux.toLocaleDateString()
            if (cuota_final == true) {
                if (i != values.duracion_dias - 1) {
                    atributoValor = valor_cuota.toFixed(2)
                } else {
                    atributoValor = cuota_aux.toFixed(2)
                }
            } else {
                atributoValor = valor_cuota.toFixed(2)
            }
            let nuevoObjeto = {
                fecha_pago: atributoFecha,
                valor_pago: atributoValor
            }
            lista_pagos.push(nuevoObjeto)
        } else {
            i--
        }
    }
    return lista_pagos
}