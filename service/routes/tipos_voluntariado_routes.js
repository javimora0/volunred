const {Router} = require('express')
const categorias_voluntariado = require('../controllers/categorias_voluntariado_controller')
const middleware = require('../middlewares/check_datos')
const validar_campos = require('../helpers/validar_campos')
const {check} = require("express-validator");

const router = Router()

router.route('/')
    .get(categorias_voluntariado.get_categorias)
    .post([
        check('categoria', 'Debe introducir una categoría válida').isLength({min: 2, max: 256}),
        check('descripcion', 'Debe introducir una descripción válida').isLength({min: 2, max: 256})
        , validar_campos], categorias_voluntariado.crear_categoria)

router.route('/:id_categoria')
    .delete(middleware.existe_categoria,categorias_voluntariado.borrar_categoria)
    .put([
        check('categoria', 'Debe introducir una categoría válida').isLength({min: 2, max: 256}),
        check('descripcion', 'Debe introducir una descripción válida').isLength({min: 2, max: 256})
        , validar_campos], middleware.existe_categoria,categorias_voluntariado.modificar_categoria)

router.route('/imagen/:id_categoria')
    .get(middleware.existe_categoria, categorias_voluntariado.get_imagen)
    .put(middleware.existe_categoria, categorias_voluntariado.put_imagen)
module.exports = router