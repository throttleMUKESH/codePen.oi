import { Request, Response } from "express";
import { Code } from "../models/codeModel";

export const saveCode = async (req: Request,res:Response) => {
    try {
          const {fullCode} = req.body
          const newCode = await Code.create({
            fullCode: fullCode
          })
          res.status(200).send({
            success: true,
            message: "successfull code saved",
            url: newCode._id
          })
    } catch (error) {
           console.log(error);
           return res.status(500).send ({
            success: false,
            message: "Erro in saving Code", error
           })
    }
}

export const loadCode = async(req: Request, res: Response) => {
    try {
      const {urlId} = req.body;
      const existingCode = await Code.findById(urlId);
      if(!existingCode) {
        return res.status(404).send({
            success: false,
            message: "Code not found"
        })
      }
      return res.status(200).send({
        success: true,
        message: "successfully code found",
        fullCode: existingCode.fullCode
      })
    } catch (error) {
        return res.status(200).send({
            success: false,
            message: "Error in Loading Code",
            error
        })
    }
}