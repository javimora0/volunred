'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('ambitos_voluntarios', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      id_ambito_profesional: {
        type: Sequelize.INTEGER,
        references: {model:{tableName: 'ambitos_profesionales'},key:'id'}
      },
      id_voluntario: {
        type: Sequelize.INTEGER,
        references: {model:{tableName: 'voluntarios'},key:'id'}
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
    await queryInterface.dropTable('ambitos_voluntarios');
  }
};