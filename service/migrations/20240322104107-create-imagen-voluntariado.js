'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('imagenes_voluntariados', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            id_imagen: {
                type: Sequelize.INTEGER,
                references: {model:{tableName: 'imagenes'},key:'id'}
            },
            id_voluntariado: {
                type: Sequelize.INTEGER,
                references: {model:{tableName: 'voluntariados'},key:'id'}
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            }
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('imagenes_voluntariados');
    }
};