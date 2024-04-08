const {response} = require('express')
const {StatusCodes} = require("http-status-codes");
const conexion_entradas = require('../database/ConexionEntradas')

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
    if (!entradas) {
        return res.status(StatusCodes.BAD_REQUEST).json({'msg':'Error en la entrada'})
    }
    res.status(StatusCodes.OK).json({'entradas':entradas})
}

const get_quienes_somos = async (req, res = response) => {
    const conx_entradas = new conexion_entradas()
    let tipo_quienes_somos = await conx_entradas.get_tipo_entrada('quienes_somos')
    if (!tipo_quienes_somos) {
        return res.status(StatusCodes.BAD_REQUEST).json({'msg':'Error en el tipo de entrada'})
    }
    let entradas = await conx_entradas.get_entradas_tipo(tipo_quienes_somos.dataValues.id)
    if (!entradas) {
        return res.status(StatusCodes.BAD_REQUEST).json({'msg':'Error en la entrada'})
    }
    res.status(StatusCodes.OK).json({'entradas':entradas})
}

/**
 * @desc Soft delete de una entrada
 * @param req
 * @param res
 * @returns {Promise<e.Response<any, Record<string, any>>>}
 */
const delete_entrada = async (req, res = response) => {
    const conx_entradas = new conexion_entradas()
    let entrada = await conx_entradas.delete_entrada(req.params.id)
    if (!entrada) {
        return res.status(StatusCodes.BAD_REQUEST).json({'msg':'Error al borrar la entrada'})
    }
    res.status(StatusCodes.OK).json({'msg':'Entrada borrada correctamente'})
}

/**
 * @desc Crea una nueva entrada.
 * @param req
 * @param res
 * @returns {Promise<e.Response<any, Record<string, any>>>}
 */
const crear_entrada = async (req, res = response) => {
    const conx_entradas = new conexion_entradas()
    let entrada = await conx_entradas.crear_entrada(req.body)
    if (!entrada) {
        return res.status(StatusCodes.BAD_REQUEST).json({'msg':'Error al crear la entrada'})
    }
    res.status(StatusCodes.CREATED).json({'msg':'Entrada creada correctamente'})
}

module.exports = {
    get_hazte_voluntario,
    get_quienes_somos,
    delete_entrada,
    crear_entrada
}