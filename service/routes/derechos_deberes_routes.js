const {Router} = require('express')
const validar_campos = require('../helpers/validar_campos')
const derechos_deberes_controller = require('../controllers/derechos_deberes_controller')
const middleware = require('../middlewares/check_datos')
const {check} = require("express-validator");
const router = Router()

router.get('/derechos', derechos_deberes_controller.get_derechos)
router.get('/deberes', derechos_deberes_controller.get_deberes)
// TODO: Modificar derecho/deber | Crear derecho | Crear deber |  Eliminar derecho/deber
