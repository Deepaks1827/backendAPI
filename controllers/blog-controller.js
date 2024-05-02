import { request } from "express";
import Blog from "../models/blog.model.js"
import User from "../models/user.models.js";
import mongoose from "mongoose";

export const getAllBlog= async(req,res,next)=>{
    let blogs;
    try {
      blogs=  await Blog.find();
    } catch (error) {
        console.log("error to getting all blogs: ",error);
    }
    if (!blogs) {
        return res.status(400).json({message:"No blog found"})
    }
    return res.status(200).json({blogs})
}
export const addBlog = async(req,res,next)=>{
    const {title,discription,image,user} = req.body;
    let existingUser;
    try {
        existingUser= await User.findById(user);
        
    } catch (error) {
        return console.log(error);
    }
    if (!existingUser) {
        return res.status(400).json({message:"Unable to find user"})
    }
    const blog= new Blog({
        title,
        discription,
        image,
        user
    })
    try {
        const session= await mongoose.startSession();
        session.startTransaction();

        await blog.save({session});
        existingUser.blogs.push(blog )
        await existingUser.save({session})
        await session.commitTransaction();
    } catch (error) {
        console.log(error);
        return res.status(500).json({message:error})
    }
}
export const updateBlog = async (req,res,next)=>{
    const {title,discription} = req.body
    const blogId = req.params.id;
     let blog;
    try {
        blog =await Blog.findByIdAndUpdate(blogId,{
            title,
            discription
         })
    } catch (error) {
        return console.log(error);
    }
    if(!blog){
        return res.status(500).json({message:"Unable to update blog."})
    }
    return res.status(200).json({blog})
}
export const getById= async(req,res,next)=>{
   const id = req.params.id;
   let blog;
   try {
    blog = await Blog.findById(id);
   } catch (error) {
     return console.log(error);
   } 
   if(!blog){
    return res.status(404).json({message:"No Blog found"})
   }
   return res.status(200).json({blog})
}
export const deleteBlog = async(req,res,next)=>{
const id = req.params.id;
let blog;
try {
   blog = await Blog.findByIdAndDelete(id) 
} catch (error) {
    return console.log(error);
}
if (!blog) {
    return res.status(400).json({message:"Unable to delete "})
}
return res.status(200).json({message:"Successfully deleted."})
}