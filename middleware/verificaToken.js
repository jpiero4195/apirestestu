import jwt from 'jsonwebtoken'
const verificaToken = (req, res, next) => {
const authHeader = req.headers.authorization
if (!authHeader || !authHeader.startsWith('Bearer')) {
  return res.status(401).json({ mensaje: 'Token no proporcionado' })
}
const token = authHeader.split(' ')[1]
try {
const decoded = jwt.verify(token, process.env.JWT_SECRET)
req.usuario = decoded
next()
} catch (error) {
res.status(401).json({ mensaje: 'Token inválido o expirado' })
}
}
export default verificaToken