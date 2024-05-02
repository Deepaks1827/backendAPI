import { request } from "express";
import Blog from "../models/blog.model.js"
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
    const blog= new Blog({
        title,
        discription,
        image,
        user
    })
    try {
        await blog.save();
    } catch (error) {
        console.log(error);
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