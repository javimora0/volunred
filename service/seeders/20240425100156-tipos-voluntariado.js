'use strict';
const voluntariado_factorie = require('../factories/voluntariado_factorie')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    let tipos_voluntariado = await voluntariado_factorie.crear_tipos_voluntariado()
    console.log(tipos_voluntariado)
    await queryInterface.bulkInsert('categorias', tipos_voluntariado, {})

  },

  async down (queryInterface, Sequelize) {
     await queryInterface.bulkDelete('categorias', null, {});
  }
};
