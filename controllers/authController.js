import userModel from "../models/userModel.js";

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
        const user = userModel.create({fName, lName, email, password});
        res.status(200).send({
            success: true,
            message: "New user created successfully!",
            user: {
                firstName: (await user).fName,
                lastName: (await user).lName,
                email: (await user).email,
            }
        });
}