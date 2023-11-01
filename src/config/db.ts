import dotenv from "dotenv";
import mongoose from "mongoose";
dotenv.config();

export const connectionToDB = async () => {
    if(!process.env.URL_CONNECTION_DB){
        return new Error("Conection fail");
    }
  await mongoose.connect(process.env.URL_CONNECTION_DB);
  console.log("conection full");
};
