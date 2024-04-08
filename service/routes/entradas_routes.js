const {Router} = require('express')
const entradas_controller = require('../controllers/entradas_controller')
const validar_campos = require('../helpers/validar_campos')
const middleware = require('../middlewares/check_datos')
const {check} = require("express-validator");
const router = Router()

router.get('/hazte_voluntario', entradas_controller.get_hazte_voluntario)
router.get('/quienes_somos', entradas_controller.get_quienes_somos)
router.delete('/:id_entrada', entradas_controller.delete_entrada)

router.post('/', [
    check('titulo', 'Debe introducir un titulo válido').isLength({min: 2, max: 256}),
    check('texto', 'Debe introducir un cuerpo válido').not().isEmpty,
    check('id_tipo_entrada', 'Debe introducir el id del tipo de entrada correctamente').custom(middleware.existe_tipo_entrada)
    , validar_campos], entradas_controller.crear_entrada)

router.put('/:id_entrada', [
    check('titulo', 'Debe introducir un titulo válido').isLength({min: 2, max: 256}),
    check('texto', 'Debe introducir un cuerpo válido').not().isEmpty,
    check('id_tipo_entrada').custom(middleware.existe_tipo_entrada)
    , validar_campos], middleware.existe_entrada,entradas_controller.modificar_entrada)

router.get('/tipos', entradas_controller.get_tipos)

router.put('/imagen/:id_entrada', entradas_controller.put_imagen)

module.exports = router