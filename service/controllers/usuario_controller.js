const {response} = require('express')
const conexion_usuario = require('../database/usuarios/ConexionUsuario')
const conexion_voluntario = require('../database/usuarios/ConexionVoluntario')
const conexion_organizacion = require('../database/usuarios/ConexionOrganizacion')
const conexion_voluntariado = require('../database/ConexionVoluntariado')
const conexion_estados = require('../database/ConexionEstadosSolicitudes')

const {StatusCodes, BAD_REQUEST} = require("http-status-codes");
const auth_controller = require("../controllers/auth_controller");
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
    // Generar nuevo token
    // Obtener roles usuario y generar token
    let {roles_usuario, token} = await auth_controller.get_token(voluntario, usuario)
    res.status(StatusCodes.OK).json({'usuario': usuario, 'token': token})
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
    let igual = await bcrypt.compare(req.body.old_password, usuario.password)
    if (!igual) {
        return res.status(StatusCodes.BAD_REQUEST).json({'msg': 'Contraseña incorrecta'})
    }
    let usuario_modificado = await conx.put_password(req.body.new_password, req.params.id_usuario)
    if (!usuario_modificado) {
        return res.status(StatusCodes.BAD_REQUEST).json({'msg': 'Error al modificar la contraseña'})
    }
    res.status(StatusCodes.OK).json({'usuario': usuario})
}

const agregar_preferencias = async (req, res = response) => {
    let conx = new conexion_usuario()
    let preferencias = await conx.agregar_preferencias(req.params.id_voluntario, req.body)
    if (!preferencias) {
        return res.status(StatusCodes.BAD_REQUEST).json({'msg': 'Error al agregar las pereferencias.'})
    }
    res.status(StatusCodes.CREATED).json({'msg': 'Preferencias añadidas con éxito.'})
}

const get_solicitudes_organizacion = async (req, res = response) => {
    let conx = new conexion_usuario()
    let conx_voluntariado = new conexion_voluntariado()
    // Sacar los voluntariados de esa organizacion
    let voluntariados = await conx_voluntariado.get_voluntariados_organizacion(req.params.id_usuario)
    if (!voluntariados) {
        return res.status(StatusCodes.BAD_REQUEST).json({'msg': 'Error al obtener los voluntariados.'})
    }

    // Sacar las solicitudes de esos voluntariados
    let solicitudes = await conx.get_solicitudes_organizacion(voluntariados)
    if (!solicitudes) {
        return res.status(StatusCodes.BAD_REQUEST).json({'msg': 'Error al obtener los voluntariados.'})
    }
    res.status(StatusCodes.OK).json({'solicitudes': solicitudes})
}

const get_solicitud = async (req, res = response) => {
    let conx = new conexion_usuario()
    let solicitud = await conx.get_solicitud(req.params.id_solicitud)
    if (!solicitud) {
        return res.status(StatusCodes.BAD_REQUEST).json({'msg': 'Error al obtener la solicitud.'})
    }
    res.status(StatusCodes.OK).json({'solicitudes': solicitud})
}

const responder_solicitud = async (req, res = response) => {
    let conx = new conexion_usuario()
    let conx_estados = new conexion_estados()
    let mensaje_respuesta = req.body.mensaje
    let id_solicitud = req.params.id_solicitud
    let estado_aceptado = await conx_estados.get_estado('aceptada')
    let estado_rechazado = await conx_estados.get_estado('rechazada')
    let id_estado
    if (req.body.estado === 'aceptar') {
        id_estado = estado_aceptado.id
    } else if (req.body.estado === 'rechazar') {
        id_estado = estado_rechazado.id
    }
    let solicitud = await conx.responder_solicitud(id_estado, mensaje_respuesta, id_solicitud)
    if (!solicitud) {
        return res.status(StatusCodes.BAD_REQUEST).json({'msg': 'Error al responder la solicitud.'})
    }

    res.status(StatusCodes.OK).json({'solicitudes': solicitud})
}

module.exports = {
    get_datos,
    get_comentarios,
    get_solicitudes,
    get_voluntariados,
    get_imagen,
    put_imagen,
    put_usuario,
    put_password,
    agregar_preferencias,
    get_solicitudes_organizacion,
    get_solicitud,
    responder_solicitud
}