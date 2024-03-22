'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class entrada extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  entrada.init({
    titulo: DataTypes.STRING,
    texto: DataTypes.STRING,
    nombre_foto: DataTypes.STRING,
    extension_foto: DataTypes.STRING,
    id_tipo_entrada: DataTypes.INTEGER,
    activa:DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'entrada',
    tableName:'entradas'
  });
  return entrada;
};