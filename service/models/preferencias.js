'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class preferencias extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  preferencias.init({
    id_voluntario: DataTypes.NUMBER,
    sexo: DataTypes.STRING,
    experiencia: DataTypes.BOOLEAN,
    disponibilidad: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'preferencias',
    tableName: 'preferencias'
  });
  return preferencias;
};