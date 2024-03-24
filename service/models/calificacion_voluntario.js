'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class calificacion_voluntario extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  calificacion_voluntario.init({
    calificacion: DataTypes.INTEGER,
    id_voluntario: DataTypes.INTEGER,
    id_organizacion: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'calificacion_voluntario',
    tableName: 'calificaciones_voluntarios'
  });
  return calificacion_voluntario;
};