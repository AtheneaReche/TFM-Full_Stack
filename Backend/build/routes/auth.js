"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var authController_1 = require("../../app/controllers/authController");
var router = (0, express_1.Router)();
/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Register a new user
 *     description: Creates a new user and automatically creates a "Favourites" collection for them.
 *     tags:
 *       - Auth
 *     parameters:
 *       - in: body
 *         name: user
 *         description: User details to register.
 *         required: true
 *         schema:
 *           type: object
 *           required:
 *             - name
 *             - password
 *             - email
 *           properties:
 *             name:
 *               type: string
 *               description: The user's name
 *               example: "JohnDoe"
 *             password:
 *               type: string
 *               description: The user's password
 *               example: "password123"
 *             email:
 *               type: string
 *               description: The user's email address
 *               example: "johndoe@example.com"
 *             role:
 *               type: string
 *               description: The user's role (default is "user")
 *               example: "user"
 *     responses:
 *       201:
 *         description: User registered successfully
 *       500:
 *         description: Error registering user
 */
router.post('/register', authController_1.register);
/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Login to the system
 *     description: Authenticates the user with the provided name and password, and returns a JWT token.
 *     tags:
 *       - Auth
 *     parameters:
 *       - in: body
 *         name: credentials
 *         description: User credentials for login.
 *         required: true
 *         schema:
 *           type: object
 *           required:
 *             - name
 *             - password
 *           properties:
 *             name:
 *               type: string
 *               description: The user's name
 *               example: "JohnDoe"
 *             password:
 *               type: string
 *               description: The user's password
 *               example: "password123"
 *     responses:
 *       200:
 *         description: User logged in successfully, returns JWT token
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   example: "your_jwt_token"
 *       400:
 *         description: Invalid credentials
 *       500:
 *         description: Error logging in
 */
router.post('/login', authController_1.login);
exports.default = router;
