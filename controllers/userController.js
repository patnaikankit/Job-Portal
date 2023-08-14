import userModel from "../models/userModel.js";

export const userController = async (req, res, next) => {
    const { fName, location, lName, email } = req.body;
    
    // Check for missing fields and provide a proper error response
    if (!fName || !location || !lName || !email) {
        next("Please provide all the field!");
    }
    
    const user = await userModel.findOne({ _id: req.user.userId });

    // Check if the user exists
    if(!user) {
        return res.status(404).json({ error: "User not found" });
    }

    // Update user profile fields
    user.fName = fName;
    user.lName = lName;
    user.email = email;
    user.location = location;

    await user.save();

    const token = user.createJWT();

    res.status(200).json({
        user,
        token
    });
};


export const getUserController = async (req, res, next) => {
    try{
        const user = await userModel.findById({_id: req.body.user.userId})
        // making the password undefined in initial state so that we can protect it during state transfer
        user.password = undefined
        if(!user){
            return res.status(200).send({
                message: "User not found!",
                success: false
            })
        }
        else{
            res.status(200).send({
                success: true,
                data: user
            })
        }
    }
    catch(error){
        console.log(error);
        res.status(500).send({
            message: "Auth Error",
            success: false,
            error: error.message
        })
    }
}
