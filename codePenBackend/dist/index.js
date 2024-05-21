"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
app.get("/", (req, res) => {
    const {} = req.body;
    return res.status(200).send({
        success: true,
        message: "/ route"
    });
});
const PORT = 4000;
app.listen(PORT, () => {
    console.log(`http://localhost: ${PORT}`);
});
