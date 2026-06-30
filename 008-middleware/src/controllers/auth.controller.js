

export const register = (req, res) => {

    console.log("Registering user with email:", req.body);
    console.log(req.user)

    res.status(201).json({
        message: "User registered successfully",
    })

}