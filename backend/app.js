import express from "express";
import mongoose from "mongoose";
import router from "./routes/user-routes.js";
import blogRouter from "./routes/blog-routes.js";
import cors from "cors";

import bodyParser from "body-parser";




const app=express();
app.use(cors());
app.use(express.json());

app.use("/api/user", router);
app.use("/api/blog", blogRouter);
// app.use(bodyParser.json());

// app.use((err, req, res, next) => {
//   if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
//     console.error('Bad JSON');
//     return res.status(400).json({ message: 'Invalid JSON' });
//   }
//   next();
// });


mongoose.connect('mongodb+srv://kris:1234@cluster0.gvblv2d.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
.then(() => app.listen(5000))
.then(() =>
  console.log("Connected TO Database and Listenin TO Localhost 5000")
)
.catch((err) => console.log(err));








app.use("/api",(req,res,next)=>{
    res.send("HelloWorld");
});

// 
// import cors from "cors";
// const app = express();
// app.use(cors());
// 
// 
// mongoose
//   .connect(
//     "mongodb+srv://admin:ESjtvUtwLfVb8c2F@cluster0.tdimc.mongodb.net/Blog?retryWrites=true&w=majority"
//   )
