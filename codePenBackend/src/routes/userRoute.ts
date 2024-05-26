import express from "express";
import {signup, login, logout, userDetails} from "../controllers/userController";

import { verifyToken } from "../middleware/verifyToken";
import { getMyCodes } from "../controllers/compilerController";

 const userRouter = express.Router();


 userRouter.post("/signup", signup)
 userRouter.post("/login", login)
 userRouter.post("/logout", logout);
 userRouter.get("/user-details", verifyToken, userDetails)
 userRouter.get("/my-codes", verifyToken, getMyCodes)




  export default userRouter;