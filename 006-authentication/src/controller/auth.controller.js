import userModel from "../models/user.model.js";



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
        password
    })

    const token = JSON.stringify({ id: user._id, username: user.username, email: user.email });

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
    const decoded = JSON.parse(token);


    const user = await userModel.findById(decoded.id);

    res.status(200).json({
        message: "Current user fetched successfully",
        user
    })
}