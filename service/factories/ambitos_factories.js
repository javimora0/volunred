const conexion_ambitos = require("../database/ConexionAmbitos");
const conx_voluntarios = require("../database/usuarios/ConexionVoluntario")
const create_ambitos = async () => {
    let ambitos = ['ambiental', 'comunitario', 'cultural', 'deportivo', 'educativo', 'internacional', 'ocio y tiempo libre', 'protección civil', 'socio-sanitario', 'social']
    let ambitos_array = []
    for (let i = 0; i < ambitos.length - 1; i++) {
        let a = {
            ambito: ambitos[i],
            createdAt: new Date(),
            updatedAt: new Date()
        }
        ambitos_array.push(a)
    }
    return ambitos_array
}

const asignar_ambitos = async () => {
    let conx_vol = new conx_voluntarios()
    let conx_ambitos = new conexion_ambitos()
    let voluntarios = await conx_vol.get_voluntarios()
    let ambitos = await conx_ambitos.get_ambitos()
    console.log(voluntarios.length)
    console.log(ambitos.length)
    let ambitos_array = []
    for (let i = 0; i < voluntarios.length - 1; i++) {
        let rndm = Math.floor(Math.random() * ambitos.length - 1) + 1
        let av = {
            id_ambito_profesional: Math.floor(Math.random() * ambitos.length - 1) + 1,
            id_voluntario: voluntarios[i].id
        }
        ambitos_array.push(av)
    }
    return ambitos_array
}

module.exports = {
    create_ambitos,
    asignar_ambitos
}