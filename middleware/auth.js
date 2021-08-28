import jwt from 'jsonwebtoken'

export default (req, res, next) => {
    const token = req.header('x-auth-token')
    if(!token) return res.status(401).json({msj: 'no hay token, permiso no valido'})
    
    try {
        const cifrado = jwt.verify(token, process.env.SECRET)
        req.usuario = cifrado.usuario
        next()
    } catch (e) {
        res.status(401).json({msj: 'token no valido'})
    }
}