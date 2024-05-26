import express, { Request, Response } from "express";
const app = express();
import cors from "cors";
import { config } from "dotenv";
import cookieParser from "cookie-parser"
import { dbConnect } from "./lib/dbConnect";

import compilerRouter from "./routes/compilerRoute";
import userRouter from "./routes/userRoute";

app.use(express.json());
app.use(cors({credentials: true, origin:"http://localhost:5173" }));
config();
dbConnect();
app.use(cookieParser())


app.get("/", (req: Request, res: Response) => {
    const {} = req.body;
    return res.status(200).send({
        success: true,
        message: "/ route"
    })
})

app.use("/compiler", compilerRouter);
app.use("/user", userRouter)

app.listen(process.env.PORT, ()=> {
    console.log(`http://localhost: ${process.env.PORT}`);
})