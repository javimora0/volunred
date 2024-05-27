const {Router} = require('express')
const entradas_controller = require('../controllers/entradas_controller')
const validar_campos = require('../helpers/validar_campos')
const middleware = require('../middlewares/check_datos')
const {check} = require("express-validator");
const validar_jwt = require('../middlewares/validar_jwt')
const router = Router()

router.get('/hazte_voluntario', entradas_controller.get_hazte_voluntario)
router.get('/quienes_somos', entradas_controller.get_quienes_somos)
router.post('/', [
    check('titulo', 'Debe introducir un titulo válido').isLength({min: 2, max: 256}),
    check('texto', 'Debe introducir un cuerpo válido').not().isEmpty(),
    check('id_tipo_entrada', 'Debe introducir el id del tipo de entrada correctamente').custom(middleware.existe_tipo_entrada)
    , validar_campos
],entradas_controller.crear_entrada)
router.get('/tipos', entradas_controller.get_tipos)

router.route('/imagen/:id_entrada')
    .put(validar_jwt.validar_admin, middleware.existe_entrada, entradas_controller.put_imagen)
    .get(middleware.existe_entrada, entradas_controller.get_imagen)

router.route('/:id_entrada')
    .delete(validar_jwt.validar_admin, entradas_controller.delete_entrada)
    .put([
        check('titulo', 'Debe introducir un titulo válido').isLength({min: 2, max: 256}),
        check('texto', 'Debe introducir un cuerpo válido').not().isEmpty(),
        check('id_tipo_entrada').custom(middleware.existe_tipo_entrada)
        , validar_campos], validar_jwt.validar_admin, middleware.existe_entrada, entradas_controller.modificar_entrada)

module.exports = router