import mongoose from "mongoose";


const userSchema=new mongoose.Schema({
    username:String,
    email:String,
    password:String,
    role:String,
    token:String,
})

const user =mongoose.model("user",userSchema)

export default user;