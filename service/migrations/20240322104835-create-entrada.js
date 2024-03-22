'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('entradas', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      titulo: {
        type: Sequelize.STRING
      },
      texto: {
        type: Sequelize.STRING
      },
      nombre_foto: {
        type: Sequelize.STRING
      },
      extension_foto: {
        type: Sequelize.STRING
      },
      id_tipo_entrada: {
        type: Sequelize.INTEGER,
        references: {model:{tableName: 'tipos_entradas'},key:'id'}
      },
      activa: {
        type: Sequelize.BOOLEAN
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
    await queryInterface.dropTable('entradas');
  }
};