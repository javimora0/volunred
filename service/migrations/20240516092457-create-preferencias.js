'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('preferencias', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      id_voluntario: {
        type: Sequelize.INTEGER,
        references: {model:{tableName: 'voluntarios'},key:'id'}
      },
      sexo: {
        type: Sequelize.STRING
      },
      experiencia: {
        type: Sequelize.BOOLEAN
      },
      disponibilidad: {
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
    await queryInterface.dropTable('preferencias');
  }
};