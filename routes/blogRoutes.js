import express from "express"
import { addBlog, deleteBlog, getAllBlog, getById, updateBlog } from "../controllers/blog-controller.js";
const blogRouter = express.Router();
blogRouter.get('/',getAllBlog);
blogRouter.post('/add',addBlog)
blogRouter.put('/update/:id',updateBlog)
blogRouter.get('/:id',getById)
blogRouter.delete('/:id',deleteBlog)
export default blogRouter