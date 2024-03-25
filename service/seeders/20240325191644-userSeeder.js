'use strict';
const { generarUsuarios } = require('../factories/usuarioFactory')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const users = await generarUsuarios(4)
    await queryInterface.bulkInsert('usuarios', users, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('usuarios', null, {});
  }
};