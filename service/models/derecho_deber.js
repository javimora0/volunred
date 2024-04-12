'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class derecho_deber extends Model {
        static associate(models) {
            models.derecho_deber.belongsTo(models.tipo_derecho_deber, {
                foreignKey: 'id_tipo'
            });
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