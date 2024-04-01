const {response} = require('express')
const {StatusCodes} = require("http-status-codes");
const conexion_entradas = require('../database/usuarios/ConexionEntradas')

/**
 * @desc Obtiene las entradas 'hazte voluntario'
 * @param req
 * @param res
 * @returns {Promise<e.Response<any, Record<string, any>>>}
 */
const get_hazte_voluntario = async (req, res = response) => {
    const conx_entradas = new conexion_entradas()
    let tipo_hazte_voluntario = await conx_entradas.get_tipo_entrada('hazte_voluntario')
    if (!tipo_hazte_voluntario) {
        return res.status(StatusCodes.BAD_REQUEST).json({'msg':'Error en el tipo de entrada'})
    }
    let entradas = await conx_entradas.get_entradas_tipo(tipo_hazte_voluntario.dataValues.id)
    console.log(entradas)
    if (!entradas) {
        return res.status(StatusCodes.BAD_REQUEST).json({'msg':'Error en la entrada'})
    }
    res.status(StatusCodes.OK).json({'entradas':entradas})
}

module.exports = {
    get_hazte_voluntario
}