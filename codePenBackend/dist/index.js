"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = require("dotenv");
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const dbConnect_1 = require("./lib/dbConnect");
const compilerRoute_1 = __importDefault(require("./routes/compilerRoute"));
const userRoute_1 = __importDefault(require("./routes/userRoute"));
app.use(express_1.default.json());
app.use((0, cors_1.default)({ credentials: true, origin: "http://localhost:5173" }));
(0, dotenv_1.config)();
(0, dbConnect_1.dbConnect)();
app.use((0, cookie_parser_1.default)());
app.get("/", (req, res) => {
    const {} = req.body;
    return res.status(200).send({
        success: true,
        message: "/ route"
    });
});
app.use("/compiler", compilerRoute_1.default);
app.use("/user", userRoute_1.default);
app.listen(process.env.PORT, () => {
    console.log(`http://localhost: ${process.env.PORT}`);
});
