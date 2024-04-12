const Conexion = require('./Conexion')
const model = require('../models/index')
const conx = new Conexion()

class ConexionDerechosDeberes {
    /**
     * @desc Crea un derecho/deber
     * @param body
     * @returns {Promise<Model<any, TModelAttributes>>}
     */
    crear_derecho_deber = async (body) => {
        conx.conectar()
        let derecho_deber
        body.activo = true
        try {
            derecho_deber = await model.derecho_deber.create(body)
        } catch (err) {
            derecho_deber = null
        } finally {
            conx.desconectar()
        }
        return derecho_deber
    }

    modificar_derecho_deber = async (body, id) => {
        conx.conectar()
        let derecho_deber
        body.activo = true
        try {
            await model.derecho_deber.update(body, {where:{id:id, activo:true}})
            derecho_deber = await model.derecho_deber.findByPk(id)
        } catch (err) {
            derecho_deber = null
        } finally {
            conx.desconectar()
        }
        return derecho_deber
    }

    eliminar_derecho_deber = async (id) => {
        conx.conectar()
        let derecho_deber
        body.activo = true
        try {
            await model.derecho_deber.update({activo:false}, {where:{id:id, activo:true}})
            derecho_deber = await model.derecho_deber.findByPk(id)
        } catch (err) {
            derecho_deber = null
        } finally {
            conx.desconectar()
        }
        return derecho_deber
    }

    /**
     * @desc Obtiene todos los derechos
     * @returns {Promise<Model[]>}
     */
    get_derechos = async () => {
        conx.conectar()
        let deberes
        try {
            deberes = await model.derecho_deber.findAll({
                include: [{
                    model: model.tipo_derecho_deber,
                    where: { nombre: 'derecho' }
                }]
            });
        } catch (err) {
            deberes = null
        } finally {
            conx.desconectar()
        }
        return deberes
    }

    /**
     * @desc Obtener todos los deberes
     * @returns {Promise<Model[]>}
     */
    get_deberes = async () => {
        conx.conectar()
        let deber
        try {
            deber = await model.derecho_deber.findAll({
                include: [{
                    model: model.tipo_derecho_deber,
                    where: { nombre: 'deber' }
                }]
            });
        } catch (err) {
            deber = null
        } finally {
            conx.desconectar()
        }
        return deber
    }

    get_tipo_derecho_deber = async (id_tipo) => {
        conx.conectar()
        let tipo = []
        try {
            tipo = await model.tipo_derecho_deber.findAll({where: {id: id_tipo,activo:true}})
        } catch (err) {
            tipo = null
        } finally {
            conx.desconectar()
            if (tipo.length === 0) {
                throw new CustomError('No existe el tipo de entrada')
            }
        }
        return tipo_entrada
    }
}

module.exports = ConexionDerechosDeberes