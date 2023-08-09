import express from "express";
import userAuth from "../middlewares/authMiddleware.js";
import { userController } from "../controllers/userController.js";

const router = express.Router();

// routes

// update info 
router.put("/update-info", userAuth, userController);

export default router;