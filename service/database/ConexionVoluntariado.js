const Conexion = require('./Conexion')
const model = require('../models/index')
const {Op} = require("sequelize");
const conx = new Conexion()

class ConexionVoluntariado {

    post_solicitud = async (id_voluntariado, id_usuario, mensaje, id_estado) => {
        let solicitud
        conx.conectar()
        try {
            solicitud = await model.solicitud_voluntariado.create({
                id_voluntariado: id_voluntariado,
                id_usuario: id_usuario,
                mensaje_solicitud: mensaje,
                id_estado: id_estado,
                mensaje_respuesta: ''
            })
        } catch (err) {
            solicitud = null
        } finally {
            conx.desconectar()
        }
        return solicitud
    }
    get_voluntariado = async (id) => {
        let vol
        conx.conectar()
        try {
            vol = await model.voluntariado.findByPk(id, {
                include: [{
                    model: model.categoria,
                    as: 'categoria',
                    attributes: ['categoria', 'descripcion', 'nombre_imagen', 'extension_imagen', 'activa']
                }]
            })
        } catch (err) {
            console.log(err)
            vol = null
        } finally {
            conx.desconectar()
        }
        return vol
    }

    get_preferencias = async (id_voluntario) => {
        let preferencias
        conx.conectar()
        try {
            preferencias = await model.preferencias.findOne({where: {id_voluntario: id_voluntario}})
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
        console.log(tipos)
        let voluntariados_especificos
        conx.conectar()
        try {
            voluntariados_especificos = await model.voluntariado.findAll({
                where: {
                    [Op.or]: [
                        {id_categoria: {[Op.in]: tipos}},
                        {ubicacion: ubicacion_usuario}
                    ],
                    activo: true,
                    finalizado: false
                },
                include: [{
                    model: model.categoria,
                    as: 'categoria',
                    attributes: ['categoria', 'descripcion', 'nombre_imagen', 'extension_imagen', 'activa']
                }]
            });
        } catch (err) {
            voluntariados_especificos = null
        } finally {
            conx.desconectar()
        }
        return voluntariados_especificos
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
                },
                include: [{
                    model: model.categoria,
                    as: 'categoria',
                    attributes: ['categoria', 'descripcion', 'nombre_imagen', 'extension_imagen', 'activa']
                }]
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