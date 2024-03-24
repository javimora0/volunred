'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class categoria extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  categoria.init({
    categoria: DataTypes.STRING,
    descripcion: DataTypes.STRING,
    nombre_imagen: DataTypes.STRING,
    extension_imagen: DataTypes.STRING,
    activa: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'categoria',
    tableName: 'categorias'
  });
  return categoria;
};