import jwt from 'jsonwebtoken';
import config from '../config/config.js';


export const generateToken = (payload) => {
    const token = jwt.sign(payload, config.JWT_SECRET, { expiresIn: '1h' });
    return token;
}

export const verifyToken = (token) => {
    return jwt.verify(token, config.JWT_SECRET);
}