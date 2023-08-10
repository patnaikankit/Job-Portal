import mongoose, { Mongoose } from "mongoose";

const jobSchema =  new mongoose.Schema({
    company: {
        type: String,
        required: [true, "Company name is required!"]
    },
    position: {
        type: String,
        required: [true, "Job position is required!"],
        maxlength: 100
    },
    status: {
        type: String,
        enum: ["pending", "reject", "interview"],
        default: "pending"
    },
    workType:{
        type: String,
        enum: ["full-time", "part-time", "internship", "contract"]
    },
    workLocation: {
        type: String,
        required: [true, "Work Location is required!"]
    },
    createdBy: {
        // will be using the user collection to refernce the user who is creating the job and the job will and only be stored for this particular userId
        type: mongoose.Types.ObjectId,
        ref: "User"
    }
}, {timestamps: true})

const jobModel = mongoose.model("Job", jobSchema);

export default jobModel;