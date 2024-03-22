const Conexion = require('../Conexion')
const model = require('../../models')
const conx = new Conexion()

class ConexionVoluntario {

    dni_nie_existe_validator = async (dni_nie) => {
        conx.conectar()
        let voluntario = [];
        try {
            voluntario = await model.Voluntario.find({where:{dni_nie:dni_nie}})
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
            voluntario = await model.Voluntario.find({where:{telefono:telefono}})
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