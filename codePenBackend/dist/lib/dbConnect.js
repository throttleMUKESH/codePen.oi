"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.dbConnect = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const dbConnect = async () => {
    try {
        const mongoUri = process.env.MONGO_URI;
        if (!mongoUri) {
            throw new Error("MONGO_URI is not defined in the environment variables");
        }
        await mongoose_1.default.connect(mongoUri, {
            dbName: "codePenClone",
        });
        console.log("Connection to the database established");
    }
    catch (error) {
        console.error("Error connecting to the database:", error);
    }
};
exports.dbConnect = dbConnect;
