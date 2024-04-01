const {Router} = require('express')
const entradas_controller = require('../controllers/entradas_controller')
const check_datos = require('../middlewares/check_datos')
const router = Router()

router.get('/inicio', entradas_controller.get_hazte_voluntario)
router.get('/quienes_somos', entradas_controller.get_quienes_somos)

module.exports = router