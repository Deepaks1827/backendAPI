import mongoose from "mongoose";
const Schema = mongoose.Schema;
const userSchema = new Schema({
    aname:{
        type:String,
        require:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
        minlength:6
    }
},{timestamps:true})
export default mongoose.model("User",userSchema);