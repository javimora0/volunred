const {Router} = require('express')
const ambitos_controller = require('../controllers/ambitos_controller')
const check_datos = require('../middlewares/check_datos')
const validar_jwt = require('../middlewares/validar_jwt')
const router = Router()

router.get('', ambitos_controller.get_ambitos)
router.post('/:id_usuario', validar_jwt.validar_voluntario,check_datos.existe_usuario, ambitos_controller.asignar_ambitos)

module.exports = router