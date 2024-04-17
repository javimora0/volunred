const jwt = require('jsonwebtoken')
const {StatusCodes} = require("http-status-codes");

const validar_voluntario = (req, res, next) => {
    const token = req.header('x-token')

    if (!token) {
        return res.status(StatusCodes.UNAUTHORIZED).json({'msg':'No hay token en la peticion'})
    }

    try {
        const {roles} = jwt.verify(token, process.env.secretOrPrivateKey)
        const rolesArray = roles[0].roles.map(rol => rol.nombre);

        if (rolesArray.includes('voluntario')) {
            next();
        } else {
            res.status(StatusCodes.UNAUTHORIZED).json({ 'msg': 'Acceso no autorizado' });
        }

    } catch (error) {
        res.status(StatusCodes.UNAUTHORIZED).json({'msg':'Token no valido'})
    }
}

const validar_organizacion = (req, res, next) => {
    const token = req.header('x-token')

    if (!token) {
        return res.status(StatusCodes.UNAUTHORIZED).json({'msg':'No hay token en la peticion'})
    }

    try {
        const {roles} = jwt.verify(token, process.env.secretOrPrivateKey)
        const rolesArray = roles[0].roles.map(rol => rol.nombre);

        if (rolesArray.includes('organizacion')) {
            next();
        } else {
            res.status(StatusCodes.UNAUTHORIZED).json({ 'msg': 'Acceso no autorizado' });
        }

    } catch (error) {
        res.status(StatusCodes.UNAUTHORIZED).json({'msg':'Token no valido'})
    }
}

const validar_admin = (req, res, next) => {
    const token = req.header('x-token')

    if (!token) {
        return res.status(StatusCodes.UNAUTHORIZED).json({'msg':'No hay token en la peticion'})
    }

    try {
        const {roles} = jwt.verify(token, process.env.secretOrPrivateKey)
        const rolesArray = roles[0].roles.map(rol => rol.nombre);

        if (rolesArray.includes('admin')) {
            next();
        } else {
            res.status(StatusCodes.UNAUTHORIZED).json({ 'msg': 'Acceso no autorizado' });
        }

    } catch (error) {
        res.status(StatusCodes.UNAUTHORIZED).json({'msg':'Token no valido'})
    }
}
module.exports = {
    validar_voluntario,
    validar_organizacion,
    validar_admin
}