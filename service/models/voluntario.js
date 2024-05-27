'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Voluntario extends Model {

        static associate(models) {
            this.hasMany(models.Ambito_voluntario, {
                foreignKey: 'id_voluntario',
                as: 'ambitos_voluntarios'
            });
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