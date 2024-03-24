const Conexion = require('../database/Conexion')
const model = require('../models/index')
const conx = new Conexion()

class ConexionRol {
    /**
     * @desc Asigna un rol a un usuario
     * @param id_usuario
     * @param nombre_rol
     * @returns {Promise<null>}
     */
    asingarRol = async (id_usuario, nombre_rol) => {
        let rol_asignado
        conx.conectar()
        let rol = await this.get_id_rol(nombre_rol)
        try {
            rol_asignado = await model.Rol_usuario.create({
                id_rol:rol.id,
                id_usuario: id_usuario
            })
        } catch (err) {
            rol_asignado = null
        } finally {
            conx.desconectar()
        }
        return rol_asignado
    }

    /**
     * @desc Obtiene un rol según su nombre
     * @param nombre_rol
     * @returns {Promise<null>}
     */
    get_id_rol = async (nombre_rol) => {
        let rol
        conx.conectar()
        try {
            rol = await model.Rol.findOne({where:{nombre:nombre_rol}})
        } catch (err) {
            rol = null
        } finally {
            conx.desconectar()
        }
        return rol
    }
}

module.exports = ConexionRol