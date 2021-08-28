import { genSalt, hash } from "bcrypt";
import { validationResult } from "express-validator";
import jwt from 'jsonwebtoken'
import Usuario from "../models/Usuario.js";

export const crearUsuario = async (req, res) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()) return res.status(400).json({errores: errors.array()})

    const { email, password } = req.body

    try {
        let usuarioRepetido = await Usuario.findOne({email})

        if(usuarioRepetido) return res.status(400).json({msj: 'This user exists'})

        let usuario = new Usuario(req.body)
        usuario.password = await hash(password, 10)

        await usuario.save()

        const payload = {
            usuario: {
                id: usuario.id
            }
        }
        jwt.sign(payload, process.env.SECRET, {
            expiresIn: 3600
        }, (e, token) => {
            if (e) throw e
            res.status(200).json({
                token
            })
        })
    } catch (e) {
        res.status(400).json({
            error: e
        })
    }
}   