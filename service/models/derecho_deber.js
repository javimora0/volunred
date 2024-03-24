'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class derecho_deber extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }

    derecho_deber.init({
        id_tipo: DataTypes.INTEGER,
        descripcion: DataTypes.STRING,
        activo: DataTypes.BOOLEAN
    }, {
        sequelize,
        modelName: 'derecho_deber',
        tableName: 'derechos_deberes'
    });
    return derecho_deber;
};