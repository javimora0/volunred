const {faker, fakerES} = require('@faker-js/faker');
const bcrypt = require('bcrypt')
const axios = require('axios');
const conexion_rol = require("../database/ConexionRol");
const conexion_usuarios = require("../database/usuarios/ConexionUsuario");

require('dotenv').config();

const create_usuarios = async (n_usuarios) => {
    let usuarios = []
    for (let i = 0; i < n_usuarios; i++) {
        let u = {
            email: fakerES.internet.email(),
            password: await bcrypt.hash('asdasd', 10),
            username: faker.internet.userName(),
            ubicacion: faker.location.country(),
            nombre_foto: 'foto_perfil_defecto',
            extension_foto: '.jpg',
            activo: true,
            createdAt: new Date(),
            updatedAt: new Date()
        }
        usuarios.push(u)
    }
    return usuarios
}

/**
 * @desc Crea voluntarios asignandole roles regisstrandolos y asignandoles ambitos profesionales
 * @param usuarios_db
 */
const create_voluntarios = async () => {
    let conx = new conexion_usuarios()

    let usuarios_db = await conx.get_usuarios()
    let voluntarios = []
    for (let i = 0; i < usuarios_db.length - 1; i++) {
        if (usuarios_db[i].id % 2 === 0) {
            // //  --> Crear un voluntario.
            // const response = await axios.get(process.env.API_DNI_URL);
            // const dni = response.data[0];
            let u = {
                id_usuario: usuarios_db[i].id,
                nombre: fakerES.person.firstName(),
                apellidos: faker.person.lastName(),
                fecha_nacimiento: faker.date.birthdate({min: 18}),
                dni_nie: '05723411E',
                telefono: fakerES.phone.number(),
                media_calificaciones: 0,
                activo: true,
                createdAt: new Date(),
                updatedAt: new Date()
            }

            voluntarios.push(u)
        }
    }

    return voluntarios
}

const asignar_roles = async (voluntarios) => {
    let conx_rol = new conexion_rol()
    let rol = await conx_rol.get_id_rol("voluntario")
    let roles = []
    for (let i = 0; i < voluntarios.length - 1; i++) {
        let u = {
            id_usuario: voluntarios[i].id_usuario,
            id_rol: rol.id
        }
        roles.push(u)
    }
    return roles
}

module.exports = {
    create_usuarios,
    create_voluntarios,
    asignar_roles
}