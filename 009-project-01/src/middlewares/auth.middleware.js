import { verifyToken } from '../utils/auth.utils.js';


export const authenticate = (req, res, next) => {

    const token = req.cookies.token

    if (!token) {
        return res.status(401).json({ message: 'Unauthorized: No token provided' });
    }

    try {

        const decoded = verifyToken(token);
        req.user = decoded;
        next();

    } catch (error) {
        return res.status(401).json({ message: 'Unauthorized: Invalid token' });
    }

}