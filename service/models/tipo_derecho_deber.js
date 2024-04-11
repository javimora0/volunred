'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class tipo_derecho_deber extends Model {
    static associate(models) {
      models.tipo_derecho_deber.hasMany(models.derecho_deber, {
        foreignKey: 'id_tipo'
      });
    }
  }
  tipo_derecho_deber.init({
    nombre: DataTypes.STRING,
    activo: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'tipo_derecho_deber',
    tableName:'tipos_derechos_deberes'
  });
  return tipo_derecho_deber;
};