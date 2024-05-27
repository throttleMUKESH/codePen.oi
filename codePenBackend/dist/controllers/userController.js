"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userDetails = exports.logout = exports.login = exports.signup = void 0;
const userModel_1 = require("../models/userModel");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const signup = async (req, res) => {
    const { username, email, password } = req.body;
    const usernameRegex = /^[a-zA-Z0-9]+$/;
    try {
        const existingUser = await userModel_1.User.findOne({ email: email });
        if (existingUser) {
            return res.status(400).send({
                success: false,
                message: "User already exists!",
            });
        }
        if (!usernameRegex.test(username)) {
            return res.status(400).send({
                success: false,
                message: "Username must be a-z A-Z 0-9",
            });
        }
        const salt = await bcrypt_1.default.genSalt();
        const hashedPassword = await bcrypt_1.default.hash(password, salt);
        const user = await userModel_1.User.create({
            username,
            email,
            password: hashedPassword,
        });
        const jwtToken = jsonwebtoken_1.default.sign({
            _id: user._id,
            email: user.email,
        }, process.env.JWT_KEY, {
            expiresIn: "1d"
        });
        res.cookie("token", jwtToken, {
            path: "/",
            expires: new Date(Date.now() + 1000 * 60 * 60 * 24),
            httpOnly: true,
            sameSite: "lax"
        });
        return res.status(201).send({
            success: true,
            message: "Successfully user created",
            username: user.username,
            picture: user.picture,
            email: user.email,
            savedCodes: user.savedCodes
        });
    }
    catch (error) {
        return res.status(500).send({
            success: false,
            message: "Error signing up!",
            error: error,
        });
    }
};
exports.signup = signup;
const login = async (req, res) => {
    const { userId, password } = req.body;
    try {
        let existingUser = undefined;
        if (userId.includes("@")) {
            existingUser = await userModel_1.User.findOne({ email: userId });
        }
        else {
            existingUser = await userModel_1.User.findOne({ username: userId });
        }
        if (!existingUser) {
            return res.status(400).send({
                success: false,
                message: "User not found",
            });
        }
        const passwordMatched = await bcrypt_1.default.compare(password, existingUser.password);
        if (!passwordMatched) {
            return res.status(400).send({
                success: false,
                message: "wrong password",
            });
        }
        const jwtToken = jsonwebtoken_1.default.sign({
            _id: existingUser._id,
            email: existingUser.email,
        }, process.env.JWT_KEY, {
            expiresIn: "1d",
        });
        res.cookie("token", jwtToken, {
            path: "/",
            expires: new Date(Date.now() + 1000 * 60 * 60 * 24),
            httpOnly: true,
            sameSite: "lax",
        });
        return res.status(200).send({
            success: true,
            username: existingUser.username,
            picture: existingUser.picture,
            email: existingUser.email,
            saveCodes: existingUser.savedCodes,
        });
    }
    catch (error) {
        return res.status(500).send({
            success: false,
            message: "Error log in!",
            error: error,
        });
    }
};
exports.login = login;
const logout = async (req, res) => {
    try {
        res.clearCookie("token");
        return res.status(200).send({
            success: true,
            message: "logged out successfully!",
        });
    }
    catch (error) {
        return res.status(500).send({
            success: false,
            message: "Error logging out!",
            error,
        });
    }
};
exports.logout = logout;
const userDetails = async (req, res) => {
    const userId = req._id;
    try {
        const user = await userModel_1.User.findById(userId);
        if (!user) {
            return res.status(404).send({
                success: false,
                message: "Can not find the user",
            });
        }
        return res.status(200).send({
            success: true,
            username: user.picture,
            picture: user.picture,
            email: user.email,
            saveCodes: user.savedCodes,
        });
    }
    catch (error) {
        return res.status(500).send({
            success: false,
            message: "Can not fetch user details",
        });
    }
};
exports.userDetails = userDetails;
