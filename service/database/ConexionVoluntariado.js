const Conexion = require('./Conexion')
const model = require('../models/index')
const {Op} = require("sequelize");
const conx = new Conexion()

class ConexionVoluntariado {

    get_preferencias = async (id_voluntario) => {
        let preferencias
        conx.conectar()
        try {
            preferencias = await model.preferencias.findOne({where:{id_voluntario:id_voluntario}})
        } catch (err) {
            console.log(err)
            preferencias = null
        } finally {
            conx.desconectar()
        }
        return preferencias
    }

    get_voluntariados_especificos = async (ubicacion_usuario, vol) => {
        let tipos = []
        for (let i = 0; i < vol.length; i++) {
            tipos.push(vol[i].ambito_profesional.id)
        }
        let voluntariados_especificos
        conx.conectar()
        try {
            voluntariados_especificos = await model.voluntariado.findAll({
                where: {
                    id_categoria: {
                        [Op.in]: tipos
                    },
                    ubicacion: ubicacion_usuario,
                    activo: true,
                    finalizado: false
                }
            });
        } catch (err) {
            voluntariados_especificos = null
        } finally {
            conx.desconectar()
        }
        return {voluntariados_especificos, tipos}
    }

    get_voluntariados_array = async (array) => {
        let categorias_id = []
        for (let i = 0; i < array.length; i++) {
            categorias_id.push(array[i].id)
        }
        let voluntariados_especificos
        conx.conectar()
        try {
            voluntariados_especificos = await model.voluntariado.findAll({
                where: {
                    id_categoria: {
                        [Op.in]: categorias_id
                    },
                    activo: true,
                    finalizado: false
                }
            });
        } catch (err) {
            console.log(err)
            voluntariados_especificos = null
        } finally {
            conx.desconectar()
        }
        return voluntariados_especificos
    }
}
module.exports = ConexionVoluntariado