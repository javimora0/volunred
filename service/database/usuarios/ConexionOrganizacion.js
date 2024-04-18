const Conexion = require('../Conexion')
const model = require('../../models/index')
const conx = new Conexion()

class ConexionOrganizacion {

    get_organizacion = async (id_usuario) => {
        conx.conectar()
        let org
        try {
            org = await model.Organizacion.findOne({where:{id_usuario:id_usuario}})
        } catch (err) {
            org = null
        } finally {
            conx.desconectar()
        }
        return org
    }

    /**
     * @desc Crea una organizacion
     * @param body
     * @param id_usuario
     * @returns {Promise<null>}
     */
    crear_organizacion = async (body, id_usuario) => {
        conx.conectar()
        let organizacion
        try {
            body.id_usuario = id_usuario
            organizacion = await model.Organizacion.create(body)
        } catch (err) {
            organizacion = null
        } finally {
            conx.desconectar()
        }
        return organizacion
    }

    /**
     * @desc Valida si existe algun cif en la bbdd
     * @param cif
     * @returns {Promise<*[]>}
     */
    cif_existe_validator = async (cif) => {
        conx.conectar()
        let organizacion = [];
        try {
            organizacion = await model.Organizacion.findAll({where:{cif:cif, activo:1}})
        } catch (error) {
            organizacion = null
            console.error(error)
        } finally {
            conx.desconectar()
            if (organizacion.length !== 0) {
                throw new CustomError('Ya existe el cif')
            }
        }
        return organizacion
    }
}

module.exports = ConexionOrganizacion