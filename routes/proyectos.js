import express from 'express'
import { check } from 'express-validator'
import { crearProyecto, obtenerProyectos, actualizarProyecto, borrarProyecto } from '../controller/proyectoController.js'
import auth from '../middleware/auth.js'

const router = express.Router()

router.post('/', auth, [
    check('nombre', 'el nombre del proyecto es obligaorio').not().isEmpty()
], crearProyecto)

router.get('/', auth, obtenerProyectos)

router.put('/:id', auth, [
    check('nombre', 'el nombre del proyecto es obligaorio').not().isEmpty()
], actualizarProyecto)

router.delete('/:id', auth, borrarProyecto)

export default router