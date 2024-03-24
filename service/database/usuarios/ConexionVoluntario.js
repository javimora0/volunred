const Conexion = require('../Conexion')
const model = require('../../models/index')
const conx = new Conexion()

class ConexionVoluntario {

    /**
     * @desc Crea un voluntario, necesario haber creado antes un usuario.
     * @param body
     * @param id_usuario
     * @returns {Promise<null>}
     */
    crear_voluntario = async (body, id_usuario) => {
        conx.conectar()
        let voluntario
        try {
            body.id_usuario = id_usuario
            body.media_calificaciones = 0
            voluntario = await model.Voluntario.create(body)
        } catch (err) {
            voluntario = null
        } finally {
            conx.desconectar()
        }
        return voluntario
    }

    dni_nie_existe_validator = async (dni_nie) => {
        conx.conectar()
        let voluntario = [];
        try {
            voluntario = await model.Voluntario.findAll({where:{dni_nie:dni_nie}})
        } catch (error) {
            console.error(error)
        } finally {
            conx.desconectar()
            if (voluntario.length !== 0) {
                throw new CustomError('Ya existe el dni o el nie')
            }
        }
        return voluntario
    }

    telefono_existe_validator = async (telefono) => {
        conx.conectar()
        let voluntario = [];
        try {
            voluntario = await model.Voluntario.findAll({where:{telefono:telefono}})
        } catch (error) {
            console.error(error)
        } finally {
            conx.desconectar()
            if (voluntario.length !== 0) {
                throw new CustomError('Ya existe el telefono')
            }
        }
        return voluntario
    }
}

module.exports = ConexionVoluntario