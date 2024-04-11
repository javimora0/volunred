const {response} = require('express')
const conexion_deberes_derechos = require('../database/ConexionDerechosDeberes')
const {StatusCodes} = require("http-status-codes");

/**
 * @desc Obtiene todos los derechos
 * @param req
 * @param res
 * @returns {Promise<e.Response<any, Record<string, any>>>}
 */
const get_derechos = async (req, res = response) => {
    const conx_derechos_deberes = new conexion_deberes_derechos()
    let derechos = conx_derechos_deberes.get_derechos()
    if (!derechos) {
        return res.status(StatusCodes.BAD_REQUEST).json({'msg':'Error al obtener los deberes'})
    }
    res.status(StatusCodes.OK).json({'derechos':derechos})
}

/**
 * @desc Obtiene todos los deberes
 * @param req
 * @param res
 * @returns {Promise<e.Response<any, Record<string, any>>>}
 */
const get_deberes = async (req, res = response) => {
    const conx_derechos_deberes = new conexion_deberes_derechos()
    let deberes = conx_derechos_deberes.get_deberes()
    if (!deberes) {
        return res.status(StatusCodes.BAD_REQUEST).json({'msg':'Error al obtener los deberes'})
    }
    res.status(StatusCodes.OK).json({'deberes':deberes})
}

module.exports = {
    get_deberes,
    get_derechos
}