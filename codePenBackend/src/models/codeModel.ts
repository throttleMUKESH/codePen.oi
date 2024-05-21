import mongoose from "mongoose";

interface IcodeSchema {
  fullCode: {
    html: string;
    css: string;
    javascript: string;
  };
}

const CodeSchema = new mongoose.Schema<IcodeSchema>({
  fullCode: {
    html: String,
    css: String,
    javascript: String,
  },
});

export const Code = mongoose.model("Code", CodeSchema);