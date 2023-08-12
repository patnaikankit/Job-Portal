import express from "express";
import { authController, loginController } from "../controllers/authController.js";
import rateLimit from 'express-rate-limit'
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

// ip limiter
const limiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
	standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers
	// store: ... , // Use an external store for more precise rate limiting
})

/**
 * @swagger
 * components:
 *   schema:
 *     User:
 *       type: object
 *       required:
 *         - fName
 *         - lName
 *         - email
 *         - password
 *         - location
 *       properties:
 *         id:
 *           type: string
 *           description: Auto-generated user collection id
 *         fName:
 *           type: string
 *           description: First name of user
 *         lName:
 *           type: string
 *           description: Last name of user
 *         email:
 *           type: string
 *           description: Email id of user
 *         password:
 *           type: string
 *           description: User Password should be greater than 6 letters
 *         location:
 *           type: string
 *           description: Location of user
 *       example:
 *         id: nc84ov7843h
 *         fName: John
 *         lName: Doe
 *         email: john@gmail.com
 *         password: john123
 *         location: NY
 */


const router = express.Router();

/**
 *  @swagger
 *  tags:
 *    name: Auth
 *    description: Authentication-apis
 */

/**
 * @swagger
 * /api/v1/auth/register:
 *    post:
 *      summary: Register a new user
 *      tags: [Auth]
 *      requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *      responses:
 *        200:
 *          description: User created successfully
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/User'
 *        500:
 *          description: Internal serevr error
 */

// to register a new user
router.post("/register", limiter, authController);

/**
 * @swagger
 * /api/v1/auth/login:
 *  post:
 *    summary: login page
 *    tags: [Auth]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/User'
 *    responses:
 *      200:
 *        description: Login successfull
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/User'
 *      500:
 *        description: Something went wrong
 */

// to login a user
router.get("/login", limiter, loginController);

export default router;