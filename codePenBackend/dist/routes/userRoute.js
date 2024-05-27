"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userController_1 = require("../controllers/userController");
const verifyToken_1 = require("../middleware/verifyToken");
const compilerController_1 = require("../controllers/compilerController");
const userRouter = express_1.default.Router();
userRouter.post("/signup", userController_1.signup);
userRouter.post("/login", userController_1.login);
userRouter.post("/logout", userController_1.logout);
userRouter.get("/user-details", verifyToken_1.verifyToken, userController_1.userDetails);
userRouter.get("/my-codes", verifyToken_1.verifyToken, compilerController_1.getMyCodes);
exports.default = userRouter;