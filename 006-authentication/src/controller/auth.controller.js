import userModel from "../models/user.model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";



/**
 * Controller function to register a new user
 * @summary Register a new user
 * @tags Authentication
 */
export async function registerUser(req, res) {

    const { username, email, password } = req.body;

    const isUserExists = await userModel.findOne({ $or: [ { username }, { email } ] });

    if (isUserExists) {
        return res.status(400).json({ message: "User already exists" });
    }

    const user = await userModel.create({
        username,
        email,
        password: await bcrypt.hash(password, 10)
    })

    const token = jwt.sign({ id: user._id, username: user.username, email: user.email },
        process.env.JWT_SECRET,
        {
            expiresIn: "1d"
        }
    )

    res.cookie("token", token, {
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24 // 1 day
    })

    res.status(201).json({
        message: "User registered successfully"
    })

}


/**
 * Controller function to get the current logged-in user
 * @summary Get the current logged-in user
 * @tags Authentication
 */
export async function getCurrentUser(req, res) {

    const token = req.cookies.token
    let decoded;

    try {
        decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
        return res.status(401).json({ message: "Invalid token" });
    }



    const user = await userModel.findById(decoded.id);

    res.status(200).json({
        message: "Current user fetched successfully",
        user
    })
}



/**
 * Controller function to login a user
 * @summary Login a user
 * @tags Authentication
 */
export async function loginUser(req, res) {

    const { email, password } = req.body;

    const user = await userModel.findOne({ email });

    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }


    const isPasswordValid = await bcrypt.compare(password, user.password);
    
    if (!isPasswordValid) {
        return res.status(401).json({ message: "Invalid password" });
    }

    const token = jwt.sign({ id: user._id, username: user.username, email: user.email },
        process.env.JWT_SECRET,
        {
            expiresIn: "1d"
        }
    )

    res.cookie("token", token, {
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24 // 1 day
    })

    res.status(200).json({
        message: "User logged in successfully"
    })
}
