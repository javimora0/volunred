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
        return res.status(StatusCodes.BAD_REQUEST).json({'msg': 'Error al obtener los datos del usuario'})
    }
    let vol_org = await conx_voluntario.get_voluntario(usuario.id)

    if (!vol_org) {
        vol_org = await conx_organizacion.get_organizacion(usuario.id)
        if (!vol_org) {
            return res.status(StatusCodes.BAD_REQUEST).json({'msg': 'Error al obtener los datos completos del usuario'})
        }
    }
    res.status(StatusCodes.OK).json({'usuario': usuario, 'vol_org': vol_org})
}

const get_comentarios = async (req, res = response) => {
    const conx =  new conexion_usuario()
    let comentarios = await conx.get_comentarios(req.params.id_usuario)
    if (!comentarios) {
        return res.status(StatusCodes.BAD_REQUEST).json({'msg': 'Error al obtener los comentarios del usuario'})
    }
    res.status(StatusCodes.OK).json({'comentarios': comentarios})
}

const get_solicitudes = async (req, res = response) => {
    const conx = new conexion_usuario()
    let solicitudes = await conx.get_solicitudes(req.params.id_usuario)
    if (!solicitudes) {
        return res.status(StatusCodes.BAD_REQUEST).json({'msg': 'Error al obtener las solicitudes del usuario'})
    }
    res.status(StatusCodes.OK).json({'solicitudes': solicitudes})
}

const get_voluntariados = async (req, res = response) => {
    const conx = new conexion_usuario()
    let voluntariados_usuario = await conx.get_voluntariados(req.params.id_usuario)
    if (!voluntariados_usuario) {
        return res.status(StatusCodes.BAD_REQUEST).json({'msg': 'Error al obtener los voluntariados del usuario'})
    }
    res.status(StatusCodes.OK).json({'voluntariados_usuario': voluntariados_usuario})
}
module.exports = {
    get_datos,
    get_comentarios,
    get_solicitudes,
    get_voluntariados
}