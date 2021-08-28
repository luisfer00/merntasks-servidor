import express from 'express'
import cors from 'cors'
import DBConnection from './config/db.js'
import usuariosRouter from './routes/usuarios.js'
import authRouter from './routes/auth.js'
import proyectosRouter from './routes/proyectos.js'
import tareasRouter from './routes/tareas.js'
import dotenv from 'dotenv'

dotenv.config()

const PORT = process.env.PORT

const app = express()

DBConnection()

app.use(express.json())
app.use(cors())

app.use('/api/usuarios', usuariosRouter)
app.use('/api/auth', authRouter)
app.use('/api/proyectos', proyectosRouter)
app.use('/api/tareas', tareasRouter)

app.listen(PORT, () => {
    console.log(`server up at port ${PORT}`)
})
