const Conexion = require('../Conexion')
const model = require('../../models/index')
const conx = new Conexion()

class ConexionVoluntario {

    put_voluntario = async (body, id) => {
        conx.conectar()
        let voluntario
        try {
            await model.Voluntario.update(body, {where:{id_usuario:id}})
            voluntario = await model.Voluntario.findOne({where:{id_usuario:id}})
        } catch (err) {
            voluntario = null
        } finally {
            conx.desconectar()
        }
        return voluntario
    }

    get_voluntario = async (id_usuario) => {
        conx.conectar()
        let voluntario
        try {
            voluntario = await model.Voluntario.findOne({where:{id_usuario:id_usuario}})
        } catch (err) {
            voluntario = null
        } finally {
            conx.desconectar()
        }
        return voluntario
    }

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
            voluntario = await model.Voluntario.findAll({where: {dni_nie: dni_nie, activo:1}})
        } catch (error) {
            console.error(error)
        } finally {
            conx.desconectar()
            if (voluntario.length !== 0) {
                throw new CustomError('DNI o NIE ya registrado')
            }
        }
        return voluntario
    }

    telefono_existe_validator = async (telefono) => {
        conx.conectar()
        let voluntario = [];
        try {
            voluntario = await model.Voluntario.findAll({where: {telefono: telefono, activo:1}})
        } catch (error) {
            console.error(error)
        } finally {
            conx.desconectar()
            if (voluntario.length !== 0) {
                throw new CustomError('Número de telefono ya en uso')
            }
        }
        return voluntario
    }
}

module.exports = ConexionVoluntario