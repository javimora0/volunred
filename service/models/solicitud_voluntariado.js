'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class solicitud_voluntariado extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
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