const {faker, fakerES} = require('@faker-js/faker');

const generar_noticias = async(n) => {
    let noticias = []
    for (let i = 0; i < n; i++) {
        let u = {
            titulo: fakerES.vehicle.vehicle(),
            cuerpo: faker.music.songName(),
            nombre_portada: 'portada_defecto',
            extension_portada: '.jpg',
            activa: true,
            createdAt: new Date(),
            updatedAt: new Date()
        }
        console.log(u)
        noticias.push(u)
    }
    return noticias
}

module.exports = {
    generar_noticias
}