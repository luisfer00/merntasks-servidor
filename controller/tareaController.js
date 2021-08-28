import Tarea from '../models/Tarea.js'
import Proyecto from '../models/Proyecto.js'
import { validationResult } from 'express-validator'

export const obtenerTareas = async (req, res) => {
    try {
        const proyecto = await Proyecto.findById(req.params.proyectoId)
        if(!proyecto) return res.status(404).json({msj:'proyecto no encontrado'})
        if(proyecto.creador.toString() !== req.usuario.id) return res.status(401).json({msj: "usuario no autorizado"})

        const tareas = await Tarea.find({proyecto: req.params.proyectoId})
        res.json(tareas)
    } catch (e) {
        console.log(e)
        res.status(500).json({e})
    }
}
export const crearTarea = async (req, res) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()) return res.status(400).json({error: errors.array()})

    
    try {
        const {proyecto} = req.body
        const proyectoEncontrado = await Proyecto.findById(proyecto)
        if(!proyectoEncontrado) return res.status(404).json({msj:'proyecto no encontrado'})
        if(proyectoEncontrado.creador.toString() !== req.usuario.id) return res.status(401).json({msj: "usuario no autorizado"})
        
        const tarea = new Tarea(req.body)
        await tarea.save()
        res.json(tarea)
    } catch (e) {
        console.log(e)
        res.status(500).json({e})
    }
}

export const actualizarTarea = async (req, res) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()) return res.status(400).json({error: errors.array()})

    try {
        const {proyecto, nombre, estado} = req.body
        let tarea = await Tarea.findById(req.params.tareaId)
        if(!tarea) return res.status(404).json({msj:'tarea no encontrada'})
        
        const proyectoEncontrado = await Proyecto.findById(proyecto)
        if(proyectoEncontrado.creador.toString() !== req.usuario.id) return res.status(401).json({msj: "usuario no autorizado"})

        const nuevaTarea = {}

        nuevaTarea.nombre = nombre
        nuevaTarea.estado = estado

        tarea = await Tarea.findByIdAndUpdate(req.params.tareaId, nuevaTarea, { new: true})
        res.json(tarea)
    } catch (e) {
        console.log(e)
        res.status(500).json({e})
    }
}

export const eliminarTarea = async (req, res) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()) return res.status(400).json({error: errors.array()})
    try {
        const proyecto = await Proyecto.findById(req.params.proyectoId)
        if(!proyecto) return res.status(404).json({msj:'proyecto no encontrado'})
        if(proyecto.creador.toString() !== req.usuario.id) return res.status(401).json({msj: "usuario no autorizado"})

        await Tarea.findByIdAndDelete(req.params.tareaId)
        res.status(200).json({msj: 'tarea borrada con exito'})
    } catch (e) {
        console.log(e)
        res.status(500).json({e})
    }
}

export const eliminarTareas = async (req, res) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()) return res.status(400).json({error: errors.array()})
    try {
        const proyecto = await Proyecto.findById(req.params.proyectoId)
        if(!proyecto) return res.status(404).json({msj:'proyecto no encontrado'})
        if(proyecto.creador.toString() !== req.usuario.id) return res.status(401).json({msj: "usuario no autorizado"})

        await Tarea.deleteMany({proyecto: req.params.proyectoId})
        res.status(200).json({msj: 'tareas borradas con exito'})
    } catch (e) {
        console.log(e)
        res.status(500).json({e})
    }
}