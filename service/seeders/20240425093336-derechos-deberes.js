'use strict';
const legal_factorie = require('../factories/legal_factorie')
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        /**
         * Add seed commands here.
         *
         * Example:
         * await queryInterface.bulkInsert('People', [{
         *   name: 'John Doe',
         *   isBetaMember: false
         * }], {});
         */
        // Creamos los tipos legales
        let tipos_derechos_deberes = await legal_factorie.crear_tipos()
        await queryInterface.bulkInsert('tipos_derechos_deberes', tipos_derechos_deberes, {})

        // Creamos los derechos
        let derechos_deberes = await legal_factorie.crear_derechos_deberes()
        await queryInterface.bulkInsert('derechos_deberes', derechos_deberes, {})
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete('derechos_deberes', null, {});
        await queryInterface.bulkDelete('tipos_derechos_deberes', null, {});
    }
};
