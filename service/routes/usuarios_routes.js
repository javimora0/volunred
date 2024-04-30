const {Router} = require('express')
const usuario_controller = require('../controllers/usuario_controller')
const middleware = require('../middlewares/check_datos')
const validar_campos = require('../helpers/validar_campos')
const {check} = require("express-validator");
const validar_jwt = require("../middlewares/validar_jwt");
const router = Router()

router.route('/:id_usuario')
    .get(validar_jwt.validar_token,middleware.existe_usuario ,usuario_controller.get_datos)

// Obtiene todas los comentarios de un usuario con el usuario que comenta.
router.get('/comentarios/:id_usuario', middleware.existe_usuario, usuario_controller.get_comentarios)


router.route('/solicitudes/:id_usuario')
// Obtiene todas las solicitudes de un usuario
    .get(middleware.existe_usuario, usuario_controller.get_solicitudes)
module.exports = router