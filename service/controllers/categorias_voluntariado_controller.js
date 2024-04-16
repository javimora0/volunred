const {response} = require('express')
const conexion_cat_voluntariado = require('../database/ConexionCategoriasVoluntariado')
const {StatusCodes} = require("http-status-codes");
const conx = new conexion_cat_voluntariado()

const get_categorias = async (req, res = response) => {
    const categorias = await conx.get_categorias()
    if (!categorias) {
        return res.status(StatusCodes.BAD_REQUEST).json({'msg':'Error al obtener las categorias de los voluntariados'})
    }
    res.status(StatusCodes.OK).json({'categorias':categorias})
}

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

const borrar_categoria = async (req, res = response) => {
    const categoria = await conx.borrar_categoria(req.params.id_categoria)
    if (!categoria) {
        return res.status(StatusCodes.BAD_REQUEST).json({'msg':'Error al eliminar la categoría'})
    }
    res.status(StatusCodes.OK).json({'categoria':categoria})
}
const modificar_categoria = async (req, res = response) => {
    const categoria = await conx.modificar_categoria(req.params.id_categoria, req.body)
    if (!categoria) {
        return res.status(StatusCodes.BAD_REQUEST).json({'msg':'Error al modificar la categoría'})
    }
    res.status(StatusCodes.OK).json({'categoria':categoria})
}
module.exports = {
    get_categorias,
    crear_categoria,
    borrar_categoria,
    modificar_categoria
}