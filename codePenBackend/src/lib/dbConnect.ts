import mongoose from "mongoose";

export const dbConnect = async () => {
    try {
        const mongoUri = process.env.MONGO_URI;

        if (!mongoUri) {
            throw new Error("MONGO_URI is not defined in the environment variables");
        }

        await mongoose.connect(mongoUri, {
            dbName: "codePenClone",
    
        });

        console.log("Connection to the database established");
    } catch (error) {
        console.error("Error connecting to the database:", error);
    }
};
