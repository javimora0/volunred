const Conexion = require('./Conexion')
const model = require('../models/index')
const conx = new Conexion()

class ConexionEstadosSolicitudes {
    get_estado = async (nombre_estado) => {
        conx.conectar()
        let estado
        try {
            estado = await model.estado_solicitud.findOne({where:{estado:nombre_estado}})
        } catch (err) {
            estado = null
        } finally {
            conx.desconectar()
        }
        return estado
    }
}

module.exports = ConexionEstadosSolicitudes