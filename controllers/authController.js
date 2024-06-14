import bcrypt from 'bcryptjs'
import { loginService ,generateToken} from '../services/auth.service.js'

const login = async (req,res) => {

    try {
        const {email,password} = req.body

            const user = await loginService(email)

            if(!user){
                res.status(404).json({
                    message: 'User or Password Not found!'
                })
            }
            //COMPARANDO SENHAS CLIENTE E BANCO
            const passwordIsValid = await bcrypt.compare(password,user.password)
            
            
            if(!passwordIsValid || !user){
                res.status(401).json({
                    message: 'User or Password Not found!'
                })
            }

            //RECEBENDO TOKEN E MANDANDO PRO CLIENTE
            const token = generateToken(user._id)

            res.status(200).json({
              token
            })
        
    } catch (error) {
       console.log(error)
    }


 
    
}

export {
    login
}