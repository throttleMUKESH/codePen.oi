import { Request, Response } from "express";
import { User } from "../models/userModel";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const signup = async (req: Request, res: Response) => {
  const { username, email, password } = req.body;
  const usernameRegex = /^[a-zA-Z0-9]+$/;
  try {
    const existingUser = await User.findOne({ email: email });
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
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = await User.create({
      username,
      email,
      password: hashedPassword,
    });
    return res.status(201).send({
      success: true,
      message: "Successfully user created",
      user,
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "Error signing up!",
      error: error,
    });
  }
};

export const login = async (req: Request, res: Response) => {
  const { userId, password } = req.body;
 
  try {
    let existingUser = undefined;
    if (userId.includes("@")) {
        existingUser = await User.findOne({ email: userId });
      } else {
        existingUser = await User.findOne({ username: userId });
      }

    if (!existingUser) {
      return res.status(400).send({
        success: false,
        message: "User not found",
      });
    }

    const passwordMatched = await bcrypt.compare(
      password,
      existingUser.password
    );

    if (!passwordMatched) {
      return res.status(400).send({
        success: false,
        message: "wrong password",
      });
    }

    const jwtToken = jwt.sign(
      {
        _id: existingUser._id,
        email: existingUser.email,
      },
      process.env.JWT_KEY!,
      {
        expiresIn: "1d",
      }
    );

    res.cookie("token", jwtToken, {
      path: "/",
      expires: new Date(Date.now() + 1000 * 60 * 60 * 24),
      httpOnly: true,
      sameSite: "lax",
    });

    return res.status(200).send({
      success: true,
      existingUser,
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "Error log in!",
      error: error,
    });
  }
};

export const logout = async (req: Request, res: Response) => {
  try {
    res.clearCookie("token");
    return res.status(200).send({
      success: true,
      message: "logged out successfully!",
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "Error logging out!",
      error,
    });
  }
};
