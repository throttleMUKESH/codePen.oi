"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const compilerController_1 = require("../controllers/compilerController");
const verifyTokenAnonymous_1 = require("../middleware/verifyTokenAnonymous");
const verifyToken_1 = require("../middleware/verifyToken");
const compilerRouter = express_1.default.Router();
compilerRouter.post("/save", verifyTokenAnonymous_1.verifyTokenAnonymous, compilerController_1.saveCode);
compilerRouter.post("/load", verifyTokenAnonymous_1.verifyTokenAnonymous, compilerController_1.loadCode);
compilerRouter.delete("/delete/:id", verifyToken_1.verifyToken, compilerController_1.deleteCode);
compilerRouter.put("/edit/:id", verifyToken_1.verifyToken, compilerController_1.editCode);
compilerRouter.get("/get-all-codes", compilerController_1.getAllCodes);
exports.default = compilerRouter;
