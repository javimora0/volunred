'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class imagen_voluntariado extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  imagen_voluntariado.init({
    id_imagen: DataTypes.INTEGER,
    id_voluntariado: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'imagen_voluntariado',
    tableName: 'imagenes_voluntariados'
  });
  return imagen_voluntariado;
};