'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Usuario extends Model {
        static associate(models) {
            this.belongsToMany(models.Rol, {
                through: models.Rol_usuario,
                foreignKey: 'id_usuario',
                as: 'roles'
            });
        }

        toJSON() {
            let values = Object.assign({}, this.get());
            delete values.password; // Excluir la contraseña
            return values;
        }
    }

    Usuario.init({
        email: DataTypes.STRING,
        password: DataTypes.STRING,
        username: DataTypes.STRING,
        ubicacion: DataTypes.STRING,
        nombre_foto: DataTypes.STRING,
        extension_foto: DataTypes.STRING,
        activo: DataTypes.BOOLEAN,
    }, {
        sequelize,
        modelName: 'Usuario',
        tableName: 'usuarios'
    });
    return Usuario;
};