'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('calificaciones_voluntarios', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      calificacion: {
        type: Sequelize.INTEGER
      },
      id_voluntario: {
        type: Sequelize.INTEGER,
        references: {model:{tableName: 'voluntarios'},key:'id'}
      },
      id_organizacion: {
        type: Sequelize.INTEGER,
        references: {model:{tableName: 'organizaciones'},key:'id'}
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
    await queryInterface.dropTable('calificaciones_voluntarios');
  }
};