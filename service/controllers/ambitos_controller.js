const {response} = require('express')
const {StatusCodes} = require("http-status-codes");
const conexion_ambitos = require('../database/ConexionAmbitos')

/**
 * @desc Obtiene todos los ambitos profesionales disponibles
 * @param req
 * @param res
 * @returns {Promise<e.Response<any, Record<string, any>>>}
 */
const get_ambitos = async (req, res = response) => {
    const conx_ambitos = new conexion_ambitos()
    let ambitos = await conx_ambitos.get_ambitos()
    if (!ambitos) {
        return res.status(StatusCodes.BAD_REQUEST).json({'msg': 'Error al obtener los ámbitos profesionales'})
    }
    res.status(StatusCodes.OK).json({'ambitos_profesionales': ambitos})
}

/**
 * @desc Asigna ambitos profesionales a un usuario
 * @param req
 * @param res
 */
const asignar_ambitos = async(req, res = response) => {
    const conx_ambitos = new conexion_ambitos()
    let ambitos_asignados = await conx_ambitos.asignar_ambitos(req.body.ambitos, req.params.id_usuario)
    if (!ambitos_asignados) {
        return res.status(StatusCodes.BAD_REQUEST).json({'msg':'Error al asignar ambitos profesionales'})
    }
    res.status(StatusCodes.OK).json({'ambitos_profesionales': ambitos_asignados})
}

module.exports = {
    get_ambitos,
    asignar_ambitos
}

