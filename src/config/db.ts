import {  DataSource} from "typeorm";
import dotenv from "dotenv";
import { User } from "../entities/user.entity";
dotenv.config();

export const AppDataSource=new DataSource({
    type:"mysql",
    host:process.env.HOST_DB,
    username:process.env.USER_DB,
    password:process.env.PASSWORD_DB,
    database:process.env.NAME_DB,
    port:3306,
    entities:[User],
    synchronize:true
});