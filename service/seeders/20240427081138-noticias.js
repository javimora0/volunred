'use strict';
const noticias_factorie = require('../factories/noticias_factorie')
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    let noticias = await noticias_factorie.generar_noticias(5)
    await queryInterface.bulkInsert('noticias', noticias, {})
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
