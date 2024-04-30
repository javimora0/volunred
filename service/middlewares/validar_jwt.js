const jwt = require('jsonwebtoken')
const {StatusCodes} = require("http-status-codes");

const validar_token = (req, res, next) => {
    const token = req.header('x-token')

    if (!token) {
        return res.status(StatusCodes.UNAUTHORIZED).json({'msg':'No hay token en la peticion'})
    }
    next()
}

const validar_voluntario = (req, res, next) => {
    const token = req.header('x-token')

    if (!token) {
        return res.status(StatusCodes.UNAUTHORIZED).json({'msg':'No hay token en la peticion'})
    }

    try {
        if (jwt.verify(token, process.env.secretOrPrivateKey).roles[0].nombre === 'voluntario') {
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
        if (jwt.verify(token, process.env.secretOrPrivateKey).roles[0].nombre === 'organizacion') {
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
        if (jwt.verify(token, process.env.secretOrPrivateKey).roles[0].nombre === 'admin') {
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
    validar_admin,
    validar_token
}