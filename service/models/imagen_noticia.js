'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class imagen_noticia extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  imagen_noticia.init({
    id_imagen: DataTypes.INTEGER,
    id_noticia: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'imagen_noticia',
    tableName: 'imagenes_noticias'
  });
  return imagen_noticia;
};