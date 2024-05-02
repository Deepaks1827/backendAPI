import express from "express"
import mongoose from "mongoose"
import router from "./routes/userRoutes.js";
import blogRouter from "./routes/blogRoutes.js";

const app = express()
app.use(express.json());
app.use("/api/user",router);
app.use("/api/blog",blogRouter)
mongoose.connect("mongodb+srv://deepakshukla091827:KomalTopa@cluster0.malttsc.mongodb.net/")
.then(()=>app.listen(5001))
.then(()=>console.log("Connected to db and listening on port 5001"))
.catch((err)=>console.log(err));





app.listen(5000)