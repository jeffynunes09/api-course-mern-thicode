import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import { findByIdService } from '../services/user.service.js';

dotenv.config();

export const authMiddleware = (req, res, next) => {
    
  const { authorization } = req.headers;

  if (!authorization) {

    return res.status(401).json({ message: 'Authorization header missing!' });
  }

  const parts = authorization.split(' ');

  if (parts.length !== 2 || parts[0] !== 'Bearer') {

    return res.status(401).json({ message: 'Token format invalid!' });
  }

  const token = parts[1];
  
  jwt.verify(token, process.env.SECRET, async (error, decoded) => {

    if (error) {

      return res.status(401).json({ message: 'Token invalid!' });
    }

    try {
      const user = await findByIdService(decoded.id);

      if (!user || !user.id) {

        return res.status(401).json({ message: 'Invalid Token!' });
      }
      req.userId = user.id;  

     return next();

    } catch (err) {

      return res.status(500).json({ message: 'Internal server error!' });
    }
  });
};
