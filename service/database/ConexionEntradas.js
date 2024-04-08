const Conexion = require('./Conexion')
const model = require('../models')
const conx = new Conexion()

class ConexionEntradas {
    /**
     * @desc Crea una nueva entrada
     * @param body
     * @returns {Promise<null>}
     */

    crear_entrada = async (body) => {
        let entrada
        body.activa = true
        body.nombre_foto = 'foto_entrada_defecto'
        body.extension_foto = '.jpg'
        conx.conectar()
        try {
            entrada = await model.entrada.create(body)
        } catch (err) {
            entrada = null
        } finally {
            conx.desconectar()
        }
        return entrada
    }

    /**
     * @desc Obtiene el tipo de entrada segun parametro
     * @param tipo
     * @returns {Promise<Model>}
     */
    get_tipo_entrada = async (tipo) => {
        let tipo_entrada
        conx.conectar()
        try {
            tipo_entrada = await model.tipo_entrada.findOne({where: {tipo: tipo}})
        } catch (err) {
            tipo_entrada = null
        } finally {
            conx.desconectar()
        }
        return tipo_entrada
    }

    /**
     * @desc Obtiene el tipo de entrada por id
     * @param id_tipo
     * @returns {Promise<*[]>}
     */
    get_tipo_entrada_id = async (id_tipo) => {
        let tipo_entrada = []
        conx.conectar()
        try {
            tipo_entrada = await model.tipo_entrada.findAll({where: {id: id_tipo}})
        } catch (err) {
            tipo_entrada = null
        } finally {
            conx.desconectar()
            if (tipo_entrada.length === 0) {
                throw new CustomError('No existe el tipo de entrada')
            }
        }
        return tipo_entrada
    }

    /**
     * @desc Obtiene las entradas del tipo que entre en parametro
     * @param id_tipo
     * @returns {Promise<Model>}
     */
    get_entradas_tipo = async (id_tipo) => {
        let entrada_retornar
        conx.conectar()
        try {
            entrada_retornar = await model.entrada.findAll({where: {id_tipo_entrada: id_tipo, activa: true}})
        } catch (err) {
            entrada_retornar = null
        } finally {
            conx.desconectar()
        }
        return entrada_retornar
    }
    /**
     * @desc Borra una entrada
     * @param id_entrada
     * @returns {Promise<*>}
     */
    delete_entrada = async (id_entrada) => {
        let entrada_borrar
        conx.conectar()
        try {
            entrada_borrar = await model.entrada.update({activa: false}, {
                where: {
                    id: id_entrada
                }
            })
        } catch (err) {
            entrada_borrar = null
        } finally {
            conx.desconectar()
        }
        return entrada_borrar
    }
}

module.exports = ConexionEntradas