'use strict';
const usuarios_factory = require('../factories/usuarios_factories')
const ambitos_factory = require('../factories/ambitos_factories', )
const conexion_usuarios = require('../database/usuarios/ConexionUsuario')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        // Crea los usuarios y los inserta
        let usuarios = await usuarios_factory.create_usuarios(5)
        await queryInterface.bulkInsert('usuarios', usuarios, {})

        // Se crean registros voluntarios
        let voluntarios = await usuarios_factory.create_voluntarios()
        await queryInterface.bulkInsert('voluntarios', voluntarios, {})

        // Asignamos los roles
        let roles = await usuarios_factory.asignar_roles(voluntarios)
        await queryInterface.bulkInsert('roles_usuarios', roles, {})

        // Asigna ambitos aleatorios a los voluntarios
        let ambitos_array = await ambitos_factory.asignar_ambitos()
        await queryInterface.bulkInsert('ambitos_voluntarios', ambitos_array, {})
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete('ambitos_voluntarios', null, {});
        await queryInterface.bulkDelete('roles_usuarios', null, {});
        await queryInterface.bulkDelete('voluntarios', null, {});
        await queryInterface.bulkDelete('usuarios', null, {});
    }
};
