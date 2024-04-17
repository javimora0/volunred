const Conexion = require('./Conexion')
const model = require('../models/index')
const conx = new Conexion()

class ConexionCategoriasVoluntariado {
    get_categoria = async (id_categoria) => {
        conx.conectar()
        let categoria
        try {
            categoria = await model.categoria.findByPk(id_categoria,{where: {activa: true}})
        } catch (err) {
            categoria = null
        } finally {
            conx.desconectar()
        }
        return categoria
    }
    get_categorias = async () => {
        conx.conectar()
        let categorias
        try {
            categorias = await model.categoria.findAll({where: {activa: true}})
        } catch (err) {
            categorias = null
        } finally {
            conx.desconectar()
        }
        return categorias
    }
    crear_categoria = async (body) => {
        conx.conectar()
        let categoria
        try {
            categoria = await model.categoria.create(body)
        } catch (err) {
            categoria = null
        } finally {
            conx.desconectar()
        }
        return categoria
    }
    borrar_categoria = async (id_categoria) => {
        conx.conectar()
        let categoria
        try {
            categoria = await model.categoria.update({activa: false}, {where: {id: id_categoria}})
        } catch (err) {
            categoria = null
        } finally {
            conx.desconectar()
        }
        return categoria
    }

    modificar_categoria = async (id_categoria, body) => {
        conx.conectar()
        let categoria
        try {
            await model.categoria.update(body, {where: {id: id_categoria, activa: true}})
            categoria = await model.categoria.findByPk(id_categoria)
        } catch (err) {
            categoria = null
        } finally {
            conx.desconectar()
        }
        return categoria
    }

    asignar_imagen = async (id_categoria, nombre, extension) => {
        let categoria
        conx.conectar()
        try {
            await model.categoria.update({nombre_imagen:nombre, extension_imagen: extension}, {where:{id:id_categoria}})
            categoria = await model.categoria.findByPk(id_categoria)
        } catch (err) {
            categoria = err
        } finally {
            conx.desconectar()
        }
        return categoria
    }
}

module.exports = ConexionCategoriasVoluntariado