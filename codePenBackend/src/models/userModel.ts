import mongoose from "mongoose";
import { Code } from "./codeModel";

interface IUserSchema {
    username: string,
    email: string,
    password: string,
    picture: string,
    savedCodes: Array<mongoose.Types.ObjectId>
}

const UserSchema = new mongoose.Schema<IUserSchema>(
  {
    username: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
    },
    picture: {
      type: String,
      default:
        "https://www.google.com/url?sa=i&url=https%3A%2F%2Fstock.adobe.com%2Fsearch%2Fimages%3Fk%3Ddefault%2Bprofile%2Bpicture&psig=AOvVaw1wVFSOz0YoERMmwPPelZGn&ust=1716471787037000&source=images&cd=vfe&opi=89978449&ved=0CBIQjRxqFwoTCMDG7ICyoYYDFQAAAAAdAAAAABAE",
    },
    savedCodes: [{ type: mongoose.Schema.Types.ObjectId,
     ref: "Code"
    }]
  },

  { timestamps: true }
);

export const User = mongoose.model("User", UserSchema);
