const Conexion = require('../Conexion')
const model = require('../../models')
const conx = new Conexion()

class ConexionUsuario {
    /**
     * @desc Comprueba un usuario por su email
     * @param email
     * @returns {Promise<*[]>}
     */
    email_existe_validator = async (email) => {
        conx.conectar()
        let usuario = [];
        try {
            usuario = await model.Usuario.find({where:{email:email}})
        } catch (error) {
            console.error(error)
        } finally {
            conx.desconectar()
            if (usuario.length !== 0) {
                throw new CustomError('Ya existe el email')
            }
        }

        return usuario
    }
    /**
     * @desc Comprueba en la bbdd si existe algun usuario con el mismo username
     * @param username
     * @returns {Promise<*[]>}
     */
    username_existe_validator = async (username) => {
        conx.conectar()
        let usuario = [];
        try {
            usuario = await model.Usuario.find({where:{username:username}})
        } catch (error) {
            console.error(error)
        } finally {
            conx.desconectar()
            if (usuario.length !== 0) {
                throw new CustomError('Ya existe el username')
            }
        }
        return usuario
    }
}

module.exports = ConexionUsuario