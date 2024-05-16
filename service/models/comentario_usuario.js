'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Comentario_usuario extends Model {
    static associate(models) {
      this.belongsTo(models.Usuario, {
        foreignKey: 'id_usuario_comenta',
        as: 'usuario_comenta'
      });

      this.belongsTo(models.Usuario, {
        foreignKey: 'id_usuario_comentado',
        as: 'usuario_comentado'
      });
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