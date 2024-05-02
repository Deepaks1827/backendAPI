import User from "../models/user.models.js"
import bcrypt from "bcryptjs"

export const getAllUser = async(req,res,next)=>{
    let users;

    try {
       users= await User.find()
    } catch (error) {
        console.log("error in usercontroller" ,error);
    }
    if(!users){
        return res.status(404).json({message:"No user found"});

    }
    return res.status(200).json({users})
}
export const signup = async (req,res,next)=>{
    let existingUser;
    const {aname,email,password} = req.body;
    try {
        existingUser = await User.findOne({email})

        
    } catch (error) {
        console.log("error in signup: " ,error);
        
    }
    if (existingUser){
     return res.status(400).json({message:"User already exist with this email."})
    }
    const hashedPassword = bcrypt.hashSync(password)
    const user=new User({
        aname,
        email,
        password:hashedPassword
    });
    
    try {
       await user.save()
    } catch (error) {
        console.log(error);
    }
    return res.status(201).json({user})
}
export const loginUser = async(req,res,next)=>{
    let existingUser;
    const {email,password} = req.body;
    try {
        existingUser = await User.findOne({email})

        
    } catch (error) {
        console.log("error in Login: " ,error);
        
    }
    if (!existingUser){
     return res.status(400).json({message:"user not found go to signin again"})
    }
    const isPasswordCorrect = bcrypt.compareSync(password,existingUser.password);
    if (!isPasswordCorrect) {
        return res.status(404).json({message:"username or password not matched."})
        
    }
    return res.status(201).json({message:"Login Successful."})
}