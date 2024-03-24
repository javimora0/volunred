'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class categoria_voluntariado extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  categoria_voluntariado.init({
    id_voluntariado: DataTypes.INTEGER,
    id_categoria: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'categoria_voluntariado',
    tableName: 'categorias_voluntariados'
  });
  return categoria_voluntariado;
};