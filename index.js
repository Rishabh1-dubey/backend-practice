import express from "express";
import dotenv from "dotenv";
import connectDB from "./db/connectDb.js";
import bodyParser from "body-parser";
import userRouter from "./routes/user.js";

const app = express();

dotenv.config();
connectDB();

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api/v1/user/", userRouter);


const PORT = 8000;
app.listen(PORT, () => {
  console.log(`app is listening on ${PORT}`);
});
