'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Usuario extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }

    Usuario.init({
        email: DataTypes.STRING,
        password: DataTypes.STRING,
        username: DataTypes.STRING,
        ubicacion: DataTypes.STRING,
        nombre_foto: DataTypes.STRING,
        extension_foto: DataTypes.STRING,
        activo: DataTypes.BOOLEAN,
    }, {
        sequelize,
        modelName: 'Usuario',
        tableName: 'usuarios'
    });
    return Usuario;
};