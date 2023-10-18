import express from "express";
import dotenv from "dotenv";
import helmet from "helmet";
import cors from "cors";
import morgan from "morgan";
import userRouter from "./routes/user.router";
dotenv.config();

const optionsCors={
    origin:"*",
};

const app=express();

app.use(cors(optionsCors));
app.use(helmet());
app.use(express.json());
app.use(morgan("dev"));

app.use("/api/user/",userRouter);


export default app;