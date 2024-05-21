import express from "express";
import { loadCode, saveCode } from "../controllers/compilerController";
const compilerRoute = express.Router();

compilerRoute.post("/save", saveCode);
compilerRoute.post("/load", loadCode);

export default compilerRoute;
