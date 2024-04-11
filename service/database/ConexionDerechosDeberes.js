const Conexion = require('./Conexion')
const model = require('../models/index')
const conx = new Conexion()

class ConexionDerechosDeberes {
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
}

module.exports = ConexionDerechosDeberes