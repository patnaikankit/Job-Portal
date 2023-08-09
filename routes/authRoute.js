import express from "express";
import { authController, loginController } from "../controllers/authController.js";

const router = express.Router();

router.post("/register", authController);

router.get("/login", loginController);

export default router;