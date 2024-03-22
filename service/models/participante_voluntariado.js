'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class participante_voluntariado extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  participante_voluntariado.init({
    id_usuario: DataTypes.INTEGER,
    id_voluntariado: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'participante_voluntariado',
    tableName: 'participantes_voluntariados'
  });
  return participante_voluntariado;
};