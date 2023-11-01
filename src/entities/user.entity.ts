import mongoose from "mongoose";

const userSchema=new mongoose.Schema({
    name:{
        type:String,
    },
    lastName: {
        type:String
    },
    sexo:{
        type:String
    },
    city:{
        type:String
    },
    age:{
        type:Number
    }
},{timestamps:true});

export const Users=mongoose.model("Users",userSchema);


