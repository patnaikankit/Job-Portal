import express from "express";
import userAuth from "../middlewares/authMiddleware.js";
import { getUserController, userController } from "../controllers/userController.js";

const router = express.Router();

// routes
// get user info
router.post("/getUserData", userAuth, getUserController)

// update user info 
router.put("/update-info", userAuth, userController);

export default router;