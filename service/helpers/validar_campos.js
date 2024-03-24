const {validationResult} = require('express-validator')
const {StatusCodes} = require("http-status-codes");

const validar_campos = (req, res, next) => {
    const errores = validationResult(req);
    if (!errores.isEmpty()) {
        return res.status(StatusCodes.CONFLICT).json(errores)
    }
    next()
}
module.exports = validar_campos