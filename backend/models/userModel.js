import mongoose from "mongoose";
const userSchema=new mongoose.Schema({
    name: {
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    age:{
        type:Number,
        required:false
    }

})

export const users=mongoose.model('user',userSchema)
