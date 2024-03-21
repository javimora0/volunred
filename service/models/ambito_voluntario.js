'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ambito_voluntario extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  ambito_voluntario.init({
    id_ambito_profesional: DataTypes.INTEGER,
    id_voluntario: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Ambito_voluntario',
    tableName: 'ambitos_voluntarios'
  });
  return ambito_voluntario;
};