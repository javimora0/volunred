'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class voluntariado extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }

    voluntariado.init({
        titulo: DataTypes.STRING,
        id_usuario: DataTypes.INTEGER,
        enlace: DataTypes.STRING,
        descripcion: DataTypes.TEXT,
        ubicacion: DataTypes.STRING,
        fecha_inicio: DataTypes.DATE,
        fecha_fin: DataTypes.DATE,
        finalizado: DataTypes.BOOLEAN,
        nombre_portada: DataTypes.STRING,
        extension_portada: DataTypes.STRING,
        modalidad: DataTypes.STRING,
        activo: DataTypes.BOOLEAN
    }, {
        sequelize,
        modelName: 'voluntariado',
        tableName: 'voluntariados'
    });
    return voluntariado;
};