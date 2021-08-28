import { compare } from "bcrypt"
import { validationResult } from "express-validator"
import jwt from 'jsonwebtoken'
import Usuario from "../models/Usuario.js"

export const autenticarUsuario = async (req, res) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()) return res.status(400).json({errors: errors.array()})

    const { email, password } = req.body

    try {
        let usuario = await Usuario.findOne({email})
        if (!usuario) return res.status(400).json({msj: 'No existe el usuario'})

        const goodPasswd = await compare(password, usuario.password)
        if(!goodPasswd) return res.status(400).json({msj: 'Password incorrecto'})
        
        const payload = {
            usuario: {
                id: usuario.id
            }
        }
        jwt.sign(payload, process.env.SECRET, {
            expiresIn: 3600
        }, (e, token) => {
            if (e) throw e
            res.json({
                token
            })
        })
    } catch (e) {
        console.log(e)
    }
}

export const logearUsuario = async (req, res) => {
    try {
        const usuario = await Usuario.findById(req.usuario.id).select('-password')
        if(!usuario) return res.status(404).json({msj: 'usuario no encontrado'})
        res.json({usuario})
    } catch (e) {
        console.log(e)
    }
}