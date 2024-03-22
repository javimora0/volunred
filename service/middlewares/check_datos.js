const conexion_usuario =  require('../database/usuarios/ConexionUsuario')
const conexion_voluntario =  require('../database/usuarios/ConexionVoluntario')

/**
 * @description Validacion para que no se repitan emails
 * @param email
 * @returns {Promise<unknown>}
 */
const existe_email = async(email = '') => {
    return new Promise((resolve, reject) => {
        const conx_usuario = new conexion_usuario()
        conx_usuario.email_existe_validator(email)
            .then(msg => {
                resolve(true)
            })
            .catch(err => {
                reject(new Error('Ya existe el email'))
            })
    })
}


/**
 * @desc Validacion para que no se repitan nombre de usuario
 * @param username
 * @returns {Promise<unknown>}
 */
const existe_username = async(username = '') => {
    return new Promise((resolve, reject) => {
        const conx_usuario = new conexion_usuario()
        conx_usuario.username_existe_validator(username)
            .then(msg => {
                resolve(true)
            })
            .catch(err => {
                reject(new Error('Ya existe el username'))
            })
    })
}

/**
 * @desc Validacion para que no se repitan dni o nie
 * @param dni_nie
 * @returns {Promise<unknown>}
 */
const existe_dni_nie = async (dni_nie) => {
    return new Promise((resolve, reject) => {
        const conx_voluntario = new conexion_voluntario()
        conx_voluntario.dni_nie_existe_validator(dni_nie)
            .then(msg => {
                resolve(true)
            })
            .catch(err => {
                reject(new Error('Ya existe el dni o el nie'))
            })
    })
}

/**
 * @desc Validacion para que no se repitan numero de telefono
 * @param telefono
 * @returns {Promise<unknown>}
 */
const existe_telefono = async (telefono) => {
    return new Promise((resolve, reject) => {
        const conx_voluntario = new conexion_voluntario()
        conx_voluntario.telefono_existe_validator(telefono)
            .then(msg => {
                resolve(true)
            })
            .catch(err => {
                reject(new Error('Ya existe el telefono'))
            })
    })
}

/**
 * @desc Valida el formato tanto del dni como de un nie
 * @param dni_nie
 * @returns {Promise<Error|boolean>}
 */
const check_dni_nie = async (dni_nie = '') => {
    let numero, letr, letra;
    let expresion_regular_dni = /^[XYZ]?\d{5,8}[A-Z]$/;

    dni_nie = dni_nie.toUpperCase();

    if (dni_nie.match(expresion_regular_dni)) {
        numero = dni_nie.substring(0, dni_nie.length - 1).replace('X', '0').replace('Y', '1').replace('Z', '2');
        letr = dni_nie.substring(dni_nie.length - 1);
        numero = parseInt(numero) % 23;
        letra = 'TRWAGMYFPDXBNJZSQVHLCKET';
        letra = letra.substring(numero, numero + 1);
        if (letr === letra) {
            return true
        }else {
            return new Error('dni o nie erroneo');
        }
    } else {
        return new Error('dni o nie erroneo');
    }
}

module.exports = {
    existe_email,
    existe_username,
    check_dni_nie,
    existe_dni_nie,
    existe_telefono
}