/* eslint-disable no-throw-literal */
const jwt = require('jsonwebtoken');
require('dotenv').config();

const checkCredentialsExists = (req, res, next) => {
    if (!req.body || !req.body.email || !req.body.password) {
        return res.status(401).json({ message: "No se recibieron las credenciales en esta consulta" });
    }
    next();
}


const tokenVerification = (req, res, next) => {
    const bearerToken = req.header("Authorization");
    const token = bearerToken && bearerToken.split("Bearer ")[1];
    if (!token) {
        return res.status(401).json({
            message: "Debe incluir el token en las cabeceras (Authorization)"
        });
    }
    jwt.verify(token, process.env.SECRET, (err) => {
        if (err) {
            return res.status(401).json({
                message: "El token es inválido"
            });
        }
        next();
    });
};

module.exports = {
    checkCredentialsExists,
    tokenVerification
}