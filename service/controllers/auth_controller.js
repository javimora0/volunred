const {response} = require('express')
const conexion_voluntario = require('../database/usuarios/ConexionVoluntario')
const conexion_organizacion = require('../database/usuarios/ConexionOrganizacion')
const conexion_usuario = require('../database/usuarios/ConexionUsuario')
const conexion_rol = require('../database/ConexionRol')
const {StatusCodes} = require("http-status-codes");
const {generar_jwt} = require("../helpers/generate_jwt");

const registro_voluntario = async (req, res = response) => {
    const conx_voluntario = new conexion_voluntario()
    const conx_rol = new conexion_rol()
    const conx_usuario = new conexion_usuario()

    let usuario = await conx_usuario.crear_usuario(req.body)
    if (!usuario) {
        return res.status(StatusCodes.BAD_REQUEST).json({'msg': 'Error al crear el usuario'})
    }

    // Usuario creado, se crea el voluntario
    let voluntario = await conx_voluntario.crear_voluntario(req.body, usuario.id)
    if (!voluntario) {
        return res.status(StatusCodes.BAD_REQUEST).json({'msg': 'Error al crear el voluntario'})
    }

    let rol_asignar = await conx_rol.asingarRol(usuario.id, 'voluntario')
    if (!rol_asignar) {
        return res.status(StatusCodes.BAD_REQUEST).json({'msg': 'Error al asignar el rol'})
    }
    let roles_usuario = await conx_usuario.get_roles_usuario(usuario.id)

    // Generamos el JWT introduciendo el payload
    let token = generar_jwt(usuario, voluntario, roles_usuario[0].roles)
    res.status(StatusCodes.CREATED).json({
        'usuario': usuario,
        'voluntario': voluntario,
        'roles': roles_usuario[0].roles,
        'token': token
    })
}

const registro_organizacion = async (req, res = response) => {
    const conx_organizacion = new conexion_organizacion()
    const conx_rol = new conexion_rol()
    const conx_usuario = new conexion_usuario()

    // Se crea el usuario
    let usuario = await conx_usuario.crear_usuario(req.body)
    if (!usuario) {
        return res.status(StatusCodes.BAD_REQUEST).json({'msg': 'Error al crear el usuario'})
    }

    // Usuario creado, se crea la organizacion
    let organizacion = await conx_organizacion.crear_organizacion(req.body, usuario.id)
    if (!organizacion) {
        return res.status(StatusCodes.BAD_REQUEST).json({'msg': 'Error al crear la organizacion'})
    }

    let rol_asignar = await conx_rol.asingarRol(usuario.id, 'organizacion')
    if (!rol_asignar) {
        return res.status(StatusCodes.BAD_REQUEST).json({'msg': 'Error al asignar el rol'})
    }
    let roles_usuario = await conx_usuario.get_roles_usuario(usuario.id)

    // Generamos el JWT introduciendo el payload
    let token = generar_jwt(usuario, organizacion, roles_usuario[0].roles)
    res.status(StatusCodes.CREATED).json({
        'usuario': usuario,
        'organizacion': organizacion,
        'roles': roles_usuario[0].roles,
        'token': token
    })
}


module.exports = {
    registro_voluntario,
    registro_organizacion
}