const {response} = require('express')
const conexion_usuario = require('../database/usuarios/ConexionUsuario')
const conexion_voluntario = require('../database/usuarios/ConexionVoluntario')
const conexion_organizacion = require('../database/usuarios/ConexionOrganizacion')

const {StatusCodes} = require("http-status-codes");

/**
 * @desc Devuelve todos los datos de un usuario
 * @param req
 * @param res
 * @returns {Promise<e.Response<any, Record<string, any>>>}
 */
const get_datos = async (req, res = response) => {
    const conx = new conexion_usuario()
    const conx_voluntario = new conexion_voluntario()
    const conx_organizacion = new conexion_organizacion()

    const usuario = await conx.get_usuario(req.params.id_usuario)
    if (!usuario) {
        return res.status(StatusCodes.BAD_REQUEST).json({'msg': 'error al obtener los datos del usuario'})
    }
    let vol_org = await conx_voluntario.get_voluntario(usuario.id)

    if (!vol_org) {
        vol_org = await conx_organizacion.get_organizacion(usuario.id)
        if (!vol_org) {
            return res.status(StatusCodes.BAD_REQUEST).json({'msg': 'error al obtener los datos completos del usuario'})
        }
    }
    res.status(StatusCodes.OK).json({'usuario': usuario, 'vol_org': vol_org})
}

module.exports = {
    get_datos
}