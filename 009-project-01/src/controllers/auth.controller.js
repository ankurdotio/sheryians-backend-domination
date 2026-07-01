import userModel from '../models/user.model.js';
import { generateToken, verifyToken } from '../utils/auth.utils.js';


/**
 * @route   POST /api/auth/register
 * @desc    Register a new user
 * @access  Public
 */
export const registerUser = async (req, res) => {

    const { username, email, password } = req.body;

    const isUserExists = await userModel.findOne({
        $or: [
            { username: username.toLowerCase() },
            { email: email.toLowerCase() }
        ]
    })

    if (isUserExists) {
        return res.status(400).json({
            message: 'Username or email already exists'
        })
    }


    const user = await userModel.create({
        username: username.toLowerCase(),
        email: email.toLowerCase(),
        password
    })


    const token = generateToken({ id: user._id, username: user.username })

    res.cookie('token', token, {
        maxAge: 3600000, // 1 hour
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict'
    })

    res.status(201).json({
        message: 'User registered successfully',
        user: {
            id: user._id,
            username: user.username,
            email: user.email
        }
    })


}


/**
 * @route   POST /api/auth/login
 * @desc    Login a user
 * @access  Public
 */
export const loginUser = async (req, res) => {

    const { email, password } = req.body;

    const user = await userModel.findOne({ email: email.toLowerCase() })

    if (!user) {
        return res.status(400).json({
            message: 'Invalid email or password'
        })
    }

    const isPasswordValid = await user.comparePassword(password)

    if (!isPasswordValid) {
        return res.status(400).json({
            message: 'Invalid email or password'
        })
    }

    const token = generateToken({ id: user._id, username: user.username })

    res.cookie('token', token, {
        maxAge: 3600000, // 1 hour
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict'
    })

    res.status(200).json({
        message: 'User logged in successfully',
        user: {
            id: user._id,
            username: user.username,
            email: user.email
        }
    })

}