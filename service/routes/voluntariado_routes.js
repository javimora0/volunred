const {Router} = require('express')
const voluntariado_controller = require('../controllers/voluntariado_controller')
const check_datos = require('../middlewares/check_datos')
const validar_jwt = require('../middlewares/validar_jwt')
const router = Router()

// Muestra voluntariados en funcion de tus ambitos preferentes y tu ubicacion
router.get('/recomendaciones/:id_voluntario', voluntariado_controller.get_recomendaciones)

// Muestra voluntariados en funcion de tus preferencias como la edad, experiencia o disponibilidad
router.get('/recomendaciones/automaticas/:id_voluntario', voluntariado_controller.get_recomendaciones_automaticas)

router.get('/imagen/:id_voluntariado', voluntariado_controller.get_imagen_voluntariado)

router.get('/:id_voluntariado', voluntariado_controller.get_voluntariado)

router.post('/solicitud/:id_voluntariado/:id_usuario', voluntariado_controller.post_solicitud)

// Buscar todos los voluntariados
router.get('/', voluntariado_controller.get_voluntariados)

router.get('/filtrado/:ubicacion/:modalidad', voluntariado_controller.get_voluntariados_filtro)

module.exports = router