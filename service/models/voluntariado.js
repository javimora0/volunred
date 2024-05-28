'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class voluntariado extends Model {
        static associate(models) {
            this.belongsTo(models.categoria, {
                foreignKey: 'id_categoria',
                as: 'categoria'
            });
        }
    }

    voluntariado.init({
        titulo: DataTypes.STRING,
        id_usuario: DataTypes.INTEGER,
        id_categoria: DataTypes.INTEGER,
        enlace: DataTypes.STRING,
        descripcion: DataTypes.TEXT,
        ubicacion: DataTypes.STRING,
        fecha_inicio: DataTypes.DATE,
        fecha_fin: DataTypes.DATE,
        finalizado: DataTypes.BOOLEAN,
        nombre_portada: DataTypes.STRING,
        extension_portada: DataTypes.STRING,
        modalidad: DataTypes.STRING,
        activo: DataTypes.BOOLEAN
    }, {
        sequelize,
        modelName: 'voluntariado',
        tableName: 'voluntariados'
    });
    return voluntariado;
};