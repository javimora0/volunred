const {Router} = require('express')
const categorias_voluntariado = require('../controllers/categorias_voluntariado_controller')
const middleware = require('../middlewares/check_datos')
const validar_campos = require('../helpers/validar_campos')
const {check} = require("express-validator");
const validar_jwt = require("../middlewares/validar_jwt");

const router = Router()

router.route('/')
    .get(categorias_voluntariado.get_categorias)
    .post([
        check('categoria', 'Debe introducir una categoría válida').isLength({min: 2, max: 256}),
        check('descripcion', 'Debe introducir una descripción válida').isLength({min: 2, max: 256})
        , validar_campos], validar_jwt.validar_admin, categorias_voluntariado.crear_categoria)

router.route('/:id_categoria')
    .delete(validar_jwt.validar_admin, middleware.existe_categoria, categorias_voluntariado.borrar_categoria)
    .put([
        check('categoria', 'Debe introducir una categoría válida').isLength({min: 2, max: 256}),
        check('descripcion', 'Debe introducir una descripción válida').isLength({min: 2, max: 256})
        , validar_campos], validar_jwt.validar_admin, middleware.existe_categoria, categorias_voluntariado.modificar_categoria)

router.route('/imagen/:id_categoria')
    .get(middleware.existe_categoria, categorias_voluntariado.get_imagen)
    .put(validar_jwt.validar_admin, middleware.existe_categoria, categorias_voluntariado.put_imagen)
module.exports = router