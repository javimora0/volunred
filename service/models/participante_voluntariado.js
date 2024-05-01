'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class participante_voluntariado extends Model {
    static associate(models) {
      // Relación con Usuario
      this.belongsTo(models.Usuario, {
        foreignKey: 'id_usuario',
        as: 'usuario'
      });
      // Relación con voluntariado
      this.belongsTo(models.voluntariado, {
        foreignKey: 'id_voluntariado',
        as: 'voluntariado'
      });
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