import express from 'express'
import { check } from 'express-validator'
import { autenticarUsuario, logearUsuario } from '../controller/authController.js'
import auth from '../middleware/auth.js'

const router = express.Router()

router.post('/', autenticarUsuario)

router.get('/', auth, logearUsuario)

export default router