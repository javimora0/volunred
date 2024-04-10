const Conexion = require('./Conexion')
const model = require('../models')
const conx = new Conexion()

class ConexionEntradas {

    /**
     * @desc Modificar la imagen de una entrada
     * @param id_entrada
     * @param nombre
     * @param extension
     * @returns {Promise<[affectedCount: number, affectedRows: Model[]]>}
     */
    asignar_imagen = async (id_entrada, nombre, extension) => {
        let entrada
        conx.conectar()
        try {
            await model.entrada.update({nombre_foto:nombre,extension_foto:extension}, {where:{id:id_entrada,activa:true}})
            entrada = await model.entrada.findByPk(id_entrada)
        } catch (err) {
            entrada = null
        } finally {
            conx.desconectar()
        }
        return entrada
    }
    /**
     * @desc Obtiene los tipos de entradas
     * @returns {Promise<Model[]>}
     */
    get_tipos_entradas = async () => {
        let tipos
        conx.conectar()
        try {
            tipos = await model.tipo_entrada.findAll()
        } catch (err) {
            console.error(err)
            tipos = null
        } finally {
            conx.desconectar()
        }
        return tipos
    }
    /**
     * @desc Obtiene una entrada por su id
     * @param id_entrada
     * @returns {Promise<Model[]>}
     */
    get_entrada = async (id_entrada) => {
        let entrada
        conx.conectar()
        try {
            entrada = await model.entrada.findAll({where: {id: id_entrada, activa: true}})
        } catch (err) {
            entrada = null
        } finally {
            conx.desconectar()
        }
        return entrada
    }
    /**
     * @desc Modifica una entrada
     * @param body
     * @param id_entrada
     * @returns {Promise<[affectedCount: number, affectedRows: Model[]]>}
     */
    modificar_entrada = async (body, id_entrada) => {
        let entrada
        conx.conectar()
        try {
            await model.entrada.update(body, {where: {id: id_entrada, activa: true}})
            entrada = await model.entrada.findByPk(id_entrada)
        } catch (err) {
            entrada = null
        } finally {
            conx.desconectar()
        }
        return entrada
    }

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