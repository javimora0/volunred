const {response} = require('express')
const conexion_usuario = require('../database/usuarios/ConexionUsuario')
const conexion_voluntario = require('../database/usuarios/ConexionVoluntario')
const conexion_organizacion = require('../database/usuarios/ConexionOrganizacion')
const {StatusCodes} = require("http-status-codes");
const conexion_entradas = require("../database/ConexionEntradas");
const path = require("path");
const {subir_archivo} = require("../helpers/subir_archivo");
const bcrypt = require("bcrypt");

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

/**
 * @desc Obtiene los comentarios sobre un usuario
 * @param req
 * @param res
 * @returns {Promise<e.Response<any, Record<string, any>>>}
 */
const get_comentarios = async (req, res = response) => {
    const conx = new conexion_usuario()
    let comentarios = await conx.get_comentarios(req.params.id_usuario)
    if (!comentarios) {
        return res.status(StatusCodes.BAD_REQUEST).json({'msg': 'Error al obtener los comentarios del usuario'})
    }
    res.status(StatusCodes.OK).json({'comentarios': comentarios})
}

/**
 * @desc Obtiene las solicitudes de un usuario
 * @param req
 * @param res
 * @returns {Promise<e.Response<any, Record<string, any>>>}
 */
const get_solicitudes = async (req, res = response) => {
    const conx = new conexion_usuario()
    let solicitudes = await conx.get_solicitudes(req.params.id_usuario)
    if (!solicitudes) {
        return res.status(StatusCodes.BAD_REQUEST).json({'msg': 'Error al obtener las solicitudes del usuario'})
    }
    res.status(StatusCodes.OK).json({'solicitudes': solicitudes})
}

/**
 * @desc Obtiene todos los voluntariados de un usuario
 * @param req
 * @param res
 * @returns {Promise<e.Response<any, Record<string, any>>>}
 */
const get_voluntariados = async (req, res = response) => {
    const conx = new conexion_usuario()
    let voluntariados_usuario = await conx.get_voluntariados(req.params.id_usuario)
    if (!voluntariados_usuario) {
        return res.status(StatusCodes.BAD_REQUEST).json({'msg': 'Error al obtener los voluntariados del usuario'})
    }
    res.status(StatusCodes.OK).json({'voluntariados_usuario': voluntariados_usuario})
}

/**
 * @desc Obtiene la foto de perfil del usuario
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
const get_imagen = async (req, res = response) => {
    const conx = new conexion_usuario()
    let usuario = await conx.get_usuario(req.params.id_usuario)
    let nombre_foto = usuario.nombre_foto + usuario.extension_foto
    if (nombre_foto) {
        const path_img = path.join(__dirname, '../uploads', 'imgs_usuarios', nombre_foto)
        if (path_img) {
            return res.sendFile(path_img)
        }
    }
    const path_img = path.join(__dirname, '../uploads', 'imgs_usuarios', 'foto_perfil_defecto.jpg')
    res.sendFile(path_img);
}

/**
 * @desc Modifica foto de perfil de un usuario
 * @param req
 * @param res
 * @returns {Promise<e.Response<any, Record<string, any>>>}
 */
const put_imagen = async (req, res = response) => {
    //Subir imagen a local
    const archivo = await subir_archivo(req.files, undefined, 'imgs_usuarios')
    if (!archivo) {
        return res.status(StatusCodes.BAD_REQUEST).json({'msg': 'Error al subir el archivo a local'})
    }
    // asignar la imagen al usurio
    let conx = new conexion_usuario()
    let usuario = await conx.asignar_imagen(req.params.id_usuario, archivo[0], archivo[1])
    if (!usuario) {
        return res.status(StatusCodes.BAD_REQUEST).json({'msg': 'Error al subir la imagen'})
    }
    res.status(StatusCodes.OK).json({'usuario': usuario})
}

/**
 * @desc Modifica los datos de un usuario
 * @param req
 * @param res
 * @returns {Promise<e.Response<any, Record<string, any>>>}
 */
const put_usuario = async (req, res = response) => {
    let usuario_body = {
        email: req.body.email,
        username: req.body.username,
        ubicacion: req.body.ubicacion
    }

    let voluntario_body = {
        nombre: req.body.nombre,
        apellidos: req.body.apellidos,
        fecha_nacimiento: req.body.fecha_nacimiento,
        dni_nie: req.params.dni_nie,
        telefono: req.params.telefono,
    }
    let conx = new conexion_usuario()
    let usuario = await conx.put_usuario(usuario_body, req.params.id_usuario)
    if (!usuario) {
        return res.status(StatusCodes.BAD_REQUEST).json({'msg': 'Error al modificar el usuario'})
    }
    let conx_vol = new conexion_voluntario()
    let voluntario = await conx_vol.put_voluntario(voluntario_body, req.params.id_usuario)
    if (!voluntario) {
        return res.status(StatusCodes.BAD_REQUEST).json({'msg': 'Error al modificar el voluntario'})
    }
    res.status(StatusCodes.OK).json({'usuario': usuario})
}

/**
 * @desc Comprueba y modifica la contraseña de un usuario
 * @param req
 * @param req.body.new_password
 * @param req.body.old_password
 * @param req.params
 * @param res
 * @returns {Promise<e.Response<any, Record<string, any>>>}
 */
const put_password = async (req, res = response) => {
    let conx = new conexion_usuario()
    let usuario = await conx.get_usuario(req.params.id_usuario)
    if (!bcrypt.compare(req.body.old_password, usuario.password)) {
        return res.status(StatusCodes.BAD_REQUEST).json({'msg': 'Contraseña incorrecta'})
    }
    let usuario_modificado = await conx.put_password(req.body.new_password, req.params.id_usuario)
    if (!usuario_modificado) {
        return res.status(StatusCodes.BAD_REQUEST).json({'msg': 'Error al modificar la contraseña'})
    }
    res.status(StatusCodes.OK).json({'usuario': usuario})
}
module.exports = {
    get_datos,
    get_comentarios,
    get_solicitudes,
    get_voluntariados,
    get_imagen,
    put_imagen,
    put_usuario,
    put_password
}