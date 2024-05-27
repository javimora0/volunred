const Conexion = require('./Conexion')
const model = require('../models/index')
const conx = new Conexion()

class ConexionAmbitos {
    get_ambitos_voluntario = async (id_voluntario) => {
        console.log("ENTRO")
        let ambitos
        conx.conectar()
        try {
            ambitos = await model.Voluntario.findOne({
                where: { id: id_voluntario },
                include: [{
                    model: model.Ambito_voluntario,
                    as: 'ambitos_voluntarios',
                    include: [{
                        model: model.Ambito_profesional,
                        as: 'ambito_profesional'
                    }]
                }]
            });
        } catch (error) {
            ambitos = null
        } finally {
            conx.desconectar()
        }
        return ambitos
    }

    get_ambitos = async () => {
        let ambitos
        conx.conectar()
        try {
            ambitos = await model.Ambito_profesional.findAll()
        } catch (err) {
            ambitos = null
        } finally {
            conx.desconectar()
        }
        return ambitos
    }

    asignar_ambitos = async (ambitos, id_usuario) => {
        conx.conectar()
        let retornar
        try {
            for (const ambito of ambitos) {
                //TODO: Crear ambito
                retornar = await model.Ambito_voluntario.create({id_voluntario: id_usuario,id_ambito_profesional:ambito.id})
            }
        } catch (err) {
            retornar = null
        } finally {
            conx.desconectar()
        }
        return ambitos
    }
}

module.exports = ConexionAmbitos