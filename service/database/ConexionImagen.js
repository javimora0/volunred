const Conexion = require('./Conexion')
const model = require('../models')
const conx = new Conexion()

class ConexionImagen {
    subir_imagen = async (body) => {
        let resultado
        conx.conectar()
        try {
            resultado = await model.imagen.create({ nombre: body[0], extension: body[1] })
        } catch (error) {
            resultado = null
        } finally {
            conx.desconectar()
        }
        return resultado
    }
}

module.exports = ConexionImagen