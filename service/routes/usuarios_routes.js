const {Router} = require('express')
const usuario_controller = require('../controllers/usuario_controller')
const middleware = require('../middlewares/check_datos')
const validar_campos = require('../helpers/validar_campos')
const {check} = require("express-validator");
const validar_jwt = require("../middlewares/validar_jwt");
const router = Router()

//TODO: Añadir validaciones

router.route('/:id_usuario')
    // Un usuario obtiene sus datos
    .get(validar_jwt.validar_token, middleware.existe_usuario, usuario_controller.get_datos)
    // Un usuario modifica sus datos
    .put([
        check('nombre', 'Debe introducir un nombre válido, entre 2 y 50 caracteres').isLength({
            min: 2,
            max: 50
        }).isString(),
        check('apellidos', 'Debe introducir unos apellidos válidos, entre 4 y 40 caracteres').isLength({
            min: 4,
            max: 90
        }).isString(),
        check('email', 'Debe introducir un correo electrónico válido').optional().isEmail().custom(middleware.existe_email),
        check('username', 'Debe introducir un nombre de usuario válido').optional().isLength({
            min: 3,
            max: 30
        }).custom(middleware.existe_username),
        check('fecha_nacimiento', 'Debe introducir una fecha de nacimiento válida'),
        check('dni_nie', 'Debe introducir un DNI o NIE válido').optional().custom(middleware.check_dni_nie).custom(middleware.existe_dni_nie),
        check('telefono', 'Debe introducir un numero de telefono válido').optional().isInt().custom(middleware.existe_telefono),
        check('ubicacion', 'Debe introducir una ubicacion válida').isString()
        , validar_campos], validar_jwt.validar_token, middleware.existe_usuario, usuario_controller.put_usuario)


// Modifica la contraseña de un usuario
router.put('/change_password/:id_usuario', [
    check('new_password', 'Deber introducir una contraseña válida').isLength({min: 6, max: 60}),
    check('old_password', 'Deber introducir una contraseña válida').isLength({min: 6, max: 60})
    , validar_campos
], usuario_controller.put_password)

// Obtiene todos los comentarios de un usuario con el usuario que comenta.
router.get('/comentarios/:id_usuario', middleware.existe_usuario, usuario_controller.get_comentarios)

router.route('/solicitudes/:id_usuario')
    // Obtiene todas las solicitudes de un usuario
    .get(middleware.existe_usuario, usuario_controller.get_solicitudes)

// Obtiene todos los datos de un voluntariado de un usuario.
router.get('/voluntariados/:id_usuario', middleware.existe_usuario, usuario_controller.get_voluntariados)

router.route('/imagen/:id_usuario')
    .get(middleware.existe_usuario, usuario_controller.get_imagen)
    .put(middleware.existe_usuario, usuario_controller.put_imagen)

router.post('/preferencias/:id_voluntario', [
    check('sexo','Debe seleccionar un sexo valido').not().isEmpty(),
    check('experiencia', 'Debe seleccionar su experiencia').not().isEmpty(),
    check('disponibilidad', 'Elige entre online, presencial o ambas').not().isEmpty()
    ,validar_campos], validar_jwt.validar_voluntario ,middleware.existe_voluntario,usuario_controller.agregar_preferencias)

module.exports = router