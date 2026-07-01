import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [ true, 'Username is required' ],
        unique: [ true, 'Username already exists' ],
        trim: true,
        minlength: [ 3, 'Username must be at least 3 characters long' ],
        lowercase: true
    },
    email: {
        type: String,
        required: [ true, 'Email is required' ],
        unique: [ true, 'Email already exists' ],
        trim: true,
        lowercase: true
    },
    password: {
        type: String,
        required: [ true, 'Password is required' ],
        minlength: [ 6, 'Password must be at least 6 characters long' ]
    }
})


userSchema.pre("save", async function () {
    if (this.isModified("password")) {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
    }
})

userSchema.methods.comparePassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
}

const userModel = mongoose.model("users", userSchema);

export default userModel;