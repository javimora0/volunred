'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('roles', [{
      nombre: 'admin',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      nombre: 'voluntario',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      nombre: 'organizacion',
      createdAt: new Date(),
      updatedAt: new Date()
    }
    ])
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('roles', null, {});
  }
};
