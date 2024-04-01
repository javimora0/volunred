const Conexion = require('../Conexion')
const model = require('../../models/index')
const conx = new Conexion()

class ConexionEntradas{
    /**
     * @desc Obtiene el tipo de entrada segun parametro
     * @param tipo
     * @returns {Promise<Model>}
     */
    get_tipo_entrada = async (tipo) => {
        let tipo_entrada
        conx.conectar()
        try {
            tipo_entrada = await model.tipo_entrada.findOne({where:{tipo:tipo}})
        } catch (err) {
            tipo_entrada = null
        } finally {
            conx.desconectar()
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
            entrada_retornar = await model.entrada.findAll({where:{id_tipo_entrada:id_tipo, activa:true}})
        } catch (err) {
            entrada_retornar = null
        } finally {
            conx.desconectar()
        }
        return entrada_retornar
    }
}

module.exports = ConexionEntradas