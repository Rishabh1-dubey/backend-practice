import express from "express";
import dotenv from "dotenv";
import connectDB from "./db/connectDb.js";
import bodyParser from "body-parser";
import userRouter from "./routes/user.js";
import todoRouter from "./routes/todo.js";
import cookieParser from "cookie-parser";
import cors from "cors"

const app = express();

dotenv.config();
connectDB();


app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser())
app.use(cors({
  origin: "http://localhost:5173", // your frontend URL
  credentials:true
}));



app.use("/api/v1/user/", userRouter);

// todo routes
app.use("/api/v1/user",todoRouter)

const PORT = 8000;
app.listen(PORT, () => {
  console.log(`app is listening on ${PORT}`);
});
