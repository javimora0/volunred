const {Router} = require('express')
const usuario_controller = require('../controllers/usuario_controller')
const middleware = require('../middlewares/check_datos')
const validar_campos = require('../helpers/validar_campos')
const {check} = require("express-validator");
const validar_jwt = require("../middlewares/validar_jwt");
const router = Router()

router.route('/:id_usuario')
    .get(middleware.existe_usuario ,usuario_controller.get_datos)

module.exports = router