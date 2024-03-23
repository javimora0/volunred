const {Router} = require('express')
const auth_controller = require('../controllers/auth_controller')
const middleware = require('../middlewares/check_datos')
const validar_campos = require('../helpers/validar_campos')
const {check} = require('express-validator')
const router = Router()

// Ruta para registrar voluntarios con las válidaciones necesarias
router.post('/registro/voluntario', [
    check('nombre', 'Debe introducir un nombre válido, entre 2 y 50 caracteres').isLength({min:2,max:50}).isString(),
    check('apellidos', 'Debe introducir unos apellidos válidos, entre 4 y 40 caracteres').isLength({min:4,max:40}).isString(),
    check('email', 'Debe introducir un correo electrónico válido').isEmail().custom(middleware.existe_email),
    check('username', 'Debe introducir un nombre de usuario válido').isLength({min:3,max:30}).custom(middleware.existe_username),
    check('fecha_nacimiento', 'Debe introducir una fecha de nacimiento válida'),
    check('dni_nie', 'Debe introducir un DNI o NIE válido').custom(middleware.check_dni_nie).custom(middleware.existe_dni_nie),
    check('telefono', 'Debe introducir un numero de telefono válido').isInt().custom(middleware.existe_telefono),
    check('ubicacion', 'Debe introducir una ubicacion válida').isString(),
    check('password','Deber introducir una contraseña válida').isLength({min:6,max:60})
    ,validar_campos
],auth_controller.registro_voluntario)

module.exports = router