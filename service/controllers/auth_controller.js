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
    let {roles_usuario, token} = await get_token(voluntario, usuario)
    res.status(StatusCodes.CREATED).json({
        'usuario': usuario,
        'vol_org': voluntario,
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

    let {roles_usuario, token} = await get_token(organizacion, usuario)
    res.status(StatusCodes.CREATED).json({
        'usuario': usuario,
        'vol_org': organizacion,
        'roles': roles_usuario[0].roles,
        'token': token
    })
}

const login = async (req, res = response) => {
    const conx_organizacion = new conexion_organizacion()
    const conx_voluntario = new conexion_voluntario()

    let usuario
    // Obtenemos el usuario checkeando credenciales
    usuario = await check_login(req.body.login, req.body.password)
    if (!usuario) {
        return res.status(StatusCodes.NO_CONTENT).json('Error')
    }

    let vol_org = await conx_voluntario.get_voluntario(usuario.id)
    if (!vol_org){
        vol_org = await conx_organizacion.get_organizacion(usuario.id)
        if (!vol_org) {
            return res.status(StatusCodes.NO_CONTENT).json('Error')
        }
    }

    // Obtener roles usuario y generar token
    let {roles_usuario, token} = await get_token(vol_org, usuario)

    res.status(StatusCodes.OK).json({
        'usuario': usuario,
        'vol_org': vol_org,
        'roles': roles_usuario[0].roles,
        'token': token
    })

}




// TODO: Meter estas funciones en utils
// -----------------------Funciones auxiliares --------------------------------//
async function get_token(vol_org, usuario) {
    const conx_usuario = new conexion_usuario()
    let roles_usuario = await conx_usuario.get_roles_usuario(usuario.id)
    let token = generar_jwt(usuario, vol_org, roles_usuario[0].roles)
    return {roles_usuario, token}
}

async function check_login(login, password) {
    const conx_usuario = new conexion_usuario()
    let usuario
    if (login.includes('@')) {
        usuario = await conx_usuario.check_credentials_email(login, password)
    } else {
        usuario = await conx_usuario.check_credentials_username(login, password)
    }
    if (!usuario) {
        usuario = null
    }
    return usuario
}

// ------------------------------------------------------------------------------//

module.exports = {
    registro_voluntario,
    registro_organizacion,
    login,
    get_token
}