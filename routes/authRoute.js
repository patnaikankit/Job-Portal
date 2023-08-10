import express from "express";
import { authController, loginController } from "../controllers/authController.js";

const router = express.Router();

// to register a new user
router.post("/register", authController);

// to login a user
router.get("/login", loginController);

export default router;