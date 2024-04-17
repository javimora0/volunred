const {response} = require('express')
const conexion_cat_voluntariado = require('../database/ConexionCategoriasVoluntariado')
const {StatusCodes} = require("http-status-codes");
const path = require("path");
const {subir_archivo} = require("../helpers/subir_archivo");
const conx = new conexion_cat_voluntariado()

/**
 * @desc Obtiene todas las categorias
 * @param req
 * @param res
 * @returns {Promise<e.Response<any, Record<string, any>>>}
 */
const get_categorias = async (req, res = response) => {
    const categorias = await conx.get_categorias()
    if (!categorias) {
        return res.status(StatusCodes.BAD_REQUEST).json({'msg':'Error al obtener las categorias de los voluntariados'})
    }
    res.status(StatusCodes.OK).json({'categorias':categorias})
}

/**
 * @desc Crea una categoria
 * @param req
 * @param res
 * @returns {Promise<e.Response<any, Record<string, any>>>}
 */
const crear_categoria = async (req, res = response) => {
    req.body.activa = 1
    req.body.nombre_imagen = 'categoria_img_default'
    req.body.extension_imagen = '.jpg'
    const categoria = await conx.crear_categoria(req.body)
    if (!categoria) {
        return res.status(StatusCodes.BAD_REQUEST).json({'msg':'Error al obtener las categorías de los voluntariados'})
    }
    res.status(StatusCodes.CREATED).json({'categoria':categoria})
}

/**
 * @desc Borra una categoria, softdelete
 * @param req
 * @param res
 * @returns {Promise<e.Response<any, Record<string, any>>>}
 */
const borrar_categoria = async (req, res = response) => {
    const categoria = await conx.borrar_categoria(req.params.id_categoria)
    if (!categoria) {
        return res.status(StatusCodes.BAD_REQUEST).json({'msg':'Error al eliminar la categoría'})
    }
    res.status(StatusCodes.OK).json({'categoria':categoria})
}
/**
 * @desc Modifica una categoria
 * @param req
 * @param res
 * @returns {Promise<e.Response<any, Record<string, any>>>}
 */
const modificar_categoria = async (req, res = response) => {
    const categoria = await conx.modificar_categoria(req.params.id_categoria, req.body)
    if (!categoria) {
        return res.status(StatusCodes.BAD_REQUEST).json({'msg':'Error al modificar la categoría'})
    }
    res.status(StatusCodes.OK).json({'categoria':categoria})
}

/**
 * @desc Obtiene la imagen de una categoria
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
const get_imagen = async (req, res = response) => {
    let categoria = await conx.get_categoria(req.params.id_categoria)
    let nombre_foto = categoria.nombre_imagen + categoria.extension_imagen
    if (nombre_foto) {
        const path_img = path.join(__dirname, '../uploads', 'imgs_categorias', nombre_foto)
        if (path_img) {
            return res.sendFile(path_img)
        }
    }
    const path_img = path.join(__dirname, '../uploads', 'imgs_categorias', 'categoria_img_default.jpg')
    res.sendFile(path_img);
}

const put_imagen = async (req, res = response) => {
    const archivo = await subir_archivo(req.files, undefined, 'imgs_categorias')
    if (!archivo) {
        return res.status(StatusCodes.BAD_REQUEST).json({'msg': 'Error al subir el archivo a local'})
    }
    let categoria = await conx.asignar_imagen(req.params.id_categoria, archivo[0], archivo[1])
    if (!categoria) {
        return res.status(StatusCodes.BAD_REQUEST).json({'msg':'Error al subir la imagen'})
    }
    res.status(StatusCodes.OK).json({'entrada': categoria})
}
module.exports = {
    get_categorias,
    crear_categoria,
    borrar_categoria,
    modificar_categoria,
    get_imagen,
    put_imagen
}