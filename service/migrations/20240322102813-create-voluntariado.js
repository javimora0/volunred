'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('voluntariados', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      id_usuario:{
        type: Sequelize.INTEGER,
        references: {model:{tableName: 'usuarios'},key:'id'}
      },
      titulo: {
        type: Sequelize.STRING
      },
      enlace: {
        type: Sequelize.STRING
      },
      descripcion: {
        type: Sequelize.TEXT
      },
      ubicacion: {
        type: Sequelize.STRING
      },
      fecha_inicio: {
        type: Sequelize.DATE
      },
      fecha_fin: {
        type: Sequelize.DATE
      },
      finalizado: {
        type: Sequelize.BOOLEAN
      },
      nombre_portada: {
        type: Sequelize.STRING
      },
      extension_portada: {
        type: Sequelize.STRING
      },
      modalidad: {
        type: Sequelize.STRING
      },
      activo: {
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
    await queryInterface.dropTable('voluntariados');
  }
};