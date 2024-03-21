'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ambito_profesional extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  ambito_profesional.init({
    ambito: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Ambito_profesional',
    tableName: 'ambitos_profesionales'
  });
  return ambito_profesional;
};