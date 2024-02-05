/* eslint-disable no-throw-literal */
const pool = require("../db/conexion")
const bcrypt = require("bcryptjs")

const registrarUsuario = async (usuario) => {
  const { email, password, rol, lenguage } = usuario
  const passwordEncriptada = await bcrypt.hash(password, 10)
  const values = [email, passwordEncriptada, rol, lenguage]
  const consultas = "INSERT INTO usuarios (email, password, rol, lenguage) VALUES ($1, $2, $3, $4)"
  await pool.query(consultas, values)
}

const obtenerDatosDeUsuario = async (email) => {
  const consulta = "SELECT * FROM usuarios WHERE email = $1"
  const result = await pool.query(consulta, [email])
  if (result.rowCount === 0) {
    throw {
      code: 404,
      message: "No se encontró ningún usuario con este email",
    }
  }
  const { password, ...usuarioSinPassword } = result.rows[0]
  return usuarioSinPassword
}

const verificarCredenciales = async (email, password) => {
  const consulta = "SELECT password FROM usuarios WHERE email = $1"
  const result = await pool.query(consulta, [email])
  if (result.rowCount === 0 || !(await bcrypt.compare(password, result.rows[0].password))) {
    throw { code: 401, message: "Email o contraseña incorrecta" }
  }
}

module.exports = {
  registrarUsuario,
  obtenerDatosDeUsuario,
  verificarCredenciales,
}