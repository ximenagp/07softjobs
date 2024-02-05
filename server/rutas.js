const jwt = require('jsonwebtoken')
require('dotenv').config()

const checkCredentialsExists = (req, res, next) => {
    const { email, password } = req.body
    if (!email || !password) {
        return res.status(401).json({ message: "No se recibieron las credenciales en esta consulta" })
    }
    next()
}


const tokenVerification = (req, res, next) => {
    const authHeader = req.header("Authorization")
    if (!authHeader) {
        return res.status(401).json({ message: "Debe incluir el token en las cabeceras (Authorization)" })
    }

    const token = authHeader.split("Bearer ")[1]
    try {
        jwt.verify(token, process.env.SECRET)
    } catch (err) {
        return res.status(401).json({ message: "El token es inválido" })
    }
    next()
}

module.exports = {
    checkCredentialsExists,
    tokenVerification
}