'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class solicitud_voluntariado extends Model {
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
      // Relación con estado_solicitud
      this.belongsTo(models.estado_solicitud, {
        foreignKey: 'id_estado',
        as: 'estado'
      });
    }
  }
  solicitud_voluntariado.init({
    id_usuario: DataTypes.INTEGER,
    id_voluntariado: DataTypes.INTEGER,
    id_estado: DataTypes.INTEGER,
    mensaje_solicitud: DataTypes.STRING,
    mensaje_respuesta: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'solicitud_voluntariado',
    tableName: 'solicitudes_voluntariados'
  });
  return solicitud_voluntariado;
};