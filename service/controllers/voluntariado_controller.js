const {response} = require('express')
const conx_voluntariado = require('../database/ConexionVoluntariado')
const conx_voluntario = require('../database/usuarios/ConexionVoluntario')
const conx_user = require('../database/usuarios/ConexionUsuario')
const conx_ambitos = require('../database/ConexionAmbitos')
const conx_cat_voluntariados = require('../database/ConexionCategoriasVoluntariado')
const {StatusCodes} = require("http-status-codes");
const conx = new conx_voluntariado()
const conx_cat = new conx_cat_voluntariados()

const get_recomendaciones = async (req, res = response) => {
    const conx_vol = new conx_voluntario()
    const conx_usuario = new conx_user()
    const conexion_ambitos = new conx_ambitos()

    // Obtenemos el voluntario
    const voluntario = await conx_vol.get_voluntario_id(req.params.id_voluntario)
    if (!voluntario) {
        return res.status(StatusCodes.BAD_REQUEST).json({'msg': 'Error al obtener el voluntario'})
    }

    // Obtenemos el usuario
    const usuario = await conx_usuario.get_usuario(voluntario.id_usuario)
    if (!usuario) {
        return res.status(StatusCodes.BAD_REQUEST).json({'msg': 'Error al obtener el usuario'})
    }

    // Obtenemos las preferencias del voluntario
    const preferencias_voluntario = await conx.get_preferencias(req.params.id_voluntario)
    if (!preferencias_voluntario) {
        return res.status(StatusCodes.BAD_REQUEST).json({'msg': 'Error al obtener las preferencias del usuario'})
    }

    // Recoger ambitos_voluntarios
    let ambitos_voluntario = await conexion_ambitos.get_ambitos_voluntario(voluntario.id)
    let voluntariados = await conx.get_voluntariados_especificos(usuario.ubicacion, ambitos_voluntario['ambitos_voluntarios'])
    res.status(StatusCodes.OK).json({'voluntariados': voluntariados.voluntariados_especificos})
}

const get_recomendaciones_automaticas = async (req, res = response) => {
    const conx_vol = new conx_voluntario()
    const conx_usuario = new conx_user()
    // Obtenemos el voluntario
    const voluntario = await conx_vol.get_voluntario_id(req.params.id_voluntario)
    if (!voluntario) {
        return res.status(StatusCodes.BAD_REQUEST).json({'msg': 'Error al obtener el voluntario'})
    }

    // Obtenemos el usuario
    const usuario = await conx_usuario.get_usuario(voluntario.id_usuario)
    if (!usuario) {
        return res.status(StatusCodes.BAD_REQUEST).json({'msg': 'Error al obtener el usuario'})
    }
    // Obtenemos las preferencias del voluntario
    const preferencias_voluntario = await conx.get_preferencias(req.params.id_voluntario)
    if (!preferencias_voluntario) {
        return res.status(StatusCodes.BAD_REQUEST).json({'msg': 'Error al obtener las preferencias del usuario'})
    }

    let edad_voluntario = get_edad_voluntario(voluntario.fecha_nacimiento)
    let categorias = await conx_cat.get_categorias()
    let ambitos = []
    if (edad_voluntario >= 18 && edad_voluntario <= 24) {
        // Jovenes
        ambitos.push(categorias.find((categoria) => categoria.categoria === 'deportivo'))
        if (!preferencias_voluntario.experiencia) {
            // Sin experiencia
            ambitos.push(categorias.find((categoria) => categoria.categoria === 'comunitario'))
            if (preferencias_voluntario.disponibilidad === 'online') {
                // Online
                ambitos.push(categorias.find((categoria) => categoria.categoria === 'internacional'))
            } else if (preferencias_voluntario.disponibilidad === 'presencial') {
                // presencial
                ambitos.push(categorias.find((categoria) => categoria.categoria === 'protección civil'))
                ambitos.push(categorias.find((categoria) => categoria.categoria === 'ocio y tiempo libre'))
                ambitos.push(categorias.find((categoria) => categoria.categoria === 'ambiental'))
            } else {
                // ambas
                ambitos.push(categorias.find((categoria) => categoria.categoria === 'ambiental'))
                ambitos.push(categorias.find((categoria) => categoria.categoria === 'protección civil'))
            }
        } else {
            // con experiencia
            ambitos.push(categorias.find((categoria) => categoria.categoria === 'comunitario'))
            ambitos.push(categorias.find((categoria) => categoria.categoria === 'educativo'))
            if (preferencias_voluntario.disponibilidad === 'online') {
                // Online
                ambitos.push(categorias.find((categoria) => categoria.categoria === 'internacional'))
                ambitos.push(categorias.find((categoria) => categoria.categoria === 'socio-sanitario'))
            } else if (preferencias_voluntario.disponibilidad === 'presencial') {
                // presencial
                ambitos.push(categorias.find((categoria) => categoria.categoria === 'ambiental'))
            } else {
                ambitos.push(categorias.find((categoria) => categoria.categoria === 'ambiental'))
                // ambas
            }
        }
    } else {
        //mayor
        ambitos.push(categorias.find((categoria) => categoria.categoria === 'internacional'))
        //ambitos.push('internacional')
        if (preferencias_voluntario.experiencia) {
            // Con experiencia
            ambitos.push(categorias.find((categoria) => categoria.categoria === 'socio-sanitario'))
            if (preferencias_voluntario.disponibilidad === 'online') {
                // Online
                ambitos.push(categorias.find((categoria) => categoria.categoria === 'cultural'))
                ambitos.push(categorias.find((categoria) => categoria.categoria === 'educativo'))

            } else if (preferencias_voluntario.disponibilidad === 'presencial') {
                // presencial
                ambitos.push(categorias.find((categoria) => categoria.categoria === 'protección civil'))
            } else {
                // ambas
                ambitos.push(categorias.find((categoria) => categoria.categoria === 'educativo'))
            }
        } else {
            // sin experiencia
            ambitos.push(categorias.find((categoria) => categoria.categoria === 'cultural'))
            ambitos.push(categorias.find((categoria) => categoria.categoria === 'comunitario'))
            if (preferencias_voluntario.disponibilidad === 'presencial') {
                // Presencial
                ambitos.push(categorias.find((categoria) => categoria.categoria === 'ocio y tiempo libre'))
            }
        }
    }
    const voluntariados = await conx.get_voluntariados_array(ambitos)
    if (!voluntariados) {
        return res.status(StatusCodes.BAD_REQUEST).json({'msg':'Error al obtener los voluntariados'})
    }
    res.status(StatusCodes.OK).json(voluntariados)
}

const get_edad_voluntario = (fecha) => {
    const fechaActual = new Date();
    let edad = fechaActual.getFullYear() - fecha.getFullYear();
    if (fechaActual.getMonth() < fecha.getMonth() || (fechaActual.getMonth() === fecha.getMonth() && fechaActual.getDate() < fecha.getDate())) {
        edad--;
    }
    return edad;
}

module.exports = {
    get_recomendaciones,
    get_recomendaciones_automaticas
}