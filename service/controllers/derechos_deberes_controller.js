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
    let derechos = await conx_derechos_deberes.get_derechos()
    if (!derechos) {
        return res.status(StatusCodes.BAD_REQUEST).json({'msg':'Error al obtener los deberes'})
    }
    res.status(StatusCodes.OK).json({'derecho_deber':derechos})
}

/**
 * @desc Obtiene todos los deberes
 * @param req
 * @param res
 * @returns {Promise<e.Response<any, Record<string, any>>>}
 */
const get_deberes = async (req, res = response) => {
    const conx_derechos_deberes = new conexion_deberes_derechos()
    let deberes = await conx_derechos_deberes.get_deberes()
    if (!deberes) {
        return res.status(StatusCodes.BAD_REQUEST).json({'msg':'Error al obtener los deberes'})
    }
    res.status(StatusCodes.OK).json({'derecho_deber':deberes})
}

/**
 * @desc Crea un derecho/deber
 * @param req
 * @param res
 */
const crear_derecho_deber = async (req, res = response) => {
    const conx_derechos_deberes = new conexion_deberes_derechos()
    let derecho_deber = await conx_derechos_deberes.crear_derecho_deber(req.body)
    if (!derecho_deber) {
        return res.status(StatusCodes.BAD_REQUEST).json({'msg':'Error al crear el derecho o deber'})
    }
    res.status(StatusCodes.CREATED).json({'derecho_deber':derecho_deber})
}

/**
 * @desc Modica un deberecho o deber
 * @param req
 * @param res
 * @returns {Promise<e.Response<any, Record<string, any>>>}
 */
const modificar_derecho_deber = async (req, res = response) => {
    const conx_derechos_deberes = new conexion_deberes_derechos()
    let derecho_deber = await conx_derechos_deberes.modificar_derecho_deber(req.body,req.params.id)
    if (!derecho_deber) {
        return res.status(StatusCodes.BAD_REQUEST).json({'msg':'Error al modificar el derecho o deber'})
    }
    res.status(StatusCodes.OK).json({'derecho_deber':derecho_deber})
}

/**
 * @desc Soft delete de un derecho o deber
 * @param req
 * @param res
 * @returns {Promise<e.Response<any, Record<string, any>>>}
 */
const eliminar_derecho_deber = async (req, res = response) => {
    const conx_derechos_deberes = new conexion_deberes_derechos()
    let derecho_deber = await conx_derechos_deberes.eliminar_derecho_deber(req.params.id)
    if (!derecho_deber) {
        return res.status(StatusCodes.BAD_REQUEST).json({'msg':'Error al modificar el derecho o deber'})
    }
    res.status(StatusCodes.OK).json({'msg':'Derecho o deber eliminado correctamente'})
}

module.exports = {
    get_deberes,
    get_derechos,
    crear_derecho_deber,
    modificar_derecho_deber,
    eliminar_derecho_deber
}