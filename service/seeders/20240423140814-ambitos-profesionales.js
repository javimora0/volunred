'use strict';
const ambitos_factory = require('../factories/ambitos_factories', )
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        let ambitos = await ambitos_factory.create_ambitos()
        await queryInterface.bulkInsert('ambitos_profesionales', ambitos, {})
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete('ambitos_profesionales', null, {});
    }
};
