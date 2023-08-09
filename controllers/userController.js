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
