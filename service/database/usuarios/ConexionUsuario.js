const Conexion = require('../Conexion')
const model = require('../../models/index')
const bcrypt = require ('bcrypt')
const conx = new Conexion()

class ConexionUsuario {


    /**
     * @desc Comprueba las credenciales por email de un usuario
     * @param email
     * @param password
     * @returns {Promise<Model>}
     */
    check_credentials_email = async (email, password) => {
        let usuario
        conx.conectar()
        try {
            usuario = await model.Usuario.findOne({where:{email:email}})
            if (!usuario) {
                usuario = null
            }
            if (!await bcrypt.compare(password, usuario.password)) {
                usuario = null
            }
        } catch (err) {
            usuario = null
        } finally {
            conx.desconectar()
        }
        return usuario
    }
    /**
     * @desc Comprueba las credenciales de un usuario por su nombre de usuario
     * @param username
     * @param password
     * @returns {Promise<Model>}
     */
    check_credentials_username = async (username, password) => {
        let usuario
        conx.conectar()
        try {
            usuario = await model.Usuario.findOne({where:{username:username}})
            if (!usuario) {
                usuario = null
            }
            if (!await bcrypt.compare(password, usuario.password)) {
                usuario = null
            }
        } catch (err) {
            usuario = null
        } finally {
            conx.desconectar()
        }
        return usuario
    }
    /**
     * @desc Crea un usuario
     * @param body
     * @returns {Promise<null>}
     */
    crear_usuario = async (body) => {
        conx.conectar()
        let usuario
        try {
            body.activo = true
            body.nombre_foto = 'foto_perfil_defecto'
            body.extension_foto = '.jpg'
            body.password = await bcrypt.hash(body.password, 10)
            usuario = await model.Usuario.create(body)

        } catch (err) {
            console.error(err)
            usuario = null
        } finally {
            conx.desconectar()
        }
        return usuario
    }

    /**
     * @desc Obtiene los roles de un usuario
     * @param id
     * @returns {Promise<*[]|null>}
     */
    get_roles_usuario = async (id) => {
        let resultado = []
        conx.conectar()
        try {
            resultado = await model.Usuario.findAll({
                where: { id: id },
                include: [{
                    model: model.Rol,
                    as: 'roles',
                    through: {
                        model: model.Rol_usuario, attributes: []
                    },
                    attributes: ['id', 'nombre']
                }]
            });
        } catch (error) {
            resultado = null
        } finally {
            conx.desconectar()
        }
        return resultado
    }

    /**
     * @desc Comprueba un usuario por su email
     * @param email
     * @returns {Promise<*[]>}
     */
    email_existe_validator = async (email) => {
        conx.conectar()
        let usuario = [];
        try {
            usuario = await model.Usuario.findAll({where:{email:email, activo:1}})
            console.log(usuario)
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
            usuario = await model.Usuario.findAll({where:{username:username, activo:1}})
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