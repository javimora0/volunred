'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('imagenes_noticias', {
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
      id_noticia: {
        type: Sequelize.INTEGER,
        references: {model:{tableName: 'noticias'},key:'id'}
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
    await queryInterface.dropTable('imagenes_noticias');
  }
};