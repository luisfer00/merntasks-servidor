import express from 'express'
import { check } from 'express-validator'
import { actualizarTarea, crearTarea, eliminarTarea, obtenerTareas, eliminarTareas } from '../controller/tareaController.js'
import auth from '../middleware/auth.js'

const router = express.Router()

router.get('/:proyectoId', auth, obtenerTareas)
router.post('/', auth, [
    check('nombre', 'nombre es obligatorio').not().isEmpty(),
    check('proyecto', 'proyecto es obligatorio').not().isEmpty()
], crearTarea)
router.put('/:tareaId', auth, [
    check('proyecto', 'proyecto es obligatorio').not().isEmpty()
], actualizarTarea)
router.delete('/:proyectoId/:tareaId', auth, eliminarTarea)
router.delete('/:proyectoId', auth, eliminarTareas)


export default router