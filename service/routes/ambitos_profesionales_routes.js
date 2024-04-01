const {Router} = require('express')
const ambitos_controller = require('../controllers/ambitos_controller')
const check_datos = require('../middlewares/check_datos')
const router = Router()

router.get('', ambitos_controller.get_ambitos)
//TODO: Proteger la ruta para que sean voluntarios
router.post('/:id_usuario', check_datos.existe_usuario, ambitos_controller.asignar_ambitos)

module.exports = router