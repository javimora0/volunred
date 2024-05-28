'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class categoria extends Model {

    static associate(models) {
      this.hasMany(models.voluntariado, {
        foreignKey: 'id_categoria',
        as: 'voluntariados'
      });
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