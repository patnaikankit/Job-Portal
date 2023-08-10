import express from "express";
import userAuth from "../middlewares/authMiddleware.js";
import { deleteJobController, getJobsController, jobController, jobStatController, updateJobController } from "../controllers/jobController.js";

const router = express.Router();


// create jobs
router.post("/create-job", userAuth, jobController)

// get all jobs
router.get("/get-job", userAuth, getJobsController)

// update a job
router.patch("/update-job/:id", userAuth, updateJobController)

// delete a job
router.delete("/delete-job/:id", userAuth, deleteJobController)

// getting job stats
router.get("/job-stats", userAuth, jobStatController)

export default router;