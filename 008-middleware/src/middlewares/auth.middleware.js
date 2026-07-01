export const validateRegister = (req, res, next) => {

    console.log("Validating registration data...");
    console.log("Request body:", req.body);
    req.user = {
        email: req.body.email,
        password: req.body.password,
        message: "User data validated successfully"
    };
    req.body = {}

    next();
}