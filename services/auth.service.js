import Usuario from "../models/UserModel.js"
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config({ path: './.env' })



const loginService = (email) => Usuario.findOne({email:email}).select('+password')    

// GERANDO TOKEN              PAYLOAD ID        /       CHAVE       /       TEMPO
const generateToken = (id) => jwt.sign({id:id}, process.env.SECRET, { expiresIn: 84600 })

export {
    loginService,
    generateToken
}