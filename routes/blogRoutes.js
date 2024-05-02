import express from "express"
import { addBlog, getAllBlog, updateBlog } from "../controllers/blog-controller.js";
const blogRouter = express.Router();
blogRouter.get('/',getAllBlog);
blogRouter.post('/add',addBlog)
blogRouter.put('/update/:id',updateBlog)
export default blogRouter