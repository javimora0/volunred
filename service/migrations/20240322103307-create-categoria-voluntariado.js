'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('categorias_voluntariados', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      id_voluntariado: {
        type: Sequelize.INTEGER,
        references: {model:{tableName: 'voluntariados'},key:'id'}
      },
      id_categoria: {
        type: Sequelize.INTEGER,
        references: {model:{tableName: 'categorias'},key:'id'}
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
    await queryInterface.dropTable('categorias_voluntariados');
  }
};