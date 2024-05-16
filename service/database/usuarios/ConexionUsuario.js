const Conexion = require('../Conexion')
const model = require('../../models/index')
const bcrypt = require('bcrypt')
const conx = new Conexion()

class ConexionUsuario {

    get_usuarios = async() => {
        let usuarios
        conx.conectar()
        try {
            usuarios = await model.Usuario.findAll()
        } catch (err) {
            usuarios = null
        } finally {
            conx.desconectar()
        }
        return usuarios
    }
    /**
     * @desc Obtiene un usuario por id
     * @param id
     * @returns {Promise<Model>}
     */
    put_password = async (password, id) => {
        conx.conectar()
        let usuario
        let password_crypt = await bcrypt.hash(password, 10)
        console.log(password_crypt)
        try {
            usuario = await model.Usuario.update({password:password_crypt}, {where:{id:id}})
        } catch (err) {
            console.log(err)
            usuario = null
        } finally {
            conx.desconectar()
        }
        return usuario
    }
    put_usuario = async (body,id) => {
        conx.conectar()
        let usuario
        try {
            await model.Usuario.update(body, {where:{id:id}})
            usuario = await model.Usuario.findByPk(id)
        } catch (err) {
            console.log(err)
            usuario = null
        } finally {
            conx.desconectar()
        }
        return usuario
    }

    asignar_imagen = async (id, nombre, extension) => {
        let usuario
        conx.conectar()
        try {
            await model.Usuario.update({nombre_foto:nombre,extension_foto:extension}, {where:{id:id,activo:true}})
            usuario = await model.Usuario.findByPk(id)
        } catch (err) {
            console.log(err)
            usuario = null
        } finally {
            conx.desconectar()
        }
        return usuario
    }
    get_voluntariados = async (id) => {
        conx.conectar()
        let voluntariados
        try {
            voluntariados = await model.participante_voluntariado.findAll({
                where: { id_usuario: id },
                include: [{
                    model: model.voluntariado,
                    as: 'voluntariado',
                    attributes: ['titulo', 'descripcion', 'ubicacion', 'fecha_inicio', 'fecha_fin', 'enlace', 'modalidad', 'activo']
                }]
            });
        } catch (error) {
            voluntariados = null;
        } finally {
            conx.desconectar()
        }
        return voluntariados
    }

    get_solicitudes = async (id) => {
        conx.conectar()
        let solicitudes
        try {
            solicitudes = await model.solicitud_voluntariado.findAll({
                where: { id_usuario: id },
                include: [{
                    model: model.voluntariado,
                    as: 'voluntariado',
                    attributes: ['titulo', 'descripcion', 'ubicacion', 'fecha_inicio', 'fecha_fin', 'enlace', 'modalidad', 'activo']
                }, {
                    model: model.estado_solicitud,
                    as: 'estado',
                    attributes: ['estado']
                }]
            });

        } catch (error) {
            console.log(error)
            solicitudes = null
        } finally {
            conx.desconectar()
        }
        return solicitudes
    }

    get_comentarios = async (id) => {
        conx.conectar();
        let comentarios;
        try {
            comentarios = await model.Comentario_usuario.findAll({
                where: {
                    id_usuario_comentado: id
                },
                include: [{
                    model: model.Usuario,
                    as: 'usuario_comenta',
                    attributes: ['id', 'email', 'username', 'ubicacion', 'nombre_foto', 'extension_foto', 'activo']
                }]
            });
        } catch (err) {
            console.log(err);
            comentarios = null;
        } finally {
            conx.desconectar();
        }
        return comentarios;
    };

    get_usuario = async (id) => {
        let usuario
        conx.conectar()
        try {
            usuario = await model.Usuario.findByPk(id, {where: {activo: 1}})
        } catch (err) {
            usuario = null
        } finally {
            conx.desconectar()
        }
        return usuario
    }

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
            usuario = await model.Usuario.findOne({where: {email: email}})
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
            usuario = await model.Usuario.findOne({where: {username: username}})
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
                where: {id: id},
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
            usuario = await model.Usuario.findAll({where: {email: email, activo: 1}})
        } catch (error) {
            console.error(error)
        } finally {
            conx.desconectar()
            if (usuario.length !== 0) {
                throw new CustomError('Correo electrónico ya en uso')
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
            usuario = await model.Usuario.findAll({where: {username: username, activo: 1}})
        } catch (error) {
            console.error(error)
        } finally {
            conx.desconectar()
            if (usuario.length !== 0) {
                throw new CustomError('Nombre de usuario ya en uso')
            }
        }
        return usuario
    }
}

module.exports = ConexionUsuario