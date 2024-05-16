'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.bulkInsert('tipos_entradas', [
            {
                tipo: 'hazte_voluntario',
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                tipo: 'quienes_somos',
                createdAt: new Date(),
                updatedAt: new Date()
            }
        ])
        //await queryInterface.bulkInsert('entradas', [], {})
    },

    async down(queryInterface, Sequelize) {
        /**
         * Add commands to revert seed here.
         *
         * Example:
         * await queryInterface.bulkDelete('People', null, {});
         */
    }
};
