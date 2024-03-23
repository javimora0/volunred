'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Rol extends Model {
    static associate(models) {
      this.belongsToMany(models.Usuario, { through: models.Rol_usuario, foreignKey: 'id_rol', as: 'users' });
    }
  }
  Rol.init({
    nombre: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Rol',
    tableName: 'roles'
  });
  return Rol;
};