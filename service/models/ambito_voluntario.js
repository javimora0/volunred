'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ambito_voluntario extends Model {

    static associate(models) {
      this.belongsTo(models.Voluntario, {
        foreignKey: 'id_voluntario',
        as: 'voluntario'
      });
      this.belongsTo(models.Ambito_profesional, {
        foreignKey: 'id_ambito_profesional',
        as: 'ambito_profesional'
      });
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