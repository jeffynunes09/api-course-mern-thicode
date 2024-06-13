
import mongoose from 'mongoose';
import Usuario from '../models/UserModel.js';
 



// MIDDLEWARE DE VERIFICAÇÃO DE CADASTRO
const userNotValid = async (req, res, next) => {
    const {email, userName } = req.body;

    try {
        const user =  await Usuario.findOne({email, userName});

        if (user) {
            if (user.email === email) {
                return res.status(400).json({ message: 'Email already exists!' });
            }
            if (user.userName === userName) {
                return res.status(400).json({ message: 'UserName already exists!' });
            }
        }

        next();
        
    } catch (error) {
        return res.status(500).json({ message: 'Internal server error' });
    }
};

//  MIDDLEWARE DE VERIFICAÇÃO DE ID
const idISValid = async (req,res,next) => {
    const id = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({
            message: 'Invalid Id!'
        });
        
    }
    next()
   
}
 
export {
    userNotValid,idISValid
};
