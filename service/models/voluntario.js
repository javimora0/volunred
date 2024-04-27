'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Voluntario extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }

    Voluntario.init({
        nombre: DataTypes.STRING,
        apellidos: DataTypes.STRING,
        fecha_nacimiento: DataTypes.DATE,
        dni_nie: DataTypes.STRING,
        telefono: DataTypes.INTEGER,
        media_calificaciones: DataTypes.INTEGER,
        id_usuario: DataTypes.INTEGER,
        activo: DataTypes.BOOLEAN
    }, {
        sequelize,
        modelName: 'Voluntario',
        tableName: 'voluntarios'
    });
    return Voluntario;
};