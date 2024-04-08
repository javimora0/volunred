const {response} = require('express')
const {StatusCodes} = require("http-status-codes");
const conexion_entradas = require('../database/ConexionEntradas')
const conexion_imagenes = require('../database/ConexionImagen')

const { subir_archivo } = require('../helpers/subir_archivo')

/**
 * @desc Obtiene las entradas 'hazte voluntario'
 * @param req
 * @param res
 * @returns {Promise<e.Response<any, Record<string, any>>>}
 */
const get_hazte_voluntario = async (req, res = response) => {
    const conx_entradas = new conexion_entradas()
    let tipo_hazte_voluntario = await conx_entradas.get_tipo_entrada('hazte_voluntario')
    if (!tipo_hazte_voluntario) {
        return res.status(StatusCodes.BAD_REQUEST).json({'msg': 'Error en el tipo de entrada'})
    }
    let entradas = await conx_entradas.get_entradas_tipo(tipo_hazte_voluntario.dataValues.id)
    if (!entradas) {
        return res.status(StatusCodes.BAD_REQUEST).json({'msg': 'Error en la entrada'})
    }
    res.status(StatusCodes.OK).json({'entradas': entradas})
}

/**
 * @desc Obtiene las entradas de tipo quienes somos
 * @param req
 * @param res
 * @returns {Promise<e.Response<any, Record<string, any>>>}
 */
const get_quienes_somos = async (req, res = response) => {
    const conx_entradas = new conexion_entradas()
    let tipo_quienes_somos = await conx_entradas.get_tipo_entrada('quienes_somos')
    if (!tipo_quienes_somos) {
        return res.status(StatusCodes.BAD_REQUEST).json({'msg': 'Error en el tipo de entrada'})
    }
    let entradas = await conx_entradas.get_entradas_tipo(tipo_quienes_somos.dataValues.id)
    if (!entradas) {
        return res.status(StatusCodes.BAD_REQUEST).json({'msg': 'Error en la entrada'})
    }
    res.status(StatusCodes.OK).json({'entradas': entradas})
}

/**
 * @desc Soft delete de una entrada
 * @param req
 * @param res
 * @returns {Promise<e.Response<any, Record<string, any>>>}
 */
const delete_entrada = async (req, res = response) => {
    const conx_entradas = new conexion_entradas()
    let entrada = await conx_entradas.delete_entrada(req.params.id)
    if (!entrada) {
        return res.status(StatusCodes.BAD_REQUEST).json({'msg': 'Error al borrar la entrada'})
    }
    res.status(StatusCodes.OK).json({'msg': 'Entrada borrada correctamente'})
}

/**
 * @desc Crea una nueva entrada.
 * @param req
 * @param res
 * @returns {Promise<e.Response<any, Record<string, any>>>}
 */
const crear_entrada = async (req, res = response) => {
    const conx_entradas = new conexion_entradas()
    let entrada = await conx_entradas.crear_entrada(req.body)
    if (!entrada) {
        return res.status(StatusCodes.BAD_REQUEST).json({'msg': 'Error al crear la entrada'})
    }
    res.status(StatusCodes.CREATED).json({'msg': 'Entrada creada correctamente'})
}

/**
 * @desc Modifica una entrada
 * @param req
 * @param req.params.id_entrada
 * @param req.body
 * @param res
 * @returns {Promise<e.Response<any, Record<string, any>>>}
 */
const modificar_entrada = async (req, res = response) => {
    const conx_entradas = new conexion_entradas()
    let entrada = await conx_entradas.modificar_entrada(req.body, req.params.id_entrada)
    if (!entrada) {
        return res.status(StatusCodes.BAD_REQUEST).json({'msg': 'Error al modificar la entrada'})
    }
    res.status(StatusCodes.OK).json({'entrada': entrada})
}

/**
 * @desc Obtiene los tipos de entradas existentes
 * @param req
 * @param res
 * @returns {Promise<e.Response<any, Record<string, any>>>}
 */
const get_tipos = async (req, res = response) => {
    const conx_entradas = new conexion_entradas()
    let tipos_entradas = await conx_entradas.get_tipos_entradas()
    if (!tipos_entradas) {
        return res.status(StatusCodes.BAD_REQUEST).json({'msg': 'Error al obtener los tipos de entradas'})
    }
    res.status(StatusCodes.OK).json({'tipos_entradas': tipos_entradas})
}

/**
 * @desc Modificar la imagen de una entrada
 * @param req
 * @param res
 * @returns {Promise<e.Response<any, Record<string, any>>>}
 */
const put_imagen = async (req, res = response) => {
    //Subir imagen a local
    const archivo = await subir_archivo(req.files, undefined, 'imgs_entradas')
    if (!archivo) {
        return res.status(StatusCodes.BAD_REQUEST).json({'msg': 'Error al subir el archivo a local'})
    }
    // asignar la imagen a la entrada
    let conx_entradas = new conexion_entradas()
    let entrada = await conx_entradas.asignar_imagen(req.params.id_entrada, archivo[0], archivo[1])
    if (!entrada) {
        return res.status(StatusCodes.BAD_REQUEST).json({'msg':'Error al subir la imagen'})
    }
    res.status(StatusCodes.OK).json({'entrada': entrada})
}

module.exports = {
    get_hazte_voluntario,
    get_quienes_somos,
    delete_entrada,
    crear_entrada,
    modificar_entrada,
    get_tipos,
    put_imagen
}