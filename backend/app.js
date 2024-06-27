import express from "express";
import connectDatabase from "./DB/dataBase.js";
import dotenv from "dotenv";
import cors from 'cors'
import userRoute from "./routes/user.route.js";
import authRoute from "./routes/auth.route.js";
import newsRoute from "./routes/post.route.js";
import swaggerRoute from "./routes/swagger.route.cjs";

dotenv.config();

const port = process.env.PORT || 3001;
const app = express();
const corsOptions = {
    origin: ['http://localhost:5173','https://front-course-merne-thic-git-fb98d6-jeffersons-projects-a8e3c90e.vercel.app/','https://vercel.com/jeffersons-projects-a8e3c90e/front-course-merne-thicode','https://front-course-merne-thicode.vercel.app/'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'], 
    optionsSuccessStatus: 200 // Para suportar navegadores mais antigos
  };
  
  app.use(cors(corsOptions));
  

connectDatabase();
app.use(express.json());
app.use("/user", userRoute);
app.use("/auth", authRoute);
app.use("/posts", newsRoute);
app.use("/doc", swaggerRoute);

app.listen(port, () => console.log(`Server running on port: ${port}`));
