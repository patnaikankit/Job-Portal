// User Schema
import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";
import JWT from "jsonwebtoken";

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
        validate: validator.isEmail,
    },
    password: {
        type: String,
        required: [true, "Password is required!"],
        minlength: [6, "Password length should be greater than 6 character"],
        select: true,
    },
    location: {
        type: String,
    }
}, {timestamps: true});


// hashing password before saving it in the database
userSchema.pre('save', async function(next){
    // to check if the password was changed
    if(!this.isModified("password")){
        return next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
})


// creating jwt token essentials
userSchema.methods.createJWT = function(){
    return JWT.sign({userId: this._id}, process.env.SECRET_KEY, {expiresIn: "1d"});
}


// comapring passwords during login logic
userSchema.methods.comparePassword = async function(userPassword){
    const match = await bcrypt.compare(userPassword, this.password);
    return match;
} 


const userModel = mongoose.model('User', userSchema);

export default userModel;