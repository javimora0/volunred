'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class noticia extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  noticia.init({
    titulo: DataTypes.STRING,
    cuerpo: DataTypes.STRING,
    nombre_portada: DataTypes.STRING,
    extension_portada: DataTypes.STRING,
    activa: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'noticia',
    tableName: 'noticias'
  });
  return noticia;
};