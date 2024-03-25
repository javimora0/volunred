const bcrypt = require('bcrypt');
const {fakerES} = require('@faker-js/faker');

const generarUsuarios = async (cantidadUsuarios) => {
    let usuariosGenerados = []
    for (let i = 1; i <= cantidadUsuarios; i++) {
        let u =
            {
                email: fakerES.internet.email(),
                password: await bcrypt.hash('1234', 10),
                ubicacion: fakerES.location.country(),
                username: fakerES.person.firstName(),
                nombre_foto: 'foto_perfil_defecto',
                extension_foto: '.jpg',
                activo: 0,
                createdAt: new Date(),
                updatedAt: new Date()
            }
        usuariosGenerados.push(u)
    }
    let usuarioAdmin =  {
        email: "admin@admin.com",
        password: await bcrypt.hash('adminadmin', 10),
        username: "administrador",
        nombre_foto: 'foto_perfil_defecto',
        extension_foto: '.jpg',
        activo: 0,
        createdAt: new Date(),
        updatedAt: new Date()
    }
    usuariosGenerados.push(usuarioAdmin)
    return Promise.all(usuariosGenerados);

}
module.exports = {
    generarUsuarios
}