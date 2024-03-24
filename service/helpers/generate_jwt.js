const jwt = require('jsonwebtoken')


const generar_jwt = (usuario = '', vol_org = '', roles = []) => {
    return jwt.sign({usuario, vol_org, roles}, process.env.SECRETORPRIVATEKEY);
}

module.exports = {
    generar_jwt
}