// auth logic
import userModel from "../models/userModel.js";

// signup logic/general auth logic
export const authController = async (req, res, next) => {
        const {fName, lName, email, password} = req.body;
        // validating user data
        if(!fName){
           next('Please provide your first name!');
        }
        if(!email){
            next('Please provide your email!');
        }
        if(!password){
            next('Please create a password!');
        }

        // to make sure one email is used for only one user
        const emailExist = await userModel.findOne({email});
        if(emailExist){
            next("Email already exists, Login or use a different mail!");
        }

        // if the data is validated - new user is created
        const user = await userModel.create({fName, lName, email, password});

        // generating jwt token
        const token = user.createJWT();

        res.status(200).send({
            success: true,
            message: "New user created successfully!",
            user: {
                firstName: (await user).fName,
                lastName: (await user).lName,
                email: (await user).email,
            },
            token
        });
}


// login logic
export const loginController = async (req, res, next) => {
    const { email, password } = req.body;

    // Validating user data
    if (!email || !password) {
        return res.status(400).send({
            success: false,
            message: "Please provide all the fields!"
        });
    }

    // Finding the user by email
    const user = await userModel.findOne({ email }).select("+password");
    if (!user) {
        return res.status(401).send({
            success: false,
            message: "Invalid username or password!"
        });
    }

    // Comparing passwords
    const match = await user.comparePassword(password);
    if (!match) {
        return res.status(401).send({
            success: false,
            message: "Invalid username or password!"
        });
    }

    // making the password undefined so that in the jwt token no one can decrypt it
    user.password = undefined;

    // User verified, create and send JWT token
    const token = user.createJWT();
    return res.status(200).send({
        success: true,
        message: "Login Successful!",
        user,
        token
    });
};
