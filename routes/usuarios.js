import express from 'express'
import { check } from 'express-validator'
import { crearUsuario } from '../controller/usuarioController.js'
const router = express.Router()

router.post('/', [
    check('nombre', 'el nombre es obligatorio').not().isEmpty(),
    check('email', 'agrega un email valido').isEmail(),
    check('password', 'El password debe ser minimo de 6 caracteres').isLength({min: 6})
], crearUsuario)

export default router