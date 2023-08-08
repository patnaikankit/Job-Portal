import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema({
    fName: {
        type: String,
        required: [true, "First Name is required!"]
    },
    lName: {
        type: String
    },
    email: {
        type: String,
        required: [true, "Email is required!"],
        unique: true,
        validate: validator.isEmail
    },
    password: {
        type: String,
        required: [true, "Password is required!"],
        validate: validator.isAlphanumeric
    },
    location: {
        type: String,
    }
}, {timestamps: true});


userSchema.pre('save', async function(){
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
})

const userModel = mongoose.model('User', userSchema);

export default userModel;