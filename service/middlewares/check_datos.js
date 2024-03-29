const conexion_usuario =  require('../database/usuarios/ConexionUsuario')
const conexion_voluntario =  require('../database/usuarios/ConexionVoluntario')
const conexion_organizacion =  require('../database/usuarios/ConexionOrganizacion')

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
                reject(new Error('Correo electrónico ya en uso'))
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
                reject(new Error('Nombre de usuario ya en uso'))
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
                reject(new Error('DNI o NIE ya registrado'))
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
                reject(new Error('Número de telefono ya en uso'))
            })
    })
}

/**
 * Validacion para que no se repitan cif en las organizaciones
 * @param cif
 * @returns {Promise<unknown>}
 */
const existe_cif = async (cif) => {
    return new Promise((resolve, reject) => {
        const conx_organizacion = new conexion_organizacion()
        conx_organizacion.cif_existe_validator(cif)
            .then(msg => {
                resolve(true)
            })
            .catch(err => {
                reject(new Error('Ya existe el cif'))
            })
    })
}

/**
 * @desc Valida el formato tanto del dni como de un nie
 * @param dni_nie
 * @returns {Promise<Error|boolean>}
 */
const check_dni_nie = (dni_nie = '') => {
    return new Promise((resolve, reject) => {
        let letras = 'TRWAGMYFPDXBNJZSQVHLCKET';
        let nif_regexp = /^[0-9]{8}[TRWAGMYFPDXBNJZSQVHLCKET]$/i;
        let nie_regexp = /^[XYZ][0-9]{7}[TRWAGMYFPDXBNJZSQVHLCKET]$/i;
        let str = dni_nie.toString().toUpperCase();

        if (!nif_regexp.test(str) && !nie_regexp.test(str)) {
            return reject(new Error('Error de formato en el DNI'));
        }

        let nie = str
            .replace(/^X/, '0')
            .replace(/^Y/, '1')
            .replace(/^Z/, '2');

        let letra = str.substring(str.length - 1);
        let caracter = parseInt(nie.substring(0, 8)) % 23;

        if (letras.charAt(caracter) === letra) {
            resolve(true);
        } else {
            reject(new Error('Error de formato en el DNI'));
        }
    });
}

/**
 * @desc Valida el formato del cif, si las letras son validas no
 * @param cif
 * @returns {Promise<unknown>}
 */
const check_cif = async (cif = '') => {
    const regex = /^[A-Z][0-9]{7}[A-Z]$/;
    return new Promise((resolve, reject) => {
        if (regex.test(cif)) {
            resolve(true);
        }else {
            reject(new Error('CIF incorrecto'));
        }
    })
}

module.exports = {
    existe_email,
    existe_username,
    check_dni_nie,
    existe_dni_nie,
    existe_telefono,
    check_cif,
    existe_cif
}