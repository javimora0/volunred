const {Router} = require('express')
const validar_campos = require('../helpers/validar_campos')
const derechos_deberes_controller = require('../controllers/derechos_deberes_controller')
const middleware = require('../middlewares/check_datos')
const {check} = require("express-validator");
const router = Router()

//TODO: Proteger rutas

router.get('/derechos', derechos_deberes_controller.get_derechos)
router.get('/deberes', derechos_deberes_controller.get_deberes)
router.post('',[
    check('descripcion','Debe introducir una descripción válida').isLength({min:2, max:256}),
    check('id_tipo').custom(middleware.existe_tipo_derecho_deber)
    ,validar_campos], derechos_deberes_controller.crear_derecho_deber)

router.route('/:id')
    .put([
        check('descripcion','Debe introducir una descripción válida').isLength({min:2, max:256}),
        check('id_tipo').custom(middleware.existe_tipo_derecho_deber)
        ,validar_campos], derechos_deberes_controller.modificar_derecho_deber)

    .delete(derechos_deberes_controller.eliminar_derecho_deber)