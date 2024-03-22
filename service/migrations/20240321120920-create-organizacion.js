'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('organizaciones', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            cif: {
                type: Sequelize.STRING
            },
            sitio_web: {
                type: Sequelize.STRING
            },
            id_usuario: {
                type: Sequelize.INTEGER,
                references: {model: {tableName: 'usuarios'}, key: 'id'}
            },
            nombre: {
                type: Sequelize.STRING
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
        await queryInterface.dropTable('organizaciones');
    }
};