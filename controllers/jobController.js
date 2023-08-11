import mongoose from "mongoose"
import jobModel from "../models/jobModel.js"
import moment from "moment/moment.js"

// logic to create a new job
export const jobController = async (req, res, next) => {
    const { company, position, workType, workLocation } = req.body
    if(!company || !position || !workType || !workLocation){
        next("Please provide all the fields!")
    }
    // the job details should be stored only for the user who created it
    req.body.createdBy = req.user.userId
    const job = await jobModel.create(req.body);
    res.status(201).json({job});
}


// logic to create get all the job listings
export const getJobsController = async (req, res, next) => {
    // filters added
    const { status, workType, position, sort } = req.query
    // condition to filter data
    const queryObject = {
        createdBy: req.user.userId
    }

    // logic filters on the basis of application status
    if(status && status !== 'all'){
        queryObject.status = status
    }

    // logic filters on the basis of mode of employibility
    if(workType && workType !== 'all'){
        queryObject.workType = workType
    }

    // logic filters on the basis of position
    if(position){
        // the user is not expected to write the full position name so we will show them every matching string with any job with the same keywords
        queryObject.position = {$regex: position, $options: 'i'}
    }

    let queryResult = jobModel.find(queryObject);

    // sorting data
    // will be done according to the date the job was posted
    // will be sorted in latest to oldest
    if(sort === 'latest'){
        queryResult =  queryResult.sort('-createdAt')
    }

    // will be sorted in oldest to latest
    if(sort === 'oldest'){
        queryResult = queryResult.sort('createdAt')
    }

    // will be sorted alphabetically
    if(sort === 'a-z'){
        queryResult = queryResult.sort('position')
    }


    // Pagination
    const page = Number(req.query.page) || 1
    const limit = Number(req.query.limit) || 20
    // to make sure we are not showing the first 20 jobs in the next page
    const skip = (page - 1)*limit

    queryResult = queryResult.skip(skip).limit(limit);

    const totalJobs = await jobModel.countDocuments(queryResult)
    const numPages = Math.ceil(totalJobs/limit)

    const jobs = await queryResult;

    // to get all jobs - no filters added
    // const jobs = await jobModel.find({createdBy: req.user.userId});
    res.status(200).json({
        numPages,
        totalJobs,
        jobs
    })
}


// logic to create edit a job
export const updateJobController = async (req, res, next) => {
    const { id } = req.params
    const { company, position, workType, workLocation } = req.body
    if(!company || !position || !workType || !workLocation){
        next("Please provide all the fields!")
    }
    const job = await jobModel.findOne({_id: id})
    if(!job){
        next(`Job Id ${id} doesn't exist!`)
    }

    // we have to make sure that if the job exists it can be edited by the user who created it and no one else
    // createdBy is stored as an objet in the db which has to be converted to a string for comparison
    if(!req.user.userId === job.createdBy.toString()){
        next("You are not authorized to edit this job listing!")
        return 
    }
    const updateJob = await jobModel.findOneAndUpdate({_id: id}, req.body, {
        new: true,
        // runs an extra auth check before making the update
        runValidators: true
    });
    res.status(200).json({updateJob});
}


// logic to create delete a job
export const deleteJobController = async (req, res, next) => {
    const { id } = req.params
    const job = await jobModel.findOne({_id: id})
    if(!job){
        next(`Job Id ${id} doesn't exist!`)
    }

    // we have to make sure that if the job exists it can be deleted by the user who created it and no one else
    // createdBy is stored as an objet in the db which has to be converted to a string for comparison
    if(!req.user.userId === job.createdBy.toString()){
        next("You are not authorized to delete this job listing!")
        return 
    }
    await job.deleteOne();
    res.status(200).json({message: "Job listing successfully deleted!"})
}


// stats and filtering data - to visualize data in better format
// will be shown in year, month wise
export const jobStatController = async (req, res) => {
    // first we will show data according the status of the application
    const stats = await jobModel.aggregate([
        {
            // match is used to filter out data
            // here we are removing every user except the logged in user
            $match: {
                createdBy: new mongoose.Types.ObjectId(req.user.userId)
            }
        },
        {
            // group joins the related data according to a condition set by user
            // here we are joining the all the application having the same status
            // group is generally accompanied by sum to calculate data in each data field
            $group: {
                _id: '$status', count: { $sum: 1 }
            }
        }
    ]);

    // const statsObj = {};
    //     stats.forEach(stat => {
    //         statsObj[stat._id] = stat.count;
    //     });

    // default stats
    // const defaultStats = {
    //     pending: stats.pending || 0,
    //     reject: stats.reject || 0,
    //     interview: stats.interview || 0
    // };


    // then we will show data according to the date when it was applied
    let monthlyApplication = await jobModel.aggregate([
        {
            // here we are removing every user except the logged in user
            $match: {
                createdBy: new mongoose.Types.ObjectId(req.user.userId)
            }
        },
        {
            // here we are joining the all the application which were applied in the same month
            $group: {
                _id: {
                    year: {$year: '$createdAt'},
                    month: {$month: '$createdAt'}
                },
                count: {
                    $sum: 1
                }
            }
        }
    ])

    // here we are using moment to represent data in a better format
    monthlyApplication = monthlyApplication.map(item => {
        const {_id: {year, month}, count} = item
        const date = moment().month(month - 1).year(year - 1).format("MMM Y")
        return { date, count }
    })
    .reverse()

    res.status(200).json({ 
        totalJobs: stats.length,
        stats,
        monthlyApplication 
    })
}