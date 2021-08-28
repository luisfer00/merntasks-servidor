import { validationResult } from 'express-validator'
import Proyecto from '../models/Proyecto.js'

export const crearProyecto = async (req, res) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()) return res.status(400).json({error: errors.array()})

    try {
        let proyecto = new Proyecto(req.body)
        proyecto.creador = req.usuario.id
        await proyecto.save()
        res.json(proyecto)
    } catch (e) {
        console.log(e)
        res.status(500).json({msj: 'Hubo un error'})
    }
}

export const obtenerProyectos = async (req, res) => {    
    try {
        const proyectos = await Proyecto.find({creador: req.usuario.id})
        if(!proyectos) return res.status(400).json({msj: "no se encontraron los proyectos"})

        res.json(proyectos)
    } catch (e) {
        console.log(e)
        res.status(500).json({error: e})
    }
}

export const actualizarProyecto = async (req, res) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()) return res.status(400).json({error: errors.array()})
    
    try {
        const {nombre} = req.body
        if (!nombre) return res.status(400).json({msj: 'no se encontro el nombre'})
        let proyecto = await Proyecto.findByIdAndUpdate(req.params.id)
        if(!proyecto) return res.status(400).json({msj: 'No se encontro el proyecto'})
        if(proyecto.creador.toString() !== req.usuario.id) return res.status(401).json({msj: "usuario no autorizado"})
        proyecto.nombre = nombre.trim()
        await proyecto.save()
        res.json(proyecto)
    } catch (e) {
        console.log(e)
        res.status(500).json({e})
    }
}

export const borrarProyecto = async (req, res) => {
    try {
        const proyecto = await Proyecto.findById(req.params.id)
        if(!proyecto) return res.status(400).json({msj: 'No se encontro el proyecto'})
        if(proyecto.creador.toString() !== req.usuario.id) return res.status(401).json({msj: "usuario no autorizado"})
        await Proyecto.findByIdAndRemove(req.params.id)
        res.status(200).json({msj: 'El proyecto ha sido borrado con exito'})
    } catch (e) {
        console.log(e)
        res.status(500).json({e})
    }
}