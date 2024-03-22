'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('solicitudes_voluntariados', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      id_usuario: {
        type: Sequelize.INTEGER,
        references: {model:{tableName: 'usuarios'},key:'id'}
      },
      id_voluntariado: {
        type: Sequelize.INTEGER,
        references: {model:{tableName: 'voluntariados'},key:'id'}
      },
      id_estado: {
        type: Sequelize.INTEGER,
        references: {model:{tableName: 'estados_solicitudes'},key:'id'}
      },
      mensaje_solicitud: {
        type: Sequelize.STRING
      },
      mensaje_respuesta: {
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
    await queryInterface.dropTable('solicitudes_voluntariados');
  }
};