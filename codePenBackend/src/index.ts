import express, { Request, Response } from "express";
import cors from "cors";
import { config } from "dotenv";
import cookieParser from "cookie-parser";
import { dbConnect } from "./lib/dbConnect";

import compilerRouter from "./routes/compilerRoute";
import userRouter from "./routes/userRoute";

const app = express();

// Load environment variables from .env file
config();

// Connect to the database
dbConnect();

// CORS middleware
app.use(cors({ credentials: true, origin: "http://localhost:5173" }));

// Cookie parser middleware
app.use(cookieParser());

// Body parser middleware
app.use(express.json());

// Routes
app.get("/", (req: Request, res: Response) => {
    return res.status(200).send({
        success: true,
        message: "/ route"
    });
});

app.use("/compiler", compilerRouter);
app.use("/user", userRouter);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
