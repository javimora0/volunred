const {Router} = require('express')
const categorias_voluntariado = require('../controllers/categorias_voluntariado_controller')
const check_datos = require('../middlewares/check_datos')
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
    .delete(check_datos.existe_categoria,categorias_voluntariado.borrar_categoria)
    .put([
        check('categoria', 'Debe introducir una categoría válida').isLength({min: 2, max: 256}),
        check('descripcion', 'Debe introducir una descripción válida').isLength({min: 2, max: 256})
        , validar_campos], check_datos.existe_categoria,categorias_voluntariado.modificar_categoria)

//Ruta para obtener imagen de una categoria y cambiar la imagen de una categoria
module.exports = router