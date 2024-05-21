import express, { Request, Response } from "express";
const app = express();
import cors from "cors";
import { config } from "dotenv";
import { dbConnect } from "./lib/dbConnect";
import compilerRoute from "./routes/compilerRoute";

app.use(express.json());
app.use(cors());
config();
dbConnect();


app.get("/", (req: Request, res: Response) => {
    const {} = req.body;
    return res.status(200).send({
        success: true,
        message: "/ route"
    })
})

app.use("/compiler", compilerRoute)

app.listen(process.env.PORT, ()=> {
    console.log(`http://localhost: ${process.env.PORT}`);
})