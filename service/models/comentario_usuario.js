'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Comentario_usuario extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Comentario_usuario.init({
    comentario: DataTypes.STRING,
    id_usuario_comentado: DataTypes.INTEGER,
    id_usuario_comenta: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Comentario_usuario',
    tableName: 'comentarios_usuarios'
  });
  return Comentario_usuario;
};